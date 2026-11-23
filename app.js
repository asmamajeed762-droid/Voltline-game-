const {useState,useEffect,useRef}=React;
const html=htm.bind(React.createElement);
const FM=window.Motion||window.FramerMotion||{};
const _c={};
const motion=FM.motion||new Proxy({},{get:(_,t)=>_c[t]||(_c[t]=p=>{const {initial,animate,exit,transition,whileHover,whileTap,whileInView,viewport,variants,layout,...r}=p;return React.createElement(t,r)})});
const AnimatePresence=FM.AnimatePresence||(({children})=>children);
gsap.registerPlugin(ScrollTrigger);
let lenis=null;
const VID={hero:'assets/video/hero.mp4',lantern:'assets/video/lantern.mp4'};
const PAGES=['home','games','about','community','contact'];
const route=()=>{const h=location.hash.slice(1);return PAGES.includes(h)?h:'home'};

const GAMES=[
{id:'g1',img:'ninja',name:'Chrome Requiem',genre:'Action RPG',tag:'Open world',c1:'#19e3ff',c2:'#9b3dff',d:'Hunt rogue AIs through a megacity of 40 districts. Your implants are the weapon and the liability.',p:'PC · PS5 · Xbox',r:'Out now'},
{id:'g2',img:'squad',name:'Null Sector',genre:'Tactical Shooter',tag:'5v5 ranked',c1:'#ff2fa8',c2:'#9b3dff',d:'Breach, hack and extract in 90-second rounds. Every door can be rewritten mid-fight.',p:'PC · PS5',r:'Season 4'},
{id:'g3',img:'bike',name:'Ghostline Drift',genre:'Racing',tag:'Online',c1:'#19e3ff',c2:'#ff2fa8',d:'Illegal maglev racing across rain-slick megastructures at 600 km/h. No brakes, only lines.',p:'PC · Xbox',r:'Out now'},
{id:'g4',img:'roof',name:'Neon Syndicate',genre:'Strategy',tag:'Co-op',c1:'#9b3dff',c2:'#19e3ff',d:'Run a crime empire block by block. Bribe, blackmail and burn rivals out of the grid.',p:'PC',r:'Early access'},
{id:'g5',img:'hacker',name:'Ashfall Protocol',genre:'Survival Horror',tag:'Single player',c1:'#ff2fa8',c2:'#19e3ff',d:'A derelict arcology, a failing implant and something learning to speak with your voice.',p:'PC · PS5',r:'Mar 2027'},
{id:'g6',img:'arena',name:'Wireframe Arena',genre:'VR Combat',tag:'VR',c1:'#19e3ff',c2:'#7a6bff',d:'Full-body duels in a rendered colosseum. Your reflexes are the only loadout.',p:'PC VR · Quest',r:'Beta'}];

function Count({to,suf=''}){const r=useRef();useEffect(()=>{const o={v:0};const st=ScrollTrigger.create({trigger:r.current,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v:to,duration:2,ease:'power3.out',onUpdate:()=>{if(r.current)r.current.textContent=Math.round(o.v).toLocaleString()+suf}})});return()=>st.kill()},[]);return html`<span ref=${r}>0${suf}</span>`}

function City(){
const ref=useRef();
useEffect(()=>{const cv=ref.current,x=cv.getContext('2d');let W,H,raf,mx=0,tx=0,t=0;
const cols=['#19e3ff','#9b3dff','#ff2fa8','#ffd36b'];
let layers=[],rain=[];
const build=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;layers=[0,1,2].map(l=>{const bs=[];let px=-50;while(px<W+300){const w=40+Math.random()*(70+l*30),h=H*(.22+Math.random()*.4)*(1+l*.12);const wins=[];for(let wy=14;wy<h-10;wy+=12+l*2)for(let wx=6;wx<w-8;wx+=10+l*2)if(Math.random()<.22)wins.push([wx,wy,cols[(Math.random()*4)|0],Math.random()]);bs.push({x:px,w,h,wins,neon:Math.random()<.18?cols[(Math.random()*3)|0]:null});px+=w+Math.random()*10}return bs});rain=Array.from({length:Math.min(220,W/6)},()=>({x:Math.random()*W,y:Math.random()*H,s:8+Math.random()*10,l:10+Math.random()*16}))};
build();addEventListener('resize',build);
const mm=e=>{tx=(e.clientX/innerWidth-.5)};addEventListener('mousemove',mm);
const draw=()=>{t+=.016;mx+=(tx-mx)*.05;
x.clearRect(0,0,W,H);
const sg=x.createRadialGradient(W*.7,H*.55,10,W*.7,H*.55,H*.5);sg.addColorStop(0,'#ff2fa855');sg.addColorStop(1,'#0000');x.fillStyle=sg;x.fillRect(0,0,W,H);
[].forEach((L,i)=>{const sp=[.2,.6,1.3][i],off=mx*60*(i+1);const shade=['#0a0820','#0c0a2a','#07050f'][i];
L.forEach(b=>{const bx=b.x+off-((t*sp*3)%0);const by=H-b.h;x.fillStyle=shade;x.fillRect(bx,by,b.w,b.h);x.fillStyle='#ffffff08';x.fillRect(bx,by,2,b.h);
if(b.neon){x.fillStyle=b.neon;x.shadowColor=b.neon;x.shadowBlur=18;x.globalAlpha=.65+.35*Math.sin(t*3+b.x);x.fillRect(bx+b.w*.3,by-3,b.w*.4,3);x.fillRect(bx,by+20,2,b.h*.3);x.globalAlpha=1;x.shadowBlur=0}
const a=[.25,.55,.95][i];b.wins.forEach(w=>{x.globalAlpha=a*(.55+.45*Math.sin(t*(1+w[3]*2)+w[3]*20));x.fillStyle=w[2];x.fillRect(bx+w[0],by+w[1],4,5)});x.globalAlpha=1})});
// street haze
const hz=x.createLinearGradient(0,H*.75,0,H);hz.addColorStop(0,'#0000');hz.addColorStop(1,'#19e3ff30');x.fillStyle=hz;x.fillRect(0,H*.75,W,H*.25);
// flying cars
for(let k=0;k<4;k++){const cx=((t*(60+k*40)+k*400)%(W+200))-100,cy=H*(.25+k*.09);x.fillStyle=k%2?'#ff2fa8':'#19e3ff';x.shadowColor=x.fillStyle;x.shadowBlur=14;x.fillRect(cx,cy,18,2);x.shadowBlur=0}
// rain
x.strokeStyle='#8fd8ff44';x.lineWidth=1;x.beginPath();rain.forEach(r=>{r.y+=r.s;r.x-=1.5;if(r.y>H){r.y=-20;r.x=Math.random()*W}x.moveTo(r.x,r.y);x.lineTo(r.x+1.5,r.y-r.l)});x.stroke();
raf=requestAnimationFrame(draw)};
draw();return()=>{cancelAnimationFrame(raf);removeEventListener('resize',build);removeEventListener('mousemove',mm)}},[]);
return html`<canvas ref=${ref} className="absolute inset-0 w-full h-full" aria-hidden="true"></canvas>`}

function BgVideo({src,eager}){const [ok,setOk]=useState(false);const r=useRef();
const skip=!src||matchMedia('(prefers-reduced-motion:reduce)').matches||(navigator.connection&&navigator.connection.saveData);
useEffect(()=>{const v=r.current;if(!v||skip)return;v.muted=true;v.defaultMuted=true;
const go=()=>{v.play().catch(()=>{})};
const io=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!document.hidden)go();else v.pause()},{threshold:.1});io.observe(v);
const vis=()=>{if(document.hidden)v.pause();else if(v.getBoundingClientRect().bottom>0)go()};document.addEventListener('visibilitychange',vis);
return()=>{io.disconnect();document.removeEventListener('visibilitychange',vis)}},[src]);
if(skip)return null;
return html`<video ref=${r} src=${src} muted loop playsInline autoPlay=${!!eager} preload=${eager?'auto':'metadata'} aria-hidden="true" tabIndex="-1" disablePictureInPicture onPlaying=${()=>setOk(true)} onError=${()=>setOk(false)} className="absolute inset-0 w-full h-full object-cover pointer-events-none" style=${{opacity:ok?1:0,transition:'opacity 1.2s ease'}}></video>`}

function Tilt({children,className='',style}){const r=useRef();
const mv=e=>{const b=r.current.getBoundingClientRect(),px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;r.current.style.setProperty('--mx',(px+.5)*100+'%');r.current.style.setProperty('--my',(py+.5)*100+'%');r.current.style.transform=`perspective(900px) rotateY(${px*14}deg) rotateX(${-py*14}deg) translateZ(10px)`};
const lv=()=>{r.current.style.transform='perspective(900px) rotateY(0) rotateX(0)'};
return html`<div ref=${r} onMouseMove=${mv} onMouseLeave=${lv} className=${className} style=${{transition:'transform .25s ease-out',transformStyle:'preserve-3d',...style}}>${children}</div>`}

function GameCard({g,open}){return html`
<${Tilt} className="reveal card">
<button onClick=${()=>open(g)} className="panel relative block w-full text-left overflow-hidden group" style=${{minHeight:360}} aria-label=${'Open '+g.name}>
 <img src=${IMG[g.img]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/><div className="absolute inset-0" style=${{background:'linear-gradient(180deg,#05040b00 20%,#05040bf5 88%)'}}></div><div className="cover" style=${{mixBlendMode:'screen',opacity:.4,background:`radial-gradient(circle at 70% 20%,${g.c2}66,transparent 55%),linear-gradient(200deg,${g.c1}30,#07060e 70%)`}}>
 </div>
 <div className="scan absolute inset-0"></div>
 <div className="shine absolute inset-0 pointer-events-none"></div>
 <div className="relative p-6 flex flex-col justify-end h-full" style=${{minHeight:360}}>
  <div className="flex gap-2 mb-3 text-sm"><span className="px-2 py-0.5" style=${{background:g.c1+'22',color:g.c1,border:'1px solid '+g.c1+'66'}}>${g.genre}</span><span className="px-2 py-0.5 text-[#8d93b8] border border-[#2a2460]">${g.tag}</span></div>
  <h3 className="text-2xl font-extrabold mb-2" style=${{transform:'translateZ(40px)'}}>${g.name}</h3>
  <p className="text-[#8d93b8] leading-snug mb-4">${g.d}</p>
  <div className="flex justify-between text-sm"><span className="text-[#8d93b8]">${g.p}</span><span style=${{color:g.c1}}>${g.r}</span></div>
 </div>
</button><//>`}

function Modal({g,close}){if(!g)return null;
useEffect(()=>{const k=e=>e.key==='Escape'&&close();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
return html`<${motion.div} initial=${{opacity:0}} animate=${{opacity:1}} className="fixed inset-0 z-[80] flex items-center justify-center p-5" style=${{background:'#030208e6',backdropFilter:'blur(10px)'}} onClick=${close}>
<${motion.div} initial=${{scale:.9,y:40,rotateX:12}} animate=${{scale:1,y:0,rotateX:0}} transition=${{type:'spring',stiffness:140,damping:16}} className="panel relative max-w-xl w-full p-8 overflow-y-auto max-h-[90vh]" role="dialog" aria-modal="true" onClick=${e=>e.stopPropagation()}>
<div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style=${{background:`radial-gradient(${g.c1}66,transparent 70%)`}}></div>
<img src=${IMG[g.img]} alt=${g.name} className="w-full h-44 object-cover mb-5 border border-[#2a2460]"/><p style=${{color:g.c1}}>${g.genre} · ${g.p}</p>
<h2 className="text-4xl font-extrabold my-3 glow-text">${g.name}</h2>
<p className="text-[#c4c9ee] mb-6">${g.d} Squad up, customise your loadout and carry progress across every platform.</p>
<div className="grid grid-cols-3 gap-3 mb-7 text-center">${[['Players','2.4M'],['Rating','4.8'],['Status',g.r]].map(s=>html`<div key=${s[0]} className="border border-[#2a2460] py-3"><div className="disp text-lg" style=${{color:g.c1}}>${s[1]}</div><div className="text-sm text-[#8d93b8]">${s[0]}</div></div>`)}</div>
<div className="flex gap-3 flex-wrap"><a className="btn" href="#community" onClick=${close}>Join the squad</a><button className="btn ghost" onClick=${close}>Close</button></div>
<//><//>`}

function Hero(){const r=useRef();
useEffect(()=>{const tl=gsap.timeline({delay:window.__boot?2.4:.3});tl.from('.h-line',{yPercent:110,opacity:0,duration:1.1,stagger:.15,ease:'power4.out'}).from('.h-sub',{opacity:0,y:20,duration:.8},'-=.5').from('.h-cta',{opacity:0,y:20,duration:.7,stagger:.12},'-=.4');
gsap.to('.h-city',{yPercent:8,ease:'none',scrollTrigger:{trigger:r.current,start:'top top',end:'bottom top',scrub:true}});
gsap.to('.h-copy',{yPercent:-25,opacity:0,ease:'none',scrollTrigger:{trigger:r.current,start:'top top',end:'bottom 20%',scrub:true}});return()=>tl.kill()},[]);
return html`<section ref=${r} className="relative h-[100svh] min-h-[640px] overflow-hidden">
<div className="h-city absolute left-0 right-0 scan" style=${{top:'-12%',height:'124%'}}><img src=${IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover"/><${BgVideo} src=${VID.hero} eager=${true}/><${City}/></div>
<div className="absolute inset-0" style=${{background:'linear-gradient(90deg,#05040bcc 0%,#05040b55 55%,transparent 100%),linear-gradient(180deg,#05040b66 0%,transparent 30%,#05040b 100%)'}}></div>
<div className="h-copy relative z-10 h-full max-w-7xl mx-auto px-6 pt-16 flex flex-col justify-center">
 <div className="overflow-hidden"><h1 className="h-line text-[clamp(1.9rem,8vw,6rem)] font-extrabold leading-[1.02] glow-text"><span className="glitch" data-t="Play where">Play where</span></h1></div>
 <div className="overflow-hidden"><h1 className="h-line text-[clamp(1.9rem,8vw,6rem)] font-extrabold leading-[1.05]" style=${{background:'linear-gradient(90deg,#19e3ff,#9b3dff 60%,#ff2fa8)',WebkitBackgroundClip:'text',color:'transparent'}}>the grid ends.</h1></div>
 <p className="h-sub max-w-xl mt-7 text-xl text-[#b9bfe6]">Voltline builds dense, rain-soaked worlds with real stakes. Six games, one persistent identity, 2.4 million players on the wire.</p>
 <div className="flex gap-4 mt-9 flex-wrap"><a href="#games" className="h-cta btn">Explore games</a><a href="#community" className="h-cta btn ghost">Join the community</a></div>
</div>
<div className="absolute bottom-8 left-0 right-0 z-10 px-6"><div className="max-w-7xl mx-auto flex justify-between items-end text-[#b9bfe6]"><${Live}/><div className="hidden sm:flex flex-col items-center gap-2 text-sm"><span>Scroll</span><span className="block w-px h-12 animate-pulse" style=${{background:'linear-gradient(#19e3ff,transparent)'}}></span></div></div></div>
<div className="hidden lg:block absolute right-[12%] top-[34%] z-10" style=${{perspective:900}}><div className="cube"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
</section>`}

function Ticker(){const items=['CHROME REQUIEM 2.0 PATCH LIVE','NULL SECTOR SEASON 4','GHOSTLINE DRIFT WORLD CUP','ASHFALL PROTOCOL MAR 2027','WIREFRAME ARENA OPEN BETA'];const row=items.concat(items);
return html`<div className="border-y border-[#2a2460] bg-[#0a0818] overflow-hidden py-3"><div className="ticker disp text-xs tracking-widest text-[#8d93b8]">${row.concat(row).map((t,i)=>html`<span key=${i} className="mx-8 whitespace-nowrap"><span style=${{color:i%2?'#ff2fa8':'#19e3ff'}}>▍</span> ${t}</span>`)}</div></div>`}

function Heading({t,s}){return html`<div className="reveal mb-12 max-w-2xl"><h2 className="text-3xl sm:text-5xl font-extrabold glow-text" aria-label=${t}>${t.split(' ').map((w,i)=>html`<span key=${i} className="wd" aria-hidden="true" style=${{'--i':i}}>${w}</span>`)}</h2>${s&&html`<p className="text-[#8d93b8] mt-4 text-xl">${s}</p>`}</div>`}
const Wrap=({children,className=''})=>html`<section className=${'max-w-7xl mx-auto px-6 py-20 '+className}>${children}</section>`;

function Gallery(){const r=useRef();
useEffect(()=>{const ctx=gsap.context(()=>{gsap.utils.toArray('.g-img').forEach(im=>gsap.fromTo(im,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:im.parentNode,start:'top bottom',end:'bottom top',scrub:true}}))},r.current);return()=>ctx.revert()},[]);
const T=[['street','Neo district, 02:14 and still raining','sm:col-span-2 sm:row-span-2'],['mech','Aegis-01 on patrol',''],['car','Ghostline garage',''],['ship','Orbital breach, wave 6','sm:col-span-3']];
return html`<${Wrap}><${Heading} t="From the field" s="Concept art from our live worlds."/>
<div ref=${r} className="grid sm:grid-cols-3 gap-5 auto-rows-[240px] sm:auto-rows-[260px]">${T.map(t=>html`<div key=${t[0]} className=${'reveal panel relative overflow-hidden '+t[2]}><img className="g-img absolute left-0 w-full object-cover" style=${{top:'-8%',height:'116%'}} src=${IMG[t[0]]} alt=${t[1]} loading="lazy"/><div className="absolute inset-0" style=${{background:'linear-gradient(180deg,transparent 55%,#05040bee)'}}></div><p className="absolute left-5 bottom-4 disp text-sm">${t[1]}</p></div>`)}</div><//>`}

function Home({open}){return html`<div>
<${Hero}/><${Ticker}/>
<${Wrap}><${Heading} t="Featured worlds" s="Hover a card, then open it for the full briefing."/>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">${GAMES.slice(0,3).map(g=>html`<${GameCard} key=${g.id} g=${g} open=${open}/>`)}</div>
<div className="reveal mt-10"><a href="#games" className="btn ghost">See all six games</a></div><//>
<section className="border-y border-[#2a2460] grid-bg"><div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
${[[2400000,'','Active players'],[6,'','Live titles'],[190,'','Countries'],[98,'%','Server uptime']].map(s=>html`<div key=${s[2]} className="reveal min-w-0"><div className="disp text-2xl sm:text-4xl lg:text-5xl font-extrabold" style=${{color:'#19e3ff'}}><${Count} to=${s[0]} suf=${s[1]}/></div><div className="text-[#8d93b8] mt-1">${s[2]}</div></div>`)}</div></section>
<${Gallery}/><${News}/><${Wrap}><div className="panel reveal relative p-10 sm:p-16 overflow-hidden text-center">
<${BgVideo} src=${VID.lantern}/><div className="absolute inset-0" style=${{background:'#05040b99'}}></div><div className="absolute inset-0" style=${{background:'radial-gradient(circle at 50% 120%,#9b3dff55,transparent 60%)'}}></div>
<h2 className="relative text-3xl sm:text-5xl font-extrabold mb-5 glow-text">Your handle. Every game.</h2>
<p className="relative text-xl text-[#b9bfe6] max-w-xl mx-auto mb-8">One Voltline ID carries your rank, cosmetics and friends across all six titles.</p>
<a href="#contact" className="relative btn">Create your ID</a></div><//></div>`}

function Games({open}){const [f,setF]=useState('All');const gs=['All','Action RPG','Tactical Shooter','Racing','Strategy','Survival Horror','VR Combat'];const [q,setQ]=useState('');const list=GAMES.filter(g=>(f==='All'||g.genre===f)&&g.name.toLowerCase().includes(q.toLowerCase()));
useEffect(()=>{ScrollTrigger.refresh()},[f]);
return html`<div className="pt-28 sm:pt-36"><${Wrap} className="!pt-0"><${Heading} t="The catalogue" s="Six games built on one engine and one idea: the city never sleeps."/>
<div className="reveal flex flex-wrap gap-2 mb-10" role="tablist">${gs.map(x=>html`<button key=${x} onClick=${()=>setF(x)} role="tab" aria-selected=${f===x} className="px-4 py-2 text-sm border transition" style=${{borderColor:f===x?'#19e3ff':'#2a2460',color:f===x?'#19e3ff':'#8d93b8',background:f===x?'#19e3ff14':'transparent',boxShadow:f===x?'0 0 18px #19e3ff44':'none'}}>${x}</button>`)}</div>
<input value=${q} onChange=${e=>setQ(e.target.value)} placeholder="Search games" aria-label="Search games" className="mb-8 w-full sm:w-80 bg-[#0a0818] border border-[#2a2460] px-4 py-3 text-lg focus:border-[#19e3ff]"/>${list.length?'':html`<p className="text-[#8d93b8] text-xl">No games match. Try another genre or clear the search.</p>`}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">${list.map(g=>html`<${GameCard} key=${g.id+f} g=${g} open=${open}/>`)}</div><//></div>`}

function About(){const tl=[['2019','Three engineers leave AAA to build in a rented server room in Karachi.'],['2021','Chrome Requiem ships and finds an audience of 300,000 in a month.'],['2023','Null Sector launches ranked play with rewritable level geometry.'],['2025','The shared Voltline ID connects every title and passes 2 million players.'],['2027','Ashfall Protocol brings the studio into horror.']];
return html`<div className="pt-28 sm:pt-36"><${Wrap} className="!pt-0"><${Heading} t="We build cities you can get lost in" s="Voltline is 140 designers, engineers and sound artists. We make games with weight: cramped, loud, dangerous and worth the risk."/>
<div className="reveal panel relative h-64 sm:h-96 mb-16 overflow-hidden"><img src=${IMG.room} alt="The playtest room, where every build gets broken" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0" style=${{background:'linear-gradient(180deg,transparent 50%,#05040bf0)'}}></div><p className="absolute left-6 bottom-5 disp text-lg">The playtest room, where every build gets broken</p></div>
<div className="grid lg:grid-cols-3 gap-7 mb-24">${[['Handmade worlds','Every district is authored. We use procedural tools to extend a place, never to invent one.'],['Fair by design','No pay-to-win and no dark patterns. Cosmetics fund development and nothing else.'],['Built for the long haul','Our servers, anti-cheat and tools are written in-house so a game can live for ten years.']].map(c=>html`<div key=${c[0]} className="panel reveal p-8"><h3 className="text-xl font-extrabold mb-3" style=${{color:'#19e3ff'}}>${c[0]}</h3><p className="text-[#b9bfe6]">${c[1]}</p></div>`)}</div>
<${Heading} t="How we got here"/>
<div className="relative ml-3 pl-10 space-y-10 max-w-2xl"><span className="flow-line absolute left-0 top-0 bottom-0 w-px"></span>${tl.map(t=>html`<div key=${t[0]} className="reveal relative"><span className="dotp absolute -left-[49px] top-2 w-4 h-4 rounded-full" style=${{background:'#19e3ff',boxShadow:'0 0 16px #19e3ff'}}></span><div className="disp text-2xl" style=${{color:'#ff2fa8'}}>${t[0]}</div><p className="text-xl text-[#b9bfe6]">${t[1]}</p></div>`)}</div><//></div>`}

function Community(){const lb=[['N1GHTSHADE','Null Sector',9840],['kira.exe','Chrome Requiem',9120],['VANTA_7','Ghostline Drift',8765],['0xRIVET','Wireframe Arena',8410],['halcyon','Neon Syndicate',7990]];
const posts=[['Squad finder','Looking for two more for Null Sector ranked, Diamond and above, evenings UTC+5.','8m'],['Fan art','Rendered the Sector 9 skyline at 4 a.m. Full-res in the gallery.','41m'],['Patch notes','Chrome Requiem 2.0 fixes the implant overheat bug and adds district 41.','2h']];
return html`<div className="pt-28 sm:pt-36"><${Wrap} className="!pt-0"><${Heading} t="The wire" s="Squads, tournaments and the people who keep the servers loud."/>
<div className="reveal panel relative h-64 sm:h-96 mb-16 overflow-hidden"><img src=${IMG.arena} alt="Weekly cups, live from the arena" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0" style=${{background:'linear-gradient(180deg,transparent 50%,#05040bf0)'}}></div><p className="absolute left-6 bottom-5 disp text-lg">Weekly cups, live from the arena</p></div>
<div className="grid lg:grid-cols-5 gap-7"><div className="panel reveal lg:col-span-3 p-6 sm:p-8"><h3 className="text-xl font-extrabold mb-5 flex items-center gap-3" style=${{color:'#19e3ff'}}>Latest posts <span className="live-dot"></span></h3>${posts.map(p=>html`<article key=${p[0]} className="py-5 border-t border-[#2a2460] first:border-0"><div className="flex justify-between text-sm text-[#8d93b8]"><span style=${{color:'#ff2fa8'}}>${p[0]}</span><span>${p[2]} ago</span></div><p className="text-xl mt-1">${p[1]}</p></article>`)}</div>
<div className="panel reveal lg:col-span-2 p-6 sm:p-8"><h3 className="text-xl font-extrabold mb-5" style=${{color:'#19e3ff'}}>Weekly leaderboard</h3>${lb.map((p,i)=>html`<div key=${p[0]} className="flex items-center gap-4 py-3 border-t border-[#2a2460] first:border-0"><span className="disp w-7" style=${{color:i<3?'#ffd36b':'#8d93b8'}}>${i+1}</span><div className="flex-1"><div className="font-semibold">${p[0]}</div><div className="text-sm text-[#8d93b8]">${p[1]}</div><div className="h-[3px] mt-2 bg-[#1a1640]"><div className="lb-bar h-full" style=${{width:Math.round(p[2]/98.4)+'%'}}></div></div></div><span className="disp text-sm" style=${{color:'#19e3ff'}}>${p[2].toLocaleString()}</span></div>`)}</div></div>
<div className="reveal mt-10 grid sm:grid-cols-3 gap-5">${[['Discord','180k members'],['Weekly cups','Every Friday, 19:00 UTC'],['Creator program','Revenue share for streamers']].map(c=>html`<div key=${c[0]} className="border border-[#2a2460] p-6 hover:border-[#9b3dff] transition" style=${{boxShadow:'inset 0 0 40px #9b3dff10'}}><div className="disp text-lg mb-1">${c[0]}</div><div className="text-[#8d93b8]">${c[1]}</div></div>`)}</div><//></div>`}

function Contact(){const [sent,setSent]=useState(false);const [err,setErr]=useState('');
const sub=e=>{e.preventDefault();const d=new FormData(e.target);if(!/^\S+@\S+\.\S+$/.test(d.get('email')||'')){setErr('Enter a valid email address so we can reply.');return}setErr('');setSent(true)};
const fld='w-full bg-[#0a0818] border border-[#2a2460] px-4 py-3 text-lg focus:border-[#19e3ff] transition';
return html`<div className="pt-28 sm:pt-36"><${Wrap} className="!pt-0"><div className="grid lg:grid-cols-2 gap-14"><div><${Heading} t="Open a channel" s="Press, partnerships, support or a job on the team. We answer within two working days."/>
<div className="reveal space-y-4 text-xl">${[['Support','help@voltline.example'],['Press','press@voltline.example'],['Careers','jobs@voltline.example']].map(c=>html`<div key=${c[0]} className="flex gap-4"><span className="w-24 text-[#8d93b8]">${c[0]}</span><span style=${{color:'#19e3ff'}}>${c[1]}</span></div>`)}</div></div>
<div className="panel reveal p-7 sm:p-10"><${AnimatePresence} mode="wait">${sent?html`<${motion.div} key="ok" initial=${{opacity:0,scale:.9}} animate=${{opacity:1,scale:1}} className="text-center py-14"><div className="disp text-3xl glow-text mb-3">Message sent</div><p className="text-[#b9bfe6] text-xl mb-6">We’ll reply to your inbox within two working days.</p><button className="btn ghost" onClick=${()=>setSent(false)}>Send another</button><//>`:html`<form key="f" onSubmit=${sub} className="space-y-5" noValidate>
<label className="block"><span className="text-[#8d93b8]">Handle or name</span><input name="name" required className=${fld}/></label>
<label className="block"><span className="text-[#8d93b8]">Email</span><input name="email" type="email" className=${fld}/></label>
<label className="block"><span className="text-[#8d93b8]">Topic</span><select name="topic" className=${fld}><option>Support</option><option>Press</option><option>Partnership</option><option>Careers</option></select></label>
<label className="block"><span className="text-[#8d93b8]">Message</span><textarea name="msg" rows="4" className=${fld}></textarea></label>
${err&&html`<p role="alert" style=${{color:'#ff2fa8'}}>${err}</p>`}
<button className="btn" type="submit">Send message</button></form>`}<//></div></div><//><${Faq}/></div>`}

function Boot({done}){const r=useRef();
useEffect(()=>{const q=r.current,bar=q.querySelector('.bar'),pct=q.querySelector('.pct'),o={v:0};
const tl=gsap.timeline({onComplete:done});
tl.from(q.querySelectorAll('.bl'),{opacity:0,x:-12,stagger:.38,duration:.3},0)
.to(o,{v:100,duration:1.7,ease:'power2.inOut',onUpdate:()=>{bar.style.transform='scaleX('+o.v/100+')';pct.textContent=Math.round(o.v)+'%'}},0)
.to(q.querySelector('.bt'),{opacity:0,y:-12,duration:.3},'>.1')
.to(q,{clipPath:'inset(0 0 100% 0)',duration:.8,ease:'power4.inOut'});
const hard=setTimeout(done,4500);return()=>{clearTimeout(hard);tl.kill()}},[]);
const L=['linking to the voltline grid','streaming district 09','calibrating neural link','ready'];
return html`<div ref=${r} className="fixed inset-0 z-[300] flex items-center justify-center grid-bg" style=${{background:'#05040b',clipPath:'inset(0 0 0 0)'}} role="status" aria-label="Loading">
<div className="bt w-[min(320px,80vw)]"><div className="disp text-3xl font-extrabold mb-6 glow-text flex items-center gap-3"><span className="flick" style=${{color:'#19e3ff'}}>◢</span>VOLTLINE</div>
<ul className="mb-6 space-y-1 text-[#8d93b8]">${L.map(l=>html`<li key=${l} className="bl">${'> '+l}</li>`)}</ul>
<div className="h-[3px] bg-[#1a1640] overflow-hidden"><div className="bar h-full origin-left" style=${{background:'linear-gradient(90deg,#19e3ff,#ff2fa8)',transform:'scaleX(0)',boxShadow:'0 0 14px #19e3ff'}}></div></div>
<div className="pct disp text-xs mt-2 text-right" style=${{color:'#19e3ff'}}>0%</div></div></div>`}

function Cursor(){const r=useRef(),d=useRef();
useEffect(()=>{if(matchMedia('(hover:none)').matches)return;let x=-100,y=-100,cx=-100,cy=-100,raf;
const mv=e=>{x=e.clientX;y=e.clientY;d.current.style.transform='translate('+x+'px,'+y+'px)';const t=e.target.closest&&e.target.closest('a,button,input,select,textarea,[role=tab]');r.current.classList.toggle('hot',!!t)};
const tick=()=>{cx+=(x-cx)*.18;cy+=(y-cy)*.18;r.current.style.transform='translate('+cx+'px,'+cy+'px)';raf=requestAnimationFrame(tick)};
addEventListener('mousemove',mv);tick();return()=>{removeEventListener('mousemove',mv);cancelAnimationFrame(raf)}},[]);
return html`<${React.Fragment}><div ref=${r} className="cur" aria-hidden="true"></div><div ref=${d} className="cur-dot" aria-hidden="true"></div><//>`}

function Progress(){const r=useRef();
useEffect(()=>{const f=()=>{const h=document.documentElement.scrollHeight-innerHeight;r.current.style.transform='scaleX('+(h>0?scrollY/h:0)+')'};addEventListener('scroll',f,{passive:true});f();return()=>removeEventListener('scroll',f)},[]);
return html`<div ref=${r} className="fixed left-0 top-0 h-[2px] w-full z-[70] origin-left" style=${{background:'linear-gradient(90deg,#19e3ff,#9b3dff,#ff2fa8)',transform:'scaleX(0)',boxShadow:'0 0 12px #19e3ff'}}></div>`}

function Live(){const [n,setN]=useState(2418902);
useEffect(()=>{const i=setInterval(()=>setN(v=>v+Math.round((Math.random()-.4)*40)),1400);return()=>clearInterval(i)},[]);
return html`<div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full" style=${{background:'#3dff9b',boxShadow:'0 0 10px #3dff9b'}}></span>${n.toLocaleString()} players online</div>`}

class EB extends React.Component{constructor(p){super(p);this.state={e:0}}static getDerivedStateFromError(){return{e:1}}
render(){return this.state.e?html`<div style=${{padding:'30vh 24px',textAlign:'center'}}><h2 className="disp text-2xl mb-4">Signal lost</h2><p className="mb-6">Something broke on our side. Reload to reconnect.</p><button className="btn" onClick=${()=>location.reload()}>Reload</button></div>`:this.props.children}}

const SFX=(()=>{let ctx,on=false;const beep=(f,d,t,v)=>{if(!on)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const n=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type=t;o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(f*1.6,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(ctx.destination);o.start();o.stop(n+d)}catch(e){}};
return{set:v=>{on=v;if(v)beep(520,.12,'square',.04)},hover:()=>beep(900,.05,'sine',.025),click:()=>beep(300,.14,'sawtooth',.05)}})();

function Dock(){const [s,setS]=useState(false),[t,setT]=useState(false);
useEffect(()=>{const f=()=>setT(scrollY>600);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
const b='w-11 h-11 flex items-center justify-center border border-[#2a2460] bg-[#0a0818e6] text-[#19e3ff] transition hover:border-[#19e3ff]';
return html`<div className="fixed z-[60] flex flex-col gap-3" style=${{right:16,bottom:'calc(16px + env(safe-area-inset-bottom,0px))'}}>
${t&&html`<button className=${b} aria-label="Back to top" onClick=${()=>lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:'smooth'})}>↑</button>`}
<button className=${b} aria-label=${s?'Turn interface sounds off':'Turn interface sounds on'} aria-pressed=${s} onClick=${()=>{const v=!s;setS(v);SFX.set(v)}} style=${{boxShadow:s?'0 0 16px #19e3ff66':'none'}}><span className="disp text-[10px]">${s?'SFX':'MUTE'}</span></button></div>`}

function Matrix({close}){const r=useRef();
useEffect(()=>{const c=r.current,x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const n=Math.floor(c.width/18),y=Array.from({length:n},()=>Math.random()*-50),ch='01アイウエオカキクケコ';let raf;
const d=()=>{x.fillStyle='rgba(5,4,11,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#19e3ff';x.font='16px monospace';y.forEach((v,i)=>{x.fillText(ch[(Math.random()*ch.length)|0],i*18,v*18);if(v*18>c.height&&Math.random()>.975)y[i]=0;y[i]++});raf=requestAnimationFrame(d)};d();
const t=setTimeout(close,7000);return()=>{cancelAnimationFrame(raf);clearTimeout(t)}},[]);
return html`<div className="fixed inset-0 z-[260]" onClick=${close}><canvas ref=${r} className="absolute inset-0"></canvas><div className="absolute inset-0 flex items-center justify-center text-center px-6"><div><div className="disp text-3xl sm:text-5xl glow-text mb-3">Cheat code accepted</div><p className="text-xl text-[#b9bfe6]">+30 lives. Tap anywhere to exit.</p></div></div></div>`}

function News(){const N=[['Patch','Chrome Requiem 2.0','Nov 18','District 41 opens, implant overheating is fixed and the skill tree is rebalanced.','#19e3ff'],['Season','Null Sector: Season 4','Nov 4','A new map, Substation 6, and a ranked reset with fresh rewards.','#ff2fa8'],['Event','Ghostline World Cup','Oct 28','Qualifiers are open. Sixty-four racers, one night, no brakes.','#9b3dff']];
return html`<${Wrap} className="!pt-0"><${Heading} t="Latest from the studio"/><div className="grid md:grid-cols-3 gap-6">${N.map(n=>html`<article key=${n[1]} className="reveal panel p-7 group"><div className="flex justify-between text-sm mb-4"><span style=${{color:n[4]}}>${n[0]}</span><span className="text-[#8d93b8]">${n[2]}</span></div><h3 className="text-xl font-extrabold mb-3">${n[1]}</h3><p className="text-[#b9bfe6] mb-5">${n[3]}</p><a href="#community" className="inline-block relative" style=${{color:n[4]}}>Read more<span className="absolute left-0 -bottom-1 h-px w-0 group-hover:w-full transition-all duration-500" style=${{background:n[4],boxShadow:'0 0 8px '+n[4]}}></span></a></article>`)}</div><//>`}

function Faq(){const [o,setO]=useState(0);const Q=[['Which platforms do you support?','PC, PS5 and Xbox. Wireframe Arena also supports PC VR and Quest.'],['Is my progress shared across games?','Yes. Your Voltline ID carries rank, cosmetics and friends across every title.'],['Do you sell loot boxes or pay-to-win items?','No. Cosmetics are the only paid items and they never change gameplay.'],['How do I report a cheater?','Use the in-game report button, or send the match ID to help@voltline.example.']];
return html`<${Wrap} className="!pt-0"><${Heading} t="Quick answers"/><div className="max-w-3xl space-y-3">${Q.map((q,i)=>html`<div key=${i} className="reveal panel"><button className="w-full text-left p-5 flex justify-between gap-4 items-center" aria-expanded=${o===i} onClick=${()=>setO(o===i?-1:i)}><span className="text-xl font-semibold">${q[0]}</span><span className="disp text-xl" style=${{color:'#19e3ff',transform:o===i?'rotate(45deg)':'none',transition:'transform .3s'}}>+</span></button><div style=${{display:'grid',gridTemplateRows:o===i?'1fr':'0fr',transition:'grid-template-rows .4s ease'}}><div className="overflow-hidden"><p className="px-5 pb-5 text-[#b9bfe6]">${q[1]}</p></div></div></div>`)}</div><//>`}

function Signup(){const [ok,setOk]=useState(false),[er,setEr]=useState('');
const go=ev=>{ev.preventDefault();const v=ev.target.elements.em.value;if(!/^\S+@\S+\.\S+$/.test(v)){setEr('Enter a valid email address.');return}setEr('');setOk(true)};
return html`<section className="border-t border-[#2a2460]" style=${{background:'linear-gradient(180deg,#0a0818,#05040b)'}}><div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center"><div><h3 className="disp text-2xl font-extrabold mb-2">Get early access</h3><p className="text-[#b9bfe6] text-xl">Beta keys and patch notes, once a month.</p></div>${ok?html`<p className="text-xl" style=${{color:'#3dff9b'}}>You’re on the list. Watch your inbox.</p>`:html`<div><form onSubmit=${go} noValidate className="flex flex-col sm:flex-row gap-3"><input name="em" type="email" aria-label="Email address" placeholder="you@email.com" className="flex-1 min-w-0 bg-[#0a0818] border border-[#2a2460] px-4 py-3 text-lg focus:border-[#19e3ff]"/><button className="btn" type="submit">Join the list</button></form>${er&&html`<p role="alert" className="mt-3" style=${{color:'#ff2fa8'}}>${er}</p>`}</div>`}</div></section>`}

function Nav({cur}){const [o,setO]=useState(false);const [sc,setSc]=useState(false);
useEffect(()=>{const f=()=>setSc(scrollY>40);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
useEffect(()=>setO(false),[cur]);
return html`<header className="fixed left-0 right-0 z-50" style=${{top:0,paddingTop:'env(safe-area-inset-top,0px)',background:sc||o?'#05040bee':'transparent',backdropFilter:sc||o?'blur(12px)':'none',borderBottom:sc?'1px solid #2a2460':'1px solid transparent',transition:'all .3s'}}>
<div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
<a href="#home" className="disp text-xl font-extrabold flex items-center gap-2"><span className="flick" style=${{color:'#19e3ff',textShadow:'0 0 14px #19e3ff'}}>◢</span>VOLTLINE</a>
<nav className="hidden md:flex gap-9" aria-label="Main">${PAGES.map(p=>html`<a key=${p} href=${'#'+p} className="relative capitalize py-1 transition" style=${{color:cur===p?'#19e3ff':'#b9bfe6'}}>${p}${cur===p&&html`<span className="absolute left-0 right-0 -bottom-1 h-px" style=${{background:'#19e3ff',boxShadow:'0 0 10px #19e3ff'}}></span>`}</a>`)}</nav>
<a href="#contact" className="btn hidden md:inline-block !py-2.5">Play now</a>
<button className="md:hidden p-2" onClick=${()=>setO(!o)} aria-label="Menu" aria-expanded=${o}><div className="w-7 space-y-1.5">${[0,1,2].map(i=>html`<div key=${i} className="h-0.5 bg-[#19e3ff] transition" style=${{transform:o?(i==0?'translateY(8px) rotate(45deg)':i==2?'translateY(-8px) rotate(-45deg)':'scaleX(0)'):'none'}}></div>`)}</div></button></div>
${o&&html`<${motion.nav} initial=${{opacity:0,y:-10}} animate=${{opacity:1,y:0}} className="md:hidden px-6 pb-6 flex flex-col gap-4 text-2xl disp">${PAGES.map(p=>html`<a key=${p} href=${'#'+p} className="capitalize" style=${{color:cur===p?'#19e3ff':'#e8ecff'}}>${p}</a>`)}<//>`}</header>`}

function Footer(){return html`<footer className="border-t border-[#2a2460] mt-10"><div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row gap-6 justify-between text-[#8d93b8]"><div><div className="disp text-xl text-[#e8ecff] mb-2">VOLTLINE</div><p>Games from the neon underbelly.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2">${PAGES.map(p=>html`<a key=${p} href=${'#'+p} className="capitalize hover:text-[#19e3ff] transition">${p}</a>`)}</div><p>© 2026 Voltline Studios</p></div></footer>`}

function App(){const [cur,setCur]=useState(route());const [g,setG]=useState(null);const ref=useRef();
const [boot,setBoot]=useState(()=>{let b=true;try{b=!sessionStorage.getItem('vl');sessionStorage.setItem('vl','1')}catch(e){}window.__boot=b;return b});
const wipe=useRef(),first=useRef(true);const [mat,setMat]=useState(false);
useEffect(()=>{const seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let pos=0,last=null;
const kd=e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;pos=k===seq[pos]?pos+1:(k===seq[0]?1:0);if(pos===seq.length){pos=0;setMat(true)}};
const ov=e=>{const t=e.target.closest&&e.target.closest('a,button');if(t&&t!==last){last=t;SFX.hover()}else if(!t)last=null};
const ck=e=>{if(e.target.closest&&e.target.closest('a,button'))SFX.click()};
const hv=matchMedia('(hover:hover)').matches;
const mm=e=>{const b=e.target.closest&&e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.25+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)'};
const ml=e=>{const b=e.target.closest&&e.target.closest('.btn');if(b&&!b.contains(e.relatedTarget))b.style.transform=''};
addEventListener('keydown',kd);document.addEventListener('mouseover',ov);document.addEventListener('click',ck);
if(hv){document.addEventListener('mousemove',mm);document.addEventListener('mouseout',ml)}
return()=>{removeEventListener('keydown',kd);document.removeEventListener('mouseover',ov);document.removeEventListener('click',ck);document.removeEventListener('mousemove',mm);document.removeEventListener('mouseout',ml)}},[]);
useEffect(()=>{if(first.current){first.current=false;return}const w=wipe.current;gsap.timeline().set(w,{clipPath:'inset(0 100% 0 0)'}).to(w,{clipPath:'inset(0 0% 0 0)',duration:.35,ease:'power3.in'}).to(w,{clipPath:'inset(0 0 0 100%)',duration:.5,ease:'power3.out',delay:.15})},[cur]);
useEffect(()=>{const f=()=>setCur(route());addEventListener('hashchange',f);
try{if(window.Lenis&&!matchMedia('(prefers-reduced-motion:reduce)').matches){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}}catch(e){}
return()=>removeEventListener('hashchange',f)},[]);
useEffect(()=>{if(lenis)lenis.scrollTo(0,{immediate:true});else scrollTo(0,0);
let io,mo;const mark=el=>{io&&io.unobserve(el);el.classList.add('in');gsap.to(el,{opacity:1,y:0,filter:'blur(0px)',duration:.9,ease:'power3.out',clearProps:'filter'})};
const setup=()=>{gsap.utils.toArray('.reveal:not([data-r])').forEach(el=>{el.setAttribute('data-r','1');gsap.set(el,{opacity:0,y:40,filter:'blur(5px)'});io.observe(el)})};
const id=setTimeout(()=>{ScrollTrigger.refresh();
io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)mark(e.target)}),{rootMargin:'0px 0px -6% 0px',threshold:.05});
setup();mo=new MutationObserver(setup);mo.observe(document.getElementById('root'),{childList:true,subtree:true})},80);
const safe=setInterval(()=>{gsap.utils.toArray('.reveal[data-r]:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)mark(el)})},1200);
return()=>{clearTimeout(id);clearInterval(safe);io&&io.disconnect();mo&&mo.disconnect()}},[cur]);
const Page={home:Home,games:Games,about:About,community:Community,contact:Contact}[cur];
return html`<div>
<${Progress}/><${Cursor}/><${Dock}/>${mat&&html`<${Matrix} close=${()=>setMat(false)}/>`}<div ref=${wipe} className="fixed inset-0 z-[90] pointer-events-none" style=${{background:'linear-gradient(100deg,#19e3ff,#9b3dff 55%,#ff2fa8)',clipPath:'inset(0 100% 0 0)'}}></div>${boot&&html`<${Boot} done=${()=>{window.__boot=false;setBoot(false)}}/>`}<${Nav} cur=${cur}/>
<${AnimatePresence} mode="wait"><${motion.main} key=${cur} initial=${{opacity:0,filter:'blur(14px)',scale:.985}} animate=${{opacity:1,filter:'blur(0px)',scale:1}} exit=${{opacity:0,filter:'blur(14px)'}} transition=${{duration:.5}} className="min-h-screen"><${Page} open=${setG}/><//><//>
<${Signup}/><${Footer}/>
<${AnimatePresence}>${g&&html`<${Modal} key="m" g=${g} close=${()=>setG(null)}/>`}<//>
</div>`}
ReactDOM.createRoot(document.getElementById('root')).render(html`<${EB}><${App}/><//>`);
