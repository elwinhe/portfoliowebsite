import { Link } from 'react-router-dom'

export default function ProjectCard({ to, imageSrc, title, subtitle }) {
  return (
    <Link to={to} className="project-card">
      <div className="project-card__image">
        <img src={imageSrc} alt="" loading="lazy" />
      </div>
      <div className="project-card__meta">
        <h3>{title}</h3>
        {subtitle ? <small className="caption">{subtitle}</small> : null}
      </div>
    </Link>
  )
}


