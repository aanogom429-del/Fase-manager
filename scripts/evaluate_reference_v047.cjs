// Diagnostic reuse of existing windows, NOT an independent validation set.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {evaluate}=require('./evaluate_owner_holdout.cjs');
const root=path.join(__dirname,'..'),data=require('../data/owner-holdout-windows.json');
const html=fs.readFileSync(path.join(root,'tests/fixtures/engine-v047.html'),'utf8');
const baseline=fs.readFileSync(path.join(root,'tests/fixtures/engine-v035.html'),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
function run(){
 const clips=data.clips.map(c=>({id:c.id,start:c.start,end:c.end,baseline035:evaluate(c,baseline),current047:evaluate(c,html)}));
 for(const c of clips)assert(Number.isFinite(c.current047.meanErrorM));
 return {engineVersion:'0.47',engineSha256:sha(html),baselineSha256:sha(baseline),source:data.source,rawSha256:data.rawSha256,
  protocol:'Reuse all three frozen owner windows, nine free teammates; impose recorded holder, ball, opponents and keepers. Time-integrated mean Euclidean position error in metres; compare with stationary initial positions.',
  limitations:['Reused windows from one match: not independent validation','Short intervals; stationary baseline favors inertia','Player roles approximated by jersey order; real body orientation, initial velocity and individual capacities not supplied','Position similarity does not measure tactical quality','No parameter fitting or learning'],clips};
}
if(require.main===module){const r=run();fs.writeFileSync(path.join(root,'data/reference-v047.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r.clips.map(c=>({id:c.id,v035:c.baseline035.meanErrorM,v047:c.current047.meanErrorM,stationary:c.current047.stationaryErrorM})),null,2));}
module.exports={run};
