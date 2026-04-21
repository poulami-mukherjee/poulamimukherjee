"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AskPoulami() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full text-white shadow-[0_8px_32px_rgba(108,92,231,0.4)] transition-colors duration-200"
        style={{ background: "var(--accent)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-vivid)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Ask Poulami AI"
      >
        <span className="text-base">✦</span>
        Ask Poulami
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-8 z-50 w-80 md:w-96 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border-accent)" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-label="Ask Poulami chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border-accent)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
                  ✦
                </div>
                <div>
                  <p className="type-h3" style={{ fontSize: "0.875rem" }}>Ask Poulami</p>
                  <p className="type-body-sm" style={{ fontSize: "0.75rem" }}>AI assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="transition-colors text-xl leading-none"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)", color: "var(--accent)" }}>
                ✦
              </div>
              <p className="type-h3 mb-2" style={{ fontSize: "0.875rem" }}>
                Coming soon
              </p>
              <p className="type-body-sm mb-6" style={{ fontSize: "0.75rem" }}>
                I&apos;m building an AI assistant that can answer questions about my work,
                services, and availability — in real time. Launching soon.
              </p>

              {/* Placeholder pre-set questions */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {["What's your stack?", "Services?", "Availability?", "Pricing?"].map((q) => (
                  <button
                    key={q}
                    disabled
                    className="px-3 py-1.5 rounded-full opacity-50 cursor-not-allowed"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", border: "1px solid var(--border-accent)", color: "var(--text-muted)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <a
                href="mailto:hello@poulamimukherjee.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors duration-200"
                style={{ background: "var(--accent)", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-vivid)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                Email me directly →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
