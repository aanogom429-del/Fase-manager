const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {evaluate,validate}=require('./evaluate_owner_holdout.cjs');
const root=path.join(__dirname,'..'),before=fs.readFileSync(path.join(root,'tests/fixtures/engine-v047.html'),'utf8'),after=fs.readFileSync(path.join(root,'tests/fixtures/engine-v048.html'),'utf8');
const report={engineSha256:crypto.createHash('sha256').update(after).digest('hex'),plan:require('../data/width-validation-plan.json'),limitations:['New windows from same match, not independent match validation','Approximate role mapping and default initial velocity/orientation','Position error does not prove tactical quality; excluded cases not replaced'],clips:require('../data/width-validation-windows.json').clips.map(c=>{
 try{validate(c);}catch(e){return {id:c.id,excluded:true,reason:e.message};}
 return {id:c.id,excluded:false,before:evaluate(c,before),after:evaluate(c,after)};
})};
fs.writeFileSync(path.join(root,'data/width-validation-result.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.clips.map(c=>c.excluded?c:{id:c.id,before:c.before.meanErrorM,after:c.after.meanErrorM,stationary:c.after.stationaryErrorM}),null,2));
