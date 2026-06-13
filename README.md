# Flo-Clo (React)

A class-project clone of the Flo app's home screen and "My Daily Insights"
carousel, rebuilt as a React + Vite app from a single-file HTML prototype
([flo-clo.html](flo-clo.html), kept here as the reference).

## Features

- **Home screen** — status bar, week strip, hero with cycle prediction, tab bar
- **Log period** — toggles June 10–16 as period days on the week strip and
  swaps the hero text
- **My Daily Insights carousel** — horizontally swipeable cards
- **Story overlays** — tap left/right to move through segments, swipe up to
  fade back home
- **Log your symptoms sheet** — quick feelings, 11 chip categories, water /
  weight / temperature / notes widgets, save button that counts selections
- **Edit categories** — toggles show/hide categories in the symptom sheet
- All pop-ups dismiss with a swipe-up gesture that doesn't conflict with
  scrolling the category list

## Run it

```bash
npm install
npm run dev
```

Built for a class project. All content is placeholder copy; not medical advice.
