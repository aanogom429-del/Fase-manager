// Run from repo root: node tests/tracking-shadow.mjs
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

function runTests(baseHtml,branchHtml){
 function makeDOM(){
  const nodes=new Map();
  function el(tag='div'){return {tagName:tag.toUpperCase(),style:{},dataset:{},children:[],attributes:{},value:'',checked:false,hidden:false,open:false,disabled:false,textContent:'',innerHTML:'',className:'',
   setAttribute(k,v){this.attributes[k]=String(v)},getAttribute(k){return this.attributes[k]??null},removeAttribute(k){delete this.attributes[k]},
   appendChild(c){this.children.push(c);return c},append(...c){this.children.push(...c)},replaceChildren(...c){this.children=[...c]},insertAdjacentElement(w,c){this.children.push(c);return c},insertAdjacentHTML(){},querySelectorAll(q){return q==='button'?this.children.filter(x=>x?.tagName==='BUTTON'):[]},querySelector(){return null},addEventListener(){},remove(){},classList:{add(){},remove(){},toggle(){},contains(){return false}},click(){this.onclick?.({target:this})}}}
  const get=id=>{if(!nodes.has(id)){const e=el();e.id=id;e.value=id==='speed'||id==='saved-slot'?'1':id==='technique'?'pass':'';nodes.set(id,e)}return nodes.get(id)};
  return {getElementById:get,createElement:el,createElementNS:(_,t)=>el(t),head:el('head'),body:el('body'),querySelectorAll:()=>[]};
 }
 function boot(html,tracking,enabled,c){
  const dom=makeDOM(),get=dom.getElementById;let seed=c.seed;
  const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
  const script=html.match(/<script>([\s\S]*?)<\/script>/)[1],pos=script.lastIndexOf("})();");
  const probe="\nreturn {frame,enterFreeMode,playChoice,restorePosition,startSituation, snapshot:()=>JSON.stringify({elapsed,owner:owner?.id??null,bx,by,ballHeight,score,passes,shots,turnovers,trialSeed,stage,running,players:players.map(({el,...p})=>p)}),state:()=>({elapsed,running,stage,owner:owner?.id??null,status:status.textContent}),"+(tracking?"shadow:()=>ftShadow.report()":"shadow:()=>null")+"};\n";
  const api=new Function("document","requestAnimationFrame","Math","localStorage","return "+(script.slice(0,pos)+probe+script.slice(pos)).trimStart())(dom,()=>0,math,{getItem:()=>null,setItem:()=>{}});
  function change(id,v){const e=get(id);e.value=v;e.onchange({target:e})}
  if(tracking&&enabled){get('ft-enabled').checked=true;get('ft-enabled').onchange()}
  if(c.mode==="free"){
   api.enterFreeMode();change('system-blue',c.blue);change('system-red',c.red);change('speed',String(c.speed));
  }else api.playChoice("support");
  const traces=[];let pauseCheck=true;
  for(let i=0;i<=120;i++){
   if(c.mode==="free"&&i===40){get('pause').onclick();const p=api.state().elapsed,t=api.shadow()?.stats.ticks;for(let j=0;j<3;j++)api.frame(1000+i*40);pauseCheck=api.state().elapsed===p&&api.shadow()?.stats.ticks===t;get('pause').onclick()}
   api.frame(1000+i*40);const state=api.state();
   if(String(state.status).includes("ERROR DEL MOTOR"))throw Error(state.status);
   if(i%10===0)traces.push(api.snapshot());
  }
  const state=api.state(),shadow=api.shadow();
  let resetCheck=true,disableCheck=true;
  if(tracking&&enabled){api.startSituation();let q=api.shadow();resetCheck=q.latest===null&&q.stats.players===0&&q.stats.ticks===0;get('ft-enabled').checked=false;get('ft-enabled').onchange();q=api.shadow();disableCheck=!q.enabled&&q.latest===null&&q.stats.ticks===0}
  return {traces,state,shadow,pauseCheck,resetCheck,disableCheck};
 }
 const cases=[
  {id:'free433',mode:'free',seed:73,blue:'4-3-3',red:'4-3-3',speed:1},
  {id:'free4231',mode:'free',seed:91,blue:'4-2-3-1',red:'4-4-2',speed:2},
  {id:'free343',mode:'free',seed:127,blue:'3-4-3',red:'3-5-2',speed:4},
  {id:'guided',mode:'guided',seed:73}
 ];
 const result={};
 for(const c of cases){
  const orig=boot(baseHtml,false,false,c),off=boot(branchHtml,true,false,c),on=boot(branchHtml,true,true,c);
  const sameOff=JSON.stringify(orig.traces)===JSON.stringify(off.traces),sameOn=JSON.stringify(off.traces)===JSON.stringify(on.traces);
  result[c.id]={config:c,sameOff,sameOn,checkpoints:on.traces.length,elapsed:on.state.elapsed,stage:on.state.stage,pauseCheck:on.pauseCheck,resetCheck:on.resetCheck,disableCheck:on.disableCheck,stats:on.shadow.stats};
  if(!sameOff||!sameOn||!on.pauseCheck||!on.resetCheck||!on.disableCheck||on.shadow.stats.errors)throw Error("Regression "+c.id);
 }
 return result;
}

const base=execFileSync('git',['show','474c0f28d14d19d6bcf9b26b287142b0543fe769'],{encoding:'utf8',maxBuffer:2000000});
const branch=readFileSync('index.html','utf8');
console.log(JSON.stringify(runTests(base,branch),null,2));
