const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
function setup(t,seed,deep=true){
 const e=env(process.argv[2]?require('node:fs').readFileSync(process.argv[2],'utf8'):undefined);e.t.scenario({time:0,team:t,seed});const s=e.t.get(),abs=x=>t?100-x:x;
 for(const p of s.players){if(p.t!==t){p.x=abs(95);continue;}p.x=abs(p.role==='keeper'?5:75);p.y=10+(p.id%11)*4;delete p.attackOrigin;}
 s.owner.x=abs(50);s.owner.y=32;const m=s.players.filter(p=>p.t===t);
 m[1].x=abs(48);m[1].y=23;m[4].x=abs(54);m[4].y=41;
 m[2].x=abs(deep?20:60);m[3].x=abs(deep?25:65);
 return {e,s,m,abs,ball:{x:abs(50),y:32}};
}


if(!process.argv[2])for(const t of [0,1]){
 const {e,m,abs,ball}=setup(t,73),targets=e.t.attackingTargets(t,ball);
 const heights=[m[6],m[7]].map(p=>abs(targets.get(p).x));
 assert(heights.filter(x=>x>58).length===1,'one interior offers depth');
 assert([m[2],m[3]].every(p=>abs(targets.get(p).x)<50),'two safety references');
}
for(const t of [0,1])for(const seed of [73,101,502]){
 const {e,m,abs}=setup(t,seed);let owned=0,high=0,safe=0,both=0;
 for(let i=0;i<180;i++){const {owner:o}=e.t.get();if(o?.t===t){
 const view=e.t.perceivedOpposition(o),usable=p=>p!==o&&p.n!==1&&Math.hypot(p.x-o.x,p.y-o.y)<30&&e.t.perceivedLane(o,p,view).clearance>2.5;
 const a=[m[6],m[7]].some(p=>usable(p)&&abs(p.x)-abs(o.x)>8);
 const b=m.some(p=>usable(p)&&abs(p.x)<abs(o.x));owned++;high+=a;safe+=b;both+=a&&b;
 }e.t.update(1/60);}
 console.log(t,seed,owned,high,safe,both);
}
