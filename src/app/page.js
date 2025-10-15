"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CursorTrail() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer:fine)").matches) return;
    const dots = Array.from({ length: 12 }, () => {
      const s = document.createElement("span");
      el.appendChild(s);
      return { el: s, x: 0, y: 0 };
    });
    let mx = 0, my = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      let px = mx, py = my;
      dots.forEach((d, i) => {
        d.x += (px - d.x) * 0.18;
        d.y += (py - d.y) * 0.18;
        d.el.style.transform = `translate(${d.x - 4.5}px, ${d.y - 4.5}px) scale(${1 - i * 0.07})`;
        d.el.style.opacity = String(1 - i * 0.08);
        px = d.x; py = d.y;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); el.innerHTML = ""; };
  }, []);
  return <div className="trail" ref={ref} />;
}

function Magnetic({ strength = 18, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width/2);
      const dy = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${(dx/r.width)*strength}px, ${(dy/r.height)*strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.parentElement.addEventListener("mousemove", onMove);
    el.parentElement.addEventListener("mouseleave", onLeave);
    return () => { el.parentElement.removeEventListener("mousemove", onMove); el.parentElement.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return <span style={{display:"inline-block"}}><span ref={ref} style={{display:"inline-block", transition:"transform .12s ease-out"}}>{children}</span></span>;
}

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: false });
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * DPR; c.height = h * DPR; ctx.scale(DPR, DPR);
    let hueBase = 190;
    const COUNT = Math.min(260, Math.floor((w*h)/11000));
    const stars = Array.from({length: COUNT}, () => ({
      x: Math.random()*w, y: Math.random()*h, z: Math.random()*0.9 + 0.2,
      vx: (Math.random()-0.5)*0.18, vy: (Math.random()-0.5)*0.18,
      hue: hueBase + Math.random()*140, tw: Math.random()*0.02 + 0.005, t: Math.random()*Math.PI*2
    }));
    let raf=0, last=performance.now();
    const loop = (now) => {
      const dt = Math.min(32, now-last); last=now;
      ctx.fillStyle = "rgba(11,15,26,1)";
      ctx.fillRect(0,0,w,h);
      for (const s of stars) {
        s.x += s.vx * dt * (0.35 + s.z);
        s.y += s.vy * dt * (0.35 + s.z);
        if (s.x < -6) s.x = w+6; if (s.x > w+6) s.x = -6;
        if (s.y < -6) s.y = h+6; if (s.y > h+6) s.y = -6;
        s.t += s.tw * dt * 0.06;
        const alpha = 0.7*(0.6+0.4*Math.sin(s.t));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 90%, 70%, ${alpha})`;
        ctx.arc(s.x, s.y, 0.9 + s.z*1.2, 0, Math.PI*2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onResize = () => { w = window.innerWidth; h = window.innerHeight; c.width = w*DPR; c.height = h*DPR; ctx.scale(DPR, DPR); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas className="starfield" ref={canvasRef} />;
}

function Marquee({ items }) {
  return (
    <div className="marquee rounded-full ring-1 ring-white/20 bg-white/10">
      <div className="marquee__inner">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="text-xs md:text-sm px-4">{it}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const NAME = "Antonius Chevillotte";
  const EMAIL = "achevillotte@ucsb.edu";
  const LOCATION = "Los Angeles, CA";
  const TAGLINE = "B.S./M.S. candidate in Mechanical Engineering — systems, data, and design";

  const tabs = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "extracurriculars", label: "Extracurriculars" },
    { id: "bio", label: "Biography" },
  ];

  const experience = [
    { company: "SaniSure — R&D", role: "Design & R&D Intern", period: "Jul 2025 – Present", location: "Camarillo, CA",
      bullets: [
        "Built Design dept. throughput overview in Power BI with the Director of Engineering.",
        "Investigated product design flaws, rebuilt to failure, and recommended changes.",
        "Coordinated reviews with Fabrication & Quality to resolve issues.",
      ],
    },
    { company: "AUDI AG — Technical Development", role: "Requirements Engineering Intern", period: "Feb 2024 – Jul 2024", location: "Ingolstadt, Germany",
      bullets: [
        "Analyzed system requirements for early-stage vehicles in a ~30-engineer team.",
        "Deployed Power BI KPIs improving traceability and accountability.",
        "Led weekly 150+ attendee syncs to surface risks and drive next steps.",
      ],
    },
    { company: "University of California, Davis", role: "Calculus Tutor", period: "Sep 2022 – Jun 2023", location: "Davis, CA",
      bullets: [
        "Facilitated 1-on-1 and small-group sessions (up to 10 students).",
        "Cultivated a collaborative environment and problem-solving strategies.",
      ],
    },
  ];

  const projects = [
    { title: "FSAE Steering Reliability (URCA)", headline: "Reliability-first steering study for EV racecar; improved robustness & serviceability.", meta: ["UCSB Formula SAE", "Spring 2025"] },
    { title: "Design-to-Failure & Redesign Recommendations", headline: "Teardown testing and defect taxonomy to inform R&D decisions.", meta: ["SaniSure", "2025"] },
    { title: "Requirements KPIs & Dashboards", headline: "Power BI metrics pipeline increasing visibility and accountability.", meta: ["AUDI AG", "2024"] },
  ];

  const extracurriculars = [
    { org: "UCSB Formula SAE", detail: "EV racecar design & build; steering focus." },
    { org: "Elementary School STEAM Volunteer", detail: "Hands-on science & engineering sessions for 6th-grade students." },
    { org: "NASA Volunteer at UC Davis", detail: "Generator teardown and efficiency comparisons." },
  ];

  const [active, setActive] = useState("experience");

  const counts = useMemo(() => ({
    experience: experience.length,
    projects: projects.length,
    extracurriculars: extracurriculars.length,
    bio: 1,
  }), []);

  const variants = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } }, exit: { opacity: 0, y: -10, transition: { duration: 0.22 } } };

  const Tilt = ({ children }) => (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 360, damping: 26 }} className="gcard p-5 overflow-hidden">
      {children}
    </motion.div>
  );

  const Section = () => {
    switch (active) {
      case "experience":
        return (
          <>
            <h2 className="text-xl font-semibold mb-6">Experience</h2>
            <ol className="relative border-s border-white/20 pl-6">
              {experience.map((job, i) => (
                <li key={i} className="mb-10 ms-4 group">
                  <div className="absolute -start-1.5 mt-2.5 h-3 w-3 rounded-full" style={{background:"linear-gradient(135deg,var(--accentA),var(--accentB))", boxShadow:"0 0 0 6px rgba(124,249,255,.18)"}} />
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold group-hover:underline underline-offset-4 decoration-white/60">{job.role}</h3>
                    <span className="text-neutral-200">• {job.company}</span>
                  </div>
                  <p className="text-sm text-neutral-200 mt-1">{job.period} • {job.location}</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-100 list-disc ps-5">
                    {job.bullets.map((b, j) => (<li key={j}>{b}</li>))}
                  </ul>
                </li>
              ))}
            </ol>
          </>
        );
      case "projects":
        return (
          <>
            <h2 className="text-xl font-semibold mb-6">Projects</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((p, i) => (
                <Tilt key={i}>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-100">{p.headline}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {p.meta.map((m, k) => (<span key={k} className="badge px-2 py-1 rounded-full">{m}</span>))}
                  </div>
                </Tilt>
              ))}
            </div>
          </>
        );
      case "bio":
        return (
          <>
            <h2 className="text-xl font-semibold mb-3">Biography</h2>
            <div className="gcard p-6">
              <p className="text-neutral-100 leading-relaxed">
                I am a Mechanical Engineering B.S./M.S. candidate at the University of California, Santa Barbara. My work spans systems design,
                data-driven analysis, and hands-on prototyping — from EV racecar steering reliability to R&D testing and requirements dashboards.
              </p>
              <p className="text-neutral-100 leading-relaxed mt-4">
                Outside of class and internships, I mentor younger students in STEAM and volunteer on engineering projects that advance practical problem-solving skills.
              </p>
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="text-xl font-semibold mb-6">Extracurricular activities</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {extracurriculars.map((x, i) => (
                <Tilt key={i}>
                  <h3 className="font-semibold">{x.org}</h3>
                  <p className="mt-2 text-sm text-neutral-100">{x.detail}</p>
                </Tilt>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <>
      <CursorTrail />
      <Starfield />
      <div className="aurora" />
      <main className="relative min-h-screen">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,15,26,.6)] border-b border-white/20">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="#" className="font-semibold tracking-tight grad-text">Antonius Chevillotte</a>
            <nav aria-label="Primary" role="tablist">
              <ul className="flex gap-2 text-sm rounded-xl p-1 ring-1 ring-white/20 bg-white/15">
                {tabs.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active === t.id}
                      onClick={() => setActive(t.id)}
                      className={`pill relative rounded-lg px-3 py-1.5 focus:outline-none ${active === t.id ? "text-[#0b0f1a]" : "text-white/90 hover:text-white"}`}
                    >
                      {active === t.id && <motion.span layoutId="nav-pill" className="bg" transition={{ type:"spring", stiffness: 380, damping: 30 }} />}
                      <span className="text">{t.label}
                        <span className={`ml-2 text-[10px] inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full ${active === t.id ? "bg-black/10" : "bg-white/20"}`}>
                          {counts[t.id]}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 pt-14 pb-8">
          <h1 className="text-[clamp(30px,6vw,58px)] font-bold tracking-tight grad-text">Antonius Chevillotte</h1>
          <p className="mt-3 text-white/95 max-w-2xl">{TAGLINE}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <a href={`mailto:${EMAIL}`} className="btn-grad rounded-2xl px-4 py-2 font-medium"><Magnetic>Contact</Magnetic></a>
            <span className="rounded-2xl px-4 py-2 ring-1 ring-white/25 bg-white/10 text-white">{LOCATION}</span>
            <a href="/resume.pdf" className="rounded-2xl px-4 py-2 ring-1 ring-white/25 bg-white/10 text-white"><Magnetic strength={8}>Resume (PDF)</Magnetic></a>
          </div>
          <div className="mt-8">
            <Marquee items={["Systems & Data", "EV Racecar", "R&D Testing", "Power BI", "Design for Reliability", "Prototyping", "Requirements", "Mechanics"]} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} variants={variants} initial="initial" animate="animate" exit="exit">
              <Section />
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="border-t border-white/20">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-semibold">Antonius Chevillotte</div>
                <div className="text-sm text-white/90">Los Angeles, CA • <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              </div>
              <div className="flex gap-4 text-sm">
                <a className="underline opacity-90 hover:opacity-100" href="#"><Magnetic strength={6}>LinkedIn</Magnetic></a>
                <a className="underline opacity-90 hover:opacity-100" href="#"><Magnetic strength={6}>GitHub</Magnetic></a>
                <a className="underline opacity-90 hover:opacity-100" href="#"><Magnetic strength={6}>Google Scholar</Magnetic></a>
              </div>
            </div>
            <p className="text-xs text-white/80 mt-6">© {new Date().getFullYear()} Antonius Chevillotte</p>
          </div>
        </footer>
      </main>
    </>
  );
}
