const assert=require('node:assert/strict'),fs=require('node:fs');
const {env}=require('./continuity.cjs'),experiment=require('../scripts/evaluate_initial_intent.cjs'),evaluation=require('../scripts/evaluate_finishing_v0531.cjs'),controls=require('../scripts/evaluate_finishing_resume.cjs'),posture=require('../scripts/audit_pre_shot_posture.cjs');
// First run before generating data: isolated causal intervention, not match-specific outcome assertions.
for(const source of [controls.base,evaluation.sources().v053])for(const team of [0,1]){
 const a=env(source,901),b=env(experiment.build(source),901);
 for(const e of [a,b]){e.t.enterFreeMode();e.t.scenario({time:0,team:1-team,seed:901});}
 for(let i=0;i<120;i++){a.t.update(1/120);b.t.update(1/120);}
 assert.equal(JSON.stringify(a.t.savePosition()),JSON.stringify(b.t.savePosition()),'No-op must preserve full checkpoint and RNG');
 assert.equal(b.t.initialIntentEvents.length,1);
 const target={x:team?86:14,y:32},c=env(experiment.build(source,target),901);
 c.t.enterFreeMode();c.t.scenario({time:0,team:1-team,seed:901});
 const actor=c.t.get().players.find(p=>p.t===team&&p.n===6),before={x:actor.x,y:actor.y};
 c.t.update(1/120);
 assert.equal(actor.intentX,target.x);assert.equal(actor.intentY,target.y);
 assert.equal(actor.intentAt,c.t.get().elapsed+actor.reactionDelay,'Reaction deadline unchanged');
 assert(Math.hypot(actor.x-before.x,actor.y-before.y)<.1,'No teleport');
 for(let i=1;i<120;i++)c.t.update(1/120);
 assert.equal(c.t.initialIntentEvents.length,1,'Only first commit replaced, never later reads');
 assert.equal(c.t.initialIntentEvents[0].actor,actor.id);
 assert.notEqual(actor.intentAt,c.t.initialIntentEvents[0].until,'Ordinary intention renewal resumes');
}
if(process.argv[2]!=='--unit'){
 const report=posture.readReport('data/initial-intent-v0531.json.gz');
 assert.deepEqual(experiment.verify(report),JSON.parse(fs.readFileSync('data/initial-intent-summary.json','utf8')));
}
assert.equal(controls.hash(fs.readFileSync('index.html','utf8')),controls.hash(controls.base));
console.log('PASS initial intent: four full-state no-op replays; reciprocal-team single intervention, ordinary renewal, reaction deadline and physical continuity; production source intact');
