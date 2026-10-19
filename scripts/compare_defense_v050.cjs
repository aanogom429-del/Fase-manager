const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{simulate}=require('./controlled_loss.cjs');
const cases=['049','050'].flatMap(v=>[0,1].flatMap(t=>[40,60,80].map(x=>simulate(v,t,x))));
for(const c of cases)for(const s of c.samples)assert(Object.values(s).every(Number.isFinite));
for(const x of [40,60,80]){const a=cases.find(c=>c.version==='050'&&c.defendingTeam===0&&c.lossX===x),b=cases.find(c=>c.version==='050'&&c.defendingTeam===1&&c.lossX===x);for(let i=0;i<3;i++)for(const k of Object.keys(a.samples[i]))assert(Math.abs(a.samples[i][k]-b.samples[i][k])<1e-8,'mirror '+k);}
const report={protocol:'Six identical prescribed losses per version, 0/2/5 s; same protocol as controlled_loss.cjs.',limitations:['Synthetic prescribed rivals, not independent validation','No actual passes or regain','Arrival estimates and geometric lines are partial indicators'],cases};
fs.writeFileSync(path.join(__dirname,'../data/controlled-loss-v050.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(cases.filter(c=>c.defendingTeam===0).map(c=>({version:c.version,x:c.lossX,samples:c.samples.map(s=>({at:s.at,lines:s.blockedReceiverLines,nearest:s.nearestBallM,arrival:s.arrivalDisadvantageSeconds}))})),null,2));
