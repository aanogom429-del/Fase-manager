const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function received(t,face=true,loft=0){
 const e=env(),abs=x=>t?100-x:x;e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner;
 for(const q of s.players){q.x=abs(q.t===t?20:95);q.y=10+(q.id%11)*4;}
 p.x=abs(50);p.y=32;p.bodyAngle=face?(t?0:Math.PI):(t?Math.PI:0);
 const sender=s.players.find(q=>q.t===t&&q.n===7);sender.x=abs(30);sender.y=32;
 e.t.kickTo(sender,p.x,p.y,'pass',p);if(loft)e.t.get().flight.loft=loft;
 e.t.capture(p,'recibe');return {e,p,abs};
}
for(const t of [0,1]){
 const front=received(t),back=received(t,false);
 assert(Math.abs(front.p.controlDuration-.12)<1e-10);assert(Math.abs(back.p.controlDuration-.47)<1e-10);
 assert(back.p.controlUntil>front.p.controlUntil);assert.equal(back.p.bodyAngle,t?Math.PI:0,'capture does not instantly turn body');
 const passes=back.e.t.get().passes;back.e.t.chooseAction(back.p);assert.equal(back.e.t.get().passes,passes);assert.equal(back.e.t.get().flight,null,'cannot release automatically before ready');
 back.p.driveX=back.abs(60);const position=back.p.x,angle=back.p.bodyAngle;back.e.t.movement(.02);assert.equal(back.p.x,position,'control prevents premature carry');assert(Math.abs(back.p.bodyAngle-angle)<=Math.PI*.02+1e-10,'gradual preparation');
 const airborne=received(t,true,4);assert.equal(airborne.p.controlDuration,0,'aerial controls are outside this model');
 front.e.t.prepareDecision();const deadline=front.p.controlUntil;
 front.e.t.enterFreeMode();front.e.t.enterDecisionMode();assert.equal(front.p.controlUntil,deadline);
 for(let i=0;i<10;i++)front.e.tick();assert.equal(front.e.t.get().elapsed,1,'pause does not consume reception time');
 front.e.t.render();assert(front.e.nodes['control-status'].textContent.includes('prepara la recepción'));
}
// The selected guided pass waits, uses the selected player and executes exactly once.
const g=received(0,false);g.e.t.prepareDecision();const until=g.p.controlUntil,angle=g.p.bodyAngle;
g.e.t.playChoice('support');const a=g.e.t.get().techAction;assert.equal(a.kind,'receiveWait');const target=a.option.n;
const before=g.e.t.get().passes;g.e.t.advanceTechnique(.01);assert.equal(g.e.t.get().passes,before);
g.e.t.scenario({time:until+.001,team:0});g.e.t.advanceTechnique(.01);assert.equal(g.e.t.get().passes,before+1);assert.equal(g.e.t.get().flight.target.n,target);
g.e.t.advanceTechnique(.01);assert.equal(g.e.t.get().passes,before+1);
g.e.t.restorePosition();assert.equal(g.p.controlUntil,until);assert.equal(g.p.bodyAngle,angle);assert.equal(g.e.t.get().elapsed,1);
g.e.t.playChoice('support');assert.equal(g.e.t.get().techAction.kind,'receiveWait','retry retains delay');
// Losing possession cancels a waiting instruction; it cannot execute for another holder.
const loss=received(0,false);loss.e.t.prepareDecision();loss.e.t.playChoice('support');const rival=loss.e.t.get().players.find(p=>p.t===1&&p.n===6);
loss.e.t.capture(rival,'roba');const count=loss.e.t.get().passes;loss.e.t.advanceTechnique(.01);assert.equal(loss.e.t.get().techAction,null);assert.equal(loss.e.t.get().passes,count);
// A restart cancels the queued action; a new situation clears preparation state.
const restart=received(0,false);restart.e.t.prepareDecision();restart.e.t.playChoice('support');restart.e.t.beginRestart('throw',1,50,0,'test');assert.equal(restart.e.t.get().techAction,null);
restart.e.t.startSituation();assert(restart.e.t.get().players.every(p=>p.controlUntil===0));
// A wall return must wait for the target's control, then release once.
const wall=received(0);wall.p.controlUntil=0;const targetP=wall.e.t.get().players.find(p=>p.t===0&&p.n===8);targetP.x=60;targetP.y=32;
wall.e.t.executeTechnique({kind:'wall',n:8,title:'Pared'});wall.e.t.capture(targetP,'recibe');const start=wall.e.t.get().passes;wall.e.t.update(.01);assert.equal(wall.e.t.get().passes,start);assert.equal(wall.e.t.get().techAction.phase,0);
for(let i=0;i<80&&wall.e.t.get().passes===start;i++)wall.e.t.update(.01);assert.equal(wall.e.t.get().passes,start+1,'wall returns after preparation');
console.log('PASS: mirrored reception cost, waiting actions, movement/turning, pause, retry, cancellation, wall return and aerial exclusion');
