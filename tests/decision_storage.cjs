const assert=require('node:assert/strict');
const {env,signature}=require('./continuity.cjs');
const memory=new Map();
const localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)};
const create=()=>env(undefined,101,{localStorage});
const resolve=e=>{for(let i=0;i<4000&&['resolve','settle'].includes(e.t.get().stage);i++)e.tick();assert.equal(e.t.get().stage,'review');};
for(const team of [0,1])for(const choice of ['support','progress','width']){
 const original=create();original.t.enterFreeMode();original.t.scenario({time:75.25,team});original.t.enterDecisionMode();
 const p=original.t.get().players[2];p.visualMemory=[{id:3,x:21,y:40,seenAt:75}];p.rivalMemory=[{id:12,x:80,y:10,seenAt:75}];
 original.t.queueOffBall(4,'hold');
 original.nodes['saved-slot'].value='2';
 const before=signature(original),saved=JSON.stringify(original.t.savePosition());
 assert.equal(original.nodes['save-decision'].onclick(),true);
 assert.equal(signature(original),before,'saving must not change the match');
 const restored=create();restored.nodes['saved-slot'].value='2';
 restored.t.get().players[2].staleOptionalField=123;
 assert.equal(restored.nodes['load-decision'].onclick(),true);
 assert.equal(restored.t.get().players[2].staleOptionalField,undefined);
 assert.equal(signature(restored),before,'reload in a fresh JS context');
 assert.equal(JSON.stringify(restored.t.savePosition()),saved,'all saved fields must survive');
 assert.equal(restored.t.get().running,false);assert.equal(restored.t.get().stage,'choose');
 original.t.playChoice(choice);restored.t.playChoice(choice);resolve(original);resolve(restored);
 assert.equal(signature(restored),signature(original),'same chosen action must reproduce the same trajectory/outcome');
 const liveNodes=restored.t.get().players.map(p=>p.el);
 restored.t.get().players[2].staleRetryField=456;
 restored.t.restorePosition();
 assert.equal(JSON.stringify(restored.t.savePosition()),saved,'retry restores all fields and removes state absent from checkpoint');
 restored.t.get().players.forEach((p,i)=>assert.equal(p.el,liveNodes[i],'retry preserves live SVG nodes'));
 restored.t.playChoice(choice);resolve(restored);
 assert.equal(signature(restored),signature(original),'retry remains deterministic');
}
const e=create();e.nodes['saved-slot'].value='1';assert(e.nodes['save-decision'].onclick());
e.t.enterFreeMode();e.t.scenario({time:123,team:1});e.t.enterDecisionMode();e.nodes['saved-slot'].value='3';assert(e.nodes['save-decision'].onclick());
e.nodes['saved-slot'].value='1';assert(e.nodes['load-decision'].onclick());assert.equal(e.t.get().elapsed,0);
e.nodes['saved-slot'].value='3';assert(e.nodes['load-decision'].onclick());assert.equal(e.t.get().elapsed,123);
const before=signature(e),key=[...memory.keys()].find(k=>k.endsWith(':3')),good=memory.get(key);
for(const raw of ['{',JSON.stringify({version:'future'}),good.replace('checksum','broken')]){
 memory.set(key,raw);assert.equal(e.nodes['load-decision'].onclick(),false);assert.equal(signature(e),before,'bad saves must not replace the current match');
}
memory.delete(key);assert.equal(e.nodes['load-decision'].onclick(),false);assert.equal(signature(e),before);
memory.set(key,good);
e.t.enterFreeMode();assert.equal(e.nodes['save-decision'].disabled,true);assert.equal(e.nodes['save-decision'].onclick(),false);assert.equal(memory.get(key),good);
const blocked=env(undefined,101,{localStorage:{setItem(){throw Error('quota');},getItem(){throw Error('blocked');}}});
assert.equal(blocked.nodes['save-decision'].onclick(),false);assert.equal(blocked.nodes['load-decision'].onclick(),false);assert.match(blocked.nodes['saved-status'].textContent,/No se pudo/);
console.log('PASS: 6 cross-session trajectories, retry, 3 slots, corrupt/empty/incompatible data, unavailable storage, no saving in free mode');
