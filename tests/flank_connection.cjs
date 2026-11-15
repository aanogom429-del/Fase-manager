const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=source.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return flankComplement;');
for(const t of [0,1])for(const side of [0,1]){
 const e=env(html),read=e.t.phaseRelations(null);e.t.scenario({time:10,team:t});const holder=e.t.get().owner,p=e.t.team(t).find(p=>p.role==='fullback'),w=e.t.team(t).find(p=>p.role==='winger'),x=v=>t?100-v:v,y=v=>side?64-v:v;
 holder.x=x(20);holder.y=y(32);p.x=x(50);p.y=y(8);p.bodyAngle=t?Math.PI:0;p.attackSupport=0;p.attackBalance=0;
 p.visualMemory=[{id:w.id,x:x(56),y:y(8),seenAt:10},{id:holder.id,x:x(20),y:y(32),seenAt:10}];
 p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:x(95),y:y(32),seenAt:10}));
 const anchor={x:p.x,y:p.y},destination={x:x(50),y:y(20)};assert(read(p,anchor),'open connection allowed');
 p.rivalMemory[0].x=x(40);p.rivalMemory[0].y=y(24);const view=e.t.perceivedOpposition(p);
 assert(e.t.perceivedSpace(destination,view)>=5,'destination itself is free');
 assert(e.t.perceivedLane(p.visualMemory[1],p,view).risk<=3,'current outlet is available');
 assert(e.t.perceivedLane(p.visualMemory[1],destination,view).risk>3,'new connection is intercepted');
 assert.equal(read(p,anchor),null,'do not recommend free destination behind a blocked lane');
 // Moving hidden live positions must not erase the observed blocker or move the observed passer.
 e.t.opp(t)[0].x=x(95);holder.x=x(90);assert.equal(read(p,anchor),null);
 p.rivalMemory[0].x=x(95);assert(read(p,anchor));
 p.visualMemory[1].seenAt=9;assert.equal(read(p,anchor),null,'outdated passer');
 p.visualMemory.pop();assert.equal(read(p,anchor),null,'unobserved passer');
}
console.log('PASS: four mirrored cases of free destination/blocked lane, existing clear outlet, fresh passer and no hidden position access');
