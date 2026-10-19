const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace('startSituation();requestAnimationFrame(frame);','startSituation();requestAnimationFrame(frame);globalThis.test.contextualWidth=contextualWidth;');
for(const t of [0,1]){
 const e=env(html);e.t.scenario({time:0,team:t});const p=e.t.get().players.find(p=>p.t===t&&p.role==='fullback');
 p.x=40;p.y=30;p.hy=12;p.attackOrigin={x:40,y:30,bx:45,by:32};p.widthStarted=0;p.visualMemory=[];
 assert.equal(e.t.contextualWidth(p,{x:45,y:32},30),26,'Limited initial expansion');
 e.t.scenario({time:30,team:t});assert.equal(e.t.contextualWidth(p,{x:45,y:32},30),12,'Long possession can reach full width');
 const mate=e.t.get().players.find(q=>q.t===t&&q!==p&&q.role!=='keeper');p.visualMemory=[{id:mate.id,x:41,y:12,seenAt:30}];
 assert.equal(e.t.contextualWidth(p,{x:45,y:32},30),30,'Observed nearby width prevents duplicate expansion');
 p.visualMemory=[];p.y=45;assert.equal(e.t.contextualWidth(p,{x:45,y:32},30),52,'Crossing to opposite side changes width direction');
 e.t.prepareDecision();const saved=p.widthStarted;p.widthStarted=100;e.t.restorePosition();assert.equal(p.widthStarted,saved,'Restoration preserves width clock');
 delete p.attackOrigin;e.t.scenario({time:40,team:t});e.t.attackingTargets(t,{x:45,y:32});assert.equal(p.widthStarted,40,'New possession restarts expansion');
}
console.log('PASS: early/long width, occupied side, side exchange, restore and possession reset for both teams');
