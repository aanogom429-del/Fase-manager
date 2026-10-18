const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),players=e.t.get().players;
assert(new Set(players.map(p=>p.acceleration)).size>1);assert(new Set(players.map(p=>p.memoryDuration)).size>1);
for(let i=0;i<11;i++)for(const key of ['acceleration','braking','turnRate','memoryDuration'])assert.equal(players[i][key],players[i+11][key]);
const make=()=>({x:40,y:32,vx:0,vy:0,bodyAngle:Math.PI,speed:8,acceleration:22,braking:30,turnRate:Math.PI});
const quick=make(),slow=make();slow.turnRate=2;e.t.advancePlayer(quick,80,32,.3);e.t.advancePlayer(slow,80,32,.3);assert(quick.bodyAngle<slow.bodyAngle);assert(quick.x>slow.x);
const strong={...make(),vx:8,bodyAngle:0,braking:34},weak={...make(),vx:8,bodyAngle:0,braking:20};e.t.advancePlayer(strong,10,32,.1);e.t.advancePlayer(weak,10,32,.1);assert(strong.vx<weak.vx);
function recall(duration){const sim=env();sim.t.scenario({time:1,team:0});const s=sim.t.get(),p=s.owner;p.x=50;p.y=32;p.bodyAngle=0;p.memoryDuration=duration;
 for(const q of s.players.filter(q=>q!==p)){q.x=70;q.y=32;}sim.t.observeTeammates(p);sim.t.observeRivals(p);p.bodyAngle=Math.PI;
 sim.t.scenario({time:2.4,team:0});sim.t.observeTeammates(p);sim.t.observeRivals(p);return {sim,p,count:sim.t.knownTeammates(p).length,view:sim.t.perceivedOpposition(p)};}
const short=recall(1.2),long=recall(1.8);assert.equal(short.count,0);assert(long.count>0);assert.equal(short.view.rivals.length,0);assert(long.view.rivals.length>0);assert(short.view.uncertainty>long.view.uncertainty);
const sim=env();sim.t.scenario({time:1,team:0});sim.t.prepareDecision();const p=sim.t.get().owner,original=JSON.stringify([p.acceleration,p.braking,p.turnRate,p.memoryDuration]);p.acceleration=99;p.memoryDuration=.5;sim.t.restorePosition();assert.equal(JSON.stringify([p.acceleration,p.braking,p.turnRate,p.memoryDuration]),original);
console.log('PASS: explicit symmetric profiles, isolated turn/braking effects, individual teammate/rival expiry and confidence, snapshot restoration');
