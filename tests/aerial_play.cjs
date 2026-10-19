const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function cross(t,seed=73,offside=false){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?15:offside?70:96);q.y=60;q.speed=0;q.vx=0;q.vy=0;q.cool=0;}
 p.x=x(75);p.y=12;const r=s.players.find(q=>q.t===t&&q.n===10);r.x=x(90);r.y=32;
 e.t.kickTo(p,r.x,r.y,'pass',r);const f=e.t.get().flight;f.loft=5;f.cross=true;return {e,p,r,f,x};
}
for(const t of [0,1]){
 let headers=0,misses=0;
 for(const seed of [1,17,73,109,305]){const {e,r,f}=cross(t,seed);assert(!e.t.aerialEligible(r,f,4));assert(!e.t.aerialEligible(r,{...f,cross:false},2));
  for(let i=0;i<140&&!e.t.get().flight?.header&&e.t.get().flight;i++)e.t.update(.01);
  const s=e.t.get();if(s.flight?.header){headers++;assert.equal(s.flight.kind,'shot');assert(s.flight.startHeight>=1.4);assert.equal(s.owner,null);assert.equal(s.shots,1);assert((s.flight.tx-r.x)*(t?-1:1)>0);e.t.update(.01);assert(s.flight.age>0,'new shot survives incoming-flight cleanup');}else misses++;
 }
 assert(headers>0,'actual centre flight can produce a header');
 const off=cross(t,73,true);off.e.t.aerialContact(off.r,off.f,2);assert.equal(off.e.t.get().restart?.kind,'indirect');assert.equal(off.e.t.get().shots,0);
 const clear=env();clear.t.scenario({time:1,team:t,seed:73});const p=clear.t.get().owner;p.x=t?80:20;p.y=32;clear.t.clearBall(p);assert(clear.t.get().flight.loft>0&&clear.t.get().flight.clearance);assert.equal(clear.t.get().flight.target,null);assert((clear.t.get().flight.tx-p.x)*(t?-1:1)>25);
 const g=env(),keeper=g.t.get().players.find(p=>p.t===t&&p.n===1);g.t.goalkeeperLong(keeper,'goalKick');assert(g.t.get().flight.loft>=6);assert(g.t.get().flight.keeperLong);assert(g.t.get().offsidePhase.exempt);assert((g.t.get().flight.tx-keeper.x)*(t?-1:1)>30);
}
let long=0,short=0;
for(const seed of [1,17,73,109,305,999]){const e=env();e.t.scenario({time:1,team:0,seed});e.t.beginRestart('goalKick',0,5.5,32,'test');const r=e.t.get().restart;r.age=2;for(const p of e.t.get().players)Object.assign(p,e.t.restartTarget(p,r));e.t.advanceRestart(.01);const s=e.t.get();assert(s.flight);assert.equal(s.restartGuard.kind,'goalKick');assert(s.offsidePhase.exempt);if(s.flight.keeperLong)long++;else short++;}
assert(long>0&&short>0,'automatic goal kicks include both long aerial and short distribution');
let headedClearances=0,missedJumps=0;
for(const seed of [1,17,73,109,305,20000]){const defended=cross(0,seed),defender=defended.e.t.get().players.find(p=>p.t===1&&p.n===3);defender.x=90;defender.y=32;
 defended.e.t.aerialContact(defender,defended.f,2);const s=defended.e.t.get();
 if(s.flight.clearance){headedClearances++;assert.equal(s.flight.from,defender);assert.equal(s.flight.startHeight,2);}
 else{missedJumps++;assert.equal(s.flight,defended.f);assert.equal(s.turnovers,0,'missed jump is not a touch');}
}
assert(headedClearances>0&&missedJumps>0);
const guided=env();guided.t.scenario({time:1,team:0,seed:73});guided.t.get().owner.x=75;guided.t.get().owner.y=12;guided.t.prepareDecision();guided.t.select('finish');guided.t.playChoice('crossHeader');assert(guided.t.get().flight.cross&&guided.t.get().flight.headerIntent,'guided centre-to-header option executes');
const keeperChoice=env(),kp=keeperChoice.t.get().players.find(p=>p.t===0&&p.n===1);keeperChoice.t.capture(kp,'controla');keeperChoice.t.prepareDecision();keeperChoice.t.select('finish');keeperChoice.t.playChoice('keeperLong');assert(keeperChoice.t.get().flight.keeperLong);assert(!keeperChoice.t.get().offsidePhase.exempt,'open-play long kick has normal offside rules');
console.log('PASS: real-flight mirrored headers, aerial height limits, header offside, clearances, long goalkeeper distribution and mixed goal kicks');
