const assert=require('node:assert/strict'),{options,balance}=require('../scripts/measure_tactical_utility.cjs');
const owner={t:0,x:30,y:32,role:'mid'},mate={t:0,x:40,y:32,role:'mid'},rival={t:1,x:35,y:32,role:'mid'};
assert.equal(options(owner,[owner,mate]).length,1);assert.equal(options(owner,[owner,mate,rival]).length,0);
assert.equal(options(owner,[owner,mate,{...rival,y:40}]).length,1);
assert.equal(options(owner,[owner,{...mate,role:'keeper'}]).length,0);
const s={players:[owner,mate,rival],bx:35,by:32};assert.equal(balance(s,0).behindBall,1);
const mirror={players:s.players.map(p=>({...p,t:1-p.t,x:100-p.x,y:64-p.y})),bx:65,by:32};assert.deepEqual(balance(s,0),balance(mirror,1));
console.log('PASS: open/blocked line, keeper exclusion and mirrored balance metrics');
