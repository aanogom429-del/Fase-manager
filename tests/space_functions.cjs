const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return defensiveBlockTargets;');
for(const t of [0,1]){
 const e=env(html);e.t.scenario({time:10,team:t});const s=e.t.get(),p=s.owner,dir=t?-1:1;
 p.x=50;p.y=32;const mates=s.players.filter(q=>q.t===t&&q!==p&&q.n!==1);
 for(const q of mates){q.x=50-dir*40;q.y=12;}
 const local=mates[0];local.x=p.x-dir*8;local.y=35;
 e.t.attackingTargets(t,p);assert(local.attackSupport);assert(mates.slice(1).every(q=>!q.attackSupport));
 local.x=p.x-dir*40;local.y=8;e.t.attackingTargets(t,p);
 assert(!local.attackSupport,'cooperation does not retain a short support duty');
 const order=e.t.team(1-t).filter(q=>q.n!==1).reverse(),marker=order[4],block=e.t.phaseRelations(null);
 const keys=new Map(order.map(q=>[q,{key:'c'}]));const slot=block(1-t,order,p,keys).get(marker);
 marker.x=slot.x;marker.y=slot.y;local.x=slot.x;local.y=slot.y+5;marker.bodyAngle=Math.atan2(local.y-marker.y,local.x-marker.x);
 marker.rivalMemory=[{id:local.id,x:local.x,y:local.y,seenAt:10}];
 keys.set(marker,{key:'a'});const marked=block(1-t,order,p,keys).get(marker);
 assert.equal(marker.markId,local.id);assert(Math.abs(marked.x-slot.x)<=6);assert(Math.abs(marked.y-slot.y)>0&&Math.abs(marked.y-slot.y)<=6);
}
console.log('PASS: mirrored eligibility, release on leaving mutual support, zonal deterrence versus cooperation');
