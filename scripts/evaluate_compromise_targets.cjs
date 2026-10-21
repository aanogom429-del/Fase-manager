// Research only: expand destinations, retain every e28 acceptance veto.
const fs=require('node:fs'),assert=require('node:assert/strict');
const controls=require('./evaluate_finishing_resume.cjs'),evaluation=require('./evaluate_finishing_v0531.cjs');
function build(){
 const old=' for(const contact of contacts){\n  const target={x:clamp(contact.x,2,98),y:clamp(contact.y,2,62)};';
 const replacement=` const destinations=contacts.flatMap(contact=>[1,.75,.5,.25].map(weight=>({x:clamp(proposed.x+(contact.x-proposed.x)*weight,2,98),y:clamp(proposed.y+(contact.y-proposed.y)*weight,2,62)})));
 for(const target of destinations){`;
 assert.equal(controls.base.split(old).length,2);
 return controls.base.replace(old,replacement);
}
function run(output){
 const source=build(),reference=require('../data/finishing-resume-v0531.json');
 assert.equal(reference.engineSha256.e28,controls.hash(controls.base));assert.equal(reference.simulationSha256,evaluation.simulationHash());
 for(const v of ['v052','v053'])assert.equal(reference.engineSha256[v],controls.hash(evaluation.sources()[v]));
 const report={sourceSha256:controls.hash(source),baseSha256:controls.hash(controls.base),simulationSha256:evaluation.simulationHash(),recipeSha256:controls.hash(build.toString()),protocol:'Exploratory target expansion: contact first, then 75/50/25 percent toward contact from proposed destination; unchanged physical, pressure, tackle and pass vetoes. References reused with source/configuration hashes. Current control always freshly simulated. Not held out.',rows:[]};
 for(const [i,c]of evaluation.definitions().entries()){
  const prior=reference.rows[i],{results,...configuration}=prior;assert.deepEqual(configuration,c);
  report.rows.push({...c,reference:results,result:controls.compact(evaluation.simulate(source,c.t,c.kind,c.seed,c.options))});
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.error('compromise',i+1);
 }
 return report;
}
function verify(report){
 assert.equal(report.sourceSha256,controls.hash(build()));assert.equal(report.recipeSha256,controls.hash(build.toString()));assert.equal(report.simulationSha256,evaluation.simulationHash());
 const reference=require('../data/finishing-resume-v0531.json');
 assert.equal(report.baseSha256,controls.hash(controls.base));assert.equal(reference.engineSha256.e28,report.baseSha256);
 for(const v of ['v052','v053'])assert.equal(reference.engineSha256[v],controls.hash(evaluation.sources()[v]));
 assert.equal(reference.simulationSha256,evaluation.simulationHash());assert.equal(report.rows.length,evaluation.definitions().length);
 const summary={cases:report.rows.length,changedState:0,changedMetrics:0,improvedGoals:0,worseGoals:0,goals:{v052:0,v053:0,e28:0,compromise:0},shotsConceded:{v052:0,v053:0,e28:0,compromise:0},metrics:{}};
 report.rows.forEach((row,i)=>{
  const {reference:prior,result,...config}=row;assert.deepEqual(config,evaluation.definitions()[i]);assert.deepEqual(prior,reference.rows[i].results);
  assert.equal(result.options.seconds,prior.e28.options.seconds);
  summary.changedState+=Number(result.stateSha256!==prior.e28.stateSha256);
  summary.changedMetrics+=Number(JSON.stringify(result.metrics)!==JSON.stringify(prior.e28.metrics));
  summary.improvedGoals+=Number(result.goalsConceded<prior.e28.goalsConceded);summary.worseGoals+=Number(result.goalsConceded>prior.e28.goalsConceded);
  for(const [version,r]of Object.entries({v052:prior.v052,v053:prior.v053,e28:prior.e28,compromise:result})){
   summary.goals[version]+=r.goalsConceded;summary.shotsConceded[version]+=r.metrics.shotsConceded;
   summary.metrics[version]??={};for(const [key,value]of Object.entries(r.metrics)){assert(Number.isFinite(value)&&value>=0);summary.metrics[version][key]=(summary.metrics[version][key]||0)+value;}
  }
 });
 return summary;
}
function traces(output){
 const rows=[];
 for(const config of [{t:0,kind:'pass',seed:202},{t:1,kind:'central',seed:101}])for(const [name,source]of [['e28',controls.base],['compromise',build()]]){
  const {events,samples,...result}=evaluation.simulate(source,config.t,config.kind,config.seed,{trace:true});
  rows.push({...config,version:name,sourceSha256:controls.hash(source),result:controls.compact(result),events,samples});
  fs.writeFileSync(output,JSON.stringify({simulationSha256:evaluation.simulationHash(),protocol:'Four fresh passive traces: adverse pass/202 and central/101 changed-state case, both base and control. Not new independent cases.',rows},null,2)+'\n');
 }
}
if(require.main===module){if(process.argv[2]==='--verify')console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(process.argv[3],'utf8'))),null,2));else if(process.argv[2]==='--traces')traces(process.argv[3]);else run(process.argv[2]);}
module.exports={build,run,verify,traces};
