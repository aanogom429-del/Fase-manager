const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const depth of [20,55,72]){
 const e=env();e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(depth);p.y=32;
 for(const r of s.players.filter(q=>q.t!==t)){r.x=x(95);r.y=5+r.n*4;}
 e.t.setDestinationTrace(true);
 const before=JSON.stringify(s.players.map(q=>[q.x,q.y]));
 const targets=e.t.attackingTargets(t,p);
 const rows=e.t.getDestinationTrace().rows;
 assert(rows.some(r=>r.steps.some(k=>k.stage.startsWith('Red de iniciación'))),'structural initiation at every depth');
 const safety=s.players.filter(q=>q.t===t&&q.attackBalance);
 assert(safety.length===2);
 for(const q of safety)assert((targets.get(q).x-p.x)*(t?-1:1)<0,'safety remains behind ball');
 assert.equal(JSON.stringify(s.players.map(q=>[q.x,q.y])),before,'targets do not teleport');
 // Same ball position, but first pressure beaten: no initiation override.
 s.players.find(q=>q.t!==t&&q.n===9).x=x(depth-8);
 e.t.setDestinationTrace(true);e.t.attackingTargets(t,p);
 assert(!e.t.getDestinationTrace().rows.some(r=>r.steps.some(k=>k.stage.startsWith('Red de iniciación'))));
}
for(const t of [0,1]){
 const e=env();e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v,dir=t?-1:1;
 p.x=x(40);p.y=32;p.bodyAngle=t?Math.PI:0;
 for(const r of s.players.filter(q=>q.t!==t)){r.x=x(90);r.y=5+r.n*4;}
 const receiver=s.players.find(q=>q.t===t&&q.n===8);receiver.x=x(55);receiver.y=32;
 e.t.kickTo(p,receiver.x,receiver.y,'pass',receiver);const f=e.t.get().flight;assert(f);
 e.t.setDestinationTrace(true);e.t.attackingTargets(t,{x:40,y:32});
 const safe=s.players.filter(q=>q.t===t&&q.attackBalance);
 for(const q of safe){const row=e.t.getDestinationTrace().rows.find(r=>r.id===q.id);
  const step=row.steps.find(k=>k.stage.startsWith('Red de iniciación'));
  assert(step);assert(Math.abs(step.x-(f.tx-dir*(q.attackBalance===1?8:13)))<1e-8,'support anchored at receiving destination');
 }
}
console.log('PASS: mirrored structural supports at three depths, safety, no teleport, beaten-pressure exclusion and flight anticipation');
