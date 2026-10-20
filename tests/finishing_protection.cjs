// Archived 0.53 policy expectations; current corrective policy is exercised in finishing_revision.cjs.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env,signature}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'fixtures/engine-v053.html'),'utf8'),entry='startSituation();requestAnimationFrame(frame);';
function setup(t){
 const e=env(source.replace(entry,entry+'globalThis.test.read=contextualDefense;globalThis.test.base=contextualDefensePlan;globalThis.test.protect=protectFinishingLine;'));
 e.t.scenario({time:10,team:t});const f=(x,y)=>({x:t?100-x:x,y:t?64-y:y}),ps=e.t.get().players;
 const p=ps.find(q=>q.t===t&&q.n===6),mate=ps.find(q=>q.t===t&&q.n===7),c=ps.find(q=>q.t!==t&&q.n===6);
 for(const q of ps)Object.assign(q,f(80,60),{vx:0,vy:0,rivalMemory:[],visualMemory:[]});
 Object.assign(c,f(20,40),{bodyAngle:t?0:Math.PI});e.t.capture(c,'test');
 Object.assign(p,f(7,34.5),{bodyAngle:t?Math.PI:0});
 return {e,p,mate,c,ps,f,read:rank=>e.t.read(p,rank,c)};
}
for(const t of [0,1]){
 const {e,p,mate,c,ps,f,read}=setup(t),initial=JSON.stringify(e.t.savePosition());
 assert.equal(read(0).mode,'Proteger línea de tiro');
 Object.assign(p,f(4,32));assert.equal(read(1).mode,'Mantener cobertura de tiro');Object.assign(p,f(7,34.5));
 assert.equal(JSON.stringify(e.t.savePosition()),initial,'Prediction must not move actual state or consume RNG');
 const target=read(0);assert(Number.isFinite(target.score));assert(Math.abs(target.y-p.y)>.5);
 // Existing layer remains authoritative when it does not expose a ray.
 assert.equal(e.t.protect(p,0,c,{x:p.x,y:p.y}),null,'A destination preserving the ray needs no override');
 Object.assign(p,f(7,34.5));Object.assign(mate,f(12,35.8));
 assert(!read(0).mode.includes('tiro'),'Visible stationary help covers exposed corridor');
 e.t.get().offBallOrders.push({i:ps.indexOf(mate),until:20});assert.equal(read(0).mode,'Proteger línea de tiro');e.t.get().offBallOrders.length=0;
 mate.defDuty='press';assert.equal(read(0).mode,'Proteger línea de tiro');mate.defDuty=null;
 Object.assign(mate,{vx:0,vy:t?8:-8});assert.equal(read(0).mode,'Proteger línea de tiro','Moving help leaving corridor is unavailable');
 Object.assign(mate,f(80,60),{vx:0,vy:0});
 // Hidden carrier heading/velocity must have no influence on the new policy.
 p.bodyAngle=t?0:Math.PI;const hidden=JSON.stringify(read(0));c.bodyAngle+=1; c.vx=5;
 assert.equal(JSON.stringify(read(0)),hidden);p.bodyAngle=t?Math.PI:0;c.vx=0;
 c.bodyAngle=t?Math.PI:0;assert(!read(0).mode.includes('tiro'),'Facing away gives time to turn, not immediate shot protection');
 c.bodyAngle=t?0:Math.PI;Object.assign(p,f(20,40));assert(!read(0).mode.includes('tiro'),'Immediate access permits pressure');
 Object.assign(p,f(7,34.5));Object.assign(c,f(40,40));assert(!read(0).mode.includes('tiro'),'Distant carrier not dangerous');
 Object.assign(c,f(20,55));assert(!read(0).mode.includes('tiro'),'Wide carrier not dangerous');
 Object.assign(c,f(20,40));e.t.get().offBallOrders.push({i:ps.indexOf(p),until:20});assert(!read(0).mode.includes('tiro'),'Explicit order keeps precedence');
 e.t.get().offBallOrders.length=0;
 // Opposing trajectory changes the observed future origin without moving the world.
 c.vy=t?8:-8;assert.notEqual(JSON.stringify(read(0)),JSON.stringify(target));
}
console.log('PASS: mirrored finishing protection/cover, safe pressure, help/velocity/orders, hidden state, orientation, immediate access and danger limits');
module.exports={setup};
