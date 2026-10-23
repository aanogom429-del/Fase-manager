const assert=require('node:assert/strict');
const {env,signature}=require('./continuity.cjs');
(async()=>{
 const memory=new Map(),downloads=[],revoked=[];let blob,timer;
 const extras={localStorage:{getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)},Blob:class {constructor(parts){this.raw=parts.join('');blob=this;}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL:u=>revoked.push(u)},setTimeout:f=>{timer=f;}};
 // Browser download APIs are stubbed; actual Safari download UX still needs device verification.
 const source=require('node:fs').readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
 const html=source.replace("document.body.appendChild(link);link.click();link.remove();","globalThis.downloadProbe(link);");
 const e=env(html,101,{...extras,downloadProbe:l=>downloads.push(l)});
 e.t.enterFreeMode();e.t.scenario({time:123,team:1});e.t.enterDecisionMode();
 const before=signature(e);assert(e.nodes['export-decision'].onclick());assert.equal(signature(e),before);assert.match(downloads[0].download,/\.json$/);timer();assert.deepEqual(revoked,['blob:test']);
 const good=blob.raw, fresh=env(undefined,101,extras),input=fresh.nodes['import-decision'];fresh.nodes['saved-slot'].value='2';
 const load=raw=>input.onchange({target:Object.assign(input,{files:[{size:raw.length,text:async()=>raw}]})});
 const freshBefore=signature(fresh);assert(await load(good));assert.equal(signature(fresh),freshBefore,'import does not change live match');assert(fresh.nodes['load-decision'].onclick());assert.equal(signature(fresh),before);assert.equal(fresh.t.get().running,false);
 for(const choice of ['support','progress','width']){e.t.restorePosition();fresh.t.restorePosition();e.t.playChoice(choice);fresh.t.playChoice(choice);for(let i=0;i<4000&&['resolve','settle'].includes(e.t.get().stage);i++){e.tick();fresh.tick();}assert.equal(signature(e),signature(fresh));}
 const malicious=JSON.parse(good),payload=JSON.parse(malicious.payload);payload.state.history=['<img src=x onerror=alert(1)>'];malicious.payload=JSON.stringify(payload);let sum=2166136261;for(let i=0;i<malicious.payload.length;i++)sum=Math.imul(sum^malicious.payload.charCodeAt(i),16777619);malicious.checksum=(sum>>>0).toString(16);assert.equal(await load(JSON.stringify(malicious)),false);
 const key=[...memory.keys()][0],saved=memory.get(key),live=signature(fresh);
 for(const raw of ['{',JSON.stringify({version:'future'}),good.replace('checksum','bad')]){assert.equal(await load(raw),false);assert.equal(memory.get(key),saved);assert.equal(signature(fresh),live);}
 assert.equal(await input.onchange({target:Object.assign(input,{files:[{size:2000001,text:()=>{throw Error('must not read');}}]})}),false);
 let release;input.files=[{size:good.length,text:()=>new Promise(r=>release=r)}];const pending=input.onchange({target:input});fresh.nodes['saved-slot'].value='3';release(good);assert(await pending);assert.equal(memory.size,1,'destination captured before reading');assert.equal(input.disabled,false);assert.equal(input.value,'');
 const blocked=env(undefined,101,{localStorage:{setItem(){throw Error('blocked');}}});const bi=blocked.nodes['import-decision'];bi.files=[{size:good.length,text:async()=>good}];assert.equal(await bi.onchange({target:bi}),false);assert.equal(bi.disabled,false);
 e.t.enterFreeMode();assert.equal(e.nodes['export-decision'].disabled,true);assert.equal(e.nodes['export-decision'].onclick(),false);
 console.log('PASS portable: export, cross-context import, 3 deterministic choices, invalid/oversized files, captured slot, blocked storage, free-mode guard');
})().catch(e=>{console.error(e);process.exitCode=1;});
