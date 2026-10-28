const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
const rows=[];
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2'])for(const initialTeam of [0,1]){
 const e=env(undefined,101+initialTeam),t=e.t;
 t.enterFreeMode();t.scenario({time:0,team:initialTeam,seed:101+initialTeam});
 for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}
 let samplesWithCover=0,links=0,unfilled=0,changes=0,lastTeam=initialTeam;
 for(let frame=0;frame<1200;frame++){
  t.update(1/60);const s=t.get();
  assert(!s.matchStopped,'match should remain playable');
  for(const p of s.players)assert(Number.isFinite(p.x)&&Number.isFinite(p.y));
  const current=s.owner?.t??s.flight?.t;
  if(current!==undefined&&current!==lastTeam){changes++;lastTeam=current;}
  const covers=s.players.filter(p=>p.lineCoverFor!==undefined);
  assert.equal(new Set(covers.map(p=>p.lineCoverFor)).size,covers.length,'one player per vacancy');
  for(const p of covers){const q=s.players.find(q=>q.id===p.lineCoverFor);assert(q&&q.t===p.t&&q!==p,'valid teammate reference');}
  if(covers.length)samplesWithCover++;
  links+=covers.length;
  for(const p of s.players.filter(p=>Number.isFinite(p.lineExitAt)&&s.elapsed-p.lineExitAt>=1))if(!covers.some(q=>q.lineCoverFor===p.id))unfilled++;
 }
 const s=t.get();assert(Math.abs(s.elapsed-20)<1e-8);
 rows.push({formation,initialTeam,seconds:20,samplesWithCover,linkSamples:links,unfilledExitSamples:unfilled,possessionChanges:changes,passes:s.passes,shots:s.shots});
}
assert(rows.some(r=>r.possessionChanges>0),'must exercise possession changes');
console.log(JSON.stringify(rows,null,2));
console.log('PASS: autonomous actions, reactive opposition, finite positions and unique valid compensation references; coverage is measured, not guaranteed');
