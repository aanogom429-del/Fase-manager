const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const controls=require('../scripts/evaluate_finishing_resume.cjs'),evaluation=require('../scripts/evaluate_finishing_v0531.cjs');
const root=path.join(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const report=read('data/finishing-resume-v0531.json'),regression=read('data/regression-resume-v0531.json');
const definitions=evaluation.definitions(),sources=controls.sources();
assert.equal(report.baseCommit,'e28d7848431305c2a449b402c18000399314cd53');
assert.equal(report.simulationSha256,evaluation.simulationHash());
assert.equal(report.controlRecipeSha256,controls.hash(controls.observedShotControl.toString()+controls.finitePressureControl.toString()));
assert.equal(report.reusedSimulations,0);assert.equal(report.rows.length,definitions.length);
let counted=0;
for(const [v,sha]of Object.entries(report.engineSha256))assert.equal(sha,controls.hash(sources[v]));
for(let i=0;i<definitions.length;i++){
 const {results,...config}=report.rows[i];assert.deepEqual(config,definitions[i]);
 for(const v of ['v052','v053','e28','observed'])assert(results[v],v+' missing');
 assert.equal(Boolean(results.finitePressure),controls.cases('finitePressure').some(c=>JSON.stringify(c)===JSON.stringify(config)));
 for(const result of Object.values(results)){
  counted++;assert.match(result.stateSha256,/^[a-f0-9]{64}$/);assert.equal(result.options.keeperHome,true);
  for(const metric of Object.values(result.metrics))assert(Number.isFinite(metric)&&metric>=0);
  assert(result.metrics.occasionSeconds<=result.metrics.dangerSeconds+1e-9);
  assert(result.metrics.dangerSeconds<=result.metrics.attackSeconds+1e-9);
 }
}
assert.equal(counted,report.freshSimulations);assert.equal(counted,320);
assert.deepEqual(report.historicalAgreement,{v052:76,v053:76,e28:76});
assert.equal(regression.initialWorktreeClean,true);assert.equal(regression.baselineEntries.length,55);
for(const entry of regression.baselineEntries){
 assert.equal(entry.exit,0,entry.test);assert.equal(entry.sha256,controls.hash(fs.readFileSync(path.join(root,entry.test))));
}
assert.equal(regression.baselineEntries.filter(e=>e.test.endsWith('.cjs')).length,54);
const trace=read('data/finishing-resume-traces.json');assert.equal(trace.rows.length,8);
for(const row of trace.rows){
 assert.equal(row.sourceSha256,report.engineSha256[row.version]);
 const pair=report.rows.find(c=>c.group==='orientation'&&c.t===row.t&&c.seed===row.seed&&c.kind==='pass'&&c.options.angle===0);
 assert.equal(row.goalsConceded,pair.results[row.version].goalsConceded);
 assert.deepEqual(row.metrics,pair.results[row.version].metrics,'Tracing cannot change the simulation');
}
console.log('PASS: recovered-file manifest, fresh 320 simulations, exact historical replication, immutable controls and eight passive adverse traces');
