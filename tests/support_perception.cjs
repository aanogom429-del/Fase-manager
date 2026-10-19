const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t});const s=e.t.get(),p=s.players.find(q=>q.t===t&&q.n===8),x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?10:95);q.y=60;}
 p.x=x(50);p.y=20;p.bodyAngle=Math.PI/2;
 const r=s.players.find(q=>q.t!==t);r.x=x(50);r.y=32;
 e.t.observeTeammates(p);e.t.observeRivals(p);
 const ball={x:x(30),y:32},base={x:x(50),y:32};
 const seen=e.t.perceivedSupportDestination(p,ball,base);assert.notEqual(seen.y,32,'avoids observed blocked support');
 p.bodyAngle=-Math.PI/2;r.x=x(90);e.t.scenario({time:1.2,team:t});e.t.observeRivals(p);
 const remembered=e.t.perceivedSupportDestination(p,ball,base);r.x=x(80);e.t.observeRivals(p);assert.equal(JSON.stringify(e.t.perceivedSupportDestination(p,ball,base)),JSON.stringify(remembered),'hidden movement does not alter local support');
 e.t.scenario({time:4,team:t});e.t.observeRivals(p);e.t.observeTeammates(p);assert.equal(e.t.perceivedSupportDestination(p,ball,base).y,32,'expired observations no longer locate blocker');
}
console.log('PASS: mirrored support adjustment from observed/remembered opposition, hidden-position independence and expiry');
