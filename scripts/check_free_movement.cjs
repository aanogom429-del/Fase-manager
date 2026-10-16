const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace('startSituation();requestAnimationFrame(frame);',
 `globalThis.runFree=(gain)=>{
 movementModel.followGain=gain;startSituation();enterFreeMode();let backward=0,lastPass=passes;
 for(let k=0;k<10800;k++){
  update(1/120);
  if(passes>lastPass&&flight&&flight.kind==='pass'&&(flight.tx-flight.x)*direction(flight.t)<-1)backward++;
  lastPass=passes;
  // Los ejecutores pueden situarse sobre las líneas durante banda y esquina.
  for(const p of players)if(!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>100||p.y<0||p.y>64)throw Error('Invalid position');
 }
 return {passes,shots,turnovers,backward,score,elapsed,offsideCalls:[...offsideCalls],foulCalls:[...foulCalls],pendingRestart:restart?restart.kind:null};
 };`);
function run(seed,gain){
 const nodes={};class E{constructor(){this.style={};this.dataset={};this.children=[];}setAttribute(){}append(...x){this.children.push(...x);}appendChild(x){this.append(x);}replaceChildren(...x){this.children=x;}querySelectorAll(){return this.children;}insertAdjacentElement(){}insertAdjacentHTML(){}}
 let rng=seed;const math=Object.assign(Object.create(Math),{random:()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296;}});
 const c={document:{head:new E(),getElementById:id=>nodes[id]||(nodes[id]=new E()),createElement:()=>new E()},console,Math:math,requestAnimationFrame:()=>{}};
 vm.createContext(c);vm.runInContext(script,c);return c.runFree(gain);
}
const results=[73,101,211].map(seed=>{const row={seed,baseline:process.argv.includes('--final-only')?null:run(seed,.65),adjusted:run(seed,.35)};console.log(JSON.stringify(row));return row;});
fs.writeFileSync(path.join(root,process.argv[2]||'data/free-movement-check.json'),JSON.stringify({durationSeconds:90,seeds:results,note:'Regression smoke check, not validation of football realism.'},null,2)+'\n');
for(const row of results){assert(row.adjusted.elapsed>89);assert(row.adjusted.passes>0);assert(row.adjusted.shots>0);}
