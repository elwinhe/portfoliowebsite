import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TippitTea.css';

const designImages = [
  { src: new URL('../assets/tippittea/tmv2.jpg', import.meta.url).href, alt: 'Matcha vs Thai tea branding', tall: true },
  { src: new URL('../assets/tippittea/panda.png', import.meta.url).href, alt: 'Tippit Tea mascot sticker' },
  { src: new URL('../assets/tippittea/bubble.jpg', import.meta.url).href, alt: 'Simple jelly drink illustration' },
  { src: new URL('../assets/tippittea/fmp.jpg', import.meta.url).href, alt: 'Tippit Tea at a flea market' },
  { src: new URL('../assets/tippittea/otg.jpg', import.meta.url).href, alt: 'Tippit Tea giveaway promotion' }
];

export default function TippitTea() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionsRef = useRef([]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % designImages.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + designImages.length) % designImages.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <main className="tippit-tea-page">
      {/* 1. Hero Section */}
      <section className="hero-tea section-fade" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="container">
          {/* Placeholder for image carousel */}
          <div className="hero-carousel-placeholder">
            <video
              className="tippittea-video"
              autoPlay
              muted
              loop
              playsInline>
              <source src={new URL('../assets/tippittea/tea_pour.mp4', import.meta.url).href} type="video/mp4" />
            </video>
          </div>
          <h1>From dorm room to 30,000 cups sold.</h1>
        </div>
      </section>

      {/* 2. Context Section */}
      <section className="context-section section section-fade" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="container">
          <h2>The Backstory</h2>
          <p>
          Tippit Tea began as a casual dorm room idea between me and a cofounder, but quickly grew into a full-scale campus boba shop. With no roadmap or funding, we designed the brand from scratch, experimented with scrappy marketing, and solved legal hurdles by partnering with a local ghost kitchen. Over time, we scaled into a 30,000-order operation that blended creativity, logistics, and entrepreneurship.
          </p>
          <h3>Links</h3>
          <p>
          <ul>
              <li><a className="hover-underline" href="https://case.edu/entrepreneurship/news/launchnet-client-tippittea" target="_blank"> “Tippit Tea | A CWRU Student Startup Story”</a></li>
              <li><a className="hover-underline" href="https://observer.case.edu/a-tea-riffic-trio-meeting-the-student-entrepreneurs-behind-tippit-tea/" target="_blank">“A Tea-riffic Trio: Meeting the student entrepreneurs behind Tippit Tea”</a></li>
              <li><a className="hover-underline" href="https://instagram.com/tippittea" target="_blank">Tippit Tea | Instagram</a></li>
              <li><a className="hover-underline" href="https://tippittea.com" target="_blank">Tippit Tea | Website</a></li>
          </ul>
          </p>
        </div>
      </section>

      {/* 3. Brand / Design Section */}
      <section className="brand-section section section-fade" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="container">
          <h2>Brand & Design</h2>
          <div className="design-grid">
            {designImages.map((img, index) => (
              <div 
                key={img.src} 
                className={`grid-item ${img.tall ? 'tall' : ''}`}
                onClick={() => openLightbox(index)}
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 3. Scale / Operations Section */}
      <section className="scale-section section section-fade" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container">
          <h2>Scaling Operations</h2>
          <figure>
            <div className="image-placeholder">
              <img src={new URL('../assets/tippittea/line_photo.jpg', import.meta.url).href} alt="A long line of customers waiting for Tippit Tea" />
            </div>
            <figcaption>Students were willing to walk up a massive flight of stairs for our tea</figcaption>
          </figure>
          
          <div className="supply-chain-content">
            <h3>We needed to optimize our supply chain so results could scale faster than manual labor.</h3>
            <p>
              We sourced ingredients in bulk through a wholesale distributor, then tracked stock levels in Google Sheets that I later integrated with a Python app. The tool monitored burn rates against order volume and visually flagged low inventory, streamlining re-orders and preventing shortages. To keep operations consistent, we documented a detailed set of step-by-step instructions so new team members could ramp up quickly and maintain quality.
            </p>
            <div className="flowchart">
              <span>🏭<br/><i>Supplier</i></span> → 
              <span>📦<br/><i>Bulk Orders</i></span> → 
              <span>📊<br/><i>Inventory</i></span> → 
              <span>👩‍🍳<br/><i>Ops</i></span> → 
              <span>🎓<br/><i>Customers</i></span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Results Section */}
      <section className="results-section section section-fade" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="container results-layout">
          <div className="results-text">
            <h2>The Results</h2>
            <ul className="results-list">
              <li>30k+ orders in 2 years.</li>
              <li>Consistent demand from day 1.</li>
              <li>Student-run operation.</li>
              <li>Original branding.</li>
              <li>End-to-end execution.</li>
            </ul>
          </div>
          <div className="results-image">
            <img src={new URL('../assets/tippittea/sales.png', import.meta.url).href} alt="Chart showing sales data for Tippit Tea" />
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <footer className="cta-footer">
        <div className="container">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          {/* Or <a href="#projects" className="btn btn-solid">See More Projects</a> */}
        </div>
        <div className="container">
            <p>© 2025 Elwin He</p>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <div className="lightbox">
          <button className="close-btn" onClick={closeLightbox}>&times;</button>
          <button className="prev-btn" onClick={prevImage}>&#10094;</button>
          <div className="lightbox-content">
            <img src={designImages[lightboxIndex].src} alt={designImages[lightboxIndex].alt} />
          </div>
          <button className="next-btn" onClick={nextImage}>&#10095;</button>
        </div>
      )}
    </main>
  );
}


