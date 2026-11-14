const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const e=env(),s=e.t.get(),p=s.players.find(p=>p.t===0&&p.n===8),i=p.id;
assert(!e.t.queueOffBall(i,'move',{x:NaN,y:20}));
assert(e.t.queueOffBall(i,'move',{x:65,y:12}));
assert.deepEqual(JSON.parse(JSON.stringify(e.t.coordinatedOffBallTargets(e.t.get().offBallPlans).get(i))),{x:65,y:12});
assert(e.t.queueOffBall(i,'move',{x:70,y:14}));assert.equal(e.t.get().offBallPlans.length,1);
assert(!e.t.queueOffBall(s.owner.id,'move',{x:70,y:14}));
const before=[p.x,p.y];e.t.commitOffBall();const order=e.t.get().offBallOrders.find(o=>o.i===i);assert(order);assert.equal(order.x,70);assert(order.readyAt>=s.elapsed);assert.deepEqual([p.x,p.y],before);
console.log('PASS: drawn destination, replacement, invalid coordinates, carrier exclusion and delayed physical execution');
