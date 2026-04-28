import PropTypes from 'prop-types'

export default function RecentProjectCard({ title, subtitle, href, ariaLabel }) {
  const computedAriaLabel = ariaLabel
    ?? (typeof title === 'string' ? `${title} (opens in new tab)` : undefined)

  return (
    <a
      className="recent-project-card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={computedAriaLabel}
    >
      <div className="recent-project-body">
        <h3 className="recent-project-title">{title}</h3>
        <p className="recent-project-subtitle">{subtitle}</p>
      </div>
      <span className="recent-project-arrow" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M6 18L18 6M18 6H9M18 6V15" stroke="currentColor" strokeWidth="1.66" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  )
}

RecentProjectCard.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
}
