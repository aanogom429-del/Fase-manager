// Controlled five-second defensive rollout; observations are never treated as intent.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
const html=fs.readFileSync(process.env.FASE_ENGINE_SOURCE||path.join(root,'index.html'),'utf8'),engineVersion=html.match(/FASE MANAGER · ([0-9.]+)/)[1];
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const injected=source.replace('startSituation();requestAnimationFrame(frame);',`let lastPress=null,lastCover=null,pressChanges=0,coverChanges=0;globalThis.replay={
 init:(ps,point)=>{lastPress=lastCover=null;pressChanges=coverChanges=0;guided=true;selected=null;elapsed=0;loose=false;techAction=null;owner=null;flight={t:1,target:null};bx=point[0];by=point[1];
  for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);p.x=p.hx=p.sx=q[2];p.y=p.hy=p.sy=q[3];delete p.intentAt;}
 },
 step:(ps,point,dt)=>{for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);if(p.t===1||p.n===1){p.x=q[2];p.y=q[3];}}
  bx=point[0];by=point[1];elapsed+=dt;
  const before=players.filter(p=>p.t===0&&p.n!==1).sort((a,b)=>d(a,{x:bx,y:by})-d(b,{x:bx,y:by})||a.n-b.n);
  movement(dt);
  const press=players.find(p=>p.t===0&&p.defDuty==='press')||before[0],cover=players.find(p=>p.t===0&&p.defDuty==='cover')||before[1];
  if(lastPress!==null&&lastPress!==press.n)pressChanges++;if(lastCover!==null&&lastCover!==cover.n)coverChanges++;
  lastPress=press.n;lastCover=cover.n;
  return players.filter(p=>p.t===0&&p.n!==1).map(p=>[p.n,p.x,p.y]);
 },
 assignments:()=>({pressChanges,coverChanges})
};`);
function environment(){
 const nodes={};class E{constructor(){this.style={};this.dataset={};this.children=[];}setAttribute(){}append(...x){this.children.push(...x);}appendChild(x){this.append(x);}replaceChildren(...x){this.children=x;}querySelectorAll(){return this.children;}insertAdjacentElement(){}insertAdjacentHTML(){}}
 const c={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},console,requestAnimationFrame:()=>{}};
 vm.createContext(c);vm.runInContext(injected,c);return c.replay;
}
const role=(t,n)=>t===0?(n===11?1:n+1):(n===25?1:n-13);
function oriented(p,t){return [p[0]===t?0:1,role(p[0],p[1]),t?100-p[2]:p[2],t?64-p[3]:p[3]];}
const ball=(b,t)=>t?[100-b[0],64-b[1]]:b;
function evaluate(c){
 assert(c.transition);assert(c.frames.every(f=>f.ball&&f.players.length===22),'do not interpolate missing tracking');
 const t=c.team,first=c.frames[0],model=environment(),keeper=t?25:11;
 const initial=first.players.filter(p=>p[0]===t&&p[1]!==keeper);
 model.init(first.players.map(p=>oriented(p,t)),ball(first.ball,t));
 const frames=[{time:first.time,players:initial.map(p=>p.slice(1)),meanErrorM:0,stationaryErrorM:0}];
 let errorIntegral=0,stationaryIntegral=0;
 for(let i=1;i<c.frames.length;i++){
  const a=c.frames[i-1],b=c.frames[i],dt=b.time-a.time,steps=Math.ceil(dt*120),aa=a.players.map(p=>oriented(p,t)),bb=b.players.map(p=>oriented(p,t));
  assert(dt>0&&dt<=.201,'reject unobserved gaps');let predicted;
  for(let k=1;k<=steps;k++){
   const u=k/steps,ps=bb.map(p=>{const q=aa.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0],p[1],q[2]+(p[2]-q[2])*u,q[3]+(p[3]-q[3])*u];});
   const ab=ball(a.ball,t),zb=ball(b.ball,t);predicted=model.step(ps,[ab[0]+(zb[0]-ab[0])*u,ab[1]+(zb[1]-ab[1])*u],dt/steps);
  }
  let errors=0,stationary=0;
  const ps=predicted.map(([n,x,y])=>{
   const original=initial.find(p=>role(t,p[1])===n),actual=b.players.find(p=>p[0]===t&&p[1]===original[1]);
   const px=t?100-x:x,py=t?64-y:y;
   errors+=Math.hypot((px-actual[2])*1.05,(py-actual[3])*68/64);
   stationary+=Math.hypot((original[2]-actual[2])*1.05,(original[3]-actual[3])*68/64);
   return [original[1],px,py];
  });
  const f={time:b.time,players:ps,meanErrorM:errors/10,stationaryErrorM:stationary/10};frames.push(f);
  // Trapezoidal integration across original sample timestamps.
  errorIntegral+=(frames[i-1].meanErrorM+f.meanErrorM)*.5*dt;
  stationaryIntegral+=(frames[i-1].stationaryErrorM+f.stationaryErrorM)*.5*dt;
 }
 return {id:c.id,team:t,start:c.start,end:c.end,meanErrorM:errorIntegral/(c.end-c.start),stationaryErrorM:stationaryIntegral/(c.end-c.start),endpointErrorM:frames.at(-1).meanErrorM,assignments:model.assignments(),frames};
}
function run(){
 const clips=data.clips.filter(c=>c.transition).map(evaluate);
 const priorPath=path.join(root,'data/defense-baseline-v019.json');
 if(!process.env.FASE_ENGINE_SOURCE&&fs.existsSync(priorPath)){const prior=JSON.parse(fs.readFileSync(priorPath,'utf8'));for(const c of clips){const b=prior.clips.find(b=>b.id===c.id);if(b){c.previousEngineVersion=prior.engineVersion;c.previousAssignments=b.assignments;c.previousMeanErrorM=b.meanErrorM;c.improvementPercent=100*(b.meanErrorM-c.meanErrorM)/b.meanErrorM;}}}
 const report={schemaVersion:1,engineVersion,source:data.source,method:'All 10 outfield defenders simulated from observed starting positions. Observed ball, attackers and goalkeeper prescribed. Fixed steps <=1/120 s with linear interpolation only between complete samples. No fitted parameters.',limitations:['Four selected five-second windows from one match; transition-roles-check evaluated after the role rule was fixed, not used to choose it; neither free-play nor population validation','Roles are approximated from shirt numbers; speed, body orientation and intention are not measured','Position error is a trajectory discrepancy, not a tactical success score','Stationary reference keeps every defender at the initial position; it is a simple error baseline, not a tactical alternative'],clips};
 fs.writeFileSync(process.env.FASE_DEFENSE_OUT||path.join(root,'data/defense-validation.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(clips.map(({frames,...c})=>c)));return report;
}
if(require.main===module)run();module.exports={evaluate,run};
