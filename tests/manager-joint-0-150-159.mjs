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
 const probe="\nreturn {step:()=>{update(1/120);ftObserve()},enterFreeMode,playChoice,startSituation,enterDecisionMode, resetKickoff, snapshot:()=>JSON.stringify({elapsed,owner:owner?.id??null,bx,by,ballHeight,score,passes,shots,turnovers,stage,players:players.map(({el,...p})=>p)}), state:()=>({elapsed,live:!restart&&!matchStopped&&!!owner&&!flight,owner:owner?.t??null,carrier:owner?.id??null,ball:[bx,by,ballHeight],players:activePlayers().map(p=>({id:p.id,t:p.t,x:p.x,y:p.y,speed:p.speed,acc:p.acceleration,brake:p.braking})),score:[...score],passes,shots,turnovers}),profile:(v,a,b)=>{for(const p of players){p.speed=Math.min(p.speed,v/(68/64));p.acceleration=Math.min(p.acceleration,a/(68/64));p.braking=Math.min(p.braking,b/(68/64))}}, shadow:()=>ftShadow.report(),hybrid:()=>({active:ftHybrid,support:ftSupportCount,phase:ftPhaseAudit,roles:ftRoleMode,collective:ftCollectiveMode,coord:{...ftCollectiveStats}}),startHybrid:ftStartHybrid,ball:()=>ftBall.report(),ballUnit:()=>ftBall,access:()=>ftAccess.report(),accessUnit:()=>ftAccess,search:ftSearchIntercept,accessArrival:arrivalTime,receiver:()=>ftReceiver.report(),receiverUnit:()=>ftReceiver,receiverCandidates:ftReceiverCandidates,space:()=>ftSpace.report(),spaceMap:ftSpaceMap,spaceUnit:()=>ftSpace,localMargin:ftLocalMargin,spaceCandidate:ftSpatialCandidate,spaceChoices:()=>({...ftSpaceChoices}),policy:()=>({...ftPolicyStats,active:ftPolicyMode}),policySelect:ftPolicySelect,policyFeatures:ftPolicyFeatures,attack:()=>JSON.parse(JSON.stringify(ftAttackStats)),qualityShot:ftQualityShot,carryCandidate:ftCarryCandidate,phase:()=>JSON.parse(JSON.stringify(ftTemporalPhase)),pair:ftPairReading,neural:()=>({...ftNeuralStats,loaded:!!ftNeuralWeights}),loadNeural:ftLoadNeural,unloadNeural:ftUnloadNeural,predictNeural:neuralPredict,validateNeural:validateNeuralModel,width:()=>({...ftWidthStats,active:ftWidthMode}),widthSide:ftWidthSide,widthPenalty:ftWidthPenalty,joint:()=>JSON.parse(JSON.stringify(jmStats)),jointModes:()=>[...jmModes],depthCandidate:jmDepthCandidate,supportPair:jmSupportPair,complementCandidate:jmComplementCandidate,runCandidate:jmRunCandidate,lineCount:jmLineCount,fixCandidate:jmFixCandidate,boxCandidate:jmBoxCandidate,transitionCandidate:jmTransitionCandidate,causalIntercept:jmCausalIntercept,supportThreshold:jmSupportThreshold,jointOpen:jmOpen};\n";
 const api=new Function("document","requestAnimationFrame","Math","localStorage","return "+(script.slice(0,pos)+probe+script.slice(pos)).trimStart())(dom,()=>0,math,{getItem:()=>null,setItem:()=>{}});
 get('ft-enabled').checked=true;get('ft-enabled').onchange();
 if(config.active!==undefined)api.startHybrid(config.active,!!config.roles,!!config.collective,!!config.space,!!config.policy,config.attack||0,!!config.width,config.joint||[]);else api.enterFreeMode();for(const [id,val] of [['system-blue',config.blue],['system-red',config.red]]){const e=get(id);e.value=val;e.onchange({target:e})}
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
 const hy=api.hybrid(),sp=api.space(),choices=api.spaceChoices(),policy=api.policy(),receiver=api.receiver().stats,attack=api.attack(),width=api.width(),joint=api.joint();api.startSituation();const restored=api.state().players.every(p=>p.acc>=18&&p.brake>=28)&&!api.hybrid().active;
 return {joint,width,attack,policy,receiver,space:sp.stats,choices,hybrid:hy,restored,summary,metrics,total,valid,score:state.score,passes:state.passes,shots:state.shots,turnovers:state.turnovers,shadow:{n:s.players,ridge:s.players?s.sumRidge/s.players:null,velocity:s.players?s.sumVelocity/s.players:null,errors:s.errors},finite:state.players.every(p=>[p.x,p.y].every(Number.isFinite)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=64)};
}
const real={speed:[2.1506,4.5511,5.3465,6.8425],acceleration:[1.0607,3.0208,3.9528,6],speed_gain:[.554,1.8924,2.5059,4.0081],braking:[.5355,1.9469,2.7353,4.6684],width_possession:[48.9,62.67,64.63,66.5],depth_possession:[52.67,64.26,68.47,76.3829],width_defense:[37.71,45.54,47.69,53.2929],depth_defense:[53.28,67.86,72.21,78.4029],dist_ball:[25.0941,46.8876,52.8894,68.1832]};
function loss(s,keys){let a=[];for(const k of keys)for(const [i,q] of [50,90,95,99].entries()){const x=s[k]['p'+q],r=real[k][i];if(x===null)return Infinity;a.push(Math.abs(Math.log((x+.1)/(r+.1))))}return a.reduce((a,b)=>a+b,0)/a.length}
function combine(rows){const summary={};for(const k of Object.keys(real)){const arr=rows.flatMap(r=>r.metrics[k]);summary[k]={n:arr.length,p50:pct(arr,.5),p90:pct(arr,.9),p95:pct(arr,.95),p99:pct(arr,.99)}}return {summary,kinematicLoss:loss(summary,['speed','acceleration','speed_gain','braking']),spatialLoss:loss(summary,['width_possession','depth_possession','width_defense','depth_defense','dist_ball']),runs:rows.map(({metrics,...r})=>r)}}













function jointUnit(script){
 const {api}=boot(script,{seed:3901,blue:'4-3-3',red:'4-2-3-1'});
 const p={id:99,t:0,x:50,y:32,bodyAngle:0,vx:0,vy:0,speed:8,acceleration:5,braking:6,turnRate:3,reactionDelay:0,cool:0,role:'midfielder',formation:'4-3-3'};
 const ball={x:40,y:32},base={x:51,y:26},view={rivals:[{id:88,x:70,y:50,radius:0}],uncertainty:.1};
 const checks={};
 function ok(v,b){if(!b)throw Error('fixture '+v);checks[v]=true;}
 ok(150,api.depthCandidate(p,base,ball,[{x:52,y:30}])?.x===55&&!api.depthCandidate({...p,role:'centreBack'},base,ball,[{x:52,y:30}]));
 const pair=api.supportPair({...ball,t:0},[{x:36,y:23},{x:41,y:41}]);
 ok(151,pair?.[0].x===32&&pair[1].x===45&&!api.supportPair({...ball,t:0},[{x:32,y:23},{x:45,y:41}]));
 ok(152,api.complementCandidate(p,base,ball,[{x:50,y:8}])?.y===29&&!api.complementCandidate(p,base,ball,[]));
 const forward={...p,role:'striker'},m={id:1,x:44,y:35,memoryAge:0};
 ok(153,api.runCandidate(forward,base,ball,view,[m])?.x===54&&!api.runCandidate(forward,base,ball,view,[]));
 ok(154,api.lineCount({...p,x:40},{x:65,y:32},{rivals:[{x:47,y:35,radius:0},{x:48,y:35,radius:0},{x:57,y:33,radius:0}]})===2&&api.lineCount({...p,x:40},{x:35,y:32},view)===0);
 ok(155,api.fixCandidate({...forward,x:55},{x:50,y:32},ball,{rivals:[{x:58,y:32,radius:0}]})?.x===53&&!api.fixCandidate(forward,{x:49,y:32},ball,view));
 ok(156,!!api.boxCandidate(forward,{x:86,y:32},{x:76,y:32},[{x:85,y:33}])&&!api.boxCandidate(forward,{x:86,y:32},ball,[{x:85,y:33}]));
 const defender={...p,x:25,y:22},db={x:30,y:23};
 ok(157,api.transitionCandidate(defender,db,{x:50,y:32},view,3,'c')?.y===25&&!api.transitionCandidate({...defender,markId:7},db,{x:50,y:32},view,3,'c'));
 const h=[{x:49,y:32,tick:0},{x:49.5,y:32,tick:6},{x:50,y:32,tick:12}];
 ok(158,!!api.causalIntercept(p,h,{x:50,y:32})&&!api.causalIntercept(p,h.slice(1),{x:50,y:32}));
 ok(159,api.supportThreshold(2,p,'a')===3.25&&api.supportThreshold(2,p,'c')===2&&api.supportThreshold(2,null,'a')===2);
 const before=JSON.stringify([p,base,ball,view]);
 const q={x:52,y:26};api.jointOpen(p,q,base,ball,view,[],[],{line:80});
 if(api.jointOpen(p,q,base,ball,{rivals:[],uncertainty:1},[],[],{line:80})||api.jointOpen(p,q,base,ball,view,[],[],{line:50})||before!==JSON.stringify([p,base,ball,view]))throw Error('common guards');
 api.startHybrid(false,false,false,false,false,0,false,[150,151]);if(api.jointModes().length!==2)throw Error('mode start');api.startSituation();if(api.jointModes().length)throw Error('mode reset');
 return {checks,unknown_opposition:true,offside_bound:true,immutable:true,mode_reset:true};
}
const cases=[{seed:3901,blue:'4-3-3',red:'4-2-3-1'},{seed:4007,blue:'4-4-2',red:'3-5-2'},{seed:4111,blue:'3-4-3',red:'4-3-3'}];
function jointRun(script,i,group='all'){
 const modes=group==='attack'?[150,151,152,153,154,155,156]:group==='defense'?[157,158,159]:Array.from({length:10},(_,i)=>i+150);
 return [[],modes].map(joint=>{const row=evaluate(script,{...cases[i],active:false,joint},null,15);const {metrics,...r}=row;return {mode:joint.length?group:'baseline',seed:cases[i].seed,...r,kin:loss(r.summary,['speed','acceleration','speed_gain','braking']),spatial:loss(r.summary,['width_possession','depth_possession','width_defense','depth_defense','dist_ball'])};});
}

const script=readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];console.log(JSON.stringify({unit:jointUnit(script),runs:jointRun(script,Number(process.argv[2]||0),process.argv[3]||'all')},null,2));