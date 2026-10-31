const assert=require('node:assert/strict'),fs=require('node:fs'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
for(const t of [0,1]){
 const e=env(html,101);
 const s=e.t.get(),p=s.players.find(q=>q.t===t&&q.n===6),dir=t?-1:1;
 p.x=t?75:25;p.y=12;p.bodyAngle=Math.PI/2;
 e.t.scenario({time:10,team:t});
 for(const q of s.players)if(q!==p){q.x=t?5:95;q.y=60;}
 const mate=s.players.find(q=>q.t===t&&q.n===3);mate.x=p.x-dir*4;mate.y=30;
 const rival=s.players.find(q=>q.t!==t);rival.x=p.x+dir*3;rival.y=12;
 e.t.chooseAction(p);
 assert.equal(e.t.get().flight?.target||s.players.find(q=>q.id===p.kickPreparation?.targetId),mate,'circulate away from pressured flank');
 assert.match(e.nodes.status.textContent,/circula hacia el lado libre/);
}
console.log('PASS: both teams circulate from pressured flank through safe opposite-side support');
