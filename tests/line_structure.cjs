const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {shape:possessionShape,line:positionalLine,covers:lineCoverAssignments,set:(p,time)=>{owner=p;elapsed=time;bx=p.x;by=p.y;}};');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null),dir=t?-1:1,ball={x:50,y:32},mates=e.t.team(t);
 for(const p of mates){p.formation=formation;p.x=t?1:99;p.y=60;p.attackOrigin={bx:50,by:32,x:p.x,y:p.y};p.widthStarted=0;}
 const outgoing=mates.find(p=>p.n===2),cover=mates.find(p=>p.n===6),ref=h.shape(outgoing,ball);
 outgoing.x=ref.x+dir*12;outgoing.y=ref.y;cover.x=ref.x+dir*10;cover.y=ref.y;
 h.set(outgoing,20);
 assert.equal(h.covers(mates,ball,outgoing,[],[]).size,0,'do not react to a momentary excursion');
 h.set(outgoing,21.1);let map=h.covers(mates,ball,outgoing,[],[]);
 assert.equal(map.get(cover),outgoing);assert.equal(cover.lineCoverFor,outgoing.id);
 assert.equal(h.line(outgoing),1);assert.equal(h.line(cover),2);
 const replacement=h.shape(cover,ball,outgoing.n);assert(Math.hypot(ref.x-replacement.x,ref.y-replacement.y)<1e-9);
 const role=cover.role,n=cover.n;const start={x:cover.x,y:cover.y};
 for(let i=0;i<120;i++)e.t.advancePlayer(cover,ref.x,ref.y,1/60);
 assert(Math.hypot(cover.x-ref.x,cover.y-ref.y)<Math.hypot(start.x-ref.x,start.y-ref.y),'cover travels physically toward vacated post');
 assert.equal(cover.role,role);assert.equal(cover.n,n,'temporary reference never rewrites original position');
 assert.equal(h.covers(mates,ball,outgoing,[cover],[]).size,0,'support takes priority');
 assert.equal(h.covers(mates,ball,outgoing,[],[cover]).size,0,'safety takes priority');
 h.covers(mates,ball,outgoing,[],[]);
 assert.equal(h.covers(mates,ball,null,[],[]).size,0,'end of advancement releases cover');
 assert.equal(cover.lineCoverFor,undefined);assert.equal(outgoing.lineExitAt,undefined);
 assert.notEqual(h.shape(cover,ball).x,ref.x,'cover recovers its original reference');
 // Persist and clear the assignment with the normal checkpoint lifecycle.
 h.set(e.t.get().owner,25);e.t.prepareDecision();cover.lineCoverFor=outgoing.id;cover.lineExitAt=24;e.t.restorePosition();
 assert.equal(cover.lineCoverFor,undefined);assert.equal(cover.lineExitAt,undefined);
}
// Isolate the integration with attack targets: no local support assignments in this fixture.
for(const t of [0,1]){
 const e=env(html.replace('const ranked=selectAttackSupports(mates,focus,p=>readings.get(p).value);','const ranked=[];'));
 const h=e.t.phaseRelations(null),dir=t?-1:1,mates=e.t.team(t),outgoing=mates.find(p=>p.n===2),cover=mates.find(p=>p.n===6);
 for(const p of mates){p.x=t?1:99;p.y=60;p.attackOrigin={bx:50,by:32,x:p.x,y:p.y};p.widthStarted=0;}
 outgoing.x=50;outgoing.y=t?55:9;cover.x=50-dir*12;cover.y=outgoing.y;
 for(const n of [3,4]){const p=mates.find(p=>p.n===n);p.x=50-dir*35;p.y=n===3?24:40;}
 h.set(outgoing,20);e.t.setDestinationTrace(true);e.t.attackingTargets(t,{x:50,y:outgoing.y});
 h.set(outgoing,22);e.t.attackingTargets(t,{x:50,y:outgoing.y});
 const row=e.t.getDestinationTrace().rows.find(r=>r.id===cover.id);
 assert(row.steps.some(s=>s.stage==='Compensar línea 1 · puesto #2'),'compensation reaches actual attack target pipeline');
 const ref=h.shape(cover,{x:50,y:outgoing.y},2),step=row.steps.find(s=>s.stage==='Compensar línea 1 · puesto #2');
 assert(Math.hypot(step.x-ref.x,step.y-ref.y)<.01);
}
console.log('PASS: 4 systems ×2 directions, delayed departure, cross-line cover, physical travel, priorities, return, snapshots and target integration');
