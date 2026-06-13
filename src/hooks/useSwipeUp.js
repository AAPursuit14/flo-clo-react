import { useRef, useCallback } from 'react'

const THRESHOLD = 70 // px of upward travel that counts as a swipe-up

/*
 * Swipe-up-to-dismiss that coexists with a scrollable area inside the overlay.
 *
 * A finger moving up means two different things depending on where it lands:
 *  - on chrome (handle, header, footer): always a dismiss gesture
 *  - inside the scrollable list: it's a scroll, UNLESS the list was already
 *    scrolled to the bottom and didn't move during the gesture — then the
 *    user is "pulling past the end", which we treat as dismiss.
 *
 * Mark the scrollable region with data-scrollable so the handlers can tell
 * the two zones apart. Returns props to spread on the overlay root.
 */
export default function useSwipeUp(onDismiss) {
  const gesture = useRef(null)

  const onTouchStart = useCallback((e) => {
    const scrollEl = e.target.closest('[data-scrollable]')
    gesture.current = {
      y0: e.touches[0].clientY,
      scrollEl,
      startScrollTop: scrollEl ? scrollEl.scrollTop : 0,
      atBottom: scrollEl
        ? scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 2
        : true,
    }
  }, [])

  const onTouchEnd = useCallback((e) => {
    const g = gesture.current
    gesture.current = null
    if (!g) return
    const dy = g.y0 - e.changedTouches[0].clientY
    if (dy <= THRESHOLD) return
    if (!g.scrollEl) { onDismiss(); return }
    const scrolled = Math.abs(g.scrollEl.scrollTop - g.startScrollTop) > 2
    if (g.atBottom && !scrolled) onDismiss()
  }, [onDismiss])

  return { onTouchStart, onTouchEnd }
}
