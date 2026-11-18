const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {read:flankComplement,distribute:distributeAttackSpace};');
for(const formation of ['4-4-2','3-5-2'])for(const t of [0,1])for(const top of [true,false]){
 const e=env(html);const id=t?'system-red':'system-blue';e.nodes[id].value=formation;e.nodes[id].onchange();e.t.scenario({time:10,team:t});
 const h=e.t.phaseRelations(null),ps=e.t.team(t),owner=e.t.get().owner,p=ps.find(p=>p.role==='fullback'),partner=ps[formation==='4-4-2'?10:7],wrong=ps[6];
 owner.x=t?80:20;owner.y=32;p.x=50;p.y=top?8:56;p.bodyAngle=t?Math.PI:0;p.attackSupport=0;p.attackBalance=0;delete p.lineCoverFor;
 const mem=(who,inside=false)=>{p.visualMemory=[{id:who.id,x:t?44:56,y:inside?(top?20:44):(top?8:56),seenAt:10},{id:owner.id,x:owner.x,y:32,seenAt:10}];};
 p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:t?0:100,y:32,seenAt:10}));
 const anchor={x:50,y:p.y};mem(partner);const q=h.read(p,anchor);assert(q,'recognize exterior midfielder / interior');assert.equal(q.y,top?20:44);
 const before=[p.x,p.y];const target=h.distribute(new Map([[p,anchor]]),new Map(),new Map()).get(p);assert.equal(target.y,q.y);assert.deepEqual([p.x,p.y],before);
 for(let n=0;n<60;n++)e.t.advancePlayer(p,target.x,target.y,1/60);assert(Math.abs(p.y-target.y)<Math.abs(before[1]-target.y),'physical approach, not just planned target');
 p.x=50;p.y=before[1];p.bodyAngle=t?Math.PI:0;mem(partner,true);assert.equal(h.read(p,anchor).y,top?8:56);
 mem(wrong);assert.equal(h.read(p,anchor),null,'central midfielder / pivot must not substitute for partner');
 mem(partner);p.visualMemory[0].seenAt=9;assert.equal(h.read(p,anchor),null);mem(partner);p.attackBalance=1;assert.equal(h.read(p,anchor),null);p.attackBalance=0;
 const manual={x:50,y:30};assert.equal(h.distribute(new Map([[p,manual]]),new Map([[p,manual]]),new Map()).get(p),manual);
}
console.log('PASS: eight system/team/side contexts, role discrimination, both alternatives, physical approach, stale perception and locked orders');
