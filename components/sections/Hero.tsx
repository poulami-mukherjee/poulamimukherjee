"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const STATS = [
  { value: "8", unit: "yrs", label: "experience" },
  { value: "5", unit: "yrs", label: "at amazon" },
  { value: "40x", unit: "", label: "perf gain" },
];

export default function Hero() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced && headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".reveal-line");
      gsap.fromTo(
        lines,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    }

    const onMouseMove = (e: MouseEvent) => {
      const xf = e.clientX / window.innerWidth - 0.5;
      const yf = e.clientY / window.innerHeight - 0.5;
      if (orb1Ref.current) gsap.to(orb1Ref.current, { x: xf * 50, y: yf * 35, duration: 2, ease: "power2.out" });
      if (orb2Ref.current) gsap.to(orb2Ref.current, { x: -xf * 30, y: -yf * 22, duration: 2.5, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      data-theme="dark"
      style={{ background: "var(--color-primary)" }}
      aria-label="Hero"
    >
      {/* Warm amber orbs */}
      <div ref={orb1Ref} className="gradient-orb absolute pointer-events-none"
        style={{ width: "700px", height: "600px", top: "40%", left: "40%", transform: "translate(-50%, -55%)", background: "radial-gradient(circle at 40% 40%, #E3922A 0%, #B0691A 35%, transparent 70%)", opacity: 0.14 }} aria-hidden="true" />
      <div ref={orb2Ref} className="gradient-orb absolute pointer-events-none"
        style={{ width: "400px", height: "350px", top: "5%", right: "0%", background: "radial-gradient(circle, #F4C978 0%, transparent 65%)", opacity: 0.08 }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pt-28 pb-24" style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <motion.div className="mb-8"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}>
            <span className="type-label" style={{ color: "var(--color-accent-soft, #F4C978)" }}>
              [ Technology Consultant &amp; Software Engineer ]
            </span>
          </motion.div>

          {/* Headline */}
          <h1 ref={headlineRef} className="mb-10 overflow-hidden"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(3rem, 8.5vw, 7rem)", lineHeight: 1.0, letterSpacing: "-0.025em" }}>
            <span className="block overflow-hidden">
              <span className="reveal-line block text-gradient" style={{ opacity: 0 }}>
                Hi, I&apos;m Poulami.
              </span>
            </span>
            <span className="block overflow-hidden mt-1">
              <span className="reveal-line block" style={{ opacity: 0, color: "var(--text-body)", fontWeight: 400, fontStyle: "normal", fontSize: "clamp(1.1rem, 3vw, 2rem)", letterSpacing: "-0.015em", marginTop: "0.25em" }}>
                I help businesses build technology<br className="hidden md:block" /> that actually works for them.
              </span>
            </span>
          </h1>

          {/* Subhead */}
          <motion.p className="mb-8 max-w-xl"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem, 2vw, 1.125rem)", color: "var(--text-body)", lineHeight: 1.65 }}>
            Whether you need to automate slow processes, make sense of your data, or figure out where AI actually fits your business — I give you a straight answer and get it built.
          </motion.p>

          {/* Stats */}
          <motion.div className="flex flex-wrap gap-8 mb-12"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}>
            {STATS.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.025em", color: "var(--text-primary)", lineHeight: 1 }}>
                  {s.value}
                </span>
                {s.unit && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", letterSpacing: "0.05em" }}>
                    {s.unit}
                  </span>
                )}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <PrimaryBtn onClick={() => scrollTo("contact")}>Book a free discovery call →</PrimaryBtn>
            <GhostBtn onClick={() => scrollTo("work")}>See results</GhostBtn>
            <a href="/cv.pdf" download className="link-underline type-body-sm"
              style={{ color: "var(--text-muted)", marginLeft: "4px" }}>
              Download CV
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-8 flex items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }} aria-hidden="true">
        <div className="w-8 h-px" style={{ background: "var(--border-accent)" }} />
        <span className="type-label" style={{ fontSize: "0.625rem", letterSpacing: "0.14em", color: "var(--text-muted)" }}>scroll to explore</span>
      </motion.div>
    </section>
  );
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 28px",
        borderRadius: "6px",
        background: "linear-gradient(135deg, #B0691A, #E3922A)",
        color: "white",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: "0.01em",
        border: "none",
        boxShadow: "0 0 28px rgba(227,146,42,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
        transition: "box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 44px rgba(227,146,42,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(227,146,42,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent-strong)";
        e.currentTarget.style.color = "var(--color-accent-soft, #F4C978)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      style={{
        padding: "12px 24px",
        borderRadius: "6px",
        background: "transparent",
        border: "1px solid var(--border-accent)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: "0.01em",
        transition: "border-color 0.15s, color 0.15s",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
