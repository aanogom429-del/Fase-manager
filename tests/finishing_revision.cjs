const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),entry='startSituation();requestAnimationFrame(frame);';
function setup(t){
 const e=env(source.replace(entry,entry+'globalThis.test.read=contextualDefense;globalThis.test.protect=protectFinishingLine;globalThis.test.guard=projectedShotGuard;globalThis.test.position=finishingPosition;globalThis.test.wait=finishingReadDelay;'));
 e.t.scenario({time:10,team:t});const f=(x,y)=>({x:t?100-x:x,y:t?64-y:y}),ps=e.t.get().players;
 const p=ps.find(q=>q.t===t&&q.n===6),mate=ps.find(q=>q.t===t&&q.n===7),c=ps.find(q=>q.t!==t&&q.n===6),receiver=ps.find(q=>q.t!==t&&q.n===7);
 for(const q of ps)Object.assign(q,f(80,60),{vx:0,vy:0,rivalMemory:[],visualMemory:[]});
 Object.assign(c,f(20,40),{bodyAngle:t?0:Math.PI});e.t.capture(c,'test');Object.assign(p,f(7,36),{bodyAngle:t?Math.PI:0});
 return {e,p,mate,c,receiver,ps,f};
}
for(const t of [0,1]){
 const {e,p,mate,c,receiver,ps,f}=setup(t),proposed=f(15,40),read=()=>e.t.protect(p,0,c,proposed),initial=JSON.stringify(e.t.savePosition());
 const protect=read();assert(protect?.mode.includes('tiro'),'Unbacked shot corridor can still justify protection');
 assert.equal(JSON.stringify(e.t.savePosition()),initial,'Hypotheses do not alter state or random seed');
 assert.equal(e.t.protect(p,1,c,proposed).mode,'Mantener cobertura de tiro');
 // A turn is not a compulsory wind-up: kickTo can launch at the same instant.
 c.bodyAngle+=Math.PI;assert.equal(JSON.stringify(read()),JSON.stringify(protect));c.bodyAngle-=Math.PI;
 // Retain the previous approach when its path already blocks the threat.
 Object.assign(p,f(7,34.5));assert.equal(read(),null);Object.assign(p,f(7,36));
 // A visible/recent receiver whose line would be abandoned vetoes the override.
 p.rivalMemory=[{id:receiver.id,...f(0,35.5),seenAt:10}];assert.equal(read(),null,'Do not open an unbacked passing line');
 p.rivalMemory[0].seenAt=0;assert(read(),'Expired memory cannot constrain the policy');p.rivalMemory=[];
 Object.assign(p,f(19,40));assert.equal(read(),null,'Tackle-range access preserves pressure');Object.assign(p,f(7,36));
 e.t.get().offBallOrders.push({i:ps.indexOf(p),until:20});assert.equal(read(),null,'Explicit orders remain authoritative');e.t.get().offBallOrders.length=0;
 // No private destination of the helper: only visible position and motion are used.
 const a=JSON.stringify(read());mate.intentX=123;mate.intentY=-40;assert.equal(JSON.stringify(read()),a);
 // Hidden carrier orientation/velocity cannot affect the policy.
 p.bodyAngle=t?0:Math.PI;const hidden=JSON.stringify(read());c.bodyAngle+=1;c.vx=5;c.vy=-8;
 assert.equal(JSON.stringify(read()),hidden);assert.equal(read(),null);
 p.bodyAngle=t?Math.PI:0;c.vx=0;c.vy=0;
 Object.assign(c,f(40,40));assert.equal(read(),null,'No distant-shot protection');Object.assign(c,f(20,55));assert.equal(read(),null,'No wide-shot protection');
 // Match actual cache readiness, including reset/stale-time recovery in movement.
 assert.equal(e.t.wait(p),0);p.intentAt=10.2;assert(Math.abs(e.t.wait(p)-.2)<1e-9);
 p.intentAt=9;assert.equal(e.t.wait(p),0);p.intentAt=12;assert.equal(e.t.wait(p),0);
}
console.log('PASS: mirrored physical protection, immediate action timing, pressure/pass trade-offs, explicit orders, perception and cache readiness');
module.exports={setup};
