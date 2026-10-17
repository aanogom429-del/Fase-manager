// Fixed-window external-match contrast. No fitting and no inferred off-ball orders.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const engineVersion=html.match(/FASE MANAGER · ([0-9.]+)/)[1];
const data=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
const definitions=[{id:'game2-throw',start:28.28,end:32.32,attacking:true},{id:'game2-corner',start:420.24,end:424.32,attacking:false}];
function environment(){
 const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace('startSituation();requestAnimationFrame(frame);',`globalThis.replay={
 init:(ps,point,attacking)=>{guided=true;selected=null;elapsed=0;owner=null;loose=false;techAction=null;flight={t:attacking?0:1,target:null};bx=point[0];by=point[1];
 for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);p.x=p.hx=p.sx=q[2];p.y=p.hy=p.sy=q[3];p.attackOrigin={x:p.x,y:p.y,bx:point[0],by:point[1]};delete p.intentAt;delete p.defOrigin;delete p.defDuty;}},
 step:(ps,point,ids,dt)=>{for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);if(p.t!==0||!ids.includes(p.n)){p.x=q[2];p.y=q[3];}}
 bx=point[0];by=point[1];elapsed+=dt;movement(dt);return players.filter(p=>p.t===0&&ids.includes(p.n)).map(p=>[p.n,p.x,p.y]);}
 };`);
 const nodes={};class E{constructor(){this.style={};this.dataset={};this.children=[];}setAttribute(){}append(...v){this.children.push(...v);}appendChild(v){this.append(v);}replaceChildren(...v){this.children=v;}querySelectorAll(){return this.children;}insertAdjacentElement(){}insertAdjacentHTML(){}}
 const c={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},console,requestAnimationFrame:()=>{}};
 vm.createContext(c);vm.runInContext(source,c);return c.replay;
}
function evaluate(clip,definition){
 const frames=clip.frames.filter(f=>f.time>=definition.start-.00001&&f.time<=definition.end+.00001);
 assert(frames.length>1);assert.equal(frames[0].time,definition.start);assert.equal(frames.at(-1).time,definition.end);
 const keepers=[11,25],rosters=[0,1].map(t=>frames[0].players.filter(p=>p[0]===t).map(p=>p[1]).sort((a,b)=>a-b));
 for(let t=0;t<2;t++){assert.equal(rosters[t].length,11);assert(rosters[t].includes(keepers[t]));}
 const roles=[0,1].map(t=>new Map([[keepers[t],1],...rosters[t].filter(n=>n!==keepers[t]).map((n,i)=>[n,i+2])]));
 for(let i=0;i<frames.length;i++){
  const f=frames[i];assert(f.ball&&f.ball.every(Number.isFinite),'missing ball');assert.equal(f.players.length,22);
  assert.equal(new Set(f.players.map(p=>p[0]+':'+p[1])).size,22,'duplicate identities');
  for(const p of f.players)assert(roles[p[0]].has(p[1])&&p.slice(2).every(Number.isFinite),'missing or changed identities');
  if(i)assert(f.time>frames[i-1].time&&f.time-frames[i-1].time<=.201,'tracking gap');
 }
 const team=clip.team,dir=team?-1:1;
 const orient=p=>[p[0]===team?0:1,roles[p[0]].get(p[1]),team?100-p[2]:p[2],team?64-p[3]:p[3]];
 const ball=b=>team?[100-b[0],64-b[1]]:b;
 // Conservative exclusion uses all recorded actors in the original ten-second clip.
 const touched=new Set(clip.events.filter(e=>e.team===team).flatMap(e=>[e.sender,e.receiver]).filter(n=>n!==null));
 const free=rosters[team].filter(n=>n!==keepers[team]&&(!definition.attacking||!touched.has(n)));
 assert(free.length>0);const ids=free.map(n=>roles[team].get(n)),initial=frames[0].players.map(orient),model=environment();
 model.init(initial,ball(frames[0].ball),definition.attacking);
 let integral=0,stationaryIntegral=0,prevError=0,prevStationary=0,predicted;
 for(let i=1;i<frames.length;i++){
  const a=frames[i-1],b=frames[i],dt=b.time-a.time,steps=Math.ceil(dt*120),aa=a.players.map(orient),bb=b.players.map(orient);
  for(let k=1;k<=steps;k++){
   const u=k/steps,ps=bb.map(p=>{const q=aa.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0],p[1],q[2]+(p[2]-q[2])*u,q[3]+(p[3]-q[3])*u];});
   const ab=ball(a.ball),zb=ball(b.ball);predicted=model.step(ps,[ab[0]+(zb[0]-ab[0])*u,ab[1]+(zb[1]-ab[1])*u],ids,dt/steps);
  }
  let error=0,stationary=0;
  for(const [n,x,y] of predicted){const q=bb.find(p=>p[0]===0&&p[1]===n),origin=initial.find(p=>p[0]===0&&p[1]===n);
   assert(Number.isFinite(x)&&Number.isFinite(y));error+=Math.hypot((x-q[2])*1.05,(y-q[3])*68/64);stationary+=Math.hypot((origin[2]-q[2])*1.05,(origin[3]-q[3])*68/64);}
  error/=ids.length;stationary/=ids.length;integral+=(prevError+error)*dt/2;stationaryIntegral+=(prevStationary+stationary)*dt/2;prevError=error;prevStationary=stationary;
 }
 let observedAdvanceM=0,simulatedAdvanceM=0;
 for(const n of free){const first=frames[0].players.find(p=>p[0]===team&&p[1]===n),last=frames.at(-1).players.find(p=>p[0]===team&&p[1]===n),sim=predicted.find(p=>p[0]===roles[team].get(n));
  observedAdvanceM+=(last[2]-first[2])*dir*1.05;simulatedAdvanceM+=(sim[1]-orient(first)[2])*1.05;}
 const duration=definition.end-definition.start;
 return {...definition,team,players:free.length,jerseys:free,samples:frames.length,originalSamples:clip.frames.length,
  roleMapping:[0,1].flatMap(t=>[...roles[t]].map(([jersey,role])=>({team:t,jersey,role}))),
  meanErrorM:integral/duration,stationaryErrorM:stationaryIntegral/duration,endpointErrorM:prevError,
  observedAdvanceM:observedAdvanceM/free.length,simulatedAdvanceM:simulatedAdvanceM/free.length};
}
function run(){const report={schemaVersion:1,engineVersion,match:'Metrica Sample Game 2',source:data.additionalSources[0].source,
 method:'Fixed complete subwindows; same initial positions, ball/opposition/keeper and recorded attackers prescribed; other players use the unchanged motor. <=1/120 s steps; trapezoidal time-weighted position error in source metres. No parameter search.',
 limitations:['Two selected subwindows, not a representative sample or free-match validation','Throw window starts at first complete sample and ends at the second pass reception; corner window starts at annotated rival recovery and ends at last complete sample before ball out','Ball-out flight is a defensive-response probe, not proven continuous rival possession','Stable roster mapping preserves identities; shirt ordering is only an approximate tactical-role assignment','No interpolation across missing samples; initial throw and later incomplete data excluded','Stationary reference is a diagnostic baseline, not a tactical recommendation','No explicit off-ball orders: does not validate the coordination added in 0.27'],
 baseline:JSON.parse(fs.readFileSync(path.join(root,'data/game2-baseline-v028.json'),'utf8')),
 firstMatchComparison:JSON.parse(fs.readFileSync(path.join(root,'data/attack-comparison.json'),'utf8')),
 clips:definitions.map(d=>evaluate(data.clips.find(c=>c.id===d.id),d))};
 fs.writeFileSync(path.join(root,'data/game2-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.clips.map(({roleMapping,...c})=>c)));return report;}
if(require.main===module)run();module.exports={evaluate,definitions};
