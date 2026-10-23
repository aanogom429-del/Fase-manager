const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {env,signature}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const entry='startSituation();requestAnimationFrame(frame);';
const source=html.replace(entry,entry+`globalThis.test.storageFixture=()=>{lastFoul={t:1,n:4,victim:7,x:44,y:32,at:elapsed,kind:'direct',contact:'prueba',actor:14,sanction:null};advantage={t:0,x:44,y:32,started:elapsed,expires:elapsed+2.5,foul:lastFoul};lastAdvantage={...advantage,status:'pending'};};`);
const memory=new Map(),localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)};
const e=env(source,101,{localStorage});e.t.storageFixture();assert(e.t.queueOffBall(4,'hold'));assert(e.nodes['save-decision'].onclick());
const restored=env(source,101,{localStorage});restored.t.enterFreeMode();restored.t.kickTo(restored.t.get().owner,60,40,'pass');assert(restored.t.get().flight);
assert(restored.nodes['load-decision'].onclick());let s=restored.t.get();assert.equal(s.flight,null);assert.equal(s.running,false);assert.equal(s.advantage.foul,s.lastFoul);assert.equal(s.lastAdvantage.foul,s.lastFoul);assert.equal(s.offBallPlans[0].kind,'hold');
const key=[...memory.keys()][0],before=signature(restored),good=memory.get(key);
// A structurally malformed payload is rejected even if its checksum was updated.
const envelope=JSON.parse(good),payload=JSON.parse(envelope.payload);payload.state.players[0].x=null;envelope.payload=JSON.stringify(payload);let n=2166136261;for(const c of envelope.payload)n=Math.imul(n^c.charCodeAt(0),16777619);envelope.checksum=(n>>>0).toString(16);memory.set(key,JSON.stringify(envelope));
assert.equal(restored.nodes['load-decision'].onclick(),false);assert.equal(signature(restored),before);
console.log('PASS: pending advantage identity, off-ball order, load over flight, malformed state leaves play untouched');
