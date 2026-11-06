const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function choose(sim,p){
 sim.t.chooseAction(p);
 for(let frame=0;frame<120&&p.kickPreparation&&!sim.t.get().flight;frame++)sim.t.update(1/60);
 assert(!p.kickPreparation,'selected kick completes body preparation');
 return sim.t.get().flight;
}
function setup(t=0){
 const sim=env();sim.t.scenario({time:1,team:t,seed:73});const s=sim.t.get(),p=s.owner,q=s.players.find(q=>q.t===t&&q.n===8),x=v=>t?100-v:v;
 for(const r of s.players){if(r.t===t&&r!==p&&r!==q)r.sentOff=true;else if(r.t!==t){r.x=x(90);r.y=60;}}
 const rival=s.players.find(r=>r.t!==t);rival.x=x(52);rival.y=34;
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;q.x=x(65);q.y=32;
 sim.t.observeTeammates(p);return {sim,p,q,x,t};
}
for(const t of [0,1]){
 const {sim,p,q,x}=setup(t);assert.equal(sim.t.knownTeammates(p).length,1);
 p.bodyAngle=t?0:Math.PI;q.x=x(72);q.y=34;sim.t.scenario({time:1.8,team:t});sim.t.observeTeammates(p);
 const remembered=sim.t.knownTeammates(p)[0];assert.equal(remembered.x,x(65));assert.equal(remembered.y,32);assert.equal(remembered.memoryAge,.8);
 const f=choose(sim,p);assert(f,'remembered option can be selected');assert.equal(f.target,q);assert.equal(f.execution.intendedX,x(65));assert.equal(f.execution.intendedY,32,'does not read unseen new location');
 // Expiry is isolated from the kick: turning can legitimately refresh observations.
 const life=setup(t);life.p.bodyAngle=t?0:Math.PI;life.q.x=x(72);life.q.y=34;
 life.sim.t.scenario({time:2.499,team:t});life.sim.t.observeTeammates(life.p);
 assert.equal(life.sim.t.knownTeammates(life.p).length,1,'retained just before lifetime boundary');
 life.sim.t.scenario({time:2.5,team:t});life.sim.t.observeTeammates(life.p);
 assert.equal(life.sim.t.knownTeammates(life.p).length,0,'expires at 1.5 seconds');
 life.p.bodyAngle=t?Math.PI:0;life.sim.t.observeTeammates(life.p);
 assert.equal(life.sim.t.knownTeammates(life.p)[0].x,x(72),'seeing again refreshes location');
 life.q.sentOff=true;assert.equal(life.sim.t.knownTeammates(life.p).length,0,'unavailable teammate cannot be selected');
}
const {sim,p,q}=setup();for(const r of sim.t.get().players)r.sentOff=false;sim.t.prepareDecision();const original=JSON.stringify(p.visualMemory);
for(let i=0;i<20;i++)sim.tick();assert.equal(JSON.stringify(p.visualMemory),original,'pause does not age or refresh observations');
q.x=75;sim.t.scenario({time:1.4,team:0});sim.t.observeTeammates(p);assert.notEqual(JSON.stringify(p.visualMemory),original);
sim.t.restorePosition();assert.equal(JSON.stringify(p.visualMemory),original,'retry restores independent memory snapshot');
const firstFlight=choose(sim,p);assert(firstFlight?.execution,'retry comparison uses an executed pass');const first=JSON.stringify(firstFlight.execution);sim.t.restorePosition();const repeated=choose(sim,p);assert(repeated?.execution,'retry executes a pass');assert.equal(JSON.stringify(repeated.execution),first);
sim.t.beginRestart('throw',0,40,0,'test');assert(sim.t.get().players.every(p=>p.visualMemory.length===0));
sim.t.startSituation();assert(sim.t.get().players.every(p=>p.visualMemory.length===0));
const unknown=setup();unknown.p.visualMemory=[];unknown.p.bodyAngle=Math.PI;unknown.sim.t.observeTeammates(unknown.p);assert.equal(unknown.sim.t.knownTeammates(unknown.p).length,0,'no fabricated prior knowledge');
console.log('PASS: mirrored last-seen passing, expiry, refresh, unavailable target, no invented observation, pause, independent retry and restart reset');
