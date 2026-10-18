const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),q={x:50,y:32},p={x:40,y:32,speed:8,vx:8,vy:0,reactionDelay:.3};
const toward=e.t.arrivalTime(p,q);p.vx=-8;const away=e.t.arrivalTime(p,q);p.vx=0;const still=e.t.arrivalTime(p,q);
assert(toward<still&&still<away);assert(Math.abs(toward-1.25)<1e-10);assert(Math.abs(away-1.85)<1e-10);
p.vx=8;assert(Math.abs(e.t.arrivalTime(p,{x:41,y:32})-.125)<1e-10,'can reach during cached motion');
assert.equal(e.t.arrivalTime({...p,x:60,vx:-8},{x:50,y:32}),toward,'mirrored arrival');
const runner={t:0,x:30,y:35,speed:8,reactionDelay:0,vx:0,vy:0};
const f={kind:'pass',t:0,x:10,y:32,tx:40,ty:32,duration:1,age:0};
const point=e.t.anticipateFlight(runner,f);assert(point&&point.time<=.8&&point.x<40);assert.equal(point.x,10+30*point.time);assert(e.t.arrivalTime(runner,point,2.2)<=point.time);
assert.equal(e.t.anticipateFlight({...runner,x:95},f),null);assert.equal(e.t.anticipateFlight(runner,{...f,loft:4}),null);
assert.equal(e.t.anticipateFlight(runner,{...f,age:1}),null);
const mirrored=e.t.anticipateFlight({...runner,t:1,x:70,y:29},{...f,t:1,x:90,y:32,tx:60});
assert(Math.abs(mirrored.x-(100-point.x))<1e-10);assert.equal(mirrored.time,point.time);
function wall(firstTouch=true,facing=true,pressure=false,repeat=false){
 const sim=env();sim.t.scenario({time:1,team:0,seed:73});const s=sim.t.get(),actor=s.owner;
 for(const p of s.players){p.x=p.t?95:15;p.y=10+(p.id%11)*4;}
 actor.x=50;actor.y=32;const target=s.players.find(p=>p.t===0&&p.n===8);target.x=70;target.y=32;target.bodyAngle=facing?Math.PI:0;
 if(pressure){const rival=s.players.find(p=>p.t===1);rival.x=71;rival.y=32;}
 if(repeat){sim.t.prepareDecision();sim.nodes['target-player'].onchange({target:{value:'8'}});sim.t.playChoice('repeat');}else sim.t.executeTechnique({kind:'wall',n:8,title:'Pared',firstTouch});sim.t.capture(target,'recibe');return {sim,actor,target};
}
const direct=wall();assert.equal(direct.sim.t.get().techAction.returnMode,'firstTouch');assert.equal(direct.target.controlDuration,0);
direct.sim.t.update(.001);assert.equal(direct.sim.t.get().passes,2,'return in same update without control delay');assert.equal(direct.sim.t.get().flight.target,direct.actor);
assert.equal(direct.sim.t.get().techAction.phase,1);assert(direct.sim.t.get().flight.execution,'normal pass error remains active');
for(const w of [wall(false),wall(true,false),wall(true,true,true)]){assert.equal(w.sim.t.get().techAction.returnMode,'control');assert(w.target.controlDuration>0,'fallback retains preparation');}
const cancelled=wall(false);cancelled.actor.sentOff=true;cancelled.sim.t.update(.001);assert.equal(cancelled.sim.t.get().techAction,null,'unavailable return recipient cancels wall');
// Repeat returns to A's actual position, without the wall's prescribed forward run.
const repeated=wall(true,true,false,true);assert.equal(repeated.sim.t.get().techAction.returnMode,'firstTouch');
repeated.actor.x=48;repeated.actor.y=34;repeated.sim.t.update(.001);
assert.equal(repeated.sim.t.get().flight.target,repeated.actor);assert.equal(repeated.sim.t.get().passes,2);
assert(Math.abs(repeated.sim.t.get().flight.tx-repeated.actor.x)<3,'return aims at A, not the wall run nine units ahead');
const repeatedControl=wall(true,false,false,true);assert.equal(repeatedControl.sim.t.get().techAction.returnMode,'control');
repeatedControl.sim.t.update(.001);assert.equal(repeatedControl.sim.t.get().passes,1);
const repeatedGone=wall(true,true,false,true);repeatedGone.actor.sentOff=true;repeatedGone.sim.t.update(.001);
assert.equal(repeatedGone.sim.t.get().techAction,null);assert.equal(repeatedGone.sim.t.get().passes,1);
// A -> B -> C: the first-touch recipient is chosen explicitly, not forced back to A.
function relay(facing=true){
 const sim=env();sim.t.scenario({time:1,team:0,seed:73});const s=sim.t.get(),a=s.owner;
 for(const p of s.players){p.x=p.t?95:15;p.y=10+(p.id%11)*4;}
 a.x=50;a.y=32;const b=s.players.find(p=>p.t===0&&p.n===8),c=s.players.find(p=>p.t===0&&p.n===10);
 b.x=70;b.y=32;b.bodyAngle=facing?Math.PI:0;c.x=60;c.y=42;
 sim.t.prepareDecision();sim.nodes['target-player'].onchange({target:{value:'8'}});sim.nodes['relay-player'].onchange({target:{value:'10'}});
 sim.t.playChoice('relay');assert.equal(sim.t.get().techAction.nextTarget,c);sim.t.capture(b,'recibe');return {sim,a,b,c};
}
const third=relay();assert.equal(third.sim.t.get().techAction.returnMode,'firstTouch');third.sim.t.update(.001);
assert.equal(third.sim.t.get().flight.target,third.c);assert.notEqual(third.sim.t.get().flight.target,third.a);assert.equal(third.sim.t.get().passes,2);
third.sim.t.restorePosition();assert.equal(third.sim.nodes['target-player'].value,'8');assert.equal(third.sim.nodes['relay-player'].value,'10');third.sim.t.playChoice('relay');assert.equal(third.sim.t.get().techAction.nextTarget,third.c,'retry preserves both selected recipients');
const thirdControl=relay(false);assert.equal(thirdControl.sim.t.get().techAction.returnMode,'control');assert(thirdControl.b.controlDuration>0);thirdControl.sim.t.update(.001);assert.equal(thirdControl.sim.t.get().passes,1);
const thirdGone=relay();thirdGone.c.sentOff=true;thirdGone.sim.t.update(.001);assert.equal(thirdGone.sim.t.get().techAction,null);assert.equal(thirdGone.sim.t.get().passes,1,'unavailable C cancels, never redirects to A');
// First-touch eligibility uses the same mirrored geometry for either team.
for(const t of [0,1]){const sim=env(),ps=sim.t.get().players,abs=x=>t?100-x:x;for(const p of ps)if(p.t!==t){p.x=abs(95);p.y=60;}
 const receiver=ps.find(p=>p.t===t&&p.n===8),target=ps.find(p=>p.t===t&&p.n===6);receiver.x=abs(70);receiver.y=32;receiver.bodyAngle=t?0:Math.PI;
 const incoming={kind:'pass',t,x:abs(50),y:32,tx:abs(70),ty:32,duration:20/35};
 assert(sim.t.canFirstTouch(receiver,incoming,{x:abs(59),y:32},target));
 assert(!sim.t.canFirstTouch(receiver,{...incoming,loft:3},{x:abs(59),y:32},target));
 target.sentOff=true;assert(!sim.t.canFirstTouch(receiver,incoming,{x:abs(59),y:32},target));
}
// Actual motion supplies velocity, bounded by speed; retry preserves it exactly.
const motion=env();motion.t.movement(.02);assert(motion.t.get().players.every(p=>Number.isFinite(p.vx)&&Math.hypot(p.vx,p.vy)<=p.speed+1e-8));
motion.t.prepareDecision();const state=JSON.stringify(motion.t.get().players.map(p=>[p.vx,p.vy,p.bodyAngle]));motion.t.movement(.03);motion.t.restorePosition();assert.equal(JSON.stringify(motion.t.get().players.map(p=>[p.vx,p.vy,p.bodyAngle])),state);
motion.t.beginRestart('throw',0,40,0,'test');assert(motion.t.get().players.every(p=>p.vx===0&&p.vy===0));
console.log('PASS: velocity-aware arrival, reachable interception, mirrored geometry, explicit first-touch wall, fallback, normal pass error and motion-state restore');
