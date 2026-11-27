const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('http://localhost:8790/'+(process.env.PAGE||'video.html')+'');const info=await p.evaluate(()=>window.ready);console.log(JSON.stringify(info));
const list=await p.evaluate(()=>sceneList());const only=process.argv[2]; const OUT=process.env.KEYS||'keys';const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
for(let i=0;i<list.length;i++){if(only&&!list[i].sec.startsWith(only))continue;const t=list[i].d*0.75;try{await p.evaluate(([i,t])=>renderScene(i,t),[i,t]);}catch(e){errs.push('scene '+i+': '+e.message)}await p.locator('canvas').screenshot({path:`${OUT}/s${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:60,scale:'css'});}
console.log('errors',errs);await b.close()})();
