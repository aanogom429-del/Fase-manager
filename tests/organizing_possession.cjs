const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,deep=false,seed=73){
 const e=env();e.t.scenario({time:1,team:t,seed});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v,base=deep?25:50;
 p.x=x(base);p.y=32;p.bodyAngle=Math.PI/2;p.controlUntil=0;
 for(const q of s.players)if(q!==p){q.x=x(q.t===t?5:90);q.y=q.t===t?5:50;}
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),rs=s.players.filter(q=>q.t!==t);
 a.x=x(base+25);a.y=32;b.x=x(base-15);b.y=42;rs[0].x=x(base+10);rs[0].y=32;
 if(deep){rs[1].x=x(base+2);rs[1].y=32;}
 return {e,s,p,x,a,b,rs};
}
for(const t of [0,1])for(const deep of [false,true])for(let seed=1;seed<=16;seed++){
 const c=setup(t,deep,seed);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight?.target,c.b,'circulate calmly or escape pressure in initiation');
 const marked=setup(t,deep,seed);marked.rs[2].x=marked.b.x;marked.rs[2].y=marked.b.y;marked.e.t.chooseAction(marked.p);assert.notEqual(marked.e.t.get().flight?.target,marked.b,'reject marked conservation');
 const open=setup(t,deep,seed);for(const r of open.rs){r.x=open.x(90);r.y=50;}open.e.t.chooseAction(open.p);assert.equal(open.e.t.get().flight?.target,open.a,'retain clear progression');
 const hidden=setup(t,deep,seed);hidden.p.bodyAngle=t?Math.PI:0;hidden.e.t.chooseAction(hidden.p);assert.notEqual(hidden.e.t.get().flight?.target,hidden.b,'do not invent a hidden outlet');
}
console.log('PASS: 64 direction/zone/seed groups, each checking conservation, marked/unseen outlets and clear progression');
