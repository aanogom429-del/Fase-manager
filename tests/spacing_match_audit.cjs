const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const results=[];
for(const team of [0,1])for(const seed of [73,101]){
 const e=env(undefined,seed);e.t.enterFreeMode();e.t.scenario({time:10,team,seed});
 const stats={team,seed,seconds:30,samples:0,closePairs:0,crowdedFrames:0,narrowFrames:0,maxNearBall:0,worst:null};
 for(let frame=0;frame<900;frame++){
  e.t.update(1/30);const s=e.t.get();
  for(const p of s.players)assert(Number.isFinite(p.x)&&Number.isFinite(p.y),'finite coordinates throughout simulation');
  if(frame%15||!s.owner||s.restart)continue;
  const mates=s.players.filter(p=>p.t===s.owner.t&&!p.sentOff&&p.role!=='keeper');
  let pairs=0;for(let i=0;i<mates.length;i++)for(let j=0;j<i;j++)if(Math.hypot(mates[i].x-mates[j].x,mates[i].y-mates[j].y)<6)pairs++;
  const near=mates.filter(p=>p!==s.owner&&Math.hypot(p.x-s.owner.x,p.y-s.owner.y)<12).length;
  const width=Math.max(...mates.map(p=>p.y))-Math.min(...mates.map(p=>p.y));
  stats.samples++;stats.closePairs+=pairs;stats.crowdedFrames+=near>3;stats.narrowFrames+=width<30;stats.maxNearBall=Math.max(stats.maxNearBall,near);
  if(!stats.worst||pairs>stats.worst.pairs)stats.worst={time:s.elapsed,pairs,near,width,owner:[s.owner.t,s.owner.n],positions:mates.map(p=>({n:p.n,x:p.x,y:p.y}))};
 }
 const end=e.t.get();stats.passes=end.passes;stats.turnovers=end.turnovers;stats.finalTime=end.elapsed;assert(stats.samples>0);results.push(stats);
}
console.log(JSON.stringify({engine:require('node:fs').readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').match(/<title>FASE MANAGER · ([^<]+)/)[1],note:'Synthetic four-run audit; half-second possession samples, fixed 30-second horizon. Thresholds are diagnostic, not validated tactical standards.',results},null,2));
