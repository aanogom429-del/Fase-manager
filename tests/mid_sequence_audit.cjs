const fs=require('node:fs'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace("traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);", "globalThis.midActivations=(globalThis.midActivations||0)+1;traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);").replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {activations:()=>globalThis.midActivations||0};');
const results=[];
for(const t of [0,1])for(const slot of [5,6]){
 const e=env(html,73);for(const id of ['system-blue','system-red']){e.nodes[id].value='4-2-3-1';e.nodes[id].onchange();}e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed:73});
 const ps=e.t.team(t),p=ps[7],holder=ps[slot],x=n=>t?100-n:n;
 for(const q of e.t.get().players){q.x=x(q.t===t?15:85);q.y=5+(q.id%11)*5;q.vx=q.vy=0;q.bodyAngle=q.t?Math.PI:0;}
 holder.x=x(30);holder.y=32;p.x=x(50);p.y=32;const r=e.t.opp(t)[6];r.x=x(45);r.y=32;e.t.capture(holder,'fixture');
 let passesToMid=0,receptions=0,afterReceptionActions=0,previousFlight=null,previousOwner=holder,received=false;const outcomes=[];
 for(let i=0;i<960;i++){
  e.t.update(1/120);const s=e.t.get();assert(s.players.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)));
  if(s.flight&&s.flight!==previousFlight){if(s.flight.target===p)passesToMid++;if(received&&s.flight.from===p)afterReceptionActions++;}
  if(previousFlight?.target===p&&!s.flight&&s.owner)outcomes.push({at:s.elapsed,receiver:s.owner.n,team:s.owner.t,intended:s.owner===p});
  if(s.owner===p&&previousOwner!==p){receptions++;received=true;}
  previousFlight=s.flight;previousOwner=s.owner;
 }
 results.push({team:t,pivotSlot:slot,seconds:8,outcomes,activations:e.t.phaseRelations(null).activations(),passesToMid,receptions,afterReceptionActions,passes:e.t.get().passes,turnovers:e.t.get().turnovers});
}
console.log(JSON.stringify(results,null,2));
