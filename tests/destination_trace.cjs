const assert=require('node:assert/strict'),{env,signature}=require('./continuity.cjs');
function state(e){const s=e.t.get();return JSON.stringify({players:s.players.map(({el,...p})=>p),owner:s.owner?.id,ball:[s.bx,s.by],time:s.elapsed,score:s.score,turnovers:s.turnovers});}
function run(){
 const cases=[];
 for(const team of [0,1]){
  const a=env(),b=env();b.t.setDestinationTrace(true);
  for(const e of [a,b]){for(const p of e.t.get().players){p.x=p.hx;p.y=p.hy;}e.t.scenario({time:1,team,seed:73});}
  const dir=team===0?1:-1;
  for(const [phase,dx,dy] of [['progresión',12,0],['circulación',0,8]]){
   for(let k=0;k<12;k++)for(const e of [a,b]){const s=e.t.get();s.owner.x+=dir*dx/12;s.owner.y+=dir*dy/12;e.t.scenario({time:s.elapsed+.05,team});e.t.movement(.05);}
   assert.equal(state(a),state(b),'observer must not affect '+phase);
   const rows=b.t.getDestinationTrace().rows;assert.equal(rows.length,22);assert(rows.every(r=>Number.isFinite(r.appliedX)&&Number.isFinite(r.forwardStep)));
   for(const r of rows){assert(Math.abs(r.forwardStep-(r.endX-r.x)*(r.team===0?1:-1))<1e-12);assert(r.appliedX>=2&&r.appliedX<=98);}
   for(const r of rows.filter(r=>r.source==='lectura almacenada')){const p=b.t.get().players.find(p=>p.id===r.id),s=r.steps.find(s=>s.stage==='Destino tras demora');assert.equal(s.x,p.intentX);assert.equal(s.y,p.intentY);assert(r.intent,'known cached provenance');}
   const attacking=rows.filter(r=>r.team===team&&r.steps.some(s=>s.stage==='Destino de apoyo'));
   assert(attacking.length>0);assert(attacking.every(r=>r.steps.some(s=>s.stage==='Separación y línea de pase')));
   cases.push({team,phase,backwardPlayers:rows.filter(r=>r.team===team&&r.forwardStep<0).map(r=>r.jersey),cachedReads:rows.filter(r=>r.intent&&r.intent.at<r.time).length});
  }
  for(const e of [a,b]){const rival=e.t.get().players.find(p=>p.t!==team&&p.n===6);e.t.capture(rival,'prueba de pérdida');e.t.movement(.05);}
  assert.equal(state(a),state(b),'loss observer equivalence');
  const loss=b.t.getDestinationTrace().rows.filter(r=>r.team===team);assert(loss.every(r=>r.steps.some(s=>s.stage==='Lectura defensiva')));assert(loss.every(r=>!r.steps.some(s=>s.stage==='Destino de apoyo')));
  cases.push({team,phase:'pérdida',backwardPlayers:loss.filter(r=>r.forwardStep<0).map(r=>r.jersey)});
  for(const e of [a,b])e.t.beginRestart('throw',team,30,0,'test');assert.equal(b.t.getDestinationTrace().rows.length,0);
  b.t.startSituation();assert.equal(b.t.getDestinationTrace().rows.length,0);b.t.setDestinationTrace(false);assert(!b.t.getDestinationTrace().enabled);
 }
 // Flight target overrides the cached intention and is labelled separately.
 const e=env();e.t.setDestinationTrace(true);e.t.scenario({time:2,team:0});const target=e.t.get().players.find(p=>p.t===0&&p.n===10);e.t.kickTo(e.t.get().owner,target.x,target.y,'pass',target);e.t.movement(.02);
 const receiver=e.t.getDestinationTrace().rows.find(r=>r.id===target.id);assert.equal(receiver.source,'recepción');assert.equal(receiver.appliedX,e.t.get().flight.tx);
 const ui=env();ui.nodes['destination-enabled'].onchange({target:{checked:true}});ui.t.movement(.02);ui.t.render();assert(ui.nodes['destination-detail'].innerHTML.includes('Último paso registrado'));
 ui.nodes['destination-detail'].innerHTML='expanded cached provenance';ui.t.render();assert.equal(ui.nodes['destination-detail'].innerHTML,'expanded cached provenance','paused render must preserve expanded details');
 ui.t.prepareDecision();ui.t.restorePosition();assert.equal(ui.t.getDestinationTrace().rows.length,0);
 ui.nodes['destination-enabled'].onchange({target:{checked:false}});ui.t.render();assert(ui.nodes['destination-detail'].textContent.includes('desactivado'));
 const ordered=env();ordered.t.setDestinationTrace(true);const op=ordered.t.get().players.find(p=>p.t===0&&p.n===11);assert(ordered.t.queueOffBall(op.id,'width'));ordered.t.commitOffBall();ordered.t.scenario({time:1,team:0});ordered.t.movement(.02);const or=ordered.t.getDestinationTrace().rows.find(r=>r.id===op.id);assert(or.steps.some(s=>s.stage==='Orden del entrenador'));assert(or.intent.steps.some(s=>s.stage==='Orden del entrenador'));
 const freeA=env(),freeB=env();freeB.t.setDestinationTrace(true);freeA.t.enterFreeMode();freeB.t.enterFreeMode();
 for(let i=0;i<1200;i++){freeA.t.update(1/120);freeB.t.update(1/120);assert.equal(signature(freeA),signature(freeB),'identical free simulation with observer');assert(freeB.t.getDestinationTrace().rows.length<=22);}
 return cases;
}
if(require.main===module)console.log('PASS: passive destination tracing, progression/circulation/loss both directions, cached reads, bounds, reset and reception priority',JSON.stringify(run()));
module.exports={run};
