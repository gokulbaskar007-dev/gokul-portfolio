# Your project screenshots in the Work cards

1. Copy everything in this zip into D:\gokul-portfolio and replace when asked:
   - app/components/Work.js
   - app/components/work-shots.css
   - data/projects.js
   - scripts/capture-screens.mjs
   - public/projects/<5 folders>/screen-1.jpg   (your screenshots, cleaned up)

2. Check locally:   npm run dev   -> http://localhost:3000/#work

3. Go live:
   git add .
   git commit -m "Project cards with real screenshots"
   git push

## Add more screenshots to a card
Save them as public/projects/<slug>/screen-2.jpg, screen-3.jpg ...
In data/projects.js, change  shots("tasks")  to  shots("tasks", 3).
Each extra screenshot becomes a new slide (1 / 4, 2 / 4 ...).

Slugs: tasks, betadigitalmarketing-in, ipecsolutions, betadigitalmarketing-com, networkerschamp
