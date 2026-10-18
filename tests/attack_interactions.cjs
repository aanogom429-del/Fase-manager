const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {intervene,keys}=require('../scripts/attack_interventions.cjs'),{diagnose}=require('../scripts/diagnose_attack_interactions.cjs');
const report=require('../data/attack-interactions.json'),plan=require('../data/attack-interaction-plan.json');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
assert.equal(intervene(html),html);assert.deepEqual(keys,plan.factors);
assert.throws(()=>intervene(html,['unknown']));assert.throws(()=>intervene(html,['supportTargets','supportTargets']));assert.throws(()=>intervene('',keys));
for(const key of keys)assert.notEqual(intervene(html,[key]),html);
assert(!html.includes('disabledMechanisms'),'interventions must not be deployed');
assert.deepEqual(diagnose(),report);
assert.deepEqual(report.clips.map(c=>c.id),plan.clips);
assert.equal(report.clips.filter(c=>c.excluded).length,1);
for(const c of report.clips.filter(c=>!c.excluded)){
 assert.equal(c.arms.length,8);assert.deepEqual(c.arms.map(a=>a.mask),[0,1,2,3,4,5,6,7]);
 assert.equal(c.arms[0].deltaM,0);
 for(const a of c.arms)assert.equal(a.deltaM,a.errorM-c.arms[0].errorM);
}
const {env}=require('./continuity.cjs');
(async()=>{const e=env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 assert(!e.nodes['attack-interactions'].hidden);assert(e.nodes['attack-interactions'].innerHTML.includes('<table'));assert(e.nodes['attack-interactions'].innerHTML.includes('10.11'));
 e.nodes['reference-sequence'].onchange({target:{value:'2'}});assert(e.nodes['attack-interactions'].hidden);assert.equal(e.nodes['attack-interactions'].innerHTML,'');
 const offset=require('../data/metrica-analysis.json').clips.length+require('../data/audit-windows.json').clips.length;
 e.nodes['reference-sequence'].onchange({target:{value:String(offset+1)}});assert(e.nodes['attack-interactions'].innerHTML.includes('excluida'));assert(!e.nodes['attack-interactions'].innerHTML.includes('<table'));
 console.log('PASS: exact factorial reproduction, unchanged baseline, narrow diagnostic-only interventions, viewer and exclusions');
})().catch(e=>{console.error(e);process.exitCode=1;});
