"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const NAME = "Antonius Chevillotte";
  const EMAIL = "achevillotte@ucsb.edu";
  const LOCATION = "Los Angeles, CA";
  const TAGLINE = "B.S./M.S. candidate in Mechanical Engineering — systems, data, and design";

  const sections = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "extracurriculars", label: "Extracurriculars" },
    { id: "bio", label: "Biography" },
  ];

  const experience = [
    { company: "SaniSure — R&D", role: "Design & R&D Intern", period: "Jul 2025 – Present", location: "Camarillo, CA",
      bullets: [
        "Built weekly Design dept. throughput overview in Power BI with the Director of Engineering.",
        "Investigated product design flaws, rebuilt to failure, and recommended design changes.",
        "Coordinated cross-functional reviews with Fabrication & Quality to resolve issues.",
      ],
    },
    { company: "AUDI AG — Technical Development", role: "Requirements Engineering Intern", period: "Feb 2024 – Jul 2024", location: "Ingolstadt, Germany",
      bullets: [
        "Analyzed system requirements for early-stage vehicles in a ~30-engineer team.",
        "Developed and deployed Power BI KPIs improving traceability and accountability.",
        "Led weekly 150+ attendee syncs to surface requirement risks and drive next steps.",
      ],
    },
    { company: "University of California, Davis", role: "Calculus Tutor", period: "Sep 2022 – Jun 2023", location: "Davis, CA",
      bullets: [
        "Facilitated 1-on-1 and small-group sessions (up to 10 students).",
        "Cultivated a collaborative study environment and problem-solving strategies.",
      ],
    },
  ];

  const projects = [
    { title: "FSAE Steering Reliability (URCA)", headline: "Reliability-first steering study for EV racecar; improved robustness & serviceability.", meta: ["UCSB Formula SAE", "Spring 2025"] },
    { title: "Design-to-Failure & Redesign Recommendations", headline: "Structured teardown testing and defect taxonomy to inform R&D decisions.", meta: ["SaniSure", "2025"] },
    { title: "Requirements KPIs & Dashboards", headline: "Power BI metrics pipeline increasing visibility and accountability.", meta: ["AUDI AG", "2024"] },
  ];

  const extracurriculars = [
    { org: "UCSB Formula SAE", detail: "EV racecar design & build; steering focus." },
    { org: "Elementary School STEAM Volunteer", detail: "Hands-on science & engineering sessions for 6th-grade students." },
    { org: "NASA Volunteer at UC Davis", detail: "Generator teardown and efficiency comparisons." },
  ];

  const [active, setActive] = useState("extracurriculars");
  const containerRef = useRef(null);

  useEffect(() => {
    const ids = sections.map(s => s.id);
    const fromHash = typeof window !== "undefined" && window.location.hash.replace("#","");
    if (ids.includes(fromHash)) setActive(fromHash);
    const onHash = () => {
      const h = window.location.hash.replace("#","");
      if (ids.includes(h)) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    const onKey = (e) => {
      const i = ids.indexOf(active);
      if (e.key === "ArrowRight") setActive(ids[(i + 1) % ids.length]);
      if (e.key === "ArrowLeft") setActive(ids[(i - 1 + ids.length) % ids.length]);
      if (["1","2","3","4"].includes(e.key)) setActive(ids[Number(e.key)-1]);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("hashchange", onHash); window.removeEventListener("keydown", onKey); };
  }, [active]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const current = window.location.hash.replace("#","");
      if (current !== active) window.history.replaceState(null, "", `#${active}`);
    }
    document.getElementById(`${active}-heading`)?.focus();
  }, [active]);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
      containerRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, []);

  const counts = useMemo(() => ({
    experience: experience.length,
    projects: projects.length,
    extracurriculars: extracurriculars.length,
    bio: 1,
  }), []);

  const variants = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0, transition: { duration: 0.25 } }, exit: { opacity: 0, y: -8, transition: { duration: 0.2 } } };

  return (
    <main
      ref={containerRef}
      className="min-h-screen selection:bg-white selection:text-black relative"
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        backgroundImage:
          "radial-gradient(600px 400px at var(--mx, 70%) var(--my, -10%), rgba(255,255,255,0.08), transparent 60%), radial-gradient(1000px 600px at 10% -10%, rgba(255,255,255,0.04), transparent 60%)",
      }}
    >
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">Antonius Chevillotte</a>
          <nav aria-label="Primary" role="tablist">
            <ul className="flex gap-2 text-sm rounded-xl p-1 ring-1 ring-white/10 bg-white/5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={active === s.id}
                    onClick={() => setActive(s.id)}
                    className={`relative rounded-lg px-3 py-1.5 focus:outline-none ${active === s.id ? "text-black" : "text-neutral-200 hover:text-white"}`}
                  >
                    {active === s.id && (
                      <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-lg bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                    <span className="relative z-10">
                      {s.label}
                      <span className={`ml-2 text-[10px] inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full ${active === s.id ? "bg-black/10" : "bg-white/10"}`}>
                        {counts[s.id]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Antonius Chevillotte</h1>
        <p className="mt-3 text-neutral-300 max-w-2xl">{TAGLINE}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <a href={`mailto:${EMAIL}`} className="rounded-2xl bg-white text-black px-4 py-2 font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]">Contact</a>
          <span className="rounded-2xl px-4 py-2 ring-1 ring-white/20">{LOCATION}</span>
          <a href="/resume.pdf" className="rounded-2xl px-4 py-2 ring-1 ring-white/20">Resume (PDF)</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <AnimatePresence mode="wait">
          {["experience","projects","extracurriculars","bio"].map((id) => (
            active === id && (
              <motion.div key={id} variants={variants} initial="initial" animate="animate" exit="exit">
                {id === "experience" && (
                  <>
                    <h2 id="experience-heading" tabIndex={-1} className="text-xl font-semibold mb-6 outline-none">Experience</h2>
                    <ol className="relative border-s border-white/10 pl-6">
                      {experience.map((job, i) => (
                        <li key={i} className="mb-10 ms-4 group">
                          <div className="absolute -start-1.5 mt-2.5 h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <h3 className="font-semibold group-hover:underline underline-offset-4 decoration-white/40">{job.role}</h3>
                            <span className="text-neutral-400">• {job.company}</span>
                          </div>
                          <p className="text-sm text-neutral-400 mt-1">{job.period} • {job.location}</p>
                          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc ps-5">
                            {job.bullets.map((b, j) => (<li key={j}>{b}</li>))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {id === "projects" && (
                  <>
                    <h2 id="projects-heading" tabIndex={-1} className="text-xl font-semibold mb-6 outline-none">Projects</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {projects.map((p, i) => (
                        <motion.article key={i} whileHover={{ y: -2 }} className="relative rounded-2xl p-5 bg-white/5 ring-1 ring-white/10 overflow-hidden">
                          <h3 className="font-semibold">{p.title}</h3>
                          <p className="mt-2 text-sm text-neutral-300">{p.headline}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-400">
                            {p.meta.map((m, k) => (<span key={k} className="rounded-full px-2 py-1 bg-white/5 ring-1 ring-white/10">{m}</span>))}
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </>
                )}
                {id === "extracurriculars" && (
                  <>
                    <h2 id="extracurriculars-heading" tabIndex={-1} className="text-xl font-semibold mb-6 outline-none">Extracurricular activities</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {extracurriculars.map((x, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.01 }} className="rounded-2xl p-5 bg-gradient-to-br from-white/5 to-white/[0.02] ring-1 ring-white/10">
                          <h3 className="font-semibold">{x.org}</h3>
                          <p className="mt-2 text-sm text-neutral-300">{x.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
                {id === "bio" && (
                  <>
                    <h2 id="bio-heading" tabIndex={-1} className="text-xl font-semibold mb-3 outline-none">Biography</h2>
                    <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/[0.02]">
                      <p className="text-neutral-300 leading-relaxed">
                        I am a Mechanical Engineering B.S./M.S. candidate at the University of California, Santa Barbara. My work spans systems design,
                        data-driven analysis, and hands-on prototyping — from EV racecar steering reliability to R&D testing and requirements dashboards.
                      </p>
                      <p className="text-neutral-300 leading-relaxed mt-4">
                        Outside of class and internships, I mentor younger students in STEAM and volunteer on engineering projects that advance practical problem-solving skills.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-semibold">Antonius Chevillotte</div>
              <div className="text-sm text-neutral-400">{LOCATION} • <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            </div>
            <div className="flex gap-4 text-sm">
              <a className="underline opacity-80 hover:opacity-100" href="#">LinkedIn</a>
              <a className="underline opacity-80 hover:opacity-100" href="#">GitHub</a>
              <a className="underline opacity-80 hover:opacity-100" href="#">Google Scholar</a>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-6">© {new Date().getFullYear()} Antonius Chevillotte</p>
        </div>
      </footer>
    </main>
  );
}
