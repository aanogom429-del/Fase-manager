const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const results=[];
for(const closing of [false,true])for(const t of [0,1])for(const seed of [11,37,73,101]){
 const e=env();e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const r of s.players){r.x=50+dir*40;r.y=55;}
 p.x=50;p.y=32;p.bodyAngle=t?0:Math.PI;p.receivedAt=9.7;p.controlUntil=0;p.visualMemory=[];p.rivalMemory=s.players.filter(r=>r.t!==t).map(r=>({id:r.id,x:r.x,y:r.y,seenAt:10}));p.scanUntil=0;
 const back=s.players.find(r=>r.t===t&&r.n===8);back.x=50-dir*12;back.y=32;
 const front=s.players.find(r=>r.t===t&&r.n===10);front.x=50+dir*14;front.y=32;
 if(closing){const r=s.players.find(r=>r.t!==t&&r.n===6);r.x=50+dir*7;r.y=39;r.vy=-3;r.bodyAngle=-Math.PI/2;}
 e.t.chooseAction(p);
 assert(p.scanUntil>10,'receiver with only a rear outlet scans forward while waiting');
 assert(Math.abs(Math.cos(p.scanAngle)-dir)<1e-9,'scan follows attacking direction');
 assert.equal(e.t.get().owner,p,'scan does not force a pass');
 let seen=false;for(let i=0;i<180&&!e.t.get().flight;i++){e.t.update(1/120);if(e.t.knownTeammates(p).some(m=>m.id===front.id))seen=true;}

 const first=e.t.get().flight;const target=first?.target?.n??null;
 // Resolve this flight once: a later tackle must never turn an interception into a reception.
 let received=false,lost=false,firstCompleted=false,firstResolved=!first,everControlled=false,firstOutcome=null;
 for(let i=0;i<240;i++){
  e.t.update(1/120);const state=e.t.get();
  if(!firstResolved&&state.flight!==first){firstResolved=true;firstCompleted=!!first.target&&state.owner===first.target;received=first.target===front&&state.owner===front;firstOutcome={time:state.elapsed,team:state.owner?.t??null,player:state.owner?.n??null};}
  if(state.owner===front)everControlled=true;
  if(state.owner&&state.owner.t!==t)lost=true;
 }
 if(first){assert(firstResolved,'first flight must resolve within observation window');assert(firstOutcome);}
 results.push({closing,team:t,seed,seen,target,received,firstCompleted,everControlled,firstOutcome,lost,passes:e.t.get().passes});
 if(!closing){assert.equal(target,10);assert(received,'clear pass must actually reach receiver');}
}
console.log(JSON.stringify(results,null,2));
