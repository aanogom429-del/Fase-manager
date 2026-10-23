const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env(),x=v=>t?100-v:v;e.t.scenario({time:1,team:t});
 const s=e.t.get(),p=s.owner;p.x=x(55);p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?20:60);q.y=60;}
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),r=s.players.find(q=>q.t!==t);
 a.x=x(75);a.y=32;b.x=x(55);b.y=42;r.x=x(55);r.y=29;
 return {e,s,p,a,b,r,x};
}
for(const t of [0,1]){
 const {e,p,a,b}=setup(t);e.t.chooseAction(p);
 assert.equal(e.t.get().flight.target,b,'prefer legal outlet over attractive offside advance');
 assert.notEqual(e.t.get().flight.target,a);
 const legal=setup(t);legal.a.x=legal.x(60);legal.e.t.chooseAction(legal.p);
 assert.equal(legal.e.t.get().flight.target,legal.a,'level with second-last opponent remains available');
 const noOutlet=setup(t);
 for(const q of noOutlet.s.players.filter(q=>q.t===t&&q!==noOutlet.p)){q.x=noOutlet.x(75);q.y=32;}
 noOutlet.e.t.chooseAction(noOutlet.p);assert.equal(noOutlet.e.t.get().flight,null,'do not force a pass when all observed outlets are offside');
 assert(Number.isFinite(noOutlet.p.scanUntil));
 // A winger sees an attractive central striker beyond the defensive line.
 for(let seed=1;seed<=12;seed++){
  const c=setup(t);c.e.t.scenario({time:1,team:t,seed});c.p.x=c.x(80);c.p.y=10;c.a.x=c.x(94);c.a.y=32;c.b.x=c.x(82);c.b.y=25;
  for(const r of c.s.players.filter(q=>q.t!==t)){r.x=c.x(88);r.y=55;}
  c.e.t.chooseAction(c.p);const f=c.e.t.get().flight;
  assert(!f||f.target!==c.a,'automatic crosses and passes exclude perceived offside receiver');
 }
}
console.log('PASS: mirrored onside outlet, level-player countercase, no forced offside pass, 24 automatic wing decisions');
