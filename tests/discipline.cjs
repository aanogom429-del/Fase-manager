const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t=0,x=78,forward=true){
 const e=env();e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,b=s.players.find(q=>q.t!==t&&q.n===6);
 for(const q of s.players){q.x=50;q.y=60;q.cool=0;}
 p.x=t===0?x:100-x;p.y=32;p.driveX=p.x+(t===0?1:-1)*(forward?5:-5);p.driveY=32;
 b.x=p.x+(t===0?.8:-.8);b.y=32;return {e,p,b};
}
for(const t of [0,1]){
 const {e,p,b}=setup(t);e.t.prepareDecision();assert.equal(e.t.resolveChallenge(b,p,0),'foul');
 assert(b.sentOff);assert.equal(e.t.team(1-t).length,10);assert.equal(e.t.get().cardLog[0].color,'red');assert.equal(e.t.get().restart.kind,'direct');
 const frozen={x:b.x,y:b.y};e.t.movement(.1);assert.deepEqual({x:b.x,y:b.y},frozen);e.t.capture(b,'no debe controlar');assert.notEqual(e.t.get().owner,b);
 for(let k=0;k<5000&&e.t.get().restart;k++)e.t.advanceRestart(1/120);
 assert(e.t.get().flight);assert.notEqual(e.t.get().flight.from,b);assert.notEqual(e.t.get().flight.target,b);
 e.t.render();assert.equal(b.el.display,'none');assert(!e.t.opp(t).includes(b));
 e.t.enterFreeMode();e.nodes.pause.onclick();e.t.enterDecisionMode();assert(b.sentOff);assert.equal(e.t.get().cardLog.length,1);
 // A separate checkpoint proves restoration of disciplinary state.
 const retry=setup(t);retry.e.t.prepareDecision();retry.e.t.resolveChallenge(retry.b,retry.p,0);retry.e.t.restorePosition();assert(!retry.b.sentOff);assert.equal(retry.e.t.get().cardLog.length,0);assert.equal(retry.e.t.team(1-t).length,11);
 const pen=setup(t,90);pen.e.t.resolveChallenge(pen.b,pen.p,0);assert.equal(pen.b.yellow,1);assert(!pen.b.sentOff);assert.equal(pen.e.t.get().restart.kind,'penalty');
 const two=setup(t,90);two.b.yellow=1;two.e.t.resolveChallenge(two.b,two.p,0);assert(two.b.sentOff);assert.equal(two.e.t.get().cardLog[0].secondYellow,true);
 const back=setup(t,78,false);back.e.t.resolveChallenge(back.b,back.p,0);assert.equal(back.e.t.get().cardLog.length,0,'no automatic card for location alone');
 const spa=setup(t,65);assert.equal(spa.e.t.resolveChallenge(spa.b,spa.p,0),'advantage');assert.equal(spa.b.yellow,0);spa.e.t.recallAdvantage('sin beneficio');assert.equal(spa.b.yellow,1);
 const benefit=setup(t,65);benefit.e.t.resolveChallenge(benefit.b,benefit.p,0);benefit.e.t.confirmAdvantage('progresión');assert.equal(benefit.b.yellow,0,'SPA caution waived if advantage realised');
 const min=setup(t);for(const q of min.e.t.team(1-t).filter(q=>q.n!==1).slice(0,4))min.e.t.showCard(q,'red','fixture');assert.equal(min.e.t.team(1-t).length,7);assert(!min.e.t.get().matchStopped);
 const remaining=min.e.t.team(1-t).find(q=>q.n!==1);min.e.t.showCard(remaining,'red','fixture');assert(min.e.t.get().matchStopped);const clock=min.e.t.get().elapsed;min.e.t.enterFreeMode();min.e.t.update(1);assert.equal(min.e.t.get().elapsed,clock);assert.equal(min.e.t.get().restart,null);min.e.t.render();assert(min.e.nodes.mode.disabled);min.e.t.startSituation();assert.equal(min.e.t.team(1-t).length,11);assert(!min.e.t.get().matchStopped);assert(!min.e.nodes.mode.disabled);
}
console.log('PASS: tactical yellow/red, penalty reduction, second yellow, no card for location alone, SPA advantage/recall, active-player exclusion, movement, restarts, rendering, pause, retry, seven-player threshold and reset');
