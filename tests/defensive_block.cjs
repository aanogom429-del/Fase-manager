const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {block:defensiveBlockTargets,line:positionalLine};');
for(const t of [0,1])for(const system of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null);e.t.enterFreeMode();e.t.scenario({time:10,team:1-t});
 const id=t?'system-red':'system-blue';e.nodes[id].value=system;e.nodes[id].onchange();
 const mates=e.t.team(t).filter(p=>p.n>1),order=[...mates].sort((a,b)=>b.n-a.n),ball={x:50,y:32};
 const before=JSON.stringify(mates.map(p=>[p.x,p.y]));
 const center=h.block(t,order,ball),wide=h.block(t,order,{x:50,y:52});
 for(const p of order.slice(2)){
  assert(Math.abs(wide.get(p).y-center.get(p).y-5)<1e-8,'all lines shift together with ball');
  assert(Math.hypot(center.get(p).x-50,center.get(p).y-32)>6,'non-pressing players do not target ball');
 }
 for(const line of [1,2,3]){
  const ps=order.slice(2).filter(p=>h.line(p)===line),qs=ps.map(p=>center.get(p));
  if(qs.length)assert(Math.max(...qs.map(q=>q.x))-Math.min(...qs.map(q=>q.x))<=3.001,'shared line depth');
  for(let i=0;i<qs.length;i++)for(let j=0;j<i;j++)assert(Math.abs(qs[i].y-qs[j].y)>=5.99,'distinct zones within each line');
 }
 assert.equal(JSON.stringify(mates.map(p=>[p.x,p.y])),before,'no teleport');
 const duties=e.t.defensiveOrder(t,ball);assert.equal(duties.filter(p=>p?.defDuty==='press').length,1);assert.equal(duties.filter(p=>p?.defDuty==='cover').length,1);
 e.t.setDestinationTrace(true);e.t.movement(1/60);
 assert(e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage.startsWith('Bloque defensivo'))),'block reaches movement pipeline');
}
console.log('PASS: four systems × two teams, coordinated shift, line depth, zone separation, one press/cover and no teleport');
