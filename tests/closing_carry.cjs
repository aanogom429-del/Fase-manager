const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
function setup(t,vy){
 const e=env(process.env.BASELINE_HTML?fs.readFileSync(process.env.BASELINE_HTML,'utf8'):undefined);e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?15:90);q.y=55;q.vx=0;q.vy=0;}
 p.x=50;p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 const r=s.players.find(q=>q.t!==t&&q.n===6);r.x=x(54);r.y=37;r.vy=vy;
 return {e,p,r,x};
}
for(const t of [0,1]){
 const close=setup(t,-8);close.e.t.chooseAction(close.p);

 const away=setup(t,6);away.e.t.chooseAction(away.p);assert.equal(away.p.driveX,away.x(57));assert.equal(away.p.driveY,27,'keep route away from retreating rival');
 assert.notDeepEqual([close.p.driveX,close.p.driveY],[away.p.driveX,away.p.driveY],'closing trajectory changes route');
 const still=setup(t,0);still.e.t.chooseAction(still.p);assert.equal(still.p.driveX,still.x(57));
 const hidden=vy=>{const c=setup(t,vy);c.r.x=c.x(20);c.e.t.chooseAction(c.p);return [c.p.driveX,c.p.driveY];};
 assert.deepEqual(hidden(-6),hidden(6),'unseen rival velocity cannot change carry');
}
console.log('PASS: mirrored closing, retreating, static and hidden-velocity carry decisions');
