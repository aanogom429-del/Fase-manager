const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(team=0){
 const e=env();e.t.scenario({time:10,team});const s=e.t.get(),p=s.owner,b=s.players.find(q=>q.t!==team&&q.n===6);
 for(const q of s.players){q.x=50;q.y=60;q.cool=0;}
 p.x=team===0?65:35;p.y=32;b.x=p.x+(team===0?.8:-.8);b.y=32;
 assert.equal(e.t.resolveChallenge(b,p,0),'advantage');return {e,p,b};
}
for(const team of [0,1]){
 const {e,p,b}=setup(team),original=p.x;let s=e.t.get();assert.equal(s.restart,null);assert.equal(s.owner,p);assert.equal(s.foulCalls[1-team],1);
 e.t.prepareDecision();const snapshot=JSON.stringify(s.advantage);for(let k=0;k<10;k++)e.tick();assert.equal(JSON.stringify(e.t.get().advantage),snapshot,'paused window does not expire');
 e.t.enterFreeMode();e.nodes.pause.onclick();e.t.enterDecisionMode();assert.equal(JSON.stringify(e.t.get().advantage),snapshot,'mode switch preserves window');
 e.t.capture(b,'recupera');s=e.t.get();assert.equal(s.restart.kind,'direct');assert.equal(s.restart.x,original);assert.equal(s.lastAdvantage.status,'recalled');assert.equal(s.foulCalls[1-team],1);
 e.t.restorePosition();assert.equal(JSON.stringify(e.t.get().advantage),snapshot,'retry restores pending advantage');
 p.x=original+(team===0?4:-4);b.x=50;e.t.assessAdvantage();assert.equal(e.t.get().advantage,null);assert.equal(e.t.get().lastAdvantage.status,'confirmed');
 e.t.capture(b,'recupera después');assert.equal(e.t.get().restart,null,'later loss cannot undo realised benefit');

 const expired=setup(team);expired.e.t.update(2.51);assert.equal(expired.e.t.get().restart.kind,'direct');assert(expired.e.t.get().elapsed>12.5,'clock is not rewound');
 const out=setup(team);out.e.t.adjudicateExit({side:'top',x:70,y:-.11,z:0});assert.equal(out.e.t.get().restart.kind,'direct');
 const goal=setup(team);goal.e.t.adjudicateExit({side:team===0?'right':'left',x:team===0?100.11:-.11,y:32,z:0});assert.equal(goal.e.t.get().score[team],(team===0?2:1)+1);assert.equal(goal.e.t.get().lastAdvantage.status,'confirmed');
 const shot=setup(team);shot.p.x=team===0?78:22;shot.b.x=50;shot.e.t.kickTo(shot.p,team===0?102:-2,45,'shot');assert.equal(shot.e.t.get().lastAdvantage.status,'confirmed');shot.e.t.adjudicateExit({side:team===0?'right':'left',x:team===0?100.11:-.11,y:45,z:0});assert.equal(shot.e.t.get().restart.kind,'goalKick','missed opportunity is not a free second chance');
 const badShot=setup(team);badShot.e.t.kickTo(badShot.p,team===0?102:-2,50,'shot');assert(badShot.e.t.get().advantage,'distant shot alone is not sufficient');
 const offside=setup(team),mate=offside.e.t.get().players.find(q=>q.t===team&&q.n===9);mate.x=team===0?95:5;mate.y=20;offside.e.t.kickTo(offside.p,mate.x,mate.y,'pass',mate);offside.e.t.capture(mate,'recibe');assert.equal(offside.e.t.get().restart.kind,'direct','earlier foul precedes offside intervention');assert.equal(offside.e.t.get().offsideCalls[team],0);
 const second=setup(team);second.p.x=team===0?90:10;second.b.x=second.p.x+(team===0?.8:-.8);second.b.cool=0;assert.equal(second.e.t.resolveChallenge(second.b,second.p,0),'foul');assert.equal(second.e.t.get().restart.kind,'penalty');assert.equal(second.e.t.get().foulCalls[1-team],2);
 second.e.t.startSituation();assert.equal(second.e.t.get().advantage,null);assert.equal(second.e.t.get().lastAdvantage,null);
}
console.log('PASS: mirrored advantage, no benefit/expiry, original location, clock, possession loss, boundary, goal, shot opportunity, offside priority, second foul, pause, modes, retry and reset');
