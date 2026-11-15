const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(process.env.BASELINE_HTML||path.join(__dirname,'../index.html'),'utf8');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html);e.t.scenario({time:10,team:t,seed:73});const s=e.t.get(),holder=s.owner,dir=t?-1:1;
 for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}
 holder.x=50;holder.y=32;holder.bodyAngle=t?Math.PI:0;
 for(const p of e.t.opp(t)){p.x=50+dir*40;p.y=4+p.n*5;}
 const before=JSON.stringify(s.players.map(p=>[p.x,p.y]));e.t.setDestinationTrace(true);
 const targets=e.t.attackingTargets(t,holder),balance=e.t.team(t).filter(p=>p.attackBalance);
 assert.equal(balance.length,2);assert.equal(JSON.stringify(s.players.map(p=>[p.x,p.y])),before);
 for(const p of balance){
  const q=targets.get(p);assert((holder.x-q.x)*dir>=14,'equilibrium leaves short-support neighbourhood');
  assert.equal((holder.x-q.x)*dir,14+(p.attackBalance-1)*6,'staggered safety depths');
  const row=e.t.getDestinationTrace().rows.find(r=>r.id===p.id);assert(row.steps.some(k=>k.stage.startsWith('Red de iniciación')));
 }
 assert(e.t.team(t).filter(p=>p.attackSupport).length<=2);
 // Established possession after beating the first pressure retains deeper tiers.
 e.t.opp(t).find(p=>p.n===9).x=50-dir*10;
 for(const p of e.t.team(t))p.widthStarted=0;
 e.t.scenario({time:20,team:t,seed:73});
 const established=e.t.attackingTargets(t,holder);
 for(const p of e.t.team(t).filter(p=>p.attackBalance))assert((holder.x-established.get(p).x)*dir>=18);
 // A drawn instruction still determines the actual movement destination.
 const selected=balance[0];assert(e.t.queueOffBall(selected.id,'move',{x:60,y:12})=== (t===0));
 if(t===0){e.t.commitOffBall();e.t.get().offBallOrders[0].readyAt=0;delete selected.intentAt;e.t.movement(1/60);
  const row=e.t.getDestinationTrace().rows.find(r=>r.id===selected.id);assert.equal(row.appliedX,60);assert.equal(row.appliedY,12);
 }
}
console.log('PASS: deeper staggered equilibrium in both teams and four systems; no teleport, two support slots, drawn orders retained');
