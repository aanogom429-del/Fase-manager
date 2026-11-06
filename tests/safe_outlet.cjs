const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function choose(c){
 c.e.t.chooseAction(c.p);
 for(let frame=0;frame<120&&c.p.kickPreparation&&!c.e.t.get().flight;frame++)c.e.t.update(1/60);
 assert(!c.p.kickPreparation,'selected action completes body preparation');
 return c.e.t.get().flight;
}
function setup(t,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=Math.PI/2;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?10:90);q.y=q.t===t?5:50;}
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),rs=s.players.filter(q=>q.t!==t);
 a.x=x(75);a.y=32;b.x=x(35);b.y=42;rs[0].x=x(52);rs[0].y=32;rs[1].x=x(60);rs[1].y=32;
 return {e,s,p,x,a,b,rs};
}
for(const t of [0,1])for(let seed=1;seed<=16;seed++){
 const c=setup(t,seed);choose(c);assert.equal(c.e.t.get().flight.target,c.b,'recycle instead of forcing blocked advance under pressure');

 const marked=setup(t,seed);marked.rs[2].x=marked.b.x;marked.rs[2].y=marked.b.y;
 choose(marked);assert.notEqual(marked.e.t.get().flight?.target,marked.b,'do not label marked outlet safe');
 const open=setup(t,seed);open.rs[0].x=open.x(90);open.rs[0].y=50;open.rs[1].x=open.x(90);open.rs[1].y=50;
 choose(open);assert.equal(open.e.t.get().flight.target,open.a,'retain open progression');
 const hidden=setup(t,seed);hidden.p.bodyAngle=t?Math.PI:0;
 choose(hidden);assert.notEqual(hidden.e.t.get().flight?.target,hidden.b,'do not invent unseen safety outlet');
 const memory=setup(t,seed);memory.e.t.observeTeammates(memory.p);memory.p.bodyAngle=t?Math.PI:0;
 memory.e.t.scenario({time:1.1,team:t});memory.e.t.observeTeammates(memory.p);const remembered=memory.e.t.knownTeammates(memory.p).find(m=>m.id===memory.b.id);assert(remembered&&remembered.memoryAge>0,'safety candidate is remembered, not freshly observed');
 const memoryFlight=choose(memory);assert(memoryFlight?.execution,'memory countercase executes a pass');assert.notEqual(memoryFlight.target,memory.b,'stale support does not receive fresh-safety priority');

 const calm=setup(t,seed);calm.rs[0].x=calm.x(90);calm.rs[0].y=50;assert.equal(choose(calm)?.target,calm.b,'safe circulation remains available without immediate pressure');
}
console.log('PASS: 32 mirrored seeded groups: pressured recycling, marked/unseen rejection, open progression, stale memory and calm circulation');
