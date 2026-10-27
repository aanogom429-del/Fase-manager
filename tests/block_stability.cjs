const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
// Read structural trace through public test hook, and expose pure helpers via an existing exported function.
function helpers(source){return env(source.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {shape:possessionShape,balance:typeof selectBalancePlayers==="function"?selectBalancePlayers:null};'));}
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=helpers(html),h=e.t.phaseRelations(null),dir=t?-1:1;
 const p={t,n:7,formation,attackOrigin:{bx:50}};
 const a=h.shape(p,{x:50,y:32}),z=h.shape(p,{x:50+dir*10,y:32});
 // Without an anchor the fallback is the 0.85 formula (ball depth + slot offset).
 const unanchored={...p,attackOrigin:undefined};
 const oldA=h.shape(unanchored,{x:50,y:32}),oldZ=h.shape(unanchored,{x:50+dir*10,y:32});
 assert(Math.abs((z.x-a.x)*dir-3.5)<1e-9);
 assert(Math.abs((oldZ.x-oldA.x)*dir-10)<1e-9);
 const mover=e.t.get().players.find(q=>q.t===t&&q.n===4);
 function travel(target){
  mover.x=a.x;mover.y=a.y;mover.vx=0;mover.vy=0;mover.bodyAngle=t?Math.PI:0;
  for(let i=0;i<300;i++)e.t.advancePlayer(mover,target.x,target.y,1/60);
  return Math.abs(mover.x-a.x);
 }
 const physicalNew=travel(z),physicalOld=travel(oldZ);
 assert(physicalNew<physicalOld&&physicalNew<=3.6,'reduced target excursion also reduces actual controlled movement');
 const far=h.shape(p,{x:50+dir*30,y:32});
 assert(Math.abs((far.x-a.x)*dir-18)<1e-9,'bounded lag retains sustained progression');
 const mates=[1,2,3].map((n,i)=>({id:i,n,t,role:'centreBack',x:50+dir*i,y:20+i*10}));
 let picked=h.balance(mates,null,[],dir);assert.deepEqual(Array.from(picked,p=>p.id),[0,1]);
 mates[2].x=50-dir*.5;picked=h.balance(mates,null,[],dir);
 assert.deepEqual(Array.from(picked,p=>p.id),[0,1],'small order changes preserve safety identity');
 mates[0].x=50+dir*12;picked=h.balance(mates,null,[],dir);
 assert.equal(picked[0].id,2,'clearly deeper replacement is allowed');
 picked=h.balance(mates,mates[2],[],dir);assert(!picked.includes(mates[2]),'holder/receiver cannot remain safety');
}
// Snapshot lifecycle for the new primitive state, including a legacy snapshot.
const e=helpers(html),s=e.t.get();e.t.prepareDecision();const p=s.players[2];p.attackBalance=1;e.t.restorePosition();assert.equal(p.attackBalance,undefined);
p.attackBalance=2;e.t.prepareDecision();p.attackBalance=1;e.t.restorePosition();assert.equal(p.attackBalance,2);
console.log('PASS: 4 systems ×2 directions, target displacement 10→3.5 m for 10 m ball shift, bounded lag, safety persistence/replacement and snapshot lifecycle');
