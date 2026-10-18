const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{evaluate}=require('./evaluate_movement.cjs');
const root=path.join(__dirname,'..'),data=require('../data/metrica-analysis.json'),before=require('../data/heights-baseline-v031.json');
function switches(rows,key){return rows.slice(1).reduce((n,r,i)=>n+(JSON.stringify([...r[key]].sort())!==JSON.stringify([...rows[i][key]].sort())?1:0),0);}
function diagnose(){
 const clips=['away-progress','home-progress','contrast-progress'].map(id=>{
  const clip=data.clips.find(c=>c.id===id),current=evaluate(clip,.35,{diagnostics:true}),legacy=evaluate(clip,.35,{diagnostics:true,legacyHeights:true});
  assert.equal(legacy.positionMAEM,before.attack.clips.find(c=>c.id===id).after.positionMAEM,'legacy-rule ablation must reproduce 0.31');
  assert.equal(current.positionMAEM,evaluate(clip,.35).positionMAEM,'observation must not change simulation');
  const supportReplay=evaluate(clip,.35,{diagnostics:true,supportTimeline:legacy.assignments});
  return {id,start:clip.start,end:clip.end,current,legacy,supportReplay,summary:{currentSupportMembershipChanges:switches(current.assignments,'support'),legacySupportMembershipChanges:switches(legacy.assignments,'support'),currentBalanceMembershipChanges:switches(current.assignments,'balance'),supportReplayErrorM:supportReplay.positionMAEM,perPlayer:current.perPlayer.map(p=>{const b=legacy.perPlayer.find(q=>q.playerRole===p.playerRole);return {jersey:p.jersey,playerRole:p.playerRole,beforeErrorM:b.positionMAEM,afterErrorM:p.positionMAEM,deltaErrorM:p.positionMAEM-b.positionMAEM,contributionToMeanDeltaM:(p.positionMAEM-b.positionMAEM)/current.players,observedAdvanceM:p.observedAdvanceM,beforeAdvanceM:b.simulatedAdvanceM,afterAdvanceM:p.simulatedAdvanceM};})}};
 });
 return {schemaVersion:1,engineVersion:fs.readFileSync(process.env.FASE_ENGINE_SOURCE||path.join(root,'index.html'),'utf8').match(/FASE MANAGER · ([0-9.]+)/)[1],method:'Diagnostic replay of all three existing Game 1 attacking windows. Legacy-height ablation reproduces 0.31 exactly. Assignment observer does not change trajectories. Additional intervention prescribes legacy support selection while retaining current height rules; this is NOT a proposed deployable policy. Per-player errors use the existing sampled, time-weighted metric.',limitations:['Existing diagnostic windows, not independent validation','Membership changes are not necessarily errors; ball and recorded actors are prescribed','Ranks and role mapping are provisional, not observed tactical intentions','No new tracking or fitted parameters; the selection-replay intervention is not a gameplay policy'],clips};
}
if(require.main===module){const report=diagnose();fs.writeFileSync(path.join(root,'data/support-diagnosis.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.clips.map(c=>({id:c.id,...c.summary}))));}
module.exports={diagnose};
