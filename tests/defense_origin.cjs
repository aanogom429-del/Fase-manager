const assert=require('node:assert/strict');
const {env}=require('./continuity.cjs');
const e=env(),s=e.t.get(),p=s.players.find(p=>p.t===0&&p.n===6);
for(const q of s.players.filter(q=>q.t===1)){q.x=95;q.y=60;}
p.x=20;p.y=20;p.hx=5;p.hy=5;p.defOrigin={x:20,y:20,bx:50,by:32};
let q=e.t.defendingTarget(p,4,{x:50,y:32});assert.equal(q.x,20);assert.equal(q.y,20,'no displacement from distant kickoff formation');
q=e.t.defendingTarget(p,4,{x:55,y:34});assert.equal(q.x,22);assert.equal(q.y,20.7,'only ball displacement since loss is applied');
p.hx=80;p.hy=50;const other=e.t.defendingTarget(p,4,{x:55,y:34});assert.equal(JSON.stringify(q),JSON.stringify(other),'old formation must not pull a transition');
e.t.startSituation();e.t.movement(0);const defender=e.t.get().players.find(p=>p.t===1&&p.n===6);assert(defender.defOrigin);
e.t.capture(defender,'recupera');assert(e.t.get().players.every(p=>p.defOrigin===undefined),'new possession invalidates old origins');
e.t.movement(0);const blue=e.t.get().players.find(p=>p.t===0&&p.n===6);assert.equal(blue.defOrigin.x,blue.x);assert.equal(blue.defOrigin.y,blue.y);
e.t.enterDecisionMode();const saved=JSON.stringify(blue.defOrigin);blue.defOrigin={x:99,y:99,bx:99,by:99};e.t.restorePosition();assert.equal(JSON.stringify(blue.defOrigin),saved,'retry restores the same defensive reference');
e.t.startSituation();assert(e.t.get().players.every(p=>p.defOrigin===undefined));
console.log('PASS: loss-relative displacement, formation independence, possession renewal, retry and restart');
