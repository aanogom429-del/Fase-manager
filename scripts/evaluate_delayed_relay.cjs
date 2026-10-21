// Experimental control only: index.html is never overwritten by this builder.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const controls=require('./evaluate_finishing_resume.cjs'),evaluation=require('./evaluate_finishing_v0531.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
function build(source=controls.base){
 assert.equal(controls.hash(source),controls.hash(controls.base));
 const protocol=`
const defRelayEvents=[];
const defRelayKeys=['defRelayInbox','defRelayPending','defRelayCommit'];
function defRelaySeen(p){return {x:p.x,y:p.y,vx:p.vx||0,vy:p.vy||0,bodyAngle:p.bodyAngle,speed:p.speed,acceleration:p.acceleration,braking:p.braking,turnRate:p.turnRate,intentAt:elapsed};}
function defRelayDrift(p,h){const q=defRelaySeen(p);q.x=clamp(q.x+q.vx*h,0,100);q.y=clamp(q.y+q.vy*h,0,64);return q;}
function defRelayRecord(kind,p,extra={}){defRelayEvents.push({kind,time:elapsed,actor:p.id,...extra});}
function defRelaySend(from,to,kind,token,carrierId,expires){
 const packet=Object.freeze({kind,token,from:from.id,to:to.id,carrierId,createdAt:elapsed,expires});
 to.defRelayInbox=[...(to.defRelayInbox||[]),packet];defRelayRecord('send-'+kind,from,{to:to.id,token,expires});
}
function defRelayObserve(p){
 if(!p.defRelayInbox)return;
 p.defRelayInbox=p.defRelayInbox.map(m=>{
  if(m.noticedAt!==undefined)return m;
  const sender=players.find(q=>q.id===m.from&&q.t===p.t&&!q.sentOff);
  return sender&&perceives(p,sender)?Object.freeze({...m,noticedAt:elapsed}):m;
 });
}
function defRelayApproach(p){
 const ball={x:bx,y:by},rivals=perceivedOpposition(p).rivals.filter(r=>r.radius<=1.5&&d(r,ball)<14).length;
 const mates=team(p.t).filter(q=>!isKeeper(q)&&(q===p||perceives(p,q))&&d(q,ball)<14).length;
 const contain=arrivalTime(p,ball,2.8)>.75&&rivals>mates;
 return {x:clamp(bx-direction(p.t)*(contain?5:2),2,98),y:by,mode:contain?'Temporizar con relevo':'Aproximar con relevo'};
}
function defRelayOwnLanes(p,base,target){
 const a={x:bx,y:by},h=p.reactionDelay||.35,b=finishingPosition(p,base,h),n=finishingPosition(p,target,h);
 const threats=perceivedOpposition(p).rivals.filter(r=>r.id!==owner.id&&r.radius<=1.5&&d(r,a)<=30);
 if(threats.some(r=>guardsPassingLine(b,a,r)&&!guardsPassingLine(n,a,r)))return false;
 return [0,-2.5,2.5].every(y=>{const goal={x:p.t?100:0,y:32+y*direction(p.t)};return !projectedShotGuard(p,base,a,goal)||projectedShotGuard(p,target,a,goal);});
}
function defRelayCanApproach(p,partner,base,target){
 const h=p.reactionDelay||.35,a={x:bx,y:by};
 if((p.cool||0)>h||!defRelayOwnLanes(p,base,target))return false;
 const own=finishingPosition(p,target,h),other=defRelayDrift(partner,h);
 return arrivalTime({...own,intentAt:elapsed},a,2.8)<=arrivalTime(other,a,2.8)+1e-6;
}
function defRelayProtect(p,partner,base){
 const a={x:bx,y:by},h=p.reactionDelay||.35;
 if((a.x-partner.x)*(partner.vx||0)+(a.y-partner.y)*(partner.vy||0)<=0)return null;
 const other=defRelayDrift(partner,h),own=finishingPosition(p,base,h);
 if(arrivalTime(other,a,2.8)>arrivalTime({...own,intentAt:elapsed},a,2.8)+1e-6)return null;
 return protectFinishingLine(p,1,a,base);
}
function defRelayRead(p,base){
 if(guided||isKeeper(p)||finishingReadDelay(p)>0)return null;
 const inbox=(p.defRelayInbox||[]).filter(m=>m.createdAt<=elapsed&&m.expires>elapsed);
 if(p.defRelayPending&&p.defRelayPending.expires<=elapsed){defRelayRecord('request-expired',p);delete p.defRelayPending;}
 if(p.defRelayCommit&&p.defRelayCommit.expires<=elapsed){defRelayRecord('lease-expired',p);delete p.defRelayCommit;}
 if(defenseCommitted(p)){delete p.defRelayCommit;delete p.defRelayPending;return null;}
 if(!owner||owner.t===p.t||!perceives(p,owner))return null;
 const current=owner.id,remaining=[];let selected=null;
 for(const m of inbox){
  const sender=players.find(q=>q.id===m.from&&q.t===p.t&&!q.sentOff);
  if(!sender||!perceives(p,sender)||m.noticedAt===undefined||elapsed-m.noticedAt<(p.reactionDelay||.35)-1e-9){remaining.push(m);continue;}
  if(m.carrierId!==current){defRelayRecord('stale-carrier',p,{token:m.token});continue;}
  if(m.kind==='cancel'||m.kind==='reject'){
   if(p.defRelayPending?.token===m.token)delete p.defRelayPending;
   if(p.defRelayCommit?.token===m.token){delete p.defRelayCommit;selected=null;}
   defRelayRecord('received-'+m.kind,p,{token:m.token});continue;
  }
  if(m.kind==='request'&&!p.defRelayCommit){
   const target=defRelayApproach(p);
   if(defRelayCanApproach(p,sender,base,target)){
    const expires=elapsed+2*((p.reactionDelay||.35)+(sender.reactionDelay||.35));
    p.defRelayCommit=Object.freeze({role:'approach',partner:sender.id,token:m.token,carrierId:current,expires});
    defRelaySend(p,sender,'ack',m.token,current,expires);selected=target;
    defRelayRecord('accept',p,{token:m.token,requestAt:m.createdAt,noticedAt:m.noticedAt,expires});
   }else{defRelaySend(p,sender,'reject',m.token,current,m.expires);defRelayRecord('reject-local-cost',p,{token:m.token});}
  }else if(m.kind==='ack'&&p.defRelayPending?.token===m.token&&!p.defRelayPending.cancelling){
   const target=defRelayProtect(p,sender,base);
   if(target){
    p.defRelayCommit=Object.freeze({role:'protect',partner:sender.id,token:m.token,carrierId:current,expires:m.expires});
    selected=target;delete p.defRelayPending;defRelayRecord('activate',p,{token:m.token,ackAt:m.createdAt,noticedAt:m.noticedAt});
   }else{defRelaySend(p,sender,'cancel',m.token,current,m.expires);p.defRelayPending=Object.freeze({token:m.token,to:sender.id,carrierId:current,expires:m.expires,cancelling:true});defRelayRecord('decline-after-ack',p,{token:m.token});}
  }
 }
 if(remaining.length)p.defRelayInbox=remaining;else delete p.defRelayInbox;
 const commit=p.defRelayCommit;
 if(commit){
  const partner=players.find(q=>q.id===commit.partner&&q.t===p.t&&!q.sentOff);
  if(commit.carrierId!==current||!partner||!perceives(p,partner)){
   delete p.defRelayCommit;defRelayRecord('abort-observation',p,{token:commit.token});return null;
  }
  if(commit.role==='approach'){
   const target=selected||defRelayApproach(p);
   if(defRelayCanApproach(p,partner,base,target))return target;
  }else{const target=selected||defRelayProtect(p,partner,base);if(target)return target;}
  defRelaySend(p,partner,'cancel',commit.token,current,commit.expires);delete p.defRelayCommit;
  defRelayRecord('abort-local-cost',p,{token:commit.token});return null;
 }
 if(selected)return selected;
 if(p.defDuty!=='press'||p.defRelayPending)return null;
 const target=protectFinishingLine(p,1,{x:bx,y:by},base);if(!target)return null;
 const q=team(p.t).find(q=>q!==p&&!isKeeper(q)&&q.defDuty==='cover'&&perceives(p,q));if(!q)return null;
 const token=p.id+':'+elapsed.toFixed(9),expires=elapsed+2*((p.reactionDelay||.35)+(q.reactionDelay||.35));
 p.defRelayPending=Object.freeze({token,to:q.id,carrierId:current,expires});
 defRelaySend(p,q,'request',token,current,expires);return null;
}
`;
 assert.equal(source.split('function movement(dt){').length,2);source=source.replace('function movement(dt){',protocol+'function movement(dt){');
 const anchor='   if(p.intentAt===undefined||elapsed>=p.intentAt||elapsed<p.intentAt-1){\n    p.intentX=tx;';assert.equal(source.split(anchor).length,2);
 source=source.replace(anchor,"   if(p.intentAt===undefined||elapsed>=p.intentAt||elapsed<p.intentAt-1){\n    const relay=defRelayRead(p,{x:tx,y:ty});if(relay){tx=relay.x;ty=relay.y;traceDestination(p,'Relevo defensivo acordado',tx,ty);}\n    p.intentX=tx;");
 const moving=' for(const {p,tx,ty} of moves){advancePlayer';assert.equal(source.split(moving).length,2);
 source=source.replace(moving,' for(const actor of activePlayers())defRelayObserve(actor);\n'+moving);
 const reset='delete p.intentAt;delete p.intentX;delete p.intentY;delete p.attackOrigin;';assert.equal(source.split(reset).length,3);
 source=source.replaceAll(reset,"for(const key of defRelayKeys)delete p[key];"+reset);
 return source.replace(entry,entry+`globalThis.test.delayedRelay={read:defRelayRead,observe:defRelayObserve,events:defRelayEvents};if(globalThis.test.probe)globalThis.test.probe.events.push({type:'delayed-relay',events:defRelayEvents});`);
}
function definitions(mode='development'){
 assert(['development','full'].includes(mode),'Unknown evaluation mode');const defs=evaluation.definitions();return mode==='full'?defs:defs.filter(c=>c.group==='help'||c.group==='orientation'&&c.options.angle===0||c.group==='shot'&&c.seed===101);
}
function run(output,mode='development'){
 const source=build(),ref=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-resume-v0531.json'),'utf8'));
 for(const v of ['v052','v053'])assert.equal(ref.engineSha256[v],controls.hash(evaluation.sources()[v]));
 assert.equal(ref.engineSha256.e28,controls.hash(controls.base));assert.equal(ref.simulationSha256,evaluation.simulationHash());
 const report={sourceSha256:controls.hash(source),baseSha256:controls.hash(controls.base),simulationSha256:evaluation.simulationHash(),mode,reference:'Stored, previously freshly verified identical-protocol references; current control always simulated afresh',rows:[]};
 for(const c of definitions(mode)){
  const full=evaluation.simulate(source,c.t,c.kind,c.seed,{...c.options,trace:true});
  const protocol=full.events.find(e=>e.type==='delayed-relay'),{events,samples,...result}=full;
  const previous=ref.rows.find(r=>r.group===c.group&&r.t===c.t&&r.kind===c.kind&&r.seed===c.seed&&JSON.stringify(r.options)===JSON.stringify(c.options));assert(previous);
  report.rows.push({...c,results:{v052:previous.results.v052,v053:previous.results.v053,e28:previous.results.e28,delayed:controls.compact(result)},protocol:protocol.events});
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.error(report.rows.length,c.group);
 }
 return report;
}
function diagnosticSource(source,receiver){
 source=require('./survey_defensive_relay.cjs').situated(source,8);
 const [x,y]=receiver;
 return source.replace(entry,entry+`
const delayedInitialCapture=capture;let delayedSetup=false;
capture=function(actor,why){if(!delayedSetup&&why==='inicio del ensayo'){delayedSetup=true;const t=1-actor.t,r=players.find(q=>q.t===actor.t&&q.n===7);r.x=t?100-${x}:${x};r.y=t?64-${y}:${y};}return delayedInitialCapture(actor,why);};globalThis.test.capture=capture;
`);
}
function diagnosticDefinitions(){
 const cases=[];
 for(const t of [0,1])for(const kind of ['pass','free'])for(const [context,receiver]of [['near',[23,28]],['far',[30,52]]]){
  assert.equal(Math.hypot(receiver[0]-20,receiver[1]-40)>14,context==='far','Far diagnostic must leave the existing local-density radius');
  cases.push({t,kind,context,receiver,seed:kind==='pass'?2909:4603});
 }
 return cases;
}
function diagnostics(output){
 const src={v052:evaluation.sources().v052,v053:evaluation.sources().v053,e28:controls.base,delayed:build()},rows=[];
 for(const {t,kind,context,receiver,seed}of diagnosticDefinitions()){
  const results={},hashes={};let protocol=[];
  for(const [v,s]of Object.entries(src)){
   const source=diagnosticSource(s,receiver);hashes[v]=controls.hash(source);
   const full=evaluation.simulate(source,t,kind,seed,{trace:true}),{events,samples,...result}=full;
   results[v]=controls.compact(result);if(v==='delayed')protocol=events.find(e=>e.type==='delayed-relay').events;
  }
  rows.push({t,kind,context,receiver,seed,hashes,results,protocol});
  fs.writeFileSync(output,JSON.stringify({sourceSha256:controls.hash(build()),setupRecipeSha256:controls.hash(diagnosticSource.toString()),simulationSha256:evaluation.simulationHash(),protocol:'Eight constructed message-opportunity diagnostics; both teams, pass/free, same seed across near/far perceived receiver context; initial roles and helper placement before capture only. Four sources freshly simulated. Not a reserved acceptance sample.',freshSimulations:32,rows},null,2)+'\n');
 }
 return rows;
}
function scans(output){
 const src={v052:evaluation.sources().v052,v053:evaluation.sources().v053,e28:controls.base,delayed:build()},rows=[];
 for(const t of [0,1]){
  const results={},hashes={};let protocol=[];
  for(const [v,s]of Object.entries(src)){
   const source=diagnosticSource(s,[0,60]);hashes[v]=controls.hash(source);
   const full=evaluation.simulate(source,t,'free',6503,{angle:Math.PI,trace:true}),{events,samples,...result}=full;
   results[v]=controls.compact(result);if(v==='delayed')protocol=events.find(e=>e.type==='delayed-relay').events;
  }
  rows.push({t,kind:'free',seed:6503,receiver:[0,60],angle:Math.PI,hashes,results,protocol});
 }
 const report={sourceSha256:controls.hash(build()),simulationSha256:evaluation.simulationHash(),freshSimulations:8,protocol:'Two exploratory mechanism-coverage diagnostics: carrier initially facing away from goal, receiver outside its initial field of view, existing AI turns/scans freely; no imposed wait or future decision supplied to defenders. Same setup across four freshly simulated sources. Not held out.',rows};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');return report;
}
function verify(report,diagnosticsReport=null,scanReport=null){
 assert.equal(report.sourceSha256,controls.hash(build()));assert.equal(report.simulationSha256,evaluation.simulationHash());
 assert.equal(report.rows.length,definitions(report.mode).length);
 const reference=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-resume-v0531.json'),'utf8'));
 assert.equal(reference.simulationSha256,evaluation.simulationHash());for(const v of ['v052','v053'])assert.equal(reference.engineSha256[v],controls.hash(evaluation.sources()[v]));assert.equal(reference.engineSha256.e28,controls.hash(controls.base));
 const traits=new Map(require('../tests/continuity.cjs').env(controls.base).t.get().players.map(p=>[p.id,p.reactionDelay]));
 const counts={};let unchanged=0;
 const checkEvents=events=>{
  for(const event of events){
   counts[event.kind]=(counts[event.kind]||0)+1;
   if(event.kind==='accept'||event.kind==='activate'){
    assert(event.noticedAt<=event.time);assert(event.time-event.noticedAt>=traits.get(event.actor)-1e-9);
    const kind=event.kind==='accept'?'send-request':'send-ack',sent=events.find(e=>e.kind===kind&&e.token===event.token&&e.to===event.actor);assert(sent);
    assert(event.noticedAt>=sent.time-1e-9);assert.equal(event.kind==='accept'?event.requestAt:event.ackAt,sent.time);
   }
  }
 };
 report.rows.forEach((row,i)=>{
  const {results,protocol,...config}=row;assert.deepEqual(config,definitions(report.mode)[i]);
  const old=reference.rows.find(r=>r.group===row.group&&r.t===row.t&&r.kind===row.kind&&r.seed===row.seed&&JSON.stringify(r.options)===JSON.stringify(row.options));assert(old);
  for(const v of ['v052','v053','e28'])assert.deepEqual(results[v],old.results[v]);
  if(!protocol.some(e=>e.kind==='accept'||e.kind==='activate')){assert.deepEqual(results.delayed,results.e28,'Inactive protocol changed gameplay');unchanged++;}
  for(const value of Object.values(results.delayed.metrics))assert(Number.isFinite(value)&&value>=0);
  checkEvents(protocol);
 });
 if(diagnosticsReport){
  assert.equal(diagnosticsReport.sourceSha256,controls.hash(build()));assert.equal(diagnosticsReport.setupRecipeSha256,controls.hash(diagnosticSource.toString()));assert.equal(diagnosticsReport.rows.length,8);assert.equal(diagnosticsReport.freshSimulations,32);
  const src={v052:evaluation.sources().v052,v053:evaluation.sources().v053,e28:controls.base,delayed:build()};
  assert.equal(new Set(diagnosticsReport.rows.map(r=>[r.t,r.kind,r.context].join('/'))).size,8);
  for(const row of diagnosticsReport.rows){
   assert([0,1].includes(row.t)&&['pass','free'].includes(row.kind)&&['near','far'].includes(row.context));
   assert.deepEqual(row.receiver,row.context==='near'?[23,28]:[30,52]);assert.equal(row.seed,row.kind==='pass'?2909:4603);
   for(const [v,s]of Object.entries(src))assert.equal(row.hashes[v],controls.hash(diagnosticSource(s,row.receiver)));
   if(!row.protocol.some(e=>e.kind==='accept'||e.kind==='activate'))assert.deepEqual(row.results.delayed,row.results.e28,'Inactive diagnostic changed gameplay');
   checkEvents(row.protocol);
  }
 }
 if(scanReport){
  assert.equal(scanReport.sourceSha256,controls.hash(build()));assert.equal(scanReport.simulationSha256,evaluation.simulationHash());assert.equal(scanReport.freshSimulations,8);assert.equal(scanReport.rows.length,2);
  assert.deepEqual(scanReport.rows.map(r=>r.t),[0,1]);
  const src={v052:evaluation.sources().v052,v053:evaluation.sources().v053,e28:controls.base,delayed:build()};
  for(const row of scanReport.rows){if(!row.protocol.some(e=>e.kind==='accept'||e.kind==='activate'))assert.deepEqual(row.results.delayed,row.results.e28,'Inactive scan control changed gameplay');assert.equal(row.angle,Math.PI);assert.equal(row.kind,'free');assert.equal(row.seed,6503);assert.deepEqual(row.receiver,[0,60]);for(const [v,s]of Object.entries(src))assert.equal(row.hashes[v],controls.hash(diagnosticSource(s,row.receiver)));checkEvents(row.protocol);}
 }
 return {cases:report.rows.length,unchangedWithoutAcceptance:unchanged,counts};
}
function inspectRejects(output){
 const cases=[{label:'far',receiver:[30,52],seed:4603,angle:0,file:'delayed-relay-diagnostics.json'},{label:'scan',receiver:[0,60],seed:6503,angle:Math.PI,file:'delayed-relay-scans.json'}],rows=[];
 const inspector=`
const defRelayCostSamples=[],defRelayOriginalCheck=defRelayCanApproach;
defRelayCanApproach=function(p,partner,base,target){
 const allowed=defRelayOriginalCheck(p,partner,base,target);
 if(!allowed&&defRelayCostSamples.length<3){
  const a={x:bx,y:by},h=p.reactionDelay||.35,old=finishingPosition(p,base,h),next=finishingPosition(p,target,h),other=defRelayDrift(partner,h);
  const threats=perceivedOpposition(p).rivals.filter(r=>r.id!==owner.id&&r.radius<=1.5&&d(r,a)<=30);
  const rays=[0,-2.5,2.5].map(y=>{const goal={x:p.t?100:0,y:32+y*direction(p.t)};return {base:projectedShotGuard(p,base,a,goal),next:projectedShotGuard(p,target,a,goal)};});
  defRelayCostSamples.push({time:elapsed,actor:p.id,partner:partner.id,ball:{x:bx,y:by},shotTime:Math.hypot((p.t?100:0)-bx,32-by)/48,cool:p.cool,horizon:h,base,target,ownAccess:arrivalTime({...next,intentAt:elapsed},a,2.8),partnerObservedAccess:arrivalTime(other,a,2.8),rays,openedPasses:threats.filter(r=>guardsPassingLine(old,a,r)&&!guardsPassingLine(next,a,r)).map(r=>({id:r.id,x:r.x,y:r.y,radius:r.radius}))});
 }
 return allowed;
};globalThis.test.probe.events.push({type:'relay-costs',samples:defRelayCostSamples});
`;
 for(const c of cases){
  const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'../data',c.file),'utf8'));
  const expected=baseline.rows.find(r=>r.t===1&&(c.label==='scan'||r.kind==='free'&&r.context==='far'));
  const source=diagnosticSource(build(),c.receiver).replace(entry,entry+inspector);
  const full=evaluation.simulate(source,1,'free',c.seed,{angle:c.angle,trace:true}),{events,samples,...result}=full;
  assert.deepEqual(controls.compact(result),expected.results.delayed,'Cost inspection changed gameplay');
  rows.push({label:c.label,sourceSha256:controls.hash(source),result:controls.compact(result),costs:events.find(e=>e.type==='relay-costs').samples});
 }
 const report={controlSha256:controls.hash(build()),simulationSha256:evaluation.simulationHash(),protocol:'Two passive replays to separate receiver shot/pass/access vetoes; full outcomes required to match the already evaluated control.',rows};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module){
 assert(process.argv[2],'Usage: node scripts/evaluate_delayed_relay.cjs OUTPUT [development|full], --diagnostics OUTPUT or --scans OUTPUT, --costs OUTPUT or --verify REPORT [DIAGNOSTICS] [SCANS]');
 if(process.argv[2]==='--diagnostics')diagnostics(process.argv[3]);
 else if(process.argv[2]==='--scans')scans(process.argv[3]);
 else if(process.argv[2]==='--costs')inspectRejects(process.argv[3]);
 else if(process.argv[2]==='--verify')console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(process.argv[3],'utf8')),process.argv[4]?JSON.parse(fs.readFileSync(process.argv[4],'utf8')):null,process.argv[5]?JSON.parse(fs.readFileSync(process.argv[5],'utf8')):null),null,2));
 else run(process.argv[2],process.argv[3]||'development');
}
module.exports={build,run,definitions,diagnosticSource,diagnosticDefinitions,diagnostics,scans,inspectRejects,verify};
