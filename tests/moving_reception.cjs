const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?20:10);q.y=55;}
 p.x=x(50);p.y=32;p.bodyAngle=t?0:Math.PI;p.vx=t?6:-6;p.vy=0;
 const sender=s.players.find(q=>q.t===t&&q.n===7);sender.x=x(30);sender.y=32;
 e.t.kickTo(sender,p.x,p.y,'pass',p);e.t.capture(p,'recibe');return {e,s,p,x};
}
for(const t of [0,1]){
 const c=setup(t),initial=c.p.x,deadline=c.p.controlUntil;
 c.e.t.advancePlayer(c.p,c.p.x,c.p.y,.05);
 const expected=6*.05-c.p.braking*.05*.05/2;
 assert(Math.abs(Math.abs(c.p.x-initial)-expected)<1e-8,'receive with analytical braking displacement');
 assert(Math.abs(Math.abs(c.p.vx)-(6-c.p.braking*.05))<1e-8);
 assert.equal(c.p.controlUntil,deadline);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight,null,'cannot release early');
 const pressure=setup(t),r=pressure.s.players.find(q=>q.t!==t);r.x=pressure.x(47);r.y=32;
 pressure.e.t.advancePlayer(pressure.p,pressure.p.x,32,.05);assert.equal(pressure.p.x,pressure.x(50));assert.equal(pressure.p.vx,0,'static control under observed pressure');
 const bad=setup(t);bad.p.controlError=Math.PI;bad.e.t.advancePlayer(bad.p,bad.p.x,32,.05);assert.equal(bad.p.x,bad.x(50),'bad reception angle remains static');
 const reverse=setup(t);reverse.p.vx*=-1;reverse.e.t.advancePlayer(reverse.p,reverse.p.x,32,.05);assert.equal(reverse.p.x,reverse.x(50),'no rolling backwards relative to body');
 const saved=setup(t);saved.e.t.prepareDecision();saved.e.t.advancePlayer(saved.p,saved.p.x,32,.05);const moved=saved.p.x;saved.e.t.restorePosition();assert.equal(saved.p.x,saved.x(50));saved.e.t.advancePlayer(saved.p,saved.p.x,32,.05);assert.equal(saved.p.x,moved,'retry reproduces braking');
 const live=setup(t);live.e.t.update(.02);assert.notEqual(live.p.x,live.x(50));assert.equal(live.e.t.get().bx,live.p.x,'ball follows moving reception in actual update');
 const paused=setup(t);paused.e.t.prepareDecision();for(let i=0;i<10;i++)paused.e.tick();assert.equal(paused.p.x,paused.x(50));assert.equal(Math.abs(paused.p.vx),6,'pause preserves pending momentum');
}
console.log('PASS: mirrored braking reception, release delay, pressure/orientation countercases and deterministic restore');
