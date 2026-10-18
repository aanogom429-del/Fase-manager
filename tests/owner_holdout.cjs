const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {validate,evaluate,run}=require('../scripts/evaluate_owner_holdout.cjs');
const data=require('../data/owner-holdout-windows.json'),plan=require('../data/owner-holdout-plan.json');
const baseline=fs.readFileSync(path.join(__dirname,'fixtures/engine-v034.html'),'utf8');
function synthetic(team){
 const holder=team?19:5,ps=[],orient=(x,y)=>team?[100-x,64-y]:[x,y];
 for(const t of [0,1])for(let n=1;n<=11;n++){
  const jersey=n===1?(t?25:11):(t?n+13:n-1);
  let x=t===team?15:95,y=10+(n-1)*4;
  if(t===team&&n===6){x=50;y=32;}if(t===team&&n===7){x=56;y=23;}if(t===team&&n===8){x=42;y=41;}
  ps.push([t,jersey,...orient(x,y)]);
 }
 return {id:'synthetic',team,holder,start:0,end:1,events:[{type:'PASS',period:1,team,receiver:holder,end:0},{type:'PASS',period:1,team,sender:holder,start:1}],
  frames:Array.from({length:26},(_,i)=>({time:i/25,synchronized:true,ball:orient(50,32),players:structuredClone(ps)}))};
}
const left=evaluate(synthetic(0)),right=evaluate(synthetic(1));
assert(left.activationSteps>0,'owner-aware replay exercises the new rule');
assert.equal(left.activationSteps,right.activationSteps);assert(Math.abs(left.meanErrorM-right.meanErrorM)<1e-10,'mirrored results');
assert.equal(evaluate(synthetic(0),baseline).activationSteps,0);
assert(left.meanErrorM<evaluate(synthetic(0),baseline).meanErrorM,'synthetic preservation regression');
const reordered=synthetic(0);for(const f of reordered.frames)f.players.reverse();assert.deepEqual(evaluate(reordered),left,'identity mapping independent of order');
for(const mutate of [c=>c.frames[3].players.pop(),c=>c.frames[3].players[1]=c.frames[3].players[0],c=>c.frames[3].ball=null,c=>c.frames.splice(3,1),c=>c.frames[3].synchronized=false,c=>c.frames[3].ball=[90,32],c=>c.holder=999,c=>c.events[1].sender=1]){
 const c=synthetic(0);mutate(c);assert.throws(()=>validate(c));
}
for(const c of data.clips){assert(plan.windows.some(w=>w.id===c.id));validate(c);}
const original=JSON.stringify(data),a=run(),b=run();assert.deepEqual(a,b,'reproducible');assert.equal(JSON.stringify(data),original,'source unmodified');
assert.deepEqual(a,require('../data/owner-holdout-validation.json'),'stored report reproduces exactly');
assert.equal(a.clips.length,3);assert.equal(a.clips.filter(c=>!c.excluded&&c.after.activationSteps>0).length,1);
assert(a.clips.filter(c=>!c.excluded&&!c.after.activationSteps).every(c=>c.deltaErrorM===0));
// Every selected interval is new relative to previous Game 2 diagnostic windows.
const previous=[...require('../data/metrica-analysis.json').clips.filter(c=>c.match==='Sample Game 2'),...require('../data/audit-windows.json').clips,...require('../data/support-holdout-windows.json').clips];
for(const c of data.clips)for(const p of previous)assert(c.end<(p.start??p.frames[0].time)||c.start>(p.end??p.frames.at(-1).time));
console.log('PASS: owner-aware activation, mirrored geometry, identity order, corrupt-data rejection, new windows and exact report reproduction');

(async()=>{const e=require('./continuity.cjs').env();e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();const text=e.nodes['owner-contrast'].innerHTML;assert(text.includes('5.86 → 5.76'));assert(text.includes('74/375'));assert(text.includes('no demuestra'));console.log('PASS: owner-aware report visible with limits');})().catch(e=>{console.error(e);process.exitCode=1;});
