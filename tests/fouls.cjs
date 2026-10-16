const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,x=50,y=32,gap=.8){
 const e=env();e.t.scenario({time:12,team:t});const s=e.t.get(),a=s.owner,b=s.players.find(p=>p.t!==t&&p.n===6);
 a.x=x;a.y=y;b.x=x+(t===0?gap:-gap);b.y=y;b.cool=0;return {e,a,b};
}
for(const t of [0,1]){
 for(const [x,y,kind] of [[50,32,'direct'],[t===0?90:10,32,'penalty'],[t===0?83.5:16.5,11.84,'penalty'],[t===0?83.49:16.51,32,'direct'],[t===0?90:10,11.83,'direct']]){
  const {e,a,b}=setup(t,x,y);assert.equal(e.t.resolveChallenge(b,a,0),'foul');
  let s=e.t.get();assert.equal(s.restart.kind,kind);assert.equal(s.restart.t,t);assert.equal(s.foulCalls[1-t],1);assert.equal(s.lastFoul.x,x);assert.equal(s.owner,null);
  const frozen=JSON.stringify(s.restart);e.t.enterFreeMode();e.nodes.pause.onclick();e.t.enterDecisionMode();assert.equal(JSON.stringify(e.t.get().restart),frozen);
  for(let i=0;i<5000&&e.t.get().restart;i++)e.t.advanceRestart(1/120);
  s=e.t.get();assert(!s.restart,'restart must finish');assert(s.flight);
  assert.equal(s.restartGuard.kind,kind);
  if(kind==='penalty'){
   assert.equal(s.flight.x,t===0?89:11);assert.equal(s.flight.y,32);assert.equal(s.flight.kind,'shot');assert((s.flight.tx-s.flight.x)*(t===0?1:-1)>0);
   for(const p of s.players){
    if(p===s.flight.from)continue;
    if(p.t!==t&&p.n===1){assert(Math.abs(p.x-(t===0?100:0))<.04);continue;}
    assert(!e.t.inPenaltyArea(1-t,p.x,p.y));assert(Math.hypot(p.x-s.flight.x,p.y-32)>=9.11);assert((p.x-s.flight.x)*(t===0?1:-1)<0);
   }
  }else for(const p of s.players.filter(p=>p.t!==t))assert(Math.hypot(p.x-s.flight.x,p.y-s.flight.y)>=9.11);
  e.t.capture(s.flight.from,'segundo toque');assert.equal(e.t.get().restart.kind,'indirect');
 }
 const legal=setup(t);assert.equal(legal.e.t.resolveChallenge(legal.b,legal.a,.9),'legal');assert.equal(legal.e.t.get().owner,legal.b);assert.equal(legal.e.t.get().foulCalls[1-t],0);
 const miss=setup(t,50,32,2);assert.equal(miss.e.t.resolveChallenge(miss.b,miss.a,0),'miss');assert.equal(miss.e.t.get().owner,miss.a);assert.equal(miss.e.t.get().restart,null);
 const far=setup(t,50,32,3);assert.equal(far.e.t.resolveChallenge(far.b,far.a,0),'none');
 const repeat=setup(t);repeat.e.t.prepareDecision();repeat.e.t.resolveChallenge(repeat.b,repeat.a,0);repeat.e.t.restorePosition();assert.equal(repeat.e.t.get().foulCalls[1-t],0);assert.equal(repeat.e.t.get().lastFoul,null);
}
for(const kind of ['direct','penalty']){
 const e=env();e.t.beginRestart(kind,0,60,32,'Prueba');for(let i=0;i<5000&&e.t.get().restart;i++)e.t.advanceRestart(1/120);
 e.t.adjudicateExit({side:'right',x:100.11,y:32,z:0});assert.equal(e.t.get().score[0],1,'direct goal permitted');
}
// Exercise the actual update path with a reproducible seed, not only the resolver.
let seed=0;for(;seed<1000000;seed++){const a=(Math.imul(seed,1664525)+1013904223)>>>0,b=(Math.imul(a,1664525)+1013904223)>>>0;if(a/4294967296<.70/120&&b/4294967296<.14)break;}
assert(seed<1000000);
for(const team of [0,1]){
 const {e,a,b}=setup(team,team===0?90:10,32);e.t.scenario({time:12,team,seed});e.t.update(1/120);
 assert.equal(e.t.get().restart.kind,'penalty','real update must call contact resolution');
 e.t.enterDecisionMode();e.nodes['resume-ball'].onclick();for(let i=0;i<7000&&e.t.get().stage==='settle';i++)e.tick();
 assert.equal(e.t.get().stage,'choose','penalty resolves into a subsequent decision');
 e.t.startSituation();assert.equal(e.t.get().foulCalls.join(','),'0,0');assert.equal(e.t.get().lastFoul,null);
}
console.log('PASS: legal tackle, missed attempt, contact foul, both teams, area lines, direct free kick, penalty setup, second touch, direct goal, pause, retry and real update/guided continuation');
