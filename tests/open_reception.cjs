const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
for(const t of [0,1]){
 const e=env();e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 p.x=50;p.y=32;
 const incoming={kind:'pass',loft:0,x:50-dir*12,y:20};
 const angle=t?Math.PI+Math.PI/3:-Math.PI/3;
 p.bodyAngle=angle;
 // Freshly observed rivals far away; no invented knowledge for unseen opponents.
 p.rivalMemory=s.players.filter(q=>q.t!==t).map(q=>({id:q.id,x:50+dir*40,y:4,seenAt:10}));
 for(const q of s.players.filter(q=>q.t!==t)){q.x=50+dir*40;q.y=4;}
 e.t.prepareReception(p,incoming);
 assert(Math.abs(delta(p.controlAngle,angle))<1e-9,'open body is retained');
 const deadline=p.controlUntil;assert(deadline>10,'control still costs time');
 e.t.orientBody(p,p.x,p.y,.05);assert(Math.abs(delta(p.bodyAngle,angle))<1e-9);
 p.rivalMemory=[];
 for(const q of s.players.filter(q=>q.t!==t)){q.x=p.x-Math.cos(angle)*40;q.y=p.y-Math.sin(angle)*30;}
 e.t.prepareReception(p,incoming);
 assert(Math.abs(delta(p.controlAngle,angle))>.1,'unknown opposition does not imply free space');
 const rival=s.players.find(q=>q.t!==t);rival.x=p.x+Math.cos(angle);rival.y=p.y+Math.sin(angle);
 e.t.prepareReception(p,incoming);
 assert(Math.abs(delta(p.controlAngle,Math.atan2(incoming.y-p.y,incoming.x-p.x)))<1e-9,'visible pressure keeps conservative control');
 p.bodyAngle=t?Math.PI:0;e.t.prepareReception(p,incoming);
 assert(Math.abs(delta(p.controlAngle,p.bodyAngle))>Math.PI/2,'closed reception still turns to source');
 e.t.prepareReception(p,{...incoming,loft:4});assert.equal(p.controlDuration,0);
}
console.log('PASS: open reception preserved in both directions, pressure/closed/aerial countercases, no instant turn or free control');
