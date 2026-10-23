const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {env,signature}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('startSituation();requestAnimationFrame(frame);','startSituation();requestAnimationFrame(frame);globalThis.test.comparison=()=>comparisonRows;globalThis.test.finish=finishSituation;globalThis.test.next=nextDecision;globalThis.test.drawComparison=renderComparison;');
function resolve(e){for(let i=0;i<4000&&['resolve','settle'].includes(e.t.get().stage);i++)e.tick();assert.equal(e.t.get().stage,'review');}
for(const team of [0,1]){
 const e=env(html);e.t.enterFreeMode();e.t.scenario({time:70,team});e.t.enterDecisionMode();
 const initial=signature(e),start=e.t.get();const time=start.elapsed,ball=start.bx,shots=start.shots,goals=[...start.score];
 assert.equal(e.nodes['comparison-panel'].hidden,true);
 for(const choice of ['support','progress']){
  e.t.playChoice(choice);resolve(e);
  const row=e.t.comparison().at(-1),end=e.t.get();assert.equal(row.seconds,end.elapsed-time);assert.equal(row.advance,end.bx-ball);assert.equal(row.shots,end.shots-shots);assert.equal(row.team,end.owner.t);assert.deepEqual(Array.from(row.goals),Array.from(end.score,(v,i)=>v-goals[i]));
  const n=e.t.comparison().length;e.t.finish();assert.equal(e.t.comparison().length,n,'no duplicate record');
  e.t.restorePosition();assert.equal(signature(e),initial);assert.equal(e.t.comparison().length,n,'retry keeps results');
 }
 assert.equal(e.nodes['comparison-rows'].children.length,2);assert.equal(e.nodes['comparison-panel'].hidden,false);
 e.t.playChoice('support');resolve(e);e.t.next();assert.equal(e.t.comparison().length,0,'new situation clears results');
 e.t.startSituation();assert.equal(e.nodes['comparison-panel'].hidden,true);
}
// Presentation inserts labels as text, and retains only eight attempts.
const e=env(html);
e.t.playChoice('support');resolve(e);const row=e.t.comparison()[0];row.title='<b>literal</b>';e.t.drawComparison();assert.equal(e.nodes['comparison-rows'].children[0].children[0].textContent,'<b>literal</b>');
for(let i=0;i<9;i++){e.t.get();e.t.comparison().push({...row});}e.t.restorePosition();e.t.playChoice('support');resolve(e);assert.equal(e.t.comparison().length,8);
e.t.enterFreeMode();assert.equal(e.t.comparison().length,0);
console.log('PASS comparison: both possession teams, measured deltas, retry retention, duplicate guard, new-situation/restart/mode reset');
