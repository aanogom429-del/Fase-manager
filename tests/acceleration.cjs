const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),make=()=>({x:40,y:32,vx:0,vy:0,bodyAngle:0,speed:8,acceleration:22,braking:30});
const p=make();e.t.advancePlayer(p,80,32,.1);assert(Math.abs(p.vx-2.2)<1e-8);assert(Math.abs(p.x-40.11)<1e-8);
for(let i=0;i<120;i++){const old=p.vx;e.t.advancePlayer(p,80,32,1/60);assert(Math.abs(p.vx-old)<=30/60+1e-8);assert(Math.hypot(p.vx,p.vy)<=8+1e-8);}
const before=p.x;e.t.advancePlayer(p,10,32,1/60);assert(p.vx>0&&p.x>before,'reverse order first brakes forward momentum');
const stop=make();stop.vx=8;for(let i=0;i<300;i++)e.t.advancePlayer(stop,45,32,1/60);
assert(Math.abs(stop.x-45)<.15&&Math.hypot(stop.vx,stop.vy)<.1,'settles near target without persistent oscillation');
const a=make(),b=make();e.t.advancePlayer(a,80,32,1);for(let i=0;i<60;i++)e.t.advancePlayer(b,80,32,1/60);assert(Math.abs(a.x-b.x)<1e-8);
const mirror={...make(),x:60,bodyAngle:Math.PI};e.t.advancePlayer(mirror,20,32,.1);assert(Math.abs(mirror.x-(100-(40+.11)))<1e-8);
const fast=make(),slow=make();fast.acceleration=28;slow.acceleration=14;e.t.advancePlayer(fast,80,32,.2);e.t.advancePlayer(slow,80,32,.2);assert(fast.x>slow.x);
const q={x:60,y:32};assert(e.t.arrivalTime(make(),q)>e.t.arrivalTime({...make(),vx:8},q));assert(e.t.arrivalTime({...make(),vx:-8},q)>e.t.arrivalTime(make(),q));
const sim=env();sim.t.scenario({time:1,team:0});const owner=sim.t.get().owner;owner.driveX=80;owner.driveY=32;sim.t.prepareDecision();sim.t.movement(.1);const state=JSON.stringify(sim.t.get().players.map(p=>[p.x,p.y,p.vx,p.vy]));sim.t.restorePosition();sim.t.movement(.1);assert.equal(JSON.stringify(sim.t.get().players.map(p=>[p.x,p.y,p.vx,p.vy])),state);
sim.t.beginRestart('throw',0,40,0,'test');assert(sim.t.get().players.every(p=>p.vx===0&&p.vy===0));
console.log('PASS: progressive acceleration, bounded speed, reversal braking, target settling, mirror, substeps, differential acceleration, ETA and restore');
