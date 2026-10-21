const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const {observedShotControl}=require('../scripts/evaluate_finishing_resume.cjs');
const source=observedShotControl(),entry='startSituation();requestAnimationFrame(frame);';
function setup(t=0){
 const e=env(source.replace(entry,entry+'globalThis.test.snapshot=()=>{checkpoint=savePosition();};globalThis.test.setHeight=h=>{ballHeight=h;};globalThis.test.observeShot=observeShot;globalThis.test.shotTarget=observedShotTarget;'));
 e.t.enterFreeMode();e.t.scenario({time:10,team:1-t,seed:101});
 const ps=e.t.get().players,f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 for(const p of ps)Object.assign(p,f(60,60),{hx:f(60,60).x,hy:f(60,60).y,vx:0,vy:0,intentAt:10.7,intentX:f(60,60).x,intentY:f(60,60).y,cool:2});
 const c=ps.find(p=>p.t!==t&&p.n===6),p=ps.find(p=>p.t===t&&p.n===6);
 Object.assign(c,f(20,32));e.t.capture(c,'test');Object.assign(p,f(7,34),{bodyAngle:t?Math.PI:0,cool:0});delete p.intentAt;
 return {e,p,c,ps,f};
}
let positive=0,negative=0;
for(const t of [0,1])for(const angle of [0,Math.PI/2,Math.PI])for(const vy of [-6,0,6])for(const acceleration of [12,28])for(const y of [30,34,36,40]){
 const {e,p,c,f}=setup(t);Object.assign(p,f(7,y),{bodyAngle:angle+(t?Math.PI:0),vy:vy*(t?-1:1),acceleration,shotSight:{...f(20,32),vx:t?48:-48,vy:0,seenAt:10}});
 const before=JSON.stringify(e.t.savePosition()),q=e.t.shotTarget(p);assert.equal(JSON.stringify(e.t.savePosition()),before,'Prediction must not change real state/randomness');
 if(!q){negative++;continue;}positive++;
 p.intentX=q.x;p.intentY=q.y;p.intentAt=10.7;
 const end=f(-2,32);e.t.kickTo(c,end.x,end.y,'shot');
 for(let k=0;k<70&&e.t.get().flight;k++)e.t.update(1/120);
 assert.equal(e.t.get().owner===p,true,JSON.stringify({t,angle,vy,acceleration,y,q}));
}
assert(positive&&negative);
for(const t of [0,1]){
 const {e,p,c,ps,f}=setup(t),end=f(-2,32);e.t.kickTo(c,end.x,end.y,'shot');
 e.t.observeShot(p);assert.equal(e.t.shotTarget(p),null,'One image cannot reveal velocity');
 e.t.update(1/120);e.t.update(1/120);assert(Math.abs(p.shotSight.vx-(t?48:-48))<1e-7);
 delete p.intentAt;const q=JSON.stringify(e.t.shotTarget(p));
 const flight=e.t.get().flight;flight.loft=5;e.t.observeShot(p);assert(p.shotSight,'Unobserved future loft cannot erase a ground-ball reading');delete flight.loft;assert.equal(JSON.stringify(e.t.shotTarget(p)),q,'Repeated image is idempotent');Object.assign(flight,{tx:777,ty:-999,duration:200,target:ps[2]});assert.equal(JSON.stringify(e.t.shotTarget(p)),q,'No private destination/duration/target');
 p.cool=1;assert.equal(e.t.shotTarget(p),null,'Cooldown outlasts the observable interception window');p.cool=0;
 p.intentAt=e.t.get().elapsed+.2;assert.equal(e.t.shotTarget(p),null,'Pending intention does not vanish on shot');delete p.intentAt;
 e.t.get().offBallOrders.push({i:ps.indexOf(p),until:20});assert.equal(e.t.shotTarget(p),null);e.t.get().offBallOrders.length=0;
 p.bodyAngle=t?0:Math.PI;e.t.observeShot(p);assert.equal(p.shotSight,undefined,'Hidden ball clears velocity');p.bodyAngle=t?Math.PI:0;e.t.observeShot(p);assert.equal(e.t.shotTarget(p),null,'Reacquisition requires another image');
 e.t.setHeight(1.5);e.t.observeShot(p);assert.equal(p.shotSight,undefined,'Only observed ground-ball paths are used');
}
{const {e,p}=setup();e.t.snapshot();p.shotSight={x:20,y:32,seenAt:10,vx:-48,vy:0};e.t.restorePosition();assert.equal(p.shotSight,undefined,'Retry must remove post-checkpoint observations');}
console.log('PASS observed-shot rollout:',{positive,negative},'privacy, reaction, orders, perception, purity');
