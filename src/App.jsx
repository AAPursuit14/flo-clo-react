import { useState, useRef, useCallback } from 'react'
import { stories, categories } from './data'

const DEFAULT_ORDER = categories.map((c) => c.title)
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
import MonthCalendar from './components/MonthCalendar'
import Toast from './components/Toast'
import useOverlay from './hooks/useOverlay'

export default function App() {
  const [periodOn, setPeriodOn] = useState(false)
  const [storyKey, setStoryKey] = useState(null)
  const [seg, setSeg] = useState(0)
  const [activeCats, setActiveCats] = useState(DEFAULT_ORDER) // ordered titles shown on the sheet
  const [removedCats, setRemovedCats] = useState([])          // titles parked for re-adding
  const [suggested, setSuggested] = useState(false)           // "Suggested categories" toggle
  const [toast, setToast] = useState({ msg: '', show: false })
  const [placeholder, setPlaceholder] = useState(null) // {emoji, title} or null
  const toastTimer = useRef(null)

  const storyOv = useOverlay()
  const sheetOv = useOverlay()
  const editOv = useOverlay()
  const calOv = useOverlay()

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
  const deleteCat = (title) => {
    setActiveCats((prev) => prev.filter((t) => t !== title))
    setRemovedCats((prev) => (prev.includes(title) ? prev : [...prev, title]))
    showToast(title + ' removed')
  }
  const readdCat = (title) => {
    setRemovedCats((prev) => prev.filter((t) => t !== title))
    setActiveCats((prev) => (prev.includes(title) ? prev : [...prev, title]))
    showToast(title + ' added')
  }
  const reorderCats = (newOrder) => setActiveCats(newOrder)
  const toggleSuggested = () => {
    const next = !suggested
    setSuggested(next)
    if (next) {
      // "Suggested" on → all categories back, in default order
      setActiveCats(DEFAULT_ORDER)
      setRemovedCats([])
      showToast('All categories added · default order')
    }
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
        <TopBar onOpenCalendar={calOv.open} />
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
        activeCats={activeCats}
        onClose={sheetOv.close}
        onEditCats={editOv.open}
        toast={showToast}
      />

      <EditCategories
        className={editOv.className}
        activeCats={activeCats}
        removedCats={removedCats}
        suggested={suggested}
        onDelete={deleteCat}
        onReadd={readdCat}
        onReorder={reorderCats}
        onToggleSuggested={toggleSuggested}
        onClose={editOv.close}
      />

      {calOv.isOpen && (
        <MonthCalendar
          className={calOv.className}
          periodOn={periodOn}
          onClose={calOv.close}
        />
      )}

      <TabBar activeLabel={placeholder ? placeholder.title : 'Today'} onTap={tapTab} />
      <Toast message={toast.msg} show={toast.show} />
    </div>
  )
}
