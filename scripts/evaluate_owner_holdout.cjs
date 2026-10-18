// Owner inferred from adjacent recorded passes; all 25 Hz samples must pass integrity checks.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),plan=require('../data/owner-holdout-plan.json');
const sources={before:fs.readFileSync(path.join(root,'tests/fixtures/engine-v034.html'),'utf8'),after:fs.readFileSync(path.join(root,'index.html'),'utf8')};
const metres=(a,b)=>Math.hypot((a[0]-b[0])*1.05,(a[1]-b[1])*68/64);
function validate(c){
 assert(c.team===0||c.team===1,'invalid team');assert(Number.isInteger(c.holder),'missing holder identity');
 assert(c.events&&c.events.length===2,'missing possession events');
 const [received,passed]=c.events;
 assert(received.type==='PASS'&&passed.type==='PASS'&&received.period===1&&passed.period===1&&received.team===c.team&&passed.team===c.team,'incompatible possession events');
 assert(received.receiver===c.holder&&passed.sender===c.holder&&received.end===c.start&&passed.start===c.end,'holder not supported by events');
 assert(c.frames.length>=2,'insufficient samples');assert.equal(c.frames[0].time,c.start);assert.equal(c.frames.at(-1).time,c.end);
 const keys=c.frames[0].players.map(p=>p[0]+':'+p[1]).sort();let maxGap=0;
 for(let i=0;i<c.frames.length;i++){
  const f=c.frames[i];assert(f.synchronized,'unsynchronized frame');assert(f.ball&&f.ball.length===2&&f.ball.every(Number.isFinite),'missing ball');
  assert(f.ball[0]>=0&&f.ball[0]<=100&&f.ball[1]>=0&&f.ball[1]<=64,'ball out of field');
  assert.equal(f.players.length,22,'incomplete roster');assert.equal(new Set(f.players.map(p=>p[0]+':'+p[1])).size,22,'duplicate identity');
  for(const t of [0,1]){assert.equal(f.players.filter(p=>p[0]===t).length,11);assert(f.players.some(p=>p[0]===t&&p[1]===[11,25][t]),'missing keeper');}
  assert.deepEqual(f.players.map(p=>p[0]+':'+p[1]).sort(),keys,'changed identity');
  assert(f.players.every(p=>p.length===4&&p.every(Number.isFinite)&&p[2]>=0&&p[2]<=100&&p[3]>=0&&p[3]<=64),'invalid player coordinates');
  if(i)assert(Math.abs(f.time-c.frames[i-1].time-1/25)<1e-8,'tracking gap');
  const holder=f.players.find(p=>p[0]===c.team&&p[1]===c.holder);assert(holder,'holder absent');
  maxGap=Math.max(maxGap,metres(holder.slice(2),f.ball));
 }
 assert(maxGap<=plan.protocol.maximumHolderBallDistanceM,'holder-ball distance exceeds frozen control threshold: '+maxGap.toFixed(4)+' m');
 return {maximumHolderBallDistanceM:maxGap};
}
function environment(html){
 const entry='startSituation();requestAnimationFrame(frame);';assert(html.includes(entry));
 const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(entry,`globalThis.replay={
 init:(ps,ball,holder)=>{guided=true;selected=null;elapsed=0;flight=null;loose=false;techAction=null;setDestinationTrace(true);
  for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);p.x=p.hx=p.sx=q[2];p.y=p.hy=p.sy=q[3];p.attackOrigin={x:p.x,y:p.y,bx:ball[0],by:ball[1]};delete p.intentAt;delete p.attackSupport;delete p.driveX;delete p.driveY;}
  owner=players.find(p=>p.t===0&&p.n===holder);bx=ball[0];by=ball[1];},
 step:(ps,ball,ids,dt)=>{for(const q of ps){const p=players.find(p=>p.t===q[0]&&p.n===q[1]);if(p.t!==0||!ids.includes(p.n)){p.x=q[2];p.y=q[3];}}
  bx=ball[0];by=ball[1];elapsed+=dt;
  const before=new Map(players.filter(p=>p.t===0&&ids.includes(p.n)).map(p=>[p.n,p.x]));movement(dt);
  const free=players.filter(p=>p.t===0&&ids.includes(p.n));return {positions:free.map(p=>[p.n,p.x,p.y]),
   backward:free.reduce((sum,p)=>sum+Math.max(0,before.get(p.n)-p.x)*1.05,0),
   active:[...destinationTrace.values()].some(r=>r.steps.some(s=>s.stage==='Conservar pareja conectada'))};}
 };`);
 class E{constructor(){this.style={};this.dataset={};this.children=[];}setAttribute(){}append(...v){this.children.push(...v);}appendChild(v){this.append(v);}replaceChildren(...v){this.children=v;}querySelectorAll(){return this.children;}insertAdjacentElement(){}insertAdjacentHTML(){}}
 const nodes={},context={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},console,requestAnimationFrame:()=>{}};
 vm.createContext(context);vm.runInContext(source,context);return context.replay;
}
function evaluate(c,html=sources.after){
 const integrity=validate(c),keepers=[11,25];
 const rosters=[0,1].map(t=>c.frames[0].players.filter(p=>p[0]===t).map(p=>p[1]).sort((a,b)=>a-b));
 const roles=rosters.map((roster,t)=>new Map([[keepers[t],1],...roster.filter(n=>n!==keepers[t]).map((n,i)=>[n,i+2])]));
 const orient=p=>[p[0]===c.team?0:1,roles[p[0]].get(p[1]),c.team?100-p[2]:p[2],c.team?64-p[3]:p[3]];
 const ball=p=>c.team?[100-p[0],64-p[1]]:p;
 const free=rosters[c.team].filter(n=>n!==keepers[c.team]&&n!==c.holder),ids=free.map(n=>roles[c.team].get(n));
 const initial=c.frames[0].players.map(orient),model=environment(html);model.init(initial,ball(c.frames[0].ball),roles[c.team].get(c.holder));
 let error=0,stationary=0,prev=0,prevStationary=0,activationSteps=0,totalSteps=0,backward=0;
 for(let i=1;i<c.frames.length;i++){
  const a=c.frames[i-1],b=c.frames[i],dt=b.time-a.time,steps=Math.ceil(dt/plan.protocol.step),aa=a.players.map(orient),bb=b.players.map(orient);let result;
  for(let k=1;k<=steps;k++){
   const u=k/steps,ps=bb.map(p=>{const q=aa.find(q=>q[0]===p[0]&&q[1]===p[1]);return [p[0],p[1],q[2]+(p[2]-q[2])*u,q[3]+(p[3]-q[3])*u];}),ab=ball(a.ball),zb=ball(b.ball);
   result=model.step(ps,[ab[0]+(zb[0]-ab[0])*u,ab[1]+(zb[1]-ab[1])*u],ids,dt/steps);
   activationSteps+=Number(result.active);totalSteps++;backward+=result.backward;
  }
  let next=0,still=0;
  for(const [n,x,y] of result.positions){assert(Number.isFinite(x)&&Number.isFinite(y),'non-finite simulation');const actual=bb.find(p=>p[0]===0&&p[1]===n),origin=initial.find(p=>p[0]===0&&p[1]===n);next+=metres([x,y],actual.slice(2));still+=metres(origin.slice(2),actual.slice(2));}
  next/=ids.length;still/=ids.length;error+=(prev+next)*dt/2;stationary+=(prevStationary+still)*dt/2;prev=next;prevStationary=still;
 }
 return {...integrity,players:free.length,jerseys:free,roleMapping:roles.map(r=>Array.from(r)),meanErrorM:error/(c.end-c.start),stationaryErrorM:stationary/(c.end-c.start),activationSteps,totalSteps,backwardMPerPlayerSecond:backward/(free.length*(c.end-c.start))};
}
function run(){
 const data=require('../data/owner-holdout-windows.json');
 assert.deepEqual(data.clips.map(({id,team,holder,start,end})=>({id,team,holder,start,end})),plan.windows);
 const clips=data.clips.map(c=>{try{validate(c);}catch(e){return {id:c.id,excluded:true,reason:e.message};}
  const before=evaluate(c,sources.before),after=evaluate(c,sources.after);
  return {id:c.id,excluded:false,team:c.team,holder:c.holder,start:c.start,end:c.end,before,after,deltaErrorM:after.meanErrorM-before.meanErrorM,
   interpretation:after.activationSteps===0?'Rule not activated: cannot assess its effect':after.meanErrorM<before.meanErrorM?'Lower position error; not proof of tactical quality':after.meanErrorM>before.meanErrorM?'Higher position error: regression in this interval':'Equal position error despite activation'};});
 return {schemaVersion:1,engineVersion:'0.35',baselineVersion:'0.34',plan,source:data.source,sourceSha256:data.rawSha256,
  engineSha256:Object.fromEntries(Object.entries(sources).map(([k,v])=>[k,crypto.createHash('sha256').update(v).digest('hex')])),
  limitations:['Possession inferred from events and proximity, not verified continuous control','Same previously used match; new windows are not independent matches','Recorded holder/ball/opponents/keepers imposed, not free play','Jersey order approximates roles; orientation and individual traits unobserved','Positional error and backward distance do not establish tactical utility','No replacement, parameter fitting, or learning'],clips};
}
if(require.main===module){const report=run();fs.writeFileSync(path.join(root,'data/owner-holdout-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.clips));}
module.exports={validate,evaluate,run};
