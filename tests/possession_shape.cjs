const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const p of s.players){p.x=x(p.t===t?50:95);p.y=p.t===t?32:60;delete p.attackOrigin;delete p.attackSupport;}
 s.owner.x=x(60);s.owner.y=32;const ball={x:x(60),y:32};e.t.setDestinationTrace(true);
 e.t.attackingTargets(t,ball);assert(!e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage.startsWith('Arquitectura'))),'no instant formation reset at regain');
 e.t.scenario({time:12,team:t,seed:73});const targets=e.t.attackingTargets(t,ball);
 const rows=e.t.getDestinationTrace().rows,shape=rows.flatMap(r=>r.steps.filter(s=>s.stage.startsWith('Arquitectura')).map(q=>({...q,id:r.id})));
 const safety=shape.filter(q=>q.stage.includes('seguridad'));assert.equal(safety.length,2);
 assert(safety.every(q=>(q.x-ball.x)*(t?-1:1)<=-12));assert(safety.some(q=>q.y<ball.y)&&safety.some(q=>q.y>ball.y));
 assert(Math.max(...shape.map(q=>q.y))-Math.min(...shape.map(q=>q.y))>=40,'restore width from collapsed positions');
 assert(new Set(shape.map(q=>Math.round((q.x-ball.x)*(t?-1:1)))).size>=4,'multiple depths instead of a flat block');
 assert(s.players.filter(p=>p.t===t&&p!==s.owner).every(p=>p.x===x(50)),'target selection never teleports');
 const p=s.players.find(p=>p.id===safety[0].id),q=targets.get(p);for(let i=0;i<120;i++)e.t.advancePlayer(p,q.x,q.y,1/60);assert((p.x-x(50))*(t?-1:1)<0,'security destination produces retreat');
 e.t.prepareDecision();const before=JSON.stringify([...e.t.attackingTargets(t,ball)].map(([p,q])=>[p.id,q]));p.x=x(90);e.t.restorePosition();assert.equal(JSON.stringify([...e.t.attackingTargets(t,ball)].map(([p,q])=>[p.id,q])),before,'retry retains structural targets');
}
console.log('PASS: mirrored 4-3-3 reconstruction, staggered rear security, width/depth, physical movement and restore');
