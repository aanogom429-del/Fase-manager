const fs=require('node:fs'),path=require('node:path'),{evaluate}=require('./evaluate_game2.cjs');
const root=path.join(__dirname,'..'),data=require('../data/audit-windows.json');
const source=fs.readFileSync(process.env.FASE_ENGINE_SOURCE||path.join(root,'index.html'),'utf8');
const engineVersion=source.match(/FASE MANAGER · ([0-9.]+)/)[1];
const clips=data.clips.map(c=>{try{return evaluate(c,{id:c.id,start:c.start,end:c.end,attacking:true});}catch(e){return {id:c.id,excluded:true,reason:e.message};}});
const report={engineVersion,source:data.source,selection:data.selection,method:'Same controlled Game 2 replay; no missing samples reconstructed, no fitting. Whole fixed window excluded if integrity checks fail.',clips};
if(!process.env.FASE_ENGINE_SOURCE)report.baseline=JSON.parse(fs.readFileSync(path.join(root,'data/audit-baseline-v029.json'),'utf8'));
fs.writeFileSync(process.env.FASE_AUDIT_OUT||path.join(root,'data/audit-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(clips.map(({roleMapping,...c})=>c)));
