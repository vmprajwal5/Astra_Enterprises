'use client';
import { useEffect, useRef, useState } from 'react';

export default function WhoItsFor() {
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
    <section id="who-its-for" ref={sectionRef} className="who-its-for-section">
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Built for Every Business</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-3" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          From independent contractors to global retail chains, our forms fit right into your workflow.
        </p>

        <div className="industry-grid">
          {/* Card 1 */}
          <div className={`industry-card ${isVisible ? 'anim-fade-left delay-1' : ''}`} style={{ opacity: 0 }}>
            <div className="industry-watermark">🛠️</div>
            <div className="ping-dot">
              <span className="ping-ring"></span>
              <span className="ping-core"></span>
            </div>
            <h3 className="industry-title">Contractors & Trades</h3>
            <p className="industry-desc">Work orders and estimates designed for tough environments. Thick covers and sequential numbering keep jobs organized.</p>
          </div>

          {/* Card 2 */}
          <div className={`industry-card ${isVisible ? 'anim-fade-up delay-2' : ''}`} style={{ opacity: 0 }}>
            <div className="industry-watermark">✂️</div>
            <div className="ping-dot">
              <span className="ping-ring"></span>
              <span className="ping-core"></span>
            </div>
            <h3 className="industry-title">Salons & Clinics</h3>
            <p className="industry-desc">Client intake and consent forms. Clean, professional layouts that reflect your brand's commitment to care.</p>
          </div>

          {/* Card 3 */}
          <div className={`industry-card ${isVisible ? 'anim-fade-right delay-3' : ''}`} style={{ opacity: 0 }}>
            <div className="industry-watermark">🛍️</div>
            <div className="ping-dot">
              <span className="ping-ring"></span>
              <span className="ping-core"></span>
            </div>
            <h3 className="industry-title">Retail & Hospitality</h3>
            <p className="industry-desc">Order pads and receipts. Quick, carbonless copies ensure the kitchen, the customer, and the register are always in sync.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .who-its-for-section {
          background-color: var(--white);
          padding: 8rem 5%;
          position: relative;
        }

        .industry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 4rem;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        .industry-card {
          position: relative;
          background-color: var(--navy-900);
          border-radius: 12px;
          padding: 3rem 2.5rem;
          overflow: hidden;
          color: var(--white);
          border-left: 4px solid var(--orange-500);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }

        .industry-card:hover {
          transform: translateY(-12px);
          box-shadow: -4px 0 20px #FF6B35;
        }

        .industry-watermark {
          position: absolute;
          right: -20px;
          bottom: -20px;
          font-size: 140px;
          opacity: 0.15;
          line-height: 1;
          pointer-events: none;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .industry-card:hover .industry-watermark {
          transform: scale(1.2) rotate(10deg);
        }

        .ping-dot {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 12px;
          height: 12px;
        }
        
        .ping-core {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: var(--orange-500);
          border-radius: 50%;
        }

        .ping-ring {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 50%;
          background-color: var(--orange-500);
          animation: ping 1.5s ease infinite;
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        .industry-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--white);
          position: relative;
          z-index: 2;
        }

        .industry-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          position: relative;
          z-index: 2;
        }
      `}} />
    </section>
  );
}
