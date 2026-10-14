const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),t=e.t;
assert.equal(t.boundaryCrossing({x:99,y:32},{x:100.1,y:32}),null,'whole ball must cross');
assert.equal(t.boundaryCrossing({x:99,y:32},{x:102,y:32}).side,'right');
assert.equal(t.boundaryCrossing({x:99,y:63},{x:102,y:70}).side,'bottom','first crossed line wins');
for(const side of ['left','right'])for(const last of [0,1]){
 const q=env(),s=q.t.get(),p=s.players.find(p=>p.t===last&&p.n===6);
 q.t.kickTo(p,50,30,'pass');q.t.adjudicateExit({side,x:side==='left'?-.11:100.11,y:10,z:0});
 const r=q.t.get().restart,def=side==='left'?0:1;
 assert.equal(r.kind,last===def?'corner':'goalKick');assert.equal(r.t,last===def?1-def:def);
}
for(const last of [0,1]){
 const q=env(),p=q.t.get().players.find(p=>p.t===last&&p.n===6);q.t.kickTo(p,50,30,'pass');
 q.t.adjudicateExit({side:'top',x:27,y:-.11,z:0});assert.equal(q.t.get().restart.t,1-last);assert.equal(q.t.get().restart.x,27);
}
for(const side of ['left','right']){
 const q=env();q.t.adjudicateExit({side,x:side==='left'?-.11:100.11,y:32,z:0});
 assert.equal(q.t.get().score[side==='left'?1:0],1);assert.equal(q.t.get().restart.kind,'kickoff');
}
for(const [y,z] of [[35.6,0],[32,2.4]]){
 const q=env();q.t.adjudicateExit({side:'right',x:100.11,y,z});assert.equal(q.t.get().score.join(','),'0,0');
}
for(const kind of ['throw','corner','goalKick','kickoff','indirect']){
 const q=env();q.t.enterFreeMode();q.t.beginRestart(kind,0,kind==='corner'?100:25,kind==='throw'?0:32,'Prueba');
 const frozen=JSON.stringify(q.t.get().restart);q.nodes.pause.onclick();q.t.enterDecisionMode();
 assert.equal(JSON.stringify(q.t.get().restart),frozen);assert.equal(q.t.get().stage,'settle');
 for(let i=0;i<10;i++)q.tick();assert.equal(JSON.stringify(q.t.get().restart),frozen,'pause freezes restart');
 for(let i=0;i<3000&&q.t.get().restart;i++)q.t.update(1/120);
 assert(!q.t.get().restart,kind+' must resume');assert(q.t.get().flight);assert.equal(q.t.get().restartGuard.kind,kind);
 const s=q.t.get(),taker=s.players[s.restartGuard.taker];
 q.t.capture(taker,'toca de nuevo');assert.equal(q.t.get().restart.kind,'indirect');assert.equal(q.t.get().restart.t,1);
}
for(const kind of ['throw','indirect','corner','goalKick','kickoff'])for(const side of ['left','right']){
 const q=env();q.t.beginRestart(kind,0,25,0,'Prueba');for(let i=0;i<3000&&q.t.get().restart;i++)q.t.advanceRestart(1/120);
 q.t.adjudicateExit({side,x:side==='left'?-.11:100.11,y:32,z:0});
 const forbidden=side==='left'||kind==='throw'||kind==='indirect';
 assert.equal(q.t.get().score[side==='left'?1:0],forbidden?0:1);
 if(forbidden)assert.equal(q.t.get().restart.kind,side==='left'?'corner':'goalKick');
}
for(const kind of ['throw','corner','goalKick','kickoff']){
 const q=env();q.t.beginRestart(kind,0,kind==='corner'?100:0,0,'Distancias');
 for(let i=0;i<4000&&q.t.get().restart;i++)q.t.advanceRestart(1/120);
 const s=q.t.get(),from=s.flight.from;
 for(const p of s.players.filter(p=>p.t===1)){
  if(kind==='goalKick')assert(p.x>=16.5||Math.abs(p.y-32)>=20.16);
  else assert(Math.hypot(p.x-from.x,p.y-from.y)>=(kind==='throw'?2:9.15)-.04);
  if(kind==='kickoff')assert(p.x>=50);
 }
}
for(const goal of [false,true]){
 const q=env(),s=q.t.get(),p=s.owner;
 for(const other of s.players){other.x=50;other.y=60;}p.x=90;p.y=goal?32:15;
 q.t.kickTo(p,102,p.y,'shot');
 for(let i=0;i<100&&!q.t.get().restart;i++)q.t.update(1/120);
 assert.equal(q.t.get().restart.kind,goal?'kickoff':'goalKick','shot resolved by crossing, not automatic goalkeeper possession');
 assert.equal(q.t.get().owner,null);
}
const resumed=env();resumed.t.beginRestart('throw',0,20,0,'Prueba');resumed.t.enterDecisionMode();resumed.nodes['resume-ball'].onclick();
for(let i=0;i<5000&&resumed.t.get().stage==='settle';i++)resumed.tick();
assert.equal(resumed.t.get().stage,'choose','guided restart reaches decision without resetting');
resumed.t.startSituation();assert.equal(resumed.t.get().restart,null);
console.log('PASS: full-ball crossing, first exit, mirrored restarts/goals, width/height, direct-goal exceptions, second touch, pause and guided continuation');
