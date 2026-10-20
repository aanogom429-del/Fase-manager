const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {simulate,definitions,sources,simulationHash,twoHorizonControl}=require('../scripts/evaluate_finishing_v0531.cjs');
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-v0531.json'),'utf8')),src=sources(),defs=definitions();
assert.equal(report.candidate,'0.53.1');assert.equal(report.simulationSha256,simulationHash());assert.equal(report.executionCounts.fresh+report.executionCounts.reused,228);assert.equal(report.rows.length,defs.length);
for(const [v,s]of Object.entries(src))assert.equal(report.engineSha256[v],createHash('sha256').update(s).digest('hex'),v+' report must test this exact source');
for(let i=0;i<defs.length;i++){
 const row=report.rows[i],d=defs[i];assert.deepEqual({group:row.group,t:row.t,kind:row.kind,seed:row.seed,options:row.options},d);
 assert.deepEqual(Object.keys(row.results).sort(),['v052','v053','v0531']);
 for(const r of Object.values(row.results)){
  assert.equal(r.options.keeperHome,true);const g=r.initial.find(p=>p.id===row.t*11);assert.equal(g.x,g.hx);assert.equal(g.y,g.hy);
  assert(r.final.some(p=>Math.hypot(p.x-r.initial[p.id].x,p.y-r.initial[p.id].y)>.1),'Real movement required');
  for(const [key,value]of Object.entries(r.metrics))assert(Number.isFinite(value)&&value>=-1e-9,key);
  const m=r.metrics;assert(m.attackSeconds<=r.options.seconds+.051);assert(m.dangerSeconds<=m.attackSeconds+1e-9);assert(m.pressureSeconds<=m.attackSeconds+1e-9);
  assert(m.occasionSeconds<=m.dangerSeconds+1e-9);assert(m.openGoalSum<=m.dangerSeconds+1e-9);assert(m.doubleCoverSum<=m.dangerSeconds+1e-9);
  assert.equal(m.shotsConceded,Math.trunc(m.shotsConceded));
 }
}
// Keep favorable, neutral and harmful outcomes visible; never assert universal superiority.
const deltas=report.rows.map(r=>r.results.v0531.goalsConceded-r.results.v053.goalsConceded);
assert(deltas.some(d=>d<0));assert(deltas.some(d=>d===0));assert(deltas.some(d=>d>0));
for(const [t,kind,seed]of [[1,'pass',101],[0,'pass',202]]){
 const row=report.rows.find(r=>r.group==='orientation'&&r.t===t&&r.kind===kind&&r.seed===seed&&r.options.angle===0);
 for(const [v,s]of Object.entries(src))assert.deepEqual(JSON.parse(JSON.stringify(simulate(s,t,kind,seed,row.options))),row.results[v],v+' adverse trace reproducibility');
}
const confirmation=report.rows.filter(r=>r.group==='confirmation');assert.equal(confirmation.length,16);assert(confirmation.every(r=>[1009,1601].includes(r.seed)));
const reserved=report.rows.filter(r=>r.group==='reserved');assert.equal(reserved.length,16);assert(reserved.every(r=>r.results.v0531.options.seconds===12&&![101,202].includes(r.seed)));
const trace=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-v0531-traces.json'),'utf8'));
assert.deepEqual(trace.engineSha256,report.engineSha256);assert.equal(trace.rows.length,2);
for(const row of trace.rows){const normal=report.rows.find(r=>r.group==='orientation'&&r.t===row.t&&r.kind===row.kind&&r.seed===row.seed&&r.options.angle===0);
 for(const [v,r]of Object.entries(row.results)){
  assert(r.samples.length===120&&r.events.length>0);
  assert.deepEqual(JSON.parse(JSON.stringify({...r,samples:undefined,events:undefined})),normal.results[v],'Trace collection must preserve simulation');
 }
}
const rejected=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-v0531-rejected.json'),'utf8'));assert.equal(rejected.rows.length,60);assert.equal(rejected.engineSha256.v0531,createHash('sha256').update(fs.readFileSync(path.join(__dirname,'fixtures/finishing-candidate-rejected.html'))).digest('hex'));
const control=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-v0531-control.json'),'utf8'));
assert.equal(control.rows.length,22);assert(control.rows.every(r=>r.group!=='reserved'));
assert.equal(control.engineSha256.v053,report.engineSha256.v053);
assert.equal(control.engineSha256.twoHorizonControl,createHash('sha256').update(twoHorizonControl(src.v0531)).digest('hex'));
console.log('PASS: exact three-engine hashes, all 76 declared configurations, metric bounds, corrected anchors, retained mixed outcomes and six adverse replays');
