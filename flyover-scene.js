
const W=1440,H=1152,F=1880,PW=904,PH=1280,D=14.5,PIECES=[{"n": "photo", "src": "images/flyover/layer-00.png", "cx": 776.0, "cy": 174.5, "w": 228, "h": 253, "H": 115, "ang": 46, "k": "hero"}, {"n": "chip1", "src": "images/flyover/layer-01.png", "cx": 531.0, "cy": 299.0, "w": 394, "h": 86, "H": 70, "ang": 30, "k": "hero"}, {"n": "chip2", "src": "images/flyover/layer-02.png", "cx": 517.0, "cy": 330.0, "w": 366, "h": 80, "H": 62, "ang": 30, "k": "hero"}, {"n": "about", "src": "images/flyover/layer-03.png", "cx": 596.0, "cy": 482.5, "w": 524, "h": 171, "H": 40, "ang": 22, "k": "a"}, {"n": "edu", "src": "images/flyover/layer-04.png", "cx": 541.0, "cy": 612.5, "w": 414, "h": 101, "H": 200, "ang": 54, "k": "a"}, {"n": "contacts", "src": "images/flyover/layer-05.png", "cx": 165.0, "cy": 429.0, "w": 306, "h": 248, "H": 120, "ang": 46, "k": "a"}, {"n": "skills", "src": "images/flyover/layer-06.png", "cx": 165.0, "cy": 675.0, "w": 306, "h": 216, "H": 110, "ang": 46, "k": "a"}, {"n": "exp", "src": "images/flyover/layer-07.png", "cx": 611.0, "cy": 759.0, "w": 554, "h": 198, "H": 90, "ang": 30, "k": "a"}, {"n": "proj", "src": "images/flyover/layer-08.png", "cx": 611.0, "cy": 962.5, "w": 622, "h": 289, "H": 112, "ang": 30, "k": "a"}, {"n": "goal", "src": "images/flyover/layer-09.png", "cx": 606.0, "cy": 1125.0, "w": 544, "h": 126, "H": 40, "ang": 22, "k": "a"}];
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),pr=(t,a,b)=>cl((t-a)/(b-a)),sm=p=>p*p*(3-2*p),eo=p=>1-Math.pow(1-p,3),ei=p=>p<.5?2*p*p:1-2*(1-p)*(1-p),lp=(a,b,p)=>a+(b-a)*p;
const c=document.getElementById('c'),gl=c.getContext('webgl2',{premultipliedAlpha:true,antialias:true});
if(gl){
const VS=`#version 300 es
in vec2 q;uniform vec3 C;uniform vec2 sc;uniform vec4 R;uniform float hh,ang;uniform vec2 off;
out vec2 vUv;out vec2 vP;out float vZ;
void main(){vec2 l=(q-.5)*R.zw;float ca=cos(ang),sa=sin(ang);
vec3 P=vec3(R.x+l.x+off.x,R.y+off.y+l.y*ca,hh-l.y*sa);vec3 v=P-C;float s=sc.x,c=sc.y;
float xc=v.x,yc=-c*v.y+s*v.z,zc=-s*v.y-c*v.z;vUv=q;vP=P.xy;vZ=zc;
gl_Position=vec4(${F}.*xc/720.,${F}.*yc/576.,0.,zc);}`;
const FS=`#version 300 es
precision highp float;in vec2 vUv;in vec2 vP;in float vZ;out vec4 o;
uniform sampler2D T;uniform vec2 TS;uniform int mode;uniform float focus,shB,A;uniform vec2 M;
float sdr(vec2 p,vec2 b,float r){vec2 d=abs(p)-b+r;return length(max(d,0.))+min(max(d.x,d.y),0.)-r;}
void main(){vec2 dx=dFdx(vUv),dy=dFdy(vUv);
float r=vZ<focus?75.*(focus-vZ)/vZ:6.*(vZ-focus)/vZ;
if(mode==1)r=max(r,shB*${F}./vZ);r=min(r,120.);
if(mode==2){float s=sdr(vP-vec2(452.,M.x*.5+40.),vec2(452.,M.x*.5),M.y);float a=.24*exp(-max(s+10.,0.)/75.)*A;o=vec4(vec3(.1,.13,.2)*a,a);return;}
float tpp=max(length(dx*TS),length(dy*TS));vec4 col;
if(r<.6)col=textureGrad(T,vUv,dx,dy);else{float lod=log2(max(1.,r*tpp/3.2));col=vec4(0.);
for(int i=0;i<40;i++){float a=float(i)*2.39996,rd=r*sqrt((float(i)+.5)/40.);vec2 u=vec2(cos(a),sin(a))*rd;col+=textureLod(T,vUv+dx*u.x+dy*u.y,lod);}col/=40.;}
if(mode==3){float s=sdr(vP-vec2(452.,M.x*.5),vec2(452.,M.x*.5),M.y);col*=clamp(.5-s,0.,1.);}
if(mode==1){float a=col.a*.26*A;o=vec4(vec3(.1,.13,.2)*a,a);}else o=col*A;}`;
const FV=`#version 300 es
out vec2 u;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);u=p;gl_Position=vec4(p*2.-1.,0,1);}`;
const FF=`#version 300 es
precision highp float;in vec2 u;out vec4 o;void main(){float d=smoothstep(.15,1.05,length((u-.5)*vec2(1.25,1.)*1.7));
o=vec4(mix(vec3(.976,.984,.984),vec3(.949,.953,.965),d),1.);}`;
function mkp(v,f){const p=gl.createProgram();[[gl.VERTEX_SHADER,v],[gl.FRAGMENT_SHADER,f]].forEach(([t,s])=>{const h=gl.createShader(t);gl.shaderSource(h,s);gl.compileShader(h);if(!gl.getShaderParameter(h,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(h));gl.attachShader(p,h)});gl.linkProgram(p);return p}
const P=mkp(VS,FS),FP=mkp(FV,FF),loc={};const L=n=>loc[n]??(loc[n]=gl.getUniformLocation(P,n));
const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),gl.STATIC_DRAW);
const an=gl.getExtension('EXT_texture_filter_anisotropic');
function mk(img){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);gl.generateMipmap(gl.TEXTURE_2D);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
if(an)gl.texParameterf(gl.TEXTURE_2D,an.TEXTURE_MAX_ANISOTROPY_EXT,16);return{t,w:img.width,h:img.height}}
// logo tile
const tc=document.createElement('canvas');tc.width=tc.height=128;{const g=tc.getContext('2d');const gr=g.createLinearGradient(12,12,116,116);gr.addColorStop(0,'#9eb7ff');gr.addColorStop(1,'#3767e4');g.fillStyle=gr;g.beginPath();g.roundRect(12,12,104,104,28);g.fill();g.fillStyle='#fff';g.font='700 66px Geist,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('М',64,68)}
// speed curve → page position
const spd=t=>t<.6?.5*sm(t/.6):t<1.25?.5:t<1.6?.5+.5*sm((t-1.25)/.35):t<7.3?1+.06*Math.sin(t*1.7):lp(1+.06*Math.sin(7.3*1.7),.12,sm(pr(t,7.3,8.3)));
const N=830,SA=[0];for(let i=1;i<=N;i++)SA[i]=SA[i-1]+spd(i/100-.005)*.01;
const flS=t=>{const f=Math.min(t,8.3)*100,i=Math.min(N-1,Math.floor(f));return SA[i]+(SA[i+1]-SA[i])*(f-i)};
const fTy=t=>190+940*flS(t)/SA[N],tAt=y=>{for(let i=0;i<=N;i++)if(190+940*SA[i]/SA[N]>=y)return i/100;return 8.3};
const dF=t=>1360+340*eo(pr(t,0,8.2));
function cam(t){
 if(t<7.75)return{ty:fTy(t),d:dF(t),th:56};
 const ty0=fTy(7.75),d0=dF(7.75);
 if(t<9.25){const u=t-7.75,m=u<.6?u*u/1.2:u<1.2?.3+u-.6:.9+(u-1.2)-(u-1.2)**2/.6,q=m/1.05;
  return{ty:lp(ty0,640,q),d:d0*Math.pow(2253/d0,q),th:56*(1-sm(pr(t,8.15,8.95)))}}
 if(t<9.47)return{ty:640,d:2253*(1-.035*pr(t,9.25,9.47)),th:0};
 if(t<9.97){const q=ei(pr(t,9.47,9.97)),ds=2253*.965,d=ds*Math.pow(1669/ds,q),st=576-640*F/ds,tp=q<.6?st*(1-ei(q/.6)):283*sm((q-.6)/.4);return{ty:(576-tp)*d/F,d,th:0}}
 const d=1669*(1-.02*pr(t,10.6,14.5));return{ty:293*d/F,d,th:0}}
function pst(p,t){let a,b;if(p.k=='hero'){a=.1;b=1.35}else{a=Math.max(.2,tAt(p.cy)-1.1);b=a+.9}
 const s=sm(pr(t,a,b))*(1-sm(pr(t,7.9,8.8)));return{h:p.H*s,ang:p.ang*s*Math.PI/180}}
function tile(i,t){
 if(i==4){const A=sm(pr(t,4.9,5.1))*(1-sm(pr(t,5.8,6)));return{cx:-60,cy:fTy(5.4)+300,h:380,s:170,A}}
 if(t>=9.4){const E=[[10,4,40,96],[894,4,40,96],[-20,560,420,380],[924,540,420,400]][i];const A=sm(pr(t,9.6,9.97));
  return{cx:E[0]+Math.sin(t*.8+i)*4,cy:E[1]+Math.cos(t*.7+i)*4,h:E[2],s:E[3],A}}
 const cor=[[-60,-30],[964,-30],[-130,130],[1034,140]][i],H0=[140,170,190,160][i],S1=[150,170,190,160][i],sx=400+i*44,Lf=sm(pr(t,.1,1.35));
 let x=lp(sx,cor[0],Lf),y=lp(352,cor[1],Lf);y=lp(y,fTy(t)+300+i*30,sm(pr(t,1.2,2.2)));y-=1400*pr(t,2.4,3.4)**2;
 return{cx:x,cy:y,h:lp(8,H0,Lf),s:lp(32,S1,Lf),A:t<3.4?1:0}}
let pg,tt,pt=[];
function setQ(o,mode,A,R,h,ang,off,sh){gl.bindTexture(gl.TEXTURE_2D,o.t);gl.uniform2f(L('TS'),o.w,o.h);gl.uniform1i(L('mode'),mode);gl.uniform1f(L('A'),A);
 gl.uniform4f(L('R'),...R);gl.uniform1f(L('hh'),h);gl.uniform1f(L('ang'),ang);gl.uniform2f(L('off'),off[0],off[1]);gl.uniform1f(L('shB'),sh||0);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}
function seek(t){
 t=cl(t,0,D);const k=cam(t),th=k.th*Math.PI/180,s=Math.sin(th),co=Math.cos(th);
 gl.viewport(0,0,W,H);gl.disable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 gl.useProgram(FP);gl.drawArrays(gl.TRIANGLES,0,3);
 gl.useProgram(P);const ql=gl.getAttribLocation(P,'q');gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.enableVertexAttribArray(ql);gl.vertexAttribPointer(ql,2,gl.FLOAT,false,0,0);
 gl.uniform3f(L('C'),452,k.ty+k.d*s,k.d*co);gl.uniform2f(L('sc'),s,co);gl.uniform1f(L('focus'),k.d);
 const dv=pr(t,9.47,9.97),mb=t<9.6?1280:lp(1280,370,sm(pr(t,9.6,9.97))),rad=lp(29,34,dv);gl.uniform2f(L('M'),mb,rad);
 setQ(pg,2,1,[452,640,1700,2600],0,0,[0,0]);setQ(pg,3,1,[452,640,PW,PH],0,0,[0,0]);
 const it=[];PIECES.forEach((p,i)=>{const z=pst(p,t);it.push({o:pt[i],cx:p.cx,cy:p.cy,w:p.w,h:p.h,z:z.h,a:z.ang,A:t<9.47?1:cl((mb-30-p.cy)/40)})});
 for(let i=0;i<5;i++){const e=tile(i,t),sz=e.s*1.23;it.push({o:tt,cx:e.cx,cy:e.cy,w:sz,h:sz,z:e.h,a:0,A:e.A})}
 it.forEach(e=>{if(e.z>1&&e.A>0)setQ(e.o,1,e.A,[e.cx,e.cy,e.w,e.h],0,0,[.1*e.z,4+.36*e.z],7+.5*e.z)});
 it.sort((a,b)=>a.z-b.z).forEach(e=>{if(e.A>0)setQ(e.o,0,e.A,[e.cx,e.cy,e.w,e.h],e.z,e.a,[0,0])});
 // end card text
 const bd=document.getElementById('badge');bd.style.opacity=pr(t,10.02,10.32);
 W1.forEach((w,i)=>wd(w,t,10.12+i*.06));W2.forEach((w,i)=>wd(w,t,10.36+i*.05));
}
function wd(w,t,s){const p=pr(t,s,s+.34);w.style.opacity=p;w.style.transform=`translateY(${(1-eo(p))*16}px)`;w.style.filter=`blur(${(1-eo(p))*12}px)`}
const mkw=(id,tx)=>tx.split(' ').map(x=>{const e=document.createElement('span');e.className='w';e.textContent=x;document.getElementById(id).appendChild(e);return e});
const W1=mkw('l1','От любопытства — к продуктам.'),W2=mkw('l2','Учусь, создавая.');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');let playing=!motionPreference.matches,t0=performance.now(),cur=motionPreference.matches?9.3:0,ready=false,externalPaused=false;
function setPlaying(value){playing=value;t0=performance.now()-cur*1000;}
function fit(){const s=Math.max(.05,Math.min((innerWidth-16)/W,(innerHeight-16)/H)),f=document.getElementById('fit');f.style.width=W*s+'px';f.style.height=H*s+'px';document.getElementById('st').style.transform=`scale(${s})`}
addEventListener('resize',fit);fit();
const ld=async s=>{const i=new Image();i.src=window.resumeFlyoverAssets[s]||s;await i.decode();return i};
(async()=>{pg=mk(await ld('images/flyover/layer-10.jpg'));tt=mk(tc);for(const p of PIECES)pt.push(mk(await ld(p.src)));
 await document.fonts.ready.catch(()=>{});
 
ready=true;seek(cur);t0=performance.now()-cur*1000;
if(parent!==window)document.documentElement.classList.add('embedded');
addEventListener('message',event=>{
 if(event.source!==parent || !event.data || event.data.type!=='resume-flyover')return;
 externalPaused=event.data.paused;
 if(externalPaused){setPlaying(false)}else if(!motionPreference.matches){setPlaying(true)}
});
if(parent!==window)parent.postMessage({type:'resume-flyover-ready'},'*');
document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlaying(false);else if(!externalPaused&&!motionPreference.matches)setPlaying(true)});
motionPreference.addEventListener('change',event=>{if(event.matches){setPlaying(false);cur=9.3;if(ready)seek(cur)}else if(!externalPaused)setPlaying(true)});
(function loop(n){if(playing&&!document.hidden&&!gl.isContextLost()){cur=((n-t0)/1000)%(D+.6);seek(Math.min(cur,D))}requestAnimationFrame(loop)})(performance.now());
})().catch(()=>{document.getElementById('fit').innerHTML='<img class="fallback-image" src="images/flyover/layer-10.jpg" alt="Резюме Махмуджона Махмудова">';const status=document.getElementById('scene-status');status.hidden=false;status.textContent='Статичный просмотр резюме';});
}else{
 document.getElementById('fit').innerHTML='<img class="fallback-image" src="images/flyover/layer-10.jpg" alt="Резюме Махмуджона Махмудова">';
 document.getElementById('fit').style.cssText='width:min(90vw,700px);height:auto;';
 const status=document.getElementById('scene-status');status.hidden=false;status.textContent='Статичный просмотр · 3D недоступно в этом браузере';
}

