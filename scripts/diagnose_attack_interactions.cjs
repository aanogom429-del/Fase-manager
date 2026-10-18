const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {evaluate:game1}=require('./evaluate_movement.cjs'),{evaluate:game2}=require('./evaluate_game2.cjs');
const plan=require('../data/attack-interaction-plan.json'),original=require('../data/metrica-analysis.json'),holdout=require('../data/support-holdout-windows.json');
const baseline1=require('../data/support-stability.json'),baseline2=require('../data/support-holdout-validation.json');
function diagnose(progress=()=>{}){
 const clips=plan.clips.map(id=>{
  const first=original.clips.find(c=>c.id===id),c=first||holdout.clips.find(c=>c.id===id);
  assert(c,'missing fixed clip');
  const run=disabled=>first?game1(c,.35,{disabledMechanisms:disabled}):game2(c,{id,start:c.start,end:c.end,attacking:true},{disabledMechanisms:disabled});
  let baseline;try{baseline=run([]);}catch(e){progress(id+' excluded');return {id,excluded:true,reason:e.message};}
  assert(!baseline.excluded,'unexpected incomplete Game 1 clip');
  const error=r=>first?r.positionMAEM:r.meanErrorM;
  assert.equal(error(baseline),first?baseline1.clips.find(c=>c.id===id).afterErrorM:baseline2.clips.find(c=>c.id===id).after.meanErrorM,'baseline must remain unchanged');
  const arms=Array.from({length:8},(_,mask)=>{const disabled=plan.factors.filter((_,i)=>mask&(1<<i)),r=mask?run(disabled):baseline;return {mask,disabled,errorM:error(r),deltaM:error(r)-error(baseline),...(first?{}:{simulatedAdvanceM:r.simulatedAdvanceM,observedAdvanceM:r.observedAdvanceM})};});
  // Interaction of removing two mechanisms: combined delta minus the sum of isolated deltas.
  const pairs=[[0,1],[0,2],[1,2]].map(([a,b])=>({factors:[plan.factors[a],plan.factors[b]],interactionM:arms[(1<<a)|(1<<b)].deltaM-arms[1<<a].deltaM-arms[1<<b].deltaM}));
  const tripleInteractionM=arms[7].errorM-arms[3].errorM-arms[5].errorM-arms[6].errorM+arms[1].errorM+arms[2].errorM+arms[4].errorM-arms[0].errorM;
  progress(id+' complete');return {id,metric:first?'Game 1 sampled time-weighted position error':'Game 2 trapezoidal time-weighted position error',arms,pairs,tripleInteractionM};
 });
 return {schemaVersion:1,engineVersion:plan.engineVersion,plan,limitations:['No deployed movement change or learning','Old diagnostic clips; no new match or independent validation','Metrics from the two evaluators are not pooled','Removal may suppress useful behaviour; lower error is not proof of better football','Selection and final-third constraints remain active; these are narrowly defined interventions'],clips};
}
if(require.main===module){const report=diagnose(console.log);fs.writeFileSync(path.join(__dirname,'../data/attack-interactions.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.clips.map(c=>({id:c.id,excluded:c.excluded,arms:c.arms?.map(a=>({disabled:a.disabled,errorM:a.errorM})),pairs:c.pairs}))));}
module.exports={diagnose};
