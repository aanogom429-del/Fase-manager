const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('startSituation();requestAnimationFrame(frame);','startSituation();requestAnimationFrame(frame);globalThis.test.contextualDefense=contextualDefense;');
for(const t of [0,1]){
 const e=env(html),f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});e.t.scenario({time:10,team:t});
 const s=e.t.get(),ps=s.players,own=ps.filter(p=>p.t===t),press=own[5],ordinary=own[6],interceptor=own[7],carrier=ps.find(p=>p.t!==t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7);
 for(const p of ps)Object.assign(p,f(90,60),{vx:0,vy:0,rivalMemory:[],bodyAngle:t?Math.PI:0});
 Object.assign(press,f(49,32));Object.assign(ordinary,f(43,37));Object.assign(interceptor,f(43.5,25.5));Object.assign(carrier,f(50,32));Object.assign(receiver,f(40,22));e.t.capture(carrier,'test');
 interceptor.rivalMemory=[{id:receiver.id,...f(40,22),seenAt:10}];const ball=f(50,32);
 let order=e.t.defensiveOrder(t,ball);assert.equal(order[0],press);assert.equal(order[1],interceptor,'Reachable perceived line changes cover assignment');
 s.offBallOrders.push({i:ps.indexOf(interceptor),until:20});order=e.t.defensiveOrder(t,ball);assert.notEqual(order[1],interceptor,'Committed player is not counted as automatic cover');
 s.offBallOrders.length=0;
 for(const p of own)p.defDuty=null;Object.assign(press,f(40,32));Object.assign(ordinary,f(45,32));ordinary.defDuty='cover';ordinary.rivalMemory=[];
 assert.equal(e.t.contextualDefense(press,0,ball).mode,'Presionar con acceso o ayuda');
 ordinary.speed=.1;assert.equal(e.t.contextualDefense(press,0,ball).mode,'Temporizar sin ayuda cercana','Nearby but slow helper is unavailable');
 ordinary.speed=8;s.offBallOrders.push({i:ps.indexOf(ordinary),until:20});assert.equal(e.t.contextualDefense(press,0,ball).mode,'Temporizar sin ayuda cercana');
 s.offBallOrders.length=0;ordinary.defDuty=null;assert.equal(e.t.contextualDefense(press,0,ball).mode,'Temporizar sin ayuda cercana','Unassigned nearby player does not count as committed cover');
 for(const p of own.filter(p=>p.role!=='keeper'))s.offBallOrders.push({i:ps.indexOf(p),until:20});order=e.t.defensiveOrder(t,ball);assert.equal(order[1],null,'No false cover when everyone has an order');
}
console.log('PASS: mirrored threat-aware assignment, ordered players, slow/unassigned help and no-free-cover case');
