import { useRef, useState } from 'react'
import useDragToClose from '../hooks/useDragToClose'

/*
 * Edit categories page.
 *  - Suggested toggle OFF (grey): manual mode — the red − button removes a
 *    category to the "Removed" list at the bottom, and the ≡ grab handle
 *    drag-reorders the active list (which is the symptom-sheet order).
 *  - Suggested toggle ON (pink): the app manages them — all categories are
 *    restored in default order and the edit controls are locked.
 */
export default function EditCategories({
  className, activeCats, removedCats, suggested,
  onDelete, onReadd, onReorder, onToggleSuggested, onClose,
}) {
  const drag = useDragToClose(onClose)
  const listRef = useRef(null)
  const [dragTitle, setDragTitle] = useState(null)

  /* ----- drag-to-reorder via the ≡ handle ----- */
  const onGripDown = (e, title) => {
    if (suggested) return
    setDragTitle(title)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* test envs */ }
  }
  const onGripMove = (e) => {
    if (dragTitle == null || !listRef.current) return
    const y = e.clientY
    // count how many *other* rows sit above the pointer's midpoint → insert index
    let target = 0
    for (const el of listRef.current.querySelectorAll('.ecrow')) {
      if (el.dataset.title === dragTitle) continue
      const r = el.getBoundingClientRect()
      if (y > r.top + r.height / 2) target++
    }
    const without = activeCats.filter((t) => t !== dragTitle)
    target = Math.max(0, Math.min(target, without.length))
    without.splice(target, 0, dragTitle)
    if (without.some((t, i) => t !== activeCats[i])) onReorder(without)
  }
  const onGripUp = () => setDragTitle(null)

  return (
    <div className={`editcats ${className}`} style={drag.dragStyle}>
      <div className="grabzone" {...drag.grabProps}>
        <div className="handle"></div>
      </div>
      <div className="echead">
        <span className="arrow" onClick={onClose}>‹</span>
        <h2>Edit categories</h2>
        <span></span>
      </div>
      <div className="ecbody" data-scrollable="">
        <div className="ecdesc">
          Add, remove and rearrange categories yourself, or let your app
          personalize things based on your cycle phases and logged symptoms.
        </div>

        <div className="ecsug">
          Suggested categories
          <span
            className={`sw ${suggested ? 'on' : ''}`}
            onClick={onToggleSuggested}
          ></span>
        </div>

        <div className="eclist" ref={listRef}>
          {activeCats.map((title) => (
            <div
              className={`ecrow ${dragTitle === title ? 'dragging' : ''}`}
              key={title}
              data-title={title}
            >
              <button
                className="ecbtn del"
                disabled={suggested}
                onClick={() => onDelete(title)}
                aria-label={`Remove ${title}`}
              >−</button>
              <span className="ecname">{title}</span>
              <span
                className="ecgrip"
                aria-disabled={suggested}
                onPointerDown={(e) => onGripDown(e, title)}
                onPointerMove={onGripMove}
                onPointerUp={onGripUp}
                onPointerCancel={onGripUp}
              >
                <span></span><span></span><span></span>
              </span>
            </div>
          ))}
        </div>

        {!suggested && removedCats.length > 0 && (
          <>
            <div className="ecdesc" style={{ paddingTop: 18 }}>Removed — tap + to add back</div>
            <div className="eclist">
              {removedCats.map((title) => (
                <div className="ecrow" key={title}>
                  <button
                    className="ecbtn add"
                    onClick={() => onReadd(title)}
                    aria-label={`Add ${title}`}
                  >+</button>
                  <span className="ecname">{title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
