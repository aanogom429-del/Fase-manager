const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const pressured of [false,true]){
 const e=env();e.t.scenario({time:10,team:1-t});const s=e.t.get(),dir=t?-1:1,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(90);q.y=55;}
 const first=s.players.find(q=>q.t===t&&q.n===8),next=s.players.find(q=>q.t===t&&q.n===6);
 first.x=x(45);first.y=20;next.x=x(43);next.y=32;first.bodyAngle=Math.atan2(12,-2*dir);
 next.bodyAngle=t?Math.PI:0;e.t.capture(first,'recupera');e.t.chooseAction(first);
 assert.equal(e.t.get().flight?.target,next,'immediate safe release');e.t.capture(next,'recibe descarga');
 assert(next.reorderUntil>10);next.controlUntil=0;
 if(pressured){const r=s.players.find(q=>q.t!==t&&q.n===9);r.x=next.x+dir*2;r.y=next.y;}
 e.t.chooseAction(next);
 if(pressured)assert.doesNotMatch(e.nodes.status.textContent,/espera apoyos/);
 else{assert.match(e.nodes.status.textContent,/espera apoyos/);assert.equal(e.t.get().owner,next);
  e.t.scenario({time:12,team:t});e.t.chooseAction(next);assert.doesNotMatch(e.nodes.status.textContent,/espera apoyos/);}
 e.t.startSituation();assert(s.players.every(q=>q.reorderUntil===undefined&&q.receivedAt===undefined));
}
console.log('PASS: recovery, immediate outlet, team reorganization, conditional hold, pressure, timeout and reset on both teams');
