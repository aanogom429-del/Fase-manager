// Paired synthetic dynamic probes: no fitted real-match claim.
const fs=require('node:fs'),path=require('node:path'),{env}=require('../tests/continuity.cjs');
const {createHash}=require('node:crypto');
const root=path.join(__dirname,'..'),entry='startSituation();requestAnimationFrame(frame);';
function simulate(source,t,kind,seed){
 const e=env(source.replace(entry,entry+`globalThis.test.probe={schedule:(delay)=>{decision=delay;},read:contextualDefense};`),seed);
 e.t.enterFreeMode();e.t.scenario({time:0,team:1-t,seed});
 const ps=e.t.get().players,flip=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 const carrier=ps.find(p=>p.t!==t&&p.n===6),p=ps.find(p=>p.t===t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===7);
 for(const q of ps){const pos=flip(q.t===t?65+(q.n%3)*4:75+(q.n%3)*4,5+q.n*5);
  Object.assign(q,pos,{hx:pos.x,hy:pos.y,sx:pos.x,sy:pos.y,vx:0,vy:0,bodyAngle:q.t===t?(t?Math.PI:0):(t?0:Math.PI),visualMemory:[],rivalMemory:[],controlUntil:0,cool:0});
  for(const k of ['intentAt','intentX','intentY','attackOrigin','defOrigin','defDuty'])delete q[k];
 }
 Object.assign(carrier,flip(20,kind==='central'?32:40),{bodyAngle:t?0:Math.PI});
 Object.assign(p,flip(7,kind==='central'?32:34.5));
 Object.assign(ps.find(q=>q.t===t&&q.n===1),flip(4,48));
 Object.assign(receiver,flip(23,28));
 e.t.capture(carrier,'inicio del ensayo');carrier.driveX=carrier.x+(t?1:-1)*2;carrier.driveY=carrier.y- (t?-1:1);
 if(kind!=='free')e.t.probe.schedule(10);
 e.t.setDestinationTrace(true);
 const initial=ps.map(q=>({id:q.id,x:q.x,y:q.y}));
 let protectionSamples=0,shot=false,pass=false,firstShotOutcome=null,firstShotTime=null;
 const initialGoals=e.t.get().score[1-t];
 for(let k=0;k<720;k++){
  const s=e.t.get(),time=k/120;
  if(kind==='pass'&&!pass&&time>=.35&&s.owner===carrier){e.t.kickTo(carrier,receiver.x,receiver.y,'pass',receiver);pass=true;}
  const launchAt=kind==='immediate'?0:.55;
  if(['delayed','immediate','central'].includes(kind)&&!shot&&time>=launchAt&&s.owner===carrier){
   const goal=flip(-2,kind==='central'?32:29.5);e.t.kickTo(carrier,goal.x,goal.y,'shot');shot=true;firstShotTime=time;
  }
  const beforeShots=s.shots;e.t.update(1/120);const after=e.t.get();
  protectionSamples+=e.t.getDestinationTrace().rows.filter(r=>r.time===after.elapsed&&r.team===t&&r.source==='lectura almacenada'&&r.intent&&r.intent.steps.some(step=>step.stage==='Proteger línea de tiro'||step.stage==='Mantener cobertura de tiro')).length;
  if(firstShotTime===null&&after.shots>beforeShots)firstShotTime=time;
  if(firstShotTime!==null&&firstShotOutcome===null&&!after.flight){
   firstShotOutcome=after.score[1-t]>initialGoals?'goal':after.owner&&after.owner.t===t?'defender_control':after.restart?'restart':'other';
  }
  for(const q of ps)if(!Number.isFinite(q.x)||!Number.isFinite(q.y))throw Error('Non-finite movement');
 }
 const s=e.t.get();
 return {defendingTeam:t,kind,seed,seconds:6,protectionSamples,passes:s.passes,shots:s.shots,goalsConceded:s.score[1-t]-initialGoals,turnovers:s.turnovers,firstShotOutcome,
  movedAttackers:ps.filter(q=>q.t!==t&&Math.hypot(q.x-initial[q.id].x,q.y-initial[q.id].y)>.1).length,
  movedDefenders:ps.filter(q=>q.t===t&&Math.hypot(q.x-initial[q.id].x,q.y-initial[q.id].y)>.1).length};
}
function run(){
 const sources={v052:fs.readFileSync(path.join(root,'tests/fixtures/engine-v052.html'),'utf8'),v053:fs.readFileSync(path.join(root,'index.html'),'utf8')};
 const rows=[];
 for(const t of [0,1])for(const kind of ['delayed','immediate','central','pass','free'])for(const seed of [101,202]){
  const before=simulate(sources.v052,t,kind,seed),after=simulate(sources.v053,t,kind,seed);
  rows.push({before,after,goalDelta:after.goalsConceded-before.goalsConceded});
  if(require.main===module)console.error('Evaluated',t,kind,seed);
 }
 return {engineSha256:Object.fromEntries(Object.entries(sources).map(([k,v])=>[k,createHash('sha256').update(v).digest('hex')])),base:'a19f7435c22896d15e22f4d1a00033ac87c58cea',candidate:'0.53',protocol:'20 paired six-second cases, teams mirrored, seeds 101/202. All players update freely at 1/120 s. delayed/immediate/central prescribe one real shot; pass prescribes one real pass then reactive decisions; free is autonomous. No positions are imposed after initialization. Goalkeeper intentionally off-centre. protectionSamples counts actual cached protective intentions applied to defenders, in player-steps, via passive destination trace. Samples use ordinary update, movement, contact, goals and restarts.',limitations:['Synthetic scenarios, not real-match tracking','Small sample; no general improvement claim','Prescribed probes control initial action timing; only free is wholly autonomous','Both teams use same seeded random stream but identity/order can affect mirrored outcomes','First shot outcome is coarse; shots/captures do not model physical rebounds'],rows};
}
if(require.main===module){const report=run();fs.writeFileSync(path.join(root,'data/finishing-v053.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.rows.map(r=>({t:r.after.defendingTeam,kind:r.after.kind,seed:r.after.seed,protection:r.after.protectionSamples,before:r.before.firstShotOutcome,after:r.after.firstShotOutcome,goals:[r.before.goalsConceded,r.after.goalsConceded],shots:r.after.shots,passes:r.after.passes}))));}
module.exports={run,simulate};
