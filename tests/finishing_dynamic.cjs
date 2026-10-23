const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {simulate}=require('../scripts/evaluate_finishing_v053.cjs');
const root=path.join(__dirname,'..'),source=fs.readFileSync(path.join(root,'index.html'),'utf8'),baseline=fs.readFileSync(path.join(root,'tests/fixtures/engine-v052.html'),'utf8');
const report=JSON.parse(fs.readFileSync(path.join(root,'data/finishing-v053.json'),'utf8'));
// The historical report describes the immutable 0.53 HTML, before storage UI.
const historical=fs.readFileSync(path.join(root,'tests/fixtures/engine-v053.html'),'utf8');
assert.equal(report.engineSha256.v053,createHash('sha256').update(historical).digest('hex'),'Historical report must identify its archived candidate');
assert.equal(report.engineSha256.v052,createHash('sha256').update(baseline).digest('hex'));
assert.equal(report.rows.length,20);
for(const t of [0,1])for(const kind of ['delayed','immediate','central','pass','free'])for(const seed of [101,202]){
 const row=report.rows.find(r=>r.after.defendingTeam===t&&r.after.kind===kind&&r.after.seed===seed);assert(row);
 for(const r of [row.before,row.after]){
  assert(r.movedDefenders>0&&r.movedAttackers>0,'Both sides must move');
  assert.equal(r.seconds,6);assert(Number.isFinite(r.goalsConceded));
  if(['delayed','immediate','central'].includes(kind))assert(r.shots>=1,'Actual flight, not static target only');
  if(kind==='pass')assert(r.passes>=1,'Actual pass executed');
 }
}
assert(report.rows.some(r=>r.goalDelta<0),'Retain favourable cases');
assert(report.rows.some(r=>r.goalDelta>0),'Retain adverse cases, do not cherry-pick');
assert(report.rows.some(r=>r.goalDelta===0),'Retain no-improvement cases');
// Re-execute a favourable autonomous case and an adverse pass/reactive case.
for(const [t,kind,seed] of [[0,'free',202],[1,'pass',101]]){
 const row=report.rows.find(r=>r.after.defendingTeam===t&&r.after.kind===kind&&r.after.seed===seed);
 assert.deepEqual(simulate(historical,t,kind,seed),row.after,'Historical candidate report reproducibility');
 assert.deepEqual(simulate(baseline,t,kind,seed),row.before,'Dynamic baseline report reproducibility');
 const current=simulate(source,t,kind,seed);
 assert.deepEqual(simulate(source,t,kind,seed),current,'Current engine remains deterministic');
 assert(current.movedDefenders>0&&current.movedAttackers>0,'Current engine moves both teams');
 assert.equal(current.seconds,6);
 assert(Number.isFinite(current.goalsConceded));
 assert(kind!=='pass'||current.passes>=1,'Prescribed pass is still executed');
}
console.log('PASS: historical/baseline replay, 20 archived pairs including adverse cases, current deterministic movement and prescribed pass');
