const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return outletGrade;');
for(const t of [0,1]){
 const e=env(html),grade=e.t.phaseRelations(null),dir=t?-1:1;
 const o=e.t.team(t)[5],p=e.t.team(t)[6];o.x=50;o.y=32;o.bodyAngle=t?Math.PI:0;
 const open={x:50+dir*10,y:32},view={uncertainty:0,rivals:[]};
 assert.equal(grade(o,p,open,view,[]),1);
 assert.equal(grade(o,p,open,view,[{id:99,x:50+dir*10,y:33}]),1,'same corridor');
 assert.equal(grade(o,p,open,view,[{id:99,x:50+dir*5,y:42}]),2,'distinct angle');
 assert.equal(grade(o,p,open,{uncertainty:0,rivals:[{id:77,x:50+dir*5,y:32,radius:0}]},[]),0,'blocked pass');
 assert.equal(grade(o,p,{x:50-dir*10,y:32},view,[]),0,'outside visual field');
}
console.log('PASS: mirrored blocked/hidden outlets, same corridor and distinct second angle');
