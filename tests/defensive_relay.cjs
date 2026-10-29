const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {block:defensiveBlockTargets,line:positionalLine,orders:v=>offBallOrders=v};');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null),x=v=>t?100-v:v;e.t.scenario({time:10,team:1-t});
 const id=t?'system-red':'system-blue';e.nodes[id].value=formation;e.nodes[id].onchange();
 const ps=e.t.team(t).filter(p=>p.n>1),press=ps.find(p=>p.n===3),cover=ps.find(p=>p.n===10),mid=ps.find(p=>p.n===7);
 const order=[press,cover,...ps.filter(p=>p!==press&&p!==cover)],ball={x:x(50),y:32};
 for(const p of ps){p.x=x(95);p.y=60;}
 press.x=x(48);press.y=32;mid.x=x(30);mid.y=32;
 let targets=h.block(t,order,ball);
 assert.equal(mid.defSlotFor,press.id,'midfielder fills departed defensive reference');
 assert(targets.get(mid).x*(t?-1:1)<ball.x*(t?-1:1)-10,'replacement goes behind press, not to ball');
 assert.equal(ps.filter(p=>p.defSlotFor!==undefined).length,1);
 const position={x:mid.x,y:mid.y};assert.deepEqual(position,{x:x(30),y:32},'no teleport');
 h.orders([{i:mid.id,until:20}]);h.block(t,order,ball);assert.equal(mid.defSlotFor,undefined,'coach order excludes candidate');h.orders([]);
 const withMidCover=[press,mid,...ps.filter(p=>p!==press&&p!==mid)];h.block(t,withMidCover,ball);assert.equal(mid.defSlotFor,undefined,'immediate cover never reassigned');
 mid.x=x(95);h.block(t,order,ball);assert.equal(mid.defSlotFor,undefined,'ineligible distance releases relay');
 mid.x=x(30);h.block(t,order,ball);
 const changed=[cover,press,...ps.filter(p=>p!==press&&p!==cover)];h.block(t,changed,ball);assert(ps.every(p=>p.defSlotFor===undefined),'no last-line departure releases relay');
}
console.log('PASS: four systems × both directions, one defensive replacement, goal-side target, no teleport, distance and release');
