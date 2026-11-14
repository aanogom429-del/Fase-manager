const assert=require('node:assert/strict'),fs=require('fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return contextualTurnRate;');
for(const t of [0,1]){const e=env(html);e.t.scenario({time:10,team:t});const p=e.t.get().owner,rate=e.t.phaseRelations(null);p.x=50;p.y=32;
 p.rivalMemory=[];assert.equal(rate(p),p.turnRate,'unknown space does not accelerate');
 p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:90,y:60,seenAt:10}));assert.equal(rate(p),p.turnRate*1.5,'clear space accelerates');
 p.rivalMemory[0].x=51;p.rivalMemory[0].y=32;assert.equal(rate(p),p.turnRate,'close pressure retains normal turn');
}
console.log('PASS: mirrored free, pressured and unknown turning rates');
