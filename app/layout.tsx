import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navigation from "@/components/layout/Navigation";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const caveat = Caveat({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poulami Mukherjee — Technology Consultant & Software Engineer",
  description:
    "I help small and medium-sized businesses leverage AI and Digital Technology to think clearly, streamline processes, and unlock new growth. 8 years experience, 5 years at Amazon.",
  metadataBase: new URL("https://poulamimukherjee.com"),
  openGraph: {
    title: "Poulami Mukherjee — Technology Consultant & Software Engineer",
    description:
      "Technology, when done right, doesn't just look good — it brings in leads, converts clients, and genuinely pays for itself.",
    url: "https://poulamimukherjee.com",
    siteName: "Poulami Mukherjee",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Poulami Mukherjee — Technology Consultant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poulami Mukherjee — Technology Consultant & Software Engineer",
    description:
      "Technology, when done right, doesn't just look good — it brings in leads, converts clients, and genuinely pays for itself.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Poulami Mukherjee",
              url: "https://poulamimukherjee.com",
              jobTitle: "Senior Software Engineer & Technology Consultant",
              description:
                "Software engineer and technology consultant with 8 years experience including 5 years at Amazon. Specialises in backend architecture, cloud infrastructure, AI integration, and digital transformation for SMBs.",
              sameAs: [
                "https://linkedin.com/in/poulamimukherjee0511",
                "https://github.com/poulami-mukherjee",
              ],
              knowsAbout: [
                "Software Architecture",
                "Cloud Infrastructure",
                "AWS",
                "AI Integration",
                "Digital Transformation",
                "Backend Engineering",
                "HIPAA Compliance",
                "GDPR Compliance",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Constant Therapy",
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
