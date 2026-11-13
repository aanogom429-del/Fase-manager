const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
for(const t of [0,1])for(const support of [false,true]){
 const e=env(html.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return distributeAttackSpace;'));
 e.t.scenario({time:10,team:t,seed:73});const p=e.t.get().owner,q=e.t.team(t).find(r=>r.n===8);p.x=50;p.y=32;q.x=50;q.y=44;q.attackSupport=support?1:0;
 const targets=new Map([[q,{x:50,y:44}]]),locked=new Map([[p,{x:50,y:32}]]);
 const result=e.t.phaseRelations(null)(targets,locked,new Map()).get(q);
 if(support)assert.equal(result.y,44,'retain the assigned local support');else assert(Math.hypot(result.x-p.x,result.y-p.y)>=14,'other teammates free the local support area');
 assert.equal(q.y,44,'planning does not teleport');
}
console.log('PASS: local space, assigned supports and no teleport in both directions');
