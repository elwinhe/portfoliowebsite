import BackgroundCircles from '../components/BackgroundCircles'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './home-fullbleed.css'

export default function Home() {
  const hintRef = useRef(null);
  const carouselRef = useRef(null);
  const galleryRef = useRef(null);
  const projectRowRef = useRef(null);

  useEffect(() => {
    // iPhone visibility is controlled with the hint sentinel below
  }, []);

  // Image carousel functionality
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    const cycleImages = () => {
      // Remove active class from all images
      images.forEach(img => img.classList.remove('active'));
      
      // Add active class to current image
      images[currentIndex].classList.add('active');
      
      // Move to next image
      currentIndex = (currentIndex + 1) % images.length;
    };

    // Start the carousel
    const interval = setInterval(cycleImages, 2380);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Gallery fade-in animation
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gallery.classList.add('visible');
          io.disconnect();
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    io.observe(gallery);
    return () => io.disconnect();
  }, []);

  // Show scroll-hint on load; fade it out when sentinel enters
  useEffect(() => {
    const hint = hintRef.current || document.getElementById('scrollHint');
    const sentinel = document.getElementById('hintSentinel');
    const projectRow = projectRowRef.current;
    if (!hint || !sentinel) return;

    // Ensure it fades in on load using CSS transition
    requestAnimationFrame(() => hint.classList.add('shown'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hint.classList.add('is-hidden');
          // Trigger iPhone fade-in at the same scroll point
          if (projectRow) {
            const iphones = projectRow.querySelectorAll('.iphone');
            iphones.forEach(iphone => iphone.classList.add('visible'));
          }
        } else {
          // Only show the hint if the sentinel is below the viewport (scrolled up)
          if (entry.boundingClientRect.top > 0) {
            hint.classList.remove('is-hidden');
          }
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

          <div className="project-row" ref={projectRowRef}>
            <div className="fullbleed-list">
              <div className="iphone">
                <div className="iphone-bezel">
                  {/* Notch */}
                  <div className="iphone-notch">
                    <span className="notch-speaker"></span>
                    <span className="notch-camera"></span>
                  </div>

                  {/* Screen (your loop) */}
                  <img
                    className="iphone-screen"
                    src={new URL('../assets/avocado_demo.jpg', import.meta.url).href}
                    alt="Avocado App Screenshot"
                    loading="lazy"
                  />
                </div>

                <div className="project-info">
                  <img
                    className="project-title"
                    id="avocado-heading"
                    src={new URL('../assets/avocado_logo.png', import.meta.url).href}
                    alt="Avocado"
                  />
                  <p className="project-description">Social media mobile app for food enthusiasts</p>
                  <a href="#" className="project-link">View case study →</a>
                </div>
              </div>
            </div>
            <div className="fullbleed-list">
              <div className="iphone">
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
                    <source src={new URL('../assets/voteable_demo.webm', import.meta.url).href} type="video/webm" />
                    <source src={new URL('../assets/voteable_demo.mp4', import.meta.url).href} type="video/mp4" />
                  </video>
                </div>

                <div className="project-info">
                  <img
                    className="project-title"
                    src={new URL('../assets/voteable_wordmark.png', import.meta.url).href}
                    alt="Voteable"
                  />
                  <p className="project-description">Political news aggregator, mobile app concept</p>
                  <a href="#" className="project-link">View case study →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-heading">
        <div className="container-wide gallery-hero" ref={galleryRef}>
          <div className="gallery-container">
            <div className="image-carousel" ref={carouselRef}>
              <picture className="carousel-image active">
                <source 
                  media="(min-width: 1000px)" 
                  srcSet={new URL('../assets/tippittea/matcha_blueberry_web.jpg', import.meta.url).href}
                />
                <img 
                  src={new URL('../assets/tippittea/matcha_blueberry_mobile.jpg', import.meta.url).href}
                  alt="Tippit Tea - Image 1"
                  loading="lazy"
                />
              </picture>
              <picture className="carousel-image">
                <source 
                  media="(min-width: 1000px)" 
                  srcSet={new URL('../assets/tippittea/tippittea_crossed_web.jpg', import.meta.url).href}
                />
                <img 
                  src={new URL('../assets/tippittea/tippittea_crossed_mobile.jpg', import.meta.url).href}
                  alt="Tippit Tea - Image 2"
                  loading="lazy"
                />
              </picture>
              <picture className="carousel-image">
                <source 
                  media="(min-width: 1000px)" 
                  srcSet={new URL('../assets/tippittea/customers.jpg', import.meta.url).href}
                />
                <img 
                  src={new URL('../assets/tippittea/customers_mobile.jpg', import.meta.url).href}
                  alt="Tippit Tea - Image 3"
                  loading="lazy"
                />
              </picture>
              <picture className="carousel-image">
                <source 
                  media="(min-width: 1000px)" 
                  srcSet={new URL('../assets/tippittea/brown_sugar_panda.png', import.meta.url).href}
                />
                <img 
                  src={new URL('../assets/tippittea/brown_sugar_mobile.png', import.meta.url).href}
                  alt="Tippit Tea - Image 4"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
          <div className="gallery-content">
            <div className="text-1">Tippit Tea (2022)</div>
            <div className="text-2">Co-founder & CEO</div>
            <div className="text-3">
            A boba shop that processed over 30,000 orders. I set up a robust supply chain and established a partnership with a local restaurant to keep operations lean, while also designing the brand and marketing materials that built a loyal customer base.
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


