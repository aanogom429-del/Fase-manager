const fs=require('node:fs'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'../index.html'),'utf8');
let html=src.replace("traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);", "globalThis.midActivations=(globalThis.midActivations||0)+1;traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);").replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {activations:()=>globalThis.midActivations||0};');
html=html.replace('lastTouchTeam=p.t;owner=null;',"flight.auditId=(globalThis.auditEvents||=[]).length;globalThis.auditEvents.push({type:'kick',id:flight.auditId,at:elapsed,from:p.id,target:target?.id??null});lastTouchTeam=p.t;owner=null;").replace('recordMeasurementTouch(p);',"(globalThis.auditEvents||=[]).push({type:'capture',id:flight?.auditId??null,at:elapsed,receiver:p.id});recordMeasurementTouch(p);").replace('activations:()=>globalThis.midActivations||0','events:()=>globalThis.auditEvents||[],activations:()=>globalThis.midActivations||0');
const results=[];
for(const enabled of [false,true])for(const t of [0,1])for(const slot of [5,6]){
 const e=env(enabled?html:html.replace("function attackingMidConnection(p,anchor,reserved){","function attackingMidConnection(p,anchor,reserved){return anchor;"),73);for(const id of ['system-blue','system-red']){e.nodes[id].value='4-2-3-1';e.nodes[id].onchange();}e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed:73});
 const ps=e.t.team(t),p=ps[7],holder=ps[slot],x=n=>t?100-n:n;
 for(const q of e.t.get().players){q.x=x(q.t===t?15:85);q.y=5+(q.id%11)*5;q.vx=q.vy=0;q.bodyAngle=q.t?Math.PI:0;}
 holder.x=x(30);holder.y=32;p.x=x(50);p.y=32;const r=e.t.opp(t)[6];r.x=x(45);r.y=32;e.t.capture(holder,'fixture');
 for(let i=0;i<960;i++){e.t.update(1/120);assert(e.t.get().players.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)));}
 const pending=e.t.get().flight;let extra=0;
 while(pending&&e.t.get().flight===pending&&extra++<480)e.t.update(1/120);
 const events=e.t.phaseRelations(null).events(),kicks=events.filter(v=>v.type==='kick'&&v.target===p.id&&v.at<=18.000001);
 const outcomes=kicks.map(k=>{const c=events.find(v=>v.type==='capture'&&v.id===k.id);return {kickAt:k.at,from:k.from,receiver:c?.receiver??null,receivedAt:c?.at??null,result:c?(c.receiver===p.id?'intended':'other-player'):'unresolved'};});
 const received=outcomes.filter(o=>o.result==='intended');
 results.push({enabled,team:t,pivotSlot:slot,seconds:8,followupSeconds:extra/120,activations:e.t.phaseRelations(null).activations(),outcomes,continuations:events.filter(v=>v.type==='kick'&&v.from===p.id&&received.some(o=>o.receivedAt<v.at)).length});
}
console.log(JSON.stringify(results,null,2));
