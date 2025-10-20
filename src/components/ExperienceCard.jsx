import PropTypes from 'prop-types'

export default function ExperienceCard({
  logoSrc,
  logoAlt,
  role,
  meta,
  points,
  tags
}) {
  return (
    <article className="exp-card">
      <img
        className="exp-logo"
        aria-hidden="true"
        src={logoSrc}
        alt={logoAlt}
        loading="lazy"
      />
      <div className="exp-body">
        <header className="exp-head">
          <h3 className="exp-role">{role}</h3>
          <div className="exp-meta">{meta}</div>
        </header>

        <ul className="exp-points">
          {points.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>

        <div className="exp-tags">
          {tags.map((t, idx) => (
            <span key={idx}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

ExperienceCard.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}


