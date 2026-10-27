const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {shape:possessionShape,line:positionalLine,covers:lineCoverAssignments,set:(p,time)=>{owner=p;elapsed=time;}};');
for(const t of [0,1])for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-5-2']){
 const e=env(html),h=e.t.phaseRelations(null),dir=t?-1:1,ball={x:50,y:32},mates=e.t.team(t);
 for(const p of mates){p.formation=formation;p.x=t?1:99;p.y=32;p.attackOrigin={bx:50};}
 const defender=mates.find(p=>p.n===3),mid=mates.find(p=>p.n===7),front=mates.find(p=>p.n===10);
 const backRef=h.shape(defender,ball),midRef=h.shape(mid,ball);
 Object.assign(defender,{x:backRef.x+dir*12,y:backRef.y});
 Object.assign(mid,{x:backRef.x+dir*8,y:backRef.y});
 Object.assign(front,{x:midRef.x+dir*8,y:midRef.y});
 h.set(defender,20);h.covers(mates,ball,defender,[],[]);h.set(defender,22);
 let map=h.covers(mates,ball,defender,[],[]);
 assert.equal(map.get(mid),defender);assert.equal(map.get(front),mid,'attacker covers the vacated midfield reference');
 assert.equal(new Set(map.values()).size,map.size,'one replacement per reference');
 for(const [p,q] of map)assert.equal(h.line(p),h.line(q)+1,'strict line order prevents cycles');
 assert.equal(map.size,2,'chain stops at attacking line');
 assert.equal(h.covers(mates,ball,defender,[front],[]).get(front),undefined,'local support has priority over secondary cover');
 assert.equal(h.covers(mates,ball,defender,[],[front]).get(front),undefined,'safety has priority');
 front.x=t?1:99;assert.equal(h.covers(mates,ball,defender,[],[]).get(front),undefined,'no distant forced cover');
 assert.equal(h.covers(mates,ball,null,[],[]).size,0,'whole chain releases when original departure ends');
 assert(mates.every(p=>p.lineCoverFor===undefined));
}
console.log('PASS: 4 systems ×2 directions, two-link chain, unique references, no cycles, priority/distance limits and full release');
