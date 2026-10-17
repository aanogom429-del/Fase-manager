const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),{evaluate}=require('./evaluate_game2.cjs'),{evaluate:game1}=require('./evaluate_movement.cjs');
const data=require('../data/support-holdout-windows.json'),old=require('../data/support-baseline-v033.json'),existing=require('../data/metrica-analysis.json');
function validate(){
 // Confirm the ablation reproduces stored pre-persistence results, not a guessed baseline.
 for(const b of old['game2-validation'].clips){const c=existing.clips.find(c=>c.id===b.id);assert.equal(evaluate(c,b,{statelessSupports:true}).meanErrorM,b.meanErrorM);}
 const clips=data.clips.map(c=>{const d={id:c.id,start:c.start,end:c.end,attacking:true};try{return {id:c.id,before:evaluate(c,d,{statelessSupports:true}),after:evaluate(c,d)};}catch(e){return {id:c.id,excluded:true,reason:e.message};}});
 const regressions=['away-progress','contrast-progress'].map(id=>{
  const c=existing.clips.find(c=>c.id===id),before=game1(c,.35,{diagnostics:true,statelessSupports:true}),after=game1(c,.35,{diagnostics:true});
  assert.equal(before.positionMAEM,old['attack-comparison'].clips.find(c=>c.id===id).after.positionMAEM);
  const perPlayer=after.perPlayer.map(p=>{const b=before.perPlayer.find(q=>q.playerRole===p.playerRole);return {jersey:p.jersey,beforeErrorM:b.positionMAEM,afterErrorM:p.positionMAEM,contributionM:(p.positionMAEM-b.positionMAEM)/after.players,observedAdvanceM:p.observedAdvanceM,beforeAdvanceM:b.simulatedAdvanceM,afterAdvanceM:p.simulatedAdvanceM};});
  assert(Math.abs(perPlayer.reduce((s,p)=>s+p.contributionM,0)-(after.positionMAEM-before.positionMAEM))<1e-9);
  return {id,beforeErrorM:before.positionMAEM,afterErrorM:after.positionMAEM,perPlayer};
 });
 return {schemaVersion:1,engineVersion:'0.34',baselineVersion:'0.33',selection:data.selection,method:'Frozen windows; identical controlled replay, only support persistence disabled for baseline. No parameter fitting. Whole incomplete windows excluded without replacement.',limitations:['Same previously used match, not independent match validation','Approximate shirt-to-role mapping','Position error is not tactical quality; stationary baseline is not a playing policy','Recorded ball and actors prescribed; not free simulation or learning'],clips,regressions};
}
if(require.main===module){const r=validate();fs.writeFileSync(path.join(root,'data/support-holdout-validation.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify({clips:r.clips.map(c=>({id:c.id,excluded:c.excluded,reason:c.reason,before:c.before?.meanErrorM,after:c.after?.meanErrorM,stationary:c.after?.stationaryErrorM,observed:c.after?.observedAdvanceM,simulated:c.after?.simulatedAdvanceM})),regressions:r.regressions.map(c=>({id:c.id,dominant:[...c.perPlayer].sort((a,b)=>b.contributionM-a.contributionM)[0]}))}));}
module.exports={validate};
