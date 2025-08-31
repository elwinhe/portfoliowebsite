import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="nav-root">
      <div className="container-wide nav-bar">
        <div className="brand">
          <Link to="/" onClick={closeMenu} className="brand-link">Elwin He</Link>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/tippit_tea" className={({ isActive }) => isActive ? 'link active' : 'link'}>Tippit Tea</NavLink>
          <NavLink to="/voteable" className={({ isActive }) => isActive ? 'link active' : 'link'}>Voteable</NavLink>
          <NavLink to="/avocado_app" className={({ isActive }) => isActive ? 'link active' : 'link'}>Avocado App</NavLink>
          <a href="#contact" className="link" onClick={closeMenu}>Contact</a>
        </nav>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <NavLink to="/tippit_tea" onClick={closeMenu} className="mobile-link">Tippit Tea</NavLink>
        <NavLink to="/voteable" onClick={closeMenu} className="mobile-link">Voteable</NavLink>
        <NavLink to="/avocado_app" onClick={closeMenu} className="mobile-link">Avocado App</NavLink>
        <a href="#contact" onClick={closeMenu} className="mobile-link">Contact</a>
      </div>
    </header>
  )
}


