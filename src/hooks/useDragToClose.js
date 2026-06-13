import { useRef, useState, useCallback } from 'react'

/*
 * Drag-the-handle-down-to-dismiss, for bottom sheets.
 *
 * Spread grabProps on the handle/grab zone and dragStyle on the sheet root.
 * While the finger is down the sheet follows it downward (no transition, so it
 * tracks 1:1). On release: a plain tap, or a drag past `threshold`, closes it;
 * a short drag springs back up. Pointer events cover both touch and mouse, and
 * pointer capture keeps tracking the finger even after it leaves the handle.
 */
export default function useDragToClose(onClose, { threshold = 90 } = {}) {
  const startY = useRef(null)
  const lastDy = useRef(0)
  const [dragY, setDragY] = useState(null)

  const onPointerDown = useCallback((e) => {
    startY.current = e.clientY
    lastDy.current = 0
    setDragY(0)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* test envs */ }
  }, [])

  const onPointerMove = useCallback((e) => {
    if (startY.current == null) return
    const dy = Math.max(0, e.clientY - startY.current)
    lastDy.current = dy
    setDragY(dy)
  }, [])

  const end = useCallback(() => {
    if (startY.current == null) return
    const dy = lastDy.current
    startY.current = null
    setDragY(null)
    if (dy < 6 || dy > threshold) onClose() // tap, or pulled far enough
  }, [threshold, onClose])

  const grabProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerCancel: end,
  }
  const dragStyle = dragY != null
    ? { transform: `translateY(${dragY}px)`, transition: 'none' }
    : undefined

  return { grabProps, dragStyle }
}
