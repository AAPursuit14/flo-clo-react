import { useRef, useState, useCallback, useEffect } from 'react'

/*
 * Open/closing/closed state machine for the pop-ups.
 * Closing plays the fadeUpOut animation (.closing class) for 270ms
 * before the element actually hides, matching the prototype.
 */
export default function useOverlay() {
  const [phase, setPhase] = useState('closed') // 'closed' | 'open' | 'closing'
  const timer = useRef(null)

  const open = useCallback(() => {
    clearTimeout(timer.current)
    setPhase('open')
  }, [])

  const close = useCallback(() => {
    setPhase((p) => {
      if (p !== 'open') return p
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setPhase('closed'), 320)
      return 'closing'
    })
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const className =
    phase === 'open' ? 'open' : phase === 'closing' ? 'open closing' : ''
  return { phase, open, close, className, isOpen: phase !== 'closed' }
}
