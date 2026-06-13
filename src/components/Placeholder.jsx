export default function Placeholder({ show, emoji, title, onBack }) {
  return (
    <div className={`placeholder ${show ? 'show' : ''}`}>
      <div className="pe">{emoji}</div>
      <h3>{title}</h3>
      <p>
        This tab isn't part of the clone — the build focuses on the Today
        screen and the My Daily Insights carousel.
      </p>
      <button className="logbtn" onClick={onBack}>Back to Today</button>
    </div>
  )
}
