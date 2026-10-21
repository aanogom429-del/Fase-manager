// Reproducible investigation of recovered e28d784. These controls are NOT the engine.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const evaluation=require('./evaluate_finishing_v0531.cjs');
const root=path.join(__dirname,'..'),hash=s=>createHash('sha256').update(s).digest('hex');
const base=fs.readFileSync(path.join(root,'tests/fixtures/engine-v0531-e28.html'),'utf8');
assert.equal(hash(base),'f34b02c57a9f067cddca031a99ac17ea69e6aa1b785114c01b0a5d774dc7d18c','Recovered source must stay byte-exact');
function replaceOnce(source,anchor,replacement){assert.equal(source.split(anchor).length,2,'Unique experimental anchor: '+anchor);return source.replace(anchor,replacement);}
function observedShotControl(source=base){
 const addition=`// Lecturas consecutivas del balón visible; no se usa el destino del vuelo.
function observeShot(p){
 const previous=p.shotSight;
 if(!flight||flight.kind!=='shot'||flight.t===p.t||ballHeight>1.4||isKeeper(p)||!perceives(p,{x:bx,y:by})){delete p.shotSight;return;}
 if(previous&&previous.seenAt===elapsed)return;
 const gap=previous?elapsed-previous.seenAt:0;
 const sight={x:bx,y:by,seenAt:elapsed};
 if(gap>0&&gap<=.05){sight.vx=(bx-previous.x)/gap;sight.vy=(by-previous.y)/gap;}
 p.shotSight=sight;
}
function observedShotTarget(p){
 const s=p.shotSight;
 if(!s||elapsed!==s.seenAt||!Number.isFinite(s.vx)||!Number.isFinite(s.vy)||finishingReadDelay(p)>0||defenseCommitted(p))return null;
 const v2=s.vx*s.vx+s.vy*s.vy;
 if(v2<1)return null;
 const along=((p.x-s.x)*s.vx+(p.y-s.y)*s.vy)/v2;
 if(along<0||along>.8||Math.hypot(p.x-s.x-along*s.vx,p.y-s.y-along*s.vy)>(p.speed||8)*.8+1.65)return null;
 const exits=[s.vx>0?(100-s.x)/s.vx:s.vx<0?-s.x/s.vx:Infinity,s.vy>0?(64-s.y)/s.vy:s.vy<0?-s.y/s.vy:Infinity];
 const horizon=Math.min(.8,...exits);
 for(let i=1;i<=12;i++){
  const time=horizon*i/12,q={x:s.x+s.vx*time,y:s.y+s.vy*time};
  const predicted=finishingPosition(p,q,time);
  if((p.cool||0)<=time&&d(predicted,q)<1.65)return q;
 }
 return null;
}
`;
 source=replaceOnce(source,'function anticipateFlight(p,f){',addition+'function anticipateFlight(p,f){');
 source=replaceOnce(source,'observeTeammates(p);observeRivals(p);}pruneOffBall();','observeTeammates(p);observeRivals(p);observeShot(p);}pruneOffBall();');
 source=replaceOnce(source,"  traceDestination(p,attacking===p.t?'Lectura ofensiva'","  if(flight&&flight.kind==='shot'&&p.t!==flight.t&&!isKeeper(p)){const point=observedShotTarget(p);if(point){tx=point.x;ty=point.y;}}\n  traceDestination(p,attacking===p.t?'Lectura ofensiva'");
 const reset='delete p.intentAt;delete p.intentX;delete p.intentY;delete p.attackOrigin;';
 assert.equal(source.split(reset).length,3,'Reset and restore anchors');
 return source.replaceAll(reset,'delete p.shotSight;'+reset);
}
function finitePressureControl(source=base){return replaceOnce(source,'if(candidateAccess>baseAccess+1e-6)continue;','if(baseAccess<=d(ballPos,goal)/48&&candidateAccess>baseAccess+1e-6)continue;');}
const sources=()=>({...evaluation.sources(),e28:base,observed:observedShotControl(),finitePressure:finitePressureControl()});
function cases(version){return evaluation.definitions().filter(c=>version!=='finitePressure'||c.group==='help'||(c.group==='orientation'&&c.options.angle===0));}
function compact(result){const {initial,final,...rest}=result;return {...rest,stateSha256:hash(JSON.stringify({initial,final}))};}
function run(version,output){
 const source=sources()[version];assert(source,'Unknown engine/control '+version);
 const report={version,sourceSha256:hash(source),simulationSha256:evaluation.simulationHash(),fresh:true,rows:[]};
 for(const c of cases(version)){
  report.rows.push({...c,result:compact(evaluation.simulate(source,c.t,c.kind,c.seed,c.options))});
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
  console.error(version,report.rows.length);
 }
 return report;
}
function configOf({result,...config}){return config;}
function collect(directory,output){
 const versions=['v052','v053','e28','observed','finitePressure'],src=sources();
 const historical=JSON.parse(fs.readFileSync(path.join(root,'data/finishing-v0531.json'),'utf8'));
 const parts=Object.fromEntries(versions.map(v=>{
  const part=JSON.parse(fs.readFileSync(path.join(directory,'fase-resume-'+v+'.json'),'utf8'));
  assert.equal(part.version,v);assert.equal(part.fresh,true);
  assert.equal(part.sourceSha256,hash(src[v]));assert.equal(part.simulationSha256,evaluation.simulationHash());
  assert.equal(part.rows.length,cases(v).length);
  part.rows.forEach((row,i)=>{const {result,...config}=row;assert.deepEqual(config,cases(v)[i]);});
  return [v,part];
 }));
 const rows=evaluation.definitions().map(c=>{
  const results={};for(const v of versions){const row=parts[v].rows.find(r=>JSON.stringify(configOf(r))===JSON.stringify(c));if(row)results[v]=row.result;}
  return {...c,results};
 });
 const agreement={};
 for(const [v,old] of [['v052','v052'],['v053','v053'],['e28','v0531']]){
  let matched=0;for(let i=0;i<rows.length;i++){
   assert.deepEqual(rows[i].results[v],compact(historical.rows[i].results[old]),'Fresh/history mismatch '+v+' '+i);matched++;
  }
  agreement[v]=matched;
 }
 const report={baseCommit:'e28d7848431305c2a449b402c18000399314cd53',mainCommit:'82c6c021a510433472e12157a4ec363667ea9000',decision:'withheld; corrective engine not accepted for main',freshSimulations:versions.reduce((n,v)=>n+parts[v].rows.length,0),reusedSimulations:0,engineSha256:Object.fromEntries(versions.map(v=>[v,hash(src[v])])),simulationSha256:evaluation.simulationHash(),controlRecipeSha256:hash(observedShotControl.toString()+finitePressureControl.toString()),historicalAgreement:agreement,protocol:'Same corrected 76 configurations as e28; 120 Hz updates and 20 Hz passive measurements. All results freshly simulated. Finite-pressure control stops after the 16 development cases because it loses pressure and concedes more goals. Controls are source transformations of the immutable e28 fixture, not production code.',limitations:[...historical.limitations,'Previously exposed scenarios: exploratory replication, not a new holdout','Observed-shot contact positives are checked against actual update; a null prediction does not prove physical impossibility','Initial/final coordinates are represented by a SHA256 for compact replication; adverse traces are stored separately','No new goalkeeper, attack or IFAB policy'],rows};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');return report;
}
function traces(output){
 const src=sources(),rows=[];
 for(const [t,seed] of [[1,101],[0,202]])for(const version of ['v052','v053','e28','observed']){
  const result=evaluation.simulate(src[version],t,'pass',seed,{trace:true});
  result.samples=result.samples.filter(s=>t===1?(s.time>=1.4&&s.time<=4.3):(s.time>=.7&&s.time<=1.6));
  rows.push({t,seed,version,sourceSha256:hash(src[version]),...result});
 }
 const report={simulationSha256:evaluation.simulationHash(),traceWindows:'team1/pass101 1.4..4.3 s; team0/pass202 .7..1.6 s; full event lists',rows};
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module){
 const [version,output,destination]=process.argv.slice(2);
 assert(output,'Usage: node scripts/evaluate_finishing_resume.cjs VERSION OUTPUT, --traces OUTPUT or --collect DIRECTORY OUTPUT');
 if(version==='--collect'){assert(destination);collect(output,destination);}
 else if(version==='--traces')traces(output);
 else run(version,output);
}
module.exports={base,hash,sources,cases,compact,run,collect,traces,observedShotControl,finitePressureControl};
