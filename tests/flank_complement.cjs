const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {read:flankComplement,distribute:distributeAttackSpace};');
for(const t of [0,1])for(const top of [true,false])for(const formation of ['4-3-3','4-2-3-1','3-4-3']){
 const e=env(html),h=e.t.phaseRelations(null);e.t.scenario({time:10,team:t});const ps=e.t.team(t),p=ps.find(p=>p.role==='fullback'),w=ps.find(p=>p.role==='winger');
 e.t.get().owner.x=t?80:20;e.t.get().owner.y=32;p.formation=formation;p.x=50;p.y=top?8:56;p.bodyAngle=t?Math.PI:0;p.attackSupport=0;p.attackBalance=0;delete p.lineCoverFor;
 const known=(y)=>{p.visualMemory=[{id:w.id,x:50+(t?-6:6),y,seenAt:10},{id:e.t.get().owner.id,x:e.t.get().owner.x,y:32,seenAt:10}];};
 p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:t?0:100,y:32,seenAt:10}));
 known(top?8:56);const anchor={x:50,y:p.y},q=h.read(p,anchor);assert(q);assert.equal(q.y,top?20:44);
 const before=[p.x,p.y],out=h.distribute(new Map([[p,anchor]]),new Map(),new Map()).get(p);assert.equal(out.y,q.y);assert.deepEqual([p.x,p.y],before);
 known(top?20:44);assert.equal(h.read(p,anchor).y,top?8:56);
 p.visualMemory[0].seenAt=9;assert.equal(h.read(p,anchor),null,'stale teammate');known(top?8:56);
 p.attackSupport=1;assert.equal(h.read(p,anchor),null);p.attackSupport=0;p.attackBalance=1;assert.equal(h.read(p,anchor),null);p.attackBalance=0;p.lineCoverFor=3;assert.equal(h.read(p,anchor),null);delete p.lineCoverFor;
 p.visualMemory.push({id:ps.find(r=>r!==p&&r!==w).id,x:50,y:q.y,seenAt:10});assert.equal(h.read(p,anchor),null,'occupied interior');known(top?8:56);
 p.rivalMemory[0].x=50;p.rivalMemory[0].y=q.y;assert.equal(h.read(p,anchor),null,'perceived pressure');p.rivalMemory=[];assert.equal(h.read(p,anchor),null,'unknown opposition');
 const explicit={x:50,y:15};assert.equal(h.distribute(new Map([[p,explicit]]),new Map([[p,explicit]]),new Map()).get(p),explicit);
}
console.log('PASS: 12 mirrored flank contexts, interior/width alternatives, stale/occupied/pressured cancellation, role priorities, locked orders and no teleport');
