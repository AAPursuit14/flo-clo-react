# Flo-Clo (React + Vite)

A clone of the **Flo** period-tracking app's home screen and its **"My Daily
Insights"** carousel. Built as a project for an **AI Native cohort** to practice
recreating a real, polished mobile interface and then improving on it.

> **Live demo:** [flo-clo-react.vercel.app](https://flo-clo-react.vercel.app/)

---

## What this project is

This is a working, interactive recreation of one screen of the Flo app: the
"Today" home screen, with its week strip, cycle prediction, the row of swipeable
"My Daily Insights" cards, and the flows those cards open (story pop-ups and the
symptom-logging sheet). All copy and icons are placeholders — it's a visual and
behavioral clone for learning, not a real health app, and nothing here is
medical advice.

---

## The feature that was cloned, and how it works

The centerpiece is the **My Daily Insights carousel** on the home screen and
everything it opens:

- **Home screen** — a status bar, a week strip (June 7–13 with the 10th as
  "today"), a hero that predicts your cycle, a "Log period" button, the insights
  carousel, and the bottom tab bar.
- **Log period** — tapping it marks June 10–16 on the week strip as period days
  (day 1 solid, days 2–7 lighter) and updates the hero text; tapping again
  removes it.
- **The carousel** — a horizontally swipeable row of cards. The first card opens
  the symptom-logging sheet; the rest open full-screen **story overlays** (like
  Instagram stories) with progress bars you tap left/right to move through.
- **Log your symptoms sheet** — a bottom sheet with a "what are you feeling"
  row, many symptom categories rendered from a data list (each a set of tappable
  chips), and a save button that counts your selections.
- **Dismiss gestures** — story overlays swipe up to close; the bottom sheets are
  dragged down by their handle to close, without interfering with scrolling the
  long category list.

---

## Two versions: static clone vs. React build

This repository is the **React + Vite version**.

There is also a separate **static HTML version** — a single self-contained
`.html` file (`flo-clo.html`, kept here for reference) that was the original
"before" clone. The two together show the same design built two ways:

- **Static HTML clone** — everything in one file, quick to throw together, good
  for capturing a look fast.
- **React build (this repo)** — the same app broken into reusable components
  with proper state management, which is what makes the improvements below
  practical to build and maintain.

Seeing them side by side is the point: it shows the jump from a static mockup to
a real, structured front-end app.

---

## Improvements built beyond the clone

These go past a straight copy of the original screen:

- **Redesigned "Edit categories" page** — matches the real Flo layout. With the
  "Suggested categories" toggle off, each category has a red **−** button to
  remove it (it drops into a "Removed" list you can add back from with a green
  **+**) and a **≡** grab handle to **drag-reorder** the list. The order and
  which categories are shown drive the symptom sheet directly. Turning the
  toggle on restores all categories in the default order.
- **Four widgets folded into the editable model** — Water, Weight, Basal
  temperature, and Notes used to be pinned to the bottom of the sheet. They're
  now full categories: they can be removed, re-added, and reordered just like
  the rest, and they render wherever you place them.
- **Month-view calendar** — tapping the calendar icon opens a full June 2026
  month grid, with today and any logged period days highlighted, and tap-to-
  select on any day.
- **Drag-to-close sheets** — the symptom sheet and Edit categories page close by
  dragging their handle down (the sheet follows your finger and snaps shut),
  which is the natural motion for a bottom sheet.
- **Water tap fix** — fixed a bug where tapping the water **+** quickly only
  counted one tap; rapid taps now add up correctly.

---

## Next week's planned iteration

The "Suggested categories" toggle will grow into a **library of additional
categories**. When you remove a default category, you'll be able to browse and
add new ones from this library — so the list isn't limited to the original
defaults, and you can build a logging setup that fits you.

---

## How to run it locally

You'll need [Node.js](https://nodejs.org) installed (it includes `npm`).

1. Open a terminal in this project folder.
2. Install the dependencies (one time):

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

The terminal will print a local address (such as `http://localhost:5173`) —
open it in your browser to use the app. Press `Ctrl+C` in the terminal to stop
it.

To build the production version (what gets deployed), run `npm run build`.
