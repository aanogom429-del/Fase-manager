const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined;
for(const t of [0,1]){
 const e=env(source);e.t.scenario({time:10,team:t,seed:73});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 p.x=50;p.y=32;p.driveX=50;p.driveY=32;
 const mates=s.players.filter(q=>q.t===t&&q.role!=='keeper');
 mates.filter(q=>q!==p).forEach((q,i)=>{q.x=50+dir*((i%3)-1)*3;q.y=27+Math.floor(i/3)*5;delete q.attackOrigin;});
 s.players.filter(q=>q.t!==t).forEach(q=>{q.x=50+dir*40;q.y=55;});
 const before=mates.map(q=>[q.x,q.y]);const targets=e.t.attackingTargets(t,{x:50,y:32});
 assert.deepEqual(mates.map(q=>[q.x,q.y]),before,'planning does not teleport');
 const far=[...targets].filter(([q,d])=>q.role!=='keeper'&&Math.hypot(d.x-50,d.y-32)>=16);
 console.log({t,far:far.length,width:Math.max(...[...targets.values()].map(q=>q.y))-Math.min(...[...targets.values()].map(q=>q.y))});
 assert(far.length>=6,'non-local teammates spread beyond the ball neighbourhood immediately');
 for(let i=0;i<120;i++)e.t.movement(1/60);
 const spread=mates.filter(q=>Math.hypot(q.x-50,q.y-32)>=12).length;
 assert(spread>=3,'separation is followed by physical movement');
}
