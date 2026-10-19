const fs=require('node:fs'),path=require('node:path'),{simulate}=require('./controlled_loss.cjs');
const cases=['048','049'].flatMap(v=>[0,1].flatMap(t=>[40,60,80].map(x=>simulate(v,t,x))));
const report={protocol:'Same prescribed loss states and trajectories as controlled_loss.cjs; 0.48 vs 0.49. No parameter fitting to these outcomes.',limitations:['Synthetic, prescribed rivals; no actual passes or recoveries','Lane blocking and arrival estimates do not prove tactical quality','Only six scenarios per version'],cases};
fs.writeFileSync(path.join(__dirname,'../data/controlled-loss-v049.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(cases.filter(c=>c.defendingTeam===0).map(c=>({version:c.version,x:c.lossX,samples:c.samples.map(s=>({at:s.at,lines:s.blockedReceiverLines,near:s.nearestBallM,arrivalMargin:s.arrivalDisadvantageSeconds}))})),null,2));
