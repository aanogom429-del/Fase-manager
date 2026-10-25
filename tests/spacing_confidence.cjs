const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?10:90);q.y=55;}
 const p=s.players.find(q=>q.t===t&&q.n===3),m=s.players.find(q=>q.t===t&&q.n===4);
 p.x=x(30);p.y=24;p.bodyAngle=t?0:Math.PI;m.x=x(29);m.y=24;
 e.t.observeTeammates(p);e.t.observeRivals(p);
 const confidence=()=>e.t.knownTeammates(p).find(q=>q.id===m.id)?.memoryConfidence;
 const target=()=>e.t.perceivedSupportDestination(p,{x:x(50),y:32},{x:x(30),y:24});
 assert.equal(confidence(),1);const fresh=target();assert.notEqual(fresh.y,24);
 p.bodyAngle=t?Math.PI:0;m.x=x(20);
 const lifetime=p.memoryDuration;
 e.t.scenario({time:1+lifetime*.5,team:t});e.t.observeTeammates(p);
 assert(Math.abs(confidence()-.5)<1e-8);
 assert.equal(e.t.knownTeammates(p).find(q=>q.id===m.id).x,x(29));
 e.t.scenario({time:1+lifetime*.99,team:t});e.t.observeTeammates(p);
 assert(Math.abs(confidence()-.01)<1e-8);assert.equal(target().y,24,'weak memory no longer forces a costly detour');
 e.t.prepareDecision();const before=confidence();e.t.restorePosition();assert.equal(confidence(),before);
 e.t.scenario({time:1+lifetime+.01,team:t});assert.equal(confidence(),undefined);
 p.bodyAngle=t?0:Math.PI;e.t.observeTeammates(p);assert.equal(confidence(),1,'fresh observation restores confidence');
}
console.log('PASS: mirrored confidence decay, last seen position, spacing response, expiry, refresh and restore');
