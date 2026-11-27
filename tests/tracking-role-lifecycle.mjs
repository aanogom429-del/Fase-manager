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
 const probe="\nreturn {step:()=>{update(1/120);ftObserve()},enterFreeMode,playChoice,startSituation,enterDecisionMode, resetKickoff, snapshot:()=>JSON.stringify({elapsed,owner:owner?.id??null,bx,by,ballHeight,score,passes,shots,turnovers,stage,players:players.map(({el,...p})=>p)}), state:()=>({elapsed,live:!restart&&!matchStopped&&!!owner&&!flight,owner:owner?.t??null,carrier:owner?.id??null,ball:[bx,by,ballHeight],players:activePlayers().map(p=>({id:p.id,t:p.t,x:p.x,y:p.y,speed:p.speed,acc:p.acceleration,brake:p.braking})),score:[...score],passes,shots,turnovers}),profile:(v,a,b)=>{for(const p of players){p.speed=Math.min(p.speed,v/(68/64));p.acceleration=Math.min(p.acceleration,a/(68/64));p.braking=Math.min(p.braking,b/(68/64))}}, shadow:()=>ftShadow.report(),hybrid:()=>({active:ftHybrid,support:ftSupportCount,phase:ftPhaseAudit,roles:ftRoleMode,collective:ftCollectiveMode,coord:{...ftCollectiveStats}}),startHybrid:ftStartHybrid};\n";
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




function lifecycle(script){
 const {api,get}=boot(script,{seed:22,blue:'4-3-3',red:'4-3-3',active:false,roles:true});
 const a=api.state().players.map(p=>({id:p.id,speed:p.speed,acc:p.acc,brake:p.brake}));
 const keeper=a[0];if(!(keeper.speed<5&&keeper.acc<4&&keeper.brake<5))throw Error("keeper caps not applied");
 const select=get('system-blue');select.value='3-5-2';select.onchange({target:select});
 const b=api.state().players.map(p=>({id:p.id,speed:p.speed,acc:p.acc,brake:p.brake}));
 if(JSON.stringify(a)===JSON.stringify(b))throw Error("formation role update absent");
 api.startSituation();const c=api.state().players;
 if(api.hybrid().active||!c.every(p=>p.acc>=18&&p.brake>=28))throw Error("rollback failure");
 if(get('ft-collective').onclick!==null)throw Error("unvalidated collective option enabled");
 return {role_caps:true,formation_role_update:true,restore_original:true,collective_disabled:true};
}

console.log(lifecycle(readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1]));
