"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

/* -----------------------------------------------------
   BACKGROUND COMPONENTS
----------------------------------------------------- */

function LightBG() {
  return (
    <div className="fixed inset-0 -z-40 bg-[linear-gradient(to_bottom,#F6F7F4_0%,#ECEDE9_100%)]" />
  );
}

// Subtle pine-glow
function BiotechGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      <div
        className="absolute -left-20 -top-10 h-80 w-80 rounded-full 
      bg-[radial-gradient(circle_at_center,rgba(102,153,133,0.20),transparent_70%)] blur-3xl"
      />
      <div
        className="absolute -right-24 top-40 h-96 w-96 rounded-full 
      bg-[radial-gradient(circle_at_center,rgba(14,107,84,0.18),transparent_70%)] blur-3xl"
      />
      <div
        className="absolute inset-x-0 bottom-[-16rem] h-[22rem] 
      bg-[radial-gradient(ellipse_at_bottom,rgba(154,181,166,0.22),transparent_68%)] blur-2xl"
      />
    </div>
  );
}

/* -----------------------------------------------------
   INLINE BACKGROUND ICONS
----------------------------------------------------- */

function ProteinIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g
        fill="none"
        stroke="#0E6B54"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      >
        <circle cx="16" cy="18" r="6" />
        <circle cx="32" cy="32" r="6" />
        <circle cx="48" cy="18" r="6" />
        <circle cx="24" cy="46" r="6" />
        <circle cx="40" cy="46" r="6" />
        <path d="M21 22l7 7m9 0l7-7M29 38l-3 4m12-4l3 4" />
      </g>
    </svg>
  );
}

function RNAIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke="#0E6B54" strokeWidth="1.4" opacity="0.65">
        <path
          d="M18 10c4 6 4 10 0 16s-4 10 0 16 4 10 0 16"
          strokeLinecap="round"
        />
        <path
          d="M46 10c-4 6-4 10 0 16s4 10 0 16-4 10 0 16"
          strokeLinecap="round"
        />
        <path d="M22 14h8M34 14h8M22 22h8M34 22h8M22 30h8M34 30h8M22 38h8M34 38h8M22 46h8M34 46h8M22 54h8M34 54h8" />
      </g>
    </svg>
  );
}

function CircuitIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g
        fill="none"
        stroke="#0E6B54"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      >
        {/* Resistor */}
        <path d="M8 24h8l4-6 4 6 4-6 4 6 4-6 4 6h8" />
        {/* Op-amp */}
        <path d="M18 44l14-8v16l-14-8z" />
        <path d="M32 36h8M32 52h8M20 40h-6M20 48h-6M40 44h6" />
        {/* Nodes */}
        <circle cx="8" cy="24" r="1.5" />
        <circle cx="56" cy="24" r="1.5" />
      </g>
    </svg>
  );
}

function GearIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke="#0E6B54" strokeWidth="1.4" opacity="0.65">
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="2.5" />
        <path d="M32 14v6M32 44v6M18 18l4.2 4.2M41.8 41.8L46 46M14 32h6M44 32h6M18 46l4.2-4.2M41.8 22.2L46 18" />
      </g>
    </svg>
  );
}

function CellIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke="#0E6B54" strokeWidth="1.4" opacity="0.65">
        <ellipse cx="32" cy="32" rx="20" ry="14" />
        <ellipse cx="32" cy="32" rx="8" ry="6" />
        <circle cx="35" cy="30" r="2" />
        <path d="M18 28c2 1 3 1 5 0m18 8c2 1 3 1 5 0M20 37c2 1 4 1 6 0" />
      </g>
    </svg>
  );
}

/* -----------------------------------------------------
   SECTION-AWARE FLOATING BACKGROUND ICONS
----------------------------------------------------- */

function ThemedFloatingIcons({ theme }) {
  // Choose a palette of icons for each theme
  let icons;
  switch (theme) {
    case "projects":
      icons = [ProteinIcon, RNAIcon, CircuitIcon];
      break;
    case "experience":
      icons = [CircuitIcon, GearIcon, CircuitIcon];
      break;
    case "education":
      icons = [RNAIcon, ProteinIcon, CellIcon];
      break;
    case "background":
      icons = [CellIcon, GearIcon, CircuitIcon];
      break;
    case "contact":
      icons = [GearIcon, CircuitIcon];
      break;
    case "overview":
    default:
      icons = [CellIcon, GearIcon, ProteinIcon];
      break;
  }

  const positions = [
    { top: "6%", left: "-4%" },
    { top: "40%", right: "-6%" },
    { bottom: "-10%", left: "32%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {icons.map((Icon, idx) => {
        const pos = positions[idx] || { top: "20%", left: "70%" };
        return (
          <motion.div
            key={idx}
            className="absolute"
            style={pos}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: idx * 0.12 }}
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{
                duration: 18 + idx * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-20 w-20 md:h-24 md:w-24" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -----------------------------------------------------
   SPLASH SCREEN
----------------------------------------------------- */

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#F6F7F4] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-semibold text-[#0E6B54] text-center"
      >
        Building Patient-First Systems
      </motion.h1>
    </motion.div>
  );
}

/* -----------------------------------------------------
   DATA
----------------------------------------------------- */

const NAME = "Antonius (Toni) Chevillotte";

const PROJECTS = [
  {
    id: "musical-chair",
    title: "Musical Chair — Cause & Effect Vehicle",
    subtitle: "Adaptive mobility platform for children with disabilities",
    description:
      "Lead mechanical designer on a therapeutic “cause-and-effect” vehicle that lets children with cerebral palsy initiate motion independently. Focused on sensing, vibration feedback, and a clinic-friendly, kid-proof chassis.",
    meta: ["UCSB Capstone", "2025", "Assistive Technology"],
    img: "/images/StarRiderII.jpg",
  },
  {
    id: "sanisure-bioprocess",
    title: "Single-Use Bioprocess Assemblies — SaniSure",
    subtitle: "Tubing, connectors, and encapsulation hardware for cell therapy",
    description:
      "Designed and validated single-use fluid paths used in cell-therapy manufacturing, including tubing–connector–fitting assemblies, encapsulation rigs, and pressure-decay test systems. Focused on leak integrity and manufacturability.",
    meta: ["SaniSure", "2025–", "Bioprocess Hardware"],
    imgs: ["/images/IMG_7857.jpg", "/images/IMG_7995.jpg"],
  },
  {
    id: "urca-steering",
    title: "URCA Steering System — Bearing Performance Study",
    subtitle: "Quantifying steering feel & reliability",
    description:
      "Analyzed bearing configurations for an undergraduate competition vehicle. Built steering-torque models and validated them experimentally to recommend a low-maintenance bearing stack-up.",
    meta: ["URCA", "2025", "Vehicle Dynamics"],
    img: "/images/SteeringUrca.jpg",
  },
  {
    id: "frog",
    title: "Frog Jumper Mechanism",
    subtitle: "Teaching dynamics through playful hardware",
    description:
      "Designed a spring-loaded mechanism that converts stored elastic energy into a repeatable jump. Used as a teaching tool to connect dynamics principles with real hardware.",
    meta: ["UCSB", "2025", "Mechanisms"],
    img: "/images/Jumper.jpg",
  },
  {
    id: "solidworks",
    title: "SOLIDWORKS Design Set",
    subtitle: "TV mount, steering wheel, and more",
    description:
      "Collection of CAD projects including a stiffness-optimized TV mount and an ergonomic FSAE steering wheel designed for packaging, wiring, and manufacturability.",
    meta: ["UCSB", "2024–2025", "CAD"],
    imgs: ["/images/TVSketch.jpg", "/images/SteeringWheel.jpg"],
  },
  {
    id: "sanisure-dash",
    title: "SaniSure Power BI Dashboards",
    subtitle: "Bioprocess analytics at scale",
    description:
      "Dashboards used across R&D and Quality for engagement testing, chemical compatibility, and throughput tracking across design pipelines.",
    meta: ["SaniSure", "2025–", "Data & Tools"],
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
    location: "UCSB",
    bullets: [
      "Study capillary bridges in soft gels relevant to biomedical interfaces.",
      "Build fixtures to measure wetting, adhesion, and force–separation curves.",
    ],
  },
  {
    id: "sanisure",
    role: "Design + R&D Intern",
    company: "SaniSure — R&D",
    period: "Jul 2025 – Present",
    start: "2025-07-01",
    location: "Camarillo, CA",
    bullets: [
      "Develop single-use bioprocessing assemblies for cell therapy.",
      "Run pressure-decay leak tests and structured failure analysis.",
      "Refine SOPs and FMEAs with Fabrication and QA teams.",
      "Create dashboards for chemical compatibility and department overview.",
    ],
  },
  {
    id: "audi",
    role: "Requirements Engineering Intern",
    company: "AUDI AG",
    period: "Jan 2024 – Jun 2024",
    start: "2024-01-01",
    location: "Ingolstadt, Germany",
    bullets: [
      "Built KPI dashboards for Systems Requirements.",
      "Worked with ~30 engineers developing next-gen vehicle platforms.",
    ],
  },
  {
    id: "ucd",
    role: "Research Assistant",
    company: "UC Davis",
    period: "Jan 2023 – Jun 2023",
    start: "2023-01-01",
    location: "Davis, CA",
    bullets: [
      "Simulated projectile motion using C with parameter sweeps.",
      "Validated numerical models against experimental data.",
    ],
  },
  {
    id: "tutor",
    role: "Calculus Tutor",
    company: "UC Davis",
    period: "Sep 2022 – Jun 2023",
    start: "2022-09-01",
    location: "Davis, CA",
    bullets: [
      "One-on-one and small-group tutoring.",
      "Supported 5–10 hrs/week of instruction for core calculus.",
    ],
  },
];

const EDUCATION = [
  {
    school: "UC Santa Barbara",
    line: "BS/MS Mechanical Engineering",
    time: "Jun 2023 – Jun 2027",
    extras: ["Honors College", "Tau Beta Pi", "Formula SAE"],
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
    extras: ["National Honor Society", "Varsity Tennis"],
    gpa: "4.69/4.00 (Top 2%)",
  },
];

const EXTRAS = [
  {
    title: "UCSB Formula SAE",
    text: "EV racecar design & steering system development.",
  },
  {
    title: "Fruitfully Yours — Vice President",
    text: "Co-founded nonprofit rescuing 80k+ lbs of fruit and supporting ~70k food-insecure individuals.",
  },
  {
    title: "NASA Volunteer",
    text: "Generator teardown and efficiency benchmarking.",
  },
  {
    title: "Assistive Technology Club",
    text: "Co-founded UCSB club developing VR-based early screening tools for Alzheimer's.",
  },
  {
    title: "Elementary STEAM Volunteer",
    text: "Hands-on science workshops for 6th-grade students.",
  },
];

const HONORS = [
  "6× Dean's Honors List (UCD & UCSB).",
  "AP Capstone Diploma (2021).",
  "Glendora Kiwanis Community Service Award.",
  "Tartan Achievement Award.",
];

const CERTS = [
  "Entrepreneurship Specialization — Wharton.",
  "Oil & Gas Markets — Duke.",
  "Statistics & R Specialization — HarvardX.",
];

const LANGS = [
  "English — Native",
  "German — Native",
  "French — Elementary",
];

/* -----------------------------------------------------
   REUSABLE COMPONENTS
----------------------------------------------------- */

const fadeProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function SectionShell({ id, label, theme, children }) {
  return (
    <section
      id={id}
      className="relative max-w-6xl mx-auto px-4 py-20 space-y-10"
    >
      {/* Section-aware floating icons */}
      <ThemedFloatingIcons theme={theme} />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#0E6B54]/50" />
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#0E6B54]/70">
            {label}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-[#D0D4CB] bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-6 md:p-8 backdrop-blur ${className}`}
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            src={selectedImage}
            alt="Project"
            className="max-w-[85%] max-h-[80vh] rounded-2xl shadow-xl bg-white"
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

/* -----------------------------------------------------
   PAGE
----------------------------------------------------- */

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const sortedExperience = useMemo(
    () =>
      [...EXPERIENCE].sort(
        (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
      ),
    []
  );

  return (
    <>
      <LightBG />
      <BiotechGlow />

      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen text-[#1A1F1A]">
        {/* NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/80 border-b border-[#DADCD7] backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.15em] text-[#0E6B54]/60">
                Mechanics × Biology
              </span>
              <span className="font-semibold text-[#0E6B54]">{NAME}</span>
            </div>

            <nav className="flex gap-3 text-sm">
              {[
                ["projects", "Projects"],
                ["experience", "Experience"],
                ["education", "Education"],
                ["background", "Background"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="px-3 py-1.5 rounded-full hover:bg-[#E7EBE7] 
                  text-[#1A1F1A]/70 hover:text-[#0E6B54] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO */}
        <SectionShell id="top" label="Overview" theme="overview">
          <div className="grid md:grid-cols-[1.4fr,1fr] gap-10 items-center mt-6">
            {/* TEXT */}
            <motion.div {...fadeProps} className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Designing hardware where{" "}
                <span className="text-[#0E6B54]">mechanics meet biology</span>.
              </h1>
              <p className="text-sm md:text-base text-[#374139] leading-relaxed max-w-xl">
                I’m a mechanical engineering BS/MS candidate at UCSB working at
                the intersection of soft materials, assistive devices, and
                single-use bioprocessing systems.
              </p>

              <div className="flex gap-2 flex-wrap">
                {[
                  "Assistive Devices",
                  "Soft Interfaces",
                  "Bioprocess Hardware",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] uppercase tracking-wide 
                      rounded-full bg-[#0E6B54]/10 text-[#0E6B54] border border-[#0E6B54]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* PORTRAIT */}
            <motion.div {...fadeProps}>
              <Card className="max-w-xs mx-auto text-center">
                <div className="size-40 mx-auto rounded-full overflow-hidden border border-[#D0D4CB]">
                  <img
                    src="/images/biographyVF.jpg"
                    alt="Antonius Chevillotte"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 font-medium">{NAME}</div>
                <div className="text-xs text-[#5F6B62]">
                  Honors BS/MS · Mechanical Engineering, UCSB
                </div>
                <div className="text-[11px] text-[#7B847E]">
                  Los Angeles, CA · Always building
                </div>
              </Card>
            </motion.div>
          </div>
        </SectionShell>

        {/* PROJECTS */}
        <SectionShell id="projects" label="Projects" theme="projects">
          <div className="space-y-16 mt-6">
            {PROJECTS.map((p, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.article
                  key={p.id}
                  {...fadeProps}
                  className={`grid items-center gap-10 md:gap-12 
                    ${
                      isEven
                        ? "md:grid-cols-[1.2fr,1fr]"
                        : "md:grid-cols-[1fr,1.2fr]"
                    }`}
                >
                  {/* TEXT BLOCK */}
                  <div className={isEven ? "" : "md:order-2"}>
                    <Card className="h-full flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70">
                          {i + 1 < 10 ? `0${i + 1}` : i + 1} · Project
                        </div>
                        <h3 className="text-xl font-semibold mt-2 text-[#1A1F1A]">
                          {p.title}
                        </h3>
                        <p className="text-sm text-[#57655B] mt-1">
                          {p.subtitle}
                        </p>
                        <p className="text-sm text-[#374139] mt-4 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.meta.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] rounded-full border 
                            bg-[#ECEEEB] border-[#D0D4CB] text-[#1A1F1A]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* IMAGE(S) BLOCK */}
                  <div className={isEven ? "" : "md:order-1"}>
                    {/* SINGLE IMAGE */}
                    {p.img && (
                      <motion.img
                        src={p.img}
                        alt={p.title}
                        className="rounded-2xl object-cover w-full max-h-[360px] cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelectedImage(p.img)}
                      />
                    )}

                    {/* MULTI-IMAGES */}
                    {p.imgs && (
                      <div className="flex gap-3 overflow-x-auto pb-1">
                        {p.imgs.map((img) => (
                          <motion.img
                            key={img}
                            src={img}
                            alt={p.title}
                            className="rounded-2xl object-cover cursor-pointer 
                            min-w-[240px] max-h-[240px]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setSelectedImage(img)}
                          />
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
        <SectionShell
          id="experience"
          label="Experience"
          theme="experience"
        >
          <div className="space-y-6 mt-6">
            {sortedExperience.map((exp) => (
              <motion.div key={exp.id} {...fadeProps}>
                <Card className="relative pl-6">
                  <div className="absolute left-0 top-5 h-3 w-3 bg-[#0E6B54] rounded-full" />

                  <div className="flex justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A1F1A]">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-[#57655B]">{exp.company}</p>
                    </div>
                    <div className="text-xs text-right text-[#5F6B62]">
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
              </motion.div>
            ))}
          </div>
        </SectionShell>

        {/* EDUCATION */}
        <SectionShell id="education" label="Education" theme="education">
          <motion.div {...fadeProps} className="mt-6">
            <Card>
              <h3 className="text-sm uppercase font-semibold text-[#0E6B54] tracking-[0.18em] mb-4">
                Educational Journey
              </h3>

              <div className="grid gap-6 md:grid-cols-3">
                {EDUCATION.map((edu) => (
                  <div key={edu.school} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0E6B54]" />
                      <span className="text-sm font-medium text-[#1A1F1A]">
                        {edu.school}
                      </span>
                    </div>
                    <div className="text-xs text-[#374139]">{edu.line}</div>
                    <div className="text-[11px] text-[#5F6B62]">
                      {edu.time} {edu.gpa && `· GPA: ${edu.gpa}`}
                    </div>
                    <div className="text-[11px] text-[#5F6B62]">
                      {edu.extras.join(" • ")}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </SectionShell>

        {/* BACKGROUND & IMPACT */}
        <SectionShell
          id="background"
          label="Background & Impact"
          theme="background"
        >
          <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-start mt-6">
            {/* VOLUNTEERING */}
            <motion.div {...fadeProps}>
              <Card>
                <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold mb-3">
                  Volunteering & Leadership
                </h3>

                <div className="space-y-3 text-sm text-[#374139]">
                  {EXTRAS.map((e) => (
                    <div key={e.title}>
                      <div className="font-medium text-[#1A1F1A]">{e.title}</div>
                      <div className="text-[13px] text-[#5F6B62]">{e.text}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* HONORS + CERTS + LANGUAGES */}
            <div className="space-y-6">
              <motion.div {...fadeProps}>
                <Card>
                  <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold mb-3">
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
              </motion.div>

              <motion.div {...fadeProps}>
                <Card>
                  <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold mb-3">
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
              </motion.div>

              <motion.div {...fadeProps}>
                <Card>
                  <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold mb-3">
                    Languages
                  </h3>
                  <ul className="space-y-1.5 text-sm text-[#374139]">
                    {LANGS.map((l) => (
                      <li key={l} className="flex gap-2">
                        <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/40" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </SectionShell>

        {/* CONTACT */}
        <SectionShell id="contact" label="Contact" theme="contact">
          <motion.div {...fadeProps} className="mt-6">
            <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1A1F1A]">
                  Let’s build something useful.
                </h3>
                <p className="text-sm text-[#374139] mt-2 max-w-md">
                  Always excited to chat about assistive devices, soft
                  mechanics, or bioprocess hardware where engineering gives
                  someone more independence.
                </p>
              </div>

              <div className="text-sm space-y-1 text-[#1A1F1A]">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:achevillotte@ucsb.edu"
                    className="text-[#0E6B54] underline underline-offset-2"
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
          </motion.div>
        </SectionShell>

        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </main>
    </>
  );
}


