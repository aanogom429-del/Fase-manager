const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {shape:possessionShape,covers:lineCoverAssignments,set:time=>elapsed=time};');
for(const t of [0,1]){
 const e=env(html),h=e.t.phaseRelations(null),mates=e.t.team(t),dir=t?-1:1,ball={x:50,y:32};
 for(const p of mates){p.x=t?1:99;p.y=32;p.attackOrigin={bx:50};}
 const outgoing=mates[2],slow=mates[5],fast=mates[6],ref=h.shape(outgoing,ball);
 Object.assign(outgoing,{x:ref.x+12*dir,y:ref.y});
 const place=(p,gap,speed)=>Object.assign(p,{x:ref.x+gap*dir,y:ref.y,speed,acceleration:100,vx:0,vy:0,reactionDelay:0,bodyAngle:t?0:Math.PI});
 place(slow,6,2);place(fast,10,10);
 h.set(20);h.covers(mates,ball,outgoing,[],[]);h.set(22);
 assert.equal(h.covers(mates,ball,outgoing,[],[]).get(fast),outgoing,'farther but earlier arrival wins');
 place(slow,10,10);place(fast,10.5,10);
 assert.equal(h.covers(mates,ball,outgoing,[],[]).get(fast),outgoing,'small arrival difference retains incumbent');
 place(fast,10,2);
 assert.equal(h.covers(mates,ball,outgoing,[],[]).get(slow),outgoing,'clear arrival advantage replaces incumbent');
 assert(!h.covers(mates,ball,outgoing,[slow],[fast]).has(slow),'support priority remains');
 assert(!h.covers(mates,ball,outgoing,[slow],[fast]).has(fast),'safety priority remains');
}
console.log('PASS: mirrored arrival ranking, continuity margin, replacement and priority exclusions');
