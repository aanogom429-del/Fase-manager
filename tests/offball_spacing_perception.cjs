const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined;
function setup(t,visible=false,rivalX=29){
 const e=env(source);e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const p of s.players){p.x=x(p.t===t?10:90);p.y=55;delete p.attackOrigin;delete p.attackSupport;}
 s.owner.x=x(50);s.owner.y=32;
 for(const [n,y]of [[7,23],[8,41]]){const m=s.players.find(p=>p.t===t&&p.n===n);m.x=x(45);m.y=y;}
 const p=s.players.find(p=>p.t===t&&p.n===3);p.x=x(30);p.y=24;p.bodyAngle=(t?Math.PI:0)+(visible?Math.PI:0);
 const r=s.players.find(p=>p.t!==t&&p.n===6);r.x=x(rivalX);r.y=24;
 const target=()=>e.t.attackingTargets(t,{x:x(50),y:32}).get(p);
 return {e,s,p,r,x,target};
}
for(const t of [0,1]){
 const hidden=setup(t),far=setup(t,false,20),q=hidden.target();
 assert.equal(q.y,far.target().y,'hidden rival movement cannot alter lateral spacing');
 assert.equal(q.y,24);assert.equal(hidden.p.attackSupport,0,'test non-support player');
 assert(!hidden.p.rivalMemory.some(r=>r.id===hidden.r.id));
 const visible=setup(t,true),observed=visible.target();
 assert.notEqual(observed.y,24,'observed marker changes destination');
 assert.equal(visible.p.x,visible.x(30),'selection never teleports');
 for(let i=0;i<60;i++)visible.e.t.advancePlayer(visible.p,observed.x,observed.y,1/60);
 assert(visible.p.y<24,'destination produces actual lateral movement');
 const memory=setup(t,true);memory.target();memory.p.bodyAngle=t?Math.PI:0;
 memory.r.x=memory.x(20);const remembered=memory.target();
 assert.notEqual(remembered.y,24,'recently lost marker still influences spacing');
 assert.equal(memory.p.rivalMemory.find(r=>r.id===memory.r.id).x,memory.x(29),'do not refresh unseen coordinates');
 memory.e.t.scenario({time:4,team:t,seed:73});assert.equal(memory.target().y,24,'expired memory no longer repels');
 const saved=setup(t,true);saved.target();saved.e.t.prepareDecision();
 const first=saved.target();saved.p.y=40;saved.e.t.restorePosition();const replay=saved.target();
 assert.equal(replay.x,first.x);assert.equal(replay.y,first.y,'restore preserves perceived decision');
}
console.log('PASS: mirrored non-support spacing, hidden/visible rivals, memory expiry, movement and restore');
