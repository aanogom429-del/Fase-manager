const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t=0){
 const e=env(),s=e.t.get(),x=v=>t?100-v:v;
 for(const p of s.players){p.x=x(p.t===t?25:65);p.y=p.t===t?10:55;p.cool=0;delete p.intentAt;}
 const passer=s.players.find(p=>p.t===t&&p.n===7),receiver=s.players.find(p=>p.t===t&&p.n===10);
 passer.x=x(60);passer.y=20;receiver.x=x(85);receiver.y=20;
 s.players.find(p=>p.t!==t&&p.n===1).x=x(95);
 s.players.find(p=>p.t!==t&&p.n===2).x=x(80);
 return {e,s,passer,receiver,x};
}
for(const t of [0,1]){
 const {e,s,passer,receiver,x}=setup(t);
 assert.equal(e.t.offsideLine(t,passer.x),x(80));
 for(const [position,ball,expected] of [[85,60,true],[80,60,false],[49,30,false],[50,30,false],[85,86,false],[86,86,false]]){
  receiver.x=x(position);assert.equal(e.t.inOffsidePosition(receiver,t,x(ball)),expected);
 }
 // El penúltimo adversario no se sustituye por el último jugador de campo.
 s.players.find(p=>p.t!==t&&p.n===1).x=x(40);
 assert.equal(e.t.offsideLine(t,x(60)),x(65));
}
for(const t of [0,1]){
 const {e,s,passer,receiver,x}=setup(t);
 e.t.kickTo(passer,receiver.x,receiver.y,'pass',receiver);
 const phase=JSON.stringify(e.t.get().offsidePhase);
 assert.equal(e.t.get().restart,null,'being offside is not itself an offence');
 assert(e.t.get().offsidePhase.candidates.some(c=>s.players[c.i]===receiver));
 // Defensores y receptor cambian de posición después del toque: no se recalcula.
 for(const p of s.players.filter(p=>p.t!==t))p.x=x(96);
 receiver.x=x(40);e.t.enterDecisionMode();assert.equal(JSON.stringify(e.t.get().offsidePhase),phase);
 for(let i=0;i<20;i++)e.tick();assert.equal(JSON.stringify(e.t.get().offsidePhase),phase);
 e.t.capture(receiver,'recibe');
 assert.equal(e.t.get().restart.kind,'indirect');assert.equal(e.t.get().restart.t,1-t);
 assert.equal(e.t.get().restart.x,x(40),'infringement location, even in own half');
 assert.equal(e.t.get().offsideCalls[t],1);assert.equal(e.t.get().owner,null);
 assert.equal(e.t.get().score.join(','),'0,0');
}
for(const t of [0,1]){
 const {e,passer,receiver,x}=setup(t);receiver.x=x(79);
 e.t.kickTo(passer,x(90),20,'pass',receiver);receiver.x=x(90);e.t.capture(receiver,'recibe');
 assert.equal(e.t.get().owner,receiver,'legal run beyond line after the pass');assert.equal(e.t.get().restart,null);
}
for(const origin of ['throw','goalKick','corner','kickoff','indirect',null]){
 const {e,s,passer,receiver}=setup();
 e.t.kickTo(passer,receiver.x,receiver.y,'pass',receiver,origin);e.t.capture(receiver,'recibe');
 const exempt=['throw','goalKick','corner'].includes(origin);
 assert.equal(!!e.t.get().restart,!exempt,origin+' exemption');
 if(exempt){
  const next=s.players.find(p=>p.t===0&&p.n===9);next.x=96;next.y=20;
  e.t.kickTo(receiver,next.x,next.y,'pass',next);e.t.capture(next,'recibe');
  assert.equal(e.t.get().restart.kind,'indirect','exemption only applies to direct receipt');
 }
}
{
 const {e,s,passer,receiver}=setup();e.t.kickTo(passer,85,20,'pass',receiver);
 e.t.capture(s.players.find(p=>p.t===1&&p.n===6),'intercepta');
 assert.equal(e.t.get().offsidePhase,null,'controlled opposition possession ends old phase');
 e.t.capture(receiver,'recupera');assert.equal(e.t.get().owner,receiver);
}
{
 const {e,passer,receiver}=setup();e.t.kickTo(passer,85,20,'pass',receiver);
 for(let i=0;i<240&&!e.t.get().restart;i++)e.t.update(1/120);
 assert.equal(e.t.get().restart.kind,'indirect','real flight contact invokes offence');
 assert.equal(e.t.get().offsideCalls[0],1);
 e.t.startSituation();assert.equal(e.t.get().offsidePhase,null);assert.equal(e.t.get().offsideCalls.join(','),'0,0');
}
{
 const {e,passer,receiver}=setup();e.t.capture(passer,'controla');e.t.prepareDecision();
 e.t.kickTo(passer,85,20,'pass',receiver);e.t.capture(receiver,'recibe');assert.equal(e.t.get().offsideCalls[0],1);
 e.t.restorePosition();assert.equal(e.t.get().offsideCalls[0],0);assert.equal(e.t.get().lastOffside,null);
 e.t.kickTo(e.t.get().owner,85,20,'pass',receiver);e.t.capture(receiver,'recibe');assert.equal(e.t.get().offsideCalls[0],1,'retry repeats offence');
}
{
 const {e,passer,receiver}=setup();e.t.capture(passer,'controla');
 const target=e.t.attackingTargets(0,{x:60,y:20}).get(receiver);assert(target.x<=79.3+1e-7);
 e.t.kickTo(passer,90,20,'pass',receiver);
 assert.equal(e.t.get().flight.tx>80,true,'no artificial clipping of pass destination');
}
for(const [x,y] of [[10,32],[50,32],[90,32]]){
 const e=env(),t=x===90?1:0;
 for(const p of e.t.get().players){p.x=x;p.y=y;}
 e.t.beginRestart('indirect',t,x,y,'Prueba');
 for(let i=0;i<3000&&e.t.get().restart;i++)e.t.advanceRestart(1/120);
 assert(!e.t.get().restart);
 for(const p of e.t.get().players.filter(p=>p.t!==t)){
  assert(Math.hypot(p.x-x,p.y-y)>=9.15-.04);
  if(x===10)assert(p.x>=16.5||Math.abs(p.y-32)>=20.16);
  if(x===90)assert(p.x<=83.5||Math.abs(p.y-32)>=20.16);
 }
}
console.log('PASS: both directions, level/own half/behind ball, second-last opponent, passive position, frozen kick snapshot, return to own half, late run, exemptions, controlled interception, real contact, reset, retry and free-kick distances');
