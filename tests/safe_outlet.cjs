const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=Math.PI/2;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?10:90);q.y=q.t===t?5:50;}
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),rs=s.players.filter(q=>q.t!==t);
 a.x=x(75);a.y=32;b.x=x(35);b.y=42;rs[0].x=x(52);rs[0].y=32;rs[1].x=x(60);rs[1].y=32;
 return {e,s,p,x,a,b,rs};
}
for(const t of [0,1]){
 const c=setup(t);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight.target,c.b,'recycle instead of forcing blocked advance under pressure');
 assert.match(c.e.nodes.status.textContent,/busca conservar/);
 const marked=setup(t);marked.rs[2].x=marked.b.x;marked.rs[2].y=marked.b.y;
 marked.e.t.chooseAction(marked.p);assert.notEqual(marked.e.t.get().flight?.target,marked.b,'do not label marked outlet safe');
 const open=setup(t);open.rs[0].x=open.x(90);open.rs[0].y=50;open.rs[1].x=open.x(90);open.rs[1].y=50;
 open.e.t.chooseAction(open.p);assert.equal(open.e.t.get().flight.target,open.a,'retain open progression');
 const hidden=setup(t);hidden.p.bodyAngle=t?Math.PI:0;
 hidden.e.t.chooseAction(hidden.p);assert.notEqual(hidden.e.t.get().flight?.target,hidden.b,'do not invent unseen safety outlet');
 const memory=setup(t);memory.e.t.observeTeammates(memory.p);memory.p.bodyAngle=t?Math.PI:0;
 memory.e.t.scenario({time:1.1,team:t});memory.e.t.chooseAction(memory.p);
 assert(!memory.e.nodes.status.textContent.includes('busca conservar'),'old observation is not certified as a fresh safety outlet');
 const calm=setup(t);calm.rs[0].x=calm.x(90);calm.rs[0].y=50;calm.e.t.chooseAction(calm.p);
 assert(!calm.e.nodes.status.textContent.includes('busca conservar'),'no forced recycling without immediate pressure');
 for(let seed=1;seed<=16;seed++){const q=setup(t,seed);q.e.t.chooseAction(q.p);assert.equal(q.e.t.get().flight.target,q.b);}
}
console.log('PASS: mirrored safe recycling, marked/unseen outlet rejection, open progression and 32 seeded pressured decisions');
