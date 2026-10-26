const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
function setup(t,beaten=false){
 const e=env(process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined);e.t.scenario({time:1,team:1-t,seed:73});const s=e.t.get(),x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?10:90);q.y=55;}
 const p=s.players.find(q=>q.t===t&&q.n===3),r=s.players.find(q=>q.t!==t&&q.n===8);
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;r.x=x(45);r.y=32;
 const ball={x:x(beaten?30:70),y:32},target=()=>e.t.defendingTarget(p,4,ball);
 return {e,s,p,r,x,target};
}
for(const t of [0,1])for(const beaten of [false,true]){
 const c=setup(t,beaten),base=c.target();c.r.x=c.x(40);assert.equal(c.target().x,base.x,'hidden rival motion cannot pull containment/recovery');
 const seen=setup(t,beaten);seen.r.x=seen.x(55);const q=seen.target();assert.notEqual(q.x,base.x,'visible rival affects positioning');
 seen.p.bodyAngle=t?0:Math.PI;seen.r.x=seen.x(60);assert.equal(seen.target().x,q.x,'retain last seen location, not new hidden one');
 seen.e.t.scenario({time:1+seen.p.memoryDuration*.5,team:1-t});const half=seen.target();assert(Math.abs(half.x-base.x)<Math.abs(q.x-base.x),'old reference gradually weakens');
 seen.e.t.prepareDecision();const before=seen.target();seen.p.x=seen.x(20);seen.e.t.restorePosition();assert.equal(seen.target().x,before.x,'restore retains defensive reading');
 seen.e.t.scenario({time:4,team:1-t});assert.equal(seen.target().x,base.x,'expired reference stops pulling');
 const moving=setup(t,beaten);moving.r.x=moving.x(55);const dest=moving.target();for(let i=0;i<60;i++)moving.e.t.advancePlayer(moving.p,dest.x,dest.y,1/60);assert.notEqual(moving.p.x,moving.x(50),'destination produces physical movement');
}
console.log('PASS: mirrored containment/retreat, visible/hidden rivals, fading memory, expiry, restore and movement');
