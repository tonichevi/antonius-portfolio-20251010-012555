"use client";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css"; // Import the global CSS file

/* ---------- Blueprint background (no mouse effects) ---------- */
function BlueprintBG() {
  return <div className="fixed inset-0 -z-10 blueprint" />;
}

/* ---------- Data ---------- */
const EXPERIENCE = [
  { id: "dressaire", role: "Fluid Dynamics Researcher", company: "Dressaire Lab", period: "Oct 2025 – Present", start: "2025-10-01", location: "UCSB · Hybrid", bullets: [
    "Studying effects and applications of capillary bridges in soft gels.",
    "Designing and building an instrumented fixture to quantify wetting (contact angle, hysteresis) and capillary adhesion (pull-off force, force–separation curves)."
  ]},
  { id: "sanisure", role: "Design + R&D Intern", company: "SaniSure — R&D", period: "Jul 2025 – Present", start: "2025-07-01", location: "Camarillo, CA · On-site", bullets: [
    "Partner with Director of Engineering to create KPI dashboards highlighting throughput across the Design Dept.",
    "Find, categorize and analyze design flaws in current products; lead structured teardown and failure testing.",
    "Facilitate meetings with Fabrication and Quality to clarify/update work instructions and improve consistency."
  ]},
  { id: "audi", role: "Requirements Engineering Intern", company: "AUDI AG — Technical Development", period: "Jan 2024 – Jun 2024", start: "2024-01-01", location: "Ingolstadt, Germany · On-site", bullets: [
    "Vehicle requirements engineering within the technical development branch.",
    "Built Power BI KPI pipelines for Systems Requirements; increased transparency and traceability.",
    "Collaborated on specifications for planned automotive vehicles with a ~30-engineer cross-functional team."
  ]},
  { id: "ucd-research", role: "Research Assistant", company: "UC Davis — College of Engineering", period: "Jan 2023 – Jun 2023", start: "2023-01-01", location: "Davis, CA · On-site", bullets: [
    "Worked with Dr. Richard Scalettar’s group.",
    "C programs to simulate projectile motion; parameter sweeps and validation."
  ]},
  { id: "ucd-tutor", role: "Calculus Tutor", company: "UC Davis", period: "Sep 2022 – Jun 2023", start: "2022-09-01", location: "Davis, CA · On-site", bullets: [
    "One-on-one and small-group tutoring (up to 10 students).",
    "5–10 hrs/week supporting success in core calculus coursework."
  ]},
  { id: "fruitfully", role: "Vice President", company: "Fruitfully Yours", period: "Jun 2018 – Jun 2021", start: "2018-06-01", location: "Glendora, CA · On-site", bullets: [
    "Co-founded nonprofit reducing food waste via fruit rescue.",
    "LA County Humanitarian Award; 80k+ lbs fruit, 70k+ people helped."
  ]},
];

const EDUCATION = [
  { school: "UC Santa Barbara", line: "BS/MS Mechanical Engineering", time: "Jun 2023 – Jun 2027", extras: ["Honors College", "Tau Beta Pi", "Formula SAE Racing Club"], gpa: "3.82" },
  { school: "University of California, Davis", line: "B.S. Mechanical Engineering", time: "Sep 2021 – Jun 2023", extras: ["Tau Beta Pi Engineering Honor Society", "Student Alumni Association", "CAAA Leadership Scholar"], gpa: "3.82/4.00" },
  { school: "Glendora High School", line: "High School Diploma", time: "Aug 2017 – Jun 2021", extras: ["National Honors Society", "Fruitfully Yours (FLY)", "LEO Club", "Varsity Tennis — 4× Student of the Semester"], gpa: "4.69/4.00 (Top 2%)" },
];

const HONORS = [
  "6× Dean’s Honors List (UC Davis & UCSB, Dec 2024).",
  "AP Capstone Diploma (Jun 2021).",
  "Glendora Kiwanis Community Service Award (Jun 2021).",
  "Tartan Achievement Award (Jun 2021).",
];

const CERTS = [
  "Entrepreneurship Specialization — The Wharton School (Sep 2022).",
  "Oil & Gas Industry Operations and Markets — Duke University (Sep 2022).",
  "Statistics & R Specialization — HarvardX (Aug 2020).",
];

const LANGS = [
  "English — Native or bilingual proficiency",
  "German — Native or bilingual proficiency",
  "French — Elementary proficiency",
];

/* ---------- UI bits ---------- */
function TabChips({ tab, setTab }) {
  const items = [
    { id: "bio", label: "Biography" },
    { id: "projects", label: "Projects" },
    { id: "extracurriculars", label: "Extracurriculars" },
    { id: "experience", label: "Experience" },
  ];
  return (
    <ul className="flex gap-2 rounded-xl p-1 ring-1 ring-white/15 bg-white/5">
      {items.map(it => (
        <li key={it.id}>
          <button
            onClick={() => setTab(it.id)}
            className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
              tab === it.id ? "chip-active" : "text-white/85 hover:text-white"
            }`}
          >
            {tab === it.id && (
              <motion.span
                layoutId="chip"
                className="absolute inset-0 rounded-lg"
                style={{ background: "linear-gradient(90deg,#7cf9ff,#9e7bff)" }}
              />
            )}
            <span className="relative">{it.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Panel({ className = "", children }) {
  return (
    <div className={`panel relative rounded-2xl p-6 ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      {children}
    </div>
  );
}

function Porthole({ item, selected, onSelect }) {
  return (
    <div className="relative flex flex-col items-center w-[168px] md:w-[200px]">
      <div className="relative size-[168px] md:size-[200px] rounded-full overflow-hidden ring-2 ring-cyan-200/30 bg-[radial-gradient(120%_120%_at_30%_20%,rgba(255,255,255,.22),rgba(16,24,40,.78)_60%,rgba(0,0,0,.9))] flex items-center justify-center text-center px-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <div>
          <div className="text-[12px] md:text-sm font-semibold leading-tight">{item.role}</div>
          <div className="text-[11px] md:text-xs opacity-90 mt-0.5">{item.location}</div>
          <div className="mt-1 text-[10px] md:text-[11px] opacity-80">{item.period}</div>
        </div>
      </div>
      <button
        onClick={() => onSelect(selected ? null : item.id)}
        aria-pressed={selected}
        className="mt-3 relative h-5 w-5 rounded-full ring-2 ring-white/30 bg-white/10 hover:ring-white/60 focus:outline-none"
        title={selected ? "Hide details" : "Show details"}
      >
        <motion.span
          className="absolute inset-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg,#7cf9ff,#9e7bff)" }}
          animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <div className="mt-2 text-xs opacity-85">{item.company}</div>
    </div>
  );
}

function Row({ items, selected, onSelect }) {
  return (
    <div className="flex items-center gap-5 md:gap-8 w-full">
      {items.map((it, i) => (
        <div key={it.id} className="flex items-center gap-5 md:gap-8 flex-1">
          <Porthole item={it} selected={selected === it.id} onSelect={onSelect} />
          {i !== items.length - 1 && (
            <div className="h-[2px] md:h-[3px] flex-1 rounded-full bg-[linear-gradient(90deg,rgba(124,249,255,0),rgba(124,249,255,.7),rgba(124,249,255,0))]" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */
export default function Page() {
  const NAME = "Antonius (Toni) Chevillotte";
  const [alias, setAlias] = useState(NAME), [clicks, setClicks] = useState(0);
  const tRef = useRef(null);
  const onName = () => {
    if (tRef.current) clearTimeout(tRef.current);
    setClicks(c => {
      const n = c + 1;
      if (n >= 3) {
        setAlias(a => (a === "67" ? NAME : "67"));
        return 0;
      }
      tRef.current = setTimeout(() => setClicks(0), 800);
      return n;
    });
  };

  const exp = useMemo(() => {
    const sorted = [...EXPERIENCE].sort((a, b) => new Date(b.start) - new Date(a.start));
    return { top: sorted.slice(0, 3), bottom: sorted.slice(3, 6) };
  }, []);

  const [tab, setTab] = useState("bio");
  const [selected, setSelected] = useState(null);
  const details = EXPERIENCE.find(e => e.id === selected);

  const projects = [
    { t: "FSAE Steering Reliability (URCA)", h: "Reliability-first steering study for EV racecar; improved robustness & serviceability.", m: ["UCSB Formula SAE", "Spring 2025"] },
    { t: "Design-to-Failure + Redesign", h: "Structured teardown testing and defect taxonomy to inform R&D decisions.", m: ["SaniSure", "2025"] },
    { t: "Requirements KPIs & Dashboards", h: "Power BI metrics pipeline increasing visibility and accountability.", m: ["AUDI AG", "2024"] },
  ];
  const extras = [
    { o: "UCSB Formula SAE", d: "EV racecar design & build; extensive CAD; steering project focus." },
    { o: "Elementary School STEAM Volunteer", d: "Hands-on science & engineering sessions for 6th-grade students." },
    { o: "NASA Volunteer at UC Davis", d: "Generator teardown and efficiency comparisons." },
  ];

  const bioPic = "/images/biography.jpg";
  const BioAvatar = () => (
    <div className="relative size-28 md:size-32 rounded-full overflow-hidden ring-2 ring-white/20 bg-white/10 grid place-items-center">
      <img src={bioPic} alt="Antonius Chevillotte headshot" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <span className="absolute inset-0 grid place-items-center text-3xl font-semibold bg-white/5">AC</span>
    </div>
  );

  return (
    <>
      <BlueprintBG />
      <main className="relative min-h-screen text-white">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-md bg-white/10 ring-1 ring-white/10 grid place-items-center">
                {/* tiny “cog” icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m9.4 4a7.5 7.5 0 0 0-.3-1.7l2-1.6l-2-3.4l-2.4 1a7.6 7.6 0 0 0-1.5-.9l-.4-2.6H8.2l-.4 2.6a7.6 7.6 0 0 0-1.5.9L3.9 3.3L2 6.7l2 1.6a7.5 7.5 0 0 0-.3 1.7c0 .6.1 1.2.3 1.7L2 13.7l2 3.4l2.4-1c.5.4 1 .7 1.5.9l.4 2.6h7.2l.4-2.6c.5-.2 1-.5 1.5-.9l2.4 1l2-3.4l-2.1-1.7c.2-.5.3-1.1.3-1.7Z" /></svg>
              </div>
              <button onClick={onName} className="font-semibold tracking-tight bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent">{alias}</button>
            </div>
            <TabChips tab={tab} setTab={setTab} />
          </div>
        </header>

        {/* Lead section */}
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent">
              {tab === "bio" ? "Biography" : tab === "projects" ? "Projects" : tab === "extracurriculars" ? "Extracurriculars" : "Experience"}
            </span>
          </h1>
          <p className="mt-2 text-white/80 max-w-2xl">Mechanical engineering • systems, data, and design.</p>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 py-6 space-y-10">
          {tab === "bio" && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Panel className="md:col-span-1 text-center">
                  <BioAvatar />
                  <div className="mt-4 font-semibold">{NAME}</div>
                  <div className="text-sm text-white/85">Honors BS/MS · Mechanical Engineering, UCSB</div>
                  <div className="mt-1 text-xs text-white/70">Los Angeles, CA</div>
                </Panel>

                <Panel className="md:col-span-2">
                  <p className="text-sm leading-6 text-neutral-100">
                    I’m an aspiring mechanical engineer focused on practical systems,
                    experimental methods, and data-driven design. Recent work spans fluid
                    dynamics of soft materials (Dressaire Lab), reliability & R&D at SaniSure,
                    and KPI/requirements analytics at AUDI AG.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {["Fluid Dynamics", "Reliability", "R&D", "Data & KPIs", "Prototyping"].map(t => (
                      <span key={t} className="rounded-full px-2 py-1 bg-white/10 ring-1 ring-white/15">{t}</span>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Panel>
                  <h3 className="font-semibold">Education</h3>
                  <ul className="mt-3 space-y-3 text-sm">
                    {EDUCATION.map((e, i) => (
                      <li key={i}>
                        <div className="font-medium">{e.school}</div>
                        <div className="text-white/90">{e.line}</div>
                        <div className="text-white/70 text-xs">{e.time}{e.gpa ? ` · GPA: ${e.gpa}` : ""}</div>
                        <div className="mt-1 text-xs text-white/75">{e.extras.join(" • ")}</div>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel>
                  <h3 className="font-semibold">Languages</h3>
                  <ul className="mt-3 list-disc ps-5 text-sm text-neutral-100">{LANGS.map((l, i) => <li key={i}>{l}</li>)}</ul>
                  <h3 className="font-semibold mt-6">Honors & Awards</h3>
                  <ul className="mt-3 list-disc ps-5 text-sm text-neutral-100">{HONORS.map((h, i) => <li key={i}>{h}</li>)}</ul>
                  <h3 className="font-semibold mt-6">Licenses & Certifications</h3>
                  <ul className="mt-3 list-disc ps-5 text-sm text-neutral-100">{CERTS.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </Panel>
              </div>
            </>
          )}

          {tab === "projects" && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {projects.map((p, i) => (
                  <Panel key={i}>
                    <h3 className="font-semibold">{p.t}</h3>
                    <p className="mt-2 text-sm text-neutral-100">{p.h}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {p.m.map((m, k) => <span key={k} className="rounded-full px-2 py-1 bg-white/10 ring-1 ring-white/15">{m}</span>)}
                    </div>
                  </Panel>
                ))}
              </div>
            </>
          )}

          {tab === "extracurriculars" && (
            <div className="grid gap-6 md:grid-cols-2">
              {extras.map((x, i) => (
                <Panel key={i}>
                  <h3 className="font-semibold">{x.o}</h3>
                  <p className="mt-2 text-sm text-neutral-100">{x.d}</p>
                </Panel>
              ))}
            </div>
          )}

          {tab === "experience" && (
            <>
              <div className="space-y-8">
                <Row items={exp.top} selected={selected} onSelect={setSelected} />
                <Row items={exp.bottom} selected={selected} onSelect={setSelected} />
              </div>

              <AnimatePresence>
                {details && (
                  <motion.div
                    key={details.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Panel className="mt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{details.role} • {details.company}</div>
                          <div className="text-sm opacity-90">{details.period} • {details.location}</div>
                        </div>
                        <button onClick={() => setSelected(null)} className="text-sm px-3 py-1.5 rounded-lg ring-1 ring-white/20 bg-white/10 hover:bg-white/15">Close</button>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-neutral-100 list-disc ps-5">
                        {details.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                      </ul>
                    </Panel>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </section>
      </main>
    </>
  );
}
