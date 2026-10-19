const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),entry='startSituation();requestAnimationFrame(frame);';
for(const t of [0,1]){
 const e=env(source.replace(entry,entry+'globalThis.test.contextualDefense=contextualDefense;globalThis.test.guardsPassingLine=guardsPassingLine;')),f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});e.t.scenario({time:10,team:t});
 const ps=e.t.get().players,p=ps.find(p=>p.t===t&&p.n===6),mate=ps.find(p=>p.t===t&&p.n===7),carrier=ps.find(p=>p.t!==t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7);
 for(const q of ps)Object.assign(q,f(90,60),{vx:0,vy:0,rivalMemory:[]});Object.assign(carrier,f(50,32));e.t.capture(carrier,'test');
 Object.assign(p,f(46.1,24.2));const ball=f(50,32),r={id:receiver.id,...f(44,20),seenAt:10};p.rivalMemory=[r];
 let target=e.t.contextualDefense(p,0,ball);assert.equal(target.mode,'Temporizar protegiendo línea');assert(e.t.guardsPassingLine(target,ball,r));
 Object.assign(mate,f(47,26),{defDuty:'cover'});target=e.t.contextualDefense(p,0,ball);assert.notEqual(target.mode,'Temporizar protegiendo línea','Replacement permits leaving this line');
 e.t.get().offBallOrders.push({i:ps.indexOf(mate),until:20});assert.equal(e.t.contextualDefense(p,0,ball).mode,'Temporizar protegiendo línea');e.t.get().offBallOrders.length=0;
 p.rivalMemory=[{...r,seenAt:0}];assert.notEqual(e.t.contextualDefense(p,0,ball).mode,'Temporizar protegiendo línea','Expired threat no longer fixes target');
 Object.assign(mate,f(90,60));Object.assign(p,f(43.5,25.5));p.rivalMemory=[{...r,...f(40,22)}];
 assert.notEqual(e.t.contextualDefense(p,0,ball).mode,'Temporizar protegiendo línea','Pressure that still guards the line is not penalized');
 Object.assign(p,f(40,32));Object.assign(mate,f(45,32));p.rivalMemory=ps.filter(q=>q.t!==t).slice(0,3).map((q,i)=>({id:q.id,...f(50,30+i),seenAt:10}));
 assert.equal(e.t.contextualDefense(p,0,ball).mode,'Temporizar ante inferioridad percibida','Observed local inferiority discourages distant pressure');
 Object.assign(p,f(50,32));assert.equal(e.t.contextualDefense(p,0,ball).mode,'Presionar con acceso o ayuda','Immediate access still permits pressure');
}
console.log('PASS: mirrored press exposure, line-preserving delay, replacement/orders/expiry, local inferiority and immediate access');
