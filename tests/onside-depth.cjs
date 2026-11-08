const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const seed of [11,37,73,101]){
 const e=env();e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const r of s.players){r.x=50+dir*40;r.y=55;}
 p.x=50;p.y=32;p.bodyAngle=t?0:Math.PI;p.receivedAt=9.7;p.controlUntil=0;p.visualMemory=[];p.rivalMemory=s.players.filter(r=>r.t!==t).map(r=>({id:r.id,x:r.x,y:r.y,seenAt:10}));p.scanUntil=0;
 const back=s.players.find(r=>r.t===t&&r.n===8);back.x=50-dir*12;back.y=32;
 const front=s.players.find(r=>r.t===t&&r.n===10);front.x=50+dir*14;front.y=32;
 e.t.chooseAction(p);
 assert(p.scanUntil>10,'receiver with only a rear outlet scans forward while waiting');
 assert(Math.abs(Math.cos(p.scanAngle)-dir)<1e-9,'scan follows attacking direction');
 assert.equal(e.t.get().owner,p,'scan does not force a pass');
 let seen=false;for(let i=0;i<180&&!e.t.get().flight;i++){e.t.update(1/120);if(e.t.knownTeammates(p).some(m=>m.id===front.id))seen=true;}

 console.log(JSON.stringify({team:t,seed,seen,elapsed:e.t.get().elapsed,carrierX:p.x,carrierY:p.y,receiverX:front.x,receiverY:front.y,forwardGap:(front.x-p.x)*dir,lateralGap:Math.abs(front.y-p.y),carrierAdvance:(p.x-50)*dir,passes:e.t.get().passes,status:e.nodes.status.textContent}));
 assert(seen,'exploration discovers forward teammate before a premature return');
 assert.equal(e.t.get().flight?.target,front);assert((front.x-p.x)*dir>=13,'accessible support preserves depth during exploration');
 assert(e.t.get().elapsed<11.51,'exploration remains bounded');
}
console.log('PASS: mirrored active scanning with rear safety outlet, bounded turn and retained ball');
