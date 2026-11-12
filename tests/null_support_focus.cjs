const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined;
for(const t of [0,1]){
 const e=env(source);e.t.scenario({time:1,team:t,seed:73});
 const mates=e.t.team(t);mates.forEach(p=>p.supportReturnUntil=2);
 assert.doesNotThrow(()=>e.t.selectAttackSupports(mates,null,()=>1),'no recipient must disable return bonus');
 const s=e.t.get(),p=s.owner;p.bodyAngle=t?Math.PI:0;
 e.t.kickTo(p,t?-2:102,32,'shot');
 assert.doesNotThrow(()=>e.t.movement(1/120),'shot without recipient must keep movement running');
}
console.log('PASS: null focus and untargeted shot in both directions');
