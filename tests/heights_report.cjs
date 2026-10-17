const assert=require('node:assert/strict'),{env}=require('./continuity.cjs'),report=require('../data/heights-comparison.json'),source=require('../data/metrica-analysis.json');
(async()=>{assert.equal(report.engineVersion,'0.33');assert(report.defenseUnchanged);assert.equal(report.clips.filter(c=>c.changePercent<0).length,5);assert.equal(report.clips.filter(c=>c.changePercent>0).length,1);
const e=env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
for(const id of ['home-progress','away-progress']){e.nodes['reference-sequence'].onchange({target:{value:String(source.clips.findIndex(c=>c.id===id))}});assert(e.nodes['reference-analysis'].textContent.includes('Alturas 0.31 → 0.33'));assert(e.nodes['reference-analysis'].textContent.includes(id==='home-progress'?'aumento 15.0':'reducción 11.7'));}
console.log('PASS: mixed height results visible including regression; defensive contrast unchanged');})().catch(e=>{console.error(e);process.exitCode=1;});
