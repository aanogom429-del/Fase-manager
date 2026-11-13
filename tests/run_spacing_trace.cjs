const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
// Passive diagnosis: reversal is measured, not assumed to be the cause of crowding.
const e=env(undefined,73);e.t.enterFreeMode();e.t.scenario({time:10,team:1,seed:73});e.t.setDestinationTrace(true);
let corrections=0,reversed=0;const examples=[];
for(let frame=0;frame<900;frame++){
 e.t.update(1/30);
 for(const r of e.t.getDestinationTrace().rows){
  const i=r.steps.findIndex(s=>s.stage==='Aplicado · Abrir intervalo entre compañeros');if(i<0)continue;
  const before=r.steps.slice(0,i).reverse().find(s=>s.stage.startsWith('Aplicado · ')),after=r.steps[i];
  assert(before);corrections++;
  const dot=(before.x-r.x)*(after.x-r.x)+(before.y-r.y)*(after.y-r.y);
  assert(Number.isFinite(dot));
  if(dot< -1e-8){reversed++;if(examples.length<12)examples.push({time:r.time,team:r.team,jersey:r.jersey,position:{x:r.x,y:r.y},before,after,dot});}
 }
}
assert(corrections>0,'exercise trajectory corrections');
// Instrumentation must not alter the match, random sequence, or player memory.
const plain=env(undefined,73);plain.t.enterFreeMode();plain.t.scenario({time:10,team:1,seed:73});
for(let frame=0;frame<900;frame++)plain.t.update(1/30);
const snapshot=e=>JSON.parse(JSON.stringify(e.t.get(),(key,value)=>key==='el'?undefined:value));
assert.deepEqual(snapshot(e),snapshot(plain),'trace must be observational');
console.log(JSON.stringify({engine:fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').match(/<title>FASE MANAGER · ([^<]+)/)[1],initialTeam:1,seed:73,seconds:30,corrections,reversed,examples,note:'Per-frame commands, not independent events. Negative dot product identifies an avoidance command opposite to the tactical destination. This does not establish that reversal causes crowding. Instrumented and uninstrumented final states match.'},null,2));
