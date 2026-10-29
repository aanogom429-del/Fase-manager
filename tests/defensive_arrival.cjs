const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const marker='return targets;\n}\nfunction movement(dt)';assert(source.includes(marker));
const cleanup='for(const p of team(t)){if(relays.has(p))p.defSlotFor=relays.get(p).id;else delete p.defSlotFor;}';assert(source.includes(cleanup));
const html=source.replace(cleanup,`for(const p of team(t))if(p.defSlotFor!==undefined&&relays.get(p)?.id!==p.defSlotFor){
 const old=players.find(q=>q.id===p.defSlotFor),slot=slots.get(old);
 const reason=old&&positionalLine(old)===1&&old!==press?'press_changed':order.indexOf(p)<2?'priority_duty':defenseCommitted(p)?'coach_order':!press||positionalLine(press)!==1?'no_last_line_press':d(press,ref)<=4?'press_back_at_slot':d(targets.get(press),ref)<=6?'press_target_back':slot&&d(p,slot)>22?'distance_limit':slot&&[...targets].some(([q,target])=>q!==old&&d(target,slot)<5)?'slot_target_occupied':'upstream_or_selection';
 relayRelease({id:p.id,slot:p.defSlotFor,reason,time:elapsed});
}\n`+cleanup).replace(marker,'relaySample(elapsed,[...relays].map(([p,q])=>({id:p.id,slot:q.id,gap:d(p,targets.get(p))})));\n'+marker);
const rows=[];
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2'])for(const initialTeam of [0,1]){
 const live=new Map(),episodes=[],releases=[];let samples=0,near=0,distance=0;
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
 const e=env(html,301+initialTeam,{relaySample:(_time,links)=>observed.push(...links),relayRelease:r=>releases.push(r)});e.t.enterFreeMode();e.t.scenario({time:0,team:initialTeam,seed:301+initialTeam});
 for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}
 for(let frame=0;frame<1200;frame++){observed=[];e.t.update(1/60);relaySample(e.t.get().elapsed,observed);}
 const open=live.size;for(const event of live.values())episodes.push(event);
 const reached=episodes.filter(p=>p.firstArrival!==null),times=reached.map(p=>p.firstArrival-p.start);
 rows.push({formation,initialTeam,seconds:20,linkSamples:samples,within3:near,meanDistance:samples?+(distance/samples).toFixed(3):null,episodes:episodes.length,reachedEpisodes:reached.length,openAtEnd:open,meanFirstArrival:times.length?+(times.reduce((a,b)=>a+b,0)/times.length).toFixed(3):null});
 if(releases.length)console.log('RELEASE',JSON.stringify({formation,initialTeam,releases}));
}
assert(rows.some(r=>r.linkSamples>0),'scenarios must exercise physical relay observations');
console.log(JSON.stringify(rows,null,2));
console.log('PASS: finite physical distances in autonomous scenarios; proximity and arrival are measurements, not success guarantees');
