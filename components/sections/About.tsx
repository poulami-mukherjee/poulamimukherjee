"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    period: "2018–2020",
    company: "Amazon Hyderabad",
    role: "Application Development Engineer II",
    heading: "Building tools that real people use",
    body: "I joined Amazon and quickly learned that the best software isn't the most complex — it's the one that removes friction. I built a full-stack analytics tool from requirement gathering to launch. What used to take a team an entire week of manual effort now took 30 minutes.",
    metrics: [
      { value: 100, suffix: "+", label: "daily users" },
      { value: 8, suffix: "", label: "RDS migrations, 0 downtime" },
    ],
    quote: null,
  },
  {
    period: "2020–2021",
    company: "Amazon Bengaluru",
    role: "Application Development Engineer III",
    heading: "Making things faster, safer, more resilient",
    body: "I found the problems nobody was looking at — high memory consumption, redundant database queries, latency bottlenecks buried in Spring configurations. I deployed caching solutions, reducing latency by 40%. I discovered and fixed a CSRF vulnerability that could have compromised customer security.",
    metrics: [
      { value: 40, suffix: "%", label: "latency reduction" },
      { value: 3, suffix: "", label: "core services championed" },
    ],
    quote: null,
  },
  {
    period: "2021–2023",
    company: "Amazon Hyderabad",
    role: "Software Engineer",
    heading: "Scaling for millions: Prime Day and beyond",
    body: "I led Prime Day Peak Readiness for three consecutive years — 0 high-severity incidents across 6+ seller-facing websites. I reduced server response latency from 4,000ms to 100ms. I led a team of 4 engineers, resolved the Log4j vulnerability across 4+ services, and mentored junior engineers.",
    metrics: [
      { value: 40, suffix: "x", label: "latency improvement" },
      { value: 3, suffix: "", label: "Prime Days, 0 incidents" },
    ],
    quote: "At Amazon, I learned to build at scale. Then I asked: what if I used that skill to build things that actually change lives?",
  },
  {
    period: "2023–2024",
    company: "Germany",
    role: "Co-Founder, Nuri",
    heading: "Building from zero in a foreign country",
    body: "I co-founded a B2B AI and Cloud SaaS company in Germany, going through the Campus Founders accelerator. I defined the full technical roadmap, built MVPs using Multi-Agent Systems, Python FastAPI, Langchain, and AWS, and learned what it means to build when there's no team, no budget — just a problem worth solving.",
    metrics: [
      { value: 0, suffix: "→1", label: "product build" },
      { value: 3, suffix: "", label: "pitch contest finalist" },
    ],
    quote: null,
  },
  {
    period: "2024–Present",
    company: "Constant Therapy",
    role: "Senior Software Engineer",
    heading: "Healthcare AI that helps people recover",
    body: "Now at Constant Therapy — multinational healthcare technology serving patients across the US, Europe, Middle East, Australia, and India. Patented AI helps people recovering from strokes and brain injuries restore their speech and cognitive function. I lead the entire backend stack and cross-functional teams across three continents.",
    metrics: [
      { value: 5, suffix: "+", label: "regions served" },
      { value: 100, suffix: "%", label: "HIPAA & GDPR compliant" },
    ],
    quote: "This is where I think AI becomes useful. Not because it is just another technology, but because it helps close the gap between technologies, people, and decisions.",
  },
];

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = String(value);
      return;
    }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val).toString(); },
    });
  }, [isInView, value]);

  return (
    <div className="text-center min-w-[80px]">
      <div className="mb-1 type-metric" style={{ lineHeight: 1 }}>
        <span ref={ref}>0</span>
        <span style={{ color: "var(--accent)" }}>{suffix}</span>
      </div>
      <p className="type-label" style={{ fontSize: "0.625rem" }}>{label}</p>
    </div>
  );
}

function Chapter({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 md:pl-14"
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-[6px] w-[10px] h-[10px] rounded-full border-2 transition-all duration-500"
        style={{
          borderColor: "var(--accent)",
          background: isInView ? "var(--accent)" : "transparent",
          boxShadow: isInView ? "0 0 10px var(--accent)" : "none",
        }}
      />

      {/* Period */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="type-label">{chapter.period}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          {chapter.company} · {chapter.role}
        </span>
      </div>

      {/* H3 — DM Sans, NOT serif */}
      <h3 className="type-h3 mb-3" style={{ fontSize: "1.125rem" }}>{chapter.heading}</h3>

      <p className="type-body-sm mb-5 max-w-2xl">{chapter.body}</p>

      {/* Metrics */}
      <div className="flex gap-6 mb-6">
        {chapter.metrics.map((m, i) => (
          <Counter key={i} value={m.value} suffix={m.suffix} label={m.label} />
        ))}
      </div>

      {/* Pull quote — Cormorant italic, the one exception */}
      {chapter.quote && (
        <motion.blockquote
          className="border-l-2 pl-6 py-1 mb-2"
          style={{ borderColor: "var(--accent)" }}
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.7, color: "var(--text-primary)", fontStyle: "normal" }}>
            &ldquo;{chapter.quote}&rdquo;
          </p>
        </motion.blockquote>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-[72rem] mx-auto" aria-label="About">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="type-label">The Story</span>
          <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h2 className="type-h2 mb-5">
          I build technology that<br />
          enables and causes impact.
        </h2>
        <p className="type-body max-w-xl">
          8 years of software engineering. 5 years at Amazon across 4 roles. A startup in Germany.
          Now healthcare AI that helps people get their voices back.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute left-[4px] md:left-[4px] top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, var(--accent), rgba(108,92,231,0.2), transparent)" }}
        />
        <div className="space-y-14">
          {CHAPTERS.map((chapter, i) => (
            <Chapter key={i} chapter={chapter} index={i} />
          ))}
        </div>
      </div>

      {/* CV download */}
      <motion.div
        className="mt-16 pt-10"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2 transition-all duration-150"
          style={{
            padding: "12px 28px",
            borderRadius: "6px",
            border: "1px solid var(--border-accent)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "14px",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-glow)";
            e.currentTarget.style.borderColor = "var(--border-accent-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border-accent)";
          }}
        >
          Download full CV ↓
        </a>
      </motion.div>
    </section>
  );
}
