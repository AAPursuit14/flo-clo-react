import { useState, useRef, useCallback } from 'react'
import { stories } from './data'
import StatusBar from './components/StatusBar'
import TopBar from './components/TopBar'
import WeekStrip from './components/WeekStrip'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import TabBar from './components/TabBar'
import Placeholder from './components/Placeholder'
import StoryOverlay from './components/StoryOverlay'
import SymptomSheet from './components/SymptomSheet'
import EditCategories from './components/EditCategories'
import Toast from './components/Toast'
import useOverlay from './hooks/useOverlay'

export default function App() {
  const [periodOn, setPeriodOn] = useState(false)
  const [storyKey, setStoryKey] = useState(null)
  const [seg, setSeg] = useState(0)
  const [hiddenCats, setHiddenCats] = useState(() => new Set())
  const [toast, setToast] = useState({ msg: '', show: false })
  const [placeholder, setPlaceholder] = useState(null) // {emoji, title} or null
  const toastTimer = useRef(null)

  const storyOv = useOverlay()
  const sheetOv = useOverlay()
  const editOv = useOverlay()

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1900)
  }, [])

  /* ---- log period: toggles June 10–16 on the week strip + hero text ---- */
  const logPeriod = () => {
    const next = !periodOn
    setPeriodOn(next)
    showToast(next ? 'Period logged · next 7 days marked' : 'Period log removed')
  }

  /* ---- stories ---- */
  const story = storyKey ? stories[storyKey] : null
  const openCard = (card) => {
    if (card.action === 'sheet') { sheetOv.open(); return }
    const s = stories[card.story]
    setStoryKey(card.story)
    setSeg(s.start - 1)
    storyOv.open()
  }
  const storyNext = () => {
    if (!story) return
    if (seg < story.segs - 1) setSeg(seg + 1)
    else storyOv.close()
  }
  const storyPrev = () => { if (story && seg > 0) setSeg(seg - 1) }

  /* ---- edit categories ---- */
  const toggleCat = (title) => {
    setHiddenCats((prev) => {
      const next = new Set(prev)
      const removing = !next.has(title)
      removing ? next.add(title) : next.delete(title)
      showToast(title + (removing ? ' removed' : ' added'))
      return next
    })
  }

  /* ---- tabs ---- */
  const tapTab = (t) => {
    if (t.k === 'today') { setPlaceholder(null); return }
    setPlaceholder({ emoji: t.i, title: t.l })
  }

  return (
    <div className="phone">
      {/* ===== HOME SCREEN ===== */}
      <div className="screen">
        <StatusBar />
        <TopBar />
        <WeekStrip periodOn={periodOn} />
        <Hero periodOn={periodOn} onLogPeriod={logPeriod} />
        <div className="lower">
          <div className="sec-h">My daily insights <span>· Today</span></div>
          <Carousel onOpenCard={openCard} />
          <div className="later">
            <div className="lh">Later in your cycle</div>
            <div className="preg" onClick={() => showToast('Article: Am I pregnant?')}>
              <h3>Am I<br />pregnant?</h3>
              <div className="face">🧑</div>
            </div>
          </div>
        </div>
        <div style={{ height: 90 }}></div>
      </div>

      <Placeholder
        show={!!placeholder}
        emoji={placeholder?.emoji ?? '✨'}
        title={placeholder?.title ?? 'Coming soon'}
        onBack={() => setPlaceholder(null)}
      />

      {storyOv.isOpen && (
        <StoryOverlay
          story={story}
          seg={seg}
          className={storyOv.className}
          onNext={storyNext}
          onPrev={storyPrev}
          onClose={storyOv.close}
        />
      )}

      {/* Sheet and edit page stay mounted so selections, water count and
          day position survive closing, like the prototype's hidden DOM. */}
      <SymptomSheet
        className={sheetOv.className}
        hiddenCats={hiddenCats}
        onClose={sheetOv.close}
        onEditCats={editOv.open}
        toast={showToast}
      />

      <EditCategories
        className={editOv.className}
        hiddenCats={hiddenCats}
        onToggleCat={toggleCat}
        onClose={editOv.close}
      />

      <TabBar activeLabel={placeholder ? placeholder.title : 'Today'} onTap={tapTab} />
      <Toast message={toast.msg} show={toast.show} />
    </div>
  )
}
