# Ready-to-use prompts for Google Antigravity

Open this project in Antigravity and paste a prompt into the Agent panel.
Every prompt already says to keep the black & white style.

---

### 1. First run
> This is my Next.js 16 portfolio with GSAP and Lenis. Run `npm install` and `npm run dev`, open it in the browser, and check desktop + mobile for layout or animation bugs. Keep the black & white design.

### 2. Real project screenshots
> In app/components/Work.js the project cards show CSS mock screens. Take screenshots of https://betadigitalmarketing.in/ and https://tasks.betadigitalmarketing.in/, convert them to grayscale WebP in /public/projects/, add an `image` field to featuredProjects in data/profile.js and render them inside the existing `.mock` browser frame using next/image. Keep the tilt-on-scroll animation.

### 3. Save quiz leads (free)
> In app/components/WebsiteCheck.js, when the user reaches the result step, also send their answers, score, name, business and website to Web3Forms (free) using an env variable NEXT_PUBLIC_WEB3FORMS_KEY, so I get every report by email even if they don't click WhatsApp. No UI change.

### 4. Case study pages
> Create app/work/[slug]/page.js. Add slug, challenge, solution and results fields to featuredProjects in data/profile.js. Each case study page should use the same black & white style, a big hero title with the word-reveal animation, and its own SEO metadata. Link the work cards to these pages.

### 5. Blog for SEO
> Add an MDX blog in /content/blog with app/blog/page.js and app/blog/[slug]/page.js. Use the same fonts (Inter Tight + Instrument Serif italic), Article schema, and add the posts to app/sitemap.js.

### 6. Testimonials (only real ones)
> Add a testimonials section between Work and Process with a horizontal drag/scroll carousel in black & white. Read testimonials from a `testimonials` array in data/profile.js (name, role, company, quote). Hide the section if the array is empty.

### 7. Pre-deploy check
> Run `npm run build` and fix any errors. Then run a Lighthouse-style review: accessibility (alt text, contrast, focus states), SEO and performance on mobile. Fix the issues without changing the design.
