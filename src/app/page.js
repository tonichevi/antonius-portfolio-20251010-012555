"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

/* -----------------------------------------------------
   BACKGROUND COMPONENTS
----------------------------------------------------- */

function LightBG() {
  return (
    <div className="fixed inset-0 -z-30 bg-[linear-gradient(to_bottom,#F6F7F4_0%,#ECEDE9_100%)]" />
  );
}

function BiotechGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Top-left glow */}
      <div className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(102,153,133,0.20),transparent_70%)] blur-3xl" />

      {/* Right pine glow */}
      <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,107,84,0.18),transparent_70%)] blur-3xl" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-[-16rem] h-[22rem] bg-[radial-gradient(ellipse_at_bottom,rgba(154,181,166,0.22),transparent_68%)] blur-2xl" />
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
    id: "star-rider-ii",
    title: "Star Rider II — Cause & Effect Vehicle",
    subtitle: "Adaptive mobility platform for children with disabilities",
    description:
      "Lead mechanical designer on a therapeutic “cause-and-effect” vehicle that lets children with cerebral palsy initiate motion independently. Focused on sensitive sensing, vibration-based feedback, and a clinic-friendly chassis.",
    meta: ["UCSB Capstone", "2025", "Assistive Technology"],
    img: "/images/StarRiderII.jpg",
  },
  {
    id: "urca-steering",
    title: "URCA Steering System — Bearing Performance Study",
    subtitle: "Quantifying steering feel & reliability",
    description:
      "Analyzed bearing configurations for an undergraduate competition vehicle. Created models of steering torque and validated them experimentally.",
    meta: ["URCA", "2025", "Vehicle Dynamics"],
    img: "/images/SteeringUrca.jpg",
  },
  {
    id: "frog",
    title: "Frog Jumper Mechanism",
    subtitle: "Teaching dynamics through playful hardware",
    description:
      "Designed a spring-loaded mechanism demonstrating energy storage & release. Used for teaching dynamics principles through hands-on demos.",
    meta: ["UCSB", "2025", "Mechanisms"],
    img: "/images/Jumper.jpg",
  },
  {
    id: "solidworks",
    title: "SOLIDWORKS Design Set",
    subtitle: "TV Mount, Steering Wheel, and more",
    description:
      "Collection of CAD projects including a stiffness-optimized TV mount and an ergonomic FSAE steering wheel.",
    meta: ["UCSB", "2024–2025", "CAD"],
    imgs: [
      "/images/TVSketch.jpg",
      "/images/TV.jpg.png",
      "/images/SteeringWheel.jpg",
    ],
  },
  {
    id: "sanisure-dash",
    title: "SaniSure Power BI Dashboards",
    subtitle: "Bioprocess analytics at scale",
    description:
      "Developed dashboards used across R&D and Quality for engagement testing, chemical compatibility, and material performance.",
    meta: ["SaniSure", "2025–", "Bioprocessing"],
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
      "Build fixtures measuring wetting, adhesion, and force–separation curves.",
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
      "Develop single-use bioprocessing assemblies for cell-therapy manufacturing.",
      "Run pressure-decay leak tests and structural failure analysis.",
      "Collaborate across Fabrication and QA to refine SOPs and FMEAs.",
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
      "Worked in cross-functional team of ~30 engineers.",
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
      "Validated numerical models with experimental data.",
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
    text: "Co-founded nonprofit rescuing 80k+ lbs of fruit.",
  },
  {
    title: "NASA Volunteer (UC Davis)",
    text: "Generator teardown & efficiency benchmarking.",
  },
  {
    title: "Assistive Technology Club (UCSB)",
    text: "VR-based early Alzheimer's screening device.",
  },
  {
    title: "STEAM Volunteer",
    text: "Hands-on engineering workshops for 6th graders.",
  },
];

const HONORS = [
  "6× Dean's Honors List",
  "AP Capstone Diploma",
  "Kiwanis Community Service Award",
  "Tartan Achievement Award",
];

const CERTS = [
  "Wharton Entrepreneurship Specialization",
  "Duke Oil & Gas Ops",
  "HarvardX Statistics & R",
];

const LANGS = [
  "English — Native",
  "German — Native",
  "French — Elementary",
];

/* -----------------------------------------------------
   REUSABLE COMPONENTS
----------------------------------------------------- */

function SectionShell({ id, label, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-20 space-y-10">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#0E6B54]/50" />
        <h2 className="text-xs uppercase tracking-[0.22em] text-[#0E6B54]/70">
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
            className="max-w-[85%] max-h-[80vh] rounded-2xl shadow-xl"
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
  const [alias, setAlias] = useState(NAME);
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef(null);

  const handleNameClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setClicks((c) => {
      if (c + 1 >= 3) {
        setAlias((prev) => (prev === "67" ? NAME : "67"));
        return 0;
      }
      timerRef.current = setTimeout(() => setClicks(0), 600);
      return c + 1;
    });
  };

  const sortedExperience = useMemo(() => {
    return [...EXPERIENCE].sort(
      (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
    );
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <LightBG />
      <BiotechGlow />

      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <main className="relative min-h-screen text-[#1A1F1A]">

        {/* NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/80 border-b border-[#DADCD7] backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={handleNameClick} className="flex items-center gap-3">
              <div className="h-8 w-8 border border-[#D0D4CB] rounded-lg grid place-items-center text-[#0E6B54]">
                ⚙️
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.15em] text-[#0E6B54]/60">
                  Mechanics × Biology
                </span>
                <span className="font-semibold text-[#0E6B54]">{alias}</span>
              </div>
            </button>

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
                  className="px-3 py-1.5 rounded-full hover:bg-[#E7EBE7] text-[#1A1F1A]/70 hover:text-[#0E6B54]"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO */}
        <SectionShell id="top" label="Overview">
          <div className="grid md:grid-cols-[1.4fr,1fr] gap-10 items-center">

            {/* TEXT */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight"
              >
                Designing hardware where{" "}
                <span className="text-[#0E6B54]">mechanics meet biology</span>.
              </motion.h1>

              <p className="text-sm md:text-base text-[#374139] leading-relaxed max-w-xl">
                I’m a mechanical engineering BS/MS candidate at UCSB working at
                the intersection of soft materials, assistive devices, and
                single-use bioprocessing systems.
              </p>

              <div className="flex gap-2 flex-wrap">
                {["Assistive Devices", "Soft Interfaces", "Bioprocess Hardware"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[11px] uppercase tracking-wide rounded-full bg-[#0E6B54]/10 text-[#0E6B54] border border-[#0E6B54]/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* PORTRAIT CARD */}
            <Card className="max-w-xs mx-auto text-center">
              <div className="rounded-full overflow-hidden border border-[#D0D4CB] size-40 mx-auto">
                <img
                  src="/images/biography2.jpg"
                  alt="portrait"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 font-medium">{NAME}</div>
              <div className="text-xs text-[#5F6B62]">
                Honors BS/MS · Mechanical Engineering
              </div>
            </Card>
          </div>
        </SectionShell>

        {/* PROJECTS */}
        <SectionShell id="projects" label="Projects">
          <div className="space-y-16">
            {PROJECTS.map((p, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={p.id}
                  className={`grid items-center gap-10 ${
                    isEven
                      ? "md:grid-cols-[1.2fr,1fr]"
                      : "md:grid-cols-[1fr,1.2fr]"
                  }`}
                >
                  {/* TEXT CARD */}
                  <div className={isEven ? "" : "md:order-2"}>
                    <Card>
                      <div className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70">
                        {i + 1 < 10 ? `0${i + 1}` : i + 1} · Project
                      </div>
                      <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
                      <p className="text-sm text-[#57655B] mt-1">{p.subtitle}</p>
                      <p className="text-sm text-[#374139] mt-4 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="mt-4 flex gap-2 flex-wrap">
                        {p.meta.map((m) => (
                          <span
                            key={m}
                            className="px-2.5 py-1 text-[11px] rounded-full border bg-[#ECEEEB] border-[#D0D4CB] text-[#1A1F1A]/70"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* IMAGES */}
                  <div className={isEven ? "" : "md:order-1"}>
                    {p.img && (
                      <button
                        onClick={() => setSelectedImage(p.img)}
                        className="w-full"
                      >
                        <Card className="p-2">
                          <img
                            src={p.img}
                            className="rounded-xl border border-[#D0D4CB]"
                          />
                        </Card>
                      </button>
                    )}

                    {p.imgs && (
                      <div className="flex gap-3 overflow-x-auto">
                        {p.imgs.map((img) => (
                          <button
                            onClick={() => setSelectedImage(img)}
                            key={img}
                            className="min-w-[200px]"
                          >
                            <Card className="p-2">
                              <img
                                src={img}
                                className="rounded-xl border border-[#D0D4CB]"
                              />
                            </Card>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionShell>

        {/* EXPERIENCE SECTION */}
        <SectionShell id="experience" label="Experience">

          {/* ⭐ NEW: FEATURED SANISURE EXPERIENCE SECTION ⭐ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid gap-10 md:grid-cols-[1fr,1.1fr] items-center mb-16"
          >
            {/* TEXT */}
            <Card>
              <div className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70 mb-2">
                Featured Experience
              </div>

              <h3 className="text-xl font-semibold text-[#1A1F1A]">
                Bioprocess Hardware Engineering — SaniSure
              </h3>

              <p className="text-sm text-[#57655B] mt-1">
                Single-Use Cell Encapsulation & Mixing Systems
              </p>

              <p className="text-sm text-[#374139] mt-4 leading-relaxed">
                At SaniSure, I design and validate single-use bioprocessing
                assemblies used in cell-therapy manufacturing pipelines,
                including components for encapsulation, sterile mixing,
                pressure-decay testing, and resin compatibility workflows.
              </p>

              <ul className="mt-4 text-sm space-y-2 text-[#374139]">
                {[
                  "Designed tubing + connector + fitting assemblies for sterile fluid paths.",
                  "Performed pressure-decay leak testing to characterize engagement reliability.",
                  "Led teardown & FMEA analyses for mixing assemblies.",
                  "Built Power BI analytics for chemical compatibility & engagement testing.",
                ].map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[6px] h-[2px] w-4 bg-[#0E6B54]/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>

            {/* IMAGES */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() =>
                  setSelectedImage("/images/IMG_7857.jpg")
                }
              >
                <Card className="p-2">
                  <img
                    src="/images/IMG_7857.jpg"
                    className="rounded-xl border border-[#D0D4CB]"
                  />
                </Card>
              </button>

              <button
                onClick={() =>
                  setSelectedImage("/images/IMG_7995.jpg")
                }
              >
                <Card className="p-2">
                  <img
                    src="/images/IMG_7995.jpg"
                    className="rounded-xl border border-[#D0D4CB]"
                  />
                </Card>
              </button>
            </div>
          </motion.div>
          

          {/* Timeline of Remaining Experience */}
          <div className="space-y-6">
            {sortedExperience.map((exp) => (
              <Card key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-5 h-3 w-3 bg-[#0E6B54] rounded-full" />
                <div className="flex justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">{exp.role}</h3>
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
            ))}
          </div>
        </SectionShell>

        {/* EDUCATION */}
        <SectionShell id="education" label="Education">
          <Card>
            <h3 className="text-sm uppercase font-semibold text-[#0E6B54] tracking-[0.18em] mb-4">
              Educational Journey
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {EDUCATION.map((edu) => (
                <div key={edu.school} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#0E6B54]" />
                    <span className="text-sm font-medium">{edu.school}</span>
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
        </SectionShell>

        {/* BACKGROUND */}
        <SectionShell id="background" label="Background & Impact">
          <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">

            {/* Volunteering */}
            <Card>
              <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold mb-3">
                Volunteering & Leadership
              </h3>

              <div className="space-y-3 text-sm text-[#374139]">
                {EXTRAS.map((e) => (
                  <div key={e.title}>
                    <div className="font-medium text-[#1A1F1A]">
                      {e.title}
                    </div>
                    <div className="text-[13px] text-[#5F6B62]">
                      {e.text}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right column */}
            <div className="space-y-6">

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

            </div>
          </div>
        </SectionShell>

        {/* CONTACT */}
        <SectionShell id="contact" label="Contact">
          <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold">Let’s build something useful.</h3>
              <p className="text-sm text-[#374139] mt-2 max-w-md">
                I’m always excited to chat about assistive devices, soft mechanics,
                or bioprocess hardware.
              </p>
            </div>

            <div className="text-sm space-y-1">
              <p>
                Email:{" "}
                <a href="mailto:achevillotte@ucsb.edu" className="text-[#0E6B54] underline">
                  achevillotte@ucsb.edu
                </a>
              </p>
              <p>
                Phone: <span className="text-[#0E6B54]">+1 (914) 649-9132</span>
              </p>
            </div>
          </Card>
        </SectionShell>

        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </main>
    </>
  );
}

