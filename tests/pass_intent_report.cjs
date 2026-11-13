const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const exposed=html.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return passIntentReport;');
for(const team of [0,1]){
 const e=env(exposed),p=e.t.team(team).find(q=>q.n===6),q=e.t.team(team).find(q=>q.n===8),x=v=>team?100-v:v;
 const describe=e.t.phaseRelations(null);p.x=x(50);p.y=32;
 e.t.opp(team).forEach((r,i)=>{r.x=x(i<2?60+i*2:90);r.y=10+i*4;});
 // The keeper cannot form a pressure line; use two field players.
 const field=e.t.opp(team).filter(r=>r.role!=='keeper');field[0].x=x(60);field[1].x=x(62);
 q.x=x(40);q.y=32;assert(describe(p,q).includes('busca seguridad'));assert(!describe(p,q).includes('continuidad'));
 q.x=x(55);assert(describe(p,q).includes('continuidad sin superar línea'));
 q.x=x(70);assert(describe(p,q).includes('superar una línea defensiva'));assert(!describe(p,q).includes('continuidad'));
 e.t.opp(team).forEach(r=>r.x=x(90));assert(describe(p,q).includes('continuidad sin superar línea'),'forward alone is not breaking a pressure line');
}
// Exercise actual automatic decisions, rather than only the formatter.
let reports=0;
const e=env(html,73);e.t.enterFreeMode();e.t.scenario({time:10,team:1,seed:73});
for(let f=0;f<900;f++){e.t.update(1/30);if(/busca (seguridad|superar una línea defensiva|continuidad sin superar línea)/.test(e.nodes.status.textContent))reports++;}
assert(reports>0,'automatic match reaches classified narration');
console.log('PASS: mirrored security/continuity/progression narration and automatic match integration');
