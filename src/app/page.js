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

  const bioPic = "/images/biography.jpg"; // Updated path to include the images subdirectory
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

      {/* Minimal global styling for engineering look */}
      <style jsx global>{`
        :root { color-scheme: dark; }
        body { background:#0a0f18; }
        .blueprint{
          background:
            radial-gradient(1200px 800px at 10% 10%, rgba(0,200,255,.10), transparent 60%),
            radial-gradient(1000px 600px at 90% 20%, rgba(158,123,255,.10), transparent 60%),
            repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 72px),
            repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 72px);
          background-color:#0a0f18;
        }
        .panel{
          background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 10px 35px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06);
          backdrop-filter: blur(6px);
        }
        .chip-active{ color:#0b0f1a; }
      `}</style>
    </>
  );
}
