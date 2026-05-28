'use client';
import { useEffect, useRef, useState } from 'react';

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: "PAPER CO", emoji: "📄", subtitle: "FSC-Certified" },
    { name: "INK TECH", emoji: "🖨️", subtitle: "Eco-Friendly Ink" },
    { name: "BIND PRO", emoji: "📦", subtitle: "Binding Specialist" },
    { name: "LOGISTICS X", emoji: "🚚", subtitle: "Express Delivery" },
    { name: "DESIGN HUB", emoji: "🎨", subtitle: "Pre-press Experts" }
  ];

  // Double the array for seamless scrolling
  const tickerItems = [...partners, ...partners];

  return (
    <section id="partners" ref={sectionRef} style={{ padding: '6rem 0', backgroundColor: 'var(--surface-3)', overflow: 'hidden' }}>
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
          <span className="heading-reveal-text">Trusted Production Partners</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0, textAlign: 'center' }}>
          We work with industry leaders to ensure the highest quality materials for your NCR forms.
        </p>
      </div>

      <div className={`ticker-wrapper ${isVisible ? 'anim-fade-up delay-3' : ''}`} style={{ opacity: 0 }}>
        <div className="ticker-track">
          {tickerItems.map((p, i) => (
            <div key={i} className="partner-logo-item">
              <div className="p-emoji">{p.emoji}</div>
              <div className="p-name">{p.name}</div>
              <div className="p-sub">{p.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div className={`stat-box ${isVisible ? 'anim-fade-up delay-4' : ''}`} style={{ opacity: 0 }}>
            <div className="stat-num" style={isVisible ? { animation: 'countUp 1s ease-out forwards' } : {}}>5000+</div>
            <div className="stat-label">Orders Completed</div>
          </div>
          <div className={`stat-box ${isVisible ? 'anim-fade-up delay-5' : ''}`} style={{ opacity: 0 }}>
            <div className="stat-num" style={isVisible ? { animation: 'countUp 1.2s ease-out forwards' } : {}}>99%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className={`stat-box ${isVisible ? 'anim-fade-up delay-6' : ''}`} style={{ opacity: 0 }}>
            <div className="stat-num" style={isVisible ? { animation: 'countUp 1.4s ease-out forwards' } : {}}>24h</div>
            <div className="stat-label">Average Turnaround</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
          background: white;
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .ticker-track {
          display: flex;
          gap: 4rem;
          width: max-content;
          animation: scrollTicker 20s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .partner-logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          filter: grayscale(100%) opacity(50%);
          transition: filter 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .partner-logo-item:hover {
          filter: grayscale(0%) opacity(100%);
          transform: scale(1.1);
        }
        
        .p-emoji {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .p-name {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          color: var(--navy-900);
          font-size: 1.1rem;
        }
        .p-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .stat-box {
          padding: 2rem;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .stat-num {
          font-size: 3rem;
          font-weight: 800;
          color: var(--accent-orange);
          font-family: 'Playfair Display', serif;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          color: var(--navy-900);
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}} />
    </section>
  );
}
