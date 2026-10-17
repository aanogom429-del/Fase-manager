const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env(),ps=e.t.get().players.filter(p=>p.t===t),f=ps[5],a=ps[1],b=ps[2],c=ps[3];
 const scores=new Map([[a,10],[b,9],[c,8]]),value=p=>scores.get(p)||0;
 const select=()=>e.t.selectAttackSupports(ps.filter(p=>!p.sentOff),f,value);
 assert.deepEqual(Array.from(select(),p=>p.id),[a.id,b.id]);
 scores.set(c,11);assert.deepEqual(Array.from(select(),p=>p.id),[a.id,b.id],'equal margin does not cause switch');
 scores.set(c,12.1);assert.deepEqual(Array.from(select(),p=>p.id),[c.id,b.id],'clear advantage replaces incumbent');
 c.sentOff=true;assert(!select().includes(c));
 assert(!e.t.selectAttackSupports(ps,a,value).includes(a),'carrier or receiver cannot remain support');
 assert(!select().some(p=>p.role==='keeper'));
 e.t.scenario({time:10,team:t});e.t.attackingTargets(t,{x:e.t.get().bx,y:e.t.get().by});e.t.prepareDecision();
 const saved=JSON.stringify(ps.map(p=>p.attackSupport));e.t.enterFreeMode();e.t.enterDecisionMode();assert.equal(JSON.stringify(ps.map(p=>p.attackSupport)),saved,'mode switch preserves assignments');
 for(const p of ps)p.attackSupport=0;e.t.restorePosition();assert.equal(JSON.stringify(ps.map(p=>p.attackSupport)),saved,'retry restores assignments');
 const rival=e.t.get().players.find(p=>p.t!==t&&p.role!=='keeper');e.t.capture(rival,'recupera');assert(e.t.get().players.every(p=>p.attackSupport===undefined),'loss clears assignments');
 e.t.attackingTargets(1-t,{x:rival.x,y:rival.y});e.t.beginRestart('throw',t,30,0,'test');assert(e.t.get().players.every(p=>p.attackSupport===undefined));
 e.t.startSituation();assert(e.t.get().players.every(p=>p.attackSupport===undefined));
}
console.log('PASS: support persistence, strict utility margin, replacement, invalid participants, mode continuity, retry, loss and restart');
