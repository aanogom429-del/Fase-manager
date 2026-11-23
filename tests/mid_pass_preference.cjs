const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{env}=require('./continuity.cjs');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const hook='function phaseRelations(list,pos,holder=null,travel=null){';
assert(html.includes(hook)&&html.includes('function midfielderPassPreference('),'missing 0.149 decision rule');
const testHTML=html.replace(hook,hook+'if(!list)return {midfielderPassPreference};');
for(const t of [0,1])for(const slot of [5,6]){
 const e=env(testHTML,73),id=t?'system-red':'system-blue';
 e.nodes[id].value='4-2-3-1';e.nodes[id].onchange();
 e.t.scenario({time:10,team:t,seed:73});
 const team=e.t.team(t),p=team[slot],mid=team[7],other=team[8],forward=t?-1:1;
 p.x=t?70:30;p.y=32;p.bodyAngle=t?Math.PI:0;
 mid.x=p.x+forward*18;mid.y=32;
 const fn=e.t.phaseRelations(null).midfielderPassPreference;
 const ref={actual:mid,memoryAge:0,anticipated:false,x:mid.x,y:mid.y};
 assert.equal(fn(p,ref,18,18,2,8,8),2,'fresh safe connection should get small preference');
 for(const [label,m,args] of [
  ['stale',{...ref,memoryAge:.2},[18,18,2,8,8]],
  ['anticipated',{...ref,anticipated:true},[18,18,2,8,8]],
  ['other-player',{...ref,actual:other},[18,18,2,8,8]],
  ['blocked',ref,[18,18,4,8,8]],
  ['pressured-receiver',ref,[18,18,2,4,8]],
  ['pressured-holder',ref,[18,18,2,8,3]],
  ['too-close',ref,[4,9,2,8,8]],
  ['too-far',ref,[29,29,2,8,8]],
  ['too-long',ref,[18,32,2,8,8]]
 ])assert.equal(fn(p,m,...args),0,label+' must not gain preference');
 const previous=p.formation;p.formation='4-3-3';
 assert.equal(fn(p,ref,18,18,2,8,8),0,'other formation excluded');
 p.formation=previous;p.bodyAngle=t?0:Math.PI;
 assert.equal(fn(p,ref,18,18,2,8,8),0,'unseen receiver excluded');
}
console.log('PASS: 0.149 small conditional pass preference and negative guards in both teams/pivots');
