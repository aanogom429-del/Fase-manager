const assert=require('node:assert/strict'),{env}=require('./continuity.cjs');
for(const t of [0,1])for(const mode of ['short','direct','expiry']){
 const e=env();e.t.scenario({time:10,team:1-t});const s=e.t.get(),x=v=>t?100-v:v;
 const g=s.players.find(q=>q.t===t&&q.n===1),shot=s.owner;
 for(const q of s.players){q.x=x(85);q.y=50;}
 g.x=x(8);g.y=32;g.bodyAngle=t?Math.PI:0;shot.x=x(21);shot.y=32;shot.bodyAngle=t?0:Math.PI;
 e.t.kickTo(shot,g.x,g.y,'shot');assert(e.t.get().flight);e.t.capture(g,'detiene el remate');shot.x=x(85);
 assert.equal(g.keeperReceipt,'blocaje');
 const near=s.players.find(q=>q.t===t&&q.n===3),wide=s.players.find(q=>q.t===t&&q.n===4),far=s.players.find(q=>q.t===t&&q.n===10);
 near.x=x(21);near.y=23;
 if(mode==='short'){wide.x=x(22);wide.y=42;}
 if(mode==='direct'){far.x=x(49);far.y=32;}
 e.t.chooseAction(g);assert.equal(e.t.get().owner,g);assert.equal(e.t.get().flight,null,'initial catch settles');
 g.receivedAt-=1;e.t.chooseAction(g);
 if(mode==='expiry'){assert.equal(e.t.get().flight,null,'single short outlet is not an organized block');g.receivedAt-=3;e.t.chooseAction(g);}
 const f=e.t.get().flight;assert(f,'eventual distribution');
 if(mode==='direct'){assert(f.keeperLong);assert.equal(f.target,far,'attack long even with short pass available');}
 else{assert(!f.loft);assert([near,wide].includes(f.target));}
 e.t.startSituation();assert(s.players.every(q=>!q.keeperReceipt));
}
for(const t of [0,1])for(const pressed of [false,true]){
 const e=env();e.t.scenario({time:10,team:t});const s=e.t.get(),x=v=>t?100-v:v,g=s.players.find(q=>q.t===t&&q.n===1),p=s.owner;
 for(const q of s.players){q.x=x(80);q.y=50;}
 p.x=x(22);p.y=32;p.bodyAngle=t?0:Math.PI;g.x=x(8);g.y=32;g.bodyAngle=t?Math.PI:0;
 e.t.kickTo(p,g.x,g.y,'pass',g);e.t.capture(g,'recibe');assert.equal(g.keeperReceipt,'pies');
 if(pressed){const r=s.players.find(q=>q.t!==t);r.x=x(10);r.y=32;}
 e.t.chooseAction(g);assert.equal(!!e.t.get().flight,pressed,'feet: organize only without close pressure');
}
console.log('PASS: mirrored catch, width, direct attack, timeout, reset and pressured/unpressured backpasses');
