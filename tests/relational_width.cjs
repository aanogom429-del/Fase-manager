const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {candidate}=require('../scripts/compare_relational_width.cjs'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../tests/fixtures/engine-v047.html'),'utf8');
for(const t of [0,1]){
 const old=env(source),next=env(candidate(source));
 for(const e of [old,next]){
  e.t.scenario({time:10,team:t});
  const ps=e.t.get().players,own=ps.filter(p=>p.t===t),owner=e.t.get().owner;
  owner.x=t?55:45;owner.y=32;
  for(const p of own){p.x=t?65:35;p.y=32;p.attackOrigin={x:p.x,y:32,bx:owner.x,by:32};p.attackSupport=0;}
  e.t.setDestinationTrace(true);e.t.attackingTargets(t,{x:owner.x,y:32});
 }
 const rows=next.t.getDestinationTrace().rows;
 const wide=rows.filter(r=>r.steps.some(s=>s.stage==='Destino por función'));
 assert(wide.length>0);
 for(const r of wide){const s=r.steps.find(s=>s.stage==='Destino por función');assert(Math.abs(s.y-32)<=4,'No forced far lateral lane from central origin');}
 const baseline=old.t.getDestinationTrace().rows;
 assert(baseline.some(r=>r.steps.some(s=>s.stage==='Destino por función'&&Math.abs(s.y-32)>10)),'Scenario exposes original lane jump');
}
console.log('PASS: controlled width intervention removes large central-to-wide role jump in both attack directions');
