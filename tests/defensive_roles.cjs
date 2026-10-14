const assert=require('node:assert/strict');const {env}=require('./continuity.cjs');
const e=env(),ps=e.t.get().players.filter(p=>p.t===0&&p.n!==1);
for(const p of ps){p.x=10;p.y=10;p.speed=8;delete p.defDuty;}
const a=ps.find(p=>p.n===2),b=ps.find(p=>p.n===3),c=ps.find(p=>p.n===4);
a.x=45;a.y=32;b.x=44.9;b.y=32;c.x=43;c.y=37;
const ball={x:50,y:32};let order=e.t.defensiveOrder(0,ball);assert.equal(order[0],a);assert.equal(order[1],c);
for(let i=0;i<20;i++){b.x=i%2?45.05:44.95;order=e.t.defensiveOrder(0,ball);assert.equal(order[0],a,'small distance fluctuations must not exchange the role');}
b.x=49.5;order=e.t.defensiveOrder(0,ball);assert.equal(order[0],b,'a clear arrival advantage must allow a handover');
assert.notEqual(order[0],order[1]);assert.equal(ps.filter(p=>p.defDuty==='press').length,1);assert.equal(ps.filter(p=>p.defDuty==='cover').length,1);
assert(!order.some(p=>p.n===1));
// Assignment depends on arrival estimate, not solely on distance.
for(const p of ps){delete p.defDuty;p.x=10;p.y=10;}
a.x=46;a.y=32;a.speed=2;b.x=44;b.y=32;b.speed=8;assert.equal(e.t.defensiveOrder(0,ball)[0],b);
e.t.startSituation();e.t.movement(0);assert(e.t.get().players.some(p=>p.defDuty==='press'));
const recipient=e.t.get().players.find(p=>p.t===1&&p.n===6);e.t.capture(recipient,'recupera');assert(e.t.get().players.every(p=>p.defDuty===undefined));
e.t.movement(0);e.t.enterDecisionMode();const before=e.t.get().players.map(p=>p.defDuty);for(const p of e.t.get().players)p.defDuty='invalid';e.t.restorePosition();assert.equal(JSON.stringify(e.t.get().players.map(p=>p.defDuty)),JSON.stringify(before));
e.t.startSituation();assert(e.t.get().players.every(p=>p.defDuty===undefined));
console.log('PASS: stable handovers, clear advantage, distinct cover, keeper exclusion, speed-aware arrival, possession renewal and retry');
