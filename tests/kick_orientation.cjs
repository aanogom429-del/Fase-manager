const assert=require('node:assert/strict');
const {env}=require('./continuity.cjs');
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
for(const t of [0,1]){
 const e=env();e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed:99});
 const s=e.t.get(),p=s.owner,dir=t?-1:1;
 p.x=50;p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players)if(q!==p){q.x=t?5:95;q.y=5;}
 const before=p.bodyAngle,passes=s.passes;
 e.t.kickTo(p,50-dir*25,32,'pass');
 assert.equal(e.t.get().flight,null,'rear pass does not leave before turning');
 assert.equal(e.t.get().owner,p);assert.equal(p.bodyAngle,before);
 assert.equal(e.t.get().passes,passes,'no pass counted during preparation');
 for(let i=0;i<180&&!e.t.get().flight;i++){
  const old=p.bodyAngle;e.t.update(1/120);
  assert(Math.abs(delta(p.bodyAngle,old))<=p.turnRate/120+1e-8,'bounded real turn');
 }
 const f=e.t.get().flight;assert(f,'preparation eventually releases ball');
 assert(Math.abs(delta(Math.atan2(f.execution.intendedY-p.y,f.execution.intendedX-p.x),p.bodyAngle))<=Math.PI/3+1e-8);
 assert.equal(e.t.get().passes,passes+1);
 assert(!p.kickPreparation);
 // Short rear passes are not silently re-labelled as unlimited backheels either.
 const short=env();short.t.scenario({time:10,team:t});const sp=short.t.get().owner;
 sp.bodyAngle=0;short.t.kickTo(sp,sp.x-3,sp.y,'pass');
 assert(sp.kickPreparation);assert.equal(short.t.get().flight,null);
 // Pausing/changing to decisions must not resolve or discard the pending turn.
 const frozen=JSON.stringify([sp.x,sp.y,sp.bodyAngle,sp.kickPreparation]);
 short.t.enterDecisionMode();assert.equal(short.t.get().stage,'settle');
 for(let i=0;i<10;i++)short.tick();
 assert.equal(JSON.stringify([sp.x,sp.y,sp.bodyAngle,sp.kickPreparation]),frozen);
 short.nodes['resume-ball'].onclick();
 for(let i=0;i<5000&&short.t.get().stage==='settle';i++)short.tick();
 assert.equal(short.t.get().stage,'choose','pending turn resumes to a playable decision');
 // Losing possession cancels the queued kick; it cannot execute for the new owner.
 const loss=env();loss.t.scenario({time:10,team:t});const a=loss.t.get().owner;
 a.bodyAngle=0;loss.t.kickTo(a,a.x-10,a.y,'pass');assert(a.kickPreparation);
 const rival=loss.t.get().players.find(q=>q.t!==t);loss.t.capture(rival,'roba');
 assert(!a.kickPreparation);assert.equal(loss.t.get().flight,null);
 // Receding defender must keep the ball in front of the body, with reduced stride.
 const retreat=env();retreat.t.scenario({time:10,team:1-t});
 const r=retreat.t.get(),d=r.players.find(q=>q.t===t&&q.n===3);
 d.x=r.bx-dir*10;d.y=r.by;d.bodyAngle=t?0:Math.PI;
 const x=d.x,target=d.x-dir*20;
 for(let i=0;i<120;i++)retreat.t.advancePlayer(d,target,d.y,1/60);
 assert(retreat.t.perceives(d,{x:r.bx,y:r.by}),'retreating defender sees ball');
 assert((d.x-x)*dir<0,'still retreats instead of stopping');
 assert(Math.abs(d.x-x)<d.speed*2,'sideways/backward running costs speed');
}
console.log('PASS: mirrored retreat, bounded turn, delayed rear pass, release and possession-loss cancellation');
