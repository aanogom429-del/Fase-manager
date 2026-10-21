const assert=require('node:assert/strict'),{env}=require('./continuity.cjs'),control=require('../scripts/evaluate_delayed_relay.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function setup(t=0){
 const source=control.build().replace(entry,entry+'globalThis.test.relaySnapshot=()=>{checkpoint=savePosition();};globalThis.test.relayClock=n=>{elapsed=n;};');
 const e=env(source);e.t.enterFreeMode();e.t.scenario({time:10,team:1-t,seed:101});
 const ps=e.t.get().players,f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 for(const p of ps){Object.assign(p,f(75,60),{vx:0,vy:0,bodyAngle:t?Math.PI:0,cool:0,rivalMemory:[],visualMemory:[]});delete p.intentAt;delete p.defDuty;}
 const p=ps.find(q=>q.t===t&&q.n===6),q=ps.find(q=>q.t===t&&q.n===7),c=ps.find(q=>q.t!==t&&q.n===6);
 Object.assign(c,f(20,40));e.t.capture(c,'test');Object.assign(p,f(7,34.5),{defDuty:'press'});Object.assign(q,f(8,40),{defDuty:'cover'});
 for(const actor of ps)e.t.observeRivals(actor);
 return {e,p,q,c,ps,f,read:e.t.delayedRelay.read,events:e.t.delayedRelay.events};
}
for(const t of [0,1]){
 const {e,p,q,c,f,read,events}=setup(t),pBase=f(18,40),qBase=f(13,35),initialSeed=e.t.get().trialSeed;
 e.t.relaySnapshot();assert.equal(read(p,pBase),null,'Request does not withdraw the first defender');assert(p.defRelayPending);assert.equal(q.defRelayInbox.length,1);
 assert.equal(read(q,qBase),null,'Same-frame acknowledgement forbidden');e.t.delayedRelay.observe(q);
 e.t.relayClock(10+q.reactionDelay-.01);assert.equal(read(q,qBase),null,'Recipient needs its own reaction time');
 e.t.relayClock(10+q.reactionDelay);const approach=read(q,qBase);assert(approach,'Constructed receiver can maintain approach without opening its own lines');
 e.t.delayedRelay.observe(p);assert(q.defRelayCommit);assert.equal(q.defRelayCommit.role,'approach');assert.equal(p.defRelayCommit,undefined,'Acceptance does not teleport or activate the sender');
 assert.equal(read(p,pBase),null,'Acknowledgement also takes time to read');
 e.t.advancePlayer(q,approach.x,approach.y,p.reactionDelay);
 q.intentAt=900;q.intentX=-999;q.intentY=999;
 e.t.relayClock(10+q.reactionDelay+p.reactionDelay);const protect=read(p,pBase);assert(protect,'A visible, actually approaching relay can release the sender');
 assert.equal(p.defRelayCommit.role,'protect');assert.equal(e.t.get().trialSeed,initialSeed,'Protocol never draws future randomness');
 const accept=events.find(x=>x.kind==='accept'),activate=events.find(x=>x.kind==='activate');
 assert(accept.time-accept.requestAt>=q.reactionDelay-1e-9);assert(activate.time-activate.ackAt>=p.reactionDelay-1e-9);assert(accept.time-accept.noticedAt>=q.reactionDelay-1e-9);assert(activate.time-activate.noticedAt>=p.reactionDelay-1e-9);
 const snapshot=e.t.savePosition(),saved=JSON.stringify(snapshot);read(p,pBase);assert.equal(JSON.stringify(snapshot),saved,'Mailboxes and packets are immutable across saved states');
 e.t.restorePosition();for(const actor of [p,q])for(const key of ['defRelayInbox','defRelayPending','defRelayCommit'])assert.equal(actor[key],undefined,'Retry clears post-checkpoint protocol state');
}
// Other players' unread intentions must not determine a request or acceptance.
for(const privateIntent of [-999,999]){
 const {e,p,q,f,read}=setup();q.intentAt=10.2;q.intentX=privateIntent;q.intentY=privateIntent;
 read(p,f(18,40));e.t.delayedRelay.observe(q);assert(p.defRelayPending);assert.equal(q.defRelayInbox[0].kind,'request');
 delete q.intentAt;p.intentAt=10.9;p.intentX=privateIntent;p.intentY=privateIntent;
 e.t.relayClock(10+q.reactionDelay);assert(read(q,f(13,35)),'Acceptance uses observed sender motion, not its private destination');
}
{
 const {e,p,q,f,read}=setup();p.intentAt=10.2;assert.equal(read(p,f(18,40)),null);assert.equal(q.defRelayInbox,undefined,'Pending own intention prevents sending');delete p.intentAt;
 p.bodyAngle=Math.PI;assert.equal(read(p,f(18,40)),null);assert.equal(q.defRelayInbox,undefined,'Hidden carrier is not used');p.bodyAngle=0;
 read(p,f(18,40));q.bodyAngle=Math.PI;e.t.relayClock(10+q.reactionDelay);assert.equal(read(q,f(13,35)),null,'Blind recipient cannot accept');
 q.bodyAngle=0;e.t.get().offBallOrders.push({i:e.t.get().players.indexOf(q),until:20});assert.equal(read(q,f(13,35)),null,'Explicit orders override the agreement');
}
{
 const {e,p,q,f,read}=setup();read(p,f(18,40));q.bodyAngle=.3;
 e.t.delayedRelay.observe(q);e.t.relayClock(10+q.reactionDelay);q.bodyAngle=0;e.t.delayedRelay.observe(q);
 assert.equal(read(q,f(13,35)),null,'A previously unseen signal cannot spend its reaction time while hidden');
 e.t.relayClock(10+2*q.reactionDelay);assert(read(q,f(13,35)),'The observed signal may be accepted after the local reaction delay');
}
{
 const {e,p,q,f,read,events}=setup();read(p,f(18,40));e.t.delayedRelay.observe(q);e.t.relayClock(10+q.reactionDelay);assert(read(q,f(13,35)));e.t.delayedRelay.observe(p);
 e.t.relayClock(10+q.reactionDelay+p.reactionDelay);assert.equal(read(p,f(18,40)),null,'An acknowledgement alone cannot replace actual approach');
 assert(events.some(x=>x.kind==='decline-after-ack'));e.t.delayedRelay.observe(q);
 e.t.relayClock(10+2*q.reactionDelay+p.reactionDelay);assert.equal(read(q,f(13,35)),null);assert.equal(q.defRelayCommit,undefined,'Cancellation is read locally after its own delay');
}
{
 const {e,p,q,c,ps,f,read,events}=setup();read(p,f(18,40));e.t.delayedRelay.observe(q);
 const other=ps.find(a=>a.t===c.t&&a.n===7);Object.assign(other,f(20,41));e.t.capture(other,'test');e.t.relayClock(10+q.reactionDelay);
 assert.equal(read(q,f(13,35)),null);assert(events.some(x=>x.kind==='stale-carrier'));assert.equal(q.defRelayCommit,undefined);
}
{
 const {e,p,q,f,read}=setup();read(p,f(18,40));e.t.delayedRelay.observe(q);e.t.relayClock(q.defRelayInbox[0].expires+.01);
 assert.equal(read(q,f(13,35)),null);assert.equal(q.defRelayInbox,undefined,'Expired requests cannot be accepted');
}
console.log('PASS delayed relay: mirrored request/accept/activate timing, observed motion, private-intention invariance, own readiness, perception, orders, immutable checkpoint/retry and no random draws');
module.exports={setup};
