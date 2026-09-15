const reasons = [
  {
    n: "01",
    title: "FREEDOM",
    copy: "Explore Sri Lanka on your own schedule.",
  },
  {
    n: "02",
    title: "FLEXIBILITY",
    copy: "Choose a vehicle suited to your journey.",
  },
  {
    n: "03",
    title: "CONVENIENCE",
    copy: "A simple way to arrange your rental.",
  },
  {
    n: "04",
    title: "YOUR JOURNEY",
    copy: "One vehicle. Countless destinations.",
  },
];

export function Why() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-28 lg:py-36">
      <div className="mx-auto w-[min(1180px,100%)]">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">WHY CAR DAYZ LANKA</p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-oswald)] text-5xl leading-[0.9] tracking-tight text-white sm:text-7xl">
          BUILT FOR THE ROAD AHEAD.
        </h2>
        <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2">
          {reasons.map((r) => (
            <article
              key={r.n}
              className="group bg-[#080808] p-8 transition hover:bg-[#0c0c0c] sm:p-10"
            >
              <p className="font-mono text-[11px] tracking-[0.28em] text-cyan">{r.n}</p>
              <h3 className="mt-6 font-[family-name:var(--font-oswald)] text-4xl tracking-wide text-white sm:text-5xl">
                {r.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{r.copy}</p>
              <div className="mt-10 h-px w-16 bg-white/15 transition group-hover:w-28 group-hover:bg-cyan" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
