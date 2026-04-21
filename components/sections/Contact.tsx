"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";

const CONTACT_EMAIL = "hello@poulamimukherjee.com";

const INQUIRY_TYPES = [
  { value: "", label: "What best describes your situation?" },
  { value: "build", label: "I have a product or feature I need built" },
  { value: "audit", label: "I need a technical audit or system health check" },
  { value: "ai", label: "I want to understand how AI fits my business" },
  { value: "techlead", label: "I need part-time technical leadership" },
  { value: "compliance", label: "I need help with cloud, security, or compliance" },
  { value: "coaching", label: "I'm looking for engineering mentorship or coaching" },
  { value: "diligence", label: "I need tech due diligence before an investment" },
  { value: "other", label: "Something else" },
];

const MESSAGE_HINTS: Record<string, string> = {
  build: "Tell me what you want to build, where you are in the process, and your rough timeline.",
  audit: "Describe your current stack and the problems you're experiencing.",
  ai: "Tell me about your business and what you're hoping AI could help with.",
  techlead: "Describe your team and what technical decisions you need help navigating.",
  compliance: "Describe your current infrastructure and the compliance requirements you're working toward.",
  coaching: "Tell me where you are in your engineering career and what you're trying to improve.",
  diligence: "Describe the company or codebase you need reviewed and your timeline.",
  other: "Tell me what you have in mind.",
  "": "Tell me about your project or what you're trying to solve.",
};

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/poulamimukherjee0511",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/poulami-mukherjee",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

type FormData = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "A message helps me understand how to help you.";
  return errors;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  borderBottom: "1px solid var(--border-default)",
  padding: "12px 0",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.15s",
};

const inputError: React.CSSProperties = {
  borderBottomColor: "#EF4444",
};

const focusRingStyle = `
  .pm-field:focus-visible {
    outline: 2px solid var(--accent-vivid);
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

export default function Contact() {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const typeId = `${uid}-type`;
  const messageId = `${uid}-message`;
  const nameErrId = `${uid}-name-err`;
  const emailErrId = `${uid}-email-err`;
  const messageErrId = `${uid}-message-err`;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = document.getElementById(
        errors.name ? nameId : errors.email ? emailId : messageId
      );
      firstErrorField?.focus();
      return;
    }

    const inquiryLabel =
      INQUIRY_TYPES.find((t) => t.value === formData.inquiryType)?.label ||
      "General inquiry";
    const subject = encodeURIComponent(`[poulamimukherjee.com] ${inquiryLabel}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${inquiryLabel}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setStatus("sent");
    setFormData({ name: "", email: "", inquiryType: "", message: "" });
    setFieldErrors({});
  };

  const messagePlaceholder = MESSAGE_HINTS[formData.inquiryType] ?? MESSAGE_HINTS[""];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 max-w-6xl mx-auto"
      aria-label="Contact"
    >
      <style>{focusRingStyle}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="type-label">Get in touch</span>
            <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
          </div>
          <h2 className="type-h2 mb-6">Let&apos;s talk.</h2>
          <p className="type-body mb-8 max-w-sm">
            Whether you have a project in mind, a technical problem to solve, or just
            want to explore what&apos;s possible — I&apos;m happy to have a conversation.
          </p>

          <div className="space-y-4 mb-10">
            <a
              href="mailto:hello@poulamimukherjee.com"
              className="flex items-center gap-3 transition-colors duration-200 pm-field"
              style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: "1px solid var(--border-accent)", color: "var(--accent)" }}
                aria-hidden="true"
              >
                @
              </span>
              hello@poulamimukherjee.com
            </a>
          </div>

          <div className="flex items-center gap-4" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 pm-field"
                style={{ border: "1px solid var(--border-accent)", color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                }}
                aria-label={`${link.label} (opens in new tab)`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {status === "sent" ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              role="status"
              aria-live="polite"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4"
                style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                aria-hidden="true"
              >
                ✓
              </div>
              <p className="type-h3 mb-2">Message sent.</p>
              <p className="type-body-sm">I&apos;ll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor={nameId}
                  className="block type-label mb-2"
                >
                  Name <span aria-hidden="true" style={{ color: "var(--accent-vivid)" }}>*</span>
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? nameErrId : undefined}
                  className="pm-field"
                  style={{
                    ...inputBase,
                    ...(fieldErrors.name ? inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent-vivid)")}
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = fieldErrors.name
                      ? "#EF4444"
                      : "var(--border-default)")
                  }
                />
                {fieldErrors.name && (
                  <p id={nameErrId} role="alert" className="mt-1" style={{ color: "#EF4444", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor={emailId} className="block type-label mb-2">
                  Email <span aria-hidden="true" style={{ color: "var(--accent-vivid)" }}>*</span>
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? emailErrId : undefined}
                  className="pm-field"
                  style={{
                    ...inputBase,
                    ...(fieldErrors.email ? inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent-vivid)")}
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = fieldErrors.email
                      ? "#EF4444"
                      : "var(--border-default)")
                  }
                />
                {fieldErrors.email && (
                  <p id={emailErrId} role="alert" className="mt-1" style={{ color: "#EF4444", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Inquiry type — friction reducer */}
              <div>
                <label htmlFor={typeId} className="block type-label mb-2">
                  What are you looking for? <span style={{ color: "var(--text-muted)", fontStyle: "normal" }}>(optional)</span>
                </label>
                <select
                  id={typeId}
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="pm-field"
                  style={{
                    ...inputBase,
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23606075' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 4px center",
                    paddingRight: "24px",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent-vivid)")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "var(--border-default)")}
                >
                  {INQUIRY_TYPES.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      style={{ background: "var(--bg-elevated)", color: "var(--text-primary)" }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message — placeholder adapts to inquiry type */}
              <div>
                <label htmlFor={messageId} className="block type-label mb-2">
                  Message <span aria-hidden="true" style={{ color: "var(--accent-vivid)" }}>*</span>
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={5}
                  placeholder={messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? messageErrId : undefined}
                  className="pm-field"
                  style={{
                    ...inputBase,
                    resize: "none",
                    ...(fieldErrors.message ? inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--accent-vivid)")}
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = fieldErrors.message
                      ? "#EF4444"
                      : "var(--border-default)")
                  }
                />
                {fieldErrors.message && (
                  <p id={messageErrId} role="alert" className="mt-1" style={{ color: "#EF4444", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 pm-field"
                style={{
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #B0691A, #E3922A)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  boxShadow: "0 0 28px rgba(155,111,255,0.3)",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s ease",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 0 44px rgba(155,111,255,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 0 28px rgba(155,111,255,0.3)")
                }
              >
                Send message →
              </button>

              <p className="type-body-sm" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                No spam, no newsletters. I respond within 1–2 business days.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-24 pt-8 border-t border-[rgba(108,92,231,0.1)] flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="type-body-sm" style={{ fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Poulami Mukherjee. All rights reserved.
        </p>
        <p className="type-body-sm" style={{ fontSize: "0.75rem" }}>
          Based in Siliguri, India · Clients across US, Europe, India, Middle East, Australia
        </p>
      </motion.div>
    </section>
  );
}
