import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const handleLinkClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMenu = () => setIsOpen(false)

  const handleNavClick = (e) => {
    handleLinkClick(e);
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-wide nav-bar">
        <div className="brand">
          <Link to="/" onClick={closeMenu} className="brand-link">Elwin He</Link>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#projects" className="link" onClick={handleNavClick}>Projects</a>
          <a href="#experience" className="link" onClick={handleNavClick}>Experience</a>
          <a href="#contact" className="link" onClick={handleNavClick}>Contact</a>
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
        <a href="#projects" onClick={handleNavClick} className="mobile-link">Projects</a>
        <a href="#experience" onClick={handleNavClick} className="mobile-link">Experience</a>
        <a href="#contact" onClick={handleNavClick} className="mobile-link">Contact</a>
      </div>
    </header>
  )
}


