const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t=0){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;
 const rivals=s.players.filter(q=>q.t!==t);for(const r of rivals){r.x=x(65);r.y=50;}
 rivals[0].x=x(60);rivals[0].y=32;e.t.observeRivals(p);return {e,p,rivals,x,t};
}
for(const t of [0,1]){
 const {e,p,rivals,x}=setup(t),q={x:x(70),y:32};
 const fresh=e.t.perceivedOpposition(p);assert.equal(fresh.uncertainty,0);
 assert(e.t.perceivedLane(p,q,fresh).risk>0,'observed blocker penalizes pass');
 p.bodyAngle=t?0:Math.PI;e.t.scenario({time:1.75,team:t});
 rivals[0].x=x(85);rivals[0].y=60;e.t.observeRivals(p);
 const remembered=e.t.perceivedOpposition(p);assert.equal(remembered.rivals[0].x,x(60));assert.equal(remembered.rivals[0].y,32);
 assert.equal(remembered.rivals[0].radius,1.5);assert.equal(remembered.uncertainty,.5);
 assert(e.t.perceivedLane(p,q,remembered).risk>=e.t.perceivedLane(p,q,fresh).risk);
 const before=JSON.stringify(remembered);rivals[0].x=x(90);e.t.observeRivals(p);assert.equal(JSON.stringify(e.t.perceivedOpposition(p)),before,'unseen position does not alter assessment');
 e.t.scenario({time:2.5,team:t});e.t.observeRivals(p);const unknown=e.t.perceivedOpposition(p);
 assert.equal(unknown.rivals.length,0);assert.equal(unknown.uncertainty,1);
 assert(e.t.perceivedLane(p,q,unknown).risk>0);assert(Number.isFinite(e.t.perceivedSpace(p,unknown)),'unknown is not unlimited safe space');
 p.bodyAngle=t?Math.PI:0;e.t.observeRivals(p);assert.equal(e.t.perceivedOpposition(p).rivals[0].x,x(90));
 const view={rivals:[{x:x(70)},{x:x(75)}]};assert(e.t.perceivedOffside(p,{x:x(80)},view));assert(!e.t.perceivedOffside(p,{x:x(45)},view));
}
// Snapshots and pauses retain independent observation state.
const {e,p,rivals}=setup();e.t.prepareDecision();const old=JSON.stringify(p.rivalMemory);
for(let i=0;i<10;i++)e.tick();assert.equal(JSON.stringify(p.rivalMemory),old);
rivals[0].x=80;e.t.observeRivals(p);assert.notEqual(JSON.stringify(p.rivalMemory),old);e.t.restorePosition();assert.equal(JSON.stringify(p.rivalMemory),old);
// Deliberately moving an unobserved rival must not change chosen destination.
function choice(hiddenX){const {e,p,rivals}=setup();for(const r of rivals){r.x=hiddenX;r.y=32;}p.rivalMemory=[];
 for(const m of e.t.get().players.filter(q=>q.t===0&&q!==p)){m.x=65;m.y=32;}
 e.t.chooseAction(p);const s=e.t.get();return JSON.stringify(s.flight?{target:s.flight.target?.id,x:s.flight.execution?.intendedX,y:s.flight.execution?.intendedY}:{x:p.driveX,y:p.driveY,scan:p.scanUntil});}
assert.equal(choice(10),choice(40),'decision uses uncertainty rather than hidden coordinates');
e.t.beginRestart('throw',0,40,0,'test');assert(e.t.get().players.every(p=>p.rivalMemory.length===0));
console.log('PASS: mirrored rival memory, growing uncertainty, hidden-position independence, expiry, renewal, estimated offside, pause, snapshot and reset');
