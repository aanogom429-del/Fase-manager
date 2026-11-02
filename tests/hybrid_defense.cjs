const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {assignZoneMarks,blockAttitude,positionalLine};');
for(const t of [0,1]){
 const e=env(html);e.t.scenario({time:10,team:1-t});const {assignZoneMarks:assign,blockAttitude:att,positionalLine:line}=e.t.phaseRelations(null);
 const x=v=>t?100-v:v,dir=t?-1:1,ps=e.t.team(t).filter(p=>p.n!==1),o=e.t.get().owner;
 const pos={x:x(50),y:32};o.x=pos.x;o.y=32;o.bodyAngle=t?0:Math.PI;
 for(const p of ps){p.x=x(25+line(p)*5);p.y=32;p.bodyAngle=t?Math.PI:0;}
 const press=ps[0];assert.equal(att(t,pos,press),'equilibrar');
 press.lossPressUntil=12;assert.equal(att(t,pos,press),'presionar');delete press.lossPressUntil;
 o.backpassUntil=11;assert.equal(att(t,pos,press),'presionar');delete o.backpassUntil;
 press.defPolicy='replegar';assert.equal(att(t,pos,press),'replegar');press.defPolicy='recuperar';
 for(const p of ps.filter(p=>line(p)===3))p.x=x(65);assert.equal(att(t,pos,press),'contener');
 for(const p of ps.filter(p=>line(p)===2))p.x=x(60);assert.equal(att(t,pos,press),'proteger');
 const a=ps[2],b=ps[3],r=e.t.team(1-t).find(q=>q.n===10),order=[ps[0],ps[1],a,b];
 const slots=new Map([[a,{x:x(40),y:22}],[b,{x:x(40),y:36}]]),targets=new Map(slots);
 Object.assign(a,slots.get(a));Object.assign(b,slots.get(b));
 const mark=y=>{for(const p of [a,b])p.rivalMemory=[{id:r.id,x:x(40),y,seenAt:10}];assign(t,order,slots,targets,new Map(),pos,'proteger');};
 mark(25);assert.equal(a.markId,r.id);assert.equal(b.markId,undefined);assert((targets.get(a).x-pos.x)*dir<0);
 mark(27);assert.equal(a.markId,r.id,'stable incumbent');mark(36);assert.equal(a.markId,undefined);assert.equal(b.markId,r.id,'handoff');
 mark(58);assert(!a.markId&&!b.markId,'return to zone');
 mark(36);assign(t,order,slots,targets,new Map([[b,a]]),pos,'proteger');assert.equal(b.markId,undefined,'line relay has priority');
}
console.log('PASS: both directions, unique mark, retention/handoff/release, protected relay, line hierarchy and pressure triggers');
