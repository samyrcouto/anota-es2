const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
const FPS=25, OUT=process.argv[2]||'../contextao/video01'; const ONLY=process.argv[3]?process.argv[3].split(','):null;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 const p0=await b.newPage({viewport:{width:1920,height:1080}});await p0.goto('http://localhost:8790/'+(process.env.PAGE||'video.html'));await p0.evaluate(()=>window.ready);
 const list=await p0.evaluate(()=>sceneList());await p0.close();
 const secs=[...new Set(list.map(s=>s.sec))].filter(s=>!ONLY||ONLY.includes(s));const queue=[...secs];
 async function worker(id){const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('http://localhost:8790/'+(process.env.PAGE||'video.html'));await p.evaluate(()=>window.ready);
  while(queue.length){const sec=queue.shift();const idx=list.map((s,i)=>[s,i]).filter(([s])=>s.sec===sec);const t0=Date.now();
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',`${OUT}/${sec}.mp4`]);
   const done=new Promise(r=>ff.on('close',r));
   for(const [s,i] of idx){const g0=Math.round(s.start*FPS),g1=Math.round((s.start+s.d)*FPS);for(let g=g0;g<g1;g++){const data=await p.evaluate(([i,t])=>{renderScene(i,t);return document.getElementById('c').toDataURL('image/jpeg',0.9)},[i,g/FPS-s.start]);const buf=Buffer.from(data.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}}
   ff.stdin.end();await done;console.log(`[w${id}] ${sec} ok em ${((Date.now()-t0)/1000).toFixed(0)}s`);}
  await p.close();}
 await Promise.all([0,1,2,3].map(worker));await b.close();
 fs.writeFileSync(`${OUT}/lista.txt`,secs.map(s=>`file '${s}.mp4'`).join('\n'));console.log('fim');})();
