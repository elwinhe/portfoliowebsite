import { useEffect } from 'react'

// <InteractionObserver
//   refs={[ref1, ref2]}
//   threshold={0.1}
//   rootMargin="0px 0px -10% 0px"
//   once
//   onEnter={(el, entry, io) => {}}
//   onLeave={(el, entry, io) => {}}
// />

export default function InteractionObserver({
  refs,
  threshold = 0.1,
  root = null,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  onEnter,
  onLeave
}) {
  useEffect(() => {
    const refArray = Array.isArray(refs) ? refs : [refs]
    const elements = refArray.map(r => r?.current).filter(Boolean)
    if (!elements.length) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter?.(entry.target, entry, io)
          if (once) io.unobserve(entry.target)
        } else {
          onLeave?.(entry.target, entry, io)
        }
      })
    }, { root, threshold, rootMargin })

    elements.forEach(el => io.observe(el))
    return () => {
      elements.forEach(el => io.unobserve(el))
    }
  }, [refs, threshold, root, rootMargin, once, onEnter, onLeave])

  return null
}


