'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {validateBody,checkRateLimit,MAX_MESSAGE_CHARS,ROLES}=require('./index.js');
test('validates a bounded message and whitelists profile fields',()=>{
 const result=validateBody({message:'Help me plan a path',context:{degree:'BCom',selectedRole:'Data Analyst',secret:'must not pass through'}});
 assert.equal(result.message,'Help me plan a path');assert.equal(result.context.selectedRole,'Data Analyst');assert.equal('secret' in result.context,false);
});
test('rejects missing, blank and oversized messages',()=>{
 assert.ok(validateBody({}).error);assert.ok(validateBody({message:'  '}).error);assert.ok(validateBody({message:'x'.repeat(MAX_MESSAGE_CHARS+1)}).error);
});
test('limits request count per window and resets after expiry',()=>{
 const key='test-'+Math.random(),now=100000;for(let i=0;i<10;i++)assert.equal(checkRateLimit(key,now).allowed,true);assert.equal(checkRateLimit(key,now).allowed,false);assert.equal(checkRateLimit(key,now+15*60*1000+1).allowed,true);
});
test('career role list is fixed and nonempty',()=>{
 assert.ok(ROLES.size>=10);assert.equal(validateBody({message:'hello',context:{selectedRole:'Invented job'}}).context.selectedRole,'');
});
