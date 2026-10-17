const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const team of [0,1])for(const kind of ['throw','corner','penalty'])for(const lower of [false,true]){
 const e=env();e.t.beginRestart(kind,team,lower?100:0,lower?64:0,'audit');
 for(let k=0;k<10000&&e.t.get().restart;k++)e.t.advanceRestart(1/120);
 assert(!e.t.get().restart,'restart must finish');
 for(let tick=0;tick<60;tick++){
  const before=e.t.get().players.map(p=>[p.x,p.y]);e.t.movement(1/120);
  e.t.get().players.forEach((p,i)=>assert(Math.hypot(p.x-before[i][0],p.y-before[i][1])<=p.speed/120+1e-9,kind+' must respect speed including return from boundary'));
 }
}
for(const cancel of ['all','one']){
 const e=env(),ps=e.t.get().players,a=ps.findIndex(p=>p.t===0&&p.n===11),b=ps.findIndex(p=>p.t===0&&p.n===10);
 e.t.queueOffBall(a,'width');e.t.queueOffBall(b,'depth');e.t.commitOffBall();e.t.prepareDecision();
 if(cancel==='all')e.nodes['offball-clear'].onclick();else{e.nodes['offball-player'].value=String(a);e.nodes['offball-remove'].onclick();}
 const expected=JSON.stringify(e.t.get().offBallOrders);
 e.t.playChoice('support');for(let i=0;i<60;i++)e.t.update(1/120);e.t.restorePosition();
 assert.equal(JSON.stringify(e.t.get().offBallOrders),expected,'retry must preserve '+cancel+' cancellation');
 e.t.playChoice('support');e.t.restorePosition();assert.equal(JSON.stringify(e.t.get().offBallOrders),expected,'repeated retry must not resurrect cancelled orders');
}
console.log('PASS: speed continuity after both-team throws/corners/penalties, individual/all cancellations and repeated retry');
