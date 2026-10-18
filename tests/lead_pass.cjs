const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),passer={x:20,y:32},receiver={x:40,y:32,vx:8,vy:0,speed:8,reactionDelay:0};
const forward=e.t.leadPassTarget(passer,receiver);
// Analytical meeting time for collinear constant speeds: 20 / (35 - 8).
assert(Math.abs(forward.x-(40+8*20/27))<1e-7);
assert.equal(forward.y,32);assert(forward.anticipated);
const lateral=e.t.leadPassTarget(passer,{...receiver,vx:0,vy:8});
assert.equal(lateral.x,40);assert(lateral.y>32);
assert(Math.abs((lateral.y-32)/8-Math.hypot(lateral.x-20,lateral.y-32)/35)<1e-7);
const backward=e.t.leadPassTarget(passer,{...receiver,vx:-8});assert(backward.x<40);
const still=e.t.leadPassTarget(passer,{...receiver,vx:0});assert.equal(still.x,40);assert(!still.anticipated);
const missing=e.t.leadPassTarget(passer,{x:40,y:32,speed:8});assert.equal(missing.x,40);assert(!missing.anticipated);
const mirror=e.t.leadPassTarget({x:80,y:32},{...receiver,x:60,vx:-8});assert(Math.abs(mirror.x-(100-forward.x))<1e-7);
const edge=e.t.leadPassTarget({x:40,y:50},{...receiver,x:97,y:61,vx:6,vy:6});assert(edge.x<=98&&edge.y<=62);
const long=e.t.leadPassTarget({x:5,y:32},{...receiver,x:70});assert(long.x-70<=8*1.2+1e-8,'bounded prediction horizon');
const invalid=e.t.leadPassTarget(passer,{...receiver,vx:NaN,vy:Infinity});assert(Number.isFinite(invalid.x)&&Number.isFinite(invalid.y));
// Use the actual guided option, preserving execution error and retry.
const sim=env();sim.t.scenario({time:1,team:0,seed:73});const s=sim.t.get(),a=s.owner,b=s.players.find(p=>p.t===0&&p.n===8);
a.x=20;a.y=32;b.x=40;b.y=32;b.vx=0;b.vy=8;b.intentAt=1;
sim.t.prepareDecision();sim.nodes['target-player'].onchange({target:{value:'8'}});
sim.t.playChoice('through');const flight=sim.t.get().flight;
assert.equal(flight.target,b);assert.equal(flight.execution.intendedX,40);assert(flight.execution.intendedY>32);
assert(flight.execution.error>0,'normal execution error remains');
const saved=JSON.stringify(flight.execution);sim.t.restorePosition();sim.t.playChoice('through');assert.equal(JSON.stringify(sim.t.get().flight.execution),saved);
// Offside is still determined at the initial kick, not at the predicted destination.
const off=env();off.t.scenario({time:1,team:0,seed:73});const os=off.t.get();os.owner.x=60;os.owner.y=32;
for(const p of os.players.filter(p=>p.t===1))p.x=70;
const ob=os.players.find(p=>p.t===0&&p.n===8);ob.x=80;ob.y=32;ob.vx=8;ob.vy=0;
off.t.executeTechnique({kind:'through',n:8,title:'Pase al espacio'});off.t.capture(ob,'recibe');assert.equal(off.t.get().restart.kind,'indirect');
console.log('PASS: analytical forward/lateral meeting, backward motion, stationary fallback, mirror, bounds, horizon, guided execution, retry and offside');
