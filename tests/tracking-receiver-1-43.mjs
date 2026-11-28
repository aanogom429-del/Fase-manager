import {readFileSync} from 'node:fs';

function makeDOM(){
 const nodes=new Map();function el(tag='div'){return {tagName:tag.toUpperCase(),style:{},dataset:{},children:[],attributes:{},value:'',checked:false,hidden:false,open:false,disabled:false,textContent:'',innerHTML:'',className:'',
 setAttribute(k,v){this.attributes[k]=String(v)},getAttribute(k){return this.attributes[k]??null},removeAttribute(k){delete this.attributes[k]},appendChild(c){this.children.push(c);return c},append(...c){this.children.push(...c)},replaceChildren(...c){this.children=[...c]},insertAdjacentElement(w,c){this.children.push(c);return c},insertAdjacentHTML(){},querySelectorAll(q){return q==='button'?this.children.filter(x=>x?.tagName==='BUTTON'):[]},querySelector(){return null},addEventListener(){},remove(){},classList:{add(){},remove(){},toggle(){},contains(){return false}},click(){this.onclick?.({target:this})}}}
 const get=id=>{if(!nodes.has(id)){const e=el();e.id=id;e.value=id==='speed'||id==='saved-slot'?'1':id==='technique'?'pass':'';nodes.set(id,e)}return nodes.get(id)};
 return {getElementById:get,createElement:el,createElementNS:(_,t)=>el(t),head:el('head'),body:el('body'),querySelectorAll:()=>[]};
}
function boot(script,config){
 const dom=makeDOM(),get=dom.getElementById;let seed=config.seed;
 const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const pos=script.lastIndexOf("})();");
 const probe="\nreturn {step:()=>{update(1/120);ftObserve()},enterFreeMode,playChoice,startSituation,enterDecisionMode, resetKickoff, snapshot:()=>JSON.stringify({elapsed,owner:owner?.id??null,bx,by,ballHeight,score,passes,shots,turnovers,stage,players:players.map(({el,...p})=>p)}), state:()=>({elapsed,live:!restart&&!matchStopped&&!!owner&&!flight,owner:owner?.t??null,carrier:owner?.id??null,ball:[bx,by,ballHeight],players:activePlayers().map(p=>({id:p.id,t:p.t,x:p.x,y:p.y,speed:p.speed,acc:p.acceleration,brake:p.braking})),score:[...score],passes,shots,turnovers}),profile:(v,a,b)=>{for(const p of players){p.speed=Math.min(p.speed,v/(68/64));p.acceleration=Math.min(p.acceleration,a/(68/64));p.braking=Math.min(p.braking,b/(68/64))}}, shadow:()=>ftShadow.report(),hybrid:()=>({active:ftHybrid,support:ftSupportCount,phase:ftPhaseAudit,roles:ftRoleMode,collective:ftCollectiveMode,coord:{...ftCollectiveStats}}),startHybrid:ftStartHybrid,ball:()=>ftBall.report(),ballUnit:()=>ftBall,access:()=>ftAccess.report(),accessUnit:()=>ftAccess,search:ftSearchIntercept,accessArrival:arrivalTime,receiver:()=>ftReceiver.report(),receiverUnit:()=>ftReceiver,receiverCandidates:ftReceiverCandidates};\n";
 const api=new Function("document","requestAnimationFrame","Math","localStorage","return "+(script.slice(0,pos)+probe+script.slice(pos)).trimStart())(dom,()=>0,math,{getItem:()=>null,setItem:()=>{}});
 get('ft-enabled').checked=true;get('ft-enabled').onchange();
 if(config.active!==undefined)api.startHybrid(config.active,!!config.roles,!!config.collective);else api.enterFreeMode();for(const [id,val] of [['system-blue',config.blue],['system-red',config.red]]){const e=get(id);e.value=val;e.onchange({target:e})}
 return {api,get};
}
const pct=(a,q)=>{if(!a.length)return null;const s=a.slice().sort((a,b)=>a-b),i=(s.length-1)*q,j=Math.floor(i);return s[j]+(s[Math.min(j+1,s.length-1)]-s[j])*(i-j)};
function evaluate(script,config,cap,secs=15){
 const {api,get}=boot(script,config);if(cap)api.profile(...cap);
 let prior=null,vel=null;const metrics={speed:[],acceleration:[],speed_gain:[],braking:[],width_possession:[],depth_possession:[],width_defense:[],depth_defense:[],dist_ball:[]};
 let total=0,valid=0;
 for(let k=1;k<=secs*120;k++){
  api.step();if(k%24)continue;total++;
  const f=api.state(),ok=f.live&&f.ball[2]<=1.5&&[0,1].includes(f.owner);
  if(!ok){prior=null;vel=null;continue;}
  valid++;const cur=new Map(f.players.map(p=>[p.id,[p.x*1.05,p.y*(68/64),p.t]])),next=new Map();
  for(const [id,p] of cur){
   metrics.dist_ball.push(Math.hypot(p[0]-f.ball[0]*1.05,p[1]-f.ball[1]*(68/64)));
   const q=prior?.get(id);if(!q)continue;const v=[(p[0]-q[0])/.2,(p[1]-q[1])/.2],s=Math.hypot(...v);if(s>12)continue;
   metrics.speed.push(s);next.set(id,v);const old=vel?.get(id);if(!old)continue;
   metrics.acceleration.push(Math.hypot(v[0]-old[0],v[1]-old[1])/.2);const delta=(s-Math.hypot(...old))/.2;if(delta>0)metrics.speed_gain.push(delta);if(delta<0)metrics.braking.push(-delta);
  }
  for(const t of [0,1]){const arr=[...cur.values()].filter(p=>p[2]===t);if(arr.length<9)continue;const suffix=t===f.owner?'possession':'defense';metrics['width_'+suffix].push(Math.max(...arr.map(p=>p[1]))-Math.min(...arr.map(p=>p[1])));metrics['depth_'+suffix].push(Math.max(...arr.map(p=>p[0]))-Math.min(...arr.map(p=>p[0])))}
  prior=cur;vel=next;
 }
 const summary=Object.fromEntries(Object.entries(metrics).map(([k,a])=>[k,{n:a.length,p50:pct(a,.5),p90:pct(a,.9),p95:pct(a,.95),p99:pct(a,.99)}]));
 const state=api.state(),s=api.shadow().stats;
 const hy=api.hybrid();api.startSituation();const restored=api.state().players.every(p=>p.acc>=18&&p.brake>=28)&&!api.hybrid().active;
 return {hybrid:hy,restored,summary,metrics,total,valid,score:state.score,passes:state.passes,shots:state.shots,turnovers:state.turnovers,shadow:{n:s.players,ridge:s.players?s.sumRidge/s.players:null,velocity:s.players?s.sumVelocity/s.players:null,errors:s.errors},finite:state.players.every(p=>[p.x,p.y].every(Number.isFinite)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=64)};
}
const real={speed:[2.1506,4.5511,5.3465,6.8425],acceleration:[1.0607,3.0208,3.9528,6],speed_gain:[.554,1.8924,2.5059,4.0081],braking:[.5355,1.9469,2.7353,4.6684],width_possession:[48.9,62.67,64.63,66.5],depth_possession:[52.67,64.26,68.47,76.3829],width_defense:[37.71,45.54,47.69,53.2929],depth_defense:[53.28,67.86,72.21,78.4029],dist_ball:[25.0941,46.8876,52.8894,68.1832]};
function loss(s,keys){let a=[];for(const k of keys)for(const [i,q] of [50,90,95,99].entries()){const x=s[k]['p'+q],r=real[k][i];if(x===null)return Infinity;a.push(Math.abs(Math.log((x+.1)/(r+.1))))}return a.reduce((a,b)=>a+b,0)/a.length}
function combine(rows){const summary={};for(const k of Object.keys(real)){const arr=rows.flatMap(r=>r.metrics[k]);summary[k]={n:arr.length,p50:pct(arr,.5),p90:pct(arr,.9),p95:pct(arr,.95),p99:pct(arr,.99)}}return {summary,kinematicLoss:loss(summary,['speed','acceleration','speed_gain','braking']),spatialLoss:loss(summary,['width_possession','depth_possession','width_defense','depth_defense','dist_ball']),runs:rows.map(({metrics,...r})=>r)}}






function receiverUnit(script){
 const {api}=boot(script,{seed:2,blue:'4-3-3',red:'4-3-3'});
 const p={id:99,t:0,x:30,y:32,bodyAngle:0,vx:0,vy:0,speed:8,acceleration:5,braking:6,turnRate:3,reactionDelay:0,cool:0};
 const m=(id,x,y,extra={})=>{const a={...p,id,n:id,x,y,...extra};return {...a,actual:a,memoryAge:0};};
 const a=m(1,45,32),b=m(2,30,45),c=m(3,25,47),hidden=m(4,15,32),stale={...m(5,40,40),memoryAge:.2},off=m(6,80,32);
 const view={rivals:[{id:40,x:60,y:30,radius:0},{id:41,x:65,y:35,radius:0}],uncertainty:.2};
 const before=JSON.stringify([p,a,b,c,hidden,stale,off,view]);
 const rows=api.receiverCandidates(p,[a,b,c,hidden,stale,off],view);
 if(rows.length!==3||!['security','continuity','progression'].every(k=>rows.some(q=>q.intent===k)))throw Error('roles or visibility '+JSON.stringify(rows));
 if(JSON.stringify([p,a,b,c,hidden,stale,off,view])!==before)throw Error('input mutation');
 const clean=api.receiverCandidates(p,[a],view)[0];
 const blocked=api.receiverCandidates(p,[a],{rivals:[{id:7,x:37,y:32,radius:0}],uncertainty:.2})[0];
 if(blocked.risk<=clean.risk||blocked.margin>=clean.margin||blocked.enhanced>=clean.enhanced)throw Error('blocked lane');
 const red={...p,t:1,x:70,bodyAngle:Math.PI},redMate={...a,t:1,x:55,actual:{...a.actual,t:1,x:55}};
 if(api.receiverCandidates(red,[redMate],{rivals:[],uncertainty:.2})[0].intent!=='progression')throw Error('direction');
 const moving=m(8,45,40,{vx:4,vy:0});const motion=api.receiverCandidates(p,[moving],{rivals:[],uncertainty:.1})[0];
 if(!motion.lead||motion.x<=moving.x)throw Error('visible lead');
 const mon=api.receiverUnit();mon.setEnabled(true);
 const rank={chosen:clean,ranks:{nearest:[clean],base:[clean],enhanced:[clean]}};
 const f={t:0,target:a.actual,kind:'pass'};mon.launch(f,rank);mon.tick(f);mon.contact(f,a.actual);
 if(mon.report().stats.intended!==1||mon.report().stats.models.enhanced.top1!==1)throw Error('success recording');
 const f2={...f,loft:3};mon.launch(f2,rank);mon.tick(f2);mon.contact(f2,a.actual);if(mon.report().stats.contacts!==1||mon.report().stats.excluded!==1)throw Error('aerial exclusion');
 mon.launch({...f},rank);mon.tick(null);if(mon.report().stats.censored!==1)throw Error('censor');
 mon.setEnabled(false);mon.launch(f,rank);mon.contact(f,a.actual);if(mon.report().stats.contacts)throw Error('disabled');
 return {three_geometric_roles:true,hidden_stale_offside_exclusion:true,input_immutable:true,blocked_lane:true,red_direction:true,visible_lead:true,contact:true,aerial_exclusion:true,censor:true,disabled:true};
}
function receiverExperiment(script){
 const cases=[{seed:1801,blue:'4-3-3',red:'3-4-3'},{seed:1901,blue:'4-2-3-1',red:'4-4-2'},{seed:2003,blue:'3-5-2',red:'4-3-3'}],runs=[];
 for(const [mode,opt] of Object.entries({original:{},calibrated:{active:false},roles:{active:false,roles:true}})){
  for(const c of cases){
   const {api}=boot(script,{...c,...opt});for(let k=0;k<30*120;k++)api.step();
   const q=api.receiver();if(q.stats.errors||q.stats.contacts!==q.stats.intended+q.stats.teammateOther+q.stats.rival)throw Error('receiver accounting '+JSON.stringify(q.stats));
   runs.push({mode,seed:c.seed,stats:q.stats,pending:q.pending,passes:api.state().passes,shots:api.state().shots});
  }
 }
 return runs;
}

const script=readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];console.log(JSON.stringify({unit:receiverUnit(script),runs:receiverExperiment(script)},null,2));