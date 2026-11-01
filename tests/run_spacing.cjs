const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const exposed=html.replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(!list)return separateAttackRuns;');
{
 const e=env(exposed),s=e.t.get(),owner=s.owner,mate=e.t.team(owner.t).find(q=>q.n===3);
 owner.x=40;owner.y=32;mate.x=41;mate.y=32;
 const run=e.t.phaseRelations(null),moves=[{p:owner,tx:45,ty:32},{p:mate,tx:45,ty:32}];
 run(moves,owner.t);assert.equal(moves[0].tx,45);assert.equal(moves[0].ty,32);
 assert.notEqual(moves[1].ty,32,'lower-priority runner yields');
 mate.x=70;mate.y=12;const separate=[{p:owner,tx:45,ty:32},{p:mate,tx:76,ty:12}];
 run(separate,owner.t);assert.equal(separate[1].tx,76);assert.equal(separate[1].ty,12);
}
for(const t of [0,1]){
 const simulate=enabled=>{
  const e=env(enabled?html:html.replace('separateAttackRuns(moves,attacking);',''));e.t.scenario({time:10,team:t});
  const s=e.t.get(),p=s.owner,x=v=>t?100-v:v;p.x=x(55);p.y=32;p.driveX=p.x;p.driveY=p.y;
  const group=e.t.team(t).filter(q=>[3,4,8].includes(q.n));
  group.forEach((q,i)=>{q.x=x(50+i*.3);q.y=31+i*.4;q.intentX=p.x;q.intentY=p.y;q.intentAt=10.8;});
  let pairs=0;
  for(let i=0;i<45;i++){e.t.movement(1/60);const list=[p,...group];for(let a=0;a<list.length;a++)for(let b=0;b<a;b++)if(Math.hypot(list[a].x-list[b].x,list[a].y-list[b].y)<4)pairs++;}
  return pairs;
 };
 const before=simulate(false),after=simulate(true);assert(after<before,`${before} -> ${after}`);
 console.log({t,before,after});
}
