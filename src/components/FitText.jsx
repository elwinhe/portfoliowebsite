import { useEffect, useLayoutEffect, useRef } from 'react'

export default function FitText({ text, min = 28, max = 128, className = '' }) {
  const ref = useRef(null)

  const resize = () => {
    const el = ref.current
    if (!el) return
    const container = el.parentElement
    if (!container) return

    // Guard: ensure single line
    el.style.whiteSpace = 'nowrap'

    const containerWidth = container.clientWidth
    if (containerWidth <= 0) return

    // Start from previous or max, then converge
    let size = parseFloat(getComputedStyle(el).fontSize) || max
    size = Math.min(Math.max(size, min), max)

    // Iterate to converge to container width
    for (let i = 0; i < 6; i += 1) {
      el.style.fontSize = `${size}px`
      const textWidth = el.scrollWidth
      if (textWidth === 0) break
      const ratio = containerWidth / textWidth
      if (Math.abs(1 - ratio) < 0.02) break
      size = Math.min(max, Math.max(min, Math.floor(size * ratio * 0.98)))
    }
  }

  useLayoutEffect(() => {
    resize()
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => resize())
    ro.observe(el.parentElement)
    window.addEventListener('resize', resize)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={ref} className={className} aria-label={text}>{text}</div>
  )
}


