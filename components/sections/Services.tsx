"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  { number: "01", title: "Build Your Product", short: "From idea to launch — I handle the technical side.", detail: "Tell me what you want to build. I'll turn it into working software — designed properly, built to scale, and delivered without the usual surprises. I've built products used by millions at Amazon and healthcare platforms operating across 5+ countries." },
  { number: "02", title: "System Health Check", short: "Find what's slowing you down. Get a clear fix plan.", detail: "I review your existing setup, find what's causing problems — slow performance, security gaps, rising costs, or technical debt — and give you a written report with prioritised recommendations. No vague advice. No jargon." },
  { number: "03", title: "Cloud Setup & Cost Control", short: "Get your infrastructure running efficiently — without surprise bills.", detail: "5 years at Amazon taught me how cloud infrastructure actually behaves at scale. I'll help you set it up right, keep costs predictable, and make sure it can handle growth. I've run 8 zero-downtime migrations and managed infrastructure through Amazon's largest traffic peaks." },
  { number: "04", title: "Part-Time Tech Lead", short: "Senior technical guidance without a full-time hire.", detail: "You need someone experienced in the room — setting direction, unblocking your team, making decisions that won't bite you later — but not a full-time salary. I work with you 10–20 hours per week and bridge the gap between your technical team and your business goals." },
  { number: "05", title: "Engineer Coaching", short: "1:1 mentorship for engineers levelling up.", detail: "I've mentored Amazon engineers into senior roles, coached developers at ReDI School in Germany, and volunteered with Women Who Code and Girls in Tech. I help early-career engineers grow faster and prepare for roles at top companies." },
  { number: "06", title: "AI & Digital Transformation", short: "A practical plan for getting your business AI-ready — without the hype.", detail: "Most businesses don't need AI first — they need their systems to work. I map where you are, where you need to be, and give you a phased roadmap you can actually execute. No buzzwords, no vendor lock-in, no unnecessary complexity." },
  { number: "07", title: "Tech Due Diligence", short: "Know exactly what you're investing in before you commit.", detail: "Thinking about acquiring a tech company, investing in a startup, or joining as a co-founder? I'll review the codebase, architecture, team processes, and technical risk — and tell you honestly what you're walking into." },
  { number: "08", title: "MVP Build", short: "Have a product idea? I'll get it built and into market.", detail: "I've co-founded a startup from scratch — no team, no budget, tight deadline. I know what it takes to go from idea to first version. I can be your technical co-founder for the early stages or build your MVP and hand it off." },
  { number: "09", title: "Marketing Analytics Setup", short: "Track what matters. Know what's actually working.", detail: "I'll set up your analytics infrastructure — from tracking and attribution to ad platform integrations — so your marketing decisions are based on real data, not guesswork. Used across GA4, Meta Ads, Google Ads, and mobile attribution platforms." },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-6 max-w-[72rem] mx-auto" aria-label="Services">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="type-label">Services</span>
          <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h2 className="type-h2">
          What I can do for you.
        </h2>
      </motion.div>

      <motion.ul
        className="divide-y"
        style={{ borderColor: "var(--border-subtle)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } as const }}
      >
        {SERVICES.map((s, i) => (
          <motion.li
            key={i}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } as const }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left py-6 group transition-colors duration-200"
              aria-expanded={openIndex === i}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <span className="type-mono" style={{ opacity: 0.6, marginTop: "2px", flexShrink: 0 }}>
                    {s.number}
                  </span>
                  <div>
                    {/* H3 — DM Sans 600, NOT serif */}
                    <h3 className="type-h3 mb-1" style={{ fontSize: "1.125rem" }}>{s.title}</h3>
                    <p className="type-body-sm">{s.short}</p>
                  </div>
                </div>
                <span
                  className="type-mono transition-all duration-300 flex-shrink-0"
                  style={{ color: "var(--accent-vivid)", fontSize: "16px", marginTop: "2px" }}
                >
                  {openIndex === i ? "↑" : "↓"}
                </span>
              </div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="type-body-sm mt-4 ml-10 max-w-2xl">{s.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-14 p-8"
        style={{ borderRadius: "8px", border: "1px solid var(--border-accent)", background: "var(--accent-glow)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="type-h3 mb-2" style={{ fontSize: "1.125rem" }}>Not sure which service fits?</h3>
        <p className="type-body-sm mb-6 max-w-md">
          Most clients start with a short discovery call. We talk through where you are, where you want
          to be, and I&apos;ll tell you honestly whether I can help.
        </p>
        <a
          href="mailto:hello@poulamimukherjee.com"
          className="inline-flex items-center gap-2 transition-colors duration-150"
          style={{ padding: "12px 28px", borderRadius: "6px", background: "linear-gradient(135deg, #7B5EA7, #9D6FFF)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px", color: "white" }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 44px rgba(155,111,255,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Book a discovery call →
        </a>
      </motion.div>
    </section>
  );
}
