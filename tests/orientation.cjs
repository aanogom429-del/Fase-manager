const assert=require('node:assert/strict'),{env,signature}=require('./continuity.cjs');
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,abs=x=>t?100-x:x;
 for(const q of s.players){q.x=abs(q.t===t?70:95);q.y=10+(q.id%11)*4;delete q.intentAt;}
 p.x=abs(50);p.y=32;p.driveX=p.x;p.driveY=p.y;p.bodyAngle=t?0:Math.PI;
 e.t.scenario({time:1,team:t});return {e,s,p,abs};
}
for(const t of [0,1]){
 const {e,s,p,abs}=setup(t),ahead={x:abs(65),y:32},behind={x:abs(35),y:32};
 assert(!e.t.perceives(p,ahead));assert(e.t.perceives(p,behind));
 const old=p.bodyAngle;e.t.chooseAction(p);
 assert.equal(e.t.get().flight,null,'no instantaneous pass to unseen teammates');
 assert.equal(p.driveX,p.x,'do not drive blindly');assert.equal(p.bodyAngle,old,'decision does not teleport orientation');
 assert(p.scanUntil>1,'search explicitly scheduled');
 for(let i=0;i<5;i++){e.t.scenario({time:1+i*.1,team:t});const before=p.bodyAngle;e.t.movement(.1);assert(Math.abs(delta(p.bodyAngle,before))<=Math.PI*.1+1e-10,'bounded angular speed');}
 assert(e.t.perceives(p,ahead),'turn reveals previously unseen option');
 e.t.chooseAction(p);assert(e.t.get().flight||p.kickPreparation||abs(p.driveX)>50,'can act or prepare a kick once option is detected');
 const frozen=setup(t);frozen.p.scanAngle=.4;frozen.p.scanUntil=3;frozen.e.t.prepareDecision();
 const expected=JSON.stringify(frozen.s.players.map(p=>[p.bodyAngle,p.scanAngle,p.scanUntil]));
 frozen.e.t.enterFreeMode();frozen.e.t.enterDecisionMode();assert.equal(JSON.stringify(frozen.s.players.map(p=>[p.bodyAngle,p.scanAngle,p.scanUntil])),expected);
 for(let i=0;i<10;i++)frozen.e.tick();assert.equal(JSON.stringify(frozen.s.players.map(p=>[p.bodyAngle,p.scanAngle,p.scanUntil])),expected,'paused orientation stays frozen');
 frozen.e.t.movement(.2);frozen.e.t.restorePosition();assert.equal(JSON.stringify(frozen.s.players.map(p=>[p.bodyAngle,p.scanAngle,p.scanUntil])),expected,'retry restores orientation and scan');
 const original=signature(frozen.e);frozen.e.t.movement(.2);const once=JSON.stringify(frozen.s.players.map(p=>[p.x,p.y,p.bodyAngle]));frozen.e.t.restorePosition();assert.equal(signature(frozen.e),original);frozen.e.t.movement(.2);assert.equal(JSON.stringify(frozen.s.players.map(p=>[p.x,p.y,p.bodyAngle])),once,'repeat is deterministic');
 frozen.e.t.startSituation();assert(frozen.e.t.get().players.every(q=>q.bodyAngle===(q.t?Math.PI:0)&&q.scanUntil===0));
 // A reception must preserve body orientation, rather than turning instantly to goal.
 const receive=setup(t),receiver=receive.s.players.find(q=>q.t===t&&q.n===8);receiver.bodyAngle=.7;receiver.scanUntil=10;
 receive.e.t.capture(receiver,'control');assert.equal(receiver.bodyAngle,.7);assert.equal(receiver.scanUntil,0);
}
// Geometry is invariant under rotating the whole situation by 180 degrees.
const e=env(),p=e.t.get().owner;
for(const angle of [0,.5,Math.PI,-2]){p.x=40;p.y=20;p.bodyAngle=angle;const q={x:60,y:35},visible=e.t.perceives(p,q);p.x=60;p.y=44;p.bodyAngle=delta(angle+Math.PI,0);assert.equal(e.t.perceives(p,{x:40,y:29}),visible);}
e.t.render();assert(e.nodes['facing-'+p.t+'-'+p.n].transform.startsWith('rotate('));
for(const seed of [17,73,109]){
 const sim=env();sim.t.scenario({time:0,team:0,seed});sim.t.enterFreeMode();
 for(let k=0;k<3600;k++){sim.t.update(1/60);assert(sim.t.get().players.every(p=>Number.isFinite(p.bodyAngle)&&Number.isFinite(p.x)&&Number.isFinite(p.y)));}
 assert(sim.t.get().elapsed>40);assert(sim.t.get().passes+sim.t.get().shots>0,'orientation does not stall play');
}
console.log('PASS: facing-dependent options, bounded search turn, mirrored perception, reception, pause/retry, marker and three 60 s free simulations');
