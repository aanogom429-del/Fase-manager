const assert=require('node:assert/strict'),{setup}=require('./remembered_outlet.cjs');
// Fixed pre-decision states avoid changing the subject when earlier decisions improve.
for(const t of [0,1]){
 const {e,p,back}=setup(t);e.t.chooseAction(p);
 assert.equal(e.t.get().passes,0,'do not force the blocked forward pass');
 assert.equal(e.t.get().owner,p,'retain ball while reassessing or preparing');
 assert(p.scanUntil>e.t.get().elapsed||p.kickPreparation?.targetId===back.id,'explore or prepare rear outlet');
}
console.log('PASS: mirrored exposed fallback rejected at fixed decision states');
