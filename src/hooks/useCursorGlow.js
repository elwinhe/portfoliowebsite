import { useEffect } from 'react'

export default function useCursorGlow() {
  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || prefersReducedMotion) return

    const glow = document.createElement('div')
    glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(94, 37, 204, 0.22) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.15s ease;
      transform: translate(-50%, -50%);
      will-change: transform;
    `
    document.body.appendChild(glow)

    const move = (e) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }

    window.addEventListener('mousemove', move, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      glow.remove()
    }
  }, [])
}
