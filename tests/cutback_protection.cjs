const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('function phaseRelations(list,pos,holder=null,travel=null){','function phaseRelations(list,pos,holder=null,travel=null){if(list===null)return {protect:cutbackProtection};');
for(const t of [0,1]){
 const e=env(html),x=v=>t?100-v:v;e.t.scenario({time:10,team:1-t});const s=e.t.get(),p=s.players.find(q=>q.t===t&&q.n===7),r=s.players.find(q=>q.t!==t&&q.n===10),carrier=s.owner;
 for(const q of s.players.filter(q=>q.t!==t)){q.x=x(90);q.y=60;}
 Object.assign(carrier,{x:x(18),y:10});Object.assign(r,{x:x(25),y:30});Object.assign(p,{x:x(23),y:28,bodyAngle:Math.PI/2,rivalMemory:[]});
 e.t.observeRivals(p);const f=e.t.phaseRelations(null).protect,ball={x:carrier.x,y:carrier.y};
 let q=f(p,ball);assert(q);assert(Math.abs(q.x-x(23))<1e-8);assert.equal(q.y,30);
 assert.equal(e.t.defendingTarget(p,1,ball).y,30,'new protection reaches defensive target pipeline');
 p.rivalMemory=[];p.bodyAngle=-Math.PI/2;assert.equal(f(p,ball),null,'hidden unknown receiver ignored');
 p.bodyAngle=Math.PI/2;e.t.observeRivals(p);assert(f(p,ball));
 assert.equal(f(p,{x:x(18),y:32}),null,'central origin not cutback');
 p.x=x(60);assert.equal(f(p,ball),null,'unreachable receiver not pursued');p.x=x(23);
 e.t.kickTo(carrier,r.x,r.y,'pass',r);assert(f(p,ball),'coverage can continue during low backward pass');
 s.flight=e.t.get().flight;s.flight.loft=5;assert.equal(f(p,ball),null,'aerial cross uses existing policies');
}
console.log('PASS: mirrored perceived cutback receiver, goal-side protection, unknown/unreachable exclusions and low-flight continuation');
