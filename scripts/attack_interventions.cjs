// Diagnostic interventions only. Never loaded by the browser or used to select a policy.
const assert=require('node:assert/strict');
const rules={
 supportTargets:['}else if(support){','}else if(false&&support){'],
 balanceCap:['if(balance.includes(p))tx=','if(false&&balance.includes(p))tx='],
 longitudinalFollow:['(ballPos.x-base.bx)*movementModel.followGain','(ballPos.x-base.bx)*0']
};
function intervene(source,disabled=[]){
 assert(new Set(disabled).size===disabled.length,'duplicate intervention');
 for(const key of disabled){assert(Object.hasOwn(rules,key),'unknown intervention');const [from,to]=rules[key];assert.equal(source.split(from).length,2,'intervention must match exactly once: '+key);source=source.replace(from,to);}
 return source;
}
module.exports={intervene,keys:Object.keys(rules)};
