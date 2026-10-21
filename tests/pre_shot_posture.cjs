const assert=require('node:assert/strict'),fs=require('node:fs');
const {env}=require('./continuity.cjs'),audit=require('../scripts/audit_pre_shot_posture.cjs'),controls=require('../scripts/evaluate_finishing_resume.cjs'),evaluation=require('../scripts/evaluate_finishing_v0531.cjs');
const entry='startSituation();requestAnimationFrame(frame);';
for(const source of [controls.base,evaluation.sources().v053])for(const team of [0,1]){
 const a=env(source,901),b=env(audit.build(source),901);
 for(const e of [a,b]){e.t.enterFreeMode();e.t.scenario({time:0,team,seed:901});}
 for(let i=0;i<120;i++){a.t.update(1/120);b.t.update(1/120);}
 assert.equal(JSON.stringify(b.t.savePosition()),JSON.stringify(a.t.savePosition()),'Passive audit must retain complete saved match, intentions, memories and seed');
 const hook=audit.build(source).replace(entry,entry+'globalThis.test.postureGuard=postureAudit_projectedShotGuard;globalThis.test.posturePosition=postureAudit_finishingPosition;');
 const e=env(hook,901);e.t.scenario({time:10,team,seed:901});
 const p=e.t.get().players.find(q=>q.t===team&&q.n===6),saved=JSON.stringify(e.t.savePosition());
 const target={x:p.x+2,y:p.y+1};e.t.postureGuard(p,target,{x:20,y:40},{x:0,y:32});e.t.posturePosition(p,target,p.reactionDelay);
 assert.equal(JSON.stringify(e.t.savePosition()),saved,'Physical posture hypotheses must be pure');
}
const report=audit.readReport('data/pre-shot-posture-v0531.json.gz');
assert.deepEqual(audit.verify(report),require('../data/pre-shot-posture-summary.json'));
const adverse=report.rows.filter(r=>r.t===0&&r.kind==='pass'&&r.seed===202);
assert.equal(adverse[0].result.goalsConceded,0);assert.equal(adverse[1].result.goalsConceded,1,'Adverse result must remain visible');
assert(adverse[0].samples[0].selected);assert.equal(adverse[1].samples[0].selected,null);
const loss=adverse[1].samples.find(s=>s.rays.some(r=>r.now&&!r.afterOwnCycle));assert(loss&&loss.wait>0,'Future own-posture loss can appear while a prior intention remains pending');
assert.equal(controls.hash(fs.readFileSync('index.html','utf8')),controls.hash(controls.base),'No production engine change');
console.log('PASS posture audit: four full-state passive replays, pure physical copies, 16 historical-result matches and preserved adverse/pre-shot evidence; no policy improvement claim');
