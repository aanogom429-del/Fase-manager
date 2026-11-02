const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {assignZoneMarks,defensiveBlockTargets};');
for(const t of [0,1]){
 const e=env(html),h=e.t.phaseRelations(null);e.t.scenario({time:10,team:1-t});const x=v=>t?100-v:v,pos={x:x(60),y:32};
 const ps=e.t.team(t).filter(p=>p.n!==1),[a,b,p]=ps,opp=e.t.team(1-t),wide=opp[8],central=opp[9];
 const zone={x:x(45),y:32},slots=new Map([[p,zone]]);Object.assign(p,zone);Object.assign(b,{x:x(54),y:49});
 const targets=new Map([[p,zone],[b,{x:b.x,y:b.y}]]);
 const mark=y=>{targets.set(p,zone);p.rivalMemory=[{id:wide.id,x:x(45),y,seenAt:10},{id:central.id,x:x(31),y:32,seenAt:10}];h.assignZoneMarks(t,[a,b,p],slots,targets,new Map(),pos,'contener');};
 mark(33);assert.equal(p.markId,wide.id);mark(39);assert.equal(p.markId,undefined,'release runner to preserve unattended central lane');
 b.y=32;targets.set(b,{x:b.x,y:b.y});mark(39);assert.equal(p.markId,wide.id,'cover already in place allows handoff');
 const owner=e.t.get().owner;Object.assign(owner,pos);for(const q of ps){q.x=x(35);q.y=10+q.n*3;}
 for(const q of opp)if(q!==owner){q.x=x(92);q.y=2;}
 const track=height=>{const el=e.nodes['def-height-'+t];el.value=height;el.onchange();return h.defensiveBlockTargets(t,ps,pos).get(ps[5]);};
 const low=track('bajo'),mid=track('medio'),high=track('alto');assert((mid.x-low.x)*(t?-1:1)>0&&(high.x-mid.x)*(t?-1:1)>0);
}
console.log('PASS: both directions, mark/release/covered lane and configurable zonal height');
