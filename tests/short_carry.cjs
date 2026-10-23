const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,blocked=true,hiddenX=15){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?15:80);q.y=50;}
 const rivals=s.players.filter(q=>q.t!==t);
 rivals[0].x=x(blocked?55:80);rivals[0].y=32;
 rivals[1].x=x(hiddenX);rivals[1].y=32;
 return {e,s,p,x,rivals};
}
for(const t of [0,1]){
 const a=setup(t);a.e.t.chooseAction(a.p);
 assert.equal(a.e.t.get().flight,null);
 assert.equal(a.p.driveX,a.x(53),'short advance when long diagonals are blocked');
 assert.equal(Math.abs(a.p.driveY-32),5);
 assert.equal(a.p.scanUntil,0);
 assert(a.e.t.perceivedLane(a.p,{x:a.p.driveX,y:a.p.driveY},a.e.t.perceivedOpposition(a.p)).clearance>3.2);
 const b=setup(t,false);b.e.t.chooseAction(b.p);
 assert.equal(b.p.driveX,b.x(57),'retain long forward carry in open space');
 assert.equal(b.p.driveY,32);
 const hidden=setup(t,true,25);hidden.e.t.chooseAction(hidden.p);
 assert.deepEqual([hidden.p.driveX,hidden.p.driveY],[a.p.driveX,a.p.driveY],'unseen rival movement cannot affect choice');
 const destination={x:a.p.driveX,y:a.p.driveY};
 for(let i=0;i<12;i++)a.e.t.advancePlayer(a.p,destination.x,destination.y,1/60);
 assert((a.p.x-50)*(t?-1:1)>0&&Math.abs(a.p.y-32)>0,'chosen diagonal produces actual movement');
 assert(Math.hypot(a.p.x-50,a.p.y-32)<Math.hypot(3,5),'no teleport to target');
 const pressure=setup(t);pressure.rivals[0].x=pressure.x(53);pressure.e.t.chooseAction(pressure.p);
 assert.equal(pressure.p.scanUntil,1.6,'do not force a carry under immediate pressure without outlet');
 const closed=setup(t);
 closed.rivals[2].x=closed.x(53);closed.rivals[2].y=27;
 closed.rivals[3].x=closed.x(53);closed.rivals[3].y=37;
 closed.e.t.chooseAction(closed.p);assert.equal(closed.p.scanUntil,1.6,'scan when both short diagonals are blocked');
}
console.log('PASS: mirrored short diagonal escape, open-lane long carry, hidden-rival independence, pressure and closed-route countercases');
