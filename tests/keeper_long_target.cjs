const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const ps=e.t.get().players,x=v=>t?100-v:v,p=ps.find(q=>q.t===t&&q.n===1);
 for(const q of ps){q.x=x(q.t===t?20:85);q.y=32;}
 p.x=x(8);p.y=32;p.bodyAngle=t?Math.PI:0;
 const a=ps.find(q=>q.t===t&&q.n===9),b=ps.find(q=>q.t===t&&q.n===10),r=ps.find(q=>q.t!==t);
 return {e,ps,x,p,a,b,r};
}
for(const t of [0,1]){
 const short=setup(t);short.e.t.goalkeeperLong(short.p);let f=short.e.t.get().flight;
 assert.equal(f.target,null,'no false receiver for a kick beyond all short supports');assert.equal(f.execution.intendedX,short.x(50));assert(f.keeperLong&&f.loft===7);
 const c=setup(t);c.a.x=c.x(50);c.a.y=40;c.e.t.goalkeeperLong(c.p);f=c.e.t.get().flight;
 assert.equal(f.target,c.a);assert.equal(f.execution.intendedX,c.a.x);assert.equal(f.execution.intendedY,c.a.y);
 const choice=setup(t);choice.a.x=choice.x(50);choice.b.x=choice.x(48);choice.b.y=46;choice.r.x=choice.a.x;choice.r.y=32;
 choice.e.t.goalkeeperLong(choice.p);assert.equal(choice.e.t.get().flight.target,choice.b,'prefer less pressured long receiver');
 const far=setup(t);far.a.x=far.x(61);far.a.y=60;far.e.t.goalkeeperLong(far.p);assert.equal(far.e.t.get().flight.target,null,'range uses total distance, not horizontal distance alone');
 const off=setup(t);off.a.x=off.x(60);for(const r of off.ps.filter(q=>q.t!==t))r.x=off.x(55);
 off.e.t.goalkeeperLong(off.p);assert.equal(off.e.t.get().flight.target,null,'exclude perceived offside receiver in open play');
 const restart=setup(t);restart.a.x=restart.x(60);for(const r of restart.ps.filter(q=>q.t!==t))r.x=restart.x(55);
 restart.e.t.goalkeeperLong(restart.p,'goalKick');assert.equal(restart.e.t.get().flight.target,restart.a);assert(restart.e.t.get().offsidePhase.exempt,'goal kick keeps exemption');
 function remembered(hiddenX){const m=setup(t);m.a.x=m.x(50);m.a.y=40;m.e.t.observeTeammates(m.p);m.e.t.observeRivals(m.p);m.p.bodyAngle=t?0:Math.PI;m.a.x=m.x(hiddenX);m.e.t.goalkeeperLong(m.p);return m.e.t.get().flight.execution.intendedX;}
 assert.equal(remembered(65),c.x(50));assert.equal(remembered(70),c.x(50),'hidden movement does not change remembered target');
}
console.log('PASS: mirrored long destination consistency, pressure choice, range, offside/exemption and remembered target');
