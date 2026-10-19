const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {env,signature}=require('./continuity.cjs');
const baseline=fs.readFileSync(path.join(__dirname,'fixtures/engine-v034.html'),'utf8');
function setup(t,old=false){
 const e=env(old?baseline:undefined),abs=x=>t?100-x:x;e.t.scenario({time:1,team:t});
 const s=e.t.get();
 for(const p of s.players){p.x=abs(p.t===t?15:95);p.y=10+(p.id%11)*4;delete p.attackOrigin;delete p.attackSupport;delete p.intentAt;}
 s.owner.x=abs(50);s.owner.y=32;
 const mates=s.players.filter(p=>p.t===t),a=mates[6],b=mates[7];
 a.x=abs(56);a.y=23;b.x=abs(42);b.y=41;
 e.t.scenario({time:1,team:t});e.t.setDestinationTrace(true);
 return {e,s,a,b,abs,ball:{x:abs(50),y:32},rivals:s.players.filter(p=>p.t!==t)};
}
const results=[];
for(const t of [0,1]){
 const old=setup(t,true),now=setup(t),oldQ=old.e.t.attackingTargets(t,old.ball),q=now.e.t.attackingTargets(t,now.ball);
 assert.equal(old.abs(oldQ.get(old.a).x),42,'reproduce original forced retreat');
 assert.equal(now.abs(q.get(now.a).x),56,'connected advanced support keeps its height');
 assert.equal(now.abs(q.get(now.b).x),42,'rear safety option stays behind');
 assert(Math.hypot(q.get(now.a).x-q.get(now.b).x,q.get(now.a).y-q.get(now.b).y)>6);
 results.push({team:t,beforeForwardTarget:42,afterForwardTarget:56,safetyTarget:42});
 const first=JSON.stringify([...q].map(([p,q])=>[p.id,q]).sort((a,b)=>a[0]-b[0]));
 now.s.players.reverse();assert.equal(JSON.stringify([...now.e.t.attackingTargets(t,now.ball)].map(([p,q])=>[p.id,q]).sort((a,b)=>a[0]-b[0])),first);now.s.players.reverse();
 now.e.t.prepareDecision();const before=signature(now.e);now.e.t.enterFreeMode();now.e.t.enterDecisionMode();assert.equal(signature(now.e),before);
 now.e.t.movement(.02);assert(now.abs(now.a.x)>=56-1e-10,'actual movement does not retreat');
 now.e.t.restorePosition();assert.equal(signature(now.e),before);
 // Frontal pass blocked and holder pressured: preserve the original safety response.
 const blocked=setup(t);blocked.rivals[0].x=blocked.abs(53);blocked.rivals[0].y=27.5;
 blocked.rivals[1].x=blocked.abs(51);blocked.rivals[1].y=32;
 // This safety countercase requires the advanced support to observe the blocker.
 blocked.a.bodyAngle=Math.atan2(blocked.ball.y-blocked.a.y,blocked.ball.x-blocked.a.x);
 const blockedQ=blocked.e.t.attackingTargets(t,blocked.ball);
 assert([blocked.a,blocked.b].some(p=>blocked.abs(blockedQ.get(p).x)<50));
 assert(!blocked.e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage==='Conservar pareja conectada')));
 // A marked rear support must not be counted as a safe exit.
 const marked=setup(t);marked.rivals[0].x=marked.b.x;marked.rivals[0].y=marked.b.y+1;
 marked.e.t.attackingTargets(t,marked.ball);
 assert(!marked.e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage==='Conservar pareja conectada')));
 // Loss clears the offensive role; a flight receiver retains final priority.
 const rival=now.rivals[5];now.e.t.capture(rival,'test loss');now.e.t.movement(.02);
 assert(now.e.t.getDestinationTrace().rows.filter(r=>r.team===t).every(r=>!r.steps.some(s=>s.stage==='Conservar pareja conectada')));
 const flight=setup(t);flight.e.t.kickTo(flight.s.owner,flight.a.x,flight.a.y,'pass',flight.a);flight.e.t.movement(.02);
 const row=flight.e.t.getDestinationTrace().rows.find(r=>r.id===flight.a.id);assert.equal(row.source,'recepción');assert.equal(row.appliedX,row.steps.find(s=>s.stage==='Recepción anticipada'||s.stage==='Recepción al destino').x);
}
// A pending explicit order invalidates using its player as the preserved safety option.
const ordered=setup(0);assert(ordered.e.t.queueOffBall(ordered.b.id,'depth'));ordered.e.t.commitOffBall();ordered.e.t.attackingTargets(0,ordered.ball);
assert(!ordered.e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage==='Conservar pareja conectada')));
ordered.e.t.scenario({time:2,team:0});ordered.e.t.movement(.02);
assert(ordered.e.t.getDestinationTrace().rows.find(r=>r.id===ordered.b.id).steps.some(s=>s.stage==='Orden del entrenador'));
// Deterministic free play: finite states, pitch bounds and progress of the clock.
for(const seed of [17,73,109]){
 const e=env();e.t.scenario({time:0,team:0,seed});e.t.enterFreeMode();
 for(let k=0;k<3600;k++){e.t.update(1/60);const s=e.t.get();assert(s.players.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=64));assert(Number.isFinite(s.bx)&&Number.isFinite(s.by));}
 assert(e.t.get().elapsed>40,'free play clock progresses');
}
console.log('PASS: contextual supports, mirrored causal regression, blocked/marked countercases, orders, reception, loss, continuity and 3 × 60 s free play',JSON.stringify(results));
