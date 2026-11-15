import "@fontsource-variable/inter-tight";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import { profile, siteUrl, faqs } from "@/data/profile";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gokul B — Web Developer & SEO Specialist in Bengaluru | Next.js, React, WordPress",
  description:
    "Gokul B designs and codes fast websites and web apps in Next.js, React and WordPress, then gets them found on Google and AI search with SEO, GEO and AEO. Based in Bengaluru.",
  keywords: [
    "Gokul B",
    "web developer Bengaluru",
    "Next.js developer Bangalore",
    "React developer",
    "WordPress developer Bengaluru",
    "SEO specialist Bengaluru",
    "GEO AEO expert",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gokul B — Built to impress. Ranked to be found.",
    description: "Web developer & search marketer in Bengaluru. Next.js, React, WordPress, SEO, GEO, AEO.",
    url: siteUrl,
    siteName: "Gokul B",
    locale: "en_IN",
    type: "website",
    images: [{ url: profile.photo, width: 1000, height: 1377, alt: "Gokul B" }],
  },
  twitter: { card: "summary_large_image", title: "Gokul B — Web Developer & SEO", images: [profile.photo] },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#f4f4f1" };

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "Beta Digital Marketing", url: "https://betadigitalmarketing.com/" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Indira Gandhi College of Arts and Science" },
        { "@type": "EducationalOrganization", name: "Motilal Nehru Government Polytechnic College" },
      ],
      knowsAbout: ["Next.js", "React", "MySQL", "WordPress", "SEO", "Generative Engine Optimization", "Answer Engine Optimization"],
      sameAs: [profile.linkedin],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Preloader />
        <Cursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
