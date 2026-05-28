'use client';
import { useEffect, useRef, useState } from 'react';

export default function PaperQuality() {
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

  return (
    <section id="paper-quality" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Uncompromising Paper Quality</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          We use industry-leading carbonless paper to ensure crisp, legible copies every time.
        </p>
        
        <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          <div className={isVisible ? "anim-fade-up delay-3" : ""} style={{ flex: 1, minWidth: '300px', opacity: isVisible ? 1 : 0 }}>
            <table className="quality-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Our Standard</th>
                  <th>Industry Average</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Paper Weight</strong></td>
                  <td>Premium 20lb / 70 GSM</td>
                  <td>Flimsy 15lb / 55 GSM</td>
                </tr>
                <tr>
                  <td><strong>Image Transfer</strong></td>
                  <td>High-contrast Black or Blue</td>
                  <td>Faded Blue</td>
                </tr>
                <tr>
                  <td><strong>Durability</strong></td>
                  <td>Tear-resistant edge gluing</td>
                  <td>Pages fall out easily</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1, minWidth: '300px', display: 'flex', gap: '1.5rem' }}>
            <div className={`pq-image-wrapper ${isVisible ? 'anim-fade-up delay-4' : ''}`} style={{ opacity: 0 }}>
              <div className="pq-shine"></div>
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                <div style={{ fontWeight: 'bold' }}>Micro-Capsule Tech</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Sharpest copy transfer</div>
              </div>
            </div>
            <div className={`pq-image-wrapper ${isVisible ? 'anim-fade-up delay-5' : ''}`} style={{ opacity: 0 }}>
              <div className="pq-shine"></div>
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
                <div style={{ fontWeight: 'bold' }}>Tear-Resistant</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Durable edge gluing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pq-image-wrapper {
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          position: relative;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        
        .pq-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%);
          background-size: 200%;
          z-index: 3;
          opacity: 0;
          pointer-events: none;
        }

        .pq-image-wrapper:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: var(--accent-orange);
        }
        
        .pq-image-wrapper:hover .pq-shine {
          opacity: 1;
          animation: shimmer 0.8s ease forwards;
        }
      `}} />
    </section>
  );
}
