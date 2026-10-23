const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 p.x=x(50);p.y=32;p.bodyAngle=t?Math.PI:0;p.controlUntil=0;
 for(const q of s.players){if(q===p)continue;q.x=x(q.t===t?15:90);q.y=55;}
 const q=s.players.find(q=>q.t===t&&q.n===10);q.x=x(68);q.y=32;q.vx=t?-6:6;q.vy=0;q.bodyAngle=t?Math.PI:0;
 return {e,s,p,q,x,t};
}
function choose(c){c.e.t.chooseAction(c.p);const f=c.e.t.get().flight;assert(f&&f.target===c.q,'pass to selected runner');return f.execution;}
for(const t of [0,1]){
 const c=setup(t),result=choose(c);
 assert((result.intendedX-c.q.x)*(t?-1:1)>3,'lead forward runner rather than pass behind run');
 assert.equal(result.intendedY,32);
 assert.match(c.e.nodes.status.textContent,/pasa al espacio/);
 const still=setup(t);still.q.vx=0;assert.equal(choose(still).intendedX,still.q.x,'stationary teammate: feet');
 const back=setup(t);back.q.vx*=-1;assert.equal(choose(back).intendedX,back.q.x,'no forward-run assumption for retreating teammate');
 const long=setup(t);long.q.x=long.x(90);
 for(const r of long.s.players.filter(q=>q.t!==t))r.x=long.x(98);
 assert.equal(choose(long).intendedX,long.q.x,'retain feet option when lead exceeds automatic passing range');
 const blocked=setup(t),r=blocked.s.players.find(q=>q.t!==t);r.x=blocked.x(72);r.y=33;
 assert.equal(choose(blocked).intendedX,blocked.q.x,'reject lead destination with worse pressure');
 const line=setup(t);for(const r of line.s.players.filter(q=>q.t!==t))r.x=line.x(70);
 assert((choose(line).intendedX-line.x(70))*(t?-1:1)>0,'onside runner may receive beyond defensive line');
 function remembered(vx){
  const a=setup(t);a.e.t.observeTeammates(a.p);a.e.t.observeRivals(a.p);
  a.p.bodyAngle=t?0:Math.PI;a.e.t.scenario({time:1.1,team:t});
  for(const m of a.s.players.filter(m=>m.t===t&&m!==a.p&&m!==a.q)){m.x=a.x(90);m.y=55;}
  a.q.x=a.x(85);a.q.vx=vx;
  return choose(a);
 }
 const memoryA=remembered(9),memoryB=remembered(-9);
 assert.equal(memoryA.intendedX,c.x(68),'remembered receiver: last position only');
 assert.equal(JSON.stringify(memoryA),JSON.stringify(memoryB),'hidden receiver velocity cannot change automatic pass');
}
console.log('PASS: mirrored automatic lead pass, stationary/retreating/pressured countercases, onside run beyond line, hidden-velocity independence');
