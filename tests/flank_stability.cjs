const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {read:flankComplement,distribute:distributeAttackSpace,time:n=>elapsed=n,save:()=>checkpoint=savePosition()};');
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-4-3','3-5-2'])for(const t of [0,1])for(const top of [true,false]){
 const e=env(html),id=t?'system-red':'system-blue';e.nodes[id].value=formation;e.nodes[id].onchange();e.t.scenario({time:10,team:t});
 const h=e.t.phaseRelations(null),ps=e.t.team(t),owner=e.t.get().owner,p=ps.find(p=>p.role==='fullback'),w=formation==='4-4-2'?ps[10]:formation==='3-5-2'?ps[7]:ps.find(p=>p.role==='winger');
 owner.x=t?80:20;owner.y=32;p.x=50;p.y=top?8:56;p.bodyAngle=t?Math.PI:0;p.attackSupport=0;p.attackBalance=0;delete p.lineCoverFor;
 const anchor={x:50,y:p.y},y=n=>top?n:64-n;
 function observe(n,time=10){h.time(time);p.visualMemory=[{id:w.id,x:t?44:56,y:y(n),seenAt:time},{id:owner.id,x:owner.x,y:32,seenAt:time}];p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:t?0:100,y:32,seenAt:time}));}
 observe(8);assert.equal(h.read(p,anchor).y,y(20));
 for(const time of [10.1,10.3,10.59]){observe(14,time);assert.equal(h.read(p,anchor)?.y,y(20),'retain at ambiguous boundary');}
 observe(14,10.61);assert.equal(h.read(p,anchor),null,'bounded duration, not renewed by ambiguity');
 observe(20,11);assert.equal(h.read(p,anchor).y,y(8));observe(14,11.2);assert.equal(h.read(p,anchor).y,y(8));
 observe(8,11.3);assert.equal(h.read(p,anchor).y,y(20),'clear opposite evidence switches immediately');
 h.save();observe(20,11.4);h.read(p,anchor);e.t.restorePosition();assert.equal(p.flankMode,'interior','snapshot not mutated');
 observe(14,11.4);p.rivalMemory[0].x=50;p.rivalMemory[0].y=y(20);assert.equal(h.read(p,anchor),null,'pressure cancels retained function');observe(14,11.5);assert.equal(h.read(p,anchor),null,'cancelled memory cannot revive');
 observe(8,11.6);h.read(p,anchor);observe(14,11.7);p.visualMemory[0].seenAt=11;assert.equal(h.read(p,anchor),null,'stale observation cancels retention');
 observe(8,11.8);h.read(p,anchor);observe(14,11.9);p.visualMemory.push({id:ps.find(r=>r!==p&&r!==w&&r!==owner).id,x:50,y:y(20),seenAt:11.9});assert.equal(h.read(p,anchor),null,'occupied retained target');
 observe(8,12);h.read(p,anchor);const manual={x:50,y:30};h.distribute(new Map([[p,manual]]),new Map([[p,manual]]),new Map());observe(14,12.1);assert.equal(h.read(p,anchor),null,'manual order clears memory');
 observe(8,13);h.read(p,anchor);e.nodes[id].onchange();assert.equal(p.flankMode,undefined,'formation clears memory');
 observe(8,14);h.read(p,anchor);e.t.capture(e.t.opp(t)[6],'test');assert.equal(p.flankMode,undefined,'turnover clears memory');
}
console.log('PASS: 20 mirrored contexts; bounded retention, immediate reassignment, pressure cancellation, snapshot, manual order, formation and turnover reset');
