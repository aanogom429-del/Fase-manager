const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
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
 sim.t.chooseAction(p);const f=sim.t.get().flight;assert(f,'remembered option can be selected');assert.equal(f.target,q);assert.equal(f.execution.intendedX,x(65));assert.equal(f.execution.intendedY,32,'does not read unseen new location');
 sim.t.scenario({time:2.5,team:t});sim.t.observeTeammates(p);assert.equal(sim.t.knownTeammates(p).length,0,'expires at 1.5 seconds');
 p.bodyAngle=t?Math.PI:0;sim.t.observeTeammates(p);assert.equal(sim.t.knownTeammates(p)[0].x,x(72),'seeing again refreshes location');
 q.sentOff=true;assert.equal(sim.t.knownTeammates(p).length,0,'unavailable teammate cannot be selected');
}
const {sim,p,q}=setup();for(const r of sim.t.get().players)r.sentOff=false;sim.t.prepareDecision();const original=JSON.stringify(p.visualMemory);
for(let i=0;i<20;i++)sim.tick();assert.equal(JSON.stringify(p.visualMemory),original,'pause does not age or refresh observations');
q.x=75;sim.t.scenario({time:1.4,team:0});sim.t.observeTeammates(p);assert.notEqual(JSON.stringify(p.visualMemory),original);
sim.t.restorePosition();assert.equal(JSON.stringify(p.visualMemory),original,'retry restores independent memory snapshot');
sim.t.chooseAction(p);const first=JSON.stringify(sim.t.get().flight?.execution);sim.t.restorePosition();sim.t.chooseAction(p);assert.equal(JSON.stringify(sim.t.get().flight?.execution),first);
sim.t.beginRestart('throw',0,40,0,'test');assert(sim.t.get().players.every(p=>p.visualMemory.length===0));
sim.t.startSituation();assert(sim.t.get().players.every(p=>p.visualMemory.length===0));
const unknown=setup();unknown.p.visualMemory=[];unknown.p.bodyAngle=Math.PI;unknown.sim.t.observeTeammates(unknown.p);assert.equal(unknown.sim.t.knownTeammates(unknown.p).length,0,'no fabricated prior knowledge');
console.log('PASS: mirrored last-seen passing, expiry, refresh, unavailable target, no invented observation, pause, independent retry and restart reset');
