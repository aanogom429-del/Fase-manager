// Observation only: paired seeds diverge into different situations after decisions.
const fs=require('node:fs'),path=require('node:path'),{env}=require('../tests/continuity.cjs');
const root=path.join(__dirname,'..');
const distance=(a,b)=>Math.hypot((a.x-b.x)*1.05,(a.y-b.y)*68/64);
function options(owner,players){
 if(!owner)return [];
 const rivals=players.filter(p=>p.t!==owner.t&&!p.sentOff);
 return players.filter(p=>p.t===owner.t&&p!==owner&&p.role!=='keeper'&&!p.sentOff).filter(p=>{
  const dx=(p.x-owner.x)*1.05,dy=(p.y-owner.y)*68/64,l=Math.hypot(dx,dy);if(l<3||l>30)return false;
  return !rivals.some(r=>{const rx=(r.x-owner.x)*1.05,ry=(r.y-owner.y)*68/64,u=(rx*dx+ry*dy)/(l*l);return u>.08&&u<.95&&Math.hypot(rx-u*dx,ry-u*dy)<2;});
 });
}
function balance(s,t){const list=s.players.filter(p=>p.t===t&&p.role!=='keeper'&&!p.sentOff),dir=t?-1:1;
 return {behindBall:list.filter(p=>(p.x-s.bx)*dir<0).length,nearestBallM:Math.min(...list.map(p=>distance(p,{x:s.bx,y:s.by}))),widthM:(Math.max(...list.map(p=>p.y))-Math.min(...list.map(p=>p.y)))*68/64};}
function simulate(version,seed){
 const html=fs.readFileSync(path.join(root,`tests/fixtures/engine-v${version}.html`),'utf8'),e=env(html,seed);
 e.t.scenario({time:0,team:0,seed});e.t.enterFreeMode();
 let controlled=0,optionSum=0,empty=0,previous=e.t.get().owner?.t,run=0,longest=0;
 const losses=[],pending=[];
 for(let i=0;i<1800;i++){
  e.t.update(1/60);const s=e.t.get(),own=s.owner,active=!s.restart&&!s.matchStopped;
  if(active&&own){const n=options(own,s.players).length;controlled+=1/60;optionSum+=n/60;if(!n)empty+=1/60;}
  if(active&&own&&previous!==null&&previous!==undefined&&own.t!==previous){
   const loss={at:s.elapsed,team:previous,samples:[{after:0,...balance(s,previous)}],end:null};losses.push(loss);pending.push(loss);run=0;
  }
  if(active&&own){run+=1/60;longest=Math.max(longest,run);previous=own.t;}
  if(!active){run=0;previous=null;}
  for(const loss of pending){if(loss.end)continue;
   if(!active){loss.end='censored: restart or stopped';continue;}
   if(own&&own.t===loss.team){loss.end='censored: regained possession';continue;}
   const target=loss.samples.length===1?2:5;
   if(s.elapsed-loss.at>=target){loss.samples.push({after:s.elapsed-loss.at,...balance(s,loss.team)});if(target===5)loss.end='complete';}
  }
 }
 for(const loss of pending)if(!loss.end)loss.end='censored: end of observation';
 return {version,seed,controlledSeconds:controlled,meanGeometricOptions:controlled?optionSum/controlled:null,noOptionSeconds:empty,longestObservedControlledRunSeconds:longest,losses};
}
function run(){return {protocol:'Two fixed seeds (17,73), 30 s at 60 Hz per version. Geometric passing candidates: 3–30 m; no rival within 2 m of interior 8–95% segment. Active controlled-ball samples only. Loss inferred from successive opposing holders, including intervening flight; restart resets identity. Follow losses at 0/2/5 s, censor on regain, restart or observation end.',
 limitations:['Synthetic free play, not real-match validation','Same seeds do not keep later situations equivalent','Geometric options omit offside, perception, flight timing and reception quality','Behind-ball count does not prove defensive protection','Controlled run counts owned-ball time, excludes flight; not full possession duration','No statistical inference or behavior tuning'],runs:['047','048'].flatMap(v=>[17,73].map(seed=>simulate(v,seed)))};}
if(require.main===module){const r=run();fs.writeFileSync(path.join(root,'data/tactical-utility-v048.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r.runs.map(({losses,...r})=>({...r,lossCount:losses.length,complete:losses.filter(l=>l.end==='complete').length})),null,2));}
module.exports={options,balance,run};
