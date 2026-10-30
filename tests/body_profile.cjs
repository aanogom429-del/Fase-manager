const assert=require('node:assert/strict');
const {env}=require('./continuity.cjs');
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
for(const team of [0,1]){
 const e=env();e.t.scenario({time:20,team});
 const s=e.t.get(),p=s.players.find(q=>q.t===team&&q.n===8),o=s.owner,dir=team? -1:1;
 // Use the scenario ball position, then place an advanced, stationary support.
 p.x=s.bx+dir*10;p.y=s.by-8;p.bodyAngle=team?Math.PI:0;
 const before={x:p.x,y:p.y,angle:p.bodyAngle};
 e.t.orientBody(p,p.x,p.y,.01);
 assert(Math.abs(delta(p.bodyAngle,before.angle))<=p.turnRate*.01+1e-9,'bounded turn');
 assert.equal(p.x,before.x);assert.equal(p.y,before.y);
 for(let i=0;i<120;i++)e.t.orientBody(p,p.x,p.y,1/60);
 assert(e.t.perceives(p,{x:s.bx,y:s.by}),'open profile sees ball');
 assert(e.t.perceives(p,{x:p.x+dir*10,y:p.y}),'open profile sees forward');
 // Far travel also preserves a ball-facing profile, rather than blindly facing the run.
 e.t.orientBody(p,p.x+dir*20,p.y,2);
 assert(e.t.perceives(p,{x:s.bx,y:s.by}));
 // Same geometry, different orientation: a closed receiver needs extra preparation.
 o.x=50;o.y=32;p.x=50+dir*29;p.y=32;
 p.bodyAngle=team?0:Math.PI;
 const open=e.t.phaseRelations([o,p],o,o).get(p);
 p.bodyAngle=team?Math.PI:0;
 const closed=e.t.phaseRelations([o,p],o,o).get(p);
 assert.equal(open.key,'a');assert.equal(closed.key,'c');assert(open.value>closed.value);
 // Existing reception and scanning priorities remain stronger than the new policy.
 o.controlUntil=100;o.controlAngle=1;
 e.t.orientBody(o,o.x+20,o.y,2);assert(Math.abs(delta(o.bodyAngle,1))<1e-8);
}
console.log('Body profile: mirrored open support, turn limits, locomotion, phase relation and control priority passed');
