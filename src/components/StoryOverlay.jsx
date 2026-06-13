import useSwipeUp from '../hooks/useSwipeUp'

/* Story body layouts, matching the prototype markup */
function PatternsBody({ story }) {
  return (
    <>
      <h2 style={{ color: story.titleColor }}>{story.title}</h2>
      <p>{story.text}</p>
      <div className="grid">
        <div className="cols"><span>1</span><span>2</span><span>3</span></div>
        {[1, 2, 3].map((r) => (
          <div className="row" key={r}>
            <span className="name">Cycle {r}</span>
            <div className="cells">
              <div className="cell"></div>
              <div className={`cell ${r === 1 ? 'check' : ''}`}>{r === 1 ? '✓' : ''}</div>
              <div className="cell"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function QuoteBody({ story }) {
  return (
    <>
      <div className="qhero">🤝</div>
      <div className="qhead">Why does it<br />matter?</div>
      <div className="qcard">
        <div className="q">{story.quote}</div>
        <div className="qby">
          <div className="pf">👩‍⚕️</div>
          <small><b>{story.quoteBy}</b><br />{story.quoteRole}</small>
        </div>
      </div>
    </>
  )
}

function ArticleBody({ story }) {
  return (
    <>
      <h2 style={story.titleColor ? { color: story.titleColor } : undefined}>{story.title}</h2>
      <p>{story.text}</p>
    </>
  )
}

const bodies = { patterns: PatternsBody, quote: QuoteBody, article: ArticleBody }

export default function StoryOverlay({ story, seg, className, onNext, onPrev, onClose }) {
  const swipe = useSwipeUp(onClose)
  if (!story) return null
  const Body = bodies[story.kind]

  return (
    <div className={`story ${className}`} style={{ background: story.bg }} {...swipe}>
      <div className="bars">
        {Array.from({ length: story.segs }, (_, i) => (
          <div key={i} className={`bar ${i < seg ? 'done' : i === seg ? 'active' : ''}`}>
            <i></i>
          </div>
        ))}
      </div>
      <div className="story-top">
        <span className="meta">{story.meta}</span>
        <button className="x" onClick={onClose}>✕</button>
      </div>
      <div className="story-body" data-scrollable="">
        <Body story={story} />
      </div>
      <div className="swipe" onClick={onClose}>
        <div className="chev">⌃</div>
        <div className="st">SWIPE UP</div>
        <div className="sb">to go back home</div>
      </div>
      <div className="nav-zone left" onClick={onPrev}></div>
      <div className="nav-zone right" onClick={onNext}></div>
    </div>
  )
}
