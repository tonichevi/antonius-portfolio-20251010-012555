"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

/* ---------- Backgrounds ---------- */

function BlueprintBG() {
  return <div className="fixed inset-0 -z-30 blueprint" />;
}

// extra biotech-y glow layers on top of blueprint
function BiotechGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* left cyan cell */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(125,249,255,0.22),transparent_65%)] blur-3xl" />
      {/* right magenta cell */}
      <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.22),transparent_65%)] blur-3xl" />
      {/* bottom bio gradient */}
      <div className="absolute inset-x-0 bottom-[-18rem] h-[24rem] bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.33),transparent_65%)] blur-3xl" />
      {/* orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
    </div>
  );
}

/* ---------- Splash Screen ---------- */

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1.05, opacity: 0, y: -10 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-cyan-200/80">
          Mechanics × Materials × Cells
        </span>
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight text-center">
          Building Patient-First Systems
        </h1>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Data ---------- */

const NAME = "Antonius (Toni) Chevillotte";

const PROJECTS = [
  {
    id: "star-rider-ii",
    title: "Star Rider II — Cause & Effect Vehicle",
    subtitle: "Adaptive mobility platform for children with disabilities",
    description:
      "Lead mechanical designer on a therapeutic 'cause-and-effect' vehicle that lets children with cerebral palsy initiate motion independently. Focused on robust yet sensitive sensing, vibration-based feedback, and a chassis that is both clinic-friendly and kid-proof.",
    meta: ["UCSB Capstone", "2025", "Assistive Technology"],
    img: "/images/StarRiderII.jpg",
    credit:
      "Credit: https://capstone.engineering.ucsb.edu/projects/starrider",
  },
  {
    id: "urca-steering",
    title: "URCA Steering System — Bearing Performance Study",
    subtitle: "Quantifying steering feel & reliability",
    description:
      "Analyzed bearing configurations for an undergraduate research competition vehicle. Built parametric models of steering torque and compliance, then validated them against experimental data to recommend a robust, low-maintenance configuration.",
    meta: ["URCA", "2025", "Vehicle Dynamics"],
    img: "/images/SteeringUrca.jpg",
  },
  {
    id: "frog-jumper",
    title: "Frog Jumper Mechanism",
    subtitle: "Teaching dynamics through playful hardware",
    description:
      "Designed a spring-loaded 'frog jumper' that converts stored elastic energy into a repeatable jump. Used it as a teaching tool to connect free-body diagrams, energy methods, and real-world tolerancing.",
    meta: ["UCSB", "2025", "Mechanisms"],
    img: "/images/Jumper.jpg",
  },
  {
    id: "solidworks",
    title: "SOLIDWORKS Design Set",
    subtitle: "From four-beam TV mount to FSAE steering wheel",
    description:
      "A collection of CAD projects including a four-beam TV mount optimized for stiffness-to-mass and a Formula SAE steering wheel designed around ergonomics, manufacturability, and wiring integration.",
    meta: ["UCSB", "2024–2025", "CAD & Simulation"],
    imgs: ["/images/TVSketch.jpg", "/images/TV.jpg.png", "/images/SteeringWheel.jpg"],
  },
  {
    id: "sanisure-dashboards",
    title: "SaniSure Power BI Dashboards",
    subtitle: "Design analytics for bioprocess hardware",
    description:
      "Built live dashboards used by SaniSure’s R&D and Quality teams. One tracks chemical–resin compatibility for single-use systems; another visualizes engagement test data across tubing, connectors, and fittings to surface weak points in the design space.",
    meta: ["SaniSure", "2025–", "Data & Bioprocess"],
    imgs: ["/images/ChemicalFilters.jpg", "/images/Material Engagement Check.jpg"],
  },
];

const EXPERIENCE = [
  {
    id: "dressaire",
    role: "Fluid Dynamics Researcher",
    company: "Dressaire Lab",
    period: "Oct 2025 – Present",
    start: "2025-10-01",
    location: "UCSB",
    bullets: [
      "Study capillary bridges in soft gels and their relevance for biomedical interfaces.",
      "Design an instrumented fixture to quantify wetting (contact angle, hysteresis) and capillary adhesion (force–separation curves).",
    ],
  },
  {
    id: "sanisure",
    role: "Design + R&D Intern",
    company: "SaniSure — R&D",
    period: "Jul 2025 – Present",
    start: "2025-07-01",
    location: "Camarillo, CA · On-site",
    bullets: [
      "Partner with Director of Engineering to build KPI dashboards for design throughput and failure modes.",
      "Lead structured teardown and failure testing on single-use assemblies.",
      "Coordinate with Fabrication and Quality to tighten work instructions and improve process consistency.",
    ],
  },
  {
    id: "audi",
    role: "Requirements Engineering Intern",
    company: "AUDI AG — Technical Development",
    period: "Jan 2024 – Jun 2024",
    start: "2024-01-01",
    location: "Ingolstadt, Germany · On-site",
    bullets: [
      "Owned vehicle-level requirements within a ~30-engineer cross-functional team.",
      "Built Power BI KPI pipelines to increase transparency and traceability of system requirements.",
      "Contributed to specifications for upcoming vehicle platforms.",
    ],
  },
  {
    id: "ucd-research",
    role: "Research Assistant",
    company: "UC Davis — College of Engineering",
    period: "Jan 2023 – Jun 2023",
    start: "2023-01-01",
    location: "Davis, CA · On-site",
    bullets: [
      "Supported Dr. Richard Scalettar’s group on computational physics projects.",
      "Wrote C programs for projectile motion simulation and parameter sweeps.",
    ],
  },
  {
    id: "ucd-tutor",
    role: "Calculus Tutor",
    company: "UC Davis",
    period: "Sep 2022 – Jun 2023",
    start: "2022-09-01",
    location: "Davis, CA · On-site",
    bullets: [
      "Tutored core calculus 5–10 hrs/week in one-on-one and small-group settings.",
      "Helped students connect intuitive physical reasoning with formal derivations.",
    ],
  },
];

const EDUCATION = [
  {
    school: "UC Santa Barbara",
    line: "BS/MS Mechanical Engineering",
    time: "Jun 2023 – Jun 2027",
    extras: ["Honors College", "Tau Beta Pi", "Formula SAE Racing Club"],
    gpa: "3.82",
  },
  {
    school: "University of California, Davis",
    line: "B.S. Mechanical Engineering",
    time: "Sep 2021 – Jun 2023",
    extras: ["Student Alumni Association", "CAAA Leadership Scholar"],
    gpa: "3.82/4.00",
  },
  {
    school: "Glendora High School",
    line: "High School Diploma",
    time: "Aug 2017 – Jun 2021",
    extras: ["National Honors Society (NHS)", "Varsity Tennis"],
    gpa: "4.69/4.00 (Top 2%)",
  },
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

const EXTRAS = [
  {
    title: "UCSB Formula SAE",
    text: "EV racecar design & build; steering and driver interface focus with extensive CAD.",
  },
  {
    title: "Elementary School STEAM Volunteer",
    text: "Hands-on science & engineering sessions for 6th-grade students.",
  },
  {
    title: "NASA Volunteer at UC Davis",
    text: "Generator teardown and efficiency benchmarking.",
  },
  {
    title: "Fruitfully Yours — Vice President & Co-founder",
    text: "Nonprofit reducing food waste via fruit rescue; 80k+ lbs of fruit saved and ~70k food-insecure individuals supported.",
  },
  {
    title: "Assistive Technology Club (UCSB)",
    text: "Co-founded club developing devices such as VR-based early-screening tools for Alzheimer's.",
  },
];

/* ---------- Shared UI primitives ---------- */

function SectionShell({ id, label, children }) {
  return (
    <section
      id={id}
      className="max-w-6xl mx-auto px-4 py-16 md:py-20 space-y-8"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-cyan-400/80 to-purple-400/80" />
        <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-200/80">
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/8 bg-white/5/10 bg-gradient-to-br from-white/5 via-white/0 to-white/0 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_45px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
      {children}
    </div>
  );
}

/* ---------- Image Modal ---------- */

function ImageModal({ selectedImage, onClose }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            src={selectedImage}
            alt="Project image"
            className="max-w-[86%] max-h-[80vh] rounded-2xl object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
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
  const [showSplash, setShowSplash] = useState(true);

  const [alias, setAlias] = useState(NAME);
  const [clicks, setClicks] = useState(0);
  const clickTimerRef = useRef(null);

  const handleNameClick = () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    setClicks((c) => {
      const next = c + 1;
      if (next >= 3) {
        setAlias((prev) => (prev === "67" ? NAME : "67"));
        return 0;
      }
      clickTimerRef.current = setTimeout(() => setClicks(0), 800);
      return next;
    });
  };

  const sortedExperience = useMemo(
    () =>
      [...EXPERIENCE].sort(
        (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
      ),
    []
  );

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <BlueprintBG />
      <BiotechGlow />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.main
        className="relative min-h-screen text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: showSplash ? 0.2 : 0 }}
      >
        {/* ---------- Sticky top nav ---------- */}
        <header className="sticky top-0 z-40 border-b border-white/8 bg-black/70 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
            <button
              onClick={handleNameClick}
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/15 grid place-items-center group-hover:rotate-90 transition-transform">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="opacity-80"
                >
                  <path
                    fill="currentColor"
                    d="M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m9.4 4a7.5 7.5 0 0 0-.3-1.7l2-1.6l-2-3.4l-2.4 1a7.6 7.6 0 0 0-1.5-.9l-.4-2.6H8.2l-.4 2.6a7.6 7.6 0 0 0-1.5.9L3.9 3.3L2 6.7l2 1.6a7.5 7.5 0 0 0-.3 1.7c0 .6.1 1.2.3 1.7L2 13.7l2 3.4l2.4-1c.5.4 1 .7 1.5.9l.4 2.6h7.2l.4-2.6c.5-.2 1-.5 1.5-.9l2.4 1l2-3.4l-2.1-1.7c.2-.5.3-1.1.3-1.7Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Mechanics × Biology
                </span>
                <span className="font-semibold tracking-tight bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] bg-clip-text text-transparent">
                  {alias}
                </span>
              </div>
            </button>

            <nav className="flex items-center gap-2 text-xs md:text-sm">
              {[
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "about", label: "Background" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative rounded-full px-3 py-1.5 text-white/80 hover:text-white transition-colors"
                >
                  <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                  <span className="relative">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* ---------- Hero ---------- */}
        <SectionShell id="top" label="Overview">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                Designing hardware where{" "}
                <span className="bg-gradient-to-r from-[#7cf9ff] via-[#9e7bff] to-[#ff9de6] bg-clip-text text-transparent">
                  mechanics meet biology
                </span>
                .
              </motion.h1>
              <motion.p
                className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              >
                I’m a mechanical engineering BS/MS candidate at UCSB working at
                the intersection of soft materials, assistive devices, and
                bioprocess hardware. Recent adventures include capillary bridges
                in soft gels, single-use cell-encapsulation systems, and
                therapeutic vehicles that let kids move themselves for the first
                time.
              </motion.p>

              {/* biotech domain chips */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.09 }}
              >
                {[
                  "Assistive Devices",
                  "Soft Interfaces",
                  "Single-Use Bioprocess Hardware",
                ].map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100"
                  >
                    <span className="h-1 w-4 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300" />
                    {d}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.14 }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#7cf9ff] to-[#9e7bff] text-black hover:brightness-110 transition"
                >
                  View projects
                  <span className="text-xs">↓</span>
                </a>
                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white/5 text-white/90 border border-white/15 hover:bg-white/10 transition"
                >
                  Work journey
                </a>
              </motion.div>

              {/* genome-track like line */}
              <motion.div
                className="mt-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-1 h-[2px] bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.6)_0,rgba(148,163,184,0.6)_12px,transparent_12px,transparent_20px)] opacity-60" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Mechanics · Data · Cells
                </span>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <Panel className="w-full max-w-sm flex flex-col items-center gap-4">
                <div className="relative size-40 md:size-48 rounded-full overflow-hidden border border-white/20 bg-white/5">
                  <img
                    src="/images/biography2.jpg"
                    alt="Antonius Chevillotte"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium text-white/90">
                    {NAME}
                  </div>
                  <div className="text-xs text-white/65">
                    Honors BS/MS · Mechanical Engineering, UCSB
                  </div>
                  <div className="text-[11px] text-white/50">
                    Los Angeles, CA · Always building something
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 w-full text-center">
                  <div className="rounded-2xl bg-black/40 border border-cyan-400/40 px-2 py-2">
                    <div className="text-xs font-semibold text-cyan-200">
                      3
                    </div>
                    <div className="text-[10px] text-white/55">
                      Assistive devices in progress
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/40 border border-purple-400/40 px-2 py-2">
                    <div className="text-xs font-semibold text-purple-200">
                      2
                    </div>
                    <div className="text-[10px] text-white/55">
                      Labs & bioprocess teams
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/40 border border-sky-400/40 px-2 py-2">
                    <div className="text-xs font-semibold text-sky-200">
                      6×
                    </div>
                    <div className="text-[10px] text-white/55">
                      Dean&apos;s List & awards
                    </div>
                  </div>
                </div>
              </Panel>
            </motion.div>
          </div>
        </SectionShell>

        {/* ---------- Projects (main focus) ---------- */}
        <SectionShell id="projects" label="Projects">
          {/* focus areas strip */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">
              Focus areas
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Therapeutic Mobility",
                "Soft & Fluid Interfaces",
                "Bioprocess Analytics",
              ].map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-black/40 border border-white/15 px-3 py-1 text-[11px] text-white/75"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:space-y-14">
            {PROJECTS.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={project.id}
                  className={`grid gap-8 md:gap-12 items-center ${
                    isEven
                      ? "md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]"
                      : "md:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)]"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Text side */}
                  <div className={isEven ? "" : "md:order-2"}>
                    <Panel className="h-full">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1} ·
                          Project
                        </div>
                        <div className="flex gap-1.5">
                          <span className="h-[3px] w-8 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300" />
                          <span className="h-[3px] w-8 rounded-full bg-gradient-to-r from-purple-300 to-pink-300" />
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-1 text-sm text-white/70">
                          {project.subtitle}
                        </p>
                      )}
                      <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-white/85">
                        {project.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.meta.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.credit && (
                        <p className="mt-3 text-[11px] text-white/40">
                          {project.credit}
                        </p>
                      )}
                    </Panel>
                  </div>

                  {/* Image side */}
                  <div className={isEven ? "" : "md:order-1"}>
                    {project.img && (
                      <motion.div
                        className="cursor-pointer"
                        whileHover={{ y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }}
                        onClick={() => setSelectedImage(project.img)}
                      >
                        <Panel className="p-3">
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                            <img
                              src={project.img}
                              alt={project.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                          <div className="mt-2 text-[11px] text-white/55 text-right">
                            Click to enlarge
                          </div>
                        </Panel>
                      </motion.div>
                    )}

                    {project.imgs && (
                      <div className="space-y-3">
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {project.imgs.map((img, i) => (
                            <motion.button
                              key={img}
                              type="button"
                              className="min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
                              whileHover={{ y: -4 }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 22,
                                delay: i * 0.03,
                              }}
                              onClick={() => setSelectedImage(img)}
                            >
                              <Panel className="p-2">
                                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                                  <img
                                    src={img}
                                    alt={`${project.title} view ${i + 1}`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                </div>
                              </Panel>
                            </motion.button>
                          ))}
                        </div>
                        <p className="text-[11px] text-white/55">
                          Scroll horizontally · Click any image to enlarge.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        {/* ---------- Experience ---------- */}
        <SectionShell id="experience" label="Experience">
          <div className="space-y-6">
            {sortedExperience.map((exp) => (
              <motion.div
                key={exp.id}
                className="relative pl-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="absolute left-0 top-3 h-3 w-3 rounded-full bg-gradient-to-br from-cyan-300 to-purple-400 shadow-[0_0_0_4px_rgba(56,189,248,0.25)]" />
                <Panel className="overflow-hidden">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold">
                        {exp.role}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-xs text-white/55">
                      <div>{exp.period}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs md:text-[13px] text-white/80">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-[3px] w-[10px] rounded-full bg-cyan-400/80" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </motion.div>
            ))}
          </div>
        </SectionShell>

        {/* ---------- About: Education + Extras + Skills ---------- */}
        <SectionShell id="about" label="Background">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
            {/* Education + narrative */}
            <div className="space-y-6">
              <Panel>
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-200/80 mb-4">
                  Educational Journey
                </h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.school} className="relative pl-4">
                      <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-cyan-300" />
                      <div className="text-sm font-medium">{edu.school}</div>
                      <div className="text-xs text-white/80">{edu.line}</div>
                      <div className="text-[11px] text-white/60 mt-0.5">
                        {edu.time}
                        {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                      </div>
                      <div className="text-[11px] text-white/55 mt-0.5">
                        {edu.extras.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel>
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-200/80 mb-3">
                  What I’m Optimizing For
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  A throughline in my work is turning one-off fixes into
                  scalable, patient-specific systems. Whether it’s capillary
                  bridges in soft gels, single-use cell-encapsulation hardware,
                  or a Musical Chair-style vehicle that lets a child drive
                  themselves, I gravitate toward problems where the mechanics
                  and the biology both matter.
                </p>
              </Panel>
            </div>

            {/* Side info: honors, languages, extras */}
            <div className="space-y-6">
              <Panel>
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-purple-200/80 mb-3">
                  Honors & Certifications
                </h3>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {HONORS.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-[6px] h-[3px] w-[10px] rounded-full bg-purple-400/80" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-purple-400/40 via-transparent to-cyan-400/40" />
                <ul className="mt-3 space-y-1.5 text-xs text-white/80">
                  {CERTS.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-[6px] h-[3px] w-[10px] rounded-full bg-pink-400/80" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel>
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-200/80 mb-3">
                  Languages
                </h3>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {LANGS.map((lang) => (
                    <li key={lang} className="flex gap-2">
                      <span className="mt-[6px] h-[3px] w-[10px] rounded-full bg-cyan-400/80" />
                      <span>{lang}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel>
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-200/80 mb-3">
                  Communities & Side Projects
                </h3>
                <ul className="space-y-2 text-xs text-white/80">
                  {EXTRAS.map((ex) => (
                    <li key={ex.title}>
                      <div className="font-medium text-white/90">
                        {ex.title}
                      </div>
                      <div className="text-[11px] text-white/65">
                        {ex.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        </SectionShell>

        {/* ---------- Contact ---------- */}
        <SectionShell id="contact" label="Contact">
          <Panel className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                Let’s build something useful.
              </h3>
              <p className="mt-2 text-sm text-white/80 max-w-md">
                I’m always excited to chat about assistive devices, soft
                mechanics, bioprocess hardware, or any project where engineering
                can give someone more independence.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-black/40 border border-cyan-400/50 px-3 py-1 text-cyan-100">
                  Open to research & internships
                </span>
                <span className="rounded-full bg-black/40 border border-purple-400/50 px-3 py-1 text-purple-100">
                  Happy to mentor students
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                Email:{" "}
                <a
                  href="mailto:achevillotte@ucsb.edu"
                  className="text-cyan-300 hover:text-cyan-100 underline-offset-2 hover:underline"
                >
                  achevillotte@ucsb.edu
                </a>
              </p>
              <p>
                Phone:{" "}
                <span className="text-cyan-300">+1 (914) 649-9132</span>
              </p>
            </div>
          </Panel>
        </SectionShell>

        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </motion.main>
    </>
  );
}

