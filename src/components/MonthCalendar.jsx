import { useState } from 'react'
import { monthName, monthDows, monthWeeks } from '../data'
import useSwipeUp from '../hooks/useSwipeUp'

/*
 * Full-month grid, opened from the calendar icon in the top bar.
 * Mirrors the week strip's highlights: today (June 10) and, when a period is
 * logged, June 10–16 (day 1 solid, days 2–7 lighter). Tap a day to select it.
 */
export default function MonthCalendar({ className, periodOn, onClose }) {
  const [selected, setSelected] = useState(null)
  const swipe = useSwipeUp(onClose)

  return (
    <div className={`monthcal ${className}`} {...swipe}>
      <div className="mc-head">
        <button className="x" onClick={onClose}>‹</button>
        <h2>{monthName}</h2>
        <span></span>
      </div>

      <div className="mc-dows">
        {monthDows.map((d, i) => <span key={i}>{d}</span>)}
      </div>

      <div className="mc-grid">
        {monthWeeks.flat().map((cell, idx) => {
          const today = !cell.mute && cell.n === 10
          const period = periodOn && !cell.mute && cell.n >= 10 && cell.n <= 16
          const pred = period && cell.n > 10
          const sel = selected === idx && !cell.mute
          const cls = [
            'mc-cell',
            cell.mute && 'mute',
            today && 'today',
            sel && 'sel',
            period && 'period',
            pred && 'pred',
          ].filter(Boolean).join(' ')
          return (
            <div key={idx} className={cls} onClick={() => !cell.mute && setSelected(idx)}>
              <span className="mc-num">{cell.n}</span>
            </div>
          )
        })}
      </div>

      <div className="swipe" onClick={onClose}>
        <div className="chev">⌃</div>
        <div className="st">SWIPE UP</div>
        <div className="sb">to go back home</div>
      </div>
    </div>
  )
}
