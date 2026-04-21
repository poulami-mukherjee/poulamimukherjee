"use client";

import { motion } from "framer-motion";

// Replace these with real testimonials when collected.
// Ask clients and colleagues for a 2-3 sentence quote + their name, title, and company.
const TESTIMONIALS = [
  {
    quote: "Poulami has a rare ability to make complex technical decisions easy to understand. She helped us get clarity on our architecture and gave us a clear path forward.",
    name: "— Client name, Title, Company",
    placeholder: true,
  },
  {
    quote: "Within weeks of working together we had a system that replaced hours of manual work. I didn't expect the turnaround to be that fast.",
    name: "— Client name, Title, Company",
    placeholder: true,
  },
  {
    quote: "What I appreciated most was that she didn't push us toward unnecessary technology. She helped us figure out what we actually needed.",
    name: "— Client name, Title, Company",
    placeholder: true,
  },
];

export default function Testimonials() {
  // Hide section entirely if all testimonials are placeholders
  const hasReal = TESTIMONIALS.some((t) => !t.placeholder);
  if (!hasReal) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 max-w-[72rem] mx-auto" aria-label="Testimonials">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="type-label">What Clients Say</span>
          <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h2 className="type-h2">Kind words from people I&apos;ve worked with.</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="p-7 flex flex-col justify-between"
            style={{
              borderRadius: "6px",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-raised)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--text-primary)",
                marginBottom: "24px",
                fontStyle: "italic",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="type-mono" style={{ fontSize: "0.75rem", color: "var(--accent-vivid)" }}>
              {t.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
