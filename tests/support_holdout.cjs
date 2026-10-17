const assert=require('node:assert/strict'),{validate}=require('../scripts/validate_support_holdout.cjs');
const report=require('../data/support-holdout-validation.json'),windows=require('../data/support-holdout-windows.json'),plan=require('../data/support-holdout-plan.json');
assert.deepEqual(validate(),report);
assert.deepEqual(windows.clips.map(({id,team,start,end})=>({id,team,start,end})),plan.windows);
const previous=[...require('../data/metrica-analysis.json').clips.filter(c=>c.match==='Sample Game 2'),...require('../data/audit-windows.json').clips];
for(const c of windows.clips)for(const old of previous)assert(c.end<old.start||c.start>old.end);
assert.equal(report.clips.filter(c=>c.excluded).length,1);
assert.equal(report.clips.filter(c=>!c.excluded&&c.after.meanErrorM<c.before.meanErrorM).length,1);
assert.equal(report.clips.filter(c=>!c.excluded&&c.after.meanErrorM>c.before.meanErrorM).length,1);
assert(report.clips.filter(c=>!c.excluded).every(c=>c.after.meanErrorM>c.after.stationaryErrorM));
console.log('PASS: frozen non-overlapping windows, exact baseline, reproducible mixed outcomes and retained exclusion');
const {env}=require('./continuity.cjs');
(async()=>{const e=env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 const offset=require('../data/metrica-analysis.json').clips.length+require('../data/audit-windows.json').clips.length;
 for(let i=0;i<3;i++){e.nodes['reference-sequence'].onchange({target:{value:String(offset+i)}});const n=e.nodes['reference-game2'];assert(!n.hidden);assert(n.textContent.includes(i===1?'Ventana excluida':'Error 0.33 → 0.34'));}
 e.nodes['reference-sequence'].onchange({target:{value:'0'}});assert(e.nodes['reference-diagnosis'].textContent.includes('Revisión individual'));
 console.log('PASS: holdout viewer, exclusion and individual regression explanation');
})().catch(e=>{console.error(e);process.exitCode=1;});
