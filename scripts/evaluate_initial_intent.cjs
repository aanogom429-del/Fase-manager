// Causal diagnostic only: swap a single initial stored destination, never production policy.
const fs=require('node:fs'),assert=require('node:assert/strict');
const evaluation=require('./evaluate_finishing_v0531.cjs'),controls=require('./evaluate_finishing_resume.cjs'),posture=require('./audit_pre_shot_posture.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function build(source,target=null){
 if(target)assert(Number.isFinite(target.x)&&Number.isFinite(target.y));
 const anchor='    p.intentX=tx;p.intentY=ty;p.intentAt=elapsed+p.reactionDelay;';
 assert.equal(source.split(anchor).length,2);
 const addition=`
const initialIntentEvents=[];let initialIntentDone=false;
globalThis.test.initialIntentEvents=initialIntentEvents;
if(globalThis.test.probe)globalThis.test.probe.events.push({type:'initial-intent-diagnostic',records:initialIntentEvents});
`;
 const hook=`    if(!initialIntentDone&&elapsed<=1/120+1e-9&&p.n===6&&owner&&owner.t!==p.t){
     const original={x:tx,y:ty},replacement=${JSON.stringify(target)};
     if(replacement){tx=replacement.x;ty=replacement.y;}
     initialIntentDone=true;initialIntentEvents.push({time:elapsed,actor:p.id,team:p.t,original,applied:{x:tx,y:ty},until:elapsed+p.reactionDelay,position:{x:p.x,y:p.y,vx:p.vx,vy:p.vy,bodyAngle:p.bodyAngle}});
    }
`;
 assert.equal(source.split(entry).length,2);
 return source.replace(anchor,hook+anchor).replace(entry,entry+addition);
}
function definitions(){return posture.definitions();}
function targets(config){
 const previous=posture.readReport('data/pre-shot-posture-v0531.json.gz');
 return Object.fromEntries(['v053','e28'].map(version=>{
  const row=previous.rows.find(r=>r.version===version&&r.t===config.t&&r.kind===config.kind&&r.seed===config.seed);
  assert(row);const s=row.trajectory.find(s=>s.time===.05).players.find(p=>p.id===row.samples[0].actor);
  // Executed stored target, rather than a possibly nested protectFinishingLine proposal.
  assert(s&&Number.isFinite(s.tx)&&Number.isFinite(s.ty));return [version,{x:s.tx,y:s.ty}];
 }));
}
function recipeHash(){return controls.hash(build.toString()+targets.toString()+definitions.toString());}
function run(output){
 const src={v053:evaluation.sources().v053,e28:controls.base},previous=posture.readReport('data/pre-shot-posture-v0531.json.gz');posture.verify(previous);
 const report={protocol:'Exploratory reciprocal intervention on FIRST stored destination only at first update. No teleport, changed deadline, reaction, capabilities, random draw or later forced intent. Fixed donor target from initial executed historical trace; explanatory counterfactual, NOT a perceptual policy. Eight exposed configurations, both teams; no holdout or acceptance claim.',simulationSha256:evaluation.simulationHash(),recipeSha256:recipeHash(),postureSha256:controls.hash(fs.readFileSync('data/pre-shot-posture-v0531.json.gz')),rows:[]};
 for(const c of definitions())for(const [version,source]of Object.entries(src))for(const mode of ['baseline','sham','swap']){
  const target=mode==='baseline'?null:targets(c)[mode==='sham'?version:version==='v053'?'e28':'v053'];
  const transformed=build(source,target),full=JSON.parse(JSON.stringify(evaluation.simulate(transformed,c.t,c.kind,c.seed,{...c.options,trace:true})));
  const {events,samples,...result}=full,records=events.find(e=>e.type==='initial-intent-diagnostic').records;
  assert.equal(records.length,1);assert.deepEqual(records[0].original,targets(c)[version]);
  const compact=controls.compact(result),old=previous.rows.find(r=>r.version===version&&r.t===c.t&&r.kind===c.kind&&r.seed===c.seed);
  if(mode!=='swap')assert.deepEqual(compact,old.result,'No-op changed historical result');
  report.rows.push({...c,version,mode,target,sourceSha256:controls.hash(source),instrumentedSha256:controls.hash(transformed),records,result:compact,events:events.filter(e=>['kick','capture','decision'].includes(e.type)),samples});
  posture.writeReport(output,report);console.error('initial-intent',report.rows.length,version,mode,c.t,c.kind,c.seed);
 }return report;
}
function verify(report){
 assert.equal(report.simulationSha256,evaluation.simulationHash());assert.equal(report.recipeSha256,recipeHash());assert.equal(report.postureSha256,controls.hash(fs.readFileSync('data/pre-shot-posture-v0531.json.gz')));assert.equal(report.rows.length,48);
 const previous=posture.readReport('data/pre-shot-posture-v0531.json.gz');posture.verify(previous);
 const summary=[];let i=0;
 for(const c of definitions())for(const version of ['v053','e28']){
  const rows=report.rows.slice(i,i+3);i+=3;
  for(const [j,row]of rows.entries()){
   const {version:v,mode,target,sourceSha256,instrumentedSha256,records,result,events,samples,...config}=row;
   assert.deepEqual(config,c);assert.equal(v,version);assert.equal(mode,['baseline','sham','swap'][j]);
   const source=version==='v053'?evaluation.sources().v053:controls.base;
   assert.deepEqual(target,mode==='baseline'?null:targets(c)[mode==='sham'?version:version==='v053'?'e28':'v053']);
   assert.equal(sourceSha256,controls.hash(source));assert.equal(instrumentedSha256,controls.hash(build(source,target)));
   assert.equal(records.length,1);assert.equal(records[0].team,c.t);assert.equal(records[0].time,1/120);assert.deepEqual(records[0].original,targets(c)[version]);assert.deepEqual(records[0].applied,target||records[0].original);
   assert.equal(records[0].until-records[0].time,.36);
   const old=previous.rows.find(r=>r.version===version&&r.t===c.t&&r.kind===c.kind&&r.seed===c.seed);
   if(j<2)assert.deepEqual(result,old.result);
   for(const value of Object.values(result.metrics))assert(Number.isFinite(value)&&value>=0);
  }
  assert.deepEqual(rows[0].samples,rows[1].samples);assert.deepEqual(rows[0].events,rows[1].events);
  const [base,,swap]=rows,firstDifference=base.samples.find((s,j)=>JSON.stringify(s)!==JSON.stringify(swap.samples[j]));
  const extract=row=>{
   const prefix=row.samples.filter(s=>s.time<row.records[0].until&&s.metrics),prefixMeans={};
   for(const key of ['arrival','open','fieldOpen','passOptions','pressure'])prefixMeans[key]=prefix.reduce((sum,s)=>sum+Number(s.metrics[key]),0)/prefix.length;
   return {goals:row.result.goalsConceded,firstShotOutcome:row.result.firstShotOutcome,metrics:row.result.metrics,prefixSamples:prefix.length,prefixMeans,firstShot:row.events.find(e=>e.type==='kick'&&e.kind==='shot'&&e.team!==c.t)?.time??null};
  };
  const firstEventDifference=base.events.find((e,j)=>JSON.stringify(e)!==JSON.stringify(swap.events[j]));
  const donor=report.rows.find(r=>r.version!==version&&r.mode==='baseline'&&r.t===c.t&&r.kind===c.kind&&r.seed===c.seed);
  const prefix=row=>row.samples.filter(s=>s.time<row.records[0].until);
  summary.push({...c,version,firstSampleDifference:firstDifference?.time??null,firstEventDifference:firstEventDifference?.time??null,prefixMatchesOtherEngine:JSON.stringify(prefix(swap))===JSON.stringify(prefix(donor)),original:base.records[0].original,swapped:swap.target,baseline:extract(base),swap:extract(swap)});
 }
 const prePassSeedPairs=[];
 for(const t of [0,1])for(const version of ['v053','e28'])for(const mode of ['baseline','sham','swap']){
  const pair=[101,202].map(seed=>report.rows.find(r=>r.t===t&&r.kind==='pass'&&r.version===version&&r.mode===mode&&r.seed===seed));
  prePassSeedPairs.push({t,version,mode,sameSampledPrefix:JSON.stringify(pair[0].samples.filter(s=>s.time<.35))===JSON.stringify(pair[1].samples.filter(s=>s.time<.35))});
 }
 return {freshSimulations:48,configurations:8,noOpMatches:32,prePassSeedPairs,summary};
}
if(require.main===module){if(process.argv[2]==='--verify')console.log(JSON.stringify(verify(posture.readReport(process.argv[3])),null,2));else run(process.argv[2]);}
module.exports={build,run,verify,targets,definitions,recipeHash};
