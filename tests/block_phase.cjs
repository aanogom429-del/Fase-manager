const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source=html.slice(html.indexOf('function gamePhase('),html.indexOf('function buildupOutlet('));
for(const t of [0,1]){
 const dir=t?-1:1,x=v=>t?100-v:v;
 const rivals=[30,31,45,46,60,61,62].map((v,i)=>({x:x(v),y:20+i*3,vx:0})),mates=[{}];
 const c={opp:()=>rivals,team:()=>mates,isKeeper:()=>false,d:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),direction:()=>dir,elapsed:10};
 vm.createContext(c);vm.runInContext(source,c);
 const phase=v=>c.gamePhase(c.blockPhase(t,{x:x(v),y:32})).name;
 assert.equal(phase(20),'Iniciación del juego');
 rivals.forEach(p=>p.x+=dir*30);assert.equal(phase(50),'Iniciación del juego','not tied to own goal');
 rivals.forEach(p=>{p.x-=dir*30;p.vx=dir*2;});assert.equal(phase(20),'Confort');
 assert.equal(phase(36),'Disposición posicional');
 assert.equal(phase(52),'Superación');
 mates[0].phaseBreakAt=9;assert.equal(phase(52),'Finalización');
 assert.equal(phase(36),'Disposición posicional','recycling exits finalization');
}
console.log('PASS: mirrored structural phases, advanced initiation, retreat, first-line progression and continuation after superation');
