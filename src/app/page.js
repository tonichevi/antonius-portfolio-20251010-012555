"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -----------------------------------------------------
   DATA
----------------------------------------------------- */

const NAME = "Toni Chevillotte";
const PROFILE_IMAGE =
  "/images/3C290D86-57BC-42DB-94D9-237783F922FB8R1A8362.jpeg";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    id: "musical-chair",
    title: "BanGO — Cause & Effect Vehicle",
    subtitle: "Therapeutic device for children with Cerebral Palsy (CP)",
    summary:
      "A clinic-friendly assistive vehicle that lets children initiate motion through a guitar-inspired sensor, playful sound feedback, and accessible controls.",
    description:
      "This year-long project was completed in June 2026 as part of my Senior Capstone Project at the University of California, Santa Barbara. BanGO is a cause-and-effect vehicle designed for therapeutic use only that lets children with cerebral palsy initiate motion independently through different sensing technologies. I focused on the design and electronic integration of the vehicle, with most of my prototyping centered on a guitar-based sensor that translates mechanical vibration into an electrical signal to move the vehicle while playing sound.",
    details: [
      "Input: the child taps or strums one of the guitar strings.",
      "Outputs: the vehicle moves in the desired direction and one of three encoded MP3 files is selected from the onboard MP3 player module.",
      "Manufacturing: the guitar sensor housing was custom-designed in SOLIDWORKS and 3D printed.",
      "Electronics: vibration is converted into a weak AC electrical signal using a transducer beneath the strings, then passed through custom rectifier and amplifier circuitry on a PCB inside the housing.",
      "Control: an Arduino Nano outputs a binary signal to an Arduino Mega motor-driver system and also controls the MP3 player, speaker, volume buttons, and favorite-track behavior.",
      "Interaction: the favorite button allows a user to lock a track in place and resume the song from where it last stopped. Each sound plays in five-second windows.",
    ],
    meta: ["UCSB Capstone", "2025–2026", "Assistive Technology"],
    images: ["/images/StarRiderII.jpg"],
  },
  {
    id: "sanisure-bioprocess",
    title: "Single-Use Bioprocess Assemblies — SaniSure",
    subtitle: "Tubing, connectors, and encapsulation hardware for cell therapy",
    summary:
      "Single-use fluid-path hardware for cell-therapy manufacturing, built around leak integrity, manufacturability, and closed-process reliability.",
    description:
      "Designed and validated single-use fluid paths used in cell-therapy manufacturing, including tubing–connector–fitting assemblies, encapsulation rigs, and pressure-decay test systems. My work focused on leak integrity, manufacturability, documentation, and repeatable test methods for bioprocess hardware.",
    details: [
      "Developed and refined tubing, connector, fitting, and encapsulation assemblies.",
      "Supported pressure-decay leak testing and failure-analysis workflows.",
      "Worked across R&D, fabrication, and quality to improve documentation and design transfer.",
    ],
    meta: ["SaniSure", "2025–", "Bioprocess Hardware"],
    images: ["/images/IMG_7857.jpg", "/images/IMG_7995.jpg"],
  },
  {
    id: "dressaire-lab",
    title: "Capillary Bridge Testing on Experimental Gel — Dressaire Lab",
    subtitle: "Tensile testing of viscoelastic gels for cystic-fibrosis applications",
    summary:
      "A soft-matter research platform for measuring capillary adhesion, wetting, and force–separation behavior on experimental gels.",
    description:
      "Designed and built an instrumented fixture in the Dressaire Lab to quantify wetting and capillary adhesion of soft-gel capillary bridges for cystic-fibrosis airway-clearance lubricant concepts. The project connects mechanical testing, image analysis, and biointerface design.",
    details: [
      "Measured contact angles, meniscus curvature, pull-off behavior, and force–separation curves.",
      "Built an image-analysis pipeline to extract bridge geometry and compare gel conditions.",
      "Focused on how soft, viscoelastic surfaces alter wetting and adhesion compared with rigid substrates.",
    ],
    meta: ["Dressaire Lab", "2025–", "Biointerfaces / Soft Matter"],
    images: [
      "/images/DressaireLabSetup.JPG",
      "/images/DressaireLabImage1.jpg",
      "/images/DressaireGel.jpeg",
    ],
  },
  {
    id: "frog",
    title: "Frog Jumper Mechanism",
    subtitle: "Teaching dynamics through playful hardware",
    summary:
      "A spring-loaded mechanism that turns stored elastic energy into a repeatable jump using simple, accessible materials.",
    description:
      "Designed a spring-loaded mechanism that converts stored elastic potential energy into a repeatable jump. The mechanism was built using zip ties, popsicle sticks, a 5V battery, rubber bands, and a high-torque, low-speed motor.",
    details: [
      "Demonstrated energy storage, release, and mechanical timing through a hands-on build.",
      "Used constrained materials to keep the mechanism simple, playful, and teachable.",
    ],
    meta: ["UCSB", "2025", "Mechanisms"],
    images: ["/images/IMG_9483.JPG", "/images/Jumper.jpg"],
  },
  {
    id: "urca-steering",
    title: "URCA Steering System — Bearing Performance Study",
    subtitle: "Quantifying steering feel and reliability",
    summary:
      "A steering-system study focused on bearing configuration, torque behavior, and reliability for an undergraduate competition vehicle.",
    description:
      "Analyzed bearing configurations for an undergraduate competition vehicle. Built steering-torque models and validated them experimentally to recommend a low-maintenance bearing stack-up.",
    details: [
      "Compared bearing arrangements for steering feel, reliability, and maintainability.",
      "Combined modeling with experimental validation to support a final design recommendation.",
    ],
    meta: ["URCA", "2025", "Vehicle Dynamics"],
    images: ["/images/SteeringUrca.jpg"],
  },
  {
    id: "solidworks",
    title: "SOLIDWORKS Design Set",
    subtitle: "TV mount, steering wheel, truss bridge, and more",
    summary:
      "A CAD and FEA collection spanning structural design, ergonomic hardware, vehicle components, and experimental mobility concepts.",
    description:
      "Collection of CAD and FEA projects including a stiffness-optimized TV mount, an ergonomic FSAE steering wheel, a truss bridge exposed to loading in an FEA simulation, and an experimental off-road skateboard.",
    details: [
      "Modeled assemblies and components with manufacturability and structural performance in mind.",
      "Used FEA and design iteration to explore stiffness, loading, and geometry tradeoffs.",
    ],
    meta: ["UCSB", "2024–2025", "CAD / FEA"],
    images: [
      "/images/TVSketch.jpg",
      "/images/SteeringWheel.jpg",
      "/images/BridgeTrussFEA.JPG",
      "/images/SkateboardCAD.jpg",
    ],
  },
  {
    id: "sanisure-dash",
    title: "SaniSure Power BI Dashboards",
    subtitle: "Bioprocess analytics at scale",
    summary:
      "R&D and quality dashboards for chemical compatibility, engagement testing, and design-pipeline visibility.",
    description:
      "Dashboards used across R&D and Quality for engagement testing, chemical compatibility, and throughput tracking across design pipelines.",
    details: [
      "Built views for chemical compatibility and material-engagement tracking.",
      "Helped translate engineering and quality data into faster design-review workflows.",
    ],
    meta: ["SaniSure", "2025–", "Data & Tools"],
    images: [
      "/images/ChemicalFilters.jpg",
      "/images/Material Engagement Check.jpg",
    ],
  },
];

const EXPERIENCE = [
  {
    id: "dressaire",
    role: "Fluid Dynamics Researcher",
    company: "Dressaire Lab · UCSB",
    period: "Oct 2025 – Present",
    location: "Santa Barbara, CA",
    summary:
      "Soft-matter research on capillary bridges, wetting, adhesion, and experimental gels for biomedical interfaces.",
    bullets: [
      "Study capillary bridges in soft gels relevant to biomedical interfaces.",
      "Build fixtures to measure wetting, adhesion, and force–separation curves.",
      "Connect experimental mechanics and image analysis to soft-material behavior.",
    ],
  },
  {
    id: "sanisure",
    role: "Design + R&D Intern",
    company: "SaniSure — R&D",
    period: "Jul 2025 – Present",
    location: "Camarillo, CA",
    summary:
      "Single-use bioprocessing hardware, pressure-decay testing, structured failure analysis, SOPs, FMEAs, and R&D dashboards.",
    bullets: [
      "Develop single-use bioprocessing assemblies for cell-therapy manufacturing.",
      "Run pressure-decay leak tests and structured failure analysis.",
      "Refine SOPs and FMEAs with Fabrication and QA teams.",
      "Create dashboards for chemical compatibility and department overview.",
    ],
  },
  {
    id: "audi",
    role: "Requirements Engineering Intern",
    company: "AUDI AG — Technical Development",
    period: "Jan 2024 – Jun 2024",
    location: "Ingolstadt, Germany",
    summary:
      "Requirements engineering, KPI pipelines, and early-stage prototyping inside vehicle-development programs.",
    bullets: [
      "Built KPI dashboards for Systems Requirements, improving traceability and visibility across vehicle programs.",
      "Collaborated with roughly 30 engineers across disciplines on specifications for next-generation vehicles.",
      "Supported early-stage prototyping and structured technical-development workflows.",
    ],
  },
  {
    id: "ucd",
    role: "Research Assistant · Calculus Tutor",
    company: "UC Davis · College of Engineering",
    period: "Jan 2023 – Jun 2023; Sep 2022 – Jun 2023",
    location: "Davis, CA",
    summary:
      "C programming for projectile-motion simulations and one-on-one calculus support for engineering students.",
    bullets: [
      "Simulated projectile motion in C with parameter sweeps and experimental validation.",
      "Led one-on-one and small-group calculus tutoring for about 5–10 hours per week.",
    ],
  },
];

const EDUCATION = [
  {
    school: "UC Santa Barbara",
    line: "Honors BS/MS Mechanical Engineering",
    time: "Jun 2023 – Jun 2027",
    gpa: "3.82",
    extras: ["Honors College", "Tau Beta Pi", "Formula SAE", "Dressaire Lab"],
  },
  {
    school: "University of California, Davis",
    line: "B.S. Mechanical Engineering",
    time: "Sep 2021 – Jun 2023",
    gpa: "3.82/4.00",
    extras: ["Student Alumni Association", "CAAA Leadership Scholar"],
  },
  {
    school: "Glendora High School",
    line: "High School Diploma",
    time: "Aug 2017 – Jun 2021",
    gpa: "4.69/4.00 · Top 2%",
    extras: ["National Honor Society", "Varsity Tennis", "AP Capstone Diploma"],
  },
];

const EXTRAS = [
  {
    title: "UCSB Formula SAE",
    text: "EV racecar design and steering-system development.",
  },
  {
    title: "Fruitfully Yours — Vice President",
    text: "Co-founded a nonprofit rescuing 80k+ lbs of fruit and supporting about 70k food-insecure individuals.",
  },
  {
    title: "NASA Volunteer",
    text: "Generator teardown and efficiency benchmarking.",
  },
  {
    title: "Assistive Technology Club",
    text: "Co-founded a UCSB club developing VR-based early screening tools for Alzheimer’s.",
  },
  {
    title: "Elementary STEAM Volunteer",
    text: "Hands-on science workshops for 6th-grade students.",
  },
];

const HONORS = [
  "6× Dean’s Honors List at UCD and UCSB.",
  "AP Capstone Diploma.",
  "Glendora Kiwanis Community Service Award.",
  "Tartan Achievement Award.",
];

const CERTS = [
  "Entrepreneurship Specialization — Wharton.",
  "Oil & Gas Markets — Duke.",
  "Statistics & R Specialization — HarvardX.",
];

const LANGS = ["English — Native", "German — Native", "French — Elementary"];

/* -----------------------------------------------------
   ANIMATION + VIEW HELPERS
----------------------------------------------------- */

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const VIEWS = NAV_ITEMS.map((item) => item.id);

function normalizeHash() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "").trim();
  return VIEWS.includes(hash) ? hash : "home";
}

/* -----------------------------------------------------
   REUSABLE UI
----------------------------------------------------- */

function Background() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#F6F7F3]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(239,242,236,0.94)_52%,rgba(228,234,226,0.96)_100%)]" />
      <div className="absolute left-[-12rem] top-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[#0E6B54]/10 blur-3xl" />
      <div className="absolute right-[-14rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[#7EA48E]/20 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
    </div>
  );
}

function Pill({ children, tone = "green" }) {
  const toneClass =
    tone === "dark"
      ? "bg-[#1A1F1A] text-white border-[#1A1F1A]"
      : "bg-white/60 text-[#0E6B54] border-[#0E6B54]/20";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.13em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

function SoftCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/100 bg-white/60 shadow-[0_24px_70px_rgba(22,45,33,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const styles =
    variant === "primary"
      ? "bg-[#0E6B54] text-white hover:bg-[#0B5A47] shadow-[0_10px_28px_rgba(14,107,84,0.22)]"
      : variant === "ghost"
        ? "bg-transparent text-[#0E6B54] hover:bg-[#0E6B54]/10"
        : "bg-white/70 text-[#1A1F1A] border border-[#DDE3DA] hover:bg-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#151A15] md:text-5xl">
        {title}
      </h1>
      {text && (
        <p className="mt-4 text-sm leading-7 text-[#536058] md:text-base">
          {text}
        </p>
      )}
    </motion.div>
  );
}

function Header({ view, navigateTo }) {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[#F6F7F3]/100 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => navigateTo("home")}
          className="flex min-w-fit items-center gap-3 text-left"
          aria-label="Go to homepage"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E6B54] text-sm font-semibold text-white">
            TC
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-[#0E6B54]">
              {NAME}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-[#657169]">
              Mechanics × Biology
            </span>
          </span>
        </button>

        <nav className="flex flex-1 justify-end overflow-x-auto">
          <div className="flex items-center gap-1 rounded-full border border-white/100 bg-white/60 p-1 shadow-sm">
            {NAV_ITEMS.map((item) => {
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition md:px-4 ${
                    active
                      ? "bg-[#0E6B54] text-white shadow-sm"
                      : "text-[#4E5B53] hover:bg-[#EEF2EB] hover:text-[#0E6B54]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <Button
          onClick={handlePrint}
          variant="secondary"
          className="hidden text-xs md:inline-flex"
        >
          Download PDF
        </Button>
      </div>
    </header>
  );
}

function ImageModal({ selectedImage, onClose }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            src={selectedImage}
            alt="Expanded portfolio visual"
            className="max-h-[84vh] max-w-[92vw] rounded-[1.5rem] bg-white object-contain shadow-2xl"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImageCluster({ images, title, onImageClick, largeFirst = false }) {
  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <button
        type="button"
        onClick={() => onImageClick(images[0])}
        className="group block w-full overflow-hidden rounded-[1.75rem] bg-[#E4E9E2]"
      >
        <img
          src={images[0]}
          alt={title}
          className="h-full max-h-[420px] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
        />
      </button>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          onClick={() => onImageClick(image)}
          className={`${
            largeFirst && index === 0 ? "sm:col-span-2" : ""
          } group overflow-hidden rounded-[1.5rem] bg-[#E4E9E2]`}
        >
          <img
            src={image}
            alt={`${title} ${index + 1}`}
            className="h-56 w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </button>
      ))}
    </div>
  );
}

/* -----------------------------------------------------
   HOME VIEW
----------------------------------------------------- */

function Hero({ navigateTo }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.05fr,0.95fr] md:px-6">
      <motion.div {...fadeIn} className="space-y-7">
        <div className="flex flex-wrap gap-2">
          <Pill>Mechanical Engineering</Pill>
          <Pill>Bioprocess Hardware</Pill>
          <Pill>Soft Interfaces</Pill>
        </div>

        <div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-[#111611] md:text-7xl lg:text-8xl">
            Building patient-first systems where mechanics meet biology.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#526158] md:text-lg">
            I’m a Masters of Bioprocess Engineering (MBPE) student at the Unversity of California, Berkeley working across
            assistive devices, soft-material interfaces, and single-use
            bioprocessing systems for cell-therapy manufacturing. 
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigateTo("projects")}>Explore work</Button>
          <Button onClick={() => navigateTo("contact")} variant="secondary">
            Contact
          </Button>
        </div>
      </motion.div>

      <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }}>
        <SoftCard className="relative mx-auto max-w-[31rem] overflow-hidden p-4">
          <div className="absolute inset-x-10 top-8 h-52 rounded-full bg-[#0E6B54]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.65rem] bg-[#E8ECE5]">
            <img
              src={PROFILE_IMAGE}
              alt={NAME}
              className="h-[32rem] w-full object-cover"
            />
          </div>
          <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/70 p-4">
              <div className="text-2xl font-semibold text-[#0E6B54]">
                BS
              </div>
              <div className="mt-1 text-xs text-[#647067]">
                Mechanical Engineering - University of California, Santa Barbara
              </div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <div className="text-2xl font-semibold text-[#0E6B54]">R&D</div>
              <div className="mt-1 text-xs text-[#647067]">
                Bioprocess Systems
              </div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <div className="text-2xl font-semibold text-[#0E6B54]">UC Berkeley</div>
              <div className="mt-1 text-xs text-[#647067]">
                Master of Bioprocess Engineering
              </div>
            </div>
          </div>
        </SoftCard>
      </motion.div>
    </section>
  );
}

function ShowcasePanel({
  label,
  title,
  text,
  image,
  actionLabel,
  onAction,
  reverse = false,
  children,
}) {
  return (
    <motion.article
      {...fadeIn}
      className="grid min-h-[34rem] overflow-hidden rounded-[2.3rem] border border-white/100 bg-white/60 shadow-[0_28px_80px_rgba(22,45,33,0.08)] backdrop-blur-xl md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-center p-8 md:p-12 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
          {label}
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-[#151A15] md:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#536058] md:text-base">
          {text}
        </p>
        {children && <div className="mt-6">{children}</div>}
        <div className="mt-7">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      </div>

      <div
        className={`relative min-h-[22rem] bg-[#E6EBE4] ${
          reverse ? "md:order-1" : ""
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.86),transparent_48%)]" />
        {image ? (
          <img
            src={image}
            alt={title}
            className="relative h-full w-full object-contain p-6 md:p-10"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center p-10 text-center text-[#0E6B54]">
            <span className="text-7xl font-semibold tracking-[-0.06em]">
              {label.slice(0, 2)}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function HomeView({ navigateTo }) {
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      <Hero navigateTo={navigateTo} />

      <section className="mx-auto max-w-7xl space-y-5 px-4 pb-20 md:px-6">
        <motion.div {...fadeIn} className="mx-auto max-w-3xl pb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
            Overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#151A15] md:text-5xl">
            A cleaner homepage. Deeper pages when you want them.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#536058] md:text-base">
            The homepage now gives a fast, visual scan of each portfolio
            category. The top navigation and Learn More buttons open focused
            detail views instead of forcing everything into one long scroll.
          </p>
        </motion.div>

        <ShowcasePanel
          label="Projects"
          title="Assistive devices, soft interfaces, and bioprocess hardware."
          text="Selected work ranges from a cause-and-effect therapeutic vehicle to capillary bridge testing on experimental gels and single-use cell-therapy manufacturing hardware."
          image="/images/StarRiderII.jpg"
          actionLabel="Learn more about projects"
          onAction={() => navigateTo("projects")}
        >
          <div className="grid gap-2 sm:grid-cols-3">
            {featured.map((project) => (
              <div key={project.id} className="rounded-2xl bg-white/70 p-4">
                <div className="text-sm font-semibold text-[#151A15]">
                  {project.title}
                </div>
                <div className="mt-1 text-xs leading-5 text-[#647067]">
                  {project.summary}
                </div>
              </div>
            ))}
          </div>
        </ShowcasePanel>

        <ShowcasePanel
          label="Experience"
          title="R&D experience across biotech hardware, research, and automotive systems."
          text="A compact timeline gives the story at a glance; the full view expands each role into responsibilities, context, and technical focus areas."
          image="/images/IMG_7857.jpg"
          actionLabel="View experience"
          onAction={() => navigateTo("experience")}
          reverse
        >
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE.slice(0, 3).map((item) => (
              <Pill key={item.id}>{item.company.split("—")[0].trim()}</Pill>
            ))}
          </div>
        </ShowcasePanel>

        <div className="grid gap-5 lg:grid-cols-3">
          <motion.div {...fadeIn}>
            <SoftCard className="flex h-full flex-col justify-between overflow-hidden p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E6B54]/70">
                  Education
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#151A15]">
                  UCSB, UC Davis, and engineering fundamentals.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#536058]">
                  A focused academic path in mechanical engineering, honors
                  coursework, design teams, and research.
                </p>
              </div>
              <Button
                onClick={() => navigateTo("education")}
                className="mt-7 w-fit"
              >
                Learn more
              </Button>
            </SoftCard>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.06 }}
          >
            <SoftCard className="flex h-full flex-col justify-between overflow-hidden p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E6B54]/70">
                  Background
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#151A15]">
                  Leadership, service, languages, and honors.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#536058]">
                  A concise view of the activities and recognitions that sit
                  outside the main technical work.
                </p>
              </div>
              <Button
                onClick={() => navigateTo("background")}
                className="mt-7 w-fit"
              >
                Learn more
              </Button>
            </SoftCard>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.12 }}
          >
            <SoftCard className="flex h-full flex-col justify-between overflow-hidden p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E6B54]/70">
                  Contact
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#151A15]">
                  Let’s build something useful.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#536058]">
                  A direct, minimal contact page for collaborations, research
                  conversations, and portfolio follow-up.
                </p>
              </div>
              <Button
                onClick={() => navigateTo("contact")}
                className="mt-7 w-fit"
              >
                Get in touch
              </Button>
            </SoftCard>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------
   DETAIL VIEWS
----------------------------------------------------- */

function DetailFrame({ children, backLabel = "Back to overview", navigateTo }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <Button
        onClick={() => navigateTo("home")}
        variant="ghost"
        className="mb-10"
      >
        ← {backLabel}
      </Button>
      {children}
    </section>
  );
}

function ProjectsView({ navigateTo, onImageClick }) {
  return (
    <DetailFrame navigateTo={navigateTo}>
      <SectionIntro
        eyebrow="Projects"
        title="Selected engineering work"
        text="Each project keeps the deeper content available, but the detail page is structured into cards, tags, images, and concise bullets rather than one continuous block of text."
      />

      <div className="mt-12 space-y-7">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            {...fadeIn}
            className="overflow-hidden rounded-[2.2rem] border border-white/100 bg-white/60 shadow-[0_22px_70px_rgba(22,45,33,0.08)] backdrop-blur-xl"
          >
            <div
              className={`grid gap-0 lg:grid-cols-[0.92fr,1.08fr] ${
                index % 2 ? "lg:grid-cols-[1.08fr,0.92fr]" : ""
              }`}
            >
              <div className={`p-5 ${index % 2 ? "lg:order-2" : ""}`}>
                <ImageCluster
                  images={project.images}
                  title={project.title}
                  onImageClick={onImageClick}
                  largeFirst
                />
              </div>

              <div
                className={`flex flex-col justify-center p-7 md:p-10 ${
                  index % 2 ? "lg:order-1" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="dark">{String(index + 1).padStart(2, "0")}</Pill>
                  {project.meta.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#151A15] md:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-[#0E6B54] md:text-base">
                  {project.subtitle}
                </p>
                <p className="mt-5 text-sm leading-7 text-[#536058] md:text-base">
                  {project.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#425047]">
                  {project.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#0E6B54]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </DetailFrame>
  );
}

function ExperienceView({ navigateTo }) {
  return (
    <DetailFrame navigateTo={navigateTo}>
      <SectionIntro
        eyebrow="Experience"
        title="Technical roles across research and industry"
        text="A minimal timeline that preserves the core details from the original map-based experience section while making it easier to skim."
      />

      <div className="relative mt-14">
        <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-[#0E6B54]/20 md:block" />
        <div className="space-y-5">
          {EXPERIENCE.map((item, index) => (
            <motion.article
              key={item.id}
              {...fadeIn}
              className="relative grid gap-5 rounded-[2rem] border border-white/100 bg-white/60 p-6 shadow-[0_20px_60px_rgba(22,45,33,0.07)] backdrop-blur-xl md:grid-cols-[0.34fr,0.66fr] md:p-8 md:pl-12"
            >
              <div className="absolute left-[0.8rem] top-9 hidden h-3 w-3 rounded-full bg-[#0E6B54] ring-8 ring-[#F6F7F3] md:block" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E6B54]/70">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-[#151A15]">
                  {item.role}
                </h2>
                <p className="mt-1 text-sm text-[#536058]">{item.company}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.13em] text-[#68746C]">
                  {item.period}
                </p>
                <p className="mt-1 text-sm text-[#536058]">{item.location}</p>
              </div>
              <div>
                <p className="text-sm leading-7 text-[#536058] md:text-base">
                  {item.summary}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#425047]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#0E6B54]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </DetailFrame>
  );
}

function EducationView({ navigateTo }) {
  return (
    <DetailFrame navigateTo={navigateTo}>
      <SectionIntro
        eyebrow="Education"
        title="Academic foundation"
        text="A cleaner academic overview with the main programs, dates, GPA context, and associated activities."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {EDUCATION.map((edu, index) => (
          <motion.article
            key={edu.school}
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: index * 0.06 }}
          >
            <SoftCard className="h-full p-7">
              <Pill tone="dark">{String(index + 1).padStart(2, "0")}</Pill>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#151A15]">
                {edu.school}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#0E6B54]">
                {edu.line}
              </p>
              <p className="mt-5 text-sm text-[#536058]">{edu.time}</p>
              <p className="mt-1 text-sm text-[#536058]">GPA: {edu.gpa}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {edu.extras.map((extra) => (
                  <Pill key={extra}>{extra}</Pill>
                ))}
              </div>
            </SoftCard>
          </motion.article>
        ))}
      </div>
    </DetailFrame>
  );
}

function BackgroundView({ navigateTo }) {
  return (
    <DetailFrame navigateTo={navigateTo}>
      <SectionIntro
        eyebrow="Background"
        title="Leadership, service, honors, and languages"
        text="The supporting material now lives in one focused area instead of being another long homepage section."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div {...fadeIn}>
          <SoftCard className="p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
              Volunteering & Leadership
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {EXTRAS.map((item) => (
                <div key={item.title} className="rounded-3xl bg-white/60 p-5">
                  <h3 className="text-base font-semibold text-[#151A15]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#536058]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </SoftCard>
        </motion.div>

        <div className="space-y-5">
          <ListCard title="Honors & Awards" items={HONORS} />
          <ListCard title="Licenses & Certifications" items={CERTS} />
          <ListCard title="Languages" items={LANGS} />
        </div>
      </div>
    </DetailFrame>
  );
}

function ListCard({ title, items }) {
  return (
    <motion.div {...fadeIn}>
      <SoftCard className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
          {title}
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-[#425047]">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#0E6B54]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SoftCard>
    </motion.div>
  );
}

function ContactView({ navigateTo }) {
  return (
    <DetailFrame navigateTo={navigateTo}>
      <section className="grid min-h-[calc(100vh-15rem)] items-center gap-8 lg:grid-cols-[1fr,0.9fr]">
        <motion.div {...fadeIn}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6B54]/70">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-[#151A15] md:text-6xl">
            Let’s build something useful.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#536058] md:text-lg">
            Always excited to chat about assistive devices, bioprocess hardware,
            and cell-therapy systems that restore autonomy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:achevillotte@ucsb.edu"
              className="inline-flex items-center justify-center rounded-full bg-[#0E6B54] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(14,107,84,0.22)] transition hover:bg-[#0B5A47]"
            >
              Email me
            </a>
            <a
              href="tel:+19146499132"
              className="inline-flex items-center justify-center rounded-full border border-[#DDE3DA] bg-white/70 px-5 py-3 text-sm font-medium text-[#1A1F1A] transition hover:bg-white"
            >
              Call
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.08 }}
        >
          <SoftCard className="overflow-hidden p-5">
            <div className="overflow-hidden rounded-[1.7rem] bg-[#E4E9E2]">
              <img
                src={PROFILE_IMAGE}
                alt={NAME}
                className="h-[24rem] w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#151A15]">{NAME}</h2>
              <p className="mt-1 text-sm text-[#536058]">
                Honors BS/MS · Mechanical Engineering, UCSB
              </p>
              <div className="mt-5 space-y-2 text-sm text-[#425047]">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:achevillotte@ucsb.edu"
                    className="font-medium text-[#0E6B54] underline underline-offset-4"
                  >
                    achevillotte@ucsb.edu
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-medium text-[#0E6B54]">
                    +1 (914) 649-9132
                  </span>
                </p>
              </div>
            </div>
          </SoftCard>
        </motion.div>
      </section>
    </DetailFrame>
  );
}

/* -----------------------------------------------------
   PAGE
----------------------------------------------------- */

export default function Page() {
  const [view, setView] = useState("home");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const syncFromHash = () => setView(normalizeHash());
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const navigateTo = (nextView) => {
    const safeView = VIEWS.includes(nextView) ? nextView : "home";
    setView(safeView);

    if (typeof window !== "undefined") {
      const nextUrl =
        safeView === "home" ? window.location.pathname : `#${safeView}`;
      window.history.pushState(null, "", nextUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  let renderedView;

  switch (view) {
    case "projects":
      renderedView = (
        <ProjectsView
          navigateTo={navigateTo}
          onImageClick={setSelectedImage}
        />
      );
      break;
    case "experience":
      renderedView = <ExperienceView navigateTo={navigateTo} />;
      break;
    case "education":
      renderedView = <EducationView navigateTo={navigateTo} />;
      break;
    case "background":
      renderedView = <BackgroundView navigateTo={navigateTo} />;
      break;
    case "contact":
      renderedView = <ContactView navigateTo={navigateTo} />;
      break;
    case "home":
    default:
      renderedView = <HomeView navigateTo={navigateTo} />;
      break;
  }

  return (
    <>
      <Background />
      <main className="min-h-screen text-[#151A15]">
        <Header view={view} navigateTo={navigateTo} />
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderedView}
          </motion.div>
        </AnimatePresence>
      </main>
      <ImageModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}





