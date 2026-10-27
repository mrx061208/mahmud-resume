
const cv=document.getElementById('c'),ctx=cv.getContext('2d'),W=1920,H=1080,D=15;
const INK='#14110f',CREAM='#faf8f4',OR='#f37021',GOLD='#c9a45c';
const SERIF="'Cormorant Garamond',Georgia,serif",SANS="Inter,system-ui,sans-serif";
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),seg=(t,a,b)=>cl((t-a)/(b-a));
const E={o:x=>1-Math.pow(1-x,3),io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,b:x=>{const c=1.70158,d=c+1;return 1+d*Math.pow(x-1,3)+c*Math.pow(x-1,2)}};

function rev(s,x,y,size,col,p,font,align){ // masked text rise
  ctx.save();ctx.beginPath();ctx.rect(0,y-size*1.0,W,size*1.35);ctx.clip();
  ctx.font=font;ctx.fillStyle=col;ctx.textAlign=align||'left';
  ctx.fillText(s,x,y+(1-p)*size*1.2);ctx.restore();
}
function fade(a){ctx.globalAlpha=cl(a)}

/* ---------- S0: logo reveal ---------- */
function s0(l){
  ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);
  for(let gy=-1;gy<14;gy++)for(let gx=-1;gx<23;gx++){const cx=gx*96+(gy%2?48:0),cy=gy*80,d=Math.hypot(cx-W/2,cy-H/2),s=.5+.5*Math.sin(d*.011-l*4),z=10+34*s;ctx.fillStyle=s>.85?OR:'rgba(201,164,92,'+(0.1+0.4*s)+')';ctx.beginPath();ctx.moveTo(cx,cy-z);ctx.lineTo(cx+z,cy);ctx.lineTo(cx,cy+z);ctx.lineTo(cx-z,cy);ctx.closePath();ctx.fill();}
  const r=140+E.io(seg(l,.15,1.1))*1400;
  ctx.fillStyle=OR;ctx.beginPath();ctx.arc(W/2,H/2,r,0,7);ctx.fill();
  for(let k=0;k<3;k++){const q=((l-0.9-k*.25)*0.9);if(q>0&&q<1){ctx.strokeStyle='rgba(255,255,255,'+(0.5*(1-q))+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(W/2,H/2,300+q*700,0,7);ctx.stroke();}}
  [[-1,330,540],[1,1590,540]].forEach(([d,bx,by],k)=>{const a=E.o(seg(l,.5,1.2));ctx.save();ctx.translate(bx+d*(1-a)*-400,by+Math.sin(l*2+k)*14);ctx.rotate(d*(.12+.04*Math.sin(l*2)));ctx.scale(1.3,1.3);ctx.globalAlpha=.55*a;dash(BP.body,1,'#fff',4);dash(BP.hand,1,'#fff',4);dash(BP.flap,1,'#fff',3);ctx.restore();ctx.globalAlpha=1;});
  const s='HERMESSHOP',size=170,sp=26;ctx.font='700 '+size+'px '+SERIF;
  let ws=[...s].map(c=>ctx.measureText(c).width),tot=ws.reduce((a,b)=>a+b,0)+sp*(s.length-1),x=W/2-tot/2;
  [...s].forEach((c,i)=>{const p=E.o(seg(l,.45+i*.045,1.0+i*.045));rev(c,x,H/2+50,size,'#fff',p,'700 '+size+'px '+SERIF);x+=ws[i]+sp;});
  const lw=700*E.io(seg(l,1.0,1.7));ctx.fillStyle='#fff';ctx.fillRect(W/2-lw/2,H/2+95,lw,3);
  const p2=E.o(seg(l,1.3,1.9));ctx.font='600 26px '+SANS;ctx.letterSpacing='12px';
  rev('ТАДЖИКИСТАН · БУТИК СУМОК',W/2+6,H/2+160,26,'#fff',p2,'600 26px '+SANS,'center');ctx.letterSpacing='0px';
}

/* ---------- S1: bag line draw ---------- */
function bagPaths(){
  const body=new Path2D('M-150 -40 L150 -40 L195 200 Q197 232 163 232 L-163 232 Q-197 232 -195 200 Z');
  const flap=new Path2D('M-150 -40 Q0 120 150 -40');
  const hand=new Path2D('M-85 -40 C-85 -190 85 -190 85 -40');
  return {body,flap,hand};
}
const BP=bagPaths();
function dash(path,p,col,w){ctx.save();ctx.setLineDash([1800,1800]);ctx.lineDashOffset=1800*(1-p);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke(path);ctx.restore();}
function s1(l){
  ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);
  for(let i=0;i<46;i++){const x=(i*173)%W,y=H-((l*38+i*97)%H),a=.15+.25*Math.abs(Math.sin(i+l*2));ctx.fillStyle='rgba(201,164,92,'+a+')';ctx.beginPath();ctx.arc(x,y,2+(i%3),0,7);ctx.fill();}
  ctx.save();ctx.translate(560,590);const sc=1.75+0.04*Math.sin(l*1.5);ctx.scale(sc,sc);
  const fp=E.o(seg(l,1.2,2));ctx.fillStyle='rgba(243,112,33,'+(0.9*fp)+')';ctx.fill(BP.body);
  dash(BP.body,E.io(seg(l,0,1.3)),OR,5);
  dash(BP.hand,E.io(seg(l,.3,1.5)),GOLD,6);
  dash(BP.flap,E.io(seg(l,.6,1.6)),fp>0.5?'#fff':OR,4);
  const lp=E.b(seg(l,1.5,2.1));ctx.save();ctx.translate(0,62);ctx.scale(lp,lp);ctx.fillStyle=GOLD;ctx.beginPath();ctx.roundRect(-20,-24,40,48,8);ctx.fill();ctx.fillStyle=INK;ctx.beginPath();ctx.arc(0,-2,6,0,7);ctx.fill();ctx.restore();
  ctx.restore();
  rev('Timeless pieces.',1020,470,110,CREAM,E.o(seg(l,.5,1.2)),'italic 600 110px '+SERIF);
  rev('Modern elegance.',1020,610,110,OR,E.o(seg(l,.8,1.5)),'italic 600 110px '+SERIF);
  const lw=520*E.io(seg(l,1.3,2));ctx.fillStyle=GOLD;ctx.fillRect(1024,665,lw,3);
  fade(seg(l,1.8,2.4));ctx.font='500 24px '+SANS;ctx.letterSpacing='8px';ctx.fillStyle='#bdb5a6';ctx.fillText('ВЫБРАНО С ВНИМАНИЕМ — ВНЕ ВРЕМЕНИ',1024,730);ctx.letterSpacing='0px';ctx.globalAlpha=1;
}

/* ---------- S2: brand slam ---------- */
function s2(l){
  ctx.fillStyle=OR;ctx.fillRect(0,0,W,H);
  ctx.font='700 240px '+SERIF;ctx.lineWidth=2;ctx.strokeStyle='rgba(255,255,255,.22)';
  const t='HERMÈS · CHANEL · DIOR · LOUIS VUITTON · ',w=ctx.measureText(t).width;
  [[190,-1],[1000,1]].forEach(([y,d])=>{const o=((l*160*d)%w+w)%w;for(let k=-1;k<3;k++)ctx.strokeText(t,k*w-o,y);});
  const B=['HERMÈS','CHANEL','DIOR','LOUIS VUITTON'],cols=['#fff',INK,'#fff',INK];
  B.forEach((b,i)=>{const d=.15+i*.5,p=E.b(seg(l,d,d+.7)),dir=i%2?1:-1,off=(1-p)*1900*dir;
    ctx.save();ctx.translate(W/2+off,300+i*190);ctx.font='700 190px '+SERIF;ctx.textAlign='center';ctx.fillStyle=cols[i];
    const sk=(1-E.o(seg(l,d,d+.5)))*-.25;ctx.transform(1,0,sk,1,0,0);ctx.fillText(b,0,0);ctx.restore();
    fade(seg(l,d+.4,d+.8));ctx.font='600 24px '+SANS;ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('0'+(i+1),110,300+i*190-60);ctx.globalAlpha=1;});
}

/* ---------- S3: quilted wave ---------- */
function s3(l){
  ctx.fillStyle=CREAM;ctx.fillRect(0,0,W,H);
  const it=E.o(seg(l,0,.9));
  for(let gy=-1;gy<14;gy++)for(let gx=-1;gx<23;gx++){
    const cx=gx*96+(gy%2?48:0),cy=gy*80,d=Math.hypot(cx-W/2,cy-H/2),s=.5+.5*Math.sin(d*.011-l*3.4),z=(8+40*s)*it;
    ctx.fillStyle=s>.82?OR:'rgba(20,17,15,'+(0.12+0.7*s)+')';
    ctx.beginPath();ctx.moveTo(cx,cy-z);ctx.lineTo(cx+z,cy);ctx.lineTo(cx,cy+z);ctx.lineTo(cx-z,cy);ctx.closePath();ctx.fill();
    if(z>14){ctx.fillStyle=GOLD;ctx.beginPath();ctx.arc(cx,cy,3,0,7);ctx.fill();}
  }
  const bw=1180*E.io(seg(l,.5,1.2));ctx.fillStyle=INK;ctx.fillRect(W/2-bw/2,H/2-170,bw,340);
  ctx.fillStyle=GOLD;ctx.fillRect(W/2-bw/2,H/2-170,bw,6);ctx.fillRect(W/2-bw/2,H/2+164,bw,6);
  rev('Силуэт для',W/2,H/2-10,110,CREAM,E.o(seg(l,1,1.6)),'italic 600 110px '+SERIF,'center');
  rev('каждой истории.',W/2,H/2+110,110,OR,E.o(seg(l,1.25,1.85)),'italic 600 110px '+SERIF,'center');
}

/* ---------- S4: stats + lockup ---------- */
function s4(l){
  ctx.fillStyle=INK;ctx.fillRect(0,0,W,H);
  const st=[['04','бренда'],['08','силуэтов'],['03','категории']];
  const so=1-E.o(seg(l,1.5,1.9));
  if(so>0){ctx.globalAlpha=so;
    st.forEach((s,i)=>{const d=.1+i*.25,p=E.o(seg(l,d,d+.8)),n=Math.round(parseInt(s[0])*p),cx=420+i*540;
      rev(String(n).padStart(2,'0'),cx,590,260,i==1?OR:CREAM,E.o(seg(l,d,d+.5)),'700 260px '+SERIF,'center');
      fade(so*seg(l,d+.4,d+.9));ctx.font='600 28px '+SANS;ctx.letterSpacing='10px';ctx.fillStyle=GOLD;ctx.textAlign='center';ctx.fillText(s[1].toUpperCase(),cx+5,670);ctx.letterSpacing='0px';ctx.globalAlpha=so;});
    ctx.globalAlpha=1;}
  const lp=E.o(seg(l,1.8,2.6));
  if(lp>0){
    ctx.strokeStyle=GOLD;ctx.lineWidth=5;ctx.beginPath();ctx.arc(W/2,400,130,-Math.PI/2,-Math.PI/2+6.2832*E.io(seg(l,1.8,2.7)));ctx.stroke();
    rev('H',W/2,462,170,OR,lp,'700 170px '+SERIF,'center');
    rev('HERMESSHOP',W/2,680,130,CREAM,E.o(seg(l,2.1,2.7)),'700 130px '+SERIF,'center');
    fade(seg(l,2.5,2.95));ctx.font='600 30px '+SANS;ctx.letterSpacing='10px';ctx.fillStyle=OR;ctx.textAlign='center';ctx.fillText('HERMESSHOP.SEE.TJ',W/2+5,760);
    ctx.font='500 20px '+SANS;ctx.fillStyle='#8d857a';ctx.fillText('MOTION DESIGN — CLAUDE',W/2+5,880);ctx.letterSpacing='0px';ctx.globalAlpha=1;
  }
}

const SC=[s0,s1,s2,s3,s4],HUD=['#fff',CREAM,'#fff',INK,CREAM],WIPE=[OR,OR,INK,INK,OR];
function frame(t){
  const i=Math.min(4,Math.floor(t/3)),l=t-i*3;
  ctx.save();ctx.textBaseline='alphabetic';SC[i](l);ctx.restore();ctx.globalAlpha=1;ctx.textAlign='left';
  for(let b=3;b<=12;b+=3){const p=seg(t,b-.3,b+.3);if(p>0&&p<1){ctx.fillStyle=WIPE[b/3-1];
    if(p<.5)ctx.fillRect(0,0,E.io(p*2)*W,H);else{const x=E.io((p-.5)*2)*W;ctx.fillRect(x,0,W-x,H);}
    ctx.fillStyle=GOLD;const gx=p<.5?E.io(p*2)*W:E.io((p-.5)*2)*W;ctx.fillRect(gx-4,0,8,H);}}
  ctx.fillStyle=HUD[i];ctx.font='600 20px '+SANS;ctx.letterSpacing='6px';ctx.textAlign='left';ctx.fillText('SHOWREEL 2026',70,80);
  ctx.textAlign='right';ctx.fillText('0'+Math.floor(t)+' / 15',W-70,80);ctx.letterSpacing='0px';ctx.textAlign='left';
  ctx.globalAlpha=.25;ctx.fillRect(70,H-70,W-140,3);ctx.globalAlpha=1;ctx.fillStyle=i==2?'#fff':OR;ctx.fillRect(70,H-70,(W-140)*t/D,3);
}


const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let t=motionPreference.matches?14.5:0,playing=!motionPreference.matches,last=performance.now(),externalPaused=false,ready=false;
function setPlaying(value){playing=value;last=performance.now();}
function loop(now){
  const dt=Math.max(0,Math.min((now-last)/1000,.1));last=now;
  if(playing&&!document.hidden){t=(t+dt)%D;frame(t);}
  requestAnimationFrame(loop);
}
addEventListener('message',event=>{
  if(event.source!==parent||event.data?.type!=='resume-flyover')return;
  externalPaused=!!event.data.paused;
  setPlaying(!externalPaused&&!motionPreference.matches);
});
document.addEventListener('visibilitychange',()=>setPlaying(!document.hidden&&!externalPaused&&!motionPreference.matches));
motionPreference.addEventListener('change',event=>{
  setPlaying(!event.matches&&!externalPaused&&!document.hidden);
  if(event.matches){t=14.5;if(ready)frame(t);}
});
document.fonts.ready.catch(()=>{}).then(()=>{
  ready=true;frame(t);last=performance.now();
  if(parent!==window)parent.postMessage({type:'resume-flyover-ready'},'*');
  requestAnimationFrame(loop);
});
