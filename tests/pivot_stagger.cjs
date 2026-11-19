const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {distribute:distributeAttackSpace};');
for(const t of [0,1])for(const slot of [5,6]){
 const e=env(html);e.nodes[t?'system-red':'system-blue'].value='4-2-3-1';e.nodes[t?'system-red':'system-blue'].onchange();e.t.scenario({time:10,team:t});
 const ps=e.t.team(t),p=ps[slot],other=ps[slot===5?6:5],holder=ps[2],x=n=>t?100-n:n;
 e.t.capture(holder,'fixture');holder.x=x(25);holder.y=32;p.x=x(35);p.y=slot===5?24:40;other.x=x(33);other.y=slot===5?40:24;p.bodyAngle=t?Math.PI:0;
 p.attackSupport=0;p.attackBalance=0;delete p.lineCoverFor;
 p.visualMemory=[holder,other].map(m=>({id:m.id,x:m.x,y:m.y,seenAt:10}));p.rivalMemory=e.t.opp(t).map(m=>({id:m.id,x:x(95),y:32,seenAt:10}));
 const h=e.t.phaseRelations(null),anchor={x:x(35),y:p.y},run=(locked=new Map())=>h.distribute(new Map([[p,anchor]]),locked,new Map()).get(p);
 const q=run();assert.equal(q.x,x(41),'advance complementary reference');const before=p.x;for(let i=0;i<60;i++)e.t.advancePlayer(p,q.x,q.y,1/60);assert(Math.abs(p.x-q.x)<Math.abs(before-q.x));p.x=before;
 assert.equal(run(new Map([[p,anchor]])).x,anchor.x,'manual priority');
 p.attackBalance=1;assert.equal(run().x,anchor.x);p.attackBalance=0;
 p.visualMemory[1].seenAt=9;assert.equal(run().x,anchor.x);p.visualMemory[1].seenAt=10;
 p.rivalMemory[0].x=x(41);p.rivalMemory[0].y=p.y;assert.equal(run().x,anchor.x,'pressure cancellation');
}
console.log('PASS: both pivots and directions, physical approach, manual/equilibrium priority, stale memory and pressure');
