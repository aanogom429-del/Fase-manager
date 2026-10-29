const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {block:defensiveBlockTargets,line:positionalLine,orders:v=>offBallOrders=v};');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null),x=v=>t?100-v:v;e.t.scenario({time:10,team:1-t});
 const id=t?'system-red':'system-blue';e.nodes[id].value=formation;e.nodes[id].onchange();
 const ps=e.t.team(t).filter(p=>p.n>1),press=ps.find(p=>p.n===3),cover=ps.find(p=>p.n===2),mid=ps.find(p=>p.n===7),front=ps.find(p=>p.n===10);
 const order=[press,cover,...ps.filter(p=>p!==press&&p!==cover)],ball={x:x(50),y:32};
 for(const p of ps){p.x=x(95);p.y=60;}
 press.x=x(48);press.y=32;mid.x=x(30);mid.y=32;front.x=x(36);front.y=32;
 const original=JSON.stringify(ps.map(p=>[p.id,p.n,p.role,p.x,p.y]));
 let targets=h.block(t,order,ball);
 assert.equal(mid.defSlotFor,press.id);assert.equal(front.defSlotFor,mid.id);
 const assigned=ps.filter(p=>p.defSlotFor!==undefined);assert.equal(assigned.length,2);
 assert.equal(new Set(assigned.map(p=>p.defSlotFor)).size,2);
 for(const p of assigned)assert.equal(h.line(p),h.line(ps.find(q=>q.id===p.defSlotFor))+1,'acyclic adjacent-line chain');
 assert.equal(JSON.stringify(ps.map(p=>[p.id,p.n,p.role,p.x,p.y])),original,'no role rewrite or teleport');
 h.orders([{i:front.id,until:20}]);h.block(t,order,ball);assert.equal(front.defSlotFor,undefined);assert.equal(mid.defSlotFor,press.id);h.orders([]);
 front.x=x(95);h.block(t,order,ball);assert.equal(front.defSlotFor,undefined,'no forced distant secondary replacement');front.x=x(36);
 h.block(t,order,ball);assert.equal(front.defSlotFor,mid.id);
 const changed=[front,cover,...ps.filter(p=>p!==front&&p!==cover)];h.block(t,changed,ball);assert(ps.every(p=>p.defSlotFor===undefined),'whole chain releases');
}
console.log('PASS: four systems × both directions, two unique acyclic relays, secondary exclusions, no teleport and full release');
