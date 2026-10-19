const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {environment,validate}=require('./evaluate_owner_holdout.cjs');
const data=require('../data/owner-holdout-windows.json'),history=require('../data/support-initial-history.json');
const plan=require('../data/owner-holdout-plan.json'),root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'tests/fixtures/engine-v047.html'),'utf8');
const dist=(a,b)=>Math.hypot((a[0]-b[0])*1.05,(a[1]-b[1])*68/64);
function evaluate(c,seedVelocity){
 validate(c);
 const rosters=[0,1].map(t=>c.frames[0].players.filter(p=>p[0]===t).map(p=>p[1]).sort((a,b)=>a-b));
 const roles=rosters.map((r,t)=>new Map([[[11,25][t],1],...r.filter(n=>n!==[11,25][t]).map((n,i)=>[n,i+2])]));
 const orient=p=>[p[0]===c.team?0:1,roles[p[0]].get(p[1]),c.team?100-p[2]:p[2],c.team?64-p[3]:p[3]];
 const ball=b=>c.team?[100-b[0],64-b[1]]:b;
 const initial=c.frames[0].players.map(orient),ids=initial.filter(p=>p[0]===0&&p[1]!==1&&p[1]!==roles[c.team].get(c.holder)).map(p=>p[1]);
 const past=history.clips.find(h=>h.id===c.id).frames;
 assert.equal(past.at(-1).time,c.start);assert(past.every(f=>f.time<=c.start));
 // Least-squares slope over six preceding samples reduces single-frame noise.
 const meanT=past.reduce((s,f)=>s+f.time-c.start,0)/past.length;
 const denom=past.reduce((s,f)=>s+(f.time-c.start-meanT)**2,0);
 const velocities=initial.map(p=>{const samples=past.map(f=>({t:f.time-c.start,q:f.players.map(orient).find(q=>q[0]===p[0]&&q[1]===p[1])}));
  const vx=samples.reduce((s,a)=>s+(a.t-meanT)*a.q[2],0)/denom,vy=samples.reduce((s,a)=>s+(a.t-meanT)*a.q[3],0)/denom;
  assert(Number.isFinite(vx)&&Number.isFinite(vy)&&Math.hypot(vx*1.05,vy*68/64)<12,'Implausible initial speed');return [p[0],p[1],vx,vy];});
 const model=environment(html);model.init(initial,ball(c.frames[0].ball),roles[c.team].get(c.holder),seedVelocity?velocities:[]);
 const stats=ids.map(n=>{const origin=initial.find(p=>p[0]===0&&p[1]===n).slice(2),v=velocities.find(p=>p[0]===0&&p[1]===n);
  return {n,jersey:rosters[c.team].find(j=>roles[c.team].get(j)===n),initialVelocityMps:[v[2]*1.05,v[3]*68/64],error:0,previousError:0,realPathM:0,simulatedPathM:0,previousSim:origin,origin,oppositeTime:0,movingTime:0,targetDistanceIntegral:0,stageShift:{},firstIntent:null};});
 for(let i=1;i<c.frames.length;i++){
  const a=c.frames[i-1],b=c.frames[i],dt=b.time-a.time,aa=a.players.map(orient),bb=b.players.map(orient),steps=Math.ceil(dt/plan.protocol.step);let result;
  for(let k=1;k<=steps;k++){
   const u=k/steps,ps=bb.map(p=>{const q=aa.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0],p[1],q[2]+(p[2]-q[2])*u,q[3]+(p[3]-q[3])*u];});
   const ab=ball(a.ball),zb=ball(b.ball);result=model.step(ps,[ab[0]+(zb[0]-ab[0])*u,ab[1]+(zb[1]-ab[1])*u],ids,dt/steps);
   for(const s of stats){const r=result.traces.find(r=>r.team===0&&r.jersey===s.n);assert(r&&Number.isFinite(r.appliedX));
    s.targetDistanceIntegral+=dist([r.x,r.y],[r.appliedX,r.appliedY])*dt/steps;
    if(!s.firstIntent)s.firstIntent={source:r.source,steps:r.steps,applied:[r.appliedX,r.appliedY]};
    for(let j=1;j<r.steps.length;j++){const p=r.steps[j-1],q=r.steps[j];s.stageShift[q.stage]=(s.stageShift[q.stage]||0)+dist([p.x,p.y],[q.x,q.y])*dt/steps;}
   }
  }
  for(const s of stats){const p=result.positions.find(p=>p[0]===s.n).slice(1),actual=bb.find(p=>p[0]===0&&p[1]===s.n).slice(2),prior=aa.find(p=>p[0]===0&&p[1]===s.n).slice(2);
   const e=dist(p,actual);s.error+=(s.previousError+e)*dt/2;s.previousError=e;
   const realStep=dist(actual,prior),simStep=dist(p,s.previousSim);s.realPathM+=realStep;s.simulatedPathM+=simStep;
   if(realStep/dt>.2&&simStep/dt>.2){s.movingTime+=dt;const dot=(actual[0]-prior[0])*(p[0]-s.previousSim[0])*1.05**2+(actual[1]-prior[1])*(p[1]-s.previousSim[1])*(68/64)**2;if(dot<0)s.oppositeTime+=dt;}
   s.previousSim=p;
  }
 }
 const duration=c.end-c.start;
 return stats.map(s=>({jersey:s.jersey,initialVelocityMps:s.initialVelocityMps,meanErrorM:s.error/duration,realPathM:s.realPathM,simulatedPathM:s.simulatedPathM,
  oppositeDirectionSeconds:s.oppositeTime,comparableMovingSeconds:s.movingTime,meanAppliedTargetDistanceM:s.targetDistanceIntegral/duration,
  meanSequentialStageShiftM:Object.fromEntries(Object.entries(s.stageShift).map(([k,v])=>[k,v/duration])),firstIntent:s.firstIntent}));
}
function run(){return {engineVersion:'0.47',engineSha256:require('node:crypto').createHash('sha256').update(html).digest('hex'),
 protocol:'Paired replay: same engine, windows and default body orientation; only initial velocity changes. Velocity is least-squares slope of preceding 0.20 s, no future samples. Direction comparison requires both speeds >0.2 m/s. Stage shifts are consecutive destination distances, NOT causal attribution.',
 limitations:['Reused short windows, not independent validation','Default body orientation and approximate roles remain','Past velocity is an estimate; no physical or tactical truth labels','Stage shifts can include canceled or cached intentions; magnitude does not prove error','No calibration, behavior change or learning'],
 clips:data.clips.map(c=>({id:c.id,zeroVelocity:evaluate(c,false),trackingVelocity:evaluate(c,true)}))};}
if(require.main===module){const r=run();fs.writeFileSync(path.join(root,'data/support-destination-diagnosis.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r.clips.map(c=>({id:c.id,zero:c.zeroVelocity.reduce((s,p)=>s+p.meanErrorM,0)/9,velocity:c.trackingVelocity.reduce((s,p)=>s+p.meanErrorM,0)/9,realPath:c.trackingVelocity.reduce((s,p)=>s+p.realPathM,0)/9,simPath:c.trackingVelocity.reduce((s,p)=>s+p.simulatedPathM,0)/9})),null,2));}
module.exports={run,evaluate};
