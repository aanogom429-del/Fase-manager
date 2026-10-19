const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t});const s=e.t.get(),x=v=>t?100-v:v,ball={x:x(50),y:32};
 const [a,b,c]=s.players.filter(p=>p.t===t&&[2,3,4].includes(p.n));
 for(const p of [a,b,c]){p.role='midfielder';p.x=x(45);p.rivalMemory=[];delete p.attackSupport;}
 a.y=23;b.y=41;c.y=32;const rival=s.players.find(p=>p.t!==t);rival.x=x(47);rival.y=32;
 const value=p=>e.t.perceivedSupportReading(p,ball).value,select=()=>e.t.selectAttackSupports([a,b,c],s.owner,value);
 assert(select().includes(c),'nearest candidate initially offers support under uncertainty');
 c.rivalMemory=[{id:rival.id,x:x(47),y:32,seenAt:1}];const seen=value(c);
 assert(!select().includes(c),'observed blocked line changes support assignment');
 rival.x=x(90);rival.y=60;assert.equal(value(c),seen,'unobserved real movement cannot improve candidate valuation');
 e.t.scenario({time:4,team:t});assert(value(c)>seen,'expiry removes localized stale blocker while retaining uncertainty');assert(!select().includes(c),'small recovered advantage does not cause role churn');
 c.x=x(48);assert(select().includes(c),'clear recovered advantage can reclaim support role');
 const unknown=e.t.perceivedSupportReading(a,ball);assert(unknown.uncertainty===1&&unknown.lane>0,'unknown is not a guaranteed clear line');
}
console.log('PASS: mirrored perception-driven assignment, hidden-rival independence, expiry, replacement and uncertainty');
