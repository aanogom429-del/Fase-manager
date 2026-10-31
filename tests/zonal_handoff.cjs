const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const mode of ['handoff','far','ordered','blind','notBeaten']){
 const e=env();e.t.scenario({time:10,team:1-t});const s=e.t.get(),dir=t?-1:1;
 s.owner.x=50;s.owner.y=32;
 const defenders=s.players.filter(p=>p.t===t&&p.n!==1);
 for(const p of defenders){p.x=50-dir*35;p.y=60;p.defDuty=null;}
 const [old,next]=defenders;old.x=50+dir*(mode==='notBeaten'?-1:3);old.y=32;old.defDuty='press';
 next.x=50-dir*(mode==='far'?20:6);next.y=34;next.bodyAngle=t?Math.PI:0;
 if(mode==='blind')next.bodyAngle+=Math.PI;
 if(mode==='ordered')s.offBallOrders.push({i:s.players.indexOf(next),readyAt:0,until:20});
 const order=e.t.defensiveOrder(t,{x:50,y:32});
 if(mode==='handoff'){
  assert.equal(order[0],next);assert.notEqual(order[1],old,'beaten defender recovers line, not second pressure');
  assert.equal(e.t.defensiveOrder(t,{x:50,y:32})[0],next,'stable new presser');
 }else assert.equal(order[0],old,'no handoff without eligible local defender');
 assert.equal(defenders.filter(p=>p.defDuty==='press').length,1);
 assert.equal(new Set(order.filter(Boolean)).size,defenders.length);
}
console.log('PASS: mirrored zonal handoff, single presser, recovery, stability and four exclusion cases');
