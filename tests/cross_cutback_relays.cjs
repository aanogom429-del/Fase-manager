const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const cutbackAblation=process.env.CUTBACK_ABLATION==='1';
const gate='if(press&&ref&&positionalLine(press)===1';assert(source.includes(gate));
const marker='return targets;\n}\nfunction movement(dt)';assert(source.includes(marker));
function run(t,kind,seed,enabled){
 let links=0,arrived=0;
 const baseline=cutbackAblation?source.replace('function cutbackProtection(p,ballPos){','function cutbackProtection(p,ballPos){return null;'):source.replace(gate,'if(false&&press&&ref&&positionalLine(press)===1');
 const input=(enabled?source:baseline).replace(marker,'probeRelay([...relays].map(([p])=>d(p,targets.get(p))));\n'+marker);
 const e=env(input,seed,{probeRelay:gaps=>{links+=gaps.length;arrived+=gaps.filter(d=>d<=3).length;}}),api=e.t;
 api.enterFreeMode();api.scenario({time:0,team:1-t,seed});
 const ps=api.get().players,flip=(x,y)=>({x:t?100-x:x,y:t?64-y:y});
 for(const p of ps){
  Object.assign(p,flip(p.t===t?(p.n===1?3:p.n<=5?8:p.n<=8?17:35):40,5+p.n*5),{vx:0,vy:0,visualMemory:[],rivalMemory:[],controlUntil:0,cool:0});
  p.bodyAngle=p.t===0?0:Math.PI;
 }
 const carrier=ps.find(p=>p.t!==t&&p.n===6),receiver=ps.find(p=>p.t!==t&&p.n===10);
 Object.assign(carrier,flip(22,10));Object.assign(receiver,flip(kind==='cross'?10:28,kind==='cross'?38:30));
 Object.assign(ps.find(p=>p.t===t&&p.n===2),flip(20,11));
 Object.assign(ps.find(p=>p.t===t&&p.n===7),flip(8,18));
 api.capture(carrier,'inicio centro/pase atrás');
 // Actual pass flight; same seed and state in the paired ablation.
 api.kickTo(carrier,receiver.x,receiver.y,'pass',receiver);
 assert(api.get().flight);if(kind==='cross'){api.get().flight.loft=5;api.get().flight.cross=true;}
 const initialGoals=api.get().score[1-t],initial=ps.map(p=>({x:p.x,y:p.y}));
 let exposed=0,observations=0;
 for(let frame=0;frame<240;frame++){
  api.update(1/60);const state=api.get();
  if(state.owner?.t===1-t||state.flight?.t===1-t){
   const gap=Math.min(...ps.filter(p=>p.t===t&&!p.sentOff&&p.n!==1).map(p=>Math.hypot(p.x-receiver.x,p.y-receiver.y)));
   observations++;exposed+=gap>5;
  }
  assert(ps.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
 }
 const s=api.get();assert(ps.some(p=>p.t===t&&Math.hypot(p.x-initial[p.id].x,p.y-initial[p.id].y)>.1));
 return {links,arrived,receiverExposedSteps:exposed,attackObservedSteps:observations,passes:s.passes,shots:s.shots,goals:s.score[1-t]-initialGoals};
}
let totalLinks=0;
for(const t of [0,1])for(const kind of ['cross','cutback'])for(const seed of [401,402]){
 const without=run(t,kind,seed,false),withChain=run(t,kind,seed,true);totalLinks+=withChain.links;
 if(!cutbackAblation)assert.equal(without.links,0);console.log(JSON.stringify({ablation:cutbackAblation?'cutback':'chain',defendingTeam:t,kind,seed,without,withChain}));
}
assert(totalLinks>0,'paired scenarios must exercise relays');
console.log('PASS: eight paired real flights with reactive movement, finite state and exercised chain; outcome deltas are not asserted improvements');
