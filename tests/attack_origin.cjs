const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:20,team:t});const s=e.t.get(),ball={x:s.bx,y:s.by};
 const positions=s.players.filter(p=>p.t===t).map(p=>[p,p.x,p.y]);
 e.t.attackingTargets(t,ball);
 for(const [p,x,y] of positions)assert.equal(JSON.stringify(p.attackOrigin),JSON.stringify({x,y,bx:ball.x,by:ball.y}));
 const original=JSON.stringify(positions.map(([p])=>p.attackOrigin));
 const signature=()=>JSON.stringify([...e.t.attackingTargets(t,ball)].map(([p,q])=>[p.n,q.x,q.y]));
 const guided=signature();e.t.enterFreeMode();assert.equal(signature(),guided,'mode change must not re-anchor or alter targets');
 e.nodes.pause.onclick();e.t.enterDecisionMode();assert.equal(signature(),guided);
 e.t.attackingTargets(t,{x:ball.x+2,y:ball.y+1});assert.equal(JSON.stringify(positions.map(([p])=>p.attackOrigin)),original,'reference stays fixed during possession');
 const receiver=s.players.find(p=>p.t===t&&p!==s.owner&&p.n!==1);e.t.capture(receiver,'recibe');assert.equal(JSON.stringify(positions.map(([p])=>p.attackOrigin)),original,'same-team reception preserves reference');
 const rival=s.players.find(p=>p.t!==t&&p.n===6);e.t.capture(rival,'recupera');assert(s.players.every(p=>!p.attackOrigin),'turnover invalidates references');
 e.t.attackingTargets(1-t,{x:rival.x,y:rival.y});assert(rival.attackOrigin);e.t.beginRestart('throw',t,30,0,'test');assert(s.players.every(p=>!p.attackOrigin),'restart resets references');
}
const e=env();e.t.attackingTargets(0,{x:e.t.get().bx,y:e.t.get().by});e.t.prepareDecision();
const before=JSON.stringify(e.t.get().players.map(p=>p.attackOrigin));e.t.playChoice('support');for(let i=0;i<90;i++)e.t.update(1/120);
e.t.restorePosition();assert.equal(JSON.stringify(e.t.get().players.map(p=>p.attackOrigin)),before,'retry restores reference');
e.t.startSituation();assert(e.t.get().players.every(p=>!p.attackOrigin),'new situation clears reference');
console.log('PASS: attacking origins for both teams, mode invariance, same-team reception, turnover, restart, retry and reset');
