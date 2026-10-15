// Descriptive geometry only: tracking centres cannot establish a referee decision.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {env,signature}=require('./continuity.cjs');
const root=path.join(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
async function main(){
 const e=env(),initial=signature(e),rows=[];
 e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 for(let i=0;i<data.clips.length;i++){
  const clip=data.clips[i];e.nodes['reference-sequence'].onchange({target:{value:String(i)}});
  for(let j=0;j<clip.events.length;j++){
   const event=clip.events[j];if(event.type!=='PASS')continue;
   const f=clip.frames.find(f=>f.frame===event.startFrame),row={clip:clip.id,match:clip.match||'Sample Game 1',time:event.start,sender:event.sender,receiver:event.receiver,complete:!!(f&&f.ball&&f.players.length===22)};
   e.nodes['reference-event-select'].onchange({target:{value:String(j)}});
   if(row.complete){
    const ps=f.players.map(([t,n,x,y])=>({t,n,x,y})),dir=event.team===0?1:-1;
    const line=e.t.offsideReference(ps,event.team,f.ball[0]);
    row.referenceX=line;row.ahead=ps.filter(p=>p.t===event.team&&p.n!==event.sender&&(p.x-line)*dir>1e-7).map(p=>p.n);
    assert(Number.isFinite(line));assert(e.nodes['reference-offside'].textContent.includes('NO es un dictamen arbitral'));
    assert(e.nodes['reference-pitch'].innerHTML.includes('stroke="#f1a0ef"'));
   }else assert(e.nodes['reference-offside'].textContent.includes('faltan posiciones'));
   rows.push(row);
  }
 }
 assert.equal(signature(e),initial,'reference must not modify simulation');
 const report={source:data.source,engineVersion:'0.22',method:'Complete-frame player/ball centre geometry at annotated PASS onset; field and direction normalized by source import. No body-part, active-involvement, restart-exemption or referee adjudication inference.',rows};
 fs.writeFileSync(path.join(root,'data/offside-reference-v022.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({passes:rows.length,complete:rows.filter(r=>r.complete).length,withAheadCentres:rows.filter(r=>r.ahead?.length).length}));
 console.log('PASS: observed pass geometry, missing data and reference isolation');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
