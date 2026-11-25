import "@fontsource-variable/inter-tight";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { profile, siteUrl, FAQS } from "@/data/profile";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gokul B — Head of Creative Developer | Next.js & 3D Web Experiences, Bengaluru",
  description:
    "Gokul B is the Head of Creative Developer at Beta Digital Marketing, Bengaluru. Next.js, 3D web design, web applications, SQL, SEO, GEO, AEO.",
  keywords: [
    "Gokul B",
    "Head of Creative Developer",
    "Next.js developer Bengaluru",
    "3D Web Design",
    "React developer",
    "Three.js",
    "SQL",
    "web applications",
    "SEO specialist Bengaluru",
    "GEO AEO expert",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gokul B — Head of Creative Developer | Next.js & 3D Web Experiences, Bengaluru",
    description:
      "Head of Creative Developer at Beta Digital Marketing, Bengaluru. Next.js, 3D web design, web applications, SQL, SEO, GEO, AEO.",
    url: siteUrl,
    siteName: "Gokul B",
    locale: "en_IN",
    type: "website",
    images: [{ url: profile.photo, width: 1000, height: 1377, alt: "Gokul B" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul B — Head of Creative Developer",
    description: "Next.js & 3D Web Experiences · Bengaluru",
    images: [profile.photo],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: "Head of Creative Developer",
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
      worksFor: {
        "@type": "Organization",
        name: "Beta Digital Marketing",
        url: "https://betadigitalmarketing.in/",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Indira Gandhi College of Arts and Science" },
        { "@type": "EducationalOrganization", name: "Motilal Nehru Government Polytechnic College" },
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "3D web design",
        "Three.js",
        "SQL",
        "GitHub",
        "web applications",
        "SEO",
        "Generative Engine Optimization",
        "Answer Engine Optimization",
        "digital marketing",
      ],
      sameAs: [profile.linkedin, profile.github],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
