const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {block:defensiveBlockTargets,line:positionalLine};');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2'])for(const side of [8,56]){
 const e=env(html),h=e.t.phaseRelations(null);e.t.scenario({time:10,team:1-t});
 const id=t?'system-red':'system-blue';e.nodes[id].value=formation;e.nodes[id].onchange();
 const order=e.t.team(t).filter(p=>p.n>1).sort((a,b)=>b.n-a.n),at=depth=>h.block(t,order,{x:t?100-depth:depth,y:side});
 const high=at(35),low=at(12),goal=at(3);
 for(const p of order.slice(2)){
  if(h.line(p)!==1){assert.equal(low.get(p).y,high.get(p).y,'other lines retain width');continue;}
  const lowCenter=32+(side-32)*.15,highCenter=32+(side-32)*.25;
  assert(Math.abs(lowCenter-32)<Math.abs(highCenter-32),'block center follows flank less');
  assert(Math.abs(low.get(p).y-lowCenter)<=Math.abs(high.get(p).y-highCenter)+1e-8,'line narrows around its shared center');
  assert(Math.abs((t?100-goal.get(p).x:goal.get(p).x)-2)<1e-8,'goal-side depth bounded at pitch margin');
  const a=at(29.99).get(p),b=at(30.01).get(p);assert(Math.abs(a.y-b.y)<.02,'no abrupt area threshold jump');
 }
 const back=order.slice(2).filter(p=>h.line(p)===1).map(p=>low.get(p));
 for(let i=0;i<back.length;i++)for(let j=0;j<i;j++)assert(Math.abs(back[i].y-back[j].y)>7,'central closing preserves distinct zones');
}
console.log('PASS: 4 systems ×2 teams ×2 flanks, central/weak-side closing, bounded depth, separated zones and continuous threshold');
