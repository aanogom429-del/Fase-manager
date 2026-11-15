const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(process.argv[2],'utf8'),results=[];
for(const team of [0,1])for(const seed of (process.env.SEEDS?process.env.SEEDS.split(',').map(Number):[73,101])){
 const e=env(html,seed);e.t.enterFreeMode();e.t.scenario({time:10,team,seed});
 const stats={team,seed,samples:0,closePairs:0,crowdedFrames:0,narrowFrames:0};
 for(let frame=0;frame<900;frame++){
  e.t.update(1/30);const s=e.t.get();for(const p of s.players)assert(Number.isFinite(p.x)&&Number.isFinite(p.y));
  if(frame%15||!s.owner||s.restart)continue;
  const mates=s.players.filter(p=>p.t===s.owner.t&&!p.sentOff&&p.role!=='keeper');
  for(let i=0;i<mates.length;i++)for(let j=0;j<i;j++)stats.closePairs+=Math.hypot(mates[i].x-mates[j].x,mates[i].y-mates[j].y)<6;
  stats.samples++;stats.crowdedFrames+=mates.filter(p=>p!==s.owner&&Math.hypot(p.x-s.owner.x,p.y-s.owner.y)<12).length>3;
  stats.narrowFrames+=Math.max(...mates.map(p=>p.y))-Math.min(...mates.map(p=>p.y))<30;
 }
 const s=e.t.get();stats.passes=s.passes;stats.turnovers=s.turnovers;results.push(stats);
}
console.log(JSON.stringify(results,null,2));
