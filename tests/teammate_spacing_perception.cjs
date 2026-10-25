const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined;
function setup(t,visible=false,otherX=29,recovery=false){
 const e=env(source);e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const p of s.players){p.x=x(p.t===t?(recovery?50:10):(recovery?75:90));p.y=55;delete p.attackOrigin;delete p.attackSupport;}
 s.owner.x=x(recovery?70:50);s.owner.y=32;
 for(const [n,y]of [[7,23],[8,41]]){const m=s.players.find(p=>p.t===t&&p.n===n);m.x=x(recovery?65:45);m.y=y;}
 const p=s.players.find(p=>p.t===t&&p.n===(recovery?10:3));p.x=x(recovery?90:30);p.y=recovery?10:24;p.bodyAngle=(t?Math.PI:0)+(visible?Math.PI:0);
 const m=s.players.find(p=>p.t===t&&p.n===4);m.x=x(otherX);m.y=p.y;
 const target=()=>e.t.attackingTargets(t,{x:x(recovery?70:50),y:32}).get(p);
 return {e,s,p,m,x,target};
}
for(const t of [0,1]){
 const hidden=setup(t),far=setup(t,false,20);
 assert.equal(hidden.target().y,far.target().y,'unseen teammate movement must not change spacing');
 assert.equal(hidden.target().y,24);assert.equal(hidden.p.attackSupport,0);
 assert(!hidden.p.visualMemory.some(m=>m.id===hidden.m.id));
 const visible=setup(t,true),q=visible.target();assert.notEqual(q.y,24,'avoid an observed teammate');
 assert.equal(visible.p.y,24,'no teleport when choosing');
 for(let i=0;i<60;i++)visible.e.t.advancePlayer(visible.p,q.x,q.y,1/60);
 assert(visible.p.y<24,'physical movement toward the separated destination');
 const memory=setup(t,true);memory.target();memory.p.bodyAngle=t?Math.PI:0;memory.m.x=memory.x(20);
 assert.notEqual(memory.target().y,24,'remember last seen teammate, not hidden position');
 assert.equal(memory.p.visualMemory.find(m=>m.id===memory.m.id).x,memory.x(29));
 memory.p.bodyAngle=(t?Math.PI:0)+Math.PI;assert.equal(memory.target().y,24,'looking again refreshes position');
 const expired=setup(t,true);expired.target();expired.p.bodyAngle=t?Math.PI:0;
 expired.e.t.scenario({time:4,team:t,seed:73});assert.equal(expired.target().y,24,'expired unseen teammate no longer repels');
 const unavailable=setup(t,true);unavailable.target();unavailable.m.sentOff=true;
 assert.equal(unavailable.target().y,24,'expelled teammate no longer occupies a destination');
 const saved=setup(t,true);saved.target();saved.e.t.prepareDecision();const before=saved.target();
 for(let i=0;i<10;i++)saved.e.tick();assert.equal(saved.e.t.get().elapsed,1,'pause does not expire memory');
 saved.p.y=40;saved.e.t.restorePosition();assert.equal(saved.target().y,before.y,'retry preserves spacing choice');
 const hiddenRecovery=setup(t,false,74.3,true),clearRecovery=setup(t,false,50,true);
 assert.equal(hiddenRecovery.target().y,clearRecovery.target().y,'unseen teammate cannot divert onside recovery');
 assert.equal(hiddenRecovery.target().y,10);
 const seenRecovery=setup(t,true,74.3,true);assert.equal(seenRecovery.target().y,6,'observed occupied recovery destination is avoided');
 seenRecovery.p.bodyAngle=t?Math.PI:0;seenRecovery.m.x=seenRecovery.x(50);
 assert.equal(seenRecovery.target().y,6,'recovery uses remembered teammate position');
 seenRecovery.e.t.scenario({time:4,team:t,seed:73});assert.equal(seenRecovery.target().y,10,'recovery releases expired remembered destination');
}
console.log('PASS: mirrored teammate spacing and onside recovery, observation, memory, expiry, expulsion, movement, pause and retry');
