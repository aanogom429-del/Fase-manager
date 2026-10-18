// Archived 0.34 replay; not a validation of the current engine.
process.env.FASE_ENGINE_SOURCE=require('node:path').join(__dirname,'fixtures/engine-v034.html');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {evaluate,definitions}=require('../scripts/evaluate_game2.cjs'),{env}=require('./continuity.cjs');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/metrica-analysis.json'),'utf8'));
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/game2-validation.json'),'utf8'));
async function run(){
 for(const definition of definitions){
  const clip=data.clips.find(c=>c.id===definition.id),before=JSON.stringify(clip),result=evaluate(clip,definition);
  assert.deepEqual(result,report.clips.find(c=>c.id===definition.id),'report must reproduce exactly');assert.equal(JSON.stringify(clip),before,'tracking stays unchanged');
  const reordered=structuredClone(clip);for(const frame of reordered.frames)frame.players.reverse();assert.deepEqual(evaluate(reordered,definition),result,'identity mapping independent of source order');
  for(const kind of ['ball','duplicate','identity','gap']){
   const broken=structuredClone(clip),f=broken.frames.filter(f=>f.time>=definition.start&&f.time<=definition.end);
   if(kind==='ball')f[1].ball=null;
   if(kind==='duplicate')f[1].players[1]=[...f[1].players[0]];
   if(kind==='identity')f[1].players[1][1]=999;
   if(kind==='gap')broken.frames=broken.frames.filter(x=>x!==f[1]&&x!==f[2]);
   assert.throws(()=>evaluate(broken,definition),undefined,kind+' must not be interpolated');
  }
 }
 assert.equal(report.clips[0].players,7);assert.equal(report.clips[1].players,10);
 const e=env(),before=JSON.stringify(e.t.get().players.map(p=>[p.x,p.y]));e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 for(const id of ['game2-throw','game2-corner']){e.nodes['reference-sequence'].onchange({target:{value:String(data.clips.findIndex(c=>c.id===id))}});assert(e.nodes['reference-game2'].textContent.includes('Error medio: motor'));assert(!e.nodes['reference-game2'].hidden);}
 e.nodes['reference-sequence'].onchange({target:{value:'0'}});assert(e.nodes['reference-game2'].hidden);
 assert.equal(JSON.stringify(e.t.get().players.map(p=>[p.x,p.y])),before,'reference must not mutate match');
 console.log('PASS: reproducible second-match contrast, stable identities, missing-data rejection, UI disclosure and game isolation');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
