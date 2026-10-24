const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?15:80);q.y=50;}
 const r=s.players.filter(q=>q.t!==t);
 for(const [i,dx,y] of [[0,55,32],[1,54,28],[2,54,36]]){r[i].x=x(dx);r[i].y=y;}
 return {e,s,p,x,r};
}
for(const t of [0,1]){
 const c=setup(t);c.e.t.chooseAction(c.p);assert.equal(c.e.t.get().flight,null);assert.equal(c.p.driveX,c.x(50));assert.equal(Math.abs(c.p.driveY-32),5);assert.equal(c.p.scanUntil,0);
 assert.match(c.e.nodes.status.textContent,/lateralmente/);
 const q={x:c.p.driveX,y:c.p.driveY};assert(c.e.t.perceivedLane(c.p,q,c.e.t.perceivedOpposition(c.p)).clearance>3.2);
 for(let i=0;i<30;i++)c.e.t.advancePlayer(c.p,q.x,q.y,1/60);
 assert(Math.abs(c.p.y-32)>0&&Math.abs(c.p.y-32)<5,'physical movement without teleport');
 const press=setup(t);press.r[0].x=press.x(53);press.e.t.chooseAction(press.p);assert.equal(press.p.scanUntil,1.6,'immediate pressure still prevents carry');
 const shut=setup(t);shut.r[3].x=shut.x(50);shut.r[3].y=27;shut.r[4].x=shut.x(50);shut.r[4].y=37;
 shut.e.t.chooseAction(shut.p);assert.equal(shut.p.scanUntil,1.6,'all routes closed: scan');
 function hidden(y){const h=setup(t);h.r[3].x=h.x(20);h.r[3].y=y;h.e.t.chooseAction(h.p);return [h.p.driveX,h.p.driveY];}
 assert.deepEqual(hidden(20),hidden(40),'unseen opponent does not select lateral side');
 const open=setup(t);for(const r of open.r){r.x=open.x(80);r.y=50;}open.e.t.chooseAction(open.p);assert.equal(open.p.driveX,open.x(57),'forward carry keeps priority');
}
console.log('PASS: mirrored lateral escape, actual movement, forward priority, pressure, fully closed routes and hidden-state independence');
