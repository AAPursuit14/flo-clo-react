/* All content for the app, cloned 1:1 from the flo-clo.html prototype. */

export const DOWS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const WEEK_NUMS = [7, 8, 9, 10, 11, 12, 13]
export const TODAY_NUM = 10

/* carousel cards — `kind` picks the JSX layout in InsightCard */
export const cards = [
  { id: 'log', cls: 'c-log', action: 'sheet', kind: 'log' },
  { id: 'expect', cls: 'c-expect', action: 'story', story: 'patterns', kind: 'expect' },
  { id: 'sex', cls: 'c-sex', action: 'story', story: 'sexdrive', kind: 'sex' },
  { id: 'myth', cls: 'c-myth', action: 'story', story: 'myth', kind: 'myth' },
  { id: 'disch', cls: 'c-disch', action: 'story', story: 'discharge', kind: 'disch' },
  { id: 'pcos', cls: 'c-pcos', action: 'story', story: 'pcos', kind: 'pcos' },
  { id: 'cycle', cls: 'c-cycle', action: 'story', story: 'cycle40', kind: 'cycle' },
]

/* story overlays — `kind` picks the body layout in StoryOverlay */
export const stories = {
  patterns: {
    bg: '#e7d4ef', segs: 6, start: 1, meta: 'June 10 · Cycle day 21',
    swipe: 'to log your symptoms', kind: 'patterns',
    titleColor: '#a01a86',
    title: "We haven't found any patterns yet",
    text: "Flo-Clo checks your symptoms to see if any repeat. Keep logging — if a pattern shows up, you'll see it here, plus insights to help you understand it.",
  },
  pcos: {
    bg: '#f6d59a', segs: 6, start: 4, meta: 'PCOS · renamed to PMOS',
    swipe: 'to read more', kind: 'quote',
    quote: '"It reminds doctors and society that this isn\'t just an ovary issue. We hope it means many women will get the right diagnosis and treatment sooner."',
    quoteBy: 'Answered by Dr. Alexandra Ho',
    quoteRole: 'Flo-Clo medical advisor, UK',
  },
  sexdrive: {
    bg: '#f7d0ca', segs: 3, start: 1, meta: 'June 10 · Cycle day 21',
    swipe: 'to log how you feel', kind: 'article',
    title: 'Your sex drive may feel neutral right now',
    text: 'In the luteal phase, hormone shifts can level out libido for many people. There\'s no "right" level — logging it just helps Flo-Clo learn what\'s normal for you.',
  },
  myth: {
    bg: '#cdd6f2', segs: 4, start: 1, meta: 'Cycle myths · in your 40s',
    swipe: 'to keep reading', kind: 'article',
    titleColor: '#2c3a63',
    title: 'Myth: your cycle stops mattering in your 40s',
    text: 'Cycles often change in your 40s, but they still carry useful signals. Tracking through this decade helps you tell ordinary shifts apart from ones worth a conversation with a doctor.',
  },
  discharge: {
    bg: '#bcd3c4', segs: 5, start: 2, meta: 'June 10 · Cycle day 21',
    swipe: 'to log discharge', kind: 'article',
    titleColor: '#22463a',
    title: 'Creamy discharge is common right now',
    text: "After ovulation, discharge often turns thicker and creamy. It's a normal part of the cycle. Logging it builds a clearer picture of your patterns over time.",
  },
  cycle40: {
    bg: '#bcd3c4', segs: 6, start: 3, meta: 'Cycle changes · in your 40s',
    swipe: 'to keep reading', kind: 'article',
    titleColor: '#22463a',
    title: '3 common cycle changes in our 40s',
    text: "Shorter cycles, heavier or lighter flow, and more variation month to month are all common as you approach perimenopause. Knowing what's typical makes the changes less alarming.",
  },
}

/* quick "what are you feeling" items */
export const quickItems = [
  { e: '🤱', l: 'Tender breasts' },
  { e: '🍔', l: 'Cravings' },
  { e: '🔋', l: 'Fatigue' },
  { e: '😢', l: 'Mood swings' },
]

/* ALL logging categories (cloned 1:1 from the real app's flat list) */
export const categories = [
  { title: 'Sex and sex drive', cls: '', chips: [['🚫', "Didn't have sex"], ['🔒', 'Protected sex'],
    ['🔓', 'Unprotected sex'], ['💋', 'Oral sex'], ['💗', 'Masturbation'], ['🤲', 'Sensual touch'],
    ['✨', 'Orgasm'], ['💢', 'No orgasm'], ['💕', 'High sex drive'], ['💟', 'Neutral sex drive'], ['🤍', 'Low sex drive']] },
  { title: 'Mood', cls: 't-mood', chips: [['😌', 'Calm'], ['🙂', 'Happy'], ['🤩', 'Energetic'], ['😜', 'Frisky'],
    ['😢', 'Mood swings'], ['😠', 'Irritated'], ['😞', 'Sad'], ['😰', 'Anxious'], ['😔', 'Depressed'],
    ['😣', 'Feeling guilty'], ['🌫️', 'Obsessive thoughts'], ['🪫', 'Low energy'], ['😑', 'Apathetic'],
    ['😕', 'Confused'], ['😖', 'Very self-critical']] },
  { title: 'Symptoms', cls: 't-symp', chips: [['👍', 'Everything is fine'], ['🎯', 'Cramps'], ['🤱', 'Tender breasts'],
    ['🤕', 'Headache'], ['🫥', 'Acne'], ['🔥', 'Backache'], ['🔋', 'Fatigue'], ['🥵', 'Hot flashes'],
    ['😓', 'Night sweats'], ['🌁', 'Brain fog'], ['🦴', 'Joint pain'], ['🌶️', 'Burning mouth'], ['🍔', 'Cravings'],
    ['🌙', 'Insomnia'], ['😖', 'Abdominal pain'], ['🌸', 'Vaginal itching'], ['🏜️', 'Vaginal dryness'],
    ['🧴', 'Dry skin'], ['👁️', 'Dry eyes']] },
  { title: 'Vaginal discharge', cls: 't-disch', chips: [['🚫', 'No discharge'], ['💧', 'Creamy'], ['💦', 'Watery'],
    ['🍯', 'Sticky'], ['🥚', 'Egg white'], ['🩸', 'Spotting'], ['❗', 'Unusual'], ['⚪', 'Clumpy white'], ['🩶', 'Gray']] },
  { title: 'Digestion and stool', cls: 't-dig', chips: [['🤢', 'Nausea'], ['🎈', 'Bloating'], ['🔒', 'Constipation'], ['💨', 'Diarrhea']] },
  { title: 'Pregnancy test', cls: 't-preg', chips: [['🚫', "Didn't take tests"], ['➕', 'Positive'], ['➖', 'Negative'], ['〰️', 'Faint line']] },
  { title: 'Ovulation test', cls: 't-ovul', tutorial: true, subtitle: 'Log them to know when you ovulate',
    chips: [['🧪', 'Log ovulation test'], ['🚫', "Didn't take tests"], ['📋', 'Ovulation: my method']] },
  { title: 'Other', cls: 't-other', chips: [['📍', 'Travel'], ['⚡', 'Stress'], ['🧘', 'Meditation'], ['📖', 'Journaling'],
    ['💪', 'Kegel exercises'], ['🫁', 'Breathing exercises'], ['🩹', 'Disease or injury'], ['🍷', 'Alcohol'], ['💊', 'Hormonal therapy']] },
  { title: 'Physical activity', cls: 't-act', chips: [['🚫', "Didn't exercise"], ['🤸', 'Yoga'], ['🏋️', 'Gym'],
    ['🎵', 'Aerobics & dancing'], ['🏊', 'Swimming'], ['🏀', 'Team sports'], ['🏃', 'Running'], ['🚴', 'Cycling'], ['🚶', 'Walking']] },
  { title: 'Oral contraceptives (OC)', cls: 't-oc', link: 'Set up reminders',
    chips: [['💊', 'Taken on time'], ['⏰', "Yesterday's pill"]] },
  { title: 'Other pills (non-OC)', cls: 't-oc', subtitle: 'Log other pills you take a day', link: 'Set up reminders',
    chips: [['➕', 'Add pill']] },
]

/* widget cards (custom layouts, not chip lists) — orderable/removable like
   categories. Titles must be unique and not collide with category titles. */
export const widgetTitles = ['Water', 'Weight', 'Basal temperature', 'Notes']

/* full month grid (June 2026 — derived from the week strip: June 7 is a
   Sunday and the 10th is "today", which lines up with June 2026). Sunday-first
   rows; days from neighboring months are muted. */
export const monthName = 'June 2026'
export const monthDows = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const monthWeeks = [
  [{ n: 31, mute: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }],
  [{ n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }, { n: 12 }, { n: 13 }],
  [{ n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }, { n: 19 }, { n: 20 }],
  [{ n: 21 }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 }, { n: 26 }, { n: 27 }],
  [{ n: 28 }, { n: 29 }, { n: 30 }, { n: 1, mute: true }, { n: 2, mute: true }, { n: 3, mute: true }, { n: 4, mute: true }],
]

/* bottom tab bar */
export const tabs = [
  { i: '📅', l: 'Today', k: 'today' },
  { i: '🔲', l: 'Insights', k: 'x', dot: 0 },
  { i: '🎭', l: 'Secret Chats', k: 'x', dot: 1 },
  { i: '💬', l: 'Messages', k: 'x', dot: 1 },
  { i: '👥', l: 'Partner', k: 'x', dot: 0 },
]
