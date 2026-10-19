const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const root=path.join(__dirname,'..');
function setup(source,t){const entry='startSituation();requestAnimationFrame(frame);',e=env(source.replace(entry,entry+'globalThis.test.contextualDefense=contextualDefense;'));
 e.t.scenario({time:10,team:t});const f=(x,y)=>({x:t?100-x:x,y:t?64-y:y}),ps=e.t.get().players;
 const p=ps.find(p=>p.t===t&&p.n===7),mate=ps.find(p=>p.t===t&&p.n===8),carrier=ps.find(p=>p.t!==t&&p.n===6),a=ps.find(p=>p.t!==t&&p.n===7),b=ps.find(p=>p.t!==t&&p.n===8);
 for(const q of ps)Object.assign(q,f(90,60),{vx:0,vy:0});Object.assign(carrier,f(50,32));e.t.capture(carrier,'test');
 Object.assign(p,f(43.5,32),{speed:20,acceleration:100,turnRate:100,reactionDelay:0,bodyAngle:Math.atan2(-4.55,-1.3)+(t?Math.PI:0)});
 p.rivalMemory=[{id:a.id,...f(40,32),seenAt:10},{id:b.id,...f(38,25),seenAt:10}];
 return {e,p,mate,ps,f,ball:f(50,32)};
}
const current=fs.readFileSync(path.join(root,'index.html'),'utf8'),old=fs.readFileSync(path.join(root,'tests/fixtures/engine-v050.html'),'utf8');
for(const t of [0,1]){
 const a=setup(old,t),b=setup(current,t),read=s=>s.e.t.contextualDefense(s.p,1,s.ball);
 assert(Math.abs(read(a).y-a.p.y)>2,'Baseline abandons existing line');
 assert(Math.abs(read(b).y-b.p.y)<.01,'Unbacked line retained against competing threat');
 Object.assign(b.mate,b.f(45,32));assert(Math.abs(read(b).y-b.p.y)>2,'Available teammate allows coverage transfer');
 b.mate.defDuty='press';assert(Math.abs(read(b).y-b.p.y)<.01,'Presser does not guarantee replacement cover');b.mate.defDuty=null;
 b.e.t.get().offBallOrders.push({i:b.ps.indexOf(b.mate),until:20});assert(Math.abs(read(b).y-b.p.y)<.01,'Ordered teammate does not guarantee replacement');
 b.p.rivalMemory[0].seenAt=0;assert(Math.abs(read(b).y-b.p.y)>2,'Expired threat does not pin defender');
}
console.log('PASS: mirrored competing lines, baseline counterexample, replacement, busy/presser exclusion and expired threat');
