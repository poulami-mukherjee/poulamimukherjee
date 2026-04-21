"use client";

import { motion } from "framer-motion";

const PROBLEMS = [
  {
    number: "01",
    title: "Your team is doing manually what a system should handle",
    body: "Hours lost every week to data entry, reporting, or coordination that could run on its own.",
  },
  {
    number: "02",
    title: "You have data, but it doesn't help you decide anything",
    body: "Reports nobody reads. Dashboards that show activity but not direction.",
  },
  {
    number: "03",
    title: "Everyone's talking about AI and you don't know where it fits",
    body: "The hype is real, but so is the confusion. You need a straight answer, not a sales pitch.",
  },
  {
    number: "04",
    title: "Your software is slowing the business down",
    body: "Slow tools. Disconnected systems. Workarounds that have quietly become permanent.",
  },
  {
    number: "05",
    title: "You have an idea but no one to build it the right way",
    body: "A product, a platform, an MVP — you know what you want. You need someone you can trust to build it.",
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-24 md:py-32 px-6 max-w-[72rem] mx-auto" aria-label="Challenges I solve">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="type-label">Challenges I Solve</span>
          <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h2 className="type-h2">Does this sound familiar?</h2>
        <p className="type-body mt-4 max-w-xl" style={{ color: "var(--text-body)" }}>
          These are the problems I hear from founders and business owners most often. If one of them resonates, we should talk.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.07 } },
        }}
      >
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="p-7"
            style={{
              borderRadius: "6px",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-raised)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-accent)";
              e.currentTarget.style.background = "var(--bg-elevated)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.background = "var(--bg-raised)";
            }}
          >
            <span className="type-mono block mb-4" style={{ opacity: 0.5 }}>{p.number}</span>
            <h3 className="type-h3 mb-3" style={{ fontSize: "1.0625rem", lineHeight: 1.4 }}>{p.title}</h3>
            <p className="type-body-sm" style={{ color: "var(--text-body)" }}>{p.body}</p>
          </motion.div>
        ))}

        {/* CTA card */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="p-7 flex flex-col justify-between"
          style={{
            borderRadius: "6px",
            border: "1px solid var(--border-accent)",
            background: "var(--accent-glow)",
          }}
        >
          <div>
            <h3 className="type-h3 mb-3" style={{ fontSize: "1.0625rem" }}>Not sure if this applies to you?</h3>
            <p className="type-body-sm mb-6" style={{ color: "var(--text-body)" }}>
              Book a 20-minute call. No pitch, no pressure — just an honest conversation about where you are and whether I can help.
            </p>
          </div>
          <a
            href="mailto:hello@poulamimukherjee.com"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #7B5EA7, #9D6FFF)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "14px",
              color: "white",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 44px rgba(155,111,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Let&apos;s talk →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
