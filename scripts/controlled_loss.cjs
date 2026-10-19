const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{env}=require('../tests/continuity.cjs');
const root=path.join(__dirname,'..'),dist=(a,b)=>Math.hypot((a.x-b.x)*1.05,(a.y-b.y)*68/64);
function blocked(a,b,defenders){const dx=(b.x-a.x)*1.05,dy=(b.y-a.y)*68/64,l2=dx*dx+dy*dy;return defenders.some(p=>{const x=(p.x-a.x)*1.05,y=(p.y-a.y)*68/64,u=(x*dx+y*dy)/l2;return u>.08&&u<.95&&Math.hypot(x-u*dx,y-u*dy)<2;});}
function simulate(version,t,x){
 let html=fs.readFileSync(path.join(root,`tests/fixtures/engine-v${version}.html`),'utf8');
 const entry='startSituation();requestAnimationFrame(frame);';
 html=html.replace(entry,entry+`globalThis.test.controlledStep=(clock,dt,positions,ball)=>{elapsed=clock;const impose=()=>{for(const q of positions){const p=players.find(p=>p.t===q.t&&p.n===q.n);p.x=q.x;p.y=q.y;p.driveX=q.x;p.driveY=q.y;p.vx=clock&&p.n!==1?(p.t?-2:2):0;p.vy=0;p.bodyAngle=p.t?Math.PI:0;delete p.intentAt;}};impose();bx=ball.x;by=ball.y;if(dt)movement(dt);impose();bx=ball.x;by=ball.y;};`);
 const e=env(html),ps=e.t.get().players,flip=p=>({x:t?100-p.x:p.x,y:t?64-p.y:p.y});
 e.t.scenario({time:0,team:t});
 const defenders=[[4,32],[x-4,27],[x-9,37],[x-16,22],[x-18,43],[x+4,20],[x+7,44],[x-22,10],[x+10,53],[x-25,30],[x+12,32]];
 const attackers=[[96,32],[x+15,10],[x+16,54],[x+20,20],[x+23,44],[x,32],[x-10,20],[x-12,44],[x+5,8],[x+6,56],[x+10,33]];
 for(const p of ps){const q=flip((p.t===t?defenders:attackers)[p.n-1].reduce((a,v,i)=>(a[i?'y':'x']=Math.max(2,Math.min(i?62:98,v)),a),{}));Object.assign(p,q,{hx:q.x,hy:q.y,sx:q.x,sy:q.y,vx:0,vy:0,bodyAngle:p.t?Math.PI:0,visualMemory:[],rivalMemory:[]});delete p.intentAt;delete p.attackOrigin;delete p.defOrigin;delete p.defDuty;}
 const carrier=ps.find(p=>p.t!==t&&p.n===6);e.t.capture(carrier,'pérdida controlada');
 const initial=ps.filter(p=>p.t!==t||p.n===1).map(p=>({t:p.t,n:p.n,x:p.x,y:p.y}));
 const samples=[];
 for(let k=0;k<=300;k++){
  const time=k/60,positions=initial.map(p=>({...p,x:p.t!==t&&p.n!==1?p.x+(t?1:-1)*2*time:p.x}));
  const ball=positions.find(p=>p.t!==t&&p.n===6);e.t.controlledStep(time,k?1/60:0,positions,ball);
  if(![0,120,300].includes(k))continue;
  const ds=ps.filter(p=>p.t===t&&p.n!==1),rs=ps.filter(p=>p.t!==t&&[7,8].includes(p.n)),target=flip({x:16,y:32});
  const defenderArrival=Math.min(...ds.map(p=>e.t.arrivalTime(p,target))),rivalArrival=Math.min(...rs.map(p=>e.t.arrivalTime(p,target)));
  samples.push({at:time,blockedReceiverLines:rs.filter(r=>blocked(ball,r,ds)).length,totalReceiverLines:rs.length,
   nearestBallM:Math.min(...ds.map(p=>dist(p,ball))),behindBall:ds.filter(p=>(p.x-ball.x)*(t?-1:1)<0).length,
   defenderArrivalSeconds:defenderArrival,rivalArrivalSeconds:rivalArrival,arrivalDisadvantageSeconds:defenderArrival-rivalArrival});
 }
 return {version,defendingTeam:t,lossX:x,samples};
}
function run(){return {protocol:'Six controlled losses: own-oriented x=40,60,80, mirrored teams; identical initial positions and zero velocities. Rival carrier/receivers prescribed at 2 pitch units/s toward defending goal; keeper fixed. Only ten defenders move freely for 5 s. Samples 0/2/5 s. Two geometric receiver lanes, 2 m clearance, interior 8–95%. Arrival estimates to fixed own-oriented point (16,32).',limitations:['Synthetic intervention, not free match or real tracking','Prescribed rivals cannot react; no actual passes, tackles or regain','Arrival times are engine approximations, not measured interception times','Identical loss states remove effects of preceding attacking shape','Small scenario set, no tactical success claim'],cases:['047','048'].flatMap(v=>[0,1].flatMap(t=>[40,60,80].map(x=>simulate(v,t,x))))};}
if(require.main===module){const r=run();for(const c of r.cases)for(const s of c.samples)assert(Object.values(s).every(Number.isFinite));
 fs.writeFileSync(path.join(root,'data/controlled-loss-v048.json'),JSON.stringify(r,null,2)+'\n');
 for(const x of [40,60,80]){const a=r.cases.find(c=>c.version==='047'&&c.defendingTeam===0&&c.lossX===x),b=r.cases.find(c=>c.version==='048'&&c.defendingTeam===0&&c.lossX===x);assert.deepEqual(a.samples,b.samples);const mirror=r.cases.find(c=>c.version==='048'&&c.defendingTeam===1&&c.lossX===x);for(let i=0;i<3;i++)for(const key of Object.keys(b.samples[i]))assert(Math.abs(b.samples[i][key]-mirror.samples[i][key])<1e-8,key+' mirror');console.log(JSON.stringify({x,samples:b.samples}));}
 console.log('PASS: complete paired loss cases, finite measures, mirrored geometry and identical defensive response from identical states');}
module.exports={run,simulate,blocked};
