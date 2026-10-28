const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return distributeAttackSpace;');
for(const t of [0,1])for(const y of [4,32,60]){
 const e=env(html),run=e.t.phaseRelations(null),ps=e.t.team(t).filter(p=>p.n>1).slice(0,3),x=t?25:75;
 const positions=JSON.stringify(ps.map(p=>[p.x,p.y]));
 for(const p of ps)p.rivalMemory=[];
 const targets=new Map(ps.map(p=>[p,{x,y}])),locked=new Map([[ps[0],{x,y}]]);
 run(targets,locked,new Map());
 assert.deepEqual(targets.get(ps[0]),{x,y});
 const qs=ps.map(p=>targets.get(p));
 for(let i=0;i<qs.length;i++){assert.equal(qs[i].x,x);assert(qs[i].y>=4&&qs[i].y<=60);for(let j=0;j<i;j++)assert(Math.hypot(qs[i].x-qs[j].x,qs[i].y-qs[j].y)>=6);}
 assert.equal(JSON.stringify(ps.map(p=>[p.x,p.y])),positions,'targets only, no teleport');
 const separated=new Map(ps.map((p,i)=>[p,{x,y:12+i*18}]));
 const before=JSON.stringify([...separated.values()]);run(separated,new Map(),new Map());assert.equal(JSON.stringify([...separated.values()]),before,'already rational occupation unchanged');
}
console.log('PASS: shared destinations separated, reserved space, both sides/boundaries, depth preserved, no teleport');
let oldCrowding=0,newCrowding=0;
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2'])for(const t of [0,1]){
 const count=source=>{
  const e=env(source);e.t.enterFreeMode();e.t.scenario({time:0,team:t});
  for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}
  e.t.attackingTargets(t,{x:50,y:32});e.t.scenario({time:15,team:t});
  const targets=[...e.t.attackingTargets(t,{x:50,y:32})].filter(([p])=>p.n!==1).map(([,q])=>q);
  let crowded=0;for(let i=0;i<targets.length;i++)for(let j=0;j<i;j++)if(Math.hypot(targets[i].x-targets[j].x,targets[i].y-targets[j].y)<5.99)crowded++;
  return crowded;
 };
 oldCrowding+=count(html.replace('return distributeAttackSpace(out,locked,priority);','return out;'));newCrowding+=count(html);
}
assert(newCrowding<oldCrowding,'fewer conflicting destinations in integrated formation fixtures');
console.log(JSON.stringify({integratedScenarios:8,conflictingPairsBefore:oldCrowding,conflictingPairsAfter:newCrowding}));
