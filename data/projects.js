// ============================================================
//  PROJECTS — gallery cards in the "Selected Work" section
//
//  Optional auto screenshots: `node scripts/capture-screens.mjs`
//  saves public/projects/<slug>/desktop-1..3.jpg + mobile-1..3.jpg -> then use slides: site("<slug>")
//
//  Add more screenshots: save public/projects/<slug>/screen-2.jpg, screen-3.jpg ...
//  then change shots("<slug>") to shots("<slug>", 3).
//  Or add any slide by hand, e.g.
//    { type: "laptop", src: "/projects/tasks/dashboard.png" }
//    { type: "phones", srcs: ["/projects/x/a.png", "/projects/x/b.png", "/projects/x/c.png"] }
//  A missing image never breaks the card; a clean placeholder screen shows instead.
// ============================================================

// Your own screenshots: public/projects/<slug>/screen-1.jpg (add screen-2.jpg... and list them)
const shots = (slug, count = 1) =>
  Array.from({ length: count }, (_, k) => `/projects/${slug}/screen-${k + 1}.jpg`).flatMap((src, k) =>
    k === 0 ? [{ type: "laptop", src }, { type: "browser", src }] : [{ type: "browser", src }]
  );

// Optional: 4 slides from the capture script (desktop-1..3 + mobile-1..3)
// eslint-disable-next-line no-unused-vars
const site = (slug) => [
  { type: "combo", desktop: `/projects/${slug}/desktop-1.jpg`, mobile: `/projects/${slug}/mobile-1.jpg` },
  { type: "phones", srcs: [1, 2, 3].map((n) => `/projects/${slug}/mobile-${n}.jpg`) },
  { type: "laptop", src: `/projects/${slug}/desktop-2.jpg` },
  { type: "laptop", src: `/projects/${slug}/desktop-3.jpg` },
];

export const featuredProjects = [
  {
    slug: "tasks",
    name: "Beta Tasks — Team Task Platform",
    url: "https://tasks.betadigitalmarketing.in/",
    badge: "Flagship · In production",
    featured: true, // big full-width card
    story:
      "Our agency team was juggling work across chats and spreadsheets. I designed and built a full stack web app: client boards, task assignment, overdue tracking and an admin dashboard with each member's workload and on-time rate. Frontend, APIs, auth and MySQL — all hand-coded.",
    stack: ["Next.js", "React", "MySQL", "Full Stack"],
    slides: shots("tasks"),
    mock: "app",
  },
  {
    slug: "betadigitalmarketing-in",
    name: "Beta Digital Marketing",
    url: "https://betadigitalmarketing.in/",
    badge: "Next.js · Live",
    story:
      "Rebuilt the agency website from a blank file in Next.js and React — faster pages, cleaner design and full control over every SEO detail.",
    stack: ["Next.js", "React", "SEO"],
    slides: shots("betadigitalmarketing-in"),
  },
  {
    slug: "ipecsolutions",
    name: "iPEC Solutions",
    url: "https://ipecsolutions.com/",
    badge: "WordPress · Live",
    story:
      "Homepage redesign for an AI training institute — custom sections, clear course paths and an SEO-ready structure built to turn browsers into enquiries.",
    stack: ["WordPress", "Elementor", "SEO"],
    slides: shots("ipecsolutions"),
  },
  {
    slug: "betadigitalmarketing-com",
    name: "Beta Digital Marketing (.com)",
    url: "https://betadigitalmarketing.com/",
    badge: "WordPress · Live",
    story:
      "The agency's main WordPress site — service pages, landing pages and blogs, designed in Elementor and structured to rank for local searches.",
    stack: ["WordPress", "Elementor", "Local SEO"],
    slides: shots("betadigitalmarketing-com"),
  },
  {
    slug: "networkerschamp",
    name: "NetworkersChamp",
    url: "https://networkerschamp.com/",
    badge: "Website + SEO · Live",
    story:
      "Website and ongoing SEO for an IT training institute — course pages, keyword-led blogs and schema, so students find them when they search for courses.",
    stack: ["WordPress", "SEO", "Schema"],
    slides: shots("networkerschamp"),
  },
];

// Smaller list below the cards ("More launches")
export const moreProjects = [
  { name: "LearnMore Technologies", url: "https://learnmoretechnologies.in/", category: "IT Training" },
  { name: "Genesis Clinic", url: "https://genesisclinicblr.com/", category: "Healthcare" },
  { name: "Riyaz Edapayil", url: "https://riyazedapayil.com/", category: "Personal Brand" },
];
