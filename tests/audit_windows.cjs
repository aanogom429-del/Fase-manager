const assert=require('node:assert/strict'),{evaluate}=require('../scripts/evaluate_game2.cjs'),{env}=require('./continuity.cjs');
const data=require('../data/audit-windows.json'),report=require('../data/audit-validation.json'),original=require('../data/metrica-analysis.json');
async function run(){
 for(const c of data.clips){
  assert(c.frames.every(f=>f.players.length===22&&f.ball));
  for(const old of original.clips.filter(x=>x.match==='Sample Game 2'))assert(c.end<old.start||c.start>old.end,'new windows must not overlap earlier Game 2 windows');
  const result=evaluate(c,{id:c.id,start:c.start,end:c.end,attacking:true});assert.deepEqual(result,report.clips.find(x=>x.id===c.id));
 }
 const e=env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 for(let i=0;i<2;i++){e.nodes['reference-sequence'].onchange({target:{value:String(original.clips.length+i)}});assert(e.nodes['reference-game2'].textContent.includes('Auditoría 0.32'));assert(!e.nodes['reference-game2'].hidden);}
 console.log('PASS: fixed non-overlapping complete audit windows, reproducible comparison and viewer');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
