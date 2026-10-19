const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('startSituation();requestAnimationFrame(frame);','startSituation();requestAnimationFrame(frame);globalThis.test.contextualDefense=contextualDefense;');
for(const t of [0,1]){
 const e=env(html),f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});e.t.scenario({time:10,team:t});
 const ps=e.t.get().players,p=ps.find(p=>p.t===t&&p.n===6),mate=ps.find(p=>p.t===t&&p.n===7),carrier=ps.find(p=>p.t!==t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7);
 for(const q of ps.filter(p=>p.t===t))Object.assign(q,f(90,60),{vx:0,vy:0});
 Object.assign(p,f(40,32));Object.assign(carrier,f(50,32));e.t.capture(carrier,'test');
 const ball=f(50,32);assert.equal(e.t.contextualDefense(p,0,ball).mode,'Temporizar sin ayuda cercana');
 Object.assign(mate,f(45,32));assert.equal(e.t.contextualDefense(p,0,ball).mode,'Presionar con acceso o ayuda');
 Object.assign(p,f(43.5,25.5));Object.assign(receiver,f(40,22));p.rivalMemory=[{id:receiver.id,...f(40,22),seenAt:10}];
 let q=e.t.contextualDefense(p,1,ball);assert(q);assert.equal(q.mode,'Cubrir línea percibida');assert(Math.hypot(q.x-p.x,q.y-p.y)<1e-8);
 Object.assign(receiver,f(80,60));q=e.t.contextualDefense(p,1,ball);assert.equal(q.mode,'Cubrir línea percibida','Hidden actual movement does not alter remembered target');
 p.rivalMemory[0].seenAt=7;assert.equal(e.t.contextualDefense(p,1,ball),null,'Expired observation cannot locate receiver');
 p.rivalMemory=[{id:receiver.id,...f(40,22),seenAt:10}];Object.assign(p,f(90,60));assert.equal(e.t.contextualDefense(p,1,ball),null,'Unreachable passing line keeps fallback cover');
 assert.equal(e.t.contextualDefense(p,3,ball),null,'Other defenders retain their roles');
}
console.log('PASS: mirrored pressure/help, delay, reachable perceived lane, hidden movement, expiry and unreachable countercase');
