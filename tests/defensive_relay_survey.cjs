const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {env}=require('./continuity.cjs'),survey=require('../scripts/survey_defensive_relay.cjs'),controls=require('../scripts/evaluate_finishing_resume.cjs'),evaluation=require('../scripts/evaluate_finishing_v0531.cjs');
const source=survey.instrument();
for(const t of [0,1]){
 const e=env(source);
 e.t.enterFreeMode();e.t.scenario({time:10,team:1-t,seed:101});
 const ps=e.t.get().players,f=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 for(const p of ps){Object.assign(p,f(75,60),{vx:0,vy:0,rivalMemory:[],visualMemory:[],cool:0});delete p.defDuty;delete p.intentAt;}
 const c=ps.find(p=>p.t!==t&&p.n===6),a=ps.find(p=>p.t===t&&p.n===6),b=ps.find(p=>p.t===t&&p.n===7);
 Object.assign(c,f(20,40));e.t.capture(c,'test');Object.assign(a,f(7,34.5),{bodyAngle:t?Math.PI:0,defDuty:'press'});Object.assign(b,f(12,35.8),{bodyAngle:t?Math.PI:0,defDuty:'cover'});
 for(const p of ps)e.t.observeRivals(p);
 const before=JSON.stringify(e.t.savePosition()),order=e.t.relayOrder(t,c);e.t.relaySurvey();
 assert.equal(JSON.stringify(e.t.savePosition()),before,'Survey cannot mutate player state, memories, intentions or random seed');
 const actual=e.t.defensiveOrder(t,c);assert.equal(order.press,actual[0]);assert.equal(order.cover,actual[1],'Survey must compare against the actual assignment, including hysteresis');
 // A hidden ball/carrier cannot produce a ready relay proposal.
 for(const p of [actual[0],actual[1]])if(p)p.bodyAngle=t?0:Math.PI;
 assert.equal(e.t.relaySurvey().stage,'not-mutually-visible');
 // Constructed opportunity: a pair can improve shot coverage without losing approach.
 for(const p of ps)delete p.defDuty;
 Object.assign(a,f(7,34.5),{bodyAngle:t?Math.PI:0,defDuty:'press'});
 Object.assign(b,f(8,40),{bodyAngle:t?Math.PI:0,defDuty:'cover'});
 for(const p of ps)e.t.observeRivals(p);
 const opportunity=e.t.relaySurvey();assert.equal(opportunity.stage,'candidate-ready');
 assert(opportunity.relayAccess<=opportunity.baseAccess);assert.equal(opportunity.base.filter(Boolean).length,2);assert.equal(opportunity.next.filter(Boolean).length,3);
 a.intentAt=10.1;a.intentX=f(15,40).x;a.intentY=f(15,40).y;
 assert.notEqual(e.t.relaySurvey().stage,'candidate-ready','A pending reading is not an immediately executable agreement');
 delete a.intentAt;
 const receiver=ps.find(p=>p.t!==t&&p.n===7);Object.assign(receiver,f(23,28));
 for(const p of ps)e.t.observeRivals(p);
 assert.equal(e.t.relaySurvey().stage,'no-pair-shot-gain','An additional perceived rival can make the baseline contain and already cover all rays');
}
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/finishing-resume-v0531.json'),'utf8'));
for(const c of [evaluation.definitions()[0],evaluation.definitions()[3],evaluation.definitions()[12],evaluation.definitions()[36]]){
 const observed=evaluation.simulate(source,c.t,c.kind,c.seed,c.options),plain=evaluation.simulate(controls.base,c.t,c.kind,c.seed,c.options);
 assert.deepEqual(controls.compact(observed),controls.compact(plain),'Instrumentation must not change counts, metrics or player states');
 const row=report.rows.find(r=>r.group===c.group&&r.t===c.t&&r.kind===c.kind&&r.seed===c.seed&&JSON.stringify(r.options)===JSON.stringify(c.options));
 assert.deepEqual(controls.compact(plain),row.results.e28,'Fresh baseline must match the frozen report');
}

const evidence=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/defensive-relay-survey.json'),'utf8'));
assert.equal(survey.verify(evidence).configurations,76);
const snapshots=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/defensive-relay-snapshots.json'),'utf8'));
assert.equal(snapshots.setupRecipeSha256,controls.hash(survey.situated.toString()));assert.equal(snapshots.rows.length,8);assert.equal(snapshots.freshSimulations,16);
assert.equal(snapshots.baseSha256,controls.hash(controls.base));assert.equal(snapshots.surveySha256,controls.hash(source));
assert.equal(new Set(snapshots.rows.map(r=>[r.t,r.kind,r.helperX].join('/'))).size,8);
for(const row of snapshots.rows){
 assert([0,1].includes(row.t)&&['pass','free'].includes(row.kind)&&[8,10].includes(row.helperX));
 assert.equal(row.seed,row.helperX===8?2017:3011);assert.equal(row.result.defendingTeam,row.t);assert.equal(row.result.kind,row.kind);assert.equal(row.result.seed,row.seed);
 assert.equal(row.sourceSha256,controls.hash(survey.situated(source,row.helperX)));assert.equal(row.baselineSha256,controls.hash(survey.situated(controls.base,row.helperX)));
}
console.log('PASS: mirrored relay opportunity and contextual counterexample, perception/readiness, pure actual-role audit, four fresh observer-on/off pairs, 76 unchanged cases and eight diagnostic snapshots');
