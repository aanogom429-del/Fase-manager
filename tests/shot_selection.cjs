const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(80);p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?45:95);q.y=55;}
 const outlet=s.players.find(q=>q.t===t&&q.n===8);outlet.x=x(80);outlet.y=42;
 const blocker=s.players.find(q=>q.t!==t&&q.n===5),keeper=s.players.find(q=>q.t!==t&&q.n===1);
 blocker.x=x(90);blocker.y=32;
 return {e,s,p,x,blocker,keeper,outlet};
}
for(const t of [0,1]){
 const blocked=setup(t);blocked.e.t.chooseAction(blocked.p);
 assert.notEqual(blocked.e.t.get().flight?.kind,'shot','do not shoot into observed central blocker');
 assert(blocked.e.t.get().flight?.kind==='pass'||blocked.p.scanUntil===0,'seek pass or carry');
 const open=setup(t);open.blocker.y=40;open.e.t.chooseAction(open.p);
 assert.equal(open.e.t.get().flight.kind,'shot','retain shot with open central lane');
 const keeperOnly=setup(t);keeperOnly.blocker.y=40;keeperOnly.keeper.x=keeperOnly.x(98);keeperOnly.keeper.y=32;
 keeperOnly.e.t.chooseAction(keeperOnly.p);assert.equal(keeperOnly.e.t.get().flight.kind,'shot','goalkeeper alone does not suppress finishing');
 const behind=setup(t);behind.blocker.x=behind.x(75);behind.e.t.chooseAction(behind.p);
 assert.equal(behind.e.t.get().flight.kind,'shot','unseen defender behind does not close forward shot');
 const manual=setup(t);manual.e.t.kickTo(manual.p,manual.x(102),32,'shot');
 assert.equal(manual.e.t.get().flight.kind,'shot','manual shot remains possible');
 function remembered(hiddenHeight,time=1.1){
  const a=setup(t);a.blocker.y=31;a.e.t.observeRivals(a.p);
  a.p.bodyAngle=t?Math.PI-1.9:1.9;a.blocker.y=hiddenHeight;
  a.e.t.scenario({time,team:t,seed:73});a.e.t.chooseAction(a.p);
  const f=a.e.t.get().flight;
  return {kind:f?.kind,target:f?.target?.id,x:f?.execution?.intendedX,y:f?.execution?.intendedY,driveX:a.p.driveX,driveY:a.p.driveY};
 }
 const memory=remembered(28);
 assert.notEqual(memory.kind,'shot','remembered blocking zone still discourages shot');
 assert.deepEqual(memory,remembered(24),'unseen blocker movement does not change decision');
 assert.equal(remembered(28,3).kind,'shot','expired blocker memory no longer supplies a known location');
 for(let seed=1;seed<=16;seed++){
  const a=setup(t,seed);a.e.t.chooseAction(a.p);
  assert.notEqual(a.e.t.get().flight?.kind,'shot','blocked line excludes automatic shot across seeds');
 }
}
console.log('PASS: mirrored blocked/open shot choice, keeper exception, hidden rear defender, manual shot and 32 blocked-line decisions');
