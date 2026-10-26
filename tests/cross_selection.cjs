const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?15:95);q.y=55;}
 p.x=x(80);p.y=10;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),r=s.players.find(q=>q.t!==t);
 a.x=x(90);a.y=32;r.x=a.x;r.y=a.y;return {e,s,p,a,b,r,x,t};
}
for(const t of [0,1]){
 const marked=setup(t);marked.e.t.chooseAction(marked.p);assert(!marked.e.t.get().flight?.cross,'do not force cross toward fully marked receiver');
 const open=setup(t);open.r.y=55;open.e.t.chooseAction(open.p);assert(open.e.t.get().flight.cross);assert.equal(open.e.t.get().flight.target,open.a,'retain open cross');
 const stale=setup(t);stale.r.y=55;stale.e.t.observeTeammates(stale.p);stale.e.t.observeRivals(stale.p);stale.p.bodyAngle=-Math.PI/2;stale.e.t.scenario({time:1.6,team:t,seed:73});stale.e.t.chooseAction(stale.p);assert(!stale.e.t.get().flight?.cross,'do not cross toward an old unseen receiver');
 const refreshed=setup(t);refreshed.r.y=55;refreshed.e.t.observeTeammates(refreshed.p);refreshed.e.t.scenario({time:1.6,team:t,seed:73});refreshed.e.t.chooseAction(refreshed.p);assert(refreshed.e.t.get().flight?.cross,'seeing receiver again permits cross');
 const alternative=setup(t);alternative.b.x=alternative.x(88);alternative.b.y=24;alternative.e.t.chooseAction(alternative.p);
 assert(alternative.e.t.get().flight.cross);assert.equal(alternative.e.t.get().flight.target,alternative.b,'choose unmarked alternative');
 function memory(time,hiddenX){const m=setup(t);m.e.t.observeRivals(m.p);m.r.x=m.x(hiddenX);m.r.y=10;m.e.t.scenario({time,team:t,seed:73});m.e.t.chooseAction(m.p);return !!m.e.t.get().flight?.cross;}
 assert.equal(memory(1.2,60),false,'remembered marking still matters');assert.equal(memory(1.2,50),false,'hidden movement does not clear remembered marking');assert.equal(memory(3,60),true,'expired memory does not preserve precise marking');
 for(let seed=1;seed<=16;seed++){const q=setup(t,seed);q.e.t.chooseAction(q.p);assert(!q.e.t.get().flight?.cross);}
}
console.log('PASS: mirrored marked/open cross, alternative receiver, memory/expiry and 32 marked-target decisions');
