const assert=require('node:assert/strict');
const {env}=require('./continuity.cjs');
const results=[];
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t});const s=e.t.get(),x=v=>t?100-v:v;
 const p=s.players.find(q=>q.t===t&&q.n===8),rivals=s.players.filter(q=>q.t!==t);
 p.x=x(56);p.y=32;p.visualMemory=[];
 p.rivalMemory=rivals.map((r,i)=>({id:r.id,x:x(i<3?52:95),y:i<3?26+i*6:60,seenAt:1}));
 const ball={x:x(40),y:32},base={x:x(56),y:32};
 const view=e.t.perceivedOpposition(p);
 // Reproduce the previous lateral-only search to compare the candidate on equal information.
 let old,oldScore=-Infinity;
 for(const offset of [0,-4,4,-8,8]){
  const q={x:base.x,y:base.y+offset};
  const score=Math.min(e.t.perceivedSpace(q,view),9)-Math.abs(offset)*.35-e.t.perceivedLane(ball,q,view).risk*.8;
  if(score>oldScore){old=q;oldScore=score;}
 }
 const q=e.t.perceivedSupportDestination(p,ball,base);
 assert.equal(q.x,x(48));assert.equal(q.y,32);
 assert((q.x-base.x)*(t?-1:1)<0,'cannot advance past previously applied offside limit');
 assert(e.t.perceivedLane(ball,q,view).risk<e.t.perceivedLane(ball,old,view).risk);
 const distanceBefore=Math.abs(p.x-q.x);
 for(let i=0;i<120;i++)e.t.advancePlayer(p,q.x,q.y,1/120);
 assert(Math.abs(p.x-q.x)<distanceBefore,'movement follows the new destination without teleporting');
 // Unobserved actual rival movement cannot alter the destination.
 for(const r of rivals){r.x=x(10);r.y=5;}
 assert.equal(JSON.stringify(e.t.perceivedSupportDestination(p,ball,base)),JSON.stringify(q));
 results.push({team:t,oldRisk:e.t.perceivedLane(ball,old,view).risk,newRisk:e.t.perceivedLane(ball,q,view).risk});
 p.rivalMemory=rivals.map(r=>({id:r.id,x:x(95),y:60,seenAt:1}));
 assert.equal(JSON.stringify(e.t.perceivedSupportDestination(p,ball,base)),JSON.stringify(base),'open lane keeps its height');
 p.rivalMemory=[];
 assert.equal(JSON.stringify(e.t.perceivedSupportDestination(p,ball,base)),JSON.stringify(base),'uncertainty alone must not invent a blocker');
}
console.log('PASS: mirrored escape from blocked support, lower perceived risk, actual movement, hidden-rival independence, open lane and missing-memory countercases',JSON.stringify(results));
