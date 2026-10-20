const fs=require('node:fs'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8'),entry='startSituation();requestAnimationFrame(frame);';
let hits=0,misses=0;const outcomes=[];
for(const t of [0,1])for(const angle of [0,Math.PI/2,Math.PI])for(const vy of [-8,0,8])for(const acceleration of [12,28])for(const startY of [34.5,36,38,42]){
 const e=env(source.replace(entry,entry+'globalThis.test.guard=projectedShotGuard;'));
 e.t.enterFreeMode();e.t.scenario({time:0,team:1-t,seed:101});
 const ps=e.t.get().players,f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 for(const p of ps)Object.assign(p,f(60,60),{hx:f(60,60).x,hy:f(60,60).y,vx:0,vy:0,bodyAngle:0,intentAt:.6,intentX:f(60,60).x,intentY:f(60,60).y,cool:2});
 const c=ps.find(p=>p.t!==t&&p.n===6),p=ps.find(p=>p.t===t&&p.n===6),a=f(20,40),end=f(-2,29.5),target=f(7,33.8);
 Object.assign(c,a);e.t.capture(c,'test');Object.assign(p,f(7,startY),{bodyAngle:angle+(t?Math.PI:0),vy:vy*(t?-1:1),acceleration,cool:0,intentX:target.x,intentY:target.y});
 const before=JSON.stringify(e.t.savePosition()),expected=e.t.guard(p,target,a,end,0);
 assert.equal(JSON.stringify(e.t.savePosition()),before,'Forecast is pure');
 e.t.kickTo(c,end.x,end.y,'shot');for(let k=0;k<80&&e.t.get().flight;k++)e.t.update(1/120);
 const actual=e.t.get().owner===p;
 assert.equal(expected,actual,JSON.stringify({t,angle,vy,acceleration,expected,actual}));
 actual?hits++:misses++;outcomes.push({t,angle,vy,acceleration,startY,actual,x:p.x,y:p.y});
}
assert(hits>0&&misses>0);console.log('PASS exact shot-contact prediction vs actual update:',hits,'hits',misses,'misses');

for(const variable of ["angle","vy","acceleration"]){const changed=outcomes.some(a=>outcomes.some(b=>(a.actual!==b.actual||Math.hypot(a.x-b.x,a.y-b.y)>1e-5)&&Object.keys(a).filter(k=>![variable,"actual","x","y"].includes(k)).every(k=>a[k]===b[k])));assert(changed,variable+" must affect the executed trajectory or contact");}
