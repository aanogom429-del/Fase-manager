const assert=require('node:assert/strict');
const {run}=require('../scripts/diagnose_support_destinations.cjs');
const previous=require('../data/reference-v047.json');
const saved=require('../data/support-destination-diagnosis.json');
// Normalize VM-realm trace prototypes to the persisted JSON representation.
const result=JSON.parse(JSON.stringify(run()));assert.deepEqual(result,saved,'Diagnostic must reproduce exactly');
for(const c of result.clips){
 assert.equal(c.zeroVelocity.length,9);assert.equal(c.trackingVelocity.length,9);
 const mean=c.zeroVelocity.reduce((s,p)=>s+p.meanErrorM,0)/9;
 assert(Math.abs(mean-previous.clips.find(p=>p.id===c.id).current047.meanErrorM)<1e-10,'Unmodified replay changed');
 for(const mode of [c.zeroVelocity,c.trackingVelocity])for(const p of mode){
  for(const key of ['meanErrorM','realPathM','simulatedPathM','meanAppliedTargetDistanceM'])assert(Number.isFinite(p[key])&&p[key]>=0);
  assert(p.oppositeDirectionSeconds<=p.comparableMovingSeconds+1e-10);
  assert(p.firstIntent.steps.length>0);
 }
}
assert.deepEqual(require('../scripts/evaluate_reference_v047.cjs').run(),previous,'Historical report changed');
console.log('PASS: paired initial-velocity diagnostic, finite per-player measures, preserved 0.47 baseline and reproducibility');
