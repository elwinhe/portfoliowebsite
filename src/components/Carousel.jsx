import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Carousel({ items, interval = 2380, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!items || items.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)
    return () => clearInterval(id)
  }, [items, interval])

  if (!items || items.length === 0) return null

  return (
    <div className={`image-carousel ${className}`}>
      {items.map((image, index) => (
        <picture key={index} className={`carousel-image ${index === currentIndex ? 'active' : ''}`}>
          {image.srcSet && (
            <source media={image.media || '(min-width: 1000px)'} srcSet={image.srcSet} />
          )}
          <img src={image.src} alt={image.alt} loading="lazy" />
        </picture>
      ))}
    </div>
  )
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      srcSet: PropTypes.string,
      media: PropTypes.string,
    })
  ).isRequired,
  interval: PropTypes.number,
  className: PropTypes.string,
}


