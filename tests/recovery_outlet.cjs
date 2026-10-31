const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const mode of ['recovery','marked','normal']){
 const e=env();e.t.scenario({time:10,team:mode==='normal'?t:1-t});
 const s=e.t.get(),p=s.players.find(q=>q.t===t&&q.n===6),dir=t?-1:1;
 for(const q of s.players){q.x=t?5:95;q.y=60;}
 p.x=50;p.y=32;p.bodyAngle=Math.PI/2;p.controlUntil=0;
 const mate=s.players.find(q=>q.t===t&&q.n===8);mate.x=50-dir*4;mate.y=44;
 if(mode==='marked'){const r=s.players.find(q=>q.t!==t);r.x=mate.x;r.y=mate.y;}
 if(mode!=='normal')e.t.capture(p,'recupera');
 e.t.chooseAction(p);
 if(mode==='marked'){
  assert.equal(e.t.get().flight,null);assert(!p.kickPreparation);
  assert.equal(p.driveX,p.x);assert.equal(p.driveY,p.y);assert(p.scanUntil>10);
 }else{
  const receiver=e.t.get().flight?.target||s.players.find(q=>q.id===p.kickPreparation?.targetId);
  assert.equal(receiver,mate,'safe outlet preferred to carry');
  assert.match(e.nodes.status.textContent,mode==='recovery'?/descarga tras recuperar/:/continuidad antes/);
 }
 e.t.startSituation();assert(s.players.every(q=>q.recoveryUntil===undefined));
}
console.log('PASS: mirrored recovery discharge, marked outlet excluded, scanning instead of immediate run, normal pass priority and reset');
