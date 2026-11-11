const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined;
function setup(t,speed,hidden=false){
 const e=env(source);e.t.scenario({time:10,team:t,seed:73});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const q of s.players){q.x=50+dir*40;q.y=60;q.vx=0;q.vy=0;}
 p.x=50;p.y=32;p.bodyAngle=t?Math.PI:0;p.receivedAt=9.8;p.controlUntil=0;
 p.visualMemory=[];p.rivalMemory=[];p.scanUntil=0;
 const outlet=s.players.find(q=>q.t===t&&q.n===8);outlet.x=50;outlet.y=20;
 const r=s.players.find(q=>q.t!==t&&q.n===6);r.x=50+dir*(hidden?-8:8);r.y=32;r.vx=dir*speed;
 return {e,p,outlet,r};
}
for(const t of [0,1]){
 const c=setup(t,-8);c.e.t.chooseAction(c.p);
 assert.equal(c.e.t.get().flight?.target?.id??c.p.kickPreparation?.targetId,c.outlet.id,'release toward clear outlet before approaching pressure arrives');
 for(const speed of [0,8]){const c=setup(t,speed);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight,null,'stationary or receding pressure permits organizing');assert(!c.p.kickPreparation);assert.equal(c.e.t.get().owner,c.p);}
 for(const speed of [-8,8]){const c=setup(t,speed,true);assert(!c.e.t.perceives(c.p,c.r));c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight,null,'do not act on hidden velocity');assert(!c.p.kickPreparation);}
 const control=setup(t,-8);control.p.controlUntil=10.2;control.e.t.chooseAction(control.p);assert.equal(control.e.t.get().flight,null);assert(!control.p.kickPreparation,'physical control still required');
}
console.log('PASS: mirrored approaching, stationary, receding, hidden pressure and unfinished control');
