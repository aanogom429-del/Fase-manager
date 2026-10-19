// Controlled intervention only. Does not modify the production engine.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {evaluate}=require('./evaluate_owner_holdout.cjs');
const root=path.join(__dirname,'..'),base=fs.readFileSync(path.join(root,'tests/fixtures/engine-v047.html'),'utf8');
function candidate(source){
 const from='const top=p.hy<32;ty=top?Math.min(ty,12):Math.max(ty,52);';
 const to='const top=base.y<32;const widthTarget=top?Math.min(ty,12):Math.max(ty,52);ty+=clamp(widthTarget-ty,-4,4);';
 assert(source.includes(from));
 const bounds='clamp(ty+offset,wide&&!support&&p.hy>32?48:4,wide&&!support&&p.hy<32?16:60)';
 assert(source.includes(bounds));
 return source.replace(from,to).replace(bounds,'clamp(ty+offset,4,60)');
}
function run(){
 const changed=candidate(base),windows=require('../data/owner-holdout-windows.json');
 return {status:'experimental, not deployed',engineVersion:'0.47',
  intervention:'Non-support width outside final-third forward branch: side from possession origin, maximum 4-unit lateral width adjustment; remove hard wide-player bounds in local separation search. Other role destinations unchanged.',
  limitations:['Same reused windows, zero initial velocity, approximate roles','Two linked lateral constraints changed together','4-unit cap provisional, not calibrated','No independent match validation; no inference of tactical quality from position error'],
  clips:windows.clips.map(c=>{const before=evaluate(c,base),after=evaluate(c,changed);return {id:c.id,before,after,deltaErrorM:after.meanErrorM-before.meanErrorM};})};
}
if(require.main===module){const r=run();fs.writeFileSync(path.join(root,'data/relational-width-experiment.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r.clips.map(c=>({id:c.id,before:c.before.meanErrorM,after:c.after.meanErrorM})),null,2));}
module.exports={candidate,run};
