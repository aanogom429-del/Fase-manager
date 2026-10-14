const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {env,signature}=require('./continuity.cjs');
const e=env(),metrics=e.t.defensiveMetrics;
const fixtures=[{t:0,n:1,x:5,y:32},{t:0,n:2,x:48,y:32},{t:0,n:3,x:43,y:35},...Array.from({length:8},(_,i)=>({t:0,n:i+4,x:20,y:8+i*6}))];
const a=metrics(fixtures,0,{x:50,y:32});assert.equal(a.nearest,2);assert.equal(a.covers.join(','),'3');assert.equal(a.goalSide,10);
const mirror=fixtures.map(p=>({...p,t:1,x:100-p.x,y:64-p.y}));const b=metrics(mirror,1,{x:50,y:32});assert.equal(JSON.stringify(a),JSON.stringify(b));
assert.equal(metrics(fixtures.slice(1),0,{x:50,y:32}),null);assert.equal(metrics(fixtures,0,null),null);
const before=signature(e);e.t.startLossTrace(1);assert.equal(signature(e),before,'observer must not change game state');
// Controlled clock: sampling never drives movement or RNG; thresholds use game time.
e.t.scenario({time:2.01,team:0});e.t.sampleLossTrace();assert.equal(e.t.get().lossTrace.samples.length,2);
e.t.scenario({time:5.01,team:0});e.t.sampleLossTrace();assert.equal(e.t.get().lossTrace.samples.length,3);assert(e.t.get().lossTrace.finished);
e.t.restorePosition();assert.equal(e.t.get().lossTrace,null);
// New owner identifies the team that lost the ball; no synthetic transition for a teammate.
e.t.startSituation();let s=e.t.get();e.t.capture(s.players.find(p=>p.t===0&&p.n===6),'recibe');assert.equal(e.t.get().lossTrace,null);
e.t.capture(s.players.find(p=>p.t===1&&p.n===6),'intercepta');assert.equal(e.t.get().lossTrace.team,0);assert.equal(e.t.get().lossTrace.samples[0].at,0);
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/metrica-analysis.json'),'utf8'));
const clips=data.clips.filter(c=>c.transition);assert.equal(clips.length,4);
const report=clips.map(c=>{
 assert(c.events.some(e=>e.type==='RECOVERY'&&e.team!==c.team&&e.start===c.start));
 return {id:c.id,team:c.team,anchor:c.start,measurements:[0,2,5].map(at=>{
  const f=c.frames.find(f=>Math.abs(f.time-c.start-at)<.001);assert(f,'exact timestamp required');
  const m=metrics(f.players.map(([t,n,x,y])=>({t,n,x,y})),c.team,{x:f.ball[0],y:f.ball[1]},c.team?25:11,1.05,68/64);assert(m);
  return {at,frame:f.frame,...m};
 })};
});
async function checkUI(){
 e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 for(let i=4;i<8;i++){e.nodes['reference-sequence'].onchange({target:{value:String(i)}});assert.equal(e.nodes['transition-jumps'].hidden,false);
  for(const [id,at] of [['transition-zero',0],['transition-two',2],['transition-five',5]]){e.nodes[id].onclick();assert(e.nodes['reference-clock'].textContent.includes((data.clips[i].start+at).toFixed(2)));}
 }
 e.nodes['reference-sequence'].onchange({target:{value:'0'}});assert.equal(e.nodes['transition-jumps'].hidden,true);
 fs.writeFileSync(path.join(__dirname,'../data/defense-observations.json'),JSON.stringify({version:'0.20',source:data.source,units:'source pitch metres (105 x 68)',scope:'Descriptive observed geometry, four selected clips from one match; not a calibration or matched simulation validation.',clips:report},null,2)+'\n');
 console.log('PASS: mirrored defense, missing data, passive observation, game-time sampling, loss identity, reset and event-aligned UI');console.log(JSON.stringify(report));
}
checkUI().catch(e=>{console.error(e);process.exitCode=1;});
