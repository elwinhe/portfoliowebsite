import BackgroundCircles from '../components/BackgroundCircles'
import InteractionObserver from '../components/InteractionObserver'
import Carousel from '../components/Carousel'
import IPhoneProject from '../components/IPhoneProject'
import ExperienceCard from '../components/ExperienceCard'
import ContactForm from '../components/ContactForm'
import { useState, useEffect, useRef } from 'react'
import './home-fullbleed.css'
import { handleLinkClick } from '../components/Navbar'

export default function Home() {
  const hintRef = useRef(null);
  const galleryRef = useRef(null);
  const projectRowRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const voteableVideoRef = useRef(null);

  useEffect(() => {
    // iPhone visibility is controlled with the hint sentinel below
  }, []);

  // Carousel items
  const carouselItems = [
    {
      src: new URL('../assets/tippittea/matcha_blueberry_mobile.jpg', import.meta.url).href,
      srcSet: new URL('../assets/tippittea/matcha_blueberry_web.jpg', import.meta.url).href,
      media: '(min-width: 1000px)',
      alt: 'Tippit Tea - Image 1',
    },
    {
      src: new URL('../assets/tippittea/tippittea_crossed_mobile.jpg', import.meta.url).href,
      srcSet: new URL('../assets/tippittea/tippittea_crossed_web.jpg', import.meta.url).href,
      media: '(min-width: 1000px)',
      alt: 'Tippit Tea - Image 2',
    },
    {
      src: new URL('../assets/tippittea/customers_mobile.jpg', import.meta.url).href,
      srcSet: new URL('../assets/tippittea/customers.jpg', import.meta.url).href,
      media: '(min-width: 1000px)',
      alt: 'Tippit Tea - Image 3',
    },
    {
      src: new URL('../assets/tippittea/lineup_mobile.jpg', import.meta.url).href,
      srcSet: new URL('../assets/tippittea/lineup.jpg', import.meta.url).href,
      media: '(min-width: 1000px)',
      alt: 'Launch Day Lineup',
    },
  ];

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

  // Contact form handled by ContactForm component

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* Fade-in observer for gallery, experience, and contact sections */}
      <InteractionObserver
        refs={[galleryRef, experienceRef, contactRef]}
        threshold={0.1}
        rootMargin="0px 0px -10% 0px"
        once
        onEnter={(el) => el.classList.add('visible')}
      />

      {/* Scroll-hint observer for sentinel */}
      <InteractionObserver
        refs={{ current: typeof document !== 'undefined' ? document.getElementById('hintSentinel') : null }}
        threshold={0}
        rootMargin="0px 0px -40% 0px"
        once={false}
        onEnter={() => {
          const hint = hintRef.current || document.getElementById('scrollHint');
          const projectRow = projectRowRef.current;
          if (hint) hint.classList.add('is-hidden');
          if (projectRow) {
            const iphones = projectRow.querySelectorAll('.iphone');
            iphones.forEach(iphone => iphone.classList.add('visible'));
          }
        }}
        onLeave={(_el, entry) => {
          const hint = hintRef.current || document.getElementById('scrollHint');
          if (hint && entry.boundingClientRect.top > 0) {
            hint.classList.remove('is-hidden');
          }
        }}
      />
      <BackgroundCircles />
      <section className="home home-section">
        <div className="container-wide hero">
          <div className="home-content">
            <div className="text-1">Hey, I'm Elwin</div>
            <div className="text-2">Product Engineer & UX</div>
            <div className="text-3">
              From boba shops to mobile apps — I turn ideas into systems. Specializes in end-to-end execution and thoughtful interfaces. Currently building at Clouted, former android engineer intern at Zillow.
            </div>
            <ul className="links">
              <li className="resume"><a href={new URL('../assets/RESUME_ELWIN_2026.pdf', import.meta.url).href} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Resume</a></li>
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
              <IPhoneProject
                screenType="image"
                onScreenClick={() => window.open("https://www.notion.so/Avocado-App-261d4d1bf5f180b9a796e50039139f95?source=copy_link", "_blank")}
                imgSrc={new URL('../assets/avocado_demo.jpg', import.meta.url).href}
                imgAlt="Avocado App Screenshot"
                infoTitleSrc={new URL('../assets/avocado_logo.png', import.meta.url).href}
                infoTitleAlt="Avocado"
                infoTitleId="avocado-heading"
                infoDescription="Social media mobile app for food enthusiasts"
                infoLinkHref="https://www.notion.so/Avocado-App-261d4d1bf5f180b9a796e50039139f95?source=copy_link"
              />
            </div>
            <div className="fullbleed-list">
              <IPhoneProject
                screenType="video"
                videoRef={voteableVideoRef}
                onScreenClick={() => window.open("https://www.notion.so/Voteable-261d4d1bf5f180baadf1eaa3650b43d7?source=copy_link", "_blank")}
                poster={new URL('../assets/voteable_intro.jpg', import.meta.url).href}
                videoSources={[
                  { src: new URL('../assets/voteable_demo.webm', import.meta.url).href, type: 'video/webm' },
                  { src: new URL('../assets/voteable_demo.mp4', import.meta.url).href, type: 'video/mp4' },
                ]}
                infoTitleSrc={new URL('../assets/voteable_wordmark.png', import.meta.url).href}
                infoTitleAlt="Voteable"
                infoDescription="Political news aggregator, mobile app"
                infoLinkHref="https://www.notion.so/Voteable-261d4d1bf5f180baadf1eaa3650b43d7?source=copy_link"
              />
            </div>

            <div className="fullbleed-list">
              <IPhoneProject
                screenType="image"
                onScreenClick={() => window.open("https://www.notion.so/Itinerary-ai-263d4d1bf5f1805ab454eab45cf4e3e1?source=copy_link", "_blank")}
                imgSrc={new URL('../assets/itinerary_demo.png', import.meta.url).href}
                imgAlt="Itinerary App Screenshot"
                infoTitleSrc={new URL('../assets/itinerary.png', import.meta.url).href}
                infoTitleAlt="Itinerary"
                infoDescription="Travel planning RAG chatbot, web & moble app"
                infoLinkHref="https://www.notion.so/Itinerary-ai-263d4d1bf5f1805ab454eab45cf4e3e1?source=copy_link"
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider"/>

      <section className="section" aria-labelledby="gallery-heading">
        <div className="container-wide gallery-hero" ref={galleryRef}>
          <div className="gallery-container">
            <Carousel items={carouselItems} />
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
        <ExperienceCard
          logoSrc={new URL('../assets/Avatar.png', import.meta.url).href}
          logoAlt="Clouted"
          role="Software Engineer"
          meta="Clouted · October 2025 · San Francisco, CA"
          points={[
            'Built concurrent video download and validation pipeline with rotating proxies + automated content moderation, including audio fingerprinting, video keyframe analysis, and caption transcription validation, across Instagram, TikTok, and YouTube.',
            'Developed a full-stack creator marketplace (campaign discovery → submission → payouts), supporting end-to-end campaign execution and real-time performance tracking.',
            'Instrumented product analytics with PostHog across web + Discord flows, unlocking cross-channel attribution and informing growth decisions.',
            'Vibed with product and design teams to iterate on features, optimize user experience, and ensure alignment with business goals in a fast-paced startup environment.'
          ]}
          tags={[
            'Python','FastAPI','Redis','Postgres','Docker CI/CD','AWS','Kubernetes'
          ]}
        />
        <ExperienceCard
          logoSrc={new URL('../assets/zillow_logo.png', import.meta.url).href}
          logoAlt="Zillow"
          role="Software Engineering Intern — Android"
          meta="Zillow · May 2023 · San Francisco, CA"
          points={[
            'Migrated legacy XML layouts to Jetpack Compose, and supported KMM modules for cross-platform features.',
            'Built dynamic in-app modals with Firebase Remote Config + JSON schema for faster product launches.',
            'Shipped a GPT-powered lead-reply hackathon project that auto-generated 1,000+ agent responses in its first week.',
          ]}
          tags={[
            'Kotlin','Compose','Android SDK','Gradle','GitLab CI/CD','Firebase'
          ]}
        />
      </section>

      <hr className="section-divider"/>

      <section className="section contact" id="contact" ref={contactRef}>
        <h2 className="section-title">Let's build together</h2>
        <p className="contact-sub">Open to iOS/Android, product engineering, UX, and scrappy dev roles.</p>
        
        <ContactForm />
      </section>

      <footer className="site-footer">
        <div className="container">
          <a href="mailto:master.elh@gmail.com">master.elh@gmail.com</a>
          <p>© 2026 Elwin He</p>
        </div>
      </footer>
    </main>
  )
}


