"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    number: "01",
    headline: "Pages that loaded in 4 seconds — now load in under 0.1",
    subtitle: "Global e-commerce platform",
    description: "A seller platform used by hundreds of engineers was so slow it was costing the business. I rearchitected the backend to handle the load, cut response times by 40x, and kept everything running through three Amazon Prime Day peaks without a single incident.",
    metrics: ["4,000ms → 100ms response time", "0 incidents across 3 Prime Days", "100+ engineers unblocked daily"],
    tags: ["Java", "Spring", "AWS", "Distributed Systems", "Caching"],
    note: "Company anonymised per NDA",
  },
  {
    number: "02",
    headline: "Healthcare AI across 5 countries — zero breaches, fully compliant",
    subtitle: "Healthcare AI platform",
    description: "Led the backend engineering for a healthcare company whose AI is helping stroke and brain injury patients recover speech and cognitive function. Built and maintained compliant systems across the US, Europe, Middle East, Australia, and India — all while meeting strict patient data regulations.",
    metrics: ["5+ countries, zero compliance failures", "Sensitive patient data, 0 breaches", "Cross-functional lead: US, Canada, India"],
    tags: ["Python", "AWS", "HIPAA", "GDPR", "Healthcare AI"],
    note: "Company anonymised per NDA",
  },
  {
    number: "03",
    headline: "Built a B2B AI product from scratch in Germany",
    subtitle: "Nuri — Co-founded startup",
    description: "Co-founded a startup in Germany with no team and a tight runway. Defined the technical direction, built the product from scratch, and grew it far enough to earn a place in a competitive AI accelerator and reach finalist stage in multiple pitch competitions.",
    metrics: ["0 → 1 working product", "AI accelerator graduate", "Multiple pitch contest finalist"],
    tags: ["Python", "FastAPI", "LLMs", "AWS"],
    note: "Own company — no NDA",
  },
];

function CaseCard({ c, index }: { c: typeof CASES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[min(88vw,500px)]"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group h-full p-8 transition-all duration-[250ms]"
        style={{
          borderRadius: "6px",
          background: "var(--bg-raised)",
          border: "1px solid var(--border-subtle)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--bg-elevated)";
          e.currentTarget.style.borderColor = "var(--border-accent)";
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(14,59,58,0.10)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--bg-raised)";
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Number */}
        <span className="type-label" style={{ display: "block", marginBottom: "16px", opacity: 0.7 }}>
          {c.number}
        </span>

        {/* H3 — DM Sans 600, not serif */}
        <h3 className="type-h3 mb-2">{c.headline}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
          {c.subtitle}
        </p>

        <p className="type-body-sm mb-5">{c.description}</p>

        {/* Metrics */}
        <ul className="space-y-2.5 mb-6">
          {c.metrics.map((metric, i) => (
            <li key={i} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-vivid)" }} />
              {metric}
            </li>
          ))}
        </ul>

        {/* Tags — muted, for reference only */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((tag, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.05em", color: "var(--text-muted)", padding: "2px 8px", border: "1px solid var(--border-hairline)", borderRadius: "3px" }}>
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "16px" }}>{c.note}</p>

        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
          <span className="link-underline" style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "var(--accent)" }}>
            Case study →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth + 128;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 overflow-hidden" aria-label="Selected work">
      <div className="px-6 max-w-[72rem] mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="type-label">Selected Work</span>
            <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
          </div>
          <h2 className="type-h2">
            Real results from real projects.
          </h2>
        </motion.div>
      </div>

      <div ref={trackRef} className="flex gap-5 px-6 md:px-16 flex-col md:flex-row will-change-transform">
        {CASES.map((c, i) => (
          <CaseCard key={i} c={c} index={i} />
        ))}
      </div>

      <motion.div
        className="px-6 max-w-[72rem] mx-auto mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-body)", maxWidth: "440px", lineHeight: 1.65 }}>
          Results are only possible when the problem is understood properly. I always start with a conversation.
        </p>
        <a
          href="mailto:hello@poulamimukherjee.com"
          style={{
            flexShrink: 0,
            padding: "12px 28px",
            borderRadius: "6px",
            background: "linear-gradient(135deg, #B0691A, #E3922A)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "14px",
            color: "white",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 44px rgba(227,146,42,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Talk about your project →
        </a>
      </motion.div>
    </section>
  );
}
