// Passive research: no destination, memory, random draw or match state is changed.
const fs=require('node:fs'),assert=require('node:assert/strict');
const controls=require('./evaluate_finishing_resume.cjs'),evaluation=require('./evaluate_finishing_v0531.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function writeReport(output,report){const value=JSON.stringify(report)+'\n';fs.writeFileSync(output,output.endsWith('.gz')?require('node:zlib').gzipSync(value):value);}
function readReport(file){const value=fs.readFileSync(file);return JSON.parse(file.endsWith('.gz')?require('node:zlib').gunzipSync(value).toString('utf8'):value.toString('utf8'));}
function build(source){
 let helpers=controls.base.slice(controls.base.indexOf('function finishingReadDelay(p){'),controls.base.indexOf('function protectFinishingLine(p,rank,ballPos,proposed){'));
 for(const name of ['finishingReadDelay','finishingPosition','projectedShotGuard'])helpers=helpers.replaceAll(name,'postureAudit_'+name);
 const addition=`
${helpers}
const postureAuditSamples=[],postureAuditPrevious=new Map();
const postureAuditOriginal=protectFinishingLine;
protectFinishingLine=function(p,rank,ballPos,proposed){
 const selected=postureAuditOriginal(p,rank,ballPos,proposed);
 if(elapsed>3||p.n!==6||!owner||owner.t===p.t||!perceives(p,owner)||Math.abs(ballPos.x-(p.t?100:0))>25||Math.abs(ballPos.y-32)>17)return selected;
 const prior=postureAuditPrevious.get(p.id),plan=selected||proposed;
 const key=JSON.stringify({rank,selected,proposed});
 if(prior&&elapsed-prior.time<.05-1e-9&&prior.key===key)return selected;
 // One sample per update even when allocation recomputes a nested defensive target.
 if(prior&&prior.time===elapsed)return selected;
 postureAuditPrevious.set(p.id,{time:elapsed,key});
 const horizon=p.reactionDelay||.35,position=postureAudit_finishingPosition(p,plan,horizon);
 const future={...position,intentAt:elapsed};
 const rays=[0,-2.5,2.5].map(offset=>{
  const goal={x:p.t?100:0,y:32+offset*direction(p.t)};
  return {now:postureAudit_projectedShotGuard(p,plan,ballPos,goal),afterOwnCycle:postureAudit_projectedShotGuard(future,plan,ballPos,goal)};
 });
 postureAuditSamples.push({time:elapsed,actor:p.id,rank,ball:{x:ballPos.x,y:ballPos.y},self:{x:p.x,y:p.y,vx:p.vx||0,vy:p.vy||0},proposed,selected,horizon,wait:postureAudit_finishingReadDelay(p),rays,accessNow:arrivalTime(p,ballPos,2.8),accessAfter:arrivalTime(future,ballPos,2.8),tentativeAfter:Math.hypot(position.x-ballPos.x,position.y-ballPos.y)<=2.8});
 return selected;
};
if(globalThis.test.probe)globalThis.test.probe.events.push({type:'posture-audit',samples:postureAuditSamples});
`;
 assert.equal(source.split(entry).length,2);return source.replace(entry,entry+addition);
}
function definitions(){return evaluation.definitions().filter(c=>c.group==='orientation'&&c.options.angle===0);}
function run(output){
 const reference=require('../data/finishing-resume-v0531.json'),src={v053:evaluation.sources().v053,e28:controls.base};
 assert.equal(reference.simulationSha256,evaluation.simulationHash());
 for(const [v,s]of Object.entries(src))assert.equal(reference.engineSha256[v],controls.hash(s));
 const report={simulationSha256:evaluation.simulationHash(),recipeSha256:controls.hash(build.toString()),protocol:'Passive own-posture audit through first three seconds. Future own state after reactionDelay, then immediate ray from FROZEN observed ball; diagnostic geometry, not opponent wind-up, forecast or policy. Existing eight orientation-zero configurations, no held-out acceptance claim.',rows:[]};
 for(const c of definitions())for(const [version,source]of Object.entries(src)){
  const instrumented=build(source),full=evaluation.simulate(instrumented,c.t,c.kind,c.seed,{...c.options,trace:true});
  const {events,samples,...result}=full,previous=reference.rows.find(r=>JSON.stringify({...c})===JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k])=>k!=='results'))));assert(previous);
  const compact=controls.compact(result);assert.deepEqual(compact,previous.results[version],'Observer changed match');
  const audit=events.find(e=>e.type==='posture-audit');assert(audit);
  // Player trajectories and passive audit are retained; private actions never feed back.
  report.rows.push({...c,version,sourceSha256:controls.hash(source),auditSourceSha256:controls.hash(instrumented),result:compact,samples:audit.samples,events:events.filter(e=>e.type==='kick'||e.type==='capture'),trajectory:samples.filter(s=>s.time<=3).map(s=>({time:s.time,owner:s.owner,ball:s.ball,players:s.players}))});
  writeReport(output,report);console.error('posture',report.rows.length,c.t,c.kind,c.seed,version);
 }
 return report;
}
function verify(report){
 assert.equal(report.simulationSha256,evaluation.simulationHash());assert.equal(report.recipeSha256,controls.hash(build.toString()));assert.equal(report.rows.length,definitions().length*2);
 const old=require('../data/finishing-resume-v0531.json'),summary=[];
 definitions().forEach((config,i)=>{
  const pair=report.rows.slice(i*2,i*2+2);assert.deepEqual(pair.map(r=>r.version),['v053','e28']);
  for(const row of pair){
   const {version,sourceSha256,auditSourceSha256,result,samples,events,trajectory,...c}=row;assert.deepEqual(c,config);
   const source=version==='e28'?controls.base:evaluation.sources().v053;assert.equal(sourceSha256,controls.hash(source));assert.equal(auditSourceSha256,controls.hash(build(source)));
   assert.equal(old.engineSha256[version],sourceSha256);assert.equal(old.simulationSha256,report.simulationSha256);
   const previous=old.rows.find(r=>JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k])=>k!=='results')))===JSON.stringify(config));assert(previous);assert.deepEqual(result,previous.results[version]);
   for(const s of samples){assert(s.time<=3&&s.time>=0);assert.equal(s.rays.length,3);assert(s.accessNow>=0&&s.accessAfter>=0);assert(s.wait>=0);}
  }
  const [a,b]=pair,firstShot=row=>row.events.find(e=>e.type==='kick'&&e.kind==='shot'&&e.team!==config.t)?.time??null;
  const firstDifference=a.trajectory.find((s,j)=>JSON.stringify(s)!==JSON.stringify(b.trajectory[j]));
  const sampleStats=row=>{const before=row.samples.filter(s=>firstShot(row)===null||s.time<firstShot(row));return {samplesBeforeShot:before.length,selectedBeforeShot:before.filter(s=>s.selected).length,firstSelected:before.find(s=>s.selected)?.time??null,firstImmediateGuard:before.find(s=>s.rays.some(r=>r.now))?.time??null,firstFutureGuard:before.find(s=>s.rays.some(r=>r.afterOwnCycle))?.time??null,lostFutureSamples:before.filter(s=>s.rays.some(r=>r.now&&!r.afterOwnCycle)).length,waitSamples:before.filter(s=>s.wait>0).length};};
  summary.push({...config,goals:{v053:a.result.goalsConceded,e28:b.result.goalsConceded},firstTrajectoryDifference:firstDifference?.time??null,firstShot:{v053:firstShot(a),e28:firstShot(b)},v053:sampleStats(a),e28:sampleStats(b)});
 });return {configurations:definitions().length,freshPassiveSimulations:report.rows.length,summary};
}
if(require.main===module){if(process.argv[2]==='--verify')console.log(JSON.stringify(verify(readReport(process.argv[3])),null,2));else run(process.argv[2]);}
module.exports={build,definitions,run,verify,readReport,writeReport};
