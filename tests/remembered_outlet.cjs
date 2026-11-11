const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
function setup(t){
 const state=JSON.parse(JSON.stringify(require('../data/remembered-outlet-fixture.json').states[t]));
 const e=env(source);e.t.enterFreeMode();e.t.scenario({time:state.time,team:t,seed:73});
 const players=e.t.get().players;state.players.forEach((p,i)=>Object.assign(players[i],p));
 return {e,p:e.t.get().owner,back:players.find(p=>p.t===t&&p.n===8),front:players.find(p=>p.t===t&&p.n===10)};
}
if(require.main===module)for(const t of [0,1]){
 for(const variant of ['recent','hiddenMove','old','marked','unavailable']){
  const {e,p,back}=setup(t),now=e.t.get().elapsed;
  const m=p.visualMemory.find(m=>m.id===back.id),expected={x:m.x,y:m.y};
  assert(now-m.seenAt>0&&now-m.seenAt<.5);
  if(variant==='hiddenMove'){back.x=t?95:5;back.y=32;assert(!e.t.perceives(p,back));}
  if(variant==='old')m.seenAt=now-.6;
  if(variant==='marked'){
   const rival=e.t.get().players.find(r=>r.t!==t&&r.n===8);
   rival.x=m.x;rival.y=m.y;
   p.rivalMemory=p.rivalMemory.filter(r=>r.id!==rival.id);
   p.rivalMemory.push({id:rival.id,x:m.x,y:m.y,seenAt:now});
  }
  if(variant==='unavailable')back.sentOff=true;
  const angle=p.bodyAngle;e.t.chooseAction(p);
  if(variant==='recent'||variant==='hiddenMove'){
   assert.equal(p.kickPreparation?.targetId,back.id,'prepare recent safe remembered outlet');
   assert.equal(p.kickPreparation.x,expected.x);assert.equal(p.kickPreparation.y,expected.y);
   assert.equal(p.bodyAngle,angle,'no instant body turn');assert.equal(e.t.get().flight,null,'turn precedes release');
  }else assert.notEqual(p.kickPreparation?.targetId,back.id,'reject stale, marked or unavailable memory');
 }
}
if(require.main===module)console.log('PASS: mirrored recent outlet, hidden relocation, stale memory, marking, unavailable target and physical preparation');

module.exports={setup};
