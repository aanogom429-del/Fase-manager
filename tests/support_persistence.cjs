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
for(const t of [0,1]){
 const e=env();e.t.scenario({time:10,team:t});const ps=e.t.get().players,p=e.t.get().owner,q=ps.find(q=>q.t===t&&q.n===8),a=ps.find(q=>q.t===t&&q.n===10);
 p.x=50;p.y=32;q.x=t?40:60;q.y=32;p.bodyAngle=t?Math.PI:0;
 e.t.kickTo(p,q.x,q.y,'pass',q);e.t.capture(q,'recibe');
 assert.equal(p.supportReturnUntil,11.2,'completed short ground pass enables return support');
 const pick=()=>{p.attackSupport=0;a.attackSupport=0;return e.t.selectAttackSupports([p,a],q,x=>x===p?9.5:10)[0];};
 const rivals=ps.filter(r=>r.t!==t);
 p.rivalMemory=rivals.map(r=>({id:r.id,x:95,y:60,seenAt:10}));
 assert.equal(pick(),p,'recent passer wins near-equal vacancy');
 const clear=p.rivalMemory.map(m=>({...m}));
 p.rivalMemory[0].x=(p.x+q.x)/2;p.rivalMemory[0].y=32;
 assert.equal(pick(),a,'blocked return lane removes recent-passer bonus');
 p.rivalMemory=clear.map(m=>({...m}));p.rivalMemory[0].x=p.x;p.rivalMemory[0].y=p.y;
 assert.equal(pick(),a,'marked passer has no return bonus');
 p.rivalMemory=[];assert.equal(pick(),a,'unknown opposition cannot certify a safe return');
 p.rivalMemory=clear;

 e.t.scenario({time:11.21,team:t});assert.equal(pick(),a,'preference expires');
 p.supportReturnUntil=20;e.t.capture(ps.find(x=>x.t!==t),'intercepta');assert.equal(p.supportReturnUntil,undefined,'loss clears return support');
}
console.log('PASS: mirrored completed-pass preference, expiry and possession-loss reset');
