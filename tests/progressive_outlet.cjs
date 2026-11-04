const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=Math.PI/2;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?10:90);q.y=q.t===t?5:55;}
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),rs=s.players.filter(q=>q.t!==t);
 a.x=x(74);a.y=32;b.x=x(54);b.y=50;rs[0].x=x(48);rs[0].y=32;rs[1].x=x(60);rs[1].y=32;
 return {e,p,a,b,rs,x};
}
function chosenReceiver(c){
 c.e.t.chooseAction(c.p);
 // A selected pass may require a body turn before the ball leaves the foot.
 for(let frame=0;frame<120&&c.p.kickPreparation&&!c.e.t.get().flight;frame++)c.e.t.update(1/60);
 assert(!c.p.kickPreparation,'selected action finishes its preparation');
 return c.e.t.get().flight?.target;
}
for(const t of [0,1]){
 const c=setup(t);assert.equal(chosenReceiver(c),c.b,'prefer open progressive outlet to blocked larger advance');
 const open=setup(t);open.rs[1].y=60;assert.equal(chosenReceiver(open),open.a,'retain deeper open pass');
 const marked=setup(t);marked.rs[2].x=marked.b.x;marked.rs[2].y=marked.b.y;assert.notEqual(chosenReceiver(marked),marked.b,'marked outlet is not preferred');
 const hidden=setup(t);hidden.p.bodyAngle=-Math.PI/2;assert.notEqual(chosenReceiver(hidden),hidden.b,'unseen progressive outlet is not invented');
}
console.log('PASS: mirrored progressive outlet, open deeper pass and marked-receiver countercase');
