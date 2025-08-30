import { useEffect, useRef } from 'react'
import './BackgroundCircles.css'

export default function BackgroundCircles() {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      // Move circles with page scroll (parallax-like)
      const y1 = window.scrollY * 0.25
      const y2 = window.scrollY * 0.4
      el.style.setProperty('--circle-offset', `${y1}px`)
      el.style.setProperty('--circle-2-offset', `${y2}px`)

      const lerp = (a, b, t) => Math.round(a + (b - a) * t)
      const from = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
      const to = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()

      const hexToRgb = (hex) => {
        const h = hex.replace('#','')
        const bigint = parseInt(h, 16)
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
      }

      const rgbToCss = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`

      try {
        const c1 = hexToRgb(from)
        const c2 = hexToRgb(to)
        const mix = {
          r: lerp(c1.r, c2.r, progress),
          g: lerp(c1.g, c2.g, progress),
          b: lerp(c1.b, c2.b, progress),
        }
        el.style.setProperty('--circle-color', rgbToCss(mix))
      } catch (e) {
        // noop if color parse fails
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={rootRef} className="bg-circles" aria-hidden="true">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
    </div>
  )
}


