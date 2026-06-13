import { useState } from 'react'
import { categories, quickItems } from '../data'
import useDragToClose from '../hooks/useDragToClose'

const catByTitle = Object.fromEntries(categories.map((c) => [c.title, c]))

function dayLabel(offset) {
  if (offset === 0) return 'Today'
  if (offset < 0) return `${Math.abs(offset)} day${offset < -1 ? 's' : ''} ago`
  return `In ${offset} day${offset > 1 ? 's' : ''}`
}

export default function SymptomSheet({ className, activeCats, onClose, onEditCats, toast }) {
  const [selected, setSelected] = useState(() => new Set())
  const [water, setWater] = useState(0)
  const [dayOffset, setDayOffset] = useState(0)
  const drag = useDragToClose(onClose)

  const toggle = (key) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const n = selected.size
  const cycleDay = 21 + dayOffset

  const bumpWater = (d) => {
    const next = Math.max(0, Math.min(64, water + 8 * d))
    setWater(next)
    if (d > 0 && next <= 64) toast(`Water: ${next} fl. oz. logged`)
  }

  const saveLog = () => {
    onClose()
    toast(`${n} symptom${n > 1 ? 's' : ''} logged`)
    setSelected(new Set())
  }

  return (
    <div className={`sheet ${className}`} style={drag.dragStyle}>
      <div className="grabzone" {...drag.grabProps}>
        <div className="handle"></div>
      </div>
      <div className="sheet-head">
        <div className="arrow" onClick={() => setDayOffset(dayOffset - 1)}>‹</div>
        <div className="ttl">
          <b>{dayLabel(dayOffset)}</b>
          <small>Cycle day {cycleDay}</small>
        </div>
        <div className="arrow" onClick={() => setDayOffset(dayOffset + 1)}>›</div>
      </div>
      <div className="sheet-body" data-scrollable="">
        <div className="search">🔍 Search</div>

        <div className="feel">
          <h3>What are you feeling today?</h3>
          <div className="quick">
            {quickItems.map((q) => (
              <div
                key={q.l}
                className={`qitem ${selected.has(`quick|${q.l}`) ? 'on' : ''}`}
                onClick={() => toggle(`quick|${q.l}`)}
              >
                <div className="qc">{q.e}</div>
                <div className="ql">{q.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cats">
          <h3>Categories</h3>
          <span className="edit" onClick={onEditCats}>Edit</span>
        </div>

        {activeCats.map((title) => catByTitle[title]).filter(Boolean).map((c) => (
          <div className="catcard" key={c.title}>
            <h4>
              {c.title}
              {c.tutorial && <span className="tut">Tutorial ▶</span>}
            </h4>
            {c.subtitle && <div className="subt">{c.subtitle}</div>}
            <div className="chips">
              {c.chips.map(([emoji, label]) => {
                const key = `${c.title}|${label}`
                return (
                  <div
                    key={key}
                    className={`chip ${c.cls} ${selected.has(key) ? 'on' : ''}`}
                    onClick={() => toggle(key)}
                  >
                    <span className="ce">{emoji}</span>{label}
                  </div>
                )
              })}
            </div>
            {c.link && (
              <div className="linkrow" onClick={() => toast(c.link)}>
                {c.link} <span>›</span>
              </div>
            )}
          </div>
        ))}

        {/* widgets */}
        <div className="catcard">
          <div className="wrow">
            <span className="wic">🥤</span><h4>Water</h4>
            <div className="wbtns">
              <button className="roundbtn" onClick={() => bumpWater(-1)}>−</button>
              <button className="roundbtn dark" onClick={() => bumpWater(1)}>+</button>
            </div>
          </div>
          <div className="wval"><b>{water}</b>/ 64 fl. oz.</div>
          <div className="linkrow" onClick={() => toast('Reminders and Settings')}>
            Reminders and Settings <span>›</span>
          </div>
        </div>
        <div className="catcard">
          <div className="wrow">
            <span className="wic">⚖️</span><h4>Weight</h4>
            <div className="wbtns">
              <button className="roundbtn" onClick={() => toast('Weight cleared')}>🗑</button>
              <button className="roundbtn dark" onClick={() => toast('Log your weight')}>✏️</button>
            </div>
          </div>
          <div className="whint">Log your weight</div>
          <div className="linkrow" onClick={() => toast('View chart')}>View chart <span>›</span></div>
        </div>
        <div className="catcard">
          <div className="wrow">
            <span className="wic">🌡️</span><h4>Basal temperature</h4>
            <div className="wbtns">
              <button className="roundbtn" onClick={() => toast('Temperature cleared')}>🗑</button>
              <button className="roundbtn dark" onClick={() => toast('Log your temperature')}>✏️</button>
            </div>
          </div>
          <div className="whint">Log your temperature</div>
          <div className="linkrow" onClick={() => toast('View chart')}>View chart <span>›</span></div>
        </div>
        <div className="catcard">
          <div className="wrow">
            <span className="wic">📝</span><h4>Notes</h4>
            <div className="wbtns">
              <button className="roundbtn" onClick={() => toast('Note cleared')}>🗑</button>
              <button className="roundbtn dark" onClick={() => toast('Add a note')}>✏️</button>
            </div>
          </div>
          <div className="whint">Add a note about today</div>
        </div>

        <div style={{ height: 20 }}></div>
      </div>
      <div className="savebar">
        <button className="savebtn" disabled={n === 0} onClick={saveLog}>
          {n === 0 ? 'Select to save' : `Save ${n} symptom${n > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  )
}
