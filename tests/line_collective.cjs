const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {shape:possessionShape,line:positionalLine,covers:lineCoverAssignments,set:(p,time)=>{owner=p;elapsed=time;}};');
let samples=0,occupied=0,maxLinks=0;
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null),mates=e.t.team(t),dir=t?-1:1;
 const ball={x:50,y:32};
 for(const p of mates){p.formation=formation;p.attackOrigin={bx:50};Object.assign(p,h.shape(p,ball));p.vx=0;p.vy=0;}
 const departures=mates.filter(p=>h.line(p)===1).slice(0,2);
 const identities=mates.map(p=>[p.id,p.n,p.role]);let peak=0;
 // Controlled 30 s: simultaneous departures, moving references, then release.
 // Departure paths are scripted; other players use the engine's physical mover.
 for(let frame=0;frame<900;frame++){
  const time=frame/30,active=time<20;
  ball.x=50+dir*3*Math.sin(time*.3);ball.y=32+4*Math.sin(time*.4);
  for(const p of departures){const ref=h.shape(p,ball);p.x=ref.x+dir*(active?12:0);p.y=ref.y;}
  h.set(departures[0],time);
  const map=h.covers(mates,ball,active?departures[0]:null,active?[departures[1]]:[],[]);
  assert.equal(new Set(map.values()).size,map.size,'no duplicate vacancy');
  for(const [p,q] of map){assert.equal(h.line(p),h.line(q)+1);assert(!departures.includes(p));assert.equal(p.lineCoverFor,q.id);}
  if(!active){assert.equal(map.size,0);assert(mates.every(p=>p.lineCoverFor===undefined));}
  for(const p of mates){
   if(departures.includes(p))continue;
   const ref=h.shape(p,ball,map.get(p)?.n??p.n),before={x:p.x,y:p.y};
   e.t.advancePlayer(p,ref.x,ref.y,1/30);
   assert(Number.isFinite(p.x)&&Number.isFinite(p.y));
   assert(Math.hypot(p.x-before.x,p.y-before.y)<1,'continuous movement, no teleport');
  }
  assert.deepEqual(mates.map(p=>[p.id,p.n,p.role]),identities);
  peak=Math.max(peak,map.size);maxLinks=Math.max(maxLinks,map.size);occupied+=map.size>0;samples++;
 }
 assert(peak>=2,'fixture exercises multiple simultaneous assignments');
}
console.log('PASS collective:',JSON.stringify({scenarios:8,secondsPerScenario:30,samples,samplesWithCover:occupied,maxLinks}));
