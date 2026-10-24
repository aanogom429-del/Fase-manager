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
 assert.equal(occupied.e.t.attackingTargets(t,occupied.ball).get(occupied.p).y,6,'choose small detour around occupied destination');
 const blocked=setup(t),r=blocked.s.players.find(q=>q.t!==t);r.x=blocked.x(80);r.y=10;
 const detour=blocked.e.t.attackingTargets(t,blocked.ball).get(blocked.p);
 assert.equal(detour.y,4,'choose shortest available bounded detour around observed blocker');
 assert(blocked.e.t.perceivedLane(blocked.p,detour,blocked.e.t.perceivedOpposition(blocked.p)).clearance>2.5);
 for(let i=0;i<60;i++)blocked.e.t.advancePlayer(blocked.p,detour.x,detour.y,1/60);
 assert(blocked.p.y<10,'detour produces physical lateral movement');
 const closed=setup(t),rs=closed.s.players.filter(q=>q.t!==t);
 for(const [i,y] of [4,6,10,14,18].entries()){rs[i].x=closed.x(80);rs[i].y=y;}
 assert(closed.e.t.attackingTargets(t,closed.ball).get(closed.p).y>18,'fallback when every short recovery route is blocked');
 for(const y of [4,10,18]){const hidden=setup(t);hidden.p.bodyAngle=t?Math.PI:0;const h=hidden.s.players.find(q=>q.t!==t);h.x=hidden.x(80);h.y=y;
 assert.equal(hidden.e.t.attackingTargets(t,hidden.ball).get(hidden.p).y,10,'unseen blocker does not influence perceived recovery route');}
 const legal=setup(t);legal.p.x=legal.x(74);
 assert.notEqual(legal.e.t.attackingTargets(t,legal.ball).get(legal.p).y,10,'do not freeze lateral movement of onside forward');
 const flight=setup(t);flight.e.t.kickTo(flight.s.owner,flight.p.x,flight.p.y,'pass',flight.p);
 assert.notEqual(flight.e.t.attackingTargets(t,flight.ball).get(flight.p).y,10,'no recovery restriction after kick');
}
console.log('PASS: mirrored onside recovery, physical movement, occupied destination, legal player and post-kick countercases');
