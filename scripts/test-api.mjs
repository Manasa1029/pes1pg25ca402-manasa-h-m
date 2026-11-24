import assert from 'node:assert/strict';
import {writeFileSync, mkdirSync} from 'node:fs';
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const results=[];
async function check(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.message);process.exitCode=1;}}
await check('API returns six complete products',async()=>{const r=await fetch(base+'/api/products');assert.equal(r.status,200);const p=await r.json();assert.equal(p.length,6);for(const item of p){assert.ok(item.id&&item.name&&item.description&&item.image);assert.ok(item.price>0);assert.equal((await fetch(base+item.image)).status,200);}});
await check('API search is case insensitive',async()=>{const r=await fetch(base+'/api/products?q=STUDIO');const p=await r.json();assert.equal(p.length,1);assert.equal(p[0].name,'Studio Wireless');});
await check('API category filter returns matching products',async()=>{const r=await fetch(base+'/api/products?category=Audio');const p=await r.json();assert.equal(p.length,2);assert.ok(p.every(p=>p.category==='Audio'));});
await check('No-match search returns an empty list',async()=>{assert.deepEqual(await (await fetch(base+'/api/products?q=nonexistentzzz')).json(),[]);});
await check('Unknown product API ID returns 404',async()=>{assert.equal((await fetch(base+'/api/products?id=missing')).status,404);});
await check('Invalid category returns 400',async()=>{assert.equal((await fetch(base+'/api/products?category=invalid')).status,400);});
await check('Oversized search returns 400',async()=>{assert.equal((await fetch(base+'/api/products?q='+'x'.repeat(101))).status,400);});
await check('Unsupported POST returns 405',async()=>{assert.equal((await fetch(base+'/api/products',{method:'POST'})).status,405);});
await check('Every required page opens directly',async()=>{for(const path of ['/products','/products/1','/products/2','/products/3','/products/4','/products/5','/products/6','/cart','/checkout']){assert.equal((await fetch(base+path)).status,200,path);}});
await check('Unknown product page returns 404',async()=>{const r=await fetch(base+'/products/unknown');assert.equal(r.status,404);assert.match(await r.text(),/isn’t on the shelf/);});
await check('Home redirects to catalog',async()=>{const r=await fetch(base+'/',{redirect:'manual'});assert.equal(r.status,307);assert.equal(r.headers.get('location'),'/products');});
mkdirSync('evidence',{recursive:true});writeFileSync('evidence/api-tests.json',JSON.stringify({testedAt:new Date().toISOString(),base,results},null,2));
