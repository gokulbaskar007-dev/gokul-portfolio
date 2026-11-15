# Gokul B — Portfolio v2 (Black & White · Next.js + GSAP)

Apple-style, black & white portfolio with cinematic scroll animations and an interactive
"Website Check" that turns visitors into WhatsApp leads.

## Run it (Google Antigravity)

1. Unzip → open the folder in Antigravity (File → Open Folder).
2. Terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

Node.js 20+ needed (`node -v`).

## Edit content — one file

Everything (headline, projects, services, process, quiz questions, journey, FAQ, contact) lives in
`data/profile.js`. Change text there; the design updates itself.

| What | Where |
|---|---|
| All text & links | `data/profile.js` |
| Hero cut-out photo | `public/gokul.webp` (transparent PNG/WebP works best) |
| About-section photo | `public/gokul-portrait.webp` |
| Résumé download | `public/gokul-b-resume.pdf` |
| Colours, fonts, spacing | `app/globals.css` (top `:root`) |
| Logo (G mark) | `app/components/Logo.js` |

## Sections & animations

| Section | Animation |
|---|---|
| Preloader | G logo draws itself, 000→100 counter, curtain lifts (first visit only) |
| Hero | Word-by-word headline reveal, photo rises in, 3D glass chips float + follow the mouse, connector lines draw, rotating badge |
| Brands marquee | Infinite scroll, pauses on hover |
| Statement | Words fill grey → black as you scroll, numbers count up |
| Services (bento) | Cards tilt in 3D toward the mouse |
| Selected Work | Giant title slides in from both sides; project cards stack and shrink on scroll; screens tilt up |
| WordPress list | Black fill wipes up on hover |
| Process | Sticky stacking cards |
| Website Check | 7-question quiz → animated score ring + personal fix list → "Send my report to Gokul" on WhatsApp |
| About / Journey | Timeline line draws as you scroll, photo zooms |
| Contact | Giant GOKUL letters rise, magnetic buttons |
| Everywhere | Lenis smooth scroll, custom cursor (desktop), fade-up reveals |

Animations respect "Reduce motion" settings, and the cursor and tilt effects switch off on touch devices.

## Free hosting (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Portfolio v2"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gokul-portfolio.git
git push -u origin main
```
Then go to vercel.com and sign in with GitHub. Click Add New → Project, pick the repo, then Deploy.
Once it's live, put the real URL in `siteUrl` inside `data/profile.js`, then push again.

## After launch (SEO checklist)

- Search Console → submit `/sitemap.xml`
- Rich Results Test → Person + FAQ schema should pass
- PageSpeed Insights → aim for 90+ on mobile
- Add the link to LinkedIn (Featured + Contact info)

## Tech

Next.js 16 · React 19 · GSAP 3 (+ ScrollTrigger, @gsap/react) · Lenis · Inter Tight + Instrument Serif
(self-hosted via Fontsource, so there are no Google Fonts calls).
