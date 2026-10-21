const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const {build}=require('../scripts/evaluate_compromise_targets.cjs'),{base}=require('../scripts/evaluate_finishing_resume.cjs');
const entry='startSituation();requestAnimationFrame(frame);';let expandedChoices=0,addedChoices=0;
function setup(source,t){
 const e=env(source.replace(entry,entry+'globalThis.test.protect=protectFinishingLine;globalThis.test.position=finishingPosition;globalThis.test.guard=projectedShotGuard;'));
 e.t.scenario({time:10,team:t});const flip=(x,y)=>({x:t?100-x:x,y:t?64-y:y}),ps=e.t.get().players;
 const p=ps.find(q=>q.t===t&&q.n===7),c=ps.find(q=>q.t!==t&&q.n===6);
 for(const q of ps)Object.assign(q,flip(80,60),{vx:0,vy:0,rivalMemory:[],visualMemory:[]});
 Object.assign(c,flip(20,40),{bodyAngle:t?0:Math.PI});e.t.capture(c,'test');
 return {e,p,c,flip};
}
for(const t of [0,1]){
 const old=setup(base,t),next=setup(build(),t);
 for(const rank of [0,1])for(const x of [4,7,10,13])for(const y of [33,34.5,36,39]){
  for(const s of [old,next])Object.assign(s.p,s.flip(x,y),{bodyAngle:t?Math.PI:0});
  const proposed=next.flip(rank===0?15:13,rank===0?40:35),snapshot=JSON.stringify(next.e.t.savePosition());
  const before=old.e.t.protect(old.p,rank,old.c,proposed),after=next.e.t.protect(next.p,rank,next.c,proposed);
  assert.equal(JSON.stringify(next.e.t.savePosition()),snapshot,'Search must not mutate state or random seed');
  if(!after){assert.equal(before,null,'Existing accepted choices must remain available');continue;}
  expandedChoices++;if(!before)addedChoices++;
  const previous=next.e.t.position(next.p,proposed,next.p.reactionDelay),candidate=next.e.t.position(next.p,after,next.p.reactionDelay);
  if(rank===0)assert(next.e.t.arrivalTime({...candidate,intentAt:10},next.c,2.8)<=next.e.t.arrivalTime({...previous,intentAt:10},next.c,2.8)+1e-6);
  if(Math.hypot(previous.x-next.c.x,previous.y-next.c.y)<=2.8)assert(Math.hypot(candidate.x-next.c.x,candidate.y-next.c.y)<=2.8);
  let gain=0;for(const offset of [0,-2.5,2.5]){
   const goal={x:t?100:0,y:32+offset*(t?-1:1)},a=next.e.t.guard(next.p,proposed,next.c,goal),b=next.e.t.guard(next.p,after,next.c,goal);
   assert(!a||b,'Do not lose a previously covered immediate-shot ray');gain+=Number(b)-Number(a);
  }
  assert(gain>0,'Every accepted target adds a predicted immediate contact');
 }
}
assert(addedChoices>0);console.log('PASS compromise search: mirrored pure selection, physical ray gain, retained existing choices and strict access/tackle vetoes;',expandedChoices,'choices,',addedChoices,'additional. No claim of autonomous tactical improvement.');
const {verify}=require('../scripts/evaluate_compromise_targets.cjs');
const report=require('../data/compromise-targets-v0531.json'),traces=require('../data/compromise-targets-traces.json');
assert.deepEqual(verify(report),require('../data/compromise-targets-summary.json'));
assert.equal(traces.simulationSha256,report.simulationSha256);assert.equal(traces.rows.length,4);
for(const trace of traces.rows){
 const row=report.rows.find(x=>x.t===trace.t&&x.kind===trace.kind&&x.seed===trace.seed&&x.group===(trace.kind==='pass'?'orientation':'shot')&&Object.keys(x.options).length===(trace.kind==='pass'?1:0));
 assert(row);assert.deepEqual(trace.result,trace.version==='e28'?row.reference.e28:row.result,'Passive trace must preserve untraced result');
 assert.equal(trace.sourceSha256,require('../scripts/evaluate_finishing_resume.cjs').hash(trace.version==='e28'?base:build()));
}
console.log('PASS full evidence provenance, scenario order, aggregate summary and four passive trace outcomes');
