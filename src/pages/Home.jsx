import BackgroundCircles from '../components/BackgroundCircles'
import { Link } from 'react-router-dom'
import './home-fullbleed.css'

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <BackgroundCircles />
      <section className="home home-section">
        <div className="container-wide hero">
          <div className="home-content">
            <div className="text-1">Hey, I'm Elwin</div>
            <div className="text-2">Product engineer & designer</div>
            <div className="text-3">
              From boba shops to SwiftUI apps — I turn ideas into systems. I enjoy
              shipping product, design systems, and thoughtful interfaces.
            </div>
            <ul className="links">
              <li className="resume"><a href="#contact">Get In Touch</a></li>
              <li className="contact"><a href="#projects-heading">View Work</a></li>
            </ul>
          </div>
          <img className="hero-img" src={new URL('../assets/elwinhe_pfp_clean.png', import.meta.url).href} alt="Portrait of Elwin He" />
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <h2 id="projects-heading">Projects</h2>
          <div className="fullbleed-list">
            <Link to="/voteable" className="fullbleed-item">
              <img src={new URL('../assets/voteable_intro.png', import.meta.url).href} alt="Voteable" />
            </Link>
            <Link to="/avocado_app" className="fullbleed-item">
              <img src={new URL('../assets/voteable_screen.png', import.meta.url).href} alt="Avocado App" />
            </Link>
            <Link to="/tippit_tea" className="fullbleed-item">
              <img src={new URL('../assets/Tippit TEA.png', import.meta.url).href} alt="Tippit Tea" />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading">Contact</h2>
          <p>Let’s connect. Email: <a href="mailto:hello@elwinhe.com">hello@elwinhe.com</a></p>
        </div>
      </section>
    </main>
  )
}


