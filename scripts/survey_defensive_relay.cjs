// Passive feasibility audit. No role, target, memory or random draw is changed.
const fs=require('node:fs'),assert=require('node:assert/strict');
const evaluation=require('./evaluate_finishing_v0531.cjs'),controls=require('./evaluate_finishing_resume.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function instrument(source=controls.base){
 assert.equal(controls.hash(source),controls.hash(controls.base));
 const probe=`
function relayOrder(t,ballPos){
 const ps=team(t).filter(p=>!isKeeper(p)),dir=direction(t);
 const choose=(list,cost,duty)=>{const sorted=[...list].sort((a,b)=>cost(a)-cost(b)||a.id-b.id),best=sorted[0],current=list.find(p=>p.defDuty===duty);return current&&cost(best)>=cost(current)*.8-.15?current:best;};
 const available=ps.filter(p=>!defenseCommitted(p));
 const press=choose(available.length?available:ps,p=>arrivalTime(p,ballPos),'press');
 const candidates=available.filter(p=>p!==press),lanes=new Map(candidates.map(p=>[p,contextualDefense(p,1,ballPos)]));
 const cost=p=>{const lane=lanes.get(p);return lane?arrivalTime(p,lane)+Math.max(0,20-lane.score)*.05:2+arrivalTime(p,{x:ballPos.x-dir*7,y:ballPos.y+(p.y<ballPos.y?-5:5)})+((p.x-press.x)*dir>0?.6:0);};
 return {press,cover:candidates.length?choose(candidates,cost,'cover'):null};
}
function relaySurvey(){
 if(!owner)return {stage:'no-owner'};
 const t=1-owner.t,ballPos={x:bx,y:by},goal={x:t?100:0,y:32};
 if(Math.abs(bx-goal.x)>25||Math.abs(by-32)>17)return {stage:'outside-shot-zone'};
 const {press:p,cover:q}=relayOrder(t,ballPos);
 const result={press:p&&p.id,cover:q&&q.id};
 if(!p||!q||defenseCommitted(p)||defenseCommitted(q))return {...result,stage:'no-free-pair'};
 if(!perceives(p,owner)||!perceives(q,owner)||!perceives(p,q)||!perceives(q,p))return {...result,stage:'not-mutually-visible'};
 const horizon=Math.max(p.reactionDelay||.35,q.reactionDelay||.35),dir=direction(t);
 const pPlan=contextualDefense(p,0,ballPos)||{x:bx-dir*2,y:by};
 const qPlan=contextualDefense(q,1,ballPos)||{x:bx-dir*7,y:clamp(by+(q.y<by?-5:5),5,59)};
 const qPress=contextualDefensePlan(q,0,ballPos)||{x:bx-dir*2,y:by};
 const pBase=finishingPosition(p,pPlan,horizon),qBase=finishingPosition(q,qPlan,horizon),qNew=finishingPosition(q,qPress,horizon);
 const access=(actor,pos)=>Math.max(arrivalTime({...pos,intentAt:elapsed},ballPos,2.8),Math.max(0,(actor.cool||0)-horizon));
 const baseAccess=access(p,pBase),relayAccess=access(q,qNew);
 const accessCost=relayAccess-baseAccess;
 const rays=[0,-2.5,2.5].map(offset=>({x:goal.x,y:32+offset*dir}));
 const base=rays.map(end=>projectedShotGuard(p,pPlan,ballPos,end)||projectedShotGuard(q,qPlan,ballPos,end));
 const contacts=rays.map(end=>shotLaneProjection(p,ballPos,end)).filter(c=>c&&c.gap<1.65);
 if(!contacts.length)return {...result,stage:'no-local-shot-position'};
 const threats=[...perceivedOpposition(p).rivals,...perceivedOpposition(q).rivals].filter(r=>r.id!==owner.id&&r.radius<=1.5&&d(r,ballPos)<=30);
 let passRejected=false;
 for(const c of contacts){
  const target={x:clamp(c.x,2,98),y:clamp(c.y,2,62)},pNew=finishingPosition(p,target,horizon);
  const next=rays.map(end=>projectedShotGuard(p,target,ballPos,end)||projectedShotGuard(q,qPress,ballPos,end));
  if(base.some((hit,i)=>hit&&!next[i])||next.filter(Boolean).length<=base.filter(Boolean).length)continue;
  if(threats.some(r=>(guardsPassingLine(pBase,ballPos,r)||guardsPassingLine(qBase,ballPos,r))&&!guardsPassingLine(pNew,ballPos,r)&&!guardsPassingLine(qNew,ballPos,r))){passRejected=true;continue;}
  const pending=finishingReadDelay(p)>0||finishingReadDelay(q)>0;
  return {...result,stage:accessCost>1e-6?'candidate-access-cost':pending?'candidate-pending-reading':'candidate-ready',baseAccess,relayAccess,accessCost,pending,base,next,qMode:qPress.mode||'fallback',pTarget:target,qTarget:{x:qPress.x,y:qPress.y},pWait:finishingReadDelay(p),qWait:finishingReadDelay(q)};
 }
 return {...result,stage:passRejected?'opens-known-pass':'no-pair-shot-gain'};
}
const relayStats={},relayWitnesses=[],relayCosts=[];
function recordRelaySurvey(){
 const result=relaySurvey();relayStats[result.stage]=(relayStats[result.stage]||0)+1;
 if(result.stage.startsWith('candidate'))relayCosts.push({time:elapsed,stage:result.stage,accessCost:result.accessCost,pending:result.pending,qMode:result.qMode});
 if(result.stage.startsWith('candidate')&&relayWitnesses.filter(w=>w.stage===result.stage).length<3)relayWitnesses.push({time:elapsed,...result});
}
`;
 const anchor='function movement(dt){';assert.equal(source.split(anchor).length,2);
 source=source.replace(anchor,probe+anchor);
 const call=' movement(dt);\n if(owner)';assert.equal(source.split(call).length,2);
 source=source.replace(call,' recordRelaySurvey();\n'+call);
 return source.replace(entry,entry+`globalThis.test.relaySurvey=relaySurvey;globalThis.test.relayOrder=relayOrder;if(globalThis.test.probe)globalThis.test.probe.events.push({type:'relay-survey',stats:relayStats,witnesses:relayWitnesses,costs:relayCosts});`);
}
function run(output){
 const source=instrument(),report={baseSha256:controls.hash(controls.base),surveySha256:controls.hash(source),simulationSha256:evaluation.simulationHash(),passive:true,limitations:['Pair-level feasibility, not a defensive policy or a claim of tactical improvement','Mutual visibility is not a communication or confirmation protocol','Each hypothetical player retains its own pending intention; no future ball endpoint is consulted; joint audit of individual memories is not a communication mechanism','Other defenders and goalkeeper can already cover a ray; pair gain need not be collective gain','Ready-reading samples do not establish that a delayed two-way agreement would still be feasible','Existing arrivalTime and constant-owner hypotheses remain approximate'],rows:[]};
 for(const c of evaluation.definitions()){
  const full=evaluation.simulate(source,c.t,c.kind,c.seed,{...c.options,trace:true});
  const survey=full.events.find(e=>e.type==='relay-survey');assert(survey);
  const {events,samples,...result}=full;
  report.rows.push({...c,result:controls.compact(result),stats:survey.stats,witnesses:survey.witnesses,costs:survey.costs});
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.error(report.rows.length,c.group);
 }
 return report;
}
function verify(report){
 const baseline=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../data/finishing-resume-v0531.json'),'utf8'));
 assert.equal(report.passive,true);assert.equal(report.baseSha256,controls.hash(controls.base));
 assert.equal(report.surveySha256,controls.hash(instrument()));assert.equal(report.simulationSha256,evaluation.simulationHash());
 assert.equal(report.rows.length,evaluation.definitions().length);
 const totals={};let candidates=0;
 report.rows.forEach((row,i)=>{
  const {result,stats,witnesses,costs,...config}=row;assert.deepEqual(config,evaluation.definitions()[i]);
  assert.deepEqual(result,baseline.rows[i].results.e28,'Passive survey changed simulation '+i);
  let frames=0;for(const [stage,count]of Object.entries(stats)){assert(Number.isInteger(count)&&count>=0);frames+=count;totals[stage]=(totals[stage]||0)+count;}
  assert(frames<=result.options.seconds*120);assert(frames>0);
  assert.equal(costs.length,Object.entries(stats).filter(([stage])=>stage.startsWith('candidate')).reduce((n,[,count])=>n+count,0));
  for(const c of costs){assert(Number.isFinite(c.accessCost));assert(c.time>=0&&c.time<=result.options.seconds+1e-8);assert.equal(c.stage==='candidate-access-cost',c.accessCost>1e-6);candidates++;}
  for(const w of witnesses){assert(w.next.filter(Boolean).length>w.base.filter(Boolean).length);assert(w.base.every((hit,j)=>!hit||w.next[j]));assert(Math.abs(w.accessCost-(w.relayAccess-w.baseAccess))<1e-9);}
 });
 return {configurations:report.rows.length,candidateFrames:candidates,totals};
}
function situated(source,helperX){
 assert([8,10].includes(helperX));
 const setup=`
const relayInitialCapture=capture;let relaySetupApplied=false;
capture=function(actor,why){
 if(!relaySetupApplied&&why==='inicio del ensayo'){
  relaySetupApplied=true;const t=1-actor.t,p=players.find(p=>p.t===t&&p.n===6),q=players.find(p=>p.t===t&&p.n===7);
  Object.assign(q,{x:t?100-${helperX}:${helperX},y:t?24:40,vx:0,vy:0,bodyAngle:t?Math.PI:0});p.defDuty='press';q.defDuty='cover';
 }
 return relayInitialCapture(actor,why);
};globalThis.test.capture=capture;
`;
 return source.replace(entry,entry+setup);
}
function snapshots(output){
 const rows=[];
 for(const t of [0,1])for(const kind of ['pass','free'])for(const helperX of [8,10]){
  const seed=helperX===8?2017:3011,source=situated(instrument(),helperX),plain=situated(controls.base,helperX);
  const observed=evaluation.simulate(source,t,kind,seed,{trace:true}),baseline=evaluation.simulate(plain,t,kind,seed);
  const survey=observed.events.find(e=>e.type==='relay-survey'),{events,samples,...result}=observed;
  assert.deepEqual(controls.compact(result),controls.compact(baseline),'Snapshot observer changed simulation');
  rows.push({t,kind,helperX,seed,sourceSha256:controls.hash(source),baselineSha256:controls.hash(plain),result:controls.compact(result),stats:survey.stats,witnesses:survey.witnesses,costs:survey.costs});
 }
 const report={baseSha256:controls.hash(controls.base),surveySha256:controls.hash(instrument()),setupRecipeSha256:controls.hash(situated.toString()),simulationSha256:evaluation.simulationHash(),freshSimulations:16,protocol:'Eight diagnostic possession snapshots with an existing press/cover assignment and nearby helper; source and baseline receive identical initial placement before initial capture. No interventions after setup. Constructed from the mirrored unit-test opportunity, not a reserved acceptance sample.',rows};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module){
 const [mode,file]=process.argv.slice(2);assert(mode,'Usage: node scripts/survey_defensive_relay.cjs OUTPUT, --snapshots OUTPUT or --verify REPORT');
 if(mode==='--verify')console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(file,'utf8'))),null,2));
 else if(mode==='--snapshots')snapshots(file);
 else run(mode);
}
module.exports={instrument,run,verify,situated,snapshots};
