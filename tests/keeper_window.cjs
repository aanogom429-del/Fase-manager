const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const setup=()=>{const e=env();e.t.enterFreeMode();e.t.scenario({time:10,team:1-t});const s=e.t.get(),x=v=>t?100-v:v;
  const g=s.players.find(q=>q.t===t&&q.n===1),p=s.owner;
  for(const q of s.players){q.x=x(q.t===t?18:82);q.y=q.t===t?32:50;}
  g.x=x(7);g.y=21;g.bodyAngle=t?Math.PI:0;p.x=x(24);p.y=21;p.bodyAngle=t?0:Math.PI;
  e.t.kickTo(p,g.x,g.y,'shot');e.t.capture(g,'bloca');p.x=x(82);return {e,s,g,x};};
 const {e,s,g}=setup();const backs=s.players.filter(q=>q.t===t&&q.n>=2&&q.n<=5);
 for(let i=0;i<60;i++)e.t.update(1/60);
 assert.equal(e.t.get().owner,g);assert(Math.max(...backs.map(q=>q.y))-Math.min(...backs.map(q=>q.y))>2,'actual movement while held');
 const timed=setup();timed.g.receivedAt=2.01;timed.e.t.update(.02);
 const restart=timed.e.t.get().restart;assert.equal(restart.kind,'corner');assert.equal(restart.t,1-t);assert.equal(restart.y,.2);
 const feet=setup();feet.g.keeperReceipt='pies';feet.g.receivedAt=1;feet.e.t.update(.02);assert(!feet.e.t.get().restart);
}
console.log('PASS: keeper retains while defenders physically fan out; overdue hands -> corner, not feet, both teams');
