const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
for(const t of [0,1]){
 const e=env(html.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return distributeAttackSpace;'));
 e.t.scenario({time:10,team:t});const p=e.t.team(t).find(p=>p.n===8);p.x=50;p.y=32;p.attackSupport=0;
 const targets=new Map([[p,{x:50,y:32}]]),locked=new Map([[{}, {x:50,y:20}],[{}, {x:50,y:32}],[{}, {x:50,y:44}]]);
 const q=e.t.phaseRelations(null)(targets,locked,new Map()).get(p);
 assert([...locked.values()].every(r=>Math.hypot(q.x-r.x,q.y-r.y)>=10),'find free corridor beyond crowded immediate alternatives');
 assert.equal(q.x,50,'preserve tactical depth');assert.equal(p.y,32,'no teleport');assert(q.y>=4&&q.y<=60);
}
console.log('PASS: find separated corridor, retain depth, bounds and physical positions');
