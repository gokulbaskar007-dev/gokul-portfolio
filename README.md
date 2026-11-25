# Gokul B — Portfolio

A black-and-white Next.js portfolio with project previews, a résumé download, and a Website Check quiz that visitors can share via WhatsApp.

## Run it (Google Antigravity)

1. Unzip → open the folder in Antigravity (File → Open Folder).
2. Terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

Use Node.js 20.9 or later (`node -v`).

## Edit content

Edit profile and section content in `data/profile.js`. Project cards and screenshot paths are in `data/projects.js`.

| What | Where |
|---|---|
| Profile and section content | `data/profile.js` |
| Project cards and screenshots | `data/projects.js` |
| Hero cut-out photo | `public/gokul.webp` (transparent PNG/WebP works best) |
| About-section photo | `public/gokul-portrait.webp` |
| Résumé download | `public/gokul-b-resume.pdf` |
| Colours, fonts, spacing | `app/globals.css` (top `:root`) |
| Logo and favicon | `app/components/Header.js`, `app/components/Footer.js`, `app/icon.svg` |

### Refresh project screenshots

Install the optional capture tool from the project folder. It uses your installed Chrome or Playwright Chromium.

```bash
npm install --no-save --package-lock=false playwright
node scripts/capture-screens.mjs betadigitalmarketing-in
```

Omit the slug to capture every configured project. For public projects, the first desktop capture replaces `public/projects/<slug>/screen-1.jpg`, which project cards use for their local screenshot. The script saves the remaining desktop and mobile captures alongside it. Beta Tasks requires a sign-in, so update its dashboard screenshot manually. If Chrome is unavailable, run `npx playwright install chromium`.

## Motion

Lenis smooths wheel scrolling. Content fades in as it enters the viewport, and the hero includes animated counters, floating cards, and a rotating badge. CSS drives the scrolling marquees and card hover effects. The site respects the system’s reduced-motion preference.

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

Next.js 16 · React 19 · Lenis · Inter Tight + Instrument Serif
(self-hosted via Fontsource, so there are no Google Fonts calls).
