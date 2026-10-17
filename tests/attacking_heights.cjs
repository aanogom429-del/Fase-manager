const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,deep=true){
 const e=env();e.t.scenario({time:0,team:t});const s=e.t.get(),abs=x=>t?100-x:x;
 for(const p of s.players){if(p.t!==t){p.x=abs(95);continue;}p.x=abs(p.role==='keeper'?5:75);p.y=10+(p.id%11)*4;delete p.attackOrigin;}
 s.owner.x=abs(50);s.owner.y=32;const m=s.players.filter(p=>p.t===t);
 m[1].x=abs(48);m[1].y=23;m[4].x=abs(54);m[4].y=41;
 m[2].x=abs(deep?20:60);m[3].x=abs(deep?25:65);
 return {e,s,m,abs,ball:{x:abs(50),y:32}};
}
for(const t of [0,1]){
 const {e,s,m,abs,ball}=setup(t),q=e.t.attackingTargets(t,ball);
 assert.equal(abs(q.get(m[6]).x),75,'advanced midfielder is not forced behind ball');
 assert.equal(abs(q.get(m[7]).x),75,'second advanced midfielder can preserve progression height');
 assert.equal(abs(q.get(m[2]).x),20);assert.equal(abs(q.get(m[3]).x),25);
 const b=setup(t,false),r=b.e.t.attackingTargets(t,b.ball);
 assert.equal(b.abs(r.get(b.m[2]).x),37,'deepest eligible player restores balance');
 assert.equal(b.abs(r.get(b.m[3]).x),37,'second eligible player restores balance');
 assert.equal(b.abs(r.get(b.m[6]).x),75,'balance does not drag the whole block back');
 const before=JSON.stringify([...q].map(([p,q])=>[p.id,q]).sort((a,b)=>a[0]-b[0]));
 s.players.reverse();assert.equal(JSON.stringify([...e.t.attackingTargets(t,ball)].map(([p,q])=>[p.id,q]).sort((a,b)=>a[0]-b[0])),before,'array order does not assign balance');
 s.players.reverse();m[2].sentOff=true;assert(!e.t.attackingTargets(t,ball).has(m[2]),'sent-off player cannot provide balance');
 e.t.prepareDecision();const saved=s.players.map(p=>[p.x,p.y]);e.t.movement(1/120);
 for(let i=0;i<s.players.length;i++)assert(Math.hypot(s.players[i].x-saved[i][0],s.players[i].y-saved[i][1])<=s.players[i].speed/120+1e-9);
 e.t.restorePosition();assert.equal(JSON.stringify(s.players.map(p=>[p.x,p.y])),JSON.stringify(saved));
}
console.log('PASS: mirrored progression heights, two balance players, order independence, expulsion, speed limits and retry');
