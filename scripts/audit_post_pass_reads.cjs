// Passive research observer. Local hypotheses never feed movement or decision state.
const fs=require('node:fs'),assert=require('node:assert/strict');
const evaluation=require('./evaluate_finishing_v0531.cjs'),controls=require('./evaluate_finishing_resume.cjs'),posture=require('./audit_pre_shot_posture.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function build(source){
 let helpers=controls.base.slice(controls.base.indexOf('function finishingReadDelay(p){'),controls.base.indexOf('function protectFinishingLine(p,rank,ballPos,proposed){'));
 for(const name of ['finishingReadDelay','finishingPosition','projectedShotGuard'])helpers=helpers.replaceAll(name,'readWindow_'+name);
 const addition=`
${helpers}
const readWindowRecords=[],readWindowSight=new Map();
function readWindowObserve(p){
 if(!perceives(p,{x:bx,y:by})){readWindowSight.delete(p.id);return;}
 const previous=readWindowSight.get(p.id),sight={x:bx,y:by,z:ballHeight,seenAt:elapsed};
 const gap=previous?elapsed-previous.seenAt:0;
 if(gap>0&&gap<=1/60+1e-9){sight.vx=(bx-previous.x)/gap;sight.vy=(by-previous.y)/gap;}
 readWindowSight.set(p.id,sight);
}
function readWindowSnapshot(p,target,sight,visibleOwner){
 const prior={x:p.intentX??p.x,y:p.intentY??p.y},wait=readWindow_finishingReadDelay(p),horizon=p.reactionDelay||.35;
 let reachable=null;
 // Constant observed velocity/height hypothesis for at most one own cycle, not actual flight truth.
 if(sight&&sight.z<=1.4&&Number.isFinite(sight.vx)&&Number.isFinite(sight.vy))for(let i=1;i<=Math.round(horizon*120);i++){
  const time=i/120,q={x:sight.x+sight.vx*time,y:sight.y+sight.vy*time};
  if(q.x<0||q.x>100||q.y<0||q.y>64)break;
  const own=readWindow_finishingPosition(p,q,time);
  if((p.cool||0)<=time&&Math.hypot(own.x-q.x,own.y-q.y)<1.65){reachable={time,target:q};break;}
 }
 let immediate=null;
 if(sight&&visibleOwner&&visibleOwner.t!==p.t){
  const goals=[0,-2.5,2.5].map(offset=>({x:p.t?100:0,y:32+offset*direction(p.t)}));
  const candidates=[target,prior,{x:sight.x,y:sight.y},...goals.map(goal=>{
   const dx=goal.x-sight.x,dy=goal.y-sight.y,ll=dx*dx+dy*dy||1,u=clamp(((p.x-sight.x)*dx+(p.y-sight.y)*dy)/ll,.08,.95);
   return {x:clamp(sight.x+u*dx,2,98),y:clamp(sight.y+u*dy,2,62)};
  })];
  immediate={origin:{x:sight.x,y:sight.y},candidates:candidates.map(q=>({target:q,covered:goals.map(goal=>readWindow_projectedShotGuard(p,q,sight,goal)),accessAfter:arrivalTime({...readWindow_finishingPosition(p,q,horizon),intentAt:elapsed},sight,2.8)}))};
 }
 return {self:{id:p.id,t:p.t,x:p.x,y:p.y,vx:p.vx,vy:p.vy,bodyAngle:p.bodyAngle,cool:p.cool},prior,wait,horizon,sight:sight?{...sight}:null,visibleOwner:visibleOwner?{...visibleOwner}:null,rivals:(p.rivalMemory||[]).map(m=>({...m})),target:{...target},reachable,immediate};
}
globalThis.test.readWindow={records:readWindowRecords,snapshot:readWindowSnapshot,observe:readWindowObserve,sights:readWindowSight};
if(globalThis.test.probe)globalThis.test.probe.events.push({type:'post-pass-read-audit',records:readWindowRecords});
`;
 const movement=' const offBallDestinations=coordinatedOffBallTargets(offBallOrders);';
 const commit='    p.intentX=tx;p.intentY=ty;p.intentAt=elapsed+p.reactionDelay;';
 const hook=`    if(elapsed<=3&&p.n===6){
     const seenOwner=owner&&perceives(p,owner)?{id:owner.id,t:owner.t,x:owner.x,y:owner.y}:null;
     const local=readWindowSnapshot(p,{x:tx,y:ty},readWindowSight.get(p.id),seenOwner);
     // Ground truth is a separate observer label, never an input to the local hypothesis.
     const logged=globalThis.test.probe?globalThis.test.probe.events:[];
     readWindowRecords.push({time:elapsed,actor:p.id,team:p.t,oldUntil:p.intentAt??null,newUntil:elapsed+p.reactionDelay,local,observer:{owner:owner?owner.id:null,ownerTeam:owner?owner.t:null,inFlight:!!flight,flightKind:flight?flight.kind:null,opponentPassCount:logged.filter(e=>e.type==='kick'&&e.kind==='pass'&&e.team!==p.t).length,opponentShotCount:logged.filter(e=>e.type==='kick'&&e.kind==='shot'&&e.team!==p.t).length}});
    }
`;
 for(const anchor of [entry,movement,commit])assert.equal(source.split(anchor).length,2);
 return source.replace(movement,movement+'\n for(const p of activePlayers())if(p.n===6)readWindowObserve(p);').replace(commit,hook+commit).replace(entry,entry+addition);
}
function definitions(){return posture.definitions();}
function run(output){
 const old=posture.readReport('data/pre-shot-posture-v0531.json.gz');posture.verify(old);
 const report={protocol:'16 fresh passive simulations of eight exposed configurations in v053/e28. Observe actual ordinary commits through 3 s; own ball sight at movement start; constant observed velocity/height and physical own copies, not actual flight target/duration or future rival decision. Finite candidate search, not reachability impossibility proof. No policy or new holdout.',simulationSha256:evaluation.simulationHash(),recipeSha256:controls.hash(build.toString()),rows:[]};
 for(const c of definitions())for(const [version,source]of Object.entries({v053:evaluation.sources().v053,e28:controls.base})){
  const instrumented=build(source),full=JSON.parse(JSON.stringify(evaluation.simulate(instrumented,c.t,c.kind,c.seed,{...c.options,trace:true})));
  const {events,samples,...result}=full,records=events.find(e=>e.type==='post-pass-read-audit').records.filter(r=>r.team===c.t);
  const compact=controls.compact(result),previous=old.rows.find(r=>r.t===c.t&&r.kind===c.kind&&r.seed===c.seed&&r.version===version);
  assert.deepEqual(compact,previous.result,'Observer changed match');
  report.rows.push({...c,version,sourceSha256:controls.hash(source),instrumentedSha256:controls.hash(instrumented),result:compact,records,events:events.filter(e=>['kick','capture','decision'].includes(e.type)),samples});
  posture.writeReport(output,report);console.error('post-pass-read',report.rows.length,c.t,c.kind,c.seed,version);
 }return report;
}
function verify(report){
 assert.equal(report.simulationSha256,evaluation.simulationHash());assert.equal(report.recipeSha256,controls.hash(build.toString()));assert.equal(report.rows.length,16);
 const old=posture.readReport('data/pre-shot-posture-v0531.json.gz');posture.verify(old);
 const summary=[];let i=0;
 for(const c of definitions())for(const version of ['v053','e28']){
  const row=report.rows[i++],{version:v,sourceSha256,instrumentedSha256,result,records,events,samples,...config}=row;
  assert.deepEqual(config,c);assert.equal(v,version);
  const source=version==='e28'?controls.base:evaluation.sources().v053;
  assert.equal(sourceSha256,controls.hash(source));assert.equal(instrumentedSha256,controls.hash(build(source)));
  assert.deepEqual(result,old.rows.find(r=>r.t===c.t&&r.kind===c.kind&&r.seed===c.seed&&r.version===version).result);
  for(const r of records){assert(r.time<=3);assert.equal(r.local.wait,0);assert(Math.abs(r.newUntil-r.time-r.local.horizon)<1e-9);assert(!r.local.sight||r.local.sight.seenAt===r.time);}
  const pass=events.find(e=>e.type==='kick'&&e.kind==='pass'&&e.team!==c.t),shot=events.find(e=>e.type==='kick'&&e.kind==='shot'&&e.team!==c.t);
  // Event counters disambiguate a kick and subsequent movement at the SAME update time.
  const first=pass?records.find(r=>r.observer.opponentPassCount>0):null;
  const owned=first?records.find(r=>r.time>=first.time&&r.observer.ownerTeam===1-c.t):null;
  const reduce=r=>r?{time:r.time,until:r.newUntil,local:r.local,observer:r.observer}:null;
  summary.push({...c,version,goals:result.goalsConceded,firstPass:pass?.time??null,firstShot:shot?.time??null,firstPostPassRead:reduce(first),firstOwnedRead:reduce(owned),readsBeforeShot:records.filter(r=>r.observer.opponentPassCount>0&&shot&&r.observer.opponentShotCount===0).map(reduce)});
 }return {freshSimulations:16,historicalMatches:16,summary};
}
if(require.main===module){if(process.argv[2]==='--verify')console.log(JSON.stringify(verify(posture.readReport(process.argv[3])),null,2));else run(process.argv[2]);}
module.exports={build,definitions,run,verify};
