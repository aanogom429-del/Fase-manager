const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
function setup(t,seed,age=.6){
 const e=env(process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined);e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?5:90);q.y=q.t===t?5:50;}
 p.x=x(50);p.y=32;p.bodyAngle=Math.PI/2;
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8);
 a.x=x(75);a.y=32;b.x=x(35);b.y=42;
 e.t.observeTeammates(p);e.t.observeRivals(p);p.bodyAngle=t?0:Math.PI;e.t.scenario({time:1+age,team:t,seed});return {e,s,p,a,b,x};
}
for(const t of [0,1])for(let seed=1;seed<=16;seed++){
 const c=setup(t,seed);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight?.target,c.b,'prefer current safe support over old deep reference');
 const moved=setup(t,seed);moved.a.x=moved.x(85);moved.e.t.chooseAction(moved.p);assert.equal(moved.e.t.get().flight?.target,moved.b,'hidden movement does not change choice');
 const fresh=setup(t,seed);fresh.p.bodyAngle=Math.PI/2;fresh.e.t.chooseAction(fresh.p);assert.equal(fresh.e.t.get().flight?.target,fresh.a,'looking again permits clear progression');
 const recent=setup(t,seed,.1);recent.e.t.chooseAction(recent.p);assert.equal(recent.e.t.get().flight?.target,recent.a,'briefly lost reference remains usable');
 const marked=setup(t,seed),r=marked.s.players.find(q=>q.t!==t);r.x=marked.b.x;r.y=marked.b.y;marked.e.t.chooseAction(marked.p);assert.notEqual(marked.e.t.get().flight?.target,marked.b,'do not conserve into observed marking');
}
console.log('PASS: mirrored conservation with aged memory, hidden movement, refresh, recent reference and marked support');
