const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const beaten of [false,true]){
 const e=env();e.t.scenario({time:1,team:1-t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?10:90);q.y=55;}
 const p=s.players.find(q=>q.t===t&&q.n===3),old=s.players.find(q=>q.t!==t&&q.n===8),fresh=s.players.find(q=>q.t!==t&&q.n===9);
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;old.x=x(55);old.y=32;fresh.x=x(44);fresh.y=32;
 const ball={x:x(beaten?30:70),y:32},target=()=>e.t.defendingTarget(p,4,ball);
 target();p.bodyAngle=t?0:Math.PI;const recent=target();
 assert((recent.x-x(beaten?39.6:50))*(t?-1:1)>0,'equally recent nearer reference is retained');
 e.t.scenario({time:1.6,team:1-t});const chosen=target();
 const expected=beaten?47.2*.6+24*.4:47.2;
 assert(Math.abs(chosen.x-x(expected))<1e-8,'visible rival outranks uncertain slightly nearer memory');
 old.x=x(80);assert.equal(target().x,chosen.x,'hidden movement cannot alter choice');
 fresh.x=x(30);const distant=target();assert.notEqual(distant.x,chosen.x,'visible rival beyond local range does not displace local remembered reference');
 e.t.prepareDecision();const before=target();p.x=x(20);e.t.restorePosition();assert.equal(target().x,before.x,'retry preserves reference selection');
}
console.log('PASS: mirrored containment/retreat reference ranking, recency, local range, hidden state and restore');
