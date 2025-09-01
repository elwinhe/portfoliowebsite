import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className={`nav-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-wide nav-bar">
        <div className="brand">
          <Link to="/" onClick={closeMenu} className="brand-link">Elwin He</Link>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#projects" className="link" onClick={handleLinkClick}>Projects</a>
          <a href="#experience" className="link" onClick={handleLinkClick}>Experience</a>
          <a href="#contact" className="link" onClick={handleLinkClick}>Contact</a>
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
        <a href="#projects" onClick={handleLinkClick} className="mobile-link">Projects</a>
        <a href="#experience" onClick={handleLinkClick} className="mobile-link">Experience</a>
        <a href="#contact" onClick={handleLinkClick} className="mobile-link">Contact</a>
      </div>
    </header>
  )
}


