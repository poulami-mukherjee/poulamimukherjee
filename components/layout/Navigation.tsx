"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav
          className="max-w-[72rem] mx-auto px-6 py-5 flex items-center justify-between"
          aria-label="Site navigation"
        >
          {/* Logo — rounded profile photo */}
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0 rounded-full overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-offset-1"
            style={{ borderRadius: "50%", border: "2px solid var(--border-accent)" }}
            aria-label="Back to top"
          >
            <Image
              src="/profile.jpeg"
              alt="Poulami Mukherjee"
              width={36}
              height={36}
              className="rounded-full object-cover block"
              style={{ width: "36px", height: "36px" }}
              priority
            />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="relative transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "13px",
                      letterSpacing: "0.01em",
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive ? "var(--text-primary)" : "var(--text-muted)")
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href="mailto:hello@poulamimukherjee.com"
            className="hidden md:inline-flex items-center transition-all duration-150"
            style={{
              padding: "8px 20px",
              borderRadius: "6px",
              border: "1px solid var(--border-accent)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "13px",
              color: "var(--text-primary)",
              background: "transparent",
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
            Let&apos;s talk
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--text-primary)",
                transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--text-primary)",
                transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-20 px-6 pb-10"
            style={{ background: "var(--bg-base)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-2 mt-4" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="w-full text-left py-4 border-b transition-colors duration-150"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: "22px",
                        letterSpacing: "-0.02em",
                        color: isActive ? "var(--accent-vivid)" : "var(--text-primary)",
                        borderColor: "var(--border-default)",
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href="mailto:hello@poulamimukherjee.com"
              className="mt-10 w-full py-4 text-center transition-all duration-150"
              style={{
                borderRadius: "6px",
                background: "linear-gradient(135deg, #7B5EA7, #9D6FFF)",
                color: "white",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "14px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
