// Contraste causal de la preferencia de pase 0.149: misma semilla, geometría y motor,
// variando ÚNICAMENTE la bonificación +2. Se observa la orden real de pase, no el bonus.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {env}=require('./continuity.cjs');
const src=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const bonus='return 2; // Margen pequeño frente a otras soluciones; conserva evaluación de riesgo.';
const kick='function kickTo(p,x,y,kind,target=null,origin=null){';
const probe='function phaseRelations(list,pos,holder=null,travel=null){';
assert(src.includes(bonus)&&src.includes(kick)&&src.includes(probe),'0.149 instrument anchors missing');
let html=src.replace(kick,kick+"globalThis.mp3Selected={kind,from:p.id,target:target?.id??null};")
 .replace(probe,probe+"if(!list)return {choice:()=>globalThis.mp3Selected||null};");
const baseline=html.replace(bonus,'return 0; // Neutralized bonus for causal ablation');
const results=[];
for(const t of [0,1])for(const slot of [5,6])
 for(const offset of [0,1,2,3,4])for(const lateral of [6,10])
 for(const seed of [13,29,73,101]){
  const common={team:t,slot,offset,lateral,seed};const pair=[];
  for(const enabled of [false,true]){
   const e=env(enabled?html:baseline,seed);
   e.nodes[t?'system-red':'system-blue'].value='4-2-3-1';
   e.nodes[t?'system-red':'system-blue'].onchange();
   e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});
   const all=e.t.get().players,ps=e.t.team(t),p=ps[slot],mid=ps[7],rival=ps[8],dir=t?-1:1;
   for(const q of all){q.x=t?94:6;q.y=56;q.vx=q.vy=0;q.bodyAngle=q.t?Math.PI:0;}
   // Opposition far from the two connections, but with consistent perceived geometry.
   for(const q of e.t.opp(t)){q.x=t?10:90;q.y=56;}
   p.x=t?70:30;p.y=32;p.bodyAngle=t?Math.PI:0;
   mid.x=p.x+dir*18;mid.y=32;
   rival.x=p.x+dir*(18+offset);rival.y=32+lateral;
   e.t.capture(p,'fixture');
   p.controlUntil=0;p.receivedAt=-Infinity;p.recoveryUntil=-Infinity;p.reorderUntil=-Infinity;
   p.scanUntil=0;p.cool=0;
   e.t.chooseAction(p);
   const ch=e.t.phaseRelations(null).choice();
   pair.push({enabled,target:ch?.target??null,kind:ch?.kind??null,
     midId:mid.id,alternativeId:rival.id});
  }
  results.push({...common,off:pair[0],on:pair[1],
   changed:JSON.stringify([pair[0].kind,pair[0].target])!==JSON.stringify([pair[1].kind,pair[1].target])});
 }
const changed=results.filter(v=>v.changed);
const gain=changed.filter(v=>v.on.kind==='pass'&&v.on.target===v.on.midId).length;
const loss=changed.filter(v=>v.off.kind==='pass'&&v.off.target===v.off.midId).length;
console.log(JSON.stringify({cases:results.length,changed:changed.length,gain,loss,
 changedCases:changed.slice(0,35),nullChoices:results.filter(v=>!v.on.kind||!v.off.kind).length},null,2));
