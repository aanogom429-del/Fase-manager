const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
function lateralBlockReference(t,pos){
 const f=flight;if(!f||owner||f.t===t||f.kind!=='pass'||f.age<.12||f.duration<=0)return pos.y;
 const dy=f.ty-f.y;
 if(Math.abs(dy)<24||(f.y-32)*(f.ty-32)>=0)return pos.y;
 if(team(t).filter(p=>!isKeeper(p)&&perceives(p,pos)).length<2)return pos.y;
 return clamp(pos.y+clamp(dy/f.duration*Math.min(.4,Math.max(0,f.duration-f.age)),-12,12),4,60);
}
const gate='(ballPos.y-32)*(.25-.1*area)';assert.equal(html.split(gate).length,2);
const experiment=html.replace('function defensiveBlockTargets(',lateralBlockReference.toString()+'\nfunction defensiveBlockTargets(').replace(gate,'(lateralBlockReference(t,ballPos)-32)*(.25-.1*area)');
function run(t,reverse,seed,enabled,horizon=4){
 const e=env(enabled?experiment:html,seed);e.t.enterFreeMode();e.t.scenario({time:10,team:1-t,seed});
 const s=e.t.get(),x=v=>t?100-v:v,y=v=>(!!t!==reverse)?64-v:v;
 for(const p of s.players){p.x=x(p.t===t?(p.n<=5?26:38):62);p.y=y(4+p.n*3);p.vx=p.vy=0;}
 const o=s.owner,r=e.t.team(1-t).find(q=>q.n===11);o.x=x(48);o.y=y(8);r.x=x(30);r.y=y(54);
 o.bodyAngle=Math.atan2(r.y-o.y,r.x-o.x);e.t.capture(o,'inicia cambio');e.t.kickTo(o,r.x,r.y,'pass',r);
 const f=e.t.get().flight;assert(f);f.loft=4;const defenders=e.t.team(t).filter(q=>q.n!==1);
 const avg=()=>defenders.reduce((a,q)=>a+q.y,0)/defenders.length,start=avg();let atArrival=null;
 for(let i=0;i<horizon*60;i++){e.t.update(1/60);const z=e.t.get();if(!atArrival&&z.flight!==f){atArrival={time:(i+1)/60,outcome:z.owner===r?'received':z.owner?.t===t?'intercepted':'other',gap:Math.min(...defenders.map(p=>Math.hypot(p.x-r.x,p.y-r.y))),shift:(avg()-start)*Math.sign(r.y-o.y)};}}
 assert(atArrival&&Number.isFinite(atArrival.gap));return atArrival;
}
for(const t of [0,1])for(const reverse of [false,true])for(const seed of [401,502])console.log(JSON.stringify({t,reverse,seed,before:run(t,reverse,seed,false),after:run(t,reverse,seed,true)}));
