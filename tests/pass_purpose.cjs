const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('globalThis.test={','globalThis.test={');
const e=env(html.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return passPurpose;'));
const classify=e.t.phaseRelations(null);
for(const t of [0,1]){const x=v=>t?100-v:v,p={x:x(50),y:32,t},rivals=[{x:x(60),y:20,role:'midfielder'},{x:x(62),y:40,role:'midfielder'}];
 assert.equal(classify(p,{x:x(40),y:32},rivals),'safety');
 assert.equal(classify(p,{x:x(55),y:20},rivals),'support');
 assert.equal(classify(p,{x:x(70),y:20},rivals),'progress');
 assert.equal(classify(p,{x:x(70),y:20},[]),'support');}
console.log('PASS: security, continuity and crossing a defensive line in both directions');
