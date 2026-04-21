"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } } as const,
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 } as const,
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/poulami-mukherjee/repos?sort=updated&per_page=6&type=public"
    )
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="github"
      className="py-24 md:py-32 px-6 max-w-6xl mx-auto"
      aria-label="GitHub projects"
    >
      <motion.div
        className="flex items-end justify-between mb-12 flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="type-label">GitHub</span>
            <div className="h-px w-10 opacity-60" style={{ background: "var(--accent)" }} aria-hidden="true" />
          </div>
          <h2 className="type-h2">
            Things I&apos;ve been building.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "var(--accent)" }} />
          <span className="type-body-sm">Live from GitHub</span>
        </div>
      </motion.div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse"
              style={{ borderRadius: "8px", background: "var(--bg-raised)", border: "1px solid var(--border-subtle)" }}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="type-body-sm">
          Could not load repositories.{" "}
          <a
            href="https://github.com/poulami-mukherjee"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
            style={{ color: "var(--accent)" }}
          >
            View on GitHub →
          </a>
        </p>
      )}

      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              className="group block p-5 hover:-translate-y-1 transition-all duration-300"
              style={{ borderRadius: "8px", background: "var(--bg-raised)", border: "1px solid var(--border-subtle)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-accent)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(108,92,231,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={`${repo.name} on GitHub`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="truncate pr-2 group-hover:transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                >
                  {repo.name}
                </h3>
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>

              <p className="type-body-sm mb-4 line-clamp-2 min-h-[2.5rem]" style={{ fontSize: "0.75rem" }}>
                {repo.description || "No description"}
              </p>

              <div className="flex items-center justify-between">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background:
                          LANGUAGE_COLORS[repo.language] || "var(--text-muted)",
                      }}
                    />
                    <span className="type-mono" style={{ fontSize: "0.75rem" }}>
                      {repo.language}
                    </span>
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1 type-mono" style={{ fontSize: "0.75rem" }}>
                    <span>★</span>
                    <span>{repo.stargazers_count}</span>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="https://github.com/poulami-mukherjee"
          target="_blank"
          rel="noopener noreferrer"
          className="type-body-sm link-underline transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          View all repositories on GitHub →
        </a>
      </motion.div>
    </section>
  );
}
