import { cards } from '../data'

/* Per-card layouts, matching the prototype markup exactly */
const layouts = {
  log: () => (
    <div className="pad">
      <div className="ic-title">Log your<br />symptoms</div>
      <div className="ic-bottom"><div className="plus">+</div></div>
    </div>
  ),
  expect: () => (
    <div className="pad">
      <div className="ic-title">Symptoms<br />to expect</div>
      <div className="ic-bottom"><div className="lock">🔒</div></div>
    </div>
  ),
  sex: () => (
    <>
      <div className="lbl">Sex drive</div>
      <div className="top"></div>
      <div className="bot"><div className="heart">♥</div><div className="val">Neutral</div></div>
    </>
  ),
  myth: () => (
    <div className="pad">
      <div className="ic-title">Bust common<br />myths in<br />your 40s</div>
      <div className="ic-bottom"><div className="pin">💬</div></div>
    </div>
  ),
  disch: () => (
    <>
      <div className="top"></div>
      <div className="bot"><div className="drop">💧</div>Discharge · Creamy</div>
    </>
  ),
  pcos: () => (
    <div className="pad">
      <div className="ic-title">Why has<br />PCOS been<br />renamed?</div>
      <div className="letters">
        <span className="a">→</span>
        <b className="l1">P</b><b className="l2">M</b><b className="l3">O</b><b className="l4">S</b>
      </div>
    </div>
  ),
  cycle: () => (
    <div className="pad">
      <div className="ic-title">3 common<br />cycle changes<br />in our 40s</div>
      <div className="dice">🎲</div>
    </div>
  ),
}

export default function Carousel({ onOpenCard }) {
  return (
    <div className="carousel">
      {cards.map((c) => (
        <div
          key={c.id}
          className={`insight ${c.cls}`}
          tabIndex={0}
          role="button"
          onClick={() => onOpenCard(c)}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpenCard(c) }}
        >
          {layouts[c.kind]()}
        </div>
      ))}
    </div>
  )
}
