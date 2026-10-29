const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const marker='return targets;\n}\nfunction movement(dt)';assert(source.includes(marker));
const html=source.replace(marker,'relaySample(elapsed,[...relays].map(([p,q])=>({id:p.id,slot:q.id,gap:d(p,targets.get(p))})));\n'+marker);
const rows=[];
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2'])for(const initialTeam of [0,1]){
 const live=new Map(),episodes=[];let samples=0,near=0,distance=0;
 function relaySample(time,links){
  const keys=new Set(links.map(p=>p.id+':'+p.slot));
  for(const [key,event] of live)if(!keys.has(key)){event.end=time;episodes.push(event);live.delete(key);}
  for(const p of links){
   const key=p.id+':'+p.slot;let event=live.get(key);
   if(!event){event={start:time,firstArrival:null,end:null};live.set(key,event);}
   assert(Number.isFinite(p.gap)&&p.gap>=0);samples++;distance+=p.gap;
   if(p.gap<=3){near++;if(event.firstArrival===null)event.firstArrival=time;}
  }
 }
 let observed=[];
 const e=env(html,301+initialTeam,{relaySample:(_time,links)=>observed.push(...links)});e.t.enterFreeMode();e.t.scenario({time:0,team:initialTeam,seed:301+initialTeam});
 for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}
 for(let frame=0;frame<1200;frame++){observed=[];e.t.update(1/60);relaySample(e.t.get().elapsed,observed);}
 const open=live.size;for(const event of live.values())episodes.push(event);
 const reached=episodes.filter(p=>p.firstArrival!==null),times=reached.map(p=>p.firstArrival-p.start);
 rows.push({formation,initialTeam,seconds:20,linkSamples:samples,within3:near,meanDistance:samples?+(distance/samples).toFixed(3):null,episodes:episodes.length,reachedEpisodes:reached.length,openAtEnd:open,meanFirstArrival:times.length?+(times.reduce((a,b)=>a+b,0)/times.length).toFixed(3):null});
}
assert(rows.some(r=>r.linkSamples>0),'scenarios must exercise physical relay observations');
console.log(JSON.stringify(rows,null,2));
console.log('PASS: finite physical distances in autonomous scenarios; proximity and arrival are measurements, not success guarantees');
