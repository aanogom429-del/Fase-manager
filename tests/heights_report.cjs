const assert=require('node:assert/strict'),{env}=require('./continuity.cjs'),report=require('../data/heights-comparison.json'),source=require('../data/metrica-analysis.json');
(async()=>{assert.equal(report.engineVersion,'0.34');assert(report.defenseUnchanged);assert(report.clips.every(c=>Number.isFinite(c.changePercent)));
const e=env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
for(const id of ['home-progress','away-progress']){e.nodes['reference-sequence'].onchange({target:{value:String(source.clips.findIndex(c=>c.id===id))}});assert(e.nodes['reference-analysis'].textContent.includes('Alturas 0.31 → 0.34'));const row=report.clips.find(c=>c.id===id);assert(e.nodes['reference-analysis'].textContent.includes(Math.abs(row.changePercent).toFixed(1)+' %'));}
console.log('PASS: mixed height results visible including regression; defensive contrast unchanged');})().catch(e=>{console.error(e);process.exitCode=1;});
