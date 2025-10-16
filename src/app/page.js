"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Starfield(){
  const c=useRef(null);
  useEffect(()=>{
    const el=c.current; if(!el) return;
    const ctx=el.getContext("2d",{alpha:!1});
    let w=el.width=window.innerWidth, h=el.height=window.innerHeight;
    const dpr=Math.min(2,window.devicePixelRatio||1);
    el.width=w*dpr; el.height=h*dpr; ctx.scale(dpr,dpr);
    const N=Math.min(240,Math.floor(w*h/11000));
    const stars=Array.from({length:N},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:.7+Math.random()*1.3,a:.5+.5*Math.random()}));
    let raf; const loop=()=>{ctx.fillStyle="#0b0f1a";ctx.fillRect(0,0,w,h);for(const s of stars){s.x+=s.vx;s.y+=s.vy;if(s.x<-2)s.x=w+2;if(s.x>w+2)s.x=-2;if(s.y<-2)s.y=h+2;if(s.y>h+2)s.y=-2;ctx.beginPath();ctx.fillStyle=`rgba(124,249,255,${s.a})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
    const onR=()=>{w=window.innerWidth;h=window.innerHeight;el.width=w*dpr;el.height=h*dpr;ctx.scale(dpr,dpr)};window.addEventListener("resize",onR);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onR)}
  },[]);
  return <canvas ref={c} className="fixed inset-0 -z-10"/>;
}

const RAW_EXPERIENCE=[
  { id:"dressaire", company:"Dressaire Lab", role:"Fluid Dynamics Researcher", period:"Oct 2025 – Present", start:"2025-10-01", location:"UCSB · Hybrid", bullets:[
    "Studying effects/applications of capillary bridges in soft gels",
    "Built an instrumented fixture to quantify wetting and capillary adhesion"]},
  { id:"sanisure", company:"SaniSure — R&D", role:"Design + R&D Intern", period:"Jul 2025 – Present", start:"2025-07-01", location:"Camarillo, CA · On-site", bullets:[
    "KPI dashboards for throughput; defect taxonomy; redesign recommendations"]},
  { id:"audi", company:"AUDI AG — Technical Development", role:"Requirements Engineering Intern", period:"Jan 2024 – Jun 2024", start:"2024-01-01", location:"Ingolstadt, Germany · On-site", bullets:[
    "Power BI KPI pipeline for Systems Requirements; early-stage vehicle specs"]},
  { id:"ucd-research", company:"UC Davis — College of Engineering", role:"Research Assistant", period:"Jan 2023 – Jun 2023", start:"2023-01-01", location:"Davis, CA · On-site", bullets:[
    "C simulations for projectile motion; parameter sweeps and validation"]},
  { id:"ucd-tutor", company:"UC Davis", role:"Calculus Tutor", period:"Sep 2022 – Jun 2023", start:"2022-09-01", location:"Davis, CA · On-site", bullets:[
    "1-on-1 & group sessions (up to 10 students), 5–10 hrs/week"]},
  { id:"fruitfully", company:"Fruitfully Yours", role:"Vice President", period:"Jun 2018 – Jun 2021", start:"2018-06-01", location:"Glendora, CA · On-site", bullets:[
    "Co-founded nonprofit; 80k+ lbs fruit, 70k+ people helped"]},
];

function Porthole({item,selected,onSelect}){
  return (
    <div className="relative flex flex-col items-center w-[168px] md:w-[200px]">
      <div
        className="relative size-[168px] md:size-[200px] rounded-full overflow-hidden ring-2 ring-white/30
                   bg-[radial-gradient(120%_120%_at_30%_20%,rgba(255,255,255,.25),rgba(20,30,45,.75)_60%,rgba(0,0,0,.9))]
                   flex items-center justify-center text-center px-3">
        <div>
          <div className="text-[12px] md:text-sm font-semibold leading-tight">{item.role}</div>
          <div className="text-[11px] md:text-xs opacity-90 mt-0.5">{item.location}</div>
          <div className="mt-1 text-[10px] md:text-[11px] opacity-80">{item.period}</div>
        </div>
      </div>

      <button
        onClick={()=>onSelect(selected?null:item.id)}
        aria-pressed={selected}
        className="mt-3 relative h-5 w-5 rounded-full ring-2 ring-white/35 bg-white/10 hover:ring-white/60 focus:outline-none focus:ring-white/80"
      >
        <motion.span
          className="absolute inset-[3px] rounded-full bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff]"
          animate={{scale:selected?1:0, opacity:selected?1:0}}
          transition={{type:"spring", stiffness:500, damping:30}}
        />
        <span className="sr-only">{selected?"Deselect":"Select"} {item.role}</span>
      </button>

      <div className="mt-2 text-xs opacity-85">{item.company}</div>
    </div>
  );
}

function Row({items,selected,onSelect}){
  return (
    <div className="flex items-center gap-4 md:gap-6 w-full">
      {items.map((it,i)=>(
        <div key={it.id} className="flex items-center gap-4 md:gap-6 flex-1">
          <Porthole item={it} selected={selected===it.id} onSelect={onSelect}/>
          {i!==items.length-1 && <div className="h-[2px] md:h-[3px] flex-1 rounded-full bg-[linear-gradient(90deg,rgba(124,249,255,.0),rgba(124,249,255,.7),rgba(124,249,255,.0))]"/>}
        </div>
      ))}
    </div>
  );
}

export default function Page(){
  const NAME="Antonius (Toni) Chevillotte";
  const [alias,setAlias]=useState(NAME), [clicks,setClicks]=useState(0); const tRef=useRef(null);
  const onName=()=>{ if(tRef.current) clearTimeout(tRef.current); setClicks(c=>{const n=c+1; if(n>=3){setAlias(a=>a==="67"?NAME:"67"); return 0;} tRef.current=setTimeout(()=>setClicks(0),800); return n;}); };

  const exp = useMemo(()=>{
    const withTs = RAW_EXPERIENCE.map(e=>({...e, ts:new Date(e.start).getTime()}));
    const desc   = [...withTs].sort((a,b)=>b.ts-a.ts); // newest → oldest
    return { top:desc.slice(0,3), bottom:desc.slice(3,6) };
  },[]);

  const [tab,setTab]=useState("experience");
  const [selected,setSelected]=useState(null);
  const details = RAW_EXPERIENCE.find(e=>e.id===selected);

  const projects=[
    {t:"FSAE Steering Reliability (URCA)",h:"Reliability-first steering study for EV racecar; improved robustness & serviceability.",m:["UCSB Formula SAE","Spring 2025"]},
    {t:"Design-to-Failure + Redesign",h:"Structured teardown testing & defect taxonomy to inform R&D decisions.",m:["SaniSure","2025"]},
    {t:"Requirements KPIs & Dashboards",h:"Power BI metrics pipeline increasing visibility & accountability.",m:["AUDI AG","2024"]},
  ];
  const extras=[
    {o:"UCSB Formula SAE",d:"EV racecar design & build; steering focus."},
    {o:"Elementary School STEAM Volunteer",d:"Hands-on engineering with 6th graders."},
    {o:"NASA Volunteer at UC Davis",d:"Generator teardown and efficiency comparisons."},
  ];

  return (
    <>
      <Starfield/>
      <main className="relative min-h-screen text-white">
        <header className="sticky top-0 z-40 backdrop-blur border-b border-white/20 bg-black/30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={onName} className="font-semibold tracking-tight bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent">{alias}</button>
            <nav>
              <ul className="flex gap-2 text-sm rounded-xl p-1 ring-1 ring-white/20 bg-white/10">
                {["experience","projects","extracurriculars"].map(id=>(
                  <li key={id}>
                    <button onClick={()=>setTab(id)} className={`relative rounded-lg px-3 py-1.5 ${tab===id?"text-[#0b0f1a]":"text-white/90 hover:text-white"}`}>
                      {tab===id && <motion.span layoutId="pill" className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff]" />}
                      <span className="relative">{id[0].toUpperCase()+id.slice(1)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-4 pt-12 pb-6">
          <h1 onClick={onName} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent cursor-pointer select-none">
            {alias}
          </h1>
          <p className="mt-3 text-white/95 max-w-2xl">Honors BS/MS @ UCSB • R&D Intern @ SaniSure • Research @ Dressaire Lab</p>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-6">
          {tab==="experience" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Experience</h2>
              <div className="space-y-8">
                <Row items={exp.top}    selected={selected} onSelect={setSelected}/>
                <Row items={exp.bottom} selected={selected} onSelect={setSelected}/>
              </div>

              <AnimatePresence>
                {details && (
                  <motion.div
                    key={details.id}
                    initial={{opacity:0,y:10}}
                    animate={{opacity:1,y:0}}
                    exit={{opacity:0,y:-10}}
                    transition={{duration:.25}}
                    className="mt-10 border border-white/20 rounded-2xl p-6 bg-white/10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{details.role} • {details.company}</div>
                        <div className="text-sm opacity-90">{details.period} • {details.location}</div>
                      </div>
                      <button onClick={()=>setSelected(null)} className="text-sm px-3 py-1.5 rounded-lg ring-1 ring-white/25 bg-white/10 hover:bg-white/15">
                        Close
                      </button>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-100 list-disc ps-5">
                      {details.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {tab==="projects" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Projects</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {projects.map((p,i)=>(
                  <div key={i} className="border border-white/20 rounded-2xl p-5 bg-white/10">
                    <h3 className="font-semibold">{p.t}</h3>
                    <p className="mt-2 text-sm text-neutral-100">{p.h}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {p.m.map((m,k)=><span key={k} className="rounded-full px-2 py-1 bg-white/15 ring-1 ring-white/25">{m}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab==="extracurriculars" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Extracurricular activities</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {extras.map((x,i)=>(
                  <div key={i} className="border border-white/20 rounded-2xl p-5 bg-white/10">
                    <h3 className="font-semibold">{x.o}</h3>
                    <p className="mt-2 text-sm text-neutral-100">{x.d}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <style jsx global>{`
        :root { color-scheme: dark; }
        body { background:#0b0f1a; }
      `}</style>
    </>
  );
}
