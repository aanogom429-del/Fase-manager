const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const src=fs.readFileSync(process.env.BASELINE_HTML||require('node:path').join(__dirname,'../index.html'),'utf8');
const html=src.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return {read:flankComplement,distribute:distributeAttackSpace,time:n=>elapsed=n,lane:(p,a,b)=>perceivedLane(a,b,perceivedOpposition(p)).risk};');
const results=[];
for(const formation of ['4-3-3','4-2-3-1','4-4-2','3-4-3','3-5-2'])for(const t of [0,1])for(const top of [true,false])for(const blocked of [false,true]){
 const e=env(html,73);for(const id of ['system-blue','system-red']){e.nodes[id].value=formation;e.nodes[id].onchange();}e.t.scenario({time:10,team:t,seed:73});
 const h=e.t.phaseRelations(null),s=e.t.get(),ps=e.t.team(t),sender=s.owner,p=ps.find(q=>q.role==='fullback'),w=formation==='4-4-2'?ps[10]:formation==='3-5-2'?ps[7]:ps.find(q=>q.role==='winger');
 const x=n=>t?100-n:n,y=n=>top?n:64-n;
 for(const q of s.players){q.x=x(q.t===t?10:95);q.y=4+(q.id%11)*5;q.vx=q.vy=0;q.cool=0;}
 sender.x=x(35);sender.y=y(44);p.x=x(50);p.y=y(16);w.x=x(56);w.y=y(20);p.bodyAngle=t?Math.PI:0;sender.bodyAngle=Math.atan2(p.y-sender.y,p.x-sender.x);
 const observe=()=>{p.visualMemory=[{id:w.id,x:w.x,y:w.y,seenAt:e.t.get().elapsed},{id:sender.id,x:sender.x,y:sender.y,seenAt:e.t.get().elapsed}];p.rivalMemory=e.t.opp(t).map(r=>({id:r.id,x:r.x,y:r.y,seenAt:e.t.get().elapsed}));};observe();
 const anchor={x:p.x,y:y(20)};const q=h.distribute(new Map([[p,anchor]]),new Map(),new Map()).get(p);assert.equal(q.y,y(8));
 const initial={x:p.x,y:p.y};
 for(let i=0;i<120;i++){h.time(10+(i+1)/120);e.t.advancePlayer(p,q.x,q.y,1/120);}
 observe();
 assert(Math.hypot(p.x-q.x,p.y-q.y)<Math.hypot(initial.x-q.x,initial.y-q.y),'physical approach before pass');
 assert(h.lane(p,sender,p)<=3,'connection clear before defender closes it');
 if(blocked){const rival=e.t.opp(t)[6];rival.x=(sender.x+p.x)/2;rival.y=(sender.y+p.y)/2;rival.bodyAngle=Math.atan2(sender.y-rival.y,sender.x-rival.x);observe();assert(h.lane(p,sender,p)>3,'defender blocks the observed connection');assert.equal(h.read(p,{x:p.x,y:p.y}),null,'blocked connection cancels complement');}
 sender.bodyAngle=Math.atan2(p.y-sender.y,p.x-sender.x);
 const approach=Math.hypot(p.x-initial.x,p.y-initial.y);
 e.t.kickTo(sender,p.x,p.y,'pass',p);let frames=0;
 while(!e.t.get().owner&&frames++<300)e.t.update(1/120);
 const end=e.t.get();assert(frames>1,'ball must travel');
 if(blocked){assert(end.owner&&end.owner.t!==t,'defender can intercept the deliberately attempted blocked pass');}
 else {assert.equal(end.owner,p,'intended player receives through update, without capture shortcut');assert(p.controlDuration>0);assert(p.controlUntil>end.elapsed,'reception costs time');const count=end.passes;e.t.chooseAction(p);assert.equal(e.t.get().passes,count,'cannot release before control');}
 results.push({formation,t,top,blocked,receiver:end.owner?.n,receiverTeam:end.owner?.t,frames,approach,control:p.controlDuration});
}
console.log(JSON.stringify(results,null,2));
