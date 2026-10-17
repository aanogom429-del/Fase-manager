const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sample=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace('startSituation();requestAnimationFrame(frame);',
 'globalThis.test={coordinatedOffBallTargets,queueOffBall,commitOffBall,pruneOffBall,offBallTarget,activePlayers,team,opp,tacticalSanction,showCard,render,assessAdvantage,confirmAdvantage,recallAdvantage,advantageOpportunity,resolveChallenge,inPenaltyArea,offsideReference,offsideLine,inOffsidePosition,markOffside,penalizeOffside,prepareDecision,attackingTargets,savePosition,boundaryCrossing,adjudicateExit,beginRestart,advanceRestart,restartTarget,resetKickoff,enterDecisionMode,enterFreeMode,playChoice,restorePosition,startSituation,frame,update,kickTo,renderPhase,tickReference,beginMeasurement,measurementValues,supportCandidates,defendingTarget,passExecution,defensiveOrder,movement,defensiveMetrics,startLossTrace,sampleLossTrace,capture,get:()=>({offBallPlans,offBallOrders,offBallPlayer,cardLog,matchStopped,advantage,lastAdvantage,foulCalls,lastFoul,offsidePhase,lastOffside,offsideCalls,restart,restartGuard,lastRuling,lossTrace,measurement,players,owner,flight,bx,by,elapsed,score,passes,shots,turnovers,running,stage,ballHeight,loose,trialSeed}),select:g=>{technique=g;renderChoices();syncControls();},scenario:(s)=>{if(s.seed!==undefined)trialSeed=s.seed;elapsed=s.time;score=[2,1];owner=players.find(p=>p.t===s.team&&p.n===6);bx=owner.x;by=owner.y;decision=.5;}};startSituation();requestAnimationFrame(frame);');
function env(){
 const nodes={};
 class E{
  constructor(){this.style={};this.dataset={};this.children=[];this.hidden=false;this.textContent='';}
  setAttribute(k,v){this[k]=v;}append(...v){this.children.push(...v);}appendChild(v){this.append(v);}
  replaceChildren(...v){this.children=v;}querySelectorAll(){return this.children;}
  insertAdjacentElement(_,e){if(e.id)nodes[e.id]=e;}insertAdjacentHTML(){}
 }
 let seed=101;
 const context={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},
  Math:Object.assign(Object.create(Math),{random:()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}}),
  requestAnimationFrame:()=>{},fetch:async url=>({ok:true,json:async()=>url.includes('support-diagnosis')?JSON.parse(fs.readFileSync(path.join(root,'data/support-diagnosis.json'),'utf8')):url.includes('heights-comparison')?JSON.parse(fs.readFileSync(path.join(root,'data/heights-comparison.json'),'utf8')):url.includes('audit-windows')?JSON.parse(fs.readFileSync(path.join(root,'data/audit-windows.json'),'utf8')):url.includes('audit-validation')?JSON.parse(fs.readFileSync(path.join(root,'data/audit-validation.json'),'utf8')):url.includes('game2-validation')?JSON.parse(fs.readFileSync(path.join(root,'data/game2-validation.json'),'utf8')):url.includes('defense-validation')?JSON.parse(fs.readFileSync(path.join(root,'data/defense-validation.json'),'utf8')):sample}),console:{error:(...e)=>{throw new Error(e.join(' '));}}};
 vm.createContext(context);vm.runInContext(script,context);let now=100;
 return {t:context.test,nodes,tick:()=>context.test.frame(now+=1000/60)};
}
function signature(e){
 const s=e.t.get(),f=s.flight;
 return JSON.stringify({players:s.players.map(p=>[p.t,p.n,p.x,p.y,p.cool]),owner:s.owner&&[s.owner.t,s.owner.n],
  ball:[s.bx,s.by,s.ballHeight,s.loose],flight:f&&[f.x,f.y,f.tx,f.ty,f.age,f.duration,f.kind,f.target&&f.target.n],
  elapsed:s.elapsed,score:s.score,passes:s.passes,shots:s.shots,turnovers:s.turnovers});
}
function resolve(e){for(let i=0;i<4000&&['resolve','settle'].includes(e.t.get().stage);i++)e.tick();assert(!['resolve','settle'].includes(e.t.get().stage));}
async function main(){
 for(const team of [0,1]){
  const e=env();e.t.enterFreeMode();e.t.scenario({time:74.25,team});e.nodes.pause.onclick();
  const saved=signature(e);e.t.enterDecisionMode();assert.equal(signature(e),saved);assert.equal(e.t.get().running,false);
  for(let i=0;i<10;i++)e.tick();assert.equal(signature(e),saved);
  e.t.playChoice('support');resolve(e);assert.equal(e.t.get().stage,'review');
  const result=signature(e);e.t.restorePosition();assert.equal(signature(e),saved);
  e.t.playChoice('support');resolve(e);assert.equal(signature(e),result,'retry must reproduce result');
  const current=signature(e);e.t.enterFreeMode();assert.equal(signature(e),current,'return to free mode must preserve state');
 }
 function executionMean(pressure,length){const e=env(),s=e.t.get(),p=s.owner;p.x=30;p.y=32;for(const q of s.players.filter(q=>q.t!==p.t)){q.x=90;q.y=60;}if(pressure){const q=s.players.find(q=>q.t!==p.t);q.x=30.5;q.y=32;}let sum=0;for(let i=0;i<500;i++){const r=e.t.passExecution(p,30+length,32);assert(Number.isFinite(r.tx)&&r.tx>=2&&r.tx<=98&&r.ty>=2&&r.ty<=62);sum+=r.error;}return sum/500;}
 const low=executionMean(false,10),high=executionMean(true,10),long=executionMean(false,40);assert(low>0&&high>low&&long>low,'pressure and length increase execution dispersion');
 console.log('Execution dispersion:',JSON.stringify({low,high,long}));
 const defense=env();for(const t of [0,1]){const p=defense.t.get().players.find(p=>p.t===t&&p.n===6),dir=t===0?1:-1;for(const rank of [0,1,2,6]){const q=defense.t.defendingTarget(p,rank,{x:50,y:32});assert((q.x-50)*dir<0,"defender protects own-goal side");}}
 const measured=env(), unchanged=signature(measured);measured.t.beginMeasurement();assert.equal(signature(measured),unchanged);assert.equal(measured.t.measurementValues().seconds,0);assert.equal(measured.t.measurementValues().block,0);measured.t.restorePosition();assert.equal(measured.t.get().measurement,null);
 const air=env();air.t.enterFreeMode();air.t.scenario({time:110,team:0});
 const s=air.t.get(),target=s.players.find(p=>p.t===0&&p.n===8);air.t.kickTo(s.owner,target.x,target.y,'pass',target);
 air.t.get().flight.loft=5;air.t.update(.08);air.nodes.pause.onclick();
 const frozen=signature(air);air.t.enterDecisionMode();assert.equal(signature(air),frozen);assert.equal(air.t.get().stage,'settle');
 for(let i=0;i<10;i++)air.tick();assert.equal(signature(air),frozen);
 air.nodes['resume-ball'].onclick();air.nodes.pause.onclick();assert.equal(air.t.get().running,false);
 air.nodes['resume-ball'].onclick();resolve(air);assert.equal(air.t.get().stage,'choose');assert(air.t.get().elapsed>=110);
 const without=env();without.t.enterFreeMode();without.t.scenario({time:120,team:0});
 without.t.kickTo(without.t.get().owner,1,1,'pass');const flight=without.t.get().flight;flight.age=flight.duration;
 without.t.update(.01);if(!without.t.get().owner){const before=signature(without);without.t.enterDecisionMode();assert.equal(signature(without),before);without.nodes['resume-ball'].onclick();resolve(without);}
 const e=env();e.t.enterFreeMode();e.t.scenario({time:85,team:0});const before=signature(e);
 e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();assert.equal(signature(e),before);assert.equal(e.t.get().running,false);
 e.nodes['reference-time'].oninput({target:{value:'5'}});assert(e.nodes['reference-clock'].textContent.includes(sample.clips[0].frames[5].time.toFixed(2)));
 e.nodes['reference-play'].onclick();e.t.tickReference(100);e.t.tickReference(1000);const targetTime=sample.clips[0].frames[5].time+.9;const expected=sample.clips[0].frames.filter(f=>f.time<=targetTime).at(-1);assert(e.nodes['reference-clock'].textContent.includes(expected.time.toFixed(2)));
 for(let i=0;i<sample.clips.length;i++){
  e.nodes['reference-sequence'].onchange({target:{value:String(i)}});
  e.nodes['reference-event-select'].onchange({target:{value:'0'}});
  assert(e.nodes['reference-clock'].textContent.includes(sample.clips[i].events[0].start.toFixed(2)));
  e.nodes['reference-trails'].checked=true;
  e.nodes['reference-time'].oninput({target:{value:String(sample.clips[i].frames.length-1)}});
  assert(!e.nodes['reference-pitch'].innerHTML.includes('NaN'));
 }
 assert.equal(signature(e),before,'reference viewer must not change simulation');
 e.t.startSituation();assert.equal(e.t.get().elapsed,0);assert.equal(e.t.get().score.join(','),'0,0');
 console.log('PASS: possession for both teams, frozen flight, loose ball, clock/score, pause, retry, both mode directions, reference isolation/playback, explicit restart');
}
module.exports={env,signature};
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
