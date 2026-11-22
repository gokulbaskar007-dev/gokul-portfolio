// ============================================================
//  PROJECTS — 10 cards with automatic live screenshots
//
//  Screenshots are automatic from the URL:
//  1. mShots (WordPress): https://s0.wp.com/mshots/v1/<url>?w=1280&h=800
//  2. Retry every 3.5s if placeholder image returned
//  3. Fallback: thum.io
//  4. Optional 'image' field overrides (e.g. Beta Tasks behind login)
// ============================================================

export const PROJECTS = [
  {
    name: "Beta Digital Marketing",
    url: "https://betadigitalmarketing.in/",
    kind: "Agency website · Next.js",
    tags: ["Next.js", "React", "SEO · AEO · GEO"],
  },
  {
    name: "Beta Tasks",
    url: "https://tasks.betadigitalmarketing.in/",
    kind: "Team task platform · Full stack",
    tags: ["Next.js", "React", "MySQL"],
    image: "/projects/tasks/screen-1.jpg",
  },
  {
    name: "Beta Digital Marketing (.com)",
    url: "https://betadigitalmarketing.com/",
    kind: "Agency website · WordPress",
    tags: ["WordPress", "Elementor", "Local SEO"],
  },
  {
    name: "iPEC Solutions",
    url: "https://ipecsolutions.com/",
    kind: "AI training institute · WordPress",
    tags: ["WordPress", "Elementor", "SEO"],
  },
  {
    name: "NetworkersChamp",
    url: "https://networkerschamp.com/",
    kind: "IT training institute · Website + SEO",
    tags: ["WordPress", "SEO", "Schema"],
  },
  {
    name: "LearnMore Technologies",
    url: "https://learnmoretechnologies.in/",
    kind: "IT training · WordPress",
    tags: ["WordPress", "Elementor"],
  },
  {
    name: "Genesis Clinic",
    url: "https://genesisclinicblr.com/",
    kind: "Healthcare clinic · WordPress",
    tags: ["WordPress", "Local SEO"],
  },
  {
    name: "Riyaz Edapayil",
    url: "https://riyazedapayil.com/",
    kind: "Personal brand · WordPress",
    tags: ["WordPress", "Personal brand"],
  },
];
