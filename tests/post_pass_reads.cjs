const assert=require('node:assert/strict'),fs=require('node:fs');
const {env,signature}=require('./continuity.cjs'),audit=require('../scripts/audit_post_pass_reads.cjs'),evaluation=require('../scripts/evaluate_finishing_v0531.cjs'),controls=require('../scripts/evaluate_finishing_resume.cjs'),posture=require('../scripts/audit_pre_shot_posture.cjs');
const plain=x=>JSON.parse(JSON.stringify(x));
for(const source of [controls.base,evaluation.sources().v053])for(const team of [0,1]){
 const a=env(source,901),b=env(audit.build(source),901);
 for(const e of [a,b]){e.t.enterFreeMode();e.t.scenario({time:0,team:1-team,seed:901});}
 for(let i=0;i<120;i++){a.t.update(1/120);b.t.update(1/120);}
 assert.equal(JSON.stringify(a.t.savePosition()),JSON.stringify(b.t.savePosition()));assert.equal(signature(a),signature(b),'Observer preserves flight and loose-ball state too');
 assert(b.t.readWindow.records.length>0);
 const p=b.t.get().players.find(q=>q.t===team&&q.n===6),time=b.t.get().elapsed,target={x:p.x+3,y:p.y},sight={x:p.x+5,y:p.y,z:0,seenAt:time,vx:-12,vy:0};
 const saved=JSON.stringify(b.t.savePosition());
 const snapshot=plain(b.t.readWindow.snapshot(p,target,sight,null));
 assert.equal(JSON.stringify(b.t.savePosition()),saved,'Copied physical hypotheses must preserve complete checkpoint and RNG');
 assert.equal(snapshot.wait,Math.max(0,p.intentAt-time));
 const opponent=b.t.get().players.find(q=>q.t!==team&&q!==b.t.get().owner);
 const old={x:opponent.x,y:opponent.y,intentX:opponent.intentX,intentAt:opponent.intentAt};
 Object.assign(opponent,{x:0,y:0,intentX:99,intentAt:time+100});
 assert.deepEqual(plain(b.t.readWindow.snapshot(p,target,sight,null)),snapshot,'Local estimate cannot query other positions or private intents');Object.assign(opponent,old);
 // Vary real future flight while keeping supplied observations unchanged.
 const s=b.t.get(),carrier=s.owner||s.players.find(q=>q.t!==team&&q.n===6);
 b.t.capture(carrier,'unit setup');b.t.kickTo(carrier,team?98:2,32,'pass');
 const before=plain(b.t.readWindow.snapshot(p,target,sight,null)),f=b.t.get().flight;
 assert(f);Object.assign(f,{tx:50,ty:1,duration:100,loft:50});
 assert.deepEqual(plain(b.t.readWindow.snapshot(p,target,sight,null)),before,'No programmed flight target, duration or loft in local prediction');
 const ball={x:b.t.get().bx,y:b.t.get().by};p.bodyAngle=Math.atan2(ball.y-p.y,ball.x-p.x)+Math.PI;
 b.t.readWindow.observe(p);assert.equal(b.t.readWindow.sights.has(p.id),false,'No current observation when ball is outside visual cone');
 const blind=b.t.readWindow.snapshot(p,target,null,null);assert.equal(blind.immediate,null);assert.equal(blind.reachable,null);
}
if(process.argv[2]!=='--unit')assert.deepEqual(audit.verify(posture.readReport('data/post-pass-reads-v0531.json.gz')),JSON.parse(fs.readFileSync('data/post-pass-reads-summary.json','utf8')));
assert.equal(controls.hash(fs.readFileSync('index.html','utf8')),controls.hash(controls.base));
console.log('PASS post-pass reads: four full-state passive replays, pure own physics, visibility, pending intent and independence from other private state / programmed flight future; production intact');
