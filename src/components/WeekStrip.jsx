import { useState } from 'react'
import { DOWS, WEEK_NUMS, TODAY_NUM } from '../data'

export default function WeekStrip({ periodOn }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="week">
      {WEEK_NUMS.map((n, i) => {
        const today = n === TODAY_NUM
        // June 10–16 are the 7 logged days; day 1 solid, days 2–7 lighter
        const period = periodOn && n >= 10 && n <= 16
        const pred = period && n > 10
        const cls = [
          'day',
          today && 'today',
          selected === n && 'sel',
          period && 'period',
          pred && 'pred',
        ].filter(Boolean).join(' ')
        return (
          <div key={n} className={cls} onClick={() => setSelected(n)}>
            <span className="dow">{today ? 'TODAY' : DOWS[i]}</span>
            <span className="num">{n}</span>
          </div>
        )
      })}
    </div>
  )
}
