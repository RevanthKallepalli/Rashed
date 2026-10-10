# Mohd Rashed — Personal Training Website

A premium, gym-themed personal trainer website built as a scroll "journey": the visitor moves through nine sets, and a barbell tracker adds plates and kilograms as each section passes.

Built with **React 18 + Vite**, **Three.js** (3D barbell) and **GSAP + ScrollTrigger** (scroll transitions).

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # serve the production build locally
```

The `base: './'` setting in `vite.config.js` makes the build work from any path, including a GitHub Pages sub-folder.

## Push to GitHub

```bash
git init
git add .
git commit -m "Mohd Rashed training website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy

- **Vercel / Netlify:** import the GitHub repo. Build command `npm run build`, output folder `dist`.
- **GitHub Pages:** run `npm run build` and publish the `dist` folder (for example with the `gh-pages` package or a Pages GitHub Action).

## Project structure

```
index.html                 Page shell, fonts, meta tags
public/images/             Hero, physique, client before/after and check-in photos
src/
  main.jsx                 React entry
  App.jsx                  Page layout and shared booking state
  data.js                  ALL text, prices, certifications, goals, record — edit content here
  styles.css               Design tokens (colours, fonts) and all styles
  lib/motion.js            GSAP + ScrollTrigger setup
  hooks/useScrollFX.js     Scroll-driven transitions between sections
  hooks/usePointerFX.js    3D card tilt and magnetic buttons
  components/
    BarbellScene.jsx       Three.js barbell with chalk dust (drag to spin)
    Chrome.jsx             Loader, custom cursor, nav, journey HUD
    Hero.jsx               Opening section and achievements marquee
    Journey.jsx            Coach, Physique, Credentials, Programs, Nutrition
    Finale.jsx             Results, Competition record, Plans, Contact form
    WhatsApp.jsx           WhatsApp icon and floating chat button
    Split.jsx              Letter-by-letter heading animation helper
```

## Editing content

- **Plans, contact details, WhatsApp number, goals, certifications, competition record:** `src/data.js`
- **WhatsApp:** every booking button opens a chat with +91 83411 92208 with a pre-filled message. Change the number in `CONTACT.phoneRaw` in `src/data.js`.
- **Colours and fonts:** the `:root` block at the top of `src/styles.css`
- **Photos:** replace files in `public/images/` keeping the same names

The meal options in the Nutrition section are an illustrative example day, not a client's real plan.

## Sections

| Set | Section | Interaction |
|---|---|---|
| — | Hero | 3D barbell (drag to spin, follows mouse), plates slide on after the loader |
| 01 | Coach | Animated counters, tilting feature cards |
| 02 | Physique | Expanding photo panels |
| 03 | Credentials | Certifications as weight plates — filter and flip |
| 04 | Programs | Goal selector with 3D panel transitions |
| 05 | Nutrition | Meal-swap demo, calorie ring stays locked |
| 06 | Results | Drag-to-compare before/after sliders, check-in chart |
| 07 | Record | Horizontal pinned timeline of titles (desktop) |
| 08 | Plans | Tilt cards with WhatsApp enquiry buttons, sessions-per-week slider for personal training |
| 09 | Contact | Form that builds a WhatsApp message, plus a floating WhatsApp button on every screen |

Motion respects the visitor's "reduce motion" setting.
