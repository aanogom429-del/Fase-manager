const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),x=v=>t?100-v:v,p=s.players.find(q=>q.t===t&&q.n===1);
 for(const q of s.players){q.x=x(q.t===t?50:80);q.y=50;}
 p.x=x(8);p.y=32;p.bodyAngle=t?Math.PI:0;
 const a=s.players.find(q=>q.t===t&&q.n===3);a.x=x(22);a.y=40;
 e.t.capture(p,'controla');p.controlUntil=0;
 return {e,s,p,a,x,rivals:s.players.filter(q=>q.t!==t)};
}
for(const t of [0,1]){
 const c=setup(t);c.e.t.chooseAction(c.p);let f=c.e.t.get().flight;
 assert.equal(f.target,c.a);assert.equal(f.kind,'pass');assert(!f.loft&&!f.keeperLong);
 assert.match(c.e.nodes.status.textContent,/inicia en corto/);
 assert(!c.e.t.get().offsidePhase.exempt,'open play is not exempt from offside');
 const pressure=setup(t);pressure.rivals[0].x=pressure.x(12);pressure.rivals[0].y=32;
 pressure.e.t.chooseAction(pressure.p);assert(pressure.e.t.get().flight.keeperLong,'pressure keeps long distribution');
 const marked=setup(t);marked.rivals[0].x=marked.a.x;marked.rivals[0].y=marked.a.y;
 marked.e.t.chooseAction(marked.p);assert(marked.e.t.get().flight.keeperLong,'no short pass to marked outlet');
 const lane=setup(t);lane.rivals[0].x=lane.x(16);lane.rivals[0].y=36;
 lane.e.t.chooseAction(lane.p);assert(lane.e.t.get().flight.keeperLong,'blocked lane prevents short pass');
 const far=setup(t);far.a.x=far.x(40);far.e.t.chooseAction(far.p);assert(far.e.t.get().flight.keeperLong,'no short-range outlet');
 const hidden=setup(t);hidden.p.bodyAngle=t?0:Math.PI;hidden.e.t.chooseAction(hidden.p);assert(hidden.e.t.get().flight.keeperLong,'unseen outlet not treated as available');
 const memory=setup(t);memory.e.t.observeTeammates(memory.p);for(const m of memory.p.visualMemory)m.seenAt=.5;
 memory.a.x=memory.x(2);memory.a.y=32;memory.e.t.chooseAction(memory.p);
 assert(memory.e.t.get().flight.keeperLong,'old remembered outlet is not certified for short distribution');
 const control=setup(t);control.p.controlUntil=2;control.e.t.chooseAction(control.p);assert.equal(control.e.t.get().flight,null,'respect reception time');
 for(let seed=1;seed<=16;seed++){const q=setup(t,seed);q.e.t.chooseAction(q.p);assert.equal(q.e.t.get().flight.target,q.a);assert(!q.e.t.get().flight.loft);}
}
console.log('PASS: mirrored short goalkeeper distribution, pressure/marked/blocked/far/hidden countercases, reception and 32 seeded choices');
