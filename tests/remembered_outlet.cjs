const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
function setup(t){const seed=73;
 const e=env(source);e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const r of s.players){r.x=50+dir*40;r.y=55;}
 p.x=50;p.y=32;p.bodyAngle=t?0:Math.PI;p.receivedAt=9.7;p.controlUntil=0;p.visualMemory=[];p.rivalMemory=s.players.filter(r=>r.t!==t).map(r=>({id:r.id,x:r.x,y:r.y,seenAt:10}));p.scanUntil=0;
 const back=s.players.find(r=>r.t===t&&r.n===8);back.x=50-dir*12;back.y=32;
 const front=s.players.find(r=>r.t===t&&r.n===10);front.x=50+dir*14;front.y=32;
 {const r=s.players.find(r=>r.t!==t&&r.n===6);r.x=50+dir*7;r.y=39;r.vy=-3;r.bodyAngle=-Math.PI/2;}
 e.t.chooseAction(p);
 assert(p.scanUntil>10,'receiver with only a rear outlet scans forward while waiting');
 assert(Math.abs(Math.cos(p.scanAngle)-dir)<1e-9,'scan follows attacking direction');
 assert.equal(e.t.get().owner,p,'scan does not force a pass');
 for(let i=0;i<94;i++)e.t.update(1/120);
 return {e,p,back,front};
}
for(const t of [0,1]){
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
console.log('PASS: mirrored recent outlet, hidden relocation, stale memory, marking, unavailable target and physical preparation');
