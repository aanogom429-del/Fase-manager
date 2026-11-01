// Contraste pareado de la primera posesión, sin recolocar tras el arranque.
const fs=require('node:fs'),assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const gate='separateAttackRuns(moves,attacking);';assert.equal(html.split(gate).length,2);
function run(t,seed,enabled){
 const old=process.env.GRADE_TEST?html.replace('function outletGrade(holder,p,q,view,known){','function outletGrade(holder,p,q,view,known){return 0;'):html.replace(gate,'');
 const e=env(enabled?html:old,seed);e.t.enterFreeMode();e.t.scenario({time:10,team:t,seed});
 const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;p.x=x(48);p.y=32;p.driveX=p.x;p.driveY=p.y;
 s.players.filter(q=>q.t===t&&[3,4,8].includes(q.n)).forEach((q,i)=>{q.x=x(43+i*.4);q.y=31+i*.6;});
 const out={held:0,two:0,elapsed:0,passes:0,end:'limit'};
 if(seed>=501){p.y=19;p.driveY=19;s.players.filter(q=>q.t===t&&[3,4,8].includes(q.n)).forEach((q,i)=>q.y=20+i*.6);}
 for(let k=0;k<360;k++){
  e.t.update(1/30);const b=e.t.get();out.elapsed=k+1;out.passes=b.passes-s.passes;
  if(b.restart||b.owner&&b.owner.t!==t||b.flight&&b.flight.t!==t){out.end=b.restart?'restart':'lost';break;}
  const o=b.owner;if(!o)continue;out.held++;const v=e.t.perceivedOpposition(o);
  const angles=e.t.knownTeammates(o).filter(m=>m.memoryAge===0&&Math.hypot(m.x-o.x,m.y-o.y)>=5&&Math.hypot(m.x-o.x,m.y-o.y)<=25&&e.t.perceivedLane(o,m,v).risk<=3&&e.t.perceivedSpace(m,v)>=5&&!e.t.perceivedOffside(o,m,v)).map(m=>Math.atan2(m.y-o.y,m.x-o.x));
  if(angles.some((a,i)=>angles.slice(i+1).some(b=>Math.cos(a-b)<=Math.cos(Math.PI/6))))out.two++;
 }
 assert(out.held>0);return out;
}
for(const t of [0,1])for(const seed of (process.env.GRADE_TEST?[401,402,501,502]:[401,402]))console.log(JSON.stringify({t,seed,before:run(t,seed,false),after:run(t,seed,true)}));
