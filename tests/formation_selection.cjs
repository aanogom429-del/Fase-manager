const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const keys=['4-3-3','4-2-3-1','4-4-2','3-5-2'];
for(const t of [0,1])for(const key of keys){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),id=t?'system-red':'system-blue';
 const positions=JSON.stringify(s.players.map(p=>[p.x,p.y]));e.nodes[id].value=key;e.nodes[id].onchange();
 assert.equal(JSON.stringify(s.players.map(p=>[p.x,p.y])),positions,'selection never teleports');
 assert(s.players.filter(p=>p.t===t).every(p=>p.formation===key));assert(s.players.filter(p=>p.t!==t).every(p=>!p.formation),'teams independent');
 const ps=s.players.filter(p=>p.t===t);assert.equal(ps.filter(p=>p.role==='striker').length,['4-4-2','3-5-2'].includes(key)?2:1);
 if(key==='3-5-2')assert.equal(ps.filter(p=>p.role==='centreBack').length,3);
 e.t.setDestinationTrace(true);const ball={x:s.owner.x,y:s.owner.y};e.t.attackingTargets(t,ball);e.t.scenario({time:12,team:t,seed:73});e.t.attackingTargets(t,ball);
 assert(e.t.getDestinationTrace().rows.some(r=>r.steps.some(s=>s.stage.startsWith('Arquitectura '+key))),'selected system reaches target computation');
 e.t.prepareDecision();e.nodes[id].value=key==='4-3-3'?'3-5-2':'4-3-3';e.nodes[id].onchange();e.t.restorePosition();e.t.render();assert.equal(e.nodes[id].value,key,'retry restores system and selector');
 for(let i=0;i<120;i++)e.t.update(1/60);assert(s.players.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),'simulation remains finite');
}
const e=env();e.t.prepareDecision();e.nodes['system-blue'].value='3-5-2';e.nodes['system-blue'].onchange();e.t.restorePosition();e.t.render();assert.equal(e.nodes['system-blue'].value,'4-3-3','legacy snapshot without formation restores default');
const memory=new Map(),storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
const a=env(undefined,101,{localStorage:storage});a.nodes['system-blue'].value='3-5-2';a.nodes['system-blue'].onchange();a.nodes['system-red'].value='4-4-2';a.nodes['system-red'].onchange();assert(a.nodes['save-decision'].onclick());
const b=env(undefined,101,{localStorage:storage});assert(b.nodes['load-decision'].onclick());b.t.render();assert.equal(b.nodes['system-blue'].value,'3-5-2');assert.equal(b.nodes['system-red'].value,'4-4-2');assert.equal(b.t.get().players.filter(p=>p.t===0&&p.role==='centreBack').length,3);
console.log('PASS: four systems × two teams, roles, targets, no teleport, independent selection, restore, persistence and simulation');
