// Offline tracking adapter. The game file and its decision policy remain intact.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto'),{env}=require('../tests/continuity.cjs');
const root=path.join(__dirname,'..'),entry='startSituation();requestAnimationFrame(frame);';
const hash=value=>createHash('sha256').update(value).digest('hex');
const read=file=>JSON.parse(file.endsWith('.gz')?zlib.gunzipSync(fs.readFileSync(file)):fs.readFileSync(file,'utf8'));
const write=(file,value)=>{const text=JSON.stringify(value)+'\n';fs.writeFileSync(file,file.endsWith('.gz')?zlib.gzipSync(text):text);};
const plan=read(path.join(root,'data/real-defense-replay-plan.json'));
function sources(){return {v052:fs.readFileSync(path.join(root,'tests/fixtures/engine-v052.html'),'utf8'),v053:fs.readFileSync(path.join(root,'tests/fixtures/engine-v053.html'),'utf8'),e28:fs.readFileSync(path.join(root,'index.html'),'utf8')};}
function parseCSV(line){let quoted=false,field='',result=[];for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quoted&&line[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){result.push(field);field='';}else field+=c;}assert(!quoted,'Unclosed CSV field');return [...result,field];}
function eventContext(file,data){
 const raw=fs.readFileSync(file);assert.equal(hash(raw),data.sourcesSha256['Game2/events.csv'],'Use the event source paired with the real analysis');
 const lines=raw.toString('utf8').trim().split(/\r?\n/),headers=parseCSV(lines.shift());
 const events=lines.map((line,i)=>{const a=Object.fromEntries(parseCSV(line).map((v,j)=>[headers[j],v])),number=k=>a[k]?Number(a[k].replace('Player','')):null;return {id:i+1,team:a.Team==='Home'?0:1,type:a.Type,period:Number(a.Period),start:Number(a['Start Time [s]']),end:Number(a['End Time [s]']),sender:number('From'),receiver:number('To')};});
 return Object.fromEntries(data.clips.map(c=>{const all=c.match==='Sample Game 2'?events.filter(e=>e.period===1&&e.start<=c.end):c.events;
  const useful=all.filter(e=>['PASS','RECOVERY','SHOT','BALL LOST','BALL OUT','SET PIECE'].includes(e.type));
  const prior=useful.filter(e=>e.start<c.start).at(-1);
  return [c.id,[...(prior?[prior]:[]),...useful.filter(e=>e.start>=c.start&&e.start<=c.end)].map(({id,team,type,start,end,sender,receiver})=>({id,team,type,start,end,sender,receiver}))];}));
}
function stateAt(events,time){
 const e=events.filter(e=>e.start<=time+1e-8).at(-1);
 if(!e)return {team:null,carrier:null,kind:'unknown'};
 if(e.type==='RECOVERY')return {team:e.team,carrier:e.sender,kind:'controlled'};
 if(e.type==='PASS')return time<e.end-1e-8?{team:e.team,carrier:null,kind:'in-transit'}:{team:e.team,carrier:e.receiver,kind:'controlled'};
 if(e.type==='BALL OUT'||e.type==='SET PIECE')return {team:null,carrier:null,kind:'unknown'};
 return {team:e.team,carrier:null,kind:'uncontrolled'};
}
function complete(f){return f.ball&&f.ball.every(Number.isFinite)&&f.players.length===22&&new Set(f.players.map(p=>p[0]+':'+p[1])).size===22&&[0,1].every(t=>f.players.filter(p=>p[0]===t).length===11)&&f.players.every(p=>p.slice(2).every(Number.isFinite));}
function prepare(clip,events){
 let frames=clip.frames.filter(f=>f.time<= (clip.shot?.start??clip.end)+1e-8),start=0;
 if(clip.shot){for(let i=frames.length-1;i>=0;i--){if(stateAt(events,frames[i].time).team!==1-clip.defendingTeam){start=i+1;break;}}}
 frames=frames.slice(start);assert(frames.length>=3,'Too short after possession restriction');
 for(let i=0;i<frames.length;i++){assert(complete(frames[i]),'Incomplete tracking interval');if(i)assert(frames[i].time>frames[i-1].time&&frames[i].time-frames[i-1].time<=.251,'Tracking gap');assert.equal(stateAt(events,frames[i].time).team,1-clip.defendingTeam,'Opponent possession is required');}
 const rosters=[0,1].map(t=>frames[0].players.filter(p=>p[0]===t).map(p=>p[1]).sort((a,b)=>a-b)),keepers=[11,25];
 for(const t of [0,1])assert(rosters[t].includes(keepers[t]));
 for(const f of frames)for(const t of [0,1])assert.deepEqual(f.players.filter(p=>p[0]===t).map(p=>p[1]).sort((a,b)=>a-b),rosters[t],'Identity changed');
 const roles=rosters.map((ns,t)=>new Map([[keepers[t],1],...ns.filter(n=>n!==keepers[t]).map((n,i)=>[n,i+2])])),initial=frames[1],previous=frames[0];
 const canonicalX=p=>clip.defendingTeam?100-p[2]:p[2];
 const defenders=initial.players.filter(p=>p[0]===clip.defendingTeam&&p[1]!==keepers[clip.defendingTeam]);
 const ballDistance=p=>Math.hypot((p[2]-initial.ball[0])*1.05,(p[3]-initial.ball[1])*68/64);
 const near=[...defenders].sort((a,b)=>ballDistance(a)-ballDistance(b)||a[1]-b[1]).slice(0,2).map(p=>p[1]);
 const deep=defenders.filter(p=>!near.includes(p[1])).sort((a,b)=>canonicalX(a)-canonicalX(b)||a[1]-b[1]).slice(0,4).map(p=>p[1]);
 const rest=defenders.filter(p=>!near.includes(p[1])&&!deep.includes(p[1])).map(p=>p[1]).sort((a,b)=>a-b);
 return {clipId:clip.id,defendingTeam:clip.defendingTeam,requestedStart:clip.start,continuousStart:previous.time,initialTime:initial.time,end:frames.at(-1).time,frames:frames.slice(1),previous,roles,rosters,groups:{near,deep,rest}};
}
function build(source){
 const anchor='for(const {p,tx,ty} of moves){advancePlayer(p,tx,ty,dt);';assert.equal(source.split(anchor).length,2);
 source=source.replace(anchor,'for(const {p,tx,ty} of moves){if(p.t===replayDefendingTeam&&!isKeeper(p))advancePlayer(p,tx,ty,dt);');
 assert.equal(source.split(entry).length,2);
 return source.replace(entry,entry+`
let replayDefendingTeam=null;const replayProbe={protectionQueries:0,carrierQueries:0,selectedQueries:0};
if(typeof protectFinishingLine==='function'){const previousProtect=protectFinishingLine;protectFinishingLine=function(...args){replayProbe.protectionQueries++;if(owner)replayProbe.carrierQueries++;const result=previousProtect(...args);if(result)replayProbe.selectedQueries++;return result;};}
function replayAngle(p,point,hypothesis){return hypothesis==='ball-facing'?Math.atan2(point[1]-p.y,point[0]-p.x):(p.t?Math.PI:0);}
globalThis.test.replay={
 init:(snapshot,defending,hypothesis)=>{
  replayDefendingTeam=defending;guided=false;selected=null;stage='free';running=false;elapsed=snapshot.time;
  owner=null;flight=null;techAction=null;loose=false;restart=null;restartGuard=null;offsidePhase=null;advantage=null;matchStopped=false;offBallOrders=[];offBallPlans=[];decision=Infinity;bx=snapshot.ball[0];by=snapshot.ball[1];
  for(const q of snapshot.players){const p=players.find(p=>p.t===q.t&&p.n===q.slot);p.x=p.hx=p.sx=q.x;p.y=p.hy=p.sy=q.y;p.vx=q.vx;p.vy=q.vy;p.bodyAngle=replayAngle(p,snapshot.ball,hypothesis);p.cool=0;p.sentOff=false;p.visualMemory=[];p.rivalMemory=[];p.controlUntil=0;p.scanUntil=0;p.driveX=p.x;p.driveY=p.y;
   for(const key of ['intentAt','intentX','intentY','attackOrigin','attackSupport','defOrigin','defDuty'])delete p[key];}
 },
 step:(snapshot,state,dt,hypothesis)=>{
  elapsed=snapshot.time;bx=snapshot.ball[0];by=snapshot.ball[1];
  for(const q of snapshot.players){const p=players.find(p=>p.t===q.t&&p.n===q.slot);if(p.t!==replayDefendingTeam||isKeeper(p)){p.x=q.x;p.y=q.y;p.vx=q.vx;p.vy=q.vy;p.bodyAngle=replayAngle(p,snapshot.ball,hypothesis);}}
  owner=state.carrier===null?null:players.find(p=>p.t===state.team&&p.n===state.slot);
  flight=owner?null:{t:state.team,kind:'tracking-unknown-height',target:null};loose=false;ballHeight=0;
  for(const p of activePlayers()){observeTeammates(p);observeRivals(p);}movement(dt);
 },
 state:()=>({players:players.map(p=>({t:p.t,slot:p.n,x:p.x,y:p.y,vx:p.vx,vy:p.vy,bodyAngle:p.bodyAngle,intentAt:p.intentAt,intentX:p.intentX,intentY:p.intentY,duty:p.defDuty})),ball:[bx,by],owner:owner&&{t:owner.t,slot:owner.n},probe:{...replayProbe},seed:trialSeed})
};`);
}
function velocities(frame,previous){const dt=frame.time-previous.time;assert(dt>0&&dt<=.251);return new Map(frame.players.map(p=>{const q=previous.players.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0]+':'+p[1],[(p[2]-q[2])/dt,(p[3]-q[3])/dt]];}));}
function snapshot(a,b,time,roles,velocity){const u=b.time===a.time?0:(time-a.time)/(b.time-a.time);return {time,ball:a.ball.map((v,i)=>v+(b.ball[i]-v)*u),players:a.players.map(p=>{const q=b.players.find(q=>q[0]===p[0]&&q[1]===p[1]),v=velocity.get(p[0]+':'+p[1]);return {t:p[0],jersey:p[1],slot:roles[p[0]].get(p[1]),x:p[2]+(q[2]-p[2])*u,y:p[3]+(q[3]-p[3])*u,vx:v[0],vy:v[1]};})};}
function geometry(players,ball,t){
 const ds=players.filter(p=>p[0]===t&&p[1]!==[11,25][t]).map(p=>({n:p[1],x:(t?100-p[2]:p[2])*1.05,y:(t?64-p[3]:p[3])*68/64})),bx=(t?100-ball[0]:ball[0])*1.05,by=(t?64-ball[1]:ball[1])*68/64;
 const ranked=[...ds].sort((a,b)=>Math.hypot(a.x-bx,a.y-by)-Math.hypot(b.x-bx,b.y-by)||a.n-b.n),p=ranked[0];
 return {nearestDistanceM:Math.hypot(p.x-bx,p.y-by),nearest:p.n,goalSide:ds.filter(p=>p.x<bx).length,centroidX:ds.reduce((s,p)=>s+p.x,0)/10,centroidY:ds.reduce((s,p)=>s+p.y,0)/10,lengthM:Math.max(...ds.map(p=>p.x))-Math.min(...ds.map(p=>p.x)),widthM:Math.max(...ds.map(p=>p.y))-Math.min(...ds.map(p=>p.y)),potentialCover:ds.filter(q=>q!==p&&q.x<=p.x-2&&Math.hypot(q.x-p.x,q.y-p.y)<=12).length,centralZone:ds.filter(p=>p.x<=25&&Math.abs(p.y-34)<=17).length};
}
function score(samples,prepared){
 const t=prepared.defendingTeam,ids=Object.values(prepared.groups).flat(),keys=['all','near','deep','rest'],integrals=Object.fromEntries(keys.map(k=>[k,0])),metrics={},duration=prepared.end-prepared.initialTime;assert(duration>0);
 let previous=null,firstProximity=null;
 const rows=samples.map(s=>{const actual=s.observed,expected=geometry(actual,s.ball,t),got=geometry(s.predicted,s.ball,t),errors={};
  for(const key of keys){const ns=key==='all'?ids:prepared.groups[key];errors[key]=ns.reduce((sum,n)=>{const a=actual.find(p=>p[0]===t&&p[1]===n),b=s.predicted.find(p=>p[0]===t&&p[1]===n);return sum+Math.hypot((a[2]-b[2])*1.05,(a[3]-b[3])*68/64);},0)/ns.length;}
  const delta=Object.fromEntries(['nearestDistanceM','goalSide','centroidX','lengthM','widthM','potentialCover','centralZone'].map(k=>[k,Math.abs(got[k]-expected[k])]));
  if(firstProximity===null&&got.nearestDistanceM<1.65)firstProximity=s.time;
  if(previous){const dt=s.time-previous.time;for(const key of keys)integrals[key]+=(previous.errors[key]+errors[key])*dt/2;for(const [k,v]of Object.entries(delta))metrics[k]=(metrics[k]||0)+(previous.delta[k]+v)*dt/2;}
  previous={time:s.time,errors,delta};return {...s,errorM:errors,geometry:got,observedGeometry:expected};
 });
 return {meanErrorM:Object.fromEntries(keys.map(k=>[k,integrals[k]/duration])),meanAbsoluteMetricError:Object.fromEntries(Object.entries(metrics).map(([k,v])=>[k,v/duration])),firstPlanarProximity:firstProximity,endpoint:rows.at(-1).geometry,observedEndpoint:rows.at(-1).observedGeometry,endpointErrorM:rows.at(-1).errorM,first:rows[0].geometry,last:rows.at(-1).geometry,samples:rows};
}
function simulate(source,prepared,events,hypothesis,options={}){
 assert(plan.bodyHypotheses.includes(hypothesis));const e=env(build(source)),r=e.t.replay,t=prepared.defendingTeam,frames=prepared.frames,initial=frames[0],velocity=velocities(initial,prepared.previous);
 r.init(snapshot(initial,initial,initial.time,prepared.roles,velocity),t,hypothesis);const seed=r.state().seed;
 const reverse=prepared.rosters.map((_,t)=>new Map([...prepared.roles[t]].map(([n,slot])=>[slot,n]))),samples=[],imposedChecks=[];
 const capture=f=>{const state=r.state(),predicted=f.players.map(p=>{if(p[0]!==t||p[1]===[11,25][t])return [...p];const q=state.players.find(q=>q.t===t&&reverse[t].get(q.slot)===p[1]);return [t,p[1],q.x,q.y];});samples.push({time:f.time,ball:f.ball,observed:f.players,predicted});};
 capture(initial);
 for(let i=1;i<frames.length;i++){
  const a=frames[i-1],b=frames[i],prior=i===1?prepared.previous:frames[i-2],v=velocities(a,prior),steps=Math.ceil((b.time-a.time)*120),dt=(b.time-a.time)/steps;
  for(let k=1;k<=steps;k++){
   const time=a.time+dt*k,current=snapshot(a,b,time,prepared.roles,v),state=stateAt(events,time);assert.equal(state.team,1-t);
   if(state.carrier!==null){state.slot=prepared.roles[state.team].get(state.carrier);assert(state.slot,'Unknown carrier');}
   r.step(current,state,dt,hypothesis);
   const after=r.state();assert.equal(after.seed,seed,'Movement replay must not draw random outcomes');
   for(const q of after.players)assert([q.x,q.y,q.vx,q.vy,q.bodyAngle].every(Number.isFinite),'Non-finite replay');
   if(options.auditEveryStep){for(const p of current.players.filter(p=>p.t!==t||p.jersey===[11,25][t])){const q=after.players.find(q=>q.t===p.t&&q.slot===p.slot);assert.equal(q.x,p.x,'Imposed actor moved');assert.equal(q.y,p.y,'Imposed actor moved');}assert.deepEqual(Array.from(after.ball),current.ball);imposedChecks.push(time);}
  }
  capture(b);
 }
 const result=score(samples,prepared);return {...result,probe:r.state().probe,seedStable:r.state().seed===seed,auditedSteps:imposedChecks.length};
}
function reference(prepared,kind){const t=prepared.defendingTeam,initial=prepared.frames[0],v=velocities(initial,prepared.previous);return score(prepared.frames.map(f=>({time:f.time,ball:f.ball,observed:f.players,predicted:f.players.map(p=>{if(kind==='observed'||p[0]!==t||p[1]===[11,25][t])return [...p];const q=initial.players.find(q=>q[0]===p[0]&&q[1]===p[1]),speed=v.get(p[0]+':'+p[1]),dt=f.time-initial.time;return [p[0],p[1],Math.max(0,Math.min(100,q[2]+(kind==='initial-velocity'?speed[0]*dt:0))),Math.max(0,Math.min(64,q[3]+(kind==='initial-velocity'?speed[1]*dt:0)))];})})),prepared);}
function run(eventsFile,output,mode='full'){
 const sourceFile=path.join(root,plan.source),data=read(sourceFile),context=eventContext(eventsFile,data),src=sources();assert(['pilot','full'].includes(mode));
 const report={schemaVersion:1,mode,plan,sourceDataSha256:hash(fs.readFileSync(sourceFile)),eventsSha256:hash(fs.readFileSync(eventsFile)),engineSha256:Object.fromEntries(Object.entries(src).map(([k,v])=>[k,hash(v)])),adapterSha256:hash(fs.readFileSync(__filename)),context,rows:[]};
 for(const id of plan.clips){const clip=data.clips.find(c=>c.id===id);assert(clip);const p=prepare(clip,context[id]),{frames,previous,roles,rosters,...config}=p;
  const references=Object.fromEntries(plan.references.map(k=>[k,reference(p,k)]));
  for(const hypothesis of mode==='pilot'?['ball-facing']:plan.bodyHypotheses){const results={};for(const engine of mode==='pilot'?['e28']:plan.engines){results[engine]=simulate(src[engine],p,context[id],hypothesis);console.error(id,hypothesis,engine,results[engine].meanErrorM.all.toFixed(3));}
   report.rows.push({...config,hypothesis,mapping:roles.map(m=>Object.fromEntries(m)),results,references});write(output,report);
  }
 }return report;
}
function summarize(report){
 const groups={};for(const row of report.rows)for(const [engine,r]of Object.entries(row.results)){const key=engine+'/'+row.hypothesis;groups[key]??={cases:0,betterThanStatic:0,betterThanInitialVelocity:0,errorM:0,nearErrorM:0,deepErrorM:0,restErrorM:0};const g=groups[key];g.cases++;g.betterThanStatic+=Number(r.meanErrorM.all<row.references.stationary.meanErrorM.all);g.betterThanInitialVelocity+=Number(r.meanErrorM.all<row.references['initial-velocity'].meanErrorM.all);g.errorM+=r.meanErrorM.all;g.nearErrorM+=r.meanErrorM.near;g.deepErrorM+=r.meanErrorM.deep;g.restErrorM+=r.meanErrorM.rest;}
 for(const g of Object.values(groups))for(const k of ['errorM','nearErrorM','deepErrorM','restErrorM'])g[k]/=g.cases;
 return {mode:report.mode,engineRuns:report.rows.reduce((s,r)=>s+Object.keys(r.results).length,0),averaging:'Unweighted mean of per-clip time-weighted errors; eight selected clips, not independent matches',groups,rows:report.rows.map(r=>({clipId:r.clipId,hypothesis:r.hypothesis,initialTime:r.initialTime,end:r.end,stationary:r.references.stationary.meanErrorM.all,initialVelocity:r.references['initial-velocity'].meanErrorM.all,engines:Object.fromEntries(Object.entries(r.results).map(([k,v])=>[k,{error:v.meanErrorM,metricErrors:v.meanAbsoluteMetricError,protection:v.probe}]))}))};
}
if(require.main===module){if(process.argv[2]==='--summary')console.log(JSON.stringify(summarize(read(process.argv[3])),null,2));else {assert(process.argv[2]&&process.argv[3],'EVENTS_CSV OUTPUT [pilot|full]');run(process.argv[2],process.argv[3],process.argv[4]||'full');}}
module.exports={read,write,hash,plan,sources,eventContext,stateAt,prepare,build,snapshot,velocities,geometry,score,simulate,reference,run,summarize};
