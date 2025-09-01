import BackgroundCircles from '../components/BackgroundCircles'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './home-fullbleed.css'

export default function Home() {
  const iphoneRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    // iPhone visibility is controlled with the hint sentinel below
  }, []);

  // Show scroll-hint on load; fade it out when sentinel enters
  useEffect(() => {
    const hint = hintRef.current || document.getElementById('scrollHint');
    const sentinel = document.getElementById('hintSentinel');
    const iphoneEl = iphoneRef.current;
    if (!hint || !sentinel) return;

    // Ensure it fades in on load using CSS transition
    requestAnimationFrame(() => hint.classList.add('shown'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          hint.classList.add('is-hidden');
          // Trigger iPhone fade-in at the same scroll point
          if (iphoneEl) iphoneEl.classList.add('visible');
        } else {
          hint.classList.remove('is-hidden');
        }
      });
    }, {
      root: null,
      threshold: 0,
      rootMargin: '0px 0px -40% 0px'
    });

    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

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
              shipping product, design systems, and thoughtful interfaces. Previously a software engineer intern at Zillow.
            </div>
            <ul className="links">
              <li className="resume"><a href={new URL('../assets/RESUME_ELWIN_2025.pdf', import.meta.url).href} target="_blank" rel="noopener noreferrer">Resume</a></li>
              <li className="contact"><a href="#contact">Get in touch</a></li>
            </ul>
          </div>
          <img className="hero-img" src={new URL('../assets/elwinhe_pfp_purp.png', import.meta.url).href} alt="Portrait of Elwin He" />
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <div className="container-wide">
          {/* Scroll hint */}
          <p id="scrollHint" className="scroll-hint">
            <span className="label breathe" id="projects-heading">Scroll down for projects</span>
            <span className="chev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </p>

          {/* Sentinel: when this enters the viewport, hide the hint */}
          <div id="hintSentinel" aria-hidden="true"></div>

          <div className="fullbleed-list">
            <div className="iphone" ref={iphoneRef}>
              <div className="iphone-bezel">
                {/* Notch */}
                <div className="iphone-notch">
                  <span className="notch-speaker"></span>
                  <span className="notch-camera"></span>
                </div>

                {/* Screen (your loop) */}
                <video
                  className="iphone-screen"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={new URL('../assets/voteable_intro.png', import.meta.url).href}>
                  <source src={new URL('../assets/voteable_homepage_demo.webm', import.meta.url).href} type="video/webm" />
                  <source src={new URL('../assets/voteable_homepage_demo.mp4', import.meta.url).href} type="video/mp4" />
                </video>
              </div>

              <div className="project-info">
                <img 
                  className="project-title" 
                  src={new URL('../assets/voteable_wordmark.png', import.meta.url).href}
                  alt="Voteable"
                  style={{ 
                    height: 'auto',
                    maxWidth: '100%',
                    width: 'auto'
                  }}
                />
                <p className="project-description">Political news aggregator, mobile app concept</p>
                <a href="#" className="project-link">View case study →</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="title-text" id="contact-heading">Contact</div>
          <p>Let’s connect. Email: <a href="mailto:hello@elwinhe.com">hello@elwinhe.com</a></p>
        </div>
      </section>
    </main>
  )
}


