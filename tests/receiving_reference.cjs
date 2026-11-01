const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return receivingReference;');
for(const t of [0,1]){
 const e=env(html);e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,r=e.t.team(t)[7],dir=t?-1:1;
 p.x=50;p.y=32;r.x=50+dir*10;r.y=32;p.bodyAngle=t?Math.PI:0;r.bodyAngle=t?0:Math.PI;
 const ref=e.t.phaseRelations(null);assert.equal(ref(t),null);
 e.t.kickTo(p,r.x,r.y,'pass',r);const f=e.t.get().flight;assert(f);const read=ref(t);
 assert.equal(read.reader,r);assert.equal(read.origin.x,f.tx);assert.equal(read.origin.bodyAngle,r.bodyAngle);assert(!e.t.get().owner);
 f.loft=5;assert.equal(ref(t),null);f.loft=0;r.bodyAngle=p.bodyAngle;assert.equal(ref(t),null,'unseen ball');
 r.bodyAngle=t?0:Math.PI;r.x+=dir*25;assert.equal(ref(t),null,'unreachable reception');
}
console.log('PASS: mirrored reachable visible ground-pass reference, no possession transfer, hidden/loft/unreachable exclusions');
