// Controlled accompaniment benchmark: observed ball, opposition and on-ball actors
// are imposed. Only players without a recorded intervention move under the engine.
// This is not a free-match or causal validation. The later reserved clip is never fitted.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const dataset=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace('startSituation();requestAnimationFrame(frame);',
 `globalThis.replay={
 init:(positions,ballPoint,gain)=>{
  movementModel.followGain=gain;guided=true;selected={x:ballPoint[0],y:ballPoint[1]};elapsed=0;loose=false;techAction=null;
  for(const q of positions){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);p.x=p.hx=p.sx=q[2];p.y=p.hy=p.sy=q[3];delete p.intentAt;}
  bx=ballPoint[0];by=ballPoint[1];
 },
 step:(positions,ballPoint,freeIds,dt)=>{
  for(const q of positions){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);if(p.t!==0||!freeIds.includes(p.n)){p.x=q[2];p.y=q[3];}}
  bx=ballPoint[0];by=ballPoint[1];owner=null;flight={t:0,target:null};elapsed+=dt;
  movement(dt);
  return players.filter(p=>p.t===0&&freeIds.includes(p.n)).map(p=>[p.n,p.x,p.y]);
 }
};`);
function environment(){
 const nodes={};class E{constructor(){this.style={};this.dataset={};this.children=[];}setAttribute(){}append(...x){this.children.push(...x);}appendChild(x){this.append(x);}replaceChildren(...x){this.children=x;}querySelectorAll(){return this.children;}insertAdjacentElement(){}insertAdjacentHTML(){}}
 const c={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},console,requestAnimationFrame:()=>{}};
 vm.createContext(c);vm.runInContext(script,c);return c.replay;
}
function orient(p,team){
 const t=p[0]===team?0:1,n=p[0]===0?(p[1]===11?1:p[1]+1):(p[1]===25?1:p[1]-13);
 return [t,n,team?100-p[2]:p[2],team?64-p[3]:p[3]];
}
function orientBall(p,team){return team?[100-p[0],64-p[1]]:p;}
function evaluate(clip,gain){
 const frames=clip.frames,team=clip.team,first=frames[0],last=frames.at(-1);
 const ids=clip.summary.movements.filter(m=>m.noRecordedTouch).map(m=>orient([team,m.player,0,0],team)[1]);
 if(frames.some(f=>!f.ball||f.players.length!==22))return {id:clip.id,excluded:'Incomplete tracking; no interpolation across gaps'};
 const model=environment(),start=first.players.map(p=>orient(p,team));
 model.init(start,orientBall(first.ball,team),gain);
 let errors=[],endpoint=[];
 for(let i=1;i<frames.length;i++){
  const a=frames[i-1],b=frames[i],pa=a.players.map(p=>orient(p,team)),pb=b.players.map(p=>orient(p,team));
  const dt=b.time-a.time,steps=Math.ceil(dt/(1/120));
  let predicted;
  for(let k=1;k<=steps;k++){
   const u=k/steps,positions=pb.map(p=>{const q=pa.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0],p[1],q[2]+(p[2]-q[2])*u,q[3]+(p[3]-q[3])*u];});
   const ab=orientBall(a.ball,team),bb=orientBall(b.ball,team),ball=[ab[0]+(bb[0]-ab[0])*u,ab[1]+(bb[1]-ab[1])*u];
   predicted=model.step(positions,ball,ids,dt/steps);
  }
  for(const [n,x,y] of predicted){
   const q=pb.find(p=>p[0]===0&&p[1]===n);
   const error=Math.hypot((x-q[2])*1.05,(y-q[3])*68/64);
   errors.push({error,weight:dt});
   if(i===frames.length-1)endpoint.push({playerRole:n,errorM:error,forwardErrorM:Math.abs(x-q[2])*1.05});
  }
 }
 const weight=errors.reduce((sum,p)=>sum+p.weight,0);
 return {id:clip.id,players:ids.length,positionMAEM:errors.reduce((sum,p)=>sum+p.error*p.weight,0)/weight,
  endpointMAEM:endpoint.reduce((s,p)=>s+p.errorM,0)/endpoint.length,
  forwardMAEM:endpoint.reduce((s,p)=>s+p.forwardErrorM,0)/endpoint.length};
}
function mean(rows,key){return rows.reduce((s,r)=>s+r[key],0)/rows.length;}
function run(){
 const development=dataset.clips.filter(c=>['away-progress','home-progress'].includes(c.id));
 const gains=[.35,.5,.65,.8,1,1.2,1.4];
 const candidates=gains.map(gain=>{const results=development.map(c=>evaluate(c,gain));return {gain,meanPositionMAEM:mean(results,'positionMAEM'),results};});
 const baseline=candidates.find(c=>c.gain===.65);
 const best=[...candidates].sort((a,b)=>a.meanPositionMAEM-b.meanPositionMAEM)[0];
 const reserved=dataset.clips.find(c=>c.reserved);
 const report={schemaVersion:1,baselineGain:.65,selectedGain:best.gain,selectionMetric:'Equal-weight mean of per-clip time-weighted positional error (metres), on two development clips only',
  limitations:['Four selected clips from one anonymized match; no population validity','Controlled replay imposes observed ball, opponents and players with recorded touches','Jersey-to-role mapping is a provisional lineup approximation','Continuous forcing interpolates between valid observed samples; no interpolation across missing data','Incomplete circulation/loss clip excluded from fitting and trajectory benchmark','No free-match realism or learning claim'],
  candidates,developmentImprovementPercent:100*(baseline.meanPositionMAEM-best.meanPositionMAEM)/baseline.meanPositionMAEM,
  contrast:{baseline:evaluate(reserved,.65),adjusted:evaluate(reserved,best.gain)}};
 fs.writeFileSync(path.join(root,'data/movement-validation.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report));
 return report;
}
if(require.main===module)run();
module.exports={evaluate,run};
