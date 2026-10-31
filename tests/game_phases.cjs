const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source=html.slice(html.indexOf('function gamePhase('),html.indexOf('function chooseAction('));
const phase=vm.runInNewContext(source+';gamePhase');
const base={depth:50,finish:false,progress:false,progressRisk:6,pressure:5,safety:true};
for(const [change,name,organize] of [
 [{allAhead:true},'Iniciación del juego',true],
 [{allAhead:true,retreating:true},'Confort',true],
 [{},'Disposición posicional',true],
 [{lastLineOnly:true},'Superación',false],
 [{lastLineOnly:true,afterSuperation:true},'Finalización',false],
 [{depth:80},'Disposición posicional',true],
 [{progress:true,progressRisk:7},'Disposición posicional',true]
]){const q=phase({...base,...change});assert.equal(q.name,name);assert.equal(q.organize,organize);assert(q.principle);}
for(const [input,name]of [
 [{mode:'Presionar con acceso o ayuda'},'Presión'],
 [{mode:'Temporizar sin ayuda cercana'},'Temporización'],
 [{mode:'Cubrir línea percibida'},'Contención'],
 [{beaten:true},'Retroceso'],
 [{mode:'Proteger línea de tiro',beaten:true},'Protección de la zona de finalización']
])assert.equal(phase({defending:true,...input}).name,name);
assert.equal(phase({...base,depth:50}).name,phase({...base,depth:70}).name,'zone alone does not define phase');
const {env}=require('./continuity.cjs');
for(const t of [0,1]){
 const e=env();e.t.scenario({time:1,team:t,seed:73});const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;
 for(const q of s.players){q.x=x(q.t===t?5:98);q.y=10;}
 p.x=x(70);p.y=52;p.bodyAngle=-Math.PI/2;
 const a=s.players.find(q=>q.t===t&&q.n===10),b=s.players.find(q=>q.t===t&&q.n===8),r=s.players.find(q=>q.t!==t);
 a.x=x(95);a.y=52;b.x=x(55);b.y=42;r.x=x(80);r.y=49;
 e.t.chooseAction(p);assert.equal(e.t.get().flight?.target,b,'advanced organization can conserve without central finishing opportunity');
}
console.log('PASS: ten functional phases, priorities, and mirrored advanced possession conservation');
