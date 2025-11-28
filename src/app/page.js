"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

/* -----------------------------------------------------
   GLOBAL BACKGROUND
----------------------------------------------------- */

function LightBG() {
  return (
    <div className="fixed inset-0 -z-40 bg-[linear-gradient(to_bottom,#F6F7F4_0%,#ECEDE9_100%)]" />
  );
}

function BiotechGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-visible">
      <div className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(102,153,133,0.1),transparent_35%)] blur-3xl" />
      <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,107,84,0.4),transparent_60%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-16rem] h-[22rem] bg-[radial-gradient(ellipse_at_bottom,rgba(154,181,166,0.20),transparent_68%)] blur-2xl" />
    </div>
  );
}

/* -----------------------------------------------------
   INLINE ICONS (BIO + CIRCUIT + MECH)
----------------------------------------------------- */

function ProteinIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
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

function RNAIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
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

function DNAIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <path
          d="M20 10c6 6 18 6 24 0M20 54c6-6 18-6 24 0"
          strokeLinecap="round"
        />
        <path
          d="M20 10c-2 6-2 12 0 18s2 12 0 18"
          strokeLinecap="round"
        />
        <path
          d="M44 10c2 6 2 12 0 18s-2 12 0 18"
          strokeLinecap="round"
        />
        <path d="M24 18h8M32 18h8M24 32h8M32 32h8M24 46h8M32 46h8" />
      </g>
    </svg>
  );
}

function CircuitIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        <path d="M8 24h8l4-6 4 6 4-6 4 6 4-6 4 6h8" />
        <path d="M18 44l14-8v16l-14-8z" />
        <path d="M32 36h8M32 52h8M20 40h-6M20 48h-6M40 44h6" />
        <circle cx="8" cy="24" r="1.5" />
        <circle cx="56" cy="24" r="1.5" />
      </g>
    </svg>
  );
}

function GearIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="2.5" />
        <path d="M32 14v6M32 44v6M18 18l4.2 4.2M41.8 41.8L46 46M14 32h6M44 32h6M18 46l4.2-4.2M41.8 22.2L46 18" />
      </g>
    </svg>
  );
}

function CellIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <ellipse cx="32" cy="32" rx="20" ry="14" />
        <ellipse cx="32" cy="32" rx="8" ry="6" />
        <circle cx="35" cy="30" r="2" />
        <path d="M18 28c2 1 3 1 5 0m18 8c2 1 3 1 5 0M20 37c2 1 4 1 6 0" />
      </g>
    </svg>
  );
}

function SpringIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <path
          d="M18 18c4-4 8-4 12 0s8 4 12 0M18 30c4-4 8-4 12 0s8 4 12 0M18 42c4-4 8-4 12 0s8 4 12 0"
          strokeLinecap="round"
        />
        <path d="M14 18h4M46 18h4M14 42h4M46 42h4" />
      </g>
    </svg>
  );
}

function BoltIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <polygon points="28,10 40,10 44,18 40,26 24,26 20,18" />
        <rect x="26" y="26" width="12" height="18" />
        <path d="M26 44h12v4H26z" />
      </g>
    </svg>
  );
}

function PumpIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.9">
        <rect x="16" y="20" width="32" height="20" rx="4" />
        <circle cx="26" cy="30" r="5" />
        <path d="M36 24h6M36 30h6M36 36h6" />
        <path d="M16 30H8M48 30h8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function WaveIcon({ className, color = "#0E6B54" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        d="M6 38c6-8 10-8 16 0s10 8 16 0 10-8 16 0 10 8 16 0"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

/* -----------------------------------------------------
   MAP COMPONENTS
----------------------------------------------------- */

function CaliforniaMap({ className, activeId, onMarkerClick }) {
  // coords inside this SVG match California’s actual proportions
  const markers = [
    { id: "ucd", cx: 125, cy: 210 }, // Davis
    { id: "dressaire", cx: 140, cy: 360 }, // Santa Barbara
    { id: "sanisure", cx: 145, cy: 395 }, // Camarillo
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 400 800"   // ← correct aspect ratio, no distortion
      fill="none"
      stroke="#0E6B54"
      strokeWidth="6"
    >
      <path
        d="M 
           208 8 L 212 10 L 216 12 L 220 15 L 224 17 L 227 20 L 231 23 L 235 26 L 238 30 L 240 34 
           L 243 38 L 246 42 L 248 46 L 250 50 L 252 55 L 254 60 L 256 65 L 258 70 L 259 75 L 260 80 L 261 85 L 262 90 L 263 95 L 263 100 L 263 105 L 263 110 L 262 115 L 261 120 L 260 125 L 258 130 L 256 135 L 254 140 L 251 145 L 248 150 L 245 155 L 241 160 L 237 165 L 233 170 L 229 175 L 225 180 L 221 185 L 218 190 L 214 195 L 212 200 L 209 205 L 207 210 L 205 215 L 203 220 L 201 225 L 200 230 L 199 235 L 198 240 L 197 245 L 197 250 L 197 255 L 197 260 L 198 265 L 200 270 L 202 275 L 205 280 L 208 285 L 212 290 L 216 295 L 221 300 L 226 305 L 231 310 L 236 315 L 241 320 L 246 325 L 251 330 L 256 335 L 260 340 L 265 345 L 269 350 L 273 355 L 276 360 L 279 365 L 282 370 L 284 375 L 286 380 L 287 385 L 289 390 L 290 395 L 290 400 L 291 405 L 291 410 L 291 415 L 290 420 L 289 425 L 287 430 L 284 435 L 281 440 L 278 445 L 274 450 L 269 455 L 265 460 L 260 465 L 255 470 L 250 475 L 245 480 L 240 485 L 235 490 L 231 495 L 227 500 L 223 505 L 220 510 L 217 515 L 214 520 L 212 525 L 210 530 L 208 535 L 207 540 L 206 545 L 205 550 L 205 555 L 205 560 L 205 565 L 206 570 L 207 575 L 209 580 L 211 585 L 213 590 L 216 595 L 219 600 L 222 605 L 225 610 L 228 615 L 231 620 L 234 625 L 237 630 L 240 635 L 243 640 L 246 645 L 249 650 L 252 655 L 255 660 L 258 665 L 261 670 L 264 675 L 267 680 L 270 685 L 273 690 L 276 695 L 279 700 L 282 705 L 286 710 L 289 715 L 293 720 L 296 725 L 300 730 L 303 735 L 307 740 L 311 745 L 315 750 L 319 755 L 323 760 L 327 765 L 331 770 L 336 775 L 340 779 L 345 782 L 350 784 L 355 785 L 360 785 L 365 784 L 370 782 L 375 779 L 380 775 L 385 770 L 389 765 L 392 760 L 395 755 L 398 750 L 400 745 L 402 740 L 403 735 L 404 730 L 405 725 L 405 720 L 405 715 L 404 710 L 403 705 L 401 700 L 399 695 L 397 690 L 395 685 L 393 680 L 391 675 L 389 670 L 387 665 L 385 660 L 384 655 L 383 650 L 382 645 L 382 640 L 383 635 L 384 630 L 386 625 L 388 620 L 390 615 L 393 610 L 396 605 L 399 600 L 402 595 L 405 590 L 408 585 L 411 580 L 414 575 L 417 570 L 420 565 L 423 560 L 426 555 L 429 550 L 432 545 L 435 540 L 438 535 L 441 530 L 443 525 L 445 520 L 447 515 L 448 510 L 449 505 L 450 500 L 450 495 L 450 490 L 450 485 L 449 480 L 448 475 L 447 470 L 445 465 L 443 460 L 441 455 L 439 450 L 437 445 L 435 440 L 433 435 L 431 430 L 429 425 L 427 420 L 425 415 L 423 410 L 421 405 L 419 400 L 417 395 L 416 390 L 414 385 L 413 380 L 412 375 L 411 370 L 411 365 L 411 360 L 411 355 L 412 350 L 414 345 L 415 340 L 417 335 L 419 330 L 421 325 L 423 320 L 425 315 L 427 310 L 429 305 L 430 300 L 432 295 L 433 290 L 434 285 L 435 280 L 436 275 L 437 270 L 438 265 L 439 260 L 440 255 L 441 250 L 442 245 L 443 240 L 444 235 L 445 230 L 447 225 L 449 220 L 451 215 L 453 210 L 456 205 L 459 200 L 462 195 L 465 190 L 468 185 L 471 180 L 474 175 L 477 170 L 480 165 L 483 160 L 486 155 L 489 150 L 492 145 L 495 140 L 498 135 L 500 130 L 503 125 L 505 120 L 507 115 L 508 110 L 509 105 L 510 100 L 510 95 L 510 90 L 510 85 L 509 80 L 508 75 L 507 70 L 505 65 L 502 60 L 499 55 L 495 50 L 490 45 L 485 40 L 480 36 L 474 32 L 469 29 L 464 26 L 459 23 L 454 20 L 448 18 L 442 16 L 436 14 L 430 12 L 424 11 L 417 10 L 410 9 L 402 8 L 395 8 L 387 7 L 379 7 L 372 7 L 364 7 L 355 7 L 346 7 L 337 7 L 328 7 L 319 7 L 310 7 L
           301 7 L 292 7 L 283 7 L 274 7 L 265 7 L 256 7 L 247 7 L 238 7 L 229 7 L 220 7 L 211 7 Z"
      />

      {markers.map((m) => {
        const active = activeId === m.id;
        return (
          <g
            key={m.id}
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick(m.id);
            }}
            className="cursor-pointer"
          >
            <circle cx={m.cx} cy={m.cy} r={active ? 10 : 8} fill="#0E6B54" />
            <circle
              cx={m.cx}
              cy={m.cy}
              r={active ? 20 : 16}
              stroke="#0E6B54"
              strokeWidth="2"
              opacity="0.3"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}




function GermanyMap({ className, activeId, onMarkerClick }) {
  const markers = [
    { id: "audi", cx: 470, cy: 630 }, // Ingolstadt
  ];

  return (
    <svg
      viewBox="0 0 800 1200"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {/* TRUE Germany Outline */}
      <path
        d="
          M430 40 
          L480 70 L520 130 L560 160 L620 210 
          L610 260 L640 330 L660 380 L650 430 
          L670 480 L650 530 L660 590 L640 650 
          L600 700 L620 760 L600 820 L560 860 
          L540 920 L500 960 L480 1020 L450 1080 
          L420 1100 L380 1080 L340 1060 L300 1000 
          L260 960 L240 900 L230 840 L200 780 
          L210 720 L180 680 L170 630 L180 580 
          L160 520 L180 470 L170 420 L200 360 
          L220 300 L240 260 L260 210 L300 170 
          L340 130 L380 80 Z
        "
        fill="none"
        stroke="#0E6B54"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Experience marker(s) */}
      {markers.map((m) => {
        const active = activeId === m.id;
        return (
          <g
            key={m.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick(m.id);
            }}
          >
            <circle
              cx={m.cx}
              cy={m.cy}
              r={active ? 28 : 20}
              fill="#0E6B54"
            />
            <circle
              cx={m.cx}
              cy={m.cy}
              r={active ? 52 : 38}
              stroke="#0E6B54"
              strokeWidth="6"
              fill="none"
              opacity="0.25"
            />
          </g>
        );
      })}
    </svg>
  );
}


/* -----------------------------------------------------
   THEME CONFIG + FLOATING ICONS
----------------------------------------------------- */

const THEME_CONFIG = {
  overview: { iconColor: "#0E6B54" },
  projects: { iconColor: "#078F77" },
  experience: { iconColor: "#3D6B58" },
  education: { iconColor: "#0C6F87" },
  background: { iconColor: "#4C6057" },
  contact: { iconColor: "#B0713D" },
  default: { iconColor: "#0E6B54" },
};

function ThemedFloatingIcons({ theme, scrollDir, scrollSpeed }) {
  const config = THEME_CONFIG[theme] || THEME_CONFIG.default;
  const color = config.iconColor;

  let icons;
  switch (theme) {
    case "projects":
      icons = [ProteinIcon, RNAIcon, CircuitIcon, DNAIcon, PumpIcon, WaveIcon];
      break;
    case "experience":
      icons = [CircuitIcon, GearIcon, SpringIcon, BoltIcon, WaveIcon];
      break;
    case "education":
      icons = [RNAIcon, DNAIcon, ProteinIcon, CellIcon, WaveIcon];
      break;
    case "background":
      icons = [CellIcon, GearIcon, CircuitIcon, SpringIcon, DNAIcon];
      break;
    case "contact":
      icons = [GearIcon, CircuitIcon, WaveIcon];
      break;
    case "overview":
    default:
      icons = [CellIcon, GearIcon, ProteinIcon, CircuitIcon, DNAIcon];
      break;
  }

  const basePositions = [
    { top: "-8%", left: "-6%" },
    { top: "10%", right: "-8%" },
    { top: "38%", left: "-10%" },
    { top: "54%", right: "-10%" },
    { bottom: "-12%", left: "10%" },
    { bottom: "-8%", right: "12%" },
  ];

  const dirFactor = scrollDir === -1 ? -1 : 1;
  const speedFactor = 14 + scrollSpeed * 24;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
      {icons.map((Icon, idx) => {
        const pos = basePositions[idx % basePositions.length];
        const axis =
          theme === "experience" || (theme === "projects" && idx % 3 === 1)
            ? "x"
            : "y";
        const delta =
          (axis === "y" ? speedFactor : speedFactor * 0.6) *
          (idx % 2 === 0 ? dirFactor : -dirFactor);
        const duration = 20 + idx * 3;

        return (
          <motion.div
            key={`${theme}-${idx}`}
            className="absolute"
            style={pos}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 0.35, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9, delay: idx * 0.12, ease: "easeOut" }}
          >
            <motion.div
              animate={
                axis === "y" ? { y: [0, -delta, 0] } : { x: [0, delta, 0] }
              }
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-20 w-20 md:h-24 md:w-24" color={color} />
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

const EXPERIENCE_DETAILS = {
  dressaire: {
    role: "Fluid Dynamics Researcher",
    company: "Dressaire Lab · UCSB",
    period: "Oct 2025 – Present",
    location: "Santa Barbara, CA",
    bullets: [
      "Study capillary bridges in soft gels relevant to biomedical interfaces.",
      "Build fixtures to measure wetting, adhesion, and force–separation curves.",
    ],
  },
  sanisure: {
    role: "Design + R&D Intern",
    company: "SaniSure — R&D",
    period: "Jul 2025 – Present",
    location: "Camarillo, CA",
    bullets: [
      "Develop single-use bioprocessing assemblies for cell therapy manufacturing.",
      "Run pressure-decay leak tests and structured failure analysis.",
      "Refine SOPs and FMEAs with Fabrication and QA teams; create dashboards for chemical compatibility and department overview.",
    ],
  },
  ucd: {
    role: "Research Assistant · Calculus Tutor",
    company: "UC Davis · College of Engineering",
    period: "Jan 2023 – Jun 2023 (RA); Sep 2022 – Jun 2023 (Tutor)",
    location: "Davis, CA",
    bullets: [
      "Simulated projectile motion in C with parameter sweeps and experimental validation.",
      "Led one-on-one and small-group calculus tutoring (~5–10 hrs/week).",
    ],
  },
  audi: {
    role: "Requirements Engineering Intern",
    company: "AUDI AG — Technical Development",
    period: "Jan 2024 – Jun 2024",
    location: "Ingolstadt, Germany",
    bullets: [
      "Built KPI dashboards for Systems Requirements, improving traceability and visibility across vehicle programs.",
      "Collaborated with ~30 engineers across disciplines on specifications for next-generation vehicles.",
    ],
  },
};

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

function Card({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-[-4%] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),transparent_72%)] blur-2xl opacity-60" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionShell({
  id,
  label,
  theme = "default",
  scrollDir,
  scrollSpeed,
  verticalGradient = false,
  children,
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 py-20 space-y-10">
      {verticalGradient && (
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent_85%)] opacity-70" />
        </div>
      )}

      <ThemedFloatingIcons
        theme={theme}
        scrollDir={scrollDir}
        scrollSpeed={scrollSpeed}
      />

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

  const [scrollDir, setScrollDir] = useState(1);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  const [activeExperienceId, setActiveExperienceId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let ticking = false;

    const handleFrame = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (dy !== 0) {
        const dir = dy > 0 ? 1 : -1;
        const speed = Math.min(1, Math.abs(dy) / 120);
        setScrollDir(dir);
        setScrollSpeed(speed);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleFrame);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGlobalClick = () => {
    setActiveExperienceId(null);
  };

  const handleMarkerClick = (id) => {
    setActiveExperienceId((prev) => (prev === id ? null : id));
  };

  const activeExperience =
    activeExperienceId && EXPERIENCE_DETAILS[activeExperienceId];

  const activeMap =
    activeExperienceId === "audi" ? "de" : activeExperienceId ? "ca" : null;

  return (
    <>
      <LightBG />
      <BiotechGlow />

      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main
        className="relative min-h-screen text-[#1A1F1A]"
        onClick={handleGlobalClick}
      >
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
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-full hover:bg-[#E7EBE7] text-[#1A1F1A]/70 hover:text-[#0E6B54] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* HERO */}
        <SectionShell
          id="top"
          label="Overview"
          theme="overview"
          scrollDir={scrollDir}
          scrollSpeed={scrollSpeed}
          verticalGradient
        >
          <div className="grid md:grid-cols-[1.4fr,1fr] gap-10 items-center mt-6">
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
                    className="px-3 py-1 text-[11px] uppercase tracking-wide rounded-full bg-[#0E6B54]/10 text-[#0E6B54] border border-[#0E6B54]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeProps}>
              <Card className="max-w-xs mx-auto text-center px-0 py-0">
                <div className="size-40 mx-auto rounded-full overflow-hidden">
                  <img
                    src="/images/3C290D86-57BC-42DB-94D9-237783F922FB8R1A8362.jpeg"
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
        <SectionShell
          id="projects"
          label="Projects"
          theme="projects"
          scrollDir={scrollDir}
          scrollSpeed={scrollSpeed}
        >
          <div className="space-y-16 mt-6">
            {PROJECTS.map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.article
                  key={p.id}
                  {...fadeProps}
                  className={`grid items-center gap-10 md:gap-12 ${
                    isEven
                      ? "md:grid-cols-[1.2fr,1fr]"
                      : "md:grid-cols-[1fr,1.2fr]"
                  }`}
                >
                  <div className={isEven ? "" : "md:order-2"}>
                    <Card className="h-full flex flex-col justify-between px-0 md:pr-8">
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
                            className="px-2.5 py-1 text-[11px] rounded-full bg-[#ECEEEB] text-[#1A1F1A]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className={isEven ? "" : "md:order-1"}>
                    {p.img && (
                      <motion.img
                        src={p.img}
                        alt={p.title}
                        className="rounded-2xl object-cover w-full max-h-[360px] cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(p.img);
                        }}
                      />
                    )}
                    {p.imgs && (
                      <div className="flex gap-3 overflow-x-auto pb-1">
                        {p.imgs.map((img) => (
                          <motion.img
                            key={img}
                            src={img}
                            alt={p.title}
                            className="rounded-2xl object-cover cursor-pointer min-w-[240px] max-h-[240px]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(img);
                            }}
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

        {/* EXPERIENCE – MAP-BASED */}
       {/* EXPERIENCE – MAP-BASED */}
<SectionShell
  id="experience"
  label="Experience"
  theme="experience"
  scrollDir={scrollDir}
  scrollSpeed={scrollSpeed}
>
  <motion.div {...fadeProps} className="mt-6 relative pb-32">

    {/* NEW: Top Header */}
    <div className="text-center mb-10">
      <h3 className="text-sm uppercase tracking-[0.18em] text-[#0E6B54] font-semibold">
        Where I’ve Worked
      </h3>
      <p className="text-[11px] text-[#5F6B62] mt-1">
        Click a marker to see the story
      </p>
    </div>

    {/* TWO MAPS SIDE BY SIDE */}
    <div className="grid gap-10 md:grid-cols-2 items-start">

      {/* CALIFORNIA COLUMN */}
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70 mb-3">
          California
        </h4>

        <CaliforniaMap
          className="w-full max-w-sm"
          activeId={activeExperienceId === "audi" ? null : activeExperienceId}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* GERMANY COLUMN */}
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-xs uppercase tracking-[0.18em] text-[#0E6B54]/70 mb-3">
          Germany
        </h4>

        <GermanyMap
          className="w-full max-w-sm"
          activeId={activeExperienceId === "audi" ? "audi" : null}
          onMarkerClick={handleMarkerClick}
        />
      </div>

    </div>

    {/* EXPERIENCE CARD MODAL */}
    <AnimatePresence>
      {activeExperience && (
        <motion.div
          key={activeExperienceId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-auto absolute max-w-md"
          style={
            activeExperienceId === "audi"
              ? { right: "4%", bottom: "4%" }
              : { left: "4%", bottom: "4%" }
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rounded-3xl bg-white/96 shadow-[0_18px_45px_rgba(0,0,0,0.12)] border border-[#D0D4CB]/80 px-5 py-4 md:px-6 md:py-5">
      <div className="flex justify-between items-start gap-6">

  {/* LEFT TEXT BLOCK */}
  <div className="space-y-1">
    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0E6B54]/70">
      {activeMap === "ca" ? "California Experience" : "Germany Experience"}
    </div>

    {/* Title stays on one line */}
    <h4 className="text-base font-semibold text-[#1A1F1A] leading-snug whitespace-nowrap">
      {activeExperience.role}
    </h4>

    {/* Company stays tidy and never wraps weirdly */}
    <p className="text-xs text-[#57655B] leading-tight whitespace-nowrap">
      {activeExperience.company}
    </p>
  </div>

  {/* RIGHT METADATA BLOCK */}
  <div className="text-[11px] text-right text-[#5F6B62] leading-tight whitespace-nowrap">
    <div>{activeExperience.period}</div>
    <div>{activeExperience.location}</div>
  </div>
</div>


            <ul className="mt-3 space-y-1.5 text-sm text-[#374139]">
              {activeExperience.bullets.map((b, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[7px] h-[2px] w-4 bg-[#0E6B54]/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
</SectionShell>

        {/* EDUCATION */}
        <SectionShell
          id="education"
          label="Education"
          theme="education"
          scrollDir={scrollDir}
          scrollSpeed={scrollSpeed}
          verticalGradient
        >
          <motion.div {...fadeProps} className="mt-6">
            <h3 className="text-sm uppercase font-semibold text-[#0E6B54] tracking-[0.18em] mb-6">
              Educational Journey
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
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
              ].map((edu) => (
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
          </motion.div>
        </SectionShell>

        {/* BACKGROUND & IMPACT */}
        <SectionShell
          id="background"
          label="Background & Impact"
          theme="background"
          scrollDir={scrollDir}
          scrollSpeed={scrollSpeed}
        >
          <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-start mt-6">
            <motion.div {...fadeProps}>
              <Card className="px-6 py-6">
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

            <div className="space-y-6">
              <motion.div {...fadeProps}>
                <Card className="px-6 py-6">
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
                <Card className="px-6 py-6">
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
                <Card className="px-6 py-6">
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
        <SectionShell
          id="contact"
          label="Contact"
          theme="contact"
          scrollDir={scrollDir}
          scrollSpeed={scrollSpeed}
        >
          <motion.div {...fadeProps} className="mt-6">
            <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 py-6">
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
                    onClick={(e) => e.stopPropagation()}
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







