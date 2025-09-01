import BackgroundCircles from '../components/BackgroundCircles'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './home-fullbleed.css'
import { handleLinkClick } from '../components/Navbar'

export default function Home() {
  const hintRef = useRef(null);
  const carouselRef = useRef(null);
  const galleryRef = useRef(null);
  const projectRowRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const voteableVideoRef = useRef(null);
  const [formState, setFormState] = useState({ submitting: false, succeeded: false, error: null });

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

  // Experience section fade-in animation
  useEffect(() => {
    const experienceSection = experienceRef.current;
    if (!experienceSection) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          experienceSection.classList.add('visible');
          io.disconnect();
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    io.observe(experienceSection);
    return () => io.disconnect();
  }, []);

  // Contact form fade-in animation
  useEffect(() => {
    const contactSection = contactRef.current;
    if (!contactSection) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contactSection.classList.add('visible');
          io.disconnect();
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    io.observe(contactSection);
    return () => io.disconnect();
  }, []);

  // Fix for mobile video rendering bug on tab-out/tab-in
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const video = voteableVideoRef.current;
        if (video) {
          // Reset video positioning and dimensions to force proper layout recalculation
          const originalWidth = video.style.width;
          const originalHeight = video.style.height;
          const originalPosition = video.style.position;
          
          
          // Force a reflow
          void video.offsetHeight;
          
          // Restore original dimensions
          video.style.width = originalWidth;
          video.style.height = originalHeight;
          video.style.position = originalPosition;
          
          // Ensure video is properly contained within its parent
          video.style.objectFit = 'cover';
          video.style.objectPosition = 'center';
          
          video.play().catch(error => {
            console.error("Video replay failed on visibility change:", error);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ submitting: true, succeeded: false, error: null });
    const form = e.target;
    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            setFormState({ submitting: false, succeeded: true, error: null });
            form.reset();
        } else {
            const responseData = await response.json();
            const errorMessage = responseData.errors ? responseData.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form";
            setFormState({ submitting: false, succeeded: false, error: errorMessage });
        }
    } catch (error) {
        setFormState({ submitting: false, succeeded: false, error: "Oops! There was a problem submitting your form" });
    }
  };

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <BackgroundCircles />
      <section className="home home-section">
        <div className="container-wide hero">
          <div className="home-content">
            <div className="text-1">Hey, I'm Elwin</div>
            <div className="text-2">Product Engineer & Designer</div>
            <div className="text-3">
              From boba shops to mobile apps — I turn ideas into systems. Specializes in end-to-end execution and thoughtful interfaces. Former android engineer intern at Zillow, backend at Endeavor.ai.
            </div>
            <ul className="links">
              <li className="resume"><a href={new URL('../assets/RESUME_ELWIN_2025.pdf', import.meta.url).href} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Resume</a></li>
              <li className="contact"><a href="#contact" onClick={handleLinkClick} className="btn btn-outline">Get in touch</a></li>
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
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </p>

          {/* Sentinel: when this enters the viewport, hide the hint */}
          <div id="hintSentinel" aria-hidden="true"></div>

          <div id="projects" className="project-row" ref={projectRowRef}>
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
                  <a href="https://www.notion.so/Avocado-App-261d4d1bf5f180b9a796e50039139f95?source=copy_link"target="_blank" rel="noopener noreferrer" className="project-link">View case study</a>
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
                    ref={voteableVideoRef}
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
                  <p className="project-description">Political news aggregator, mobile app</p>
                  <a href="https://www.notion.so/Voteable-261d4d1bf5f180baadf1eaa3650b43d7?source=copy_link" target="_blank" rel="noopener noreferrer" className="project-link">View case study</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider"/>

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
            <div className="text-1">Tippit Tea</div>
            <div className="text-2">Co-founder & CEO</div>
            <div className="text-3">
            A boba shop that processed over 30,000 orders. I set up a robust supply chain and established a partnership with a local restaurant to keep operations lean, while also designing the brand and marketing materials that built a loyal customer base.
            </div>
            <div className="gallery-action">
              <a href="/tippittea" className="btn btn-outline">View case study</a>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider"/>

      <section className="section experience" id="experience" ref={experienceRef}>
        <h2 className="section-title">Experience</h2>
        <article className="exp-card">
          <img
            className="exp-logo"
            aria-hidden="true"
            src={new URL('../assets/endv_logo.png', import.meta.url).href}
            alt="Endeavor"
            loading="lazy"
          />
          <div className="exp-body">
            <header className="exp-head">
              <h3 className="exp-role">Software Engineer — Backend</h3>
              <div className="exp-meta">Endeavor · 2025 · San Francisco, CA</div>
            </header>

            <ul className="exp-points">
              <li>Architected a distributed email-processing pipeline that turned Outlook messages into structured tasks with multi-tenant filtering for scalable client integrations.</li>
              <li>Improved performance by cutting database load 50%+ with a write-through Redis cache for timestamp lookups.</li>
              <li>Shipped production features by containerizing services on AWS EKS and collaborating with product/ops in rapid sprints.</li>
            </ul>

            <div className="exp-tags">
              <span>Python</span><span>FastAPI</span><span>Redis</span><span>Postgres</span><span>Docker CI/CD</span><span>AWS</span><span>Kubernetes</span>
            </div>
          </div>
        </article>
        <article className="exp-card">
          <img
            className="exp-logo"
            aria-hidden="true"
            src={new URL('../assets/zillow_logo.png', import.meta.url).href}
            alt="Zillow"
            loading="lazy"
          />
          <div className="exp-body">
            <header className="exp-head">
              <h3 className="exp-role">Software Engineering Intern — Android</h3>
              <div className="exp-meta">Zillow · Summer 2023 · Seattle, WA</div>
            </header>

            <ul className="exp-points">
              <li>Migrated legacy XML layouts to Jetpack Compose, and supported KMM modules for cross-platform features.</li>
              <li>Built dynamic in-app modals with Firebase Remote Config + JSON schema for faster product launches.</li>
              <li>Shipped a GPT-powered lead-reply hackathon project that auto-generated 1,000+ agent responses in its first week.</li>
            </ul>

            <div className="exp-tags">
              <span>Kotlin</span><span>Compose</span><span>Android SDK</span><span>Gradle</span><span>GitLab CI/CD</span><span>Firebase</span>
            </div>
          </div>
        </article>
      </section>

      <hr className="section-divider"/>

      <section className="section contact" id="contact" ref={contactRef}>
        <h2 className="section-title">Let’s build together</h2>
        <p className="contact-sub">Open to iOS/Android, product engineering, UX, and scrappy dev roles.</p>
        
        {formState.succeeded ? (
          <div className="form-success">
            <h3>Thanks for reaching out!</h3>
            <p>I'll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" action="https://formspree.io/f/xpwjldgo" onSubmit={handleFormSubmit}>
            <label>
              <span>Name</span>
              <input type="text" name="name" required></input>
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required></input>
            </label>
            <label className="full">
              <span>Message</span>
              <textarea name="message" rows="5" required></textarea>
            </label>

            <div className="form-footer">
              <button type="submit" className="btn-primary" disabled={formState.submitting}>
                {formState.submitting ? 'Sending...' : 'Send'}
              </button>

              <div className="social-links">
                <a href="https://instagram.com/elwin.he" target="_blank" rel="noreferrer">
                  <img src={new URL('../assets/instagram.webp', import.meta.url).href} alt="Instagram" />
                </a>
                <a href="https://linkedin.com/in/elwinhe" target="_blank" rel="noreferrer">
                  <img src={new URL('../assets/linkedin.webp', import.meta.url).href} alt="LinkedIn" />
                </a>
              </div>
            </div>
            {formState.error && <p className="form-error">{formState.error}</p>}
          </form>
        )}
      </section>

      <footer className="site-footer">
        <div className="container">
          <a href="mailto:elwinhe@proton.me">elwinhe@proton.me</a>
          <p>© 2025 Elwin He</p>
        </div>
      </footer>
    </main>
  )
}


