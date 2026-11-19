const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {distribute:distributeAttackSpace};');
for(const t of [0,1])for(const slot of [5,6]){
 const e=env(html);const select=e.nodes[t?'system-red':'system-blue'];select.value='4-2-3-1';select.onchange();e.t.scenario({time:10,team:t});
 const ps=e.t.team(t),p=ps[7],holder=ps[slot],x=n=>t?100-n:n;e.t.capture(holder,'fixture');holder.x=x(30);holder.y=32;p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;p.attackSupport=p.attackBalance=0;delete p.lineCoverFor;
 p.visualMemory=[{id:holder.id,x:holder.x,y:holder.y,seenAt:10}];p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:x(95),y:32,seenAt:10}));p.rivalMemory[0].x=x(45);
 const h=e.t.phaseRelations(null),anchor={x:p.x,y:p.y},run=(locked=new Map())=>h.distribute(new Map([[p,anchor]]),locked,new Map()).get(p);
 const q=run();assert.equal(q.x,anchor.x);assert.equal(Math.abs(q.y-32),8,'lateral connection at same height');assert.equal(run(new Map([[p,anchor]])).y,32);
 const old=p.y;for(let i=0;i<60;i++)e.t.advancePlayer(p,q.x,q.y,1/60);assert(Math.abs(p.y-q.y)<Math.abs(old-q.y));p.y=old;p.bodyAngle=t?Math.PI:0;
 p.visualMemory[0].seenAt=9;assert.equal(run().y,32);p.visualMemory[0].seenAt=10;
 p.attackBalance=1;assert.equal(run().y,32);p.attackBalance=0;
 p.visualMemory.push({id:ps[8].id,x:x(50),y:24,seenAt:10},{id:ps[10].id,x:x(50),y:40,seenAt:10});assert.equal(run().y,32,'occupied alternatives');p.visualMemory.splice(1);
 p.rivalMemory[0].x=x(95);assert.equal(run().y,32,'clear line needs no detour');p.rivalMemory[0].x=x(45);
 p.rivalMemory[1].x=x(50);p.rivalMemory[1].y=24;p.rivalMemory[2].x=x(50);p.rivalMemory[2].y=40;assert.equal(run().y,32,'both alternatives pressured');
}
console.log('PASS: both pivots/teams, blocked and open line, unavailable alternatives, physical motion, memory and priorities');
