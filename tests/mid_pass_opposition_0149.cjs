// 0.149: oposición cercana controlada; seguimiento de intención, golpeo, contacto y posesión.
// Semilla y escenario idénticos; la única intervención es +2 frente a 0.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const {env}=require('./continuity.cjs');
const src=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const bonus='return 2; // Margen pequeño frente a otras soluciones; conserva evaluación de riesgo.';
const kick='function kickTo(p,x,y,kind,target=null,origin=null){';
const capture='function capture(p,why){';
const release='function releaseKick(p,x,y,kind,target=null,origin=null){';
const probe='function phaseRelations(list,pos,holder=null,travel=null){';
for(const marker of [bonus,kick,capture,release,probe])assert(src.includes(marker),'Missing hook: '+marker);
let html=src
 .replace(kick,kick+"if(!globalThis.mp3Intention)globalThis.mp3Intention={kind,from:p.id,target:target?.id??null,time:elapsed};")
 .replace(release,release+"if(!globalThis.mp3Release)globalThis.mp3Release={kind,from:p.id,target:target?.id??null,time:elapsed};")
 .replace(capture,capture+"if(flight?.kind==='pass')(globalThis.mp3Touches=globalThis.mp3Touches||[]).push({from:flight.from?.id,receiver:p.id,time:elapsed});")
 .replace(probe,probe+"if(!list)return {trace:()=>({intention:globalThis.mp3Intention||null,release:globalThis.mp3Release||null,touches:globalThis.mp3Touches||[]})};");
const neutral=html.replace(bonus,'return 0; // Matched neutralized bonus');
const result=[];
for(const t of [0,1])for(const slot of [5,6])
 for(const offset of [0,2])for(const lateral of [6])
 for(const seed of [13,73])for(const defense of ['receiver','lane','alternative']){
 const arms=[];
 for(const enabled of [false,true]){
  const e=env(enabled?html:neutral,seed);
  const selector=e.nodes[t?'system-red':'system-blue'];selector.value='4-2-3-1';selector.onchange();
  e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});
  const all=e.t.get().players,ps=e.t.team(t),p=ps[slot],mid=ps[7],alternative=ps[8],dir=t?-1:1;
  for(const q of all){q.x=t?94:6;q.y=56;q.vx=q.vy=0;q.bodyAngle=q.t?Math.PI:0;}
  for(const q of e.t.opp(t)){q.x=t?10:90;q.y=56;}
  p.x=t?70:30;p.y=32;p.bodyAngle=t?Math.PI:0;
  mid.x=p.x+dir*18;mid.y=32;alternative.x=p.x+dir*(18+offset);alternative.y=32+lateral;
  const marker=e.t.opp(t).find(q=>!q.sentOff);
  // Oposición observable en tres contracasos: próximo al receptor, entre líneas,
  // o sobre la alternativa. La física y las decisiones de ambos equipos permanecen activas.
  if(defense==='receiver'){marker.x=mid.x-dir*2;marker.y=mid.y+4;}
  else if(defense==='lane'){marker.x=p.x+dir*9;marker.y=32+2;}
  else {marker.x=alternative.x-dir*2;marker.y=alternative.y+3;}
  e.t.capture(p,'fixture');
  p.controlUntil=0;p.receivedAt=-Infinity;p.recoveryUntil=-Infinity;p.reorderUntil=-Infinity;p.scanUntil=0;p.cool=0;
  e.t.chooseAction(p);
  const intended=e.t.phaseRelations(null).trace().intention;
  // Se sigue el golpeo real tras la preparación corporal y hasta 2,5 s después.
  for(let tick=0;tick<300;tick++){
   e.t.update(1/120);
   assert(e.t.get().players.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)),'Nonfinite player location');
  }
  const trace=e.t.phaseRelations(null).trace();
  const release=trace.release?.from===p.id&&trace.release.kind==='pass'?trace.release:null;
  const firstTouch=release?trace.touches.find(v=>v.from===p.id&&v.time>=release.time):null;
  const final=e.t.get();
  arms.push({enabled,intendedTarget:intended?.target??null,intendedKind:intended?.kind??null,
   releasedTarget:release?.target??null,hadRelease:!!release,
   firstReceiver:firstTouch?.receiver??null,receivedByIntended:!!firstTouch&&firstTouch.receiver===release.target,
   turnover:firstTouch?all.find(q=>q.id===firstTouch.receiver)?.t!==t:null,
   stillInFlight:!!final.flight,
   finalOwner:final.owner?.id??null,finalTeam:final.owner?.t??null,
   finishedInPossession:final.owner?.t===t,
   midId:mid.id,alternativeId:alternative.id});
 }
 const changed=arms[0].intendedTarget!==arms[1].intendedTarget||arms[0].intendedKind!==arms[1].intendedKind;
 result.push({team:t,slot,offset,lateral,seed,defense,changed,off:arms[0],on:arms[1]});
}
const changed=result.filter(r=>r.changed),summary=arms=>({
 intentsToMid:arms.filter(a=>a.intendedKind==='pass'&&a.intendedTarget===a.midId).length,
 actualPasses:arms.filter(a=>a.hadRelease).length,
 intendedReceipts:arms.filter(a=>a.receivedByIntended).length,
 opposingFirstTouches:arms.filter(a=>a.turnover===true).length,
 unknownFirstTouches:arms.filter(a=>a.hadRelease&&!a.firstReceiver).length,
 stillOwnBall:arms.filter(a=>a.finishedInPossession).length,
 finalOpponentOwner:arms.filter(a=>a.finalTeam!==null&&!a.finishedInPossession).length
});
console.log(JSON.stringify({pairs:result.length,changed:changed.length,
 all:{off:summary(result.map(r=>r.off)),on:summary(result.map(r=>r.on))},
 changedOnly:{off:summary(changed.map(r=>r.off)),on:summary(changed.map(r=>r.on))},
 byDefense:Object.fromEntries(['receiver','lane','alternative'].map(k=>{
  const x=result.filter(v=>v.defense===k);
  return [k,{pairs:x.length,changed:x.filter(v=>v.changed).length,
    off:summary(x.map(v=>v.off)),on:summary(x.map(v=>v.on))}];
 })),
 cases:result},null,2));
