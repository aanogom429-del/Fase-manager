// MP3: medir ventanas temporales de destino interior sin modificar el motor.
// Uso: node tests/mid_temporal_audit.cjs [ruta/a/index.html]
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {env}=require('./continuity.cjs');
const src=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const anchor='function attackingMidConnection(p,anchor,reserved){';
const hooks=[
  ["traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);",
   "globalThis.midAudit.push({at:elapsed,player:p.id,holder:holder.id,x:q.x,y:q.y,kind:'open'});traceDestination(p,'Mediapunta · abrir conexión interior con el pivote',q.x,q.y);"],
  ["traceDestination(p,'Mediapunta · mantener conexión disponible',remembered.x,remembered.y);",
   "globalThis.midAudit.push({at:elapsed,player:p.id,holder:holder.id,x:remembered.x,y:remembered.y,kind:'hold'});traceDestination(p,'Mediapunta · mantener conexión disponible',remembered.x,remembered.y);"]
];
for(const [needle] of hooks)assert(src.includes(needle),'Falta marcador de instrumentación: '+needle);
assert(src.includes(anchor),'No se encuentra la regla MP3');
let traced=src;
for(const [before,after] of hooks)traced=traced.replace(before,after);
traced=traced.replace(anchor,"function attackingMidConnection(p,anchor,reserved){globalThis.midAudit=globalThis.midAudit||[];");
const marker='function phaseRelations(list,pos,holder=null,travel=null){';
assert(traced.includes(marker),'No se encuentra interfaz de consulta para ensayo');
traced=traced.replace(marker,marker+"if(!list)return {audit:()=>globalThis.midAudit||[]};");
function summarize(events){
  // Una ventana continua exige evaluaciones válidas sin pausa > 0,15 s.
  const windows=[];
  for(const v of events){
    const last=windows[windows.length-1];
    if(last&&last.player===v.player&&last.holder===v.holder&&v.at-last.end>=0&&v.at-last.end<=.15){
      last.end=v.at;last.samples++;last.holds+=Number(v.kind==='hold');
    }else windows.push({player:v.player,holder:v.holder,start:v.at,end:v.at,samples:1,holds:Number(v.kind==='hold')});
  }
  return windows.map(w=>({...w,duration:Number((w.end-w.start).toFixed(3))}));
}
const output=[];
for(const enabled of [false,true])for(const t of [0,1])for(const slot of [5,6]){
  const html=enabled?traced:traced.replace(anchor,anchor+'return anchor;');
  const e=env(html,73);
  for(const id of ['system-blue','system-red']){e.nodes[id].value='4-2-3-1';e.nodes[id].onchange();}
  e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed:73});
  const ps=e.t.team(t),mid=ps[7],holder=ps[slot],x=n=>t?100-n:n;
  for(const q of e.t.get().players){q.x=x(q.t===t?15:85);q.y=5+(q.id%11)*5;q.vx=q.vy=0;q.bodyAngle=q.t?Math.PI:0;}
  holder.x=x(30);holder.y=32;mid.x=x(50);mid.y=32;
  const rival=e.t.opp(t)[6];rival.x=x(45);rival.y=32;
  e.t.capture(holder,'fixture');
  // Medición simétrica: se observa la misma posibilidad geométrica/perceptiva en ambas variantes.
  // Es una aproximación local al receptor, no reconstruye `reserved` ni la decisión del pasador.
  const samples=[];
  for(let i=0;i<960;i++){
    e.t.update(1/120);
    assert(e.t.get().players.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)),'Posición no finita');
    if(i%12!==0)continue; // Cada 0,1 s, ventana idéntica en ambos brazos.
    const state=e.t.get(),current=state.owner;
    const mates=e.t.knownTeammates(mid),view=e.t.perceivedOpposition(mid);
    const observedHolder=current?.t===t?mates.find(m=>m.id===current.id&&m.memoryAge<=.25&&m.id===holder.id):null;
    // No inferir visibilidad si el compañero no está en la memoria.
    const h=observedHolder&&current.id===holder.id?observedHolder:null;
    const candidates=[{x:mid.x,y:mid.y},{x:mid.x,y:mid.y-8},{x:mid.x,y:mid.y+8}];
    const available=!!h&&candidates.some(q=>q.y>=16&&q.y<=48&&q.x>=4&&q.x<=96&&
      (q.x-h.x)*(t?-1:1)>=6&&(q.x-h.x)*(t?-1:1)<=28&&
      e.t.perceives(mid,q)&&e.t.perceivedSpace(q,view)>=5&&
      e.t.perceivedLane(h,q,view).risk<=3&&
      mates.every(m=>m.id===h.id||Math.hypot(m.x-q.x,m.y-q.y)>=6));
    samples.push({at:state.elapsed,available});
  }
  const events=enabled?e.t.phaseRelations(null).audit():[];
  // El registro indica destino planificado, NO pase accesible, recepción ni ventaja causal.
  const windows=summarize(events);
  output.push({enabled,team:t,pivotSlot:slot,seconds:8,activations:events.length,windows,
    totalWindowSeconds:Number(windows.reduce((s,w)=>s+w.duration,0).toFixed(3)),
    longestWindowSeconds:Number(Math.max(0,...windows.map(w=>w.duration)).toFixed(3)),
    sampledSeconds:Number((samples.length*.1).toFixed(2)),
    perceivedOpportunitySamples:samples.filter(s=>s.available).length,
    perceivedOpportunityShare:Number((samples.filter(s=>s.available).length/samples.length).toFixed(3)),
    longestPerceivedOpportunitySeconds:Number((samples.reduce((acc,s)=>{acc.run=s.available?acc.run+1:0;acc.max=Math.max(acc.max,acc.run);return acc;},{run:0,max:0}).max*.1).toFixed(2))
  });
}
console.log(JSON.stringify({base:'0.148',kind:'symmetric-perceived-proxy-and-activation-not-pass-success',results:output},null,2));
