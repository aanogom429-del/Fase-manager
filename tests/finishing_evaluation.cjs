const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {simulate,definitions,run,sources,simulationHash}=require('../scripts/evaluate_finishing_v0531.cjs');
const old=require('../scripts/evaluate_finishing_v053.cjs'),source=fs.readFileSync(path.join(__dirname,'fixtures/engine-v053.html'),'utf8');
for(const t of [0,1])for(const kind of ['pass','free']){
 const a=simulate(source,t,kind,101,{keeperHome:false}),b=old.simulate(source,t,kind,101),c=simulate(source,t,kind,101,{keeperHome:false,observe:false});
 for(const key of ['goalsConceded','passes','shots','turnovers','firstShotOutcome']){assert.equal(a[key],b[key],key);assert.equal(a[key],c[key],key);}
 assert.equal(JSON.stringify(a.final),JSON.stringify(c.final),'Observer cannot alter trajectories or RNG');
}
for(const t of [0,1]){
 const corrected=simulate(source,t,'pass',101,{seconds:1}),legacy=simulate(source,t,'pass',101,{seconds:1,keeperHome:false});
 const id=t*11,g=corrected.initial.find(p=>p.id===id);
 assert.equal(g.x,g.hx);assert.equal(g.y,g.hy);
 assert.equal(corrected.final.find(p=>p.id===id).x,g.x,'Anchored keeper does not drift out of goal');
 assert.notEqual(legacy.final.find(p=>p.id===id).x,g.x,'Historical defect remains reproducible');
}
const adverse=simulate(source,1,'pass',101,{trace:true});assert.equal(adverse.goalsConceded,1,'Correcting setup does not erase audited adverse case');
assert(adverse.events.some(e=>e.type==='kick'&&e.kind==='shot'&&e.team===0));
assert.equal(adverse.metrics.shotsConceded,1);assert.equal(adverse.metrics.tackleRecoveries,0);
const defs=definitions();assert.equal(defs.length,76);assert(defs.filter(c=>c.group==='reserved').every(c=>![101,202].includes(c.seed)&&c.options.seconds===12));
console.log('PASS: passive observer, legacy equivalence, corrected keeper anchors mirrored, audited adverse case and reserved protocol');

const cache=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-v0531-rejected.json'),'utf8'));
const one=[definitions()[0]],src={v053:sources().v053};
assert.equal(cache.simulationSha256,simulationHash());
const reused=run(one,src,cache);assert.deepEqual(reused.executionCounts,{fresh:0,reused:1});
const stale=run(one,src,{...cache,simulationSha256:'stale'});assert.deepEqual(stale.executionCounts,{fresh:1,reused:0});
assert.deepEqual(JSON.parse(JSON.stringify(stale.rows)),reused.rows,'Stale caches must be recomputed and preserve the results');
console.log('PASS: historical cache reuse only with matching simulation/source/configuration');
