const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const results=[];
for(const t of [0,1])for(const marked of [false,true])for(const seed of [11,37,73,101])for(const enabled of [false,true]){
 const source=enabled?html:html.replace('return baseValue(p)+(available?1:0);','return baseValue(p);');
 const e=env(source);e.t.scenario({time:10,team:t,seed});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 for(const r of s.players){r.x=t?5:95;r.y=55;}
 p.x=50;p.y=32;p.bodyAngle=t?Math.PI:0;p.vx=0;p.vy=0;
 const q=s.players.find(r=>r.t===t&&r.n===8);q.x=50+dir*12;q.y=32;q.bodyAngle=t?0:Math.PI;
 const a=s.players.find(r=>r.t===t&&r.n===10);a.x=50+dir*5;a.y=44;
 if(marked){const r=s.players.find(r=>r.t!==t&&r.n===6);r.x=50+dir*3;r.y=35;}
 e.t.kickTo(p,q.x,q.y,'pass',q);
 let received=false,returned=false,useful=0,frames=0,selected=0;
 for(let i=0;i<360;i++){
  e.t.update(1/120);const live=e.t.get();
  if(live.owner===q)received=true;
  if(received&&live.owner===p)returned=true;
  if(received&&live.owner?.t===t&&live.owner!==p){
   frames++;if(p.attackSupport)selected++;
   e.t.observeRivals(p);const reading=e.t.perceivedSupportReading(p,live.owner);
   if(Math.hypot(p.x-live.owner.x,p.y-live.owner.y)<=25&&reading.lane<=3&&reading.space>=5)useful++;
  }
  assert(Number.isFinite(p.x)&&Number.isFinite(p.y));
 }
 results.push({t,marked,seed,enabled,received,returned,frames,selected,useful});
}
console.log(JSON.stringify(results,null,2));
