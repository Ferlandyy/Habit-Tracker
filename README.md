# Habit Tracker

Add habits, tick your day, and keep your streaks going. Built with **Vanilla JS (no frameworks)**. Data persists in **localStorage**.

## Live Demo
- **Pages**: https://habit-tracker-3y2b.onrender.com 
- **Repository**: https://github.com/Ferlandyy/habit-tracker


---

## Features
- Add a habit
- Toggle last **7 days** (D-6 … Today)
- **“Tick today”** shortcut
- Live **current streak** calculation
- Delete with confirm
- Responsive, keyboard-accessible UI (visible focus, labels, contrast)

---

## Tech Stack
- HTML, CSS, **Vanilla JavaScript**
- **localStorage** (JSON stringify/parse)
- Render for hosting

---

## Screenshots

<img width="1561" height="983" alt="image" src="https://github.com/user-attachments/assets/eea62640-03b4-4db3-903e-2d5ac4848e2b" />

<img width="1076" height="646" alt="image" src="https://github.com/user-attachments/assets/f6143933-e8d1-48c6-a312-7ce7fbb41c7e" />


## Getting Started (Run Locally)

### Windows
- You can do so by simply running index.html file from the folder

### MacOS

```bash
git clone https://github.com/Ferlandyy/habit-tracker.git
cd habit-tracker
start index.html
```

## Self-Assessment 

| Criterion | Evidence |
|---|---|
| MVP works (add / toggle / persist) | Add a habit; toggle Today and previous days; refresh to confirm persistence via `localStorage`. |
| UX & accessibility | Labels for inputs; all cells are buttons; visible focus rings; keyboard operable (Tab/Enter/Space); responsive table with horizontal scroll on small screens; sufficient color contrast. |
| Public deployment | Live site published on GitHub Pages at: https://ferlandyy.github.io/habit-tracker/ |
| Code quality | Clear separation of concerns across HTML/CSS/JS; helper functions for dates; no framework; concise naming; no dead code. |
| Reflection (200–300 words) | Included below in “Reflection”. |

## Reflection

This project taught me how much you can accomplish with Vanilla JavaScript when you structure the DOM, state, and events carefully. I began by planning the page as three parts: the HTML table for habits and days, a compact CSS theme with clear focus styles, and a single `app.js` to handle state and persistence. The most valuable lesson was modeling data simply: each habit stores an array of ISO dates it was completed. Using `YYYY-MM-DD` strings avoided timezone confusion and made streak logic straightforward.

My main challenge was computing a live “current streak” and keeping the seven-day window aligned with the user’s local midnight. I solved this in two steps: a small `toISODate()` helper that always formats dates consistently, and a midnight timer that recalculates the rolling week so “Today” automatically advances without a reload. This improved correctness and made the app feel alive.

Accessibility was another focus. Turning day cells into real buttons (with `aria-pressed`) gave keyboard users a predictable experience, and visible focus rings plus good color contrast made interactions clear. I also learned to lean on the browser’s storage for a stateless deployment: persistence via `localStorage` kept the code simple and ideal for GitHub Pages.

If I iterate further, I’d add export/import JSON, drag-to-reorder habits, and a light/dark theme toggle. Overall, this was a concise but realistic exercise in DOM work, date handling, and shipping a small, accessible app.

## Demo Video (3–5 minutes)

**Link:** https://video.laurea.fi/media/2025-11-12%2017-35-36/0_12l4i3uh

**Timestamps**
- 00:00–00:30 — Intro  
  Name, course, project title (“Habit Tracker”), one-line problem statement.
- 00:30–02:03 — Overview + live demo 
  Files (`index.html`, `styles.css`, `app.js`), Vanilla JS + `localStorage`, main features. 
  1) Add habit “Going to the gym”  
  2) Click **Today** → shows “Yes”, streak increments  
  3) Toggle earlier days to simulate a streak  
  4) Refresh page → data persists (optional: show Application → Local Storage)  
  5) Delete habit → confirm dialog
- 02:03–03:42 — Challenge & solution  
  Streak logic + midnight rollover; ISO date helper; rolling 7-day window.

