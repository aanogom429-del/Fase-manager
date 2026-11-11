const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
for(const closing of [true])for(const t of [0,1])for(const seed of [11,37,73,101]){
 const e=env(source);e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const r of s.players){r.x=50+dir*40;r.y=55;}
 p.x=50;p.y=32;p.bodyAngle=t?0:Math.PI;p.receivedAt=9.7;p.controlUntil=0;p.visualMemory=[];p.rivalMemory=s.players.filter(r=>r.t!==t).map(r=>({id:r.id,x:r.x,y:r.y,seenAt:10}));p.scanUntil=0;
 const back=s.players.find(r=>r.t===t&&r.n===8);back.x=50-dir*12;back.y=32;
 const front=s.players.find(r=>r.t===t&&r.n===10);front.x=50+dir*14;front.y=32;
 if(closing){const r=s.players.find(r=>r.t!==t&&r.n===6);r.x=50+dir*7;r.y=39;r.vy=-3;r.bodyAngle=-Math.PI/2;}
 e.t.chooseAction(p);
 assert(p.scanUntil>10,'receiver with only a rear outlet scans forward while waiting');
 assert(Math.abs(Math.cos(p.scanAngle)-dir)<1e-9,'scan follows attacking direction');
 assert.equal(e.t.get().owner,p,'scan does not force a pass');
 let seen=false;for(let i=0;i<96&&!e.t.get().flight;i++){e.t.update(1/120);if(e.t.knownTeammates(p).some(m=>m.id===front.id))seen=true;}

 assert.equal(e.t.get().passes,0,'do not force the exposed forward pass while there is time to look elsewhere');
 assert.equal(e.t.get().owner,p,'retain the ball during reassessment');
 assert(p.scanUntil>e.t.get().elapsed||p.kickPreparation?.targetId===back.id,'explore or prepare the rear outlet, without forcing the blocked forward pass');
}
console.log('PASS: exposed fallback rejected in both directions; active reassessment retains the ball initially');
