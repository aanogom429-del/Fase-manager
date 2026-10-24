const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const p of s.players){p.x=x(p.t===t?50:75);p.y=55;delete p.attackOrigin;delete p.attackSupport;}
 const p=s.players.find(q=>q.t===t&&q.role==='striker');p.x=x(90);p.y=10;p.bodyAngle=t?0:Math.PI;
 s.owner.x=x(70);s.owner.y=32;
 for(const [n,y] of [[7,23],[8,41]]){const m=s.players.find(q=>q.t===t&&q.n===n);m.x=x(65);m.y=y;}
 e.t.setDestinationTrace(true);return {e,s,p,x,ball:{x:x(70),y:32}};
}
for(const t of [0,1]){
 const c=setup(t),q=c.e.t.attackingTargets(t,c.ball).get(c.p);
 assert(Math.abs(q.x-c.x(74.3))<1e-8);assert.equal(q.y,10,'recover along current height');
 assert.equal(c.p.x,c.x(90),'destination does not teleport player');
 for(let i=0;i<60;i++)c.e.t.advancePlayer(c.p,q.x,q.y,1/60);
 assert((c.p.x-c.x(90))*(t?-1:1)<0,'actual movement toward legal position');
 const occupied=setup(t),m=occupied.s.players.find(q=>q.t===t&&q.n===4);m.x=occupied.x(74.3);m.y=10;
 assert.notEqual(occupied.e.t.attackingTargets(t,occupied.ball).get(occupied.p).y,10,'do not assign occupied recovery destination');
 const blocked=setup(t),r=blocked.s.players.find(q=>q.t!==t);r.x=blocked.x(80);r.y=10;
 assert.notEqual(blocked.e.t.attackingTargets(t,blocked.ball).get(blocked.p).y,10,'do not force recovery through an observed opponent');
 const legal=setup(t);legal.p.x=legal.x(74);
 assert.notEqual(legal.e.t.attackingTargets(t,legal.ball).get(legal.p).y,10,'do not freeze lateral movement of onside forward');
 const flight=setup(t);flight.e.t.kickTo(flight.s.owner,flight.p.x,flight.p.y,'pass',flight.p);
 assert.notEqual(flight.e.t.attackingTargets(t,flight.ball).get(flight.p).y,10,'no recovery restriction after kick');
}
console.log('PASS: mirrored onside recovery, physical movement, occupied destination, legal player and post-kick countercases');
