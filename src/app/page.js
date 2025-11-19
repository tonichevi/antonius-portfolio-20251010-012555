"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css"; // Import the global CSS file

/* ---------- Blueprint background (no mouse effects) ---------- */
function BlueprintBG() {
  return <div className="fixed inset-0 -z-10 blueprint" />;
}

/* ---------- Splash Screen ---------- */
function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000); // Display for 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Think Different
      </motion.h1>
    </motion.div>
  );
}

/* ---------- Data ---------- */
const EXPERIENCE = [
  { id: "dressaire", role: "Fluid Dynamics Researcher", company: "Dressaire Lab", period: "Oct 2025 – Present", start: "2025-10-01", location: "UCSB", bullets: [
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
];

const EDUCATION = [
  { school: "UC Santa Barbara", line: "BS/MS Mechanical Engineering", time: "Jun 2023 – Jun 2027", extras: ["Honors College", "Tau Beta Pi", "Formula SAE Racing Club"], gpa: "3.82" },
  { school: "University of California, Davis", line: "B.S. Mechanical Engineering", time: "Sep 2021 – Jun 2023", extras: ["Student Alumni Association", "CAAA Leadership Scholar"], gpa: "3.82/4.00" },
  { school: "Glendora High School", line: "High School Diploma", time: "Aug 2017 – Jun 2021", extras: ["National Honors Society (NHS)", "Varsity Tennis"], gpa: "4.69/4.00 (Top 2%)" },
];

/* ---------- UI bits ---------- */
function TabChips({ tab, setTab }) {
  const items = [
    { id: "intro", label: "The Intro" },
    { id: "projects", label: "Projects" },
    { id: "helpinghand", label: "A Helping Hand" },
    { id: "workingit", label: "Working It" },
    { id: "deets", label: "The Deets" },
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

function ImageModal({ selectedImage, onClose }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged project image"
            className="max-w-[80%] max-h-[80vh] object-contain"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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
    return sorted; // Return a single sorted array for simplicity
  }, []);

  const [tab, setTab] = useState("intro");
  const [selected, setSelected] = useState(null);
  const details = EXPERIENCE.find(e => e.id === selected);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  const projects = [
    { t: "Current: Star Rider III - Cause and Effect Vehicle for Disabled Children", h: "Developed an adaptive vehicle to enhance mobility for disabled children, focusing on cause-and-effect interaction. Credit: https://capstone.engineering.ucsb.edu/projects/starrider", m: ["UCSB", "2025"], img: "/images/StarRiderII.jpg" },
    { t: "URCA Steering System: An Analysis of Bearing Performance", h: "Conducted a detailed analysis of bearing performance to optimize steering system reliability.", m: ["URCA", "2025"], img: "/images/SteeringUrca.jpg" },
    { t: "Frog Jumper Project", h: "Designed a spring-loaded mechanism to simulate a frog's jumping motion for educational purposes.", m: ["UCSB", "2025"], img: "/images/Jumper.jpg" },
    { t: "SOLIDWORKS Projects", h: "A collection of designs including a 4-Beam TV holder and a FSAE steering wheel project, showcasing advanced SOLIDWORKS skills.", m: ["UCSB", "2024-2025"], imgs: ["/images/TVSketch.jpg", "/images/TV.jpg.png", "/images/SteeringWheel.jpg"] },
    { t: "Power BI Projects", h: "Two 'Dashboards' developed for use by the biotech company SaniSure (see 'Working It' Page for further detail). Dashboard #1 shows a 'Chemical Compatibility' Overview, highlighting which chemical and resins are compatible for bioprocessing use. Dashboard #2 shows an 'Engagement Overview', highlighting the pressure test results of various tube + connector + fitting engagements commonly used by SaniSure.", m: ["SaniSure", "2025-"], imgs: ["/images/ChemicalFilters.jpg", "/images/Material Engagement Check.jpg"] },
  ];
  const extras = [
    { o: "UCSB Formula SAE", d: "EV racecar design & build; extensive CAD; steering project focus." },
    { o: "Elementary School STEAM Volunteer", d: "Hands-on science & engineering sessions for 6th-grade students." },
    { o: "NASA Volunteer at UC Davis", d: "Generator teardown and efficiency comparisons." },
    { o: "Fruitfully Yours Vice President", d: "Co-founded nonprofit reducing food waste via fruit rescue. The impact left by this organization has attained the LA County Humanitarian Award, having saved 80k+lbs of fruit and helping 70k+ food insecure individuals." },
    { o: "Assistive Technology Club", d: "Co-founded the assistive technology club at UCSB, striving to develop technological solutions to biological problems. The current project is developing a VR headset to determine early-onset of Alzheimer's as part of a regular medical checkup." },
  ];
  const HONORS = [
    "6× Dean's Honors List (UC Davis & UCSB, Dec 2024).",
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

  const bioPic = "/images/biography2.jpg";
  const BioAvatar = () => (
    <motion.div
      className="relative size-56 md:size-64 rounded-full overflow-hidden ring-2 ring-white/20 bg-white/10 grid place-items-center"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img src={bioPic} alt="Antonius Chevillotte headshot" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <span className="absolute inset-0 grid place-items-center text-4xl font-semibold bg-white/5"></span>
    </motion.div>
  );

  return (
    <>
      <BlueprintBG />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <main
        className="relative min-h-screen text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-md bg-white/10 ring-1 ring-white/10 grid place-items-center">
                {/* tiny "cog" icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m9.4 4a7.5 7.5 0 0 0-.3-1.7l2-1.6l-2-3.4l-2.4 1a7.6 7.6 0 0 0-1.5-.9l-.4-2.6H8.2l-.4 2.6a7.6 7.6 0 0 0-1.5.9L3.9 3.3L2 6.7l2 1.6a7.5 7.5 0 0 0-.3 1.7c0 .6.1 1.2.3 1.7L2 13.7l2 3.4l2.4-1c.5.4 1 .7 1.5.9l.4 2.6h7.2l.4-2.6c.5-.2 1-.5 1.5-.9l2.4 1l2-3.4l-2.1-1.7c.2-.5.3-1.1.3-1.7Z" /></svg>
              </div>
              <button onClick={onName} className="font-semibold tracking-tight bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent">{alias}</button>
            </div>
            <TabChips tab={tab} setTab={setTab} />
          </div>
        </header>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 py-6 space-y-10">
          {tab === "intro" && (
            <>
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Panel className="text-center flex flex-col items-center">
                  <BioAvatar />
                  <motion.div
                    className="mt-6 text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {NAME}
                  </motion.div>
                  <div className="text-sm text-white/85 mt-2">Honors BS/MS · Mechanical Engineering, UCSB</div>
                  <div className="mt-1 text-xs text-white/70">Los Angeles, CA</div>
                </Panel>
                <Panel className="flex flex-col justify-between">
                  <motion.div
                    className="text-xl md:text-3xl leading-10 text-neutral-75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Hey 👋 My name is Toni and I am a mechanical engineering BS/MS candidate at UCSB. My recent adventures include exploring fluid dynamics with soft materials at Dressaire Lab, working on design improvements of single-use bioprocessing solutions at SaniSure, and crunching KPIs using Power BI at AUDI AG. I’m super passionate about developing the bio-engineering field with innovative solutions and try my best to follow the Occam’s Razor compliant words of Chris Williamson "The only thing that is doing the thing is doing the thing." I also enjoy playing tennis, running half-marathons, and scuba-diving. 
                  </motion.div>
                </Panel>
              </div>
              <div className="relative">
                <Panel>
                  <h3 className="font-semibold text-2xl text-cyan-200">Educational Journey</h3>
                  <div className="mt-6 space-y-6">
                    {EDUCATION.map((edu, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-lg">{edu.school}</div>
                          <div className="text-white/90">{edu.line}</div>
                          <div className="text-white/70 text-sm">{edu.time} {edu.gpa ? `· GPA: ${edu.gpa}` : ""}</div>
                          <div className="mt-1 text-sm text-white/75">{edu.extras.join(" • ")}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Panel>
              </div>
              <Panel className="mt-6">
                <h3 className="font-semibold text-xl text-cyan-200">Get in Touch</h3>
                <div className="mt-4 space-y-2 text-sm text-neutral-100">
                  <p>Email: <a href="mailto:achevillotte@ucsb.edu" className="text-cyan-400 hover:underline">achevillotte@ucsb.edu</a></p>
                  <p>Phone: <span className="text-cyan-400">+1 (914) 649-9132</span></p>
                </div>
              </Panel>
            </>
          )}

          {tab === "projects" && (
            <>
              <div className="grid gap-8 md:grid-cols-3">
                {projects.map((p, i) => (
                  <Panel key={i} className="flex flex-col h-full">
                    <h3 className="font-semibold">{p.t}</h3>
                    {p.img && (
                      <div className="mt-4 flex-shrink-0">
                        <img src={p.img} alt={`${p.t} image`} className="max-w-full h-auto object-contain rounded-lg cursor-pointer" onClick={() => setSelectedImage(p.img)} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      </div>
                    )}
                    {p.imgs && (
                      <div className="mt-4 flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {p.imgs.map((img, idx) => (
                          <img key={idx} src={img} alt={`${p.t} image ${idx + 1}`} className="max-w-full h-auto object-contain rounded-lg cursor-pointer" onClick={() => setSelectedImage(img)} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        ))}
                      </div>
                    )}
                    <p className="mt-6 text-sm leading-6 text-neutral-100 flex-grow">{p.h}</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs">
                      {p.m.map((m, k) => <span key={k} className="rounded-full px-2 py-1 bg-white/10 ring-1 ring-white/15">{m}</span>)}
                    </div>
                  </Panel>
                ))}
              </div>
            </>
          )}

          {tab === "helpinghand" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Panel className="bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-cyan-200">UCSB Formula SAE</h3>
                <p className="mt-4 text-sm text-neutral-100">EV racecar design & build; extensive CAD; steering project focus.</p>
              </Panel>
              <Panel className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-purple-200">Elementary School STEAM Volunteer</h3>
                <p className="mt-4 text-sm text-neutral-100">Hands-on science & engineering sessions for 6th-grade students.</p>
              </Panel>
              <Panel className="bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-cyan-200">NASA Volunteer at UC Davis</h3>
                <p className="mt-4 text-sm text-neutral-100">Generator teardown and efficiency comparisons.</p>
              </Panel>
              <Panel className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-purple-200">Fruitfully Yours Vice President</h3>
                <p className="mt-4 text-sm text-neutral-100">Co-founded nonprofit reducing food waste via fruit rescue. The impact left by this organization has attained the LA County Humanitarian Award, having saved 80k+lbs of fruit and helping 70k+ food insecure individuals.</p>
              </Panel>
              <Panel className="bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-cyan-200">Assistive Technology Club</h3>
                <p className="mt-4 text-sm text-neutral-100">Co-founded the assistive technology club at UCSB, striving to develop technological solutions to biological problems. The current project is developing a VR headset to determine early-onset of Alzheimer's as part of a regular medical checkup.</p>
              </Panel>
            </div>
          )}

          {tab === "workingit" && (
            <div className="relative">
              <Panel>
                <h3 className="font-semibold text-2xl text-cyan-200 mb-6">My Work Journey</h3>
                <div className="space-y-4">
                  {exp.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-cyan-400 pl-4">
                      <h4 className="text-lg font-semibold">{exp.role} - {exp.company}</h4>
                      <p className="text-sm text-white/70 mt-1">{exp.period} | {exp.location}</p>
                      <button
                        onClick={() => setSelected(exp.id === selected ? null : exp.id)}
                        className="mt-2 px-4 py-1 bg-cyan-500/20 text-cyan-200 rounded hover:bg-cyan-500/30 transition-colors"
                      >
                        {selected === exp.id ? "Hide Details" : "View Details"}
                      </button>
                      <AnimatePresence>
                        {selected === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-2 text-sm text-neutral-100"
                          >
                            <ul className="list-disc pl-5">
                              {exp.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === "deets" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Panel className="bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-cyan-200">Languages</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-100">
                  {LANGS.map((lang, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {lang}
                    </motion.li>
                  ))}
                </ul>
              </Panel>
              <Panel className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-purple-200">Honors & Awards</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-100">
                  {HONORS.map((honor, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      {honor}
                    </motion.li>
                  ))}
                </ul>
              </Panel>
              <Panel className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                <h3 className="font-semibold text-lg text-pink-200">Licenses & Certifications</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-100">
                  {CERTS.map((cert, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </Panel>
            </div>
          )}
        </section>
        <ImageModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </main>
    </>
  );
}
