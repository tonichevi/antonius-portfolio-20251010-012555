"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CursorTrail(){const r=useRef(null);useEffect(()=>{const e=r.current;if(!e||!window.matchMedia("(pointer:fine)").matches)return;const t=Array.from({length:12},()=>{const n=document.createElement("span");return e.appendChild(n),{el:n,x:0,y:0}});let o=0,a=0;const i=n=>{o=n.clientX,a=n.clientY};window.addEventListener("mousemove",i);let s=0;const l=()=>{let n=o,c=a;t.forEach((d,u)=>{d.x+=(n-d.x)*.18,d.y+=(c-d.y)*.18,d.el.style.transform=`translate(${d.x-4.5}px, ${d.y-4.5}px) scale(${1-.07*u})`,d.el.style.opacity=String(1-.08*u),n=d.x,c=d.y}),s=requestAnimationFrame(l)};return s=requestAnimationFrame(l),()=>{cancelAnimationFrame(s),window.removeEventListener("mousemove",i),e.innerHTML=""}},[]);return <div className="trail" ref={r}/>}
function Magnetic({strength=18,children}){const r=useRef(null);useEffect(()=>{const e=r.current;if(!e)return;const t=n=>{const c=e.getBoundingClientRect(),d=n.clientX-(c.left+c.width/2),u=n.clientY-(c.top+c.height/2);e.style.transform=`translate(${d/c.width*strength}px, ${u/c.height*strength}px)`},o=()=>{e.style.transform="translate(0,0)"};e.parentElement.addEventListener("mousemove",t),e.parentElement.addEventListener("mouseleave",o);return()=>{e.parentElement.removeEventListener("mousemove",t),e.parentElement.removeEventListener("mouseleave",o)}},[strength]);return <span style={{display:"inline-block"}}><span ref={r} style={{display:"inline-block",transition:"transform .12s ease-out"}}>{children}</span></span>}
function Starfield(){const r=useRef(null);useEffect(()=>{const e=r.current;if(!e)return;const t=e.getContext("2d",{alpha:!1});let o=e.width=window.innerWidth,a=e.height=window.innerHeight;const i=Math.min(window.devicePixelRatio||1,2);e.width=o*i,e.height=a*i,t.scale(i,i);const s=Math.min(260,Math.floor(o*a/11000));const l=Array.from({length:s},()=>({x:Math.random()*o,y:Math.random()*a,z:Math.random()*.9+.2,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,hue:190+140*Math.random(),tw:.005+.02*Math.random(),t:Math.random()*Math.PI*2}));let n=0,c=performance.now();const d=u=>{const p=Math.min(32,u-c);c=u,t.fillStyle="rgba(11,15,26,1)",t.fillRect(0,0,o,a);for(const f of l){f.x+=f.vx*p*(.35+f.z),f.y+=f.vy*p*(.35+f.z),f.x<-6&&(f.x=o+6),f.x>o+6&&(f.x=-6),f.y<-6&&(f.y=a+6),f.y>a+6&&(f.y=-6),f.t+=f.tw*p*.06;const g=.7*(.6+.4*Math.sin(f.t));t.beginPath(),t.fillStyle=`hsla(${f.hue}, 90%, 70%, ${g})`,t.arc(f.x,f.y,.9+1.2*f.z,0,Math.PI*2),t.fill()}n=requestAnimationFrame(d)};n=requestAnimationFrame(d);const u=()=>{o=window.innerWidth,a=window.innerHeight,e.width=o*i,e.height=a*i,t.scale(i,i)};return window.addEventListener("resize",u),()=>{cancelAnimationFrame(n),window.removeEventListener("resize",u)}},[]);return <canvas className="starfield" ref={r}/>}

function Marquee({items}){return(<div className="marquee rounded-full ring-1 ring-white/20 bg-white/10"><div className="marquee__inner">{[...items,...items].map((it,i)=>(<span key={i} className="text-xs md:text-sm px-4">{it}</span>))}</div></div>)}

export default function Portfolio(){
  const NAME="Antonius (Toni) Chevillotte";
  const EMAIL="achevillotte@ucsb.edu";
  const LOCATION="Los Angeles, CA";
  const LINKEDIN="https://www.linkedin.com/in/antoniuschevillotte/";
  const HEADLINE="Honors BS/MS @ UCSB | R&D Intern @ SaniSure | Research @ Dressaire Lab";

  const tabs=[{id:"experience",label:"Experience"},{id:"projects",label:"Projects"},{id:"extracurriculars",label:"Extracurriculars"},{id:"bio",label:"Biography"}];

  const experience=[
    { company:"Dressaire Lab", role:"Fluid Dynamics Researcher", period:"Oct 2025 – Present", location:"UCSB · Hybrid", bullets:[
      "Studying effects/applications of capillary bridges in soft gels",
      "Designing and building an instrumented fixture to quantify wetting (contact angle, hysteresis) and capillary adhesion (pull-off force, force–separation curves)"
    ]},
    { company:"SaniSure — R&D", role:"Design + R&D Intern", period:"Jul 2025 – Present", location:"Camarillo, CA · On-site", bullets:[
      "Work directly with Director of Engineering on KPIs highlighting throughput within the Design Department",
      "Find, categorize, and analyze design flaws in current products; rebuild and failure-test to improve insight and recommend redesigns",
      "Organized & led meetings with Fabrication + Quality to clarify and update work instructions, increasing consistency of quality in products"
    ]},
    { company:"AUDI AG — Technical Development", role:"Requirements Engineering Intern", period:"Jan 2024 – Jun 2024", location:"Ingolstadt, Germany · On-site", bullets:[
      "Vehicle requirements engineering in the technical development branch",
      "Built Power BI KPIs for Systems Requirements Specifications, increasing transparency and traceability",
      "Collaborated on technical specs of early-stage vehicles in a ~30-engineer team"
    ]},
    { company:"UC Davis — College of Engineering", role:"Research Assistant", period:"Jan 2023 – Jun 2023", location:"Davis, CA · On-site", bullets:[
      "Worked under Dr. Richard Scalettar (Physics Chair) and a Distinguished Professor",
      "Programmed C simulations of projectile motion; ran parameter sweeps and validation experiments",
      "5–10 hrs/week of testing, analysis, and communication of results"
    ]},
    { company:"UC Davis", role:"Calculus Tutor", period:"Sep 2022 – Jun 2023", location:"Davis, CA · On-site", bullets:[
      "1-on-1 and group sessions (up to 10 students); 5–10 hrs/week",
      "Built collaborative environment and structured problem-solving habits"
    ]},
    { company:"Fruitfully Yours", role:"Vice President", period:"Jun 2018 – Jun 2021", location:"Glendora, CA · On-site", bullets:[
      "Co-Founder and VP of a nonprofit reducing food waste via fruit rescue",
      "Awarded County of Los Angeles Humanitarian Award",
      "Saved over 80,000 lbs of fruit and helped 70,000+ food-insecure individuals"
    ]},
  ];

  const projects=[
    { title:"FSAE Steering Reliability (URCA)", headline:"Reliability-first steering study for EV racecar; improved robustness & serviceability.", meta:["UCSB Formula SAE","Spring 2025"]},
    { title:"Design-to-Failure & Redesign Recommendations", headline:"Structured teardown testing and defect taxonomy to inform R&D decisions.", meta:["SaniSure","2025"]},
    { title:"Requirements KPIs & Dashboards", headline:"Power BI metrics pipeline increasing visibility and accountability.", meta:["AUDI AG","2024"]},
  ];

  const extracurriculars=[
    { org:"UCSB Formula SAE", detail:"EV racecar design & build; steering focus." },
    { org:"Elementary School STEAM Volunteer", detail:"Hands-on science & engineering sessions for 6th-grade students." },
    { org:"NASA Volunteer at UC Davis", detail:"Generator teardown and efficiency comparisons." },
  ];

  const education=[
    { school:"UC Santa Barbara (UCSB)", detail:"Honors BS/MS, Mechanical Engineering • Jun 2023 – Jun 2027 • Honors College • Tau Beta Pi • Formula SAE Racing Club • GPA: 3.82" },
    { school:"University of California, Davis", detail:"Mechanical Engineering • Sep 2021 – Jun 2023 • Tau Beta Pi • Student Alumni Association • CAAA Leadership Scholar • GPA: 3.82" },
    { school:"Glendora High School", detail:"High School Diploma • Aug 2017 – Jun 2021 • 4.69/4.00 GPA (Top 2%) • National Honors Society, Best Buddies, LEO Club, Fruitfully Yours (FLY), Varsity Tennis (4× Time Student of the Semester)" },
  ];

  const languages=["English — Native/Bilingual","German — Native/Bilingual","French — Elementary"];

  const awards=[
    { title:"6× Dean’s Honors List", issuer:"UC Davis & UCSB", date:"Dec 2024" },
    { title:"AP Capstone Diploma", issuer:"College Board", date:"Jun 2021" },
    { title:"Glendora Kiwanis Community Service Award", issuer:"Kiwanis International", date:"Jun 2021" },
    { title:"Tartan Achievement Award", issuer:"Glendora High School", date:"Jun 2021" },
  ];

  const certs=[
    { title:"Entrepreneurship Specialization", org:"The Wharton School", date:"Sep 2022" },
    { title:"Oil & Gas Industry Operations and Markets", org:"Duke University", date:"Sep 2022" },
    { title:"Statistics & R Specialization", org:"HarvardX (edX)", date:"Aug 2020" },
  ];

  const [active,setActive]=useState("experience");
  const counts=useMemo(()=>({experience:experience.length,projects:projects.length,extracurriculars:extracurriculars.length,bio:1}),[]);
  const variants={initial:{opacity:0,y:14},animate:{opacity:1,y:0,transition:{duration:.38,ease:"easeOut"}},exit:{opacity:0,y:-10,transition:{duration:.22}}};

  const Tilt=({children})=>(<motion.div whileHover={{y:-4,scale:1.02}} transition={{type:"spring",stiffness:360,damping:26}} className="gcard p-5 overflow-hidden">{children}</motion.div>);

  const Section=()=>{switch(active){
    case "experience":return(<><h2 className="text-xl font-semibold mb-6">Experience</h2><ol className="relative border-s border-white/20 pl-6">{experience.map((job,i)=>(
      <li key={i} className="mb-10 ms-4 group">
        <div className="absolute -start-1.5 mt-2.5 h-3 w-3 rounded-full" style={{background:"linear-gradient(135deg,#7cf9ff,#9e7bff)",boxShadow:"0 0 0 6px rgba(124,249,255,.18)"}}/>
        <div className="flex flex-wrap items-baseline gap-x-2"><h3 className="font-semibold group-hover:underline underline-offset-4 decoration-white/60">{job.role}</h3><span className="text-neutral-200">• {job.company}</span></div>
        <p className="text-sm text-neutral-200 mt-1">{job.period} • {job.location}</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-100 list-disc ps-5">{job.bullets.map((b,j)=>(<li key={j}>{b}</li>))}</ul>
      </li>))}</ol></>);
    case "projects":return(<><h2 className="text-xl font-semibold mb-6">Projects</h2><div className="grid gap-6 md:grid-cols-3">{projects.map((p,i)=>(<Tilt key={i}><h3 className="font-semibold">{p.title}</h3><p className="mt-2 text-sm text-neutral-100">{p.headline}</p><div className="mt-3 flex flex-wrap gap-2 text-xs">{p.meta.map((m,k)=>(<span key={k} className="badge px-2 py-1 rounded-full">{m}</span>))}</div></Tilt>))}</div></>);
    case "bio":return(<><h2 className="text-xl font-semibold mb-3">Biography</h2><div className="gcard p-6 grid gap-6 md:grid-cols-[220px_1fr] items-start"><img src="/profile.jpg" alt="Antonius Chevillotte" className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-2xl ring-1 ring-white/30 shadow-[0_12px_40px_-18px_rgba(124,249,255,.45)]"/><div>
      <p className="text-neutral-100 leading-relaxed">Mechanical Engineering Honors BS/MS candidate at UCSB focused on systems design, reliability, and data-driven engineering. Experience across research (fluid dynamics), R&D, and requirements engineering.</p>
      <div className="mt-5 grid gap-5">
        <div><h3 className="font-semibold">Education</h3><ul className="mt-2 text-sm text-neutral-100 space-y-1">{education.map((e,i)=>(<li key={i}>• {e.school} — {e.detail}</li>))}</ul></div>
        <div><h3 className="font-semibold">Languages</h3><div className="mt-2 flex flex-wrap gap-2 text-xs">{languages.map((s,i)=>(<span key={i} className="badge px-2 py-1 rounded-full">{s}</span>))}</div></div>
        <div><h3 className="font-semibold">Honors & Awards</h3><ul className="mt-2 text-sm text-neutral-100 space-y-1">{awards.map((a,i)=>(<li key={i}>• {a.title} — {a.issuer} ({a.date})</li>))}</ul></div>
        <div><h3 className="font-semibold">Licenses & Certifications</h3><ul className="mt-2 text-sm text-neutral-100 space-y-1">{certs.map((c,i)=>(<li key={i}>• {c.title} — {c.org} ({c.date})</li>))}</ul></div>
      </div></div></div></>);
    default:return(<><h2 className="text-xl font-semibold mb-6">Extracurricular activities</h2><div className="grid gap-4 md:grid-cols-2">{extracurriculars.map((x,i)=>(<Tilt key={i}><h3 className="font-semibold">{x.org}</h3><p className="mt-2 text-sm text-neutral-100">{x.detail}</p></Tilt>))}</div></>);
  }};

  return(<>
    <CursorTrail/><Starfield/><div className="aurora"/>
    <main className="relative min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,15,26,.6)] border-b border-white/20">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="font-semibold tracking-tight grad-text">Antonius Chevillotte</a>
          <nav aria-label="Primary" role="tablist">
            <ul className="flex gap-2 text-sm rounded-xl p-1 ring-1 ring-white/20 bg-white/15">
              {tabs.map(t=>(
                <li key={t.id}>
                  <button type="button" role="tab" aria-selected={active===t.id} onClick={()=>setActive(t.id)} className={`pill relative rounded-lg px-3 py-1.5 focus:outline-none ${active===t.id?"text-[#0b0f1a]":"text-white/90 hover:text-white"}`}>
                    {active===t.id&&<motion.span layoutId="nav-pill" className="bg" transition={{type:"spring",stiffness:380,damping:30}}/>}
                    <span className="text">{t.label}<span className={`ml-2 text-[10px] inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full ${active===t.id?"bg-black/10":"bg-white/20"}`}>{counts[t.id]}</span></span>
                  </button>
                </li>))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8">
        <h1 className="text-[clamp(30px,6vw,58px)] font-bold tracking-tight grad-text">Antonius (Toni) Chevillotte</h1>
        <p className="mt-3 text-white/95 max-w-2xl">{HEADLINE}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <a href={`mailto:${EMAIL}`} className="btn-grad rounded-2xl px-4 py-2 font-medium"><Magnetic>Contact</Magnetic></a>
          <span className="rounded-2xl px-4 py-2 ring-1 ring-white/25 bg-white/10 text-white">{LOCATION}</span>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="rounded-2xl px-4 py-2 ring-1 ring-white/25 bg-white/10 text-white"><Magnetic strength={8}>LinkedIn</Magnetic></a>
        </div>
        <div className="mt-8"><Marquee items={["Fluid Dynamics","R&D Testing","Power BI KPIs","Requirements Engineering","EV Racecar","Reliability","C Programming","Data Modeling"]}/></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <AnimatePresence mode="wait"><motion.div key={active} variants={variants} initial="initial" animate="animate" exit="exit"><Section/></motion.div></AnimatePresence>
      </section>

      <footer className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5"><div className="font-semibold">Antonius Chevillotte</div><div className="text-sm text-white/90">{LOCATION} • <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
            <div className="flex gap-4 text-sm"><a className="underline opacity-90 hover:opacity-100" href={LINKEDIN} target="_blank" rel="noreferrer"><Magnetic strength={6}>LinkedIn</Magnetic></a></div>
          </div>
          <p className="text-xs text-white/80 mt-6">© {new Date().getFullYear()} Antonius Chevillotte</p>
        </div>
      </footer>
    </main>
  </>)}
