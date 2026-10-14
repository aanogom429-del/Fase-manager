const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {env,signature}=require('./continuity.cjs'),{evaluate}=require('../scripts/evaluate_defense.cjs');
const root=path.join(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'data/metrica-analysis.json'),'utf8'));
const clip=data.clips.find(c=>c.id==='transition-blue'),a=evaluate(clip),repeat=evaluate(clip);
assert.equal(JSON.stringify(a),JSON.stringify(repeat),'controlled rollout must be deterministic');
assert.equal(a.frames[0].meanErrorM,0);assert.equal(a.frames.length,clip.frames.length);
assert(a.frames.every(f=>Number.isFinite(f.meanErrorM)&&Number.isFinite(f.stationaryErrorM)&&f.players.length===10));
const mirrored={...clip,team:1,frames:clip.frames.map(f=>({...f,ball:[100-f.ball[0],64-f.ball[1]],players:f.players.map(([t,n,x,y])=>[1-t,t?n-14:n+14,100-x,64-y])}))};
const b=evaluate(mirrored);assert(Math.abs(a.meanErrorM-b.meanErrorM)<1e-8,'direction normalization must be symmetric');
const incomplete=JSON.parse(JSON.stringify(clip));incomplete.frames[1].ball=null;assert.throws(()=>evaluate(incomplete));
async function main(){
 const e=env(),before=signature(e);e.nodes['real-reference'].open=true;await e.nodes['real-reference'].ontoggle();
 e.nodes['reference-sequence'].onchange({target:{value:'4'}});assert.equal(e.nodes['defense-comparison'].hidden,false);
 e.nodes['defense-overlay'].checked=true;await e.nodes['defense-overlay'].onchange();e.nodes['transition-five'].onclick();
 assert(e.nodes['reference-pitch'].innerHTML.includes('stroke-dasharray="4 3"'));assert(e.nodes['defense-comparison-result'].textContent.includes('no mejora'));
 assert.equal(signature(e),before,'comparison must not alter match');
 e.nodes['defense-overlay'].checked=false;await e.nodes['defense-overlay'].onchange();assert(!e.nodes['reference-pitch'].innerHTML.includes('stroke-dasharray="4 3"'));
 e.nodes['reference-sequence'].onchange({target:{value:'0'}});assert.equal(e.nodes['defense-comparison'].hidden,true);
 console.log('PASS: deterministic replay, exact initial state, symmetric directions, missing-data rejection, overlay, baseline disclosure, game isolation');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
