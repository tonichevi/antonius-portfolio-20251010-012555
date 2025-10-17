"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css"; // Import the global CSS file

/* ---------- Blueprint background (no mouse effects) ---------- */
function BlueprintBG() {
  return <div className="fixed inset-0 -z-10 blueprint" />;
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
  { school: "University of California, Davis", line: "B.S. Mechanical Engineering", time: "Sep 2021 – Jun 2023", extras: ["Tau Beta Pi Engineering Honor Society", "Student Alumni Association", "CAAA Leadership Scholar"], gpa: "3.82/4.00" },
  { school: "Glendora High School", line: "High School Diploma", time: "Aug 2017 – Jun 2021", extras: ["National Honors Society", "Fruitfully Yours (FLY)", "LEO Club", "Varsity Tennis — 4× Student of the Semester"], gpa: "4.69/4.00 (Top 2%)" },
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
    return { top: sorted.slice(0, 3), bottom: sorted.slice(3) };
  }, []);

  const [tab, setTab] = useState("bio");
  const [selected, setSelected] = useState(null);
  const details = EXPERIENCE.find(e => e.id === selected);
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    { t: "Current: Star Rider III - Cause and Effect Vehicle for Disabled Children", h: "Developed an adaptive vehicle to enhance mobility for disabled children, focusing on cause-and-effect interaction.", m: ["UCSB", "2025"], img: "/images/StarRiderII.jpg" },
    { t: "URCA Steering System: An Analysis of Bearing Performance", h: "Conducted a detailed analysis of bearing performance to optimize steering system reliability.", m: ["URCA", "2025"], img: "/images/SteeringUrca.jpg" },
    { t: "Frog Jumper Project", h: "Designed a spring-loaded mechanism to simulate a frog's jumping motion for educational purposes.", m: ["UCSB", "2024"], img: "/images/Jumper.jpg" },
    { t: "SOLIDWORKS Projects", h: "A collection of designs including a 4-Beam TV holder and a FSAE steering wheel project, showcasing advanced CAD skills.", m: ["UCSB", "2024-2025"], imgs: ["/images/TVSketch.jpg", "/images/TV.jpg.png", "/images/SteeringWheel.jpg"] },
    { t: "Thermal Analysis Tool Development", h: "Created a custom tool for analyzing thermal performance in mechanical systems, integrating MATLAB for simulations.", m: ["UCSB", "2025"], img: "/images/ThermalTool.jpg" },
  ];
  const extras = [
    { o: "UCSB Formula SAE", d: "EV racecar design & build; extensive CAD; steering project focus." },
    { o: "Elementary School STEAM Volunteer", d: "Hands-on science & engineering sessions for 6th-grade students." },
    { o: "NASA Volunteer at UC Davis", d: "Generator teardown and efficiency comparisons." },
    { o: "Fruitfully Yours Vice President", d: "Co-founded nonprofit reducing food waste via fruit rescue. The impact left by this organization has attained the LA County Humanitarian Award, having saved 80k+lbs of fruit and helping 70k+ food insecure individuals." },
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
                {/* tiny "cog" icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m9.4 4a7.5 7.5 0 0 0-.3-1.7l2-1.6l-2-3.4l-2.4 1a
