const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const renumber=e=>{for(const p of e.t.get().players)p.n=p.role==='keeper'?99:p.role==='striker'?1:30+p.id;};
const targets=(e,t,ball)=>JSON.stringify([...e.t.attackingTargets(t,ball)].map(([p,q])=>[p.id,q.x,q.y]).sort((a,b)=>a[0]-b[0]));
const positions=e=>JSON.stringify(e.t.get().players.map(p=>[p.id,p.x,p.y,p.cool,p.intentAt]));
for(const t of [0,1]){
 const a=env(),b=env();for(const e of [a,b]){e.t.scenario({time:20,team:t});e.t.enterFreeMode();}renumber(b);
 for(const ball of [{x:50,y:32},{x:t?20:80,y:10},{x:t?20:80,y:54}])assert.equal(targets(a,t,ball),targets(b,t,ball),'dorsal must not select tactical targets');
 for(let i=0;i<1200;i++){a.t.update(1/120);b.t.update(1/120);assert.equal(positions(a),positions(b),'free play remains invariant after renumbering');}
 const pa=a.t.get().players[5],pb=b.t.get().players[5];
 assert.equal(JSON.stringify(a.t.passExecution(pa,60,32)),JSON.stringify(b.t.passExecution(pb,60,32)),'precision belongs to player, not jersey');
 for(const kind of ['goalKick','penalty','throw']){
  a.t.beginRestart(kind,t,30,0,'test');b.t.beginRestart(kind,t,30,0,'test');
  assert.equal(a.t.get().restart.taker.id,b.t.get().restart.taker.id,'keeper and taker independent of jersey');
 }
}
const a=env(),b=env();renumber(b);
for(const e of [a,b]){const p=e.t.get().players[9];assert(e.t.queueOffBall(9,'depth'));e.t.commitOffBall();assert(e.t.get().offBallOrders.length);e.t.prepareDecision();}
assert.equal(JSON.stringify(a.t.get().offBallOrders),JSON.stringify(b.t.get().offBallOrders),'order reaction does not depend on jersey');
const e=env(),p=e.t.get().players[9];e.t.prepareDecision();const role=p.role;p.role='midfielder';e.t.restorePosition();assert.equal(p.role,role,'retry restores role');
const original=targets(e,0,{x:80,y:10});e.t.get().players[2].role='striker';assert.notEqual(targets(e,0,{x:80,y:10}),original,'explicit role controls behaviour');
console.log('PASS: roles, keeper, movement, precision, order delay and restarts independent of shirt numbers; role changes and retry');
