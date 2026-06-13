import { tabs } from '../data'

export default function TabBar({ activeLabel, onTap }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <div
          key={t.l}
          className={`tab ${activeLabel === t.l ? 'active' : ''}`}
          onClick={() => onTap(t)}
        >
          <div className="ti">{t.i}</div>
          {t.dot ? <div className="dot"></div> : null}
          {t.l}
        </div>
      ))}
    </div>
  )
}
