const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),entry='startSituation();requestAnimationFrame(frame);';
let protectedChoices=0,checked=0;
for(const t of [0,1]){
 const e=env(source.replace(entry,entry+'globalThis.test.protect=protectFinishingLine;globalThis.test.position=finishingPosition;'));
 e.t.scenario({time:10,team:t});const f=(x,y)=>({x:t?100-x:x,y:t?64-y:y}),ps=e.t.get().players;
 const p=ps.find(q=>q.t===t&&q.n===7),c=ps.find(q=>q.t!==t&&q.n===6);
 for(const q of ps)Object.assign(q,f(80,60),{vx:0,vy:0,rivalMemory:[],visualMemory:[]});
 Object.assign(c,f(20,40),{bodyAngle:t?0:Math.PI});e.t.capture(c,'test');
 Object.assign(p,f(12,35.8),{bodyAngle:t?Math.PI:0});
 assert.equal(e.t.protect(p,0,c,f(15,40)),null,'Without a confirmed pressure relay, geometric gain must not sacrifice approach');
 for(const rank of [0,1])for(const x of [4,7,10,13])for(const y of [33,34.5,36,39]){
  Object.assign(p,f(x,y),{bodyAngle:t?Math.PI:0});const proposed=f(rank===0?15:13,rank===0?40:35),choice=e.t.protect(p,rank,c,proposed);checked++;
  if(!choice)continue;protectedChoices++;
  if(rank===0){const a=e.t.position(p,proposed,p.reactionDelay),b=e.t.position(p,choice,p.reactionDelay);
   assert(e.t.arrivalTime({...b,intentAt:10},c,2.8)<=e.t.arrivalTime({...a,intentAt:10},c,2.8)+1e-6,'Every accepted pressing override preserves estimated access');}
 }
}
assert(protectedChoices>0,'The correction must retain useful protective choices');
console.log('PASS: pressure function preserved without a relay; checked',checked,'mirrored alternatives, retained',protectedChoices,'protective choices');
