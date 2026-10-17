const fs=require('node:fs'),path=require('node:path'),{evaluate}=require('./evaluate_movement.cjs');
const root=path.join(__dirname,'..'),data=require('../data/metrica-analysis.json'),baseline=require('../data/attack-baseline-v028.json');
const engineVersion=fs.readFileSync(path.join(root,'index.html'),'utf8').match(/FASE MANAGER · ([0-9.]+)/)[1];
const clips=baseline.clips.map(before=>{const after=evaluate(data.clips.find(c=>c.id===before.id),.35);return {id:before.id,before,after,improvementPercent:100*(before.positionMAEM-after.positionMAEM)/before.positionMAEM};});
const report={engineVersion,baselineVersion:'0.28',gain:.35,method:'Same three original Game 1 windows and existing controlled replay metric; fixed gain, no search. Current positions and ball anchored together at initial time.',limitations:['Approximate shirt-to-role mapping','Observed ball, opponents and recorded actors prescribed','Not free-play validity; Game 2 metrics use a different integration method and are not pooled with these'],clips};
fs.writeFileSync(path.join(root,'data/attack-comparison.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(clips));
