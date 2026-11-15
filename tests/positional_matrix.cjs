const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {sector:tacticalSector,wide:isWide,label:positionalRoleLabel,shape:possessionShape};');
const e=env(html),h=e.t.phaseRelations(null);
for(let z=1;z<=6;z++)for(let c=1;c<=5;c++){
 const x=(z-.5)*100/6,y=(c-.5)*64/5;
 assert.equal(h.sector(0,x,y),`C${c}-Z${z}`);assert.equal(h.sector(1,100-x,64-y),`C${c}-Z${z}`);
}
assert.equal(h.sector(0,100,64),'C5-Z6');assert.equal(h.sector(1,100,64),'C1-Z1');
for(const t of [0,1]){
 const id=t?'system-red':'system-blue';e.nodes[id].value='3-4-3';e.nodes[id].onchange();
 const team=e.t.team(t),inside=team.filter(p=>p.role==='winger'),wide=team.filter(p=>h.wide(p));
 assert.equal(inside.length,2);assert.equal(wide.length,2);assert(wide.every(p=>p.role==='fullback'));
 assert(inside.every(p=>h.label(p)==='atacante interior'));assert(wide.every(p=>h.label(p)==='carrilero'));
 const lanes=inside.map(p=>h.shape(p,{x:50,y:32}).y).sort((a,b)=>a-b);assert.deepEqual(Array.from(lanes),[22,42]);
 e.t.scenario({time:10,team:t,seed:73});for(let i=0;i<60;i++)e.t.movement(1/60);assert(team.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
}
console.log('PASS: 30 mirrored sectors, boundaries, wingbacks/interior attackers and physical motion');
