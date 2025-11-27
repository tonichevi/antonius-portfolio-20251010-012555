"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

/* ---------------------------------------
   BACKGROUNDS (Light + Pine Green)
----------------------------------------*/

function LightBG() {
  return (
    <div className="fixed inset-0 -z-30 bg-[linear-gradient(to_bottom,#F6F7F4_0%,#ECEDE9_100%)]" />
  );
}

function BiotechGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* top-left soft sage */}
      <div className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(102,153,133,0.20),transparent_70%)] blur-3xl" />
      {/* right pine */}
      <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,107,84,0.18),transparent_70%)] blur-3xl" />
      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-[-16rem] h-[22rem] bg-[radial-gradient(ellipse_at_bottom,rgba(154,181,166,0.22),transparent_68%)] blur-2xl" />
    </div>
  );
}

/* ---------------------------------------
   SPLASH SCREEN
----------------------------------------*/

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#F6F7F4] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-semibold text-[#0E6B54] tracking-tight text-center">
          Building Patient-First Systems
        </h1>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------
   DATA
----------------------------------------*/

const NAME = "Antonius (Toni) Chevillotte";

const PROJECTS = [
  {
    id: "star-rider-ii",
    title: "Star Rider II — Cause & Effect Vehicle",
    subtitle: "Adaptive mobility platform for children with disabilities",
    description:
      "Lead mechanical designer on a therapeutic “cause-and-effect” vehicle that lets children with cerebral palsy initiate motion independently. Focused on robust yet sensitive sensing, vibration-based feedback, and a chassis that is both clinic-friendly and kid-proof.",
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
      "Designed a spring-loaded “frog jumper” that converts stored elastic energy into a repeatable jump. Used it as a teaching tool to connect free-body diagrams, energy methods, and real-world tolerancing.",
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
    imgs: [
      "/images/TVSketch.jpg",
      "/images/TV.jpg.png",
      "/images/SteeringWheel.jpg",
    ],
  },
  {
    id: "sanisure-dashboards",
    title: "SaniSure Power BI Dashboards",
    subtitle: "Design analytics for bioprocess hardware",
    description:
      "Built live dashboards used by SaniSure’s R&D and Quality teams. One tracks chemical–resin compatibility for single-use systems; another visualizes engagement test data across tubing, connectors, and fittings to surface weak points in the design space.",
    meta: ["SaniSure", "2025–", "Bioprocess Analytics"],
    imgs: [
      "/images/ChemicalFilters.jpg",
      "/images/Material Engagement Check.jpg",
    ],
  },
];

const EXPERIENCE = [
  {
    id: "dressaire",
    role: "Fluid Dynamics Researcher",
    company: "Dressaire Lab",
    period: "Oct 2025 – Present",
    start: "2025-10-01",
    location: "UCSB · Santa Barbara, CA",
    bullets: [
      "Study capillary bridges in soft gels and their relevance for biomedical interfaces.",
      "Design and build instrumented fixtures to quantify wetting (contact angle, hysteresis) and capillary adhesion (force–separation curves).",
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
      "Partner with Director of Engineering to create KPI dashboards highlighting throughput across the Design Department.",
      "Find, categorize, and analyze design flaws in current products; lead structured teardown and failure testing.",
      "Facilitate meetings with Fabrication and Quality to clarify and update work instructions and improve consistency.",
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
      "Worked on vehicle requirements engineering within the technical development branch.",
      "Built Power BI KPI pipelines for Systems Requirements, increasing transparency and traceability.",
      "Collaborated on specifications for planned automotive vehicles with a ~30-engineer cross-functional team.",
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
      "Worked with Dr. Richard Scalettar’s group.",
      "Wrote C programs to simulate projectile motion with parameter sweeps and validation.",
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
      "One-on-one and small-group tutoring (up to 10 students).",
      "Provided 5–10 hrs/week of support for core calculus coursework.",
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
    extras: ["National Honor Society (NHS)", "Varsity Tennis"],
    gpa: "4.69/4.00 (Top 2%)",
  },
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
    text: "Co-founded club developing technological solutions to biological problems; current project is a VR-based early-screening tool for Alzheimer’s.",
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

/* ---------------------------------------
   SHARED UI COMPONENTS
----------------------------------------*/

function SectionShell({ id, label, children }) {
  return (
    <section
      id={id}
      className="max-w-6xl mx-auto px-4 py-16 md:py-20 space-y-8"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#0E6B54]/50" />
        <h2 className="text-xs tracking-[0.22em] uppercase text-[#0E6B54]/70">
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-3xl border border-[#D0D4CB] bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function ImageModal({ selectedImage, onClose }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            src={selectedImage}
            alt="Project image"
            className="max-w-[85%] max-h-[80vh] rounded-2xl shadow-lg bg-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------
   PAGE
----------------------------------------*/

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
      <LightBG />
      <BiotechGlow />

      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.main
        className="relative min-h-screen text-[#1A1F1A]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* NAVBAR */}
        <header className="sticky top-0 z-40 border-b border-[#DADCD7] bg-white/80 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={handleNameClick}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-8 rounded-lg border border-[#D0D4CB] bg-white grid place-items-center">
                {/* simple cog icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="text-[#0E6B54]"
                >
                  <path
                    fill="currentColor"
                    d="M12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7m8.94-3.5c0-.5-.04-.99-.1-1.47l2.13-1.66a.5.5 0 0 0 .11-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.51 1a7.98 7.98 0 0 0-2.54-1.47l-.38-2.65A.5.5 0 0 0 12.56 1h-4a.5.5 0 0 0-.5.43l-.38 2.65a7.98 7.98 0 0 0-2.54 1.47l-2.51-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .11.64l2.13 1.66c-.06.48-.1.97-.1 1.47s.04.99.1 1.47L.24 12.13a.5.5 0 0 0-.11.64l2 3.46a.5.5 0 0 0 .61.22l2.51-1a7.98 7.98 0 0 0 2.54 1.47l.38 2.65a.5.5 0 0 0 .5.43h4a.5.5 0 0 0 .5-.43l.38-2.65a7.98 7.98 0 0 0 2.54-1.47l2.51 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.11-.64l-2.13-1.66c.06-.48.1-.97.1-1.47"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs tracking-[0.18em] text-[#0E6B54]/60 uppercase">
                  Mechanics × Biology
                </span>
                <span className="font-semibold text-[#0E6B54] tracking-tight">
                  {alias}
                </span>
              </div>
            </button>

            <nav className="flex items-center gap-2 text-sm">
              {[
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "background", label: "Background" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-3 py-1.5 rounded-full text-[#1A1F1A]/70 hover:text-[#0E6B54] hover:bg-[#E7EBE7] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO */}
        <SectionShell id="top" label="Overview">
          <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center">
            {/* TEXT */}
            <div className="space-y-6">
              <motion.h1
                className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-[#1A1F1A]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Designing hardware where{" "}
                <span className="text-[#0E6B54]">mechanics meet biology</span>.
              </motion.h1>

              <motion.p
                className="text-[15px] md:text-base text-[#374139] leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
              >
                I’m a mechanical engineering BS/MS candidate at UCSB working at
                the intersection of soft materials, assistive devices, and
                bioprocess hardware. Recent work includes capillary bridges in
                soft gels, cell-encapsulation systems, and mobility devices that
                enable independence for children with disabilities.
              </motion.p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Assistive Devices",
                  "Soft Interfaces",
                  "Bioprocess Hardware",
                ].map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0E6B54]/30 bg-[#0E6B54]/10 px-3 py-1 text-[11px] uppercase tracking-wide text-[#0E6B54]"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-full bg-[#0E6B54] text-white text-sm font-medium hover:bg-[#0c5f4b] transition"
                >
                  View projects ↓
                </a>
                <a
                  href="#experience"
                  className="px-4 py-2 rounded-full border border-[#D0D4CB] bg-white text-sm text-[#1A1F1A]/80 hover:bg-[#ECEEEB] transition"
                >
                  Work journey
                </a>
              </div>
            </div>

            {/* PORTRAIT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex justify-center md:justify-end"
            >
              <Card className="max-w-sm text-center flex flex-col items-center gap-4">
                <div className="relative size-40 md:size-48 rounded-full overflow-hidden border border-[#D0D4CB]">
                  <img
                    src="/images/biography2.jpg"
                    alt="Antonius Chevillotte"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="text-sm font-medium text-[#1A1F1A]">
                  {NAME}
                </div>
                <div className="text-xs text-[#374139]">
                  Honors BS/MS · Mechanical Engineering, UCSB
                </div>
                <div className="text-[11px] text-[#5F6B62]">
                  Los Angeles, CA · Always building
                </div>
              </Card>
            </motion.div>
          </div>
        </SectionShell>

        {/* PROJECTS */}
        <SectionShell id="projects" label="Projects">
          <div className="space-y-14">
            {PROJECTS.map((project, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`grid gap-8 md:gap-12 items-center ${
                    isEven
                      ? "md:grid-cols-[1.2fr,1fr]"
                      : "md:grid-cols-[1fr,1.2fr]"
                  }`}
                >
                  {/* TEXT BLOCK */}
                  <div className={isEven ? "" : "md:order-2"}>
                    <Card>
                      <div className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70 mb-1">
                        {i + 1 < 10 ? `0${i + 1}` : i + 1} · Project
                      </div>
                      <h3 className="text-xl font-semibold text-[#1A1F1A]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#57655B] mt-1">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-[#374139] mt-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.meta.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[11px] bg-[#ECEEEB] text-[#1A1F1A]/70 border border-[#D0D4CB]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.credit && (
                        <p className="mt-2 text-[10px] text-[#7B847E]">
                          {project.credit}
                        </p>
                      )}
                    </Card>
                  </div>

                  {/* IMAGES */}
                  <div className={isEven ? "" : "md:order-1"}>
                    {project.img && (
                      <div
                        className="cursor-pointer"
                        onClick={() => setSelectedImage(project.img)}
                      >
                        <Card className="p-3">
                          <img
                            src={project.img}
                            alt={project.title}
                            className="rounded-2xl border border-[#D0D4CB]"
                          />
                        </Card>
                      </div>
                    )}

                    {project.imgs && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {project.imgs.map((img) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setSelectedImage(img)}
                            className="min-w-[200px]"
                          >
                            <Card className="p-2">
                              <img
                                src={img}
                                alt={project.title}
                                className="rounded-xl border border-[#D0D4CB]"
                              />
                            </Card>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        {/* EXPERIENCE */}
        <SectionShell id="experience" label="Experience">
          <div className="space-y-6">
            {sortedExperience.map((exp) => (
              <Card key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-5 h-3 w-3 rounded-full bg-[#0E6B54]" />
                <div className="flex justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1A1F1A]">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-[#57655B]">{exp.company}</p>
                  </div>
                  <div className="text-right text-xs text-[#5F6B62]">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-[#374139]">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </SectionShell>

        {/* EDUCATION */}
        <SectionShell id="education" label="Education">
          <Card>
            <h3 className="text-sm font-semibold text-[#0E6B54] uppercase tracking-[0.18em] mb-4">
              Educational Journey
            </h3>
           <div className="grid gap-6 md:grid-cols-3">
  {EDUCATION.map((edu) => (
    <div key={edu.school} className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#0E6B54]" />
        <div className="text-sm font-medium text-[#1A1F1A]">{edu.school}</div>
      </div>

      <div className="text-xs text-[#374139]">{edu.line}</div>

      <div className="text-[11px] text-[#5F6B62]">
        {edu.time} {edu.gpa ? `· GPA: ${edu.gpa}` : ""}
      </div>

      <div className="text-[11px] text-[#5F6B62] mt-0.5">
        {edu.extras.join(" • ")}
      </div>
    </div>
  ))}
</div>

                  <div className="text-xs text-[#374139]">{edu.line}</div>
                  <div className="text-[11px] text-[#5F6B62]">
                    {edu.time} {edu.gpa ? `· GPA: ${edu.gpa}` : ""}
                  </div>
                  <div className="text-[11px] text-[#5F6B62] mt-0.5">
                    {edu.extras.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </SectionShell>

        {/* BACKGROUND & IMPACT (modular subsections) */}
        <SectionShell id="background" label="Background & Impact">
          <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] items-start">
            {/* Volunteering & leadership */}
            <Card>
              <h3 className="text-sm font-semibold text-[#0E6B54] uppercase tracking-[0.18em] mb-3">
                Volunteering & Leadership
              </h3>
              <div className="space-y-3 text-sm text-[#374139]">
                {EXTRAS.map((ex) => (
                  <div key={ex.title}>
                    <div className="font-medium text-[#1A1F1A]">
                      {ex.title}
                    </div>
                    <div className="text-[13px] text-[#5F6B62]">
                      {ex.text}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right column: honors, certs, languages */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-sm font-semibold text-[#0E6B54] uppercase tracking-[0.18em] mb-3">
                  Honors & Awards
                </h3>
                <ul className="space-y-1.5 text-sm text-[#374139]">
                  {HONORS.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/70" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-[#0E6B54] uppercase tracking-[0.18em] mb-3">
                  Licenses & Certifications
                </h3>
                <ul className="space-y-1.5 text-sm text-[#374139]">
                  {CERTS.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/50" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-[#0E6B54] uppercase tracking-[0.18em] mb-3">
                  Languages
                </h3>
                <ul className="space-y-1.5 text-sm text-[#374139]">
                  {LANGS.map((lang) => (
                    <li key={lang} className="flex gap-2">
                      <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/40" />
                      {lang}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </SectionShell>

        {/* CONTACT */}
        <SectionShell id="contact" label="Contact">
          <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#1A1F1A]">
                Let’s build something useful.
              </h3>
              <p className="mt-2 text-sm text-[#374139] max-w-md">
                I’m always excited to chat about assistive devices, soft
                mechanics, bioprocess hardware, or any project where engineering
                can give someone more independence.
              </p>
            </div>

            <div className="text-sm text-[#1A1F1A] space-y-1">
              <p>
                Email:{" "}
                <a
                  href="mailto:achevillotte@ucsb.edu"
                  className="text-[#0E6B54] underline-offset-2 hover:underline"
                >
                  achevillotte@ucsb.edu
                </a>
              </p>
              <p>
                Phone:{" "}
                <span className="text-[#0E6B54]">+1 (914) 649-9132</span>
              </p>
            </div>
          </Card>
        </SectionShell>

        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </motion.main>
    </>
  );
}

