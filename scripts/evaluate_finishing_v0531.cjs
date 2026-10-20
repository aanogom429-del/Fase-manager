// Corrected, paired synthetic evaluation. Observers never feed information to players.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const {env}=require('../tests/continuity.cjs');
const root=path.join(__dirname,'..'),entry='startSituation();requestAnimationFrame(frame);';
const hash=s=>createHash('sha256').update(s).digest('hex');
function instrument(source){
 if(!source.includes(entry))throw Error('Missing engine instrumentation anchor');
 return source.replace(entry,entry+`
 const probeEvents=[];let probeDraws=0;
 const probeRandom=random;random=function(){probeDraws++;return probeRandom();};
 const probeKick=kickTo;const probeCapture=capture;const probeChoose=chooseAction;
 kickTo=function(...args){const old=flight;const ret=probeKick(...args);if(flight&&flight!==old)probeEvents.push({type:'kick',time:elapsed,actor:args[0].id,team:args[0].t,kind:args[3],x:args[0].x,y:args[0].y,tx:flight.tx,ty:flight.ty,draws:probeDraws});return ret;};
 capture=function(p,why){const f=flight,old=owner;const ret=probeCapture(p,why);if(owner===p&&old!==p)probeEvents.push({type:'capture',time:elapsed,actor:p.id,team:p.t,why,fromTeam:f?f.t:old?old.t:null,kind:f&&f.kind,keeper:isKeeper(p),x:p.x,y:p.y});return ret;};
 chooseAction=function(p){const before=probeEvents.length,draws=probeDraws;const ret=probeChoose(p);probeEvents.push({type:'decision',time:elapsed,actor:p.id,team:p.t,x:p.x,y:p.y,drawsBefore:draws,drawsAfter:probeDraws,action:probeEvents.slice(before).find(e=>e.type==='kick')?.kind||'carry/scan/wait'});return ret;};
 globalThis.test.kickTo=kickTo;globalThis.test.capture=capture;
 globalThis.test.probe={events:probeEvents,schedule:delay=>{decision=delay;}};
 `);
}
function laneGap(p,a,b){
 const dx=b.x-a.x,dy=b.y-a.y,ll=dx*dx+dy*dy;if(!ll)return Infinity;
 const u=((p.x-a.x)*dx+(p.y-a.y)*dy)/ll;
 return u>.08&&u<.95?Math.hypot(p.x-a.x-u*dx,p.y-a.y-u*dy):Infinity;
}
function simulate(source,t,kind,seed,options={}){
 const {angle=0,keeperHome=true,help=0,structure=false,seconds=6,profile=1,trace=false,observe=true}=options;
 const e=env(observe?instrument(source):source.replace(entry,entry+'globalThis.test.probe={events:[],schedule:delay=>{decision=delay;}};'),seed);
 e.t.enterFreeMode();e.t.scenario({time:0,team:1-t,seed});
 const ps=e.t.get().players,flip=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 const carrier=ps.find(p=>p.t!==t&&p.n===6),defender=ps.find(p=>p.t===t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7),keeper=ps.find(p=>p.t===t&&p.n===1);
 for(const q of ps){const pos=flip(q.t===t?65+(q.n%3)*4:75+(q.n%3)*4,5+q.n*5);
  Object.assign(q,pos,{hx:pos.x,hy:pos.y,sx:pos.x,sy:pos.y,vx:0,vy:0,bodyAngle:q.t===t?(t?Math.PI:0):(t?0:Math.PI),visualMemory:[],rivalMemory:[],controlUntil:0,cool:0});
  for(const k of ['intentAt','intentX','intentY','attackOrigin','defOrigin','defDuty'])delete q[k];
 }
 Object.assign(carrier,flip(20,kind==='central'?32:40),{bodyAngle:(t?0:Math.PI)+angle});
 Object.assign(defender,flip(7,kind==='central'?32:34.5));
 Object.assign(keeper,flip(4,48));
 // Correct setup only: movement continues to use the engine's unchanged keeper policy.
 if(keeperHome)Object.assign(keeper,{hx:keeper.x,hy:keeper.y,sx:keeper.x,sy:keeper.y});
 Object.assign(receiver,flip(23,28));
 if(help){const h=ps.find(q=>q.t===t&&q.n===7);Object.assign(h,flip(12,35.8),{vx:0,vy:help===2?(t?8:-8):0});}
 if(structure){
  for(const [n,x,y] of [[4,9,24],[5,14,46],[8,19,20]])Object.assign(ps.find(q=>q.t===t&&q.n===n),flip(x,y));
  for(const [n,x,y] of [[8,14,22],[9,12,43],[10,28,47]])Object.assign(ps.find(q=>q.t!==t&&q.n===n),flip(x,y));
 }
 if(profile!==1){defender.acceleration*=profile;defender.turnRate*=profile;defender.bodyAngle+=Math.PI/2;defender.vy=(t?-1:1)*4;}
 e.t.capture(carrier,'inicio del ensayo');carrier.driveX=carrier.x+(t?1:-1)*2;carrier.driveY=carrier.y-(t?-1:1);
 if(kind!=='free')e.t.probe.schedule(10);
 e.t.setDestinationTrace(true);
 const initial=ps.map(q=>({id:q.id,x:q.x,y:q.y,hx:q.hx,hy:q.hy}));
 const m={attackSeconds:0,dangerSeconds:0,occasionSeconds:0,occasionEpisodes:0,arrivalSum:0,openGoalSum:0,fieldOpenSum:0,passOptionsSum:0,doubleCoverSum:0,pressureSeconds:0,longestPossession:0,protectionSteps:0,intentChanges:0};
 let shot=false,pass=false,prevOcc=false,spell=0,firstShotOutcome=null,firstShotTime=null;
 const initialGoals=e.t.get().score[1-t],samples=[],previousTargets=new Map();
 for(let k=0;k<Math.round(seconds*120);k++){
  let s=e.t.get();const time=k/120;
  if(kind==='pass'&&!pass&&time>=.35&&s.owner===carrier){e.t.kickTo(carrier,receiver.x,receiver.y,'pass',receiver);pass=true;}
  if(['delayed','immediate','central'].includes(kind)&&!shot&&time>=(kind==='immediate'?0:.55)&&s.owner===carrier){const goal=flip(-2,kind==='central'?32:29.5);e.t.kickTo(carrier,goal.x,goal.y,'shot');shot=true;firstShotTime=time;}
  s=e.t.get();const o=s.owner,defs=ps.filter(p=>p.t===t&&p.n!==1&&!p.sentOff);
  const possession=o?o.t:s.flight?s.flight.t:null;
  if(possession===1-t){spell+=1/120;m.longestPossession=Math.max(m.longestPossession,spell);}else spell=0;
  if(k%6===0){let metrics=null;
   if(o&&o.t!==t&&!s.restart){
    const goalX=t?100:0,arrival=Math.min(...defs.map(p=>e.t.arrivalTime(p,o,1.65)));
    const danger=Math.abs(o.x-goalX)<=25&&Math.abs(o.y-32)<=17;
    const covers=Array.from({length:7},(_,i)=>{const end={x:goalX,y:29+i};return {n:defs.filter(p=>laneGap(p,o,end)<1.65).length,g:laneGap(keeper,o,end)<1.65};});
    const open=covers.filter(c=>!c.n&&!c.g).length/7,fieldOpen=covers.filter(c=>!c.n).length/7,double=covers.filter(c=>c.n>=2).length/7;
    const passOptions=ps.filter(p=>p.t===o.t&&p!==o&&p.n!==1&&!p.sentOff&&Math.hypot(p.x-o.x,p.y-o.y)>=3&&Math.hypot(p.x-o.x,p.y-o.y)<=30&&!defs.concat(keeper).some(q=>laneGap(q,o,p)<2)).length;
    const pressure=defs.some(p=>p.cool<=0&&Math.hypot(p.x-o.x,p.y-o.y)<2.8);
    // No invented angular wind-up: autonomous execution needs goal visibility and reception complete.
    const canShoot=e.t.perceives(o,{x:goalX,y:32})&&s.elapsed>=o.controlUntil;
    const occasion=danger&&canShoot&&arrival>0&&open>=3/7;
    m.attackSeconds+=.05;m.arrivalSum+=arrival*.05;if(pressure)m.pressureSeconds+=.05;
    if(danger){m.dangerSeconds+=.05;m.openGoalSum+=open*.05;m.fieldOpenSum+=fieldOpen*.05;m.passOptionsSum+=passOptions*.05;m.doubleCoverSum+=double*.05;}
    if(occasion){m.occasionSeconds+=.05;if(!prevOcc)m.occasionEpisodes++;}prevOcc=occasion;
    metrics={arrival,open,fieldOpen,passOptions,double,danger,occasion,pressure};
   }else prevOcc=false;
   if(trace)samples.push({time,owner:o&&o.id,ball:[s.bx,s.by],metrics,players:ps.filter(p=>p===keeper||p===defender||p===carrier||p===receiver).map(p=>({id:p.id,x:p.x,y:p.y,hx:p.hx,angle:p.bodyAngle,vx:p.vx,vy:p.vy,duty:p.defDuty,tx:p.intentX,ty:p.intentY}))});
  }
  const beforeShots=s.shots;e.t.update(1/120);const after=e.t.get();
  const rows=e.t.getDestinationTrace().rows.filter(r=>r.time===after.elapsed&&r.team===t);
  m.protectionSteps+=rows.filter(r=>r.source==='lectura almacenada'&&r.intent&&r.intent.steps.some(step=>/línea de tiro|cobertura de tiro/.test(step.stage))).length;
  for(const r of rows){const key=r.id,target=JSON.stringify(r.intent&&[r.intent.x,r.intent.y,r.intent.steps]);if(previousTargets.has(key)&&previousTargets.get(key)!==target)m.intentChanges++;previousTargets.set(key,target);}
  if(firstShotTime===null&&after.shots>beforeShots)firstShotTime=time;
  if(firstShotTime!==null&&firstShotOutcome===null&&!after.flight)firstShotOutcome=after.score[1-t]>initialGoals?'goal':after.owner&&after.owner.t===t?'defender_control':after.restart?'restart':'other';
  if(ps.some(p=>![p.x,p.y,p.vx,p.vy].every(Number.isFinite)))throw Error('Non-finite player');
 }
 const s=e.t.get(),events=e.t.probe.events;
 const captures=events.filter(e=>e.type==='capture'&&e.team===t&&e.fromTeam===1-t);
 Object.assign(m,{shotsConceded:events.filter(e=>e.type==='kick'&&e.kind==='shot'&&e.team===1-t).length,passesAgainst:events.filter(e=>e.type==='kick'&&e.kind==='pass'&&e.team===1-t).length,interceptions:captures.filter(e=>e.kind).length,keeperSaves:captures.filter(e=>e.keeper&&e.kind==='shot').length,tackleRecoveries:captures.filter(e=>!e.kind).length});
 return {defendingTeam:t,kind,seed,options:{angle,keeperHome,help,structure,seconds,profile},goalsConceded:s.score[1-t]-initialGoals,passes:s.passes,shots:s.shots,turnovers:s.turnovers,firstShotOutcome,metrics:m,initial,final:ps.map(p=>({id:p.id,x:p.x,y:p.y})),...(trace?{events,samples}:{} )};
}
function definitions(){
 const cases=[];
 for(const t of [0,1])for(const kind of ['pass','free'])for(const seed of [101,202])for(const angle of [0,Math.PI/2,Math.PI])cases.push({group:'orientation',t,kind,seed,options:{angle}});
 for(const t of [0,1])for(const kind of ['delayed','immediate','central'])for(const seed of [101,202])cases.push({group:'shot',t,kind,seed,options:{}});
 for(const t of [0,1])for(const [kind,seed] of [['pass',101],['free',202]])for(const help of [1,2])cases.push({group:'help',t,kind,seed,options:{help}});
 // Reserved seeds and structure/profile combinations; do not tune policy against this group.
 for(const t of [0,1])for(const kind of ['pass','free'])for(const seed of [307,809])for(const profile of [.8,1.2])cases.push({group:'reserved',t,kind,seed,options:{structure:true,help:1,profile,angle:profile<1?-Math.PI/2:Math.PI/2,seconds:12}});
 return cases;
}
function sources(){return Object.fromEntries(['v052','v053','v0531'].map(v=>[v,fs.readFileSync(path.join(root,v==='v0531'?'index.html':`tests/fixtures/engine-${v}.html`),'utf8')]));}
function run(cases=definitions()){
 const src=sources(),rows=[];
 for(const c of cases){const results={};for(const [v,s] of Object.entries(src))results[v]=simulate(s,c.t,c.kind,c.seed,c.options);rows.push({...c,results});if(require.main===module)console.error('Evaluated',rows.length,c.group,c.t,c.kind,c.seed);}
 return {candidate:'0.53.1',engineSha256:Object.fromEntries(Object.entries(src).map(([v,s])=>[v,hash(s)])),protocol:'Identical corrected keeper anchors for all three engines; 120 Hz updates, 20 Hz passive geometry; no interventions after setup except declared initial kick. Reserved group uses new seeds, nearby block, altered defender capabilities/momentum and 12 s possessions. Observer information never enters engine decisions.',limitations:['Synthetic, no real-match validation or xG','Potential windows are geometric opportunities, not predicted goals','Geometric rays omit height and body parts; access uses existing approximate arrivalTime to radius 1.65','Goalkeeper movement/contact policy unchanged','Shared seed does not imply shared draws after decisions diverge','Pressure means tackle range and cooldown, not a guaranteed recovery','Intent changes include target movement, not necessarily tactical oscillation'],rows};
}
if(require.main===module){const report=run();fs.writeFileSync(path.join(root,'data/finishing-v0531.json'),JSON.stringify(report,null,2)+'\n');}
module.exports={simulate,definitions,sources,run,laneGap};
