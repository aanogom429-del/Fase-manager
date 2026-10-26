const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
function setup(t,seed){
 const e=env(process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined);e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?5:90);q.y=q.t===t?5:50;}
 p.x=x(50);p.y=32;p.bodyAngle=Math.PI/2;
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),back=s.players.find(q=>q.t===t&&q.n===7),r=s.players.find(q=>q.t!==t);
 a.x=x(75);a.y=32;b.x=x(54);b.y=50;back.x=x(35);back.y=42;r.x=x(60);r.y=35;
 return {e,s,p,x,a,b,back,r};
}
for(const t of [0,1])for(let seed=1;seed<=16;seed++){
 const c=setup(t,seed);c.e.t.setDestinationTrace(true);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight?.target,c.b,'short clear progression beats exposed deep pass');
 assert(c.e.t.getDestinationTrace().rows.find(r=>r.id===c.p.id).steps.some(s=>s.stage.startsWith('Superación ·')),'phase describes the clear short option, not another risky pass');
 const open=setup(t,seed);open.r.x=open.x(90);open.r.y=50;open.e.t.chooseAction(open.p);assert.equal(open.e.t.get().flight?.target,open.a,'open deep progression remains available');
 const marked=setup(t,seed),r=marked.s.players.find(q=>q.t!==t&&q!==marked.r);r.x=marked.b.x;r.y=marked.b.y;marked.e.t.chooseAction(marked.p);assert.equal(marked.e.t.get().flight?.target,marked.back,'recycle when short progression is marked');
}
console.log('PASS: 32 mirrored seeded groups: short progression, open depth and conservation fallback');
