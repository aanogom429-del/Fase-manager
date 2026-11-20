const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {distribute:distributeAttackSpace,time:n=>elapsed=n};');
for(const t of [0,1])for(const slot of [5,6]){
 const e=env(html);const select=e.nodes[t?'system-red':'system-blue'];select.value='4-2-3-1';select.onchange();e.t.scenario({time:10,team:t});
 const ps=e.t.team(t),p=ps[7],holder=ps[slot],x=n=>t?100-n:n;e.t.capture(holder,'fixture');holder.x=x(30);holder.y=32;p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;p.attackSupport=p.attackBalance=0;delete p.lineCoverFor;
 p.visualMemory=[{id:holder.id,x:holder.x,y:holder.y,seenAt:10}];p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:x(95),y:32,seenAt:10}));p.rivalMemory[0].x=x(45);
 const h=e.t.phaseRelations(null),anchor={x:p.x,y:p.y},run=(locked=new Map())=>h.distribute(new Map([[p,anchor]]),locked,new Map()).get(p);
 const q=run();assert.equal(q.x,anchor.x);assert.equal(Math.abs(q.y-32),8,'lateral connection at same height');
 const shifted={x:anchor.x,y:33};const next=h.distribute(new Map([[p,shifted]]),new Map(),new Map()).get(p);assert.equal(next.y,q.y,'preserve valid target despite anchor drift');
 h.time(10.81);for(const m of [...p.visualMemory,...p.rivalMemory])m.seenAt=10.81;const expired=h.distribute(new Map([[p,shifted]]),new Map(),new Map()).get(p);assert.notEqual(expired.y,q.y,'expiry forces re-evaluation');
 p.rivalMemory[1].x=q.x;p.rivalMemory[1].y=expired.y;const cancelled=h.distribute(new Map([[p,shifted]]),new Map(),new Map()).get(p);assert.notEqual(cancelled.y,expired.y,'pressure invalidates remembered target');
 h.distribute(new Map([[p,anchor]]),new Map([[p,anchor]]),new Map());assert.equal(p.midAt,undefined,'manual clears persistence');
}
console.log('PASS: mirrored target retention, pressure cancellation and manual reset');
