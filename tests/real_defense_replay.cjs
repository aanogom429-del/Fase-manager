const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const replay=require('../scripts/evaluate_real_defense_replay.cjs');
const root=path.join(__dirname,'..'),data=replay.read(path.join(root,replay.plan.source));
// Event contexts are saved in the report so tests never need external CSVs.
const reportPath=process.env.FASE_DEFENSIVE_REPLAY_REPORT||path.join(root,'data/real-defense-replay.json.gz');
const report=replay.read(reportPath),context=report.context,src=replay.sources();
const clone=v=>JSON.parse(JSON.stringify(v));
assert.deepEqual(report.plan,replay.plan);assert.equal(report.sourceDataSha256,replay.hash(fs.readFileSync(path.join(root,replay.plan.source))));
assert.equal(report.adapterSha256,replay.hash(fs.readFileSync(path.join(root,'scripts/evaluate_real_defense_replay.cjs'))));
for(const [v,s]of Object.entries(src))assert.equal(report.engineSha256[v],replay.hash(s));
const carrier=context['transition-red'];
assert.equal(replay.stateAt(carrier,374.2).carrier,6,'Recorded controlled carrier must reach the defensive policy');
assert.equal(replay.stateAt(carrier,376).carrier,null,'Private receiver is not a current carrier during transit');
assert.equal(replay.stateAt(carrier,378).carrier,10,'Observed completed reception changes carrier');
const clipped=data.clips.find(c=>c.id==='game2-shot-298'),p=replay.prepare(clipped,context[clipped.id]);
assert.equal(p.continuousStart,739.2,'Do not simulate defence across the team own-possession interval');
assert.equal(p.initialTime,739.24);assert.equal(p.end,740.6);
assert.deepEqual(Object.values(p.groups).map(a=>a.length),[2,4,4]);assert.equal(new Set(Object.values(p.groups).flat()).size,10);
const bad=clone(clipped);bad.frames.find(f=>f.time===739.6).ball=null;
assert.throws(()=>replay.prepare(bad,context[clipped.id]),/Incomplete/,'Missing input must not be interpolated');
const transition=data.clips.find(c=>c.id==='transition-red'),prepared=replay.prepare(transition,context[transition.id]);
const short={...prepared,frames:prepared.frames.slice(0,4),end:prepared.frames[3].time};
for(const engine of ['v053','e28'])for(const hypothesis of replay.plan.bodyHypotheses){
 const a=replay.simulate(src[engine],short,context[transition.id],hypothesis,{auditEveryStep:true});
 assert(a.auditedSteps>0&&a.seedStable);assert(a.probe.carrierQueries>0,'Shot protection cannot be silently disabled by owner=null');
 const changed=clone(context[transition.id]).map(e=>({...e,to:[999,-999],from:[-999,999],subtype:'ON TARGET-GOAL'}));
 const b=replay.simulate(src[engine],short,changed,hypothesis);
 assert.deepEqual(a.samples,b.samples,'Private event endpoints and outcome label do not select destinations');
}
const altered=clone(transition);
for(const frame of altered.frames.filter(f=>f.time>prepared.initialTime))for(const player of frame.players){
 if(player[0]===prepared.defendingTeam&&player[1]!==[11,25][prepared.defendingTeam])player[2]=Math.min(99,player[2]+20);
}
const ap=replay.prepare(altered,context[transition.id]),ashort={...ap,frames:ap.frames.slice(0,4),end:ap.frames[3].time};
const originalRun=replay.simulate(src.e28,short,context[transition.id],'ball-facing'),alteredRun=replay.simulate(src.e28,ashort,context[transition.id],'ball-facing');
assert.deepEqual(alteredRun.samples.map(s=>s.predicted),originalRun.samples.map(s=>s.predicted),'Future recorded defensive positions are observer-only and must not steer free defenders');
const f=transition.frames[0],known=data.clips.find(c=>c.id===transition.id).samples[0],measured=replay.geometry(f.players,f.ball,transition.defendingTeam);
assert(Math.abs(measured.nearestDistanceM-known.nearestDistanceM)<1e-9);assert.equal(measured.goalSide,known.goalSideCount);assert.equal(measured.centralZone,known.centralZoneCount);
for(const c of data.clips){const p=replay.prepare(c,context[c.id]),observed=replay.reference(p,'observed'),stationary=replay.reference(p,'stationary');
 for(const error of Object.values(observed.meanErrorM))assert.equal(error,0);
 assert.equal(stationary.samples[0].errorM.all,0,'References share the simulation initial state');
 const sorted=clone(c);sorted.frames.forEach(f=>f.players.reverse());const reordered=replay.prepare(sorted,context[c.id]);
 assert.deepEqual(reordered.groups,p.groups,'Row order must not change the fixed subgroups');
}
assert.equal(report.rows.length,replay.plan.clips.length*(report.mode==='full'?2:1));
for(const row of report.rows){const prepared=replay.prepare(data.clips.find(c=>c.id===row.clipId),context[row.clipId]);
 assert.equal(row.initialTime,prepared.initialTime);assert.equal(row.end,prepared.end);assert.deepEqual(row.groups,prepared.groups);
 for(const [v,r]of Object.entries(row.results)){
  assert(r.seedStable);const recomputed=replay.score(r.samples,prepared);
  assert.deepEqual(recomputed.meanErrorM,r.meanErrorM);assert.deepEqual(recomputed.meanAbsoluteMetricError,r.meanAbsoluteMetricError);
  for(const s of r.samples){assert.equal(s.predicted.filter(p=>p[0]===prepared.defendingTeam).length,11);for(const p of s.predicted)assert(p.slice(2).every(Number.isFinite));}
 }
 for(const name of replay.plan.references)assert.deepEqual(row.references[name],replay.reference(prepared,name));
}
// Mirror one controlled interval with corresponding identity/capability slots.
const swap=(t,n)=>t===0?(n===11?25:n+14):(n===25?11:n-14);
const mirrored=clone(transition);mirrored.defendingTeam=1-transition.defendingTeam;
for(const f of mirrored.frames){f.ball=[100-f.ball[0],64-f.ball[1]];f.players=f.players.map(([t,n,x,y])=>[1-t,swap(t,n),100-x,64-y]);}
const flipped=context[transition.id].map(e=>({...e,team:1-e.team,sender:e.sender===null?null:swap(e.team,e.sender),receiver:e.receiver===null?null:swap(e.team,e.receiver)}));
const mp=replay.prepare(mirrored,flipped),ms={...mp,frames:mp.frames.slice(0,4),end:mp.frames[3].time};
const a=replay.simulate(src.e28,short,context[transition.id],'ball-facing'),b=replay.simulate(src.e28,ms,flipped,'ball-facing');
assert(Math.abs(a.meanErrorM.all-b.meanErrorM.all)<1e-7,'Geometrically mirrored short replay should remain symmetric');
console.log('PASS controlled real defensive replay: imposed actors/ball checked at every step, carrier activation, past-only initialization, missing-data refusal, zero observed-reference error, stable groups, mirror, no private endpoints/outcomes and report provenance');
