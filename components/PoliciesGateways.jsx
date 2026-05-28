'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function PoliciesGateways() {
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
    <section id="policies-gateways" ref={sectionRef} style={{ padding: '6rem 5%', backgroundColor: 'var(--white)' }}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
          <span className="heading-reveal-text">Secure Checkout & Global Shipping</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0, textAlign: 'center', marginBottom: '4rem' }}>
          We partner with the best in the business to ensure your data is secure and your orders arrive on time.
        </p>

        <div className="pg-cards-grid">
          {/* Card 1 */}
          <div className={`pg-card pg-green ${isVisible ? 'anim-fade-up delay-1' : ''}`} style={{ opacity: 0 }}>
            <div className="pg-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>100% secure checkout via Stripe with 256-bit SSL encryption.</p>
          </div>

          {/* Card 2 */}
          <div className={`pg-card pg-green ${isVisible ? 'anim-fade-up delay-2' : ''}`} style={{ opacity: 0 }}>
            <div className="pg-icon">✈️</div>
            <h3>Fast Shipping</h3>
            <p>Priority delivery worldwide via FedEx, DHL, and trusted local couriers.</p>
          </div>

          {/* Card 3 */}
          <div className={`pg-card pg-orange ${isVisible ? 'anim-fade-up delay-3' : ''}`} style={{ opacity: 0 }}>
            <div className="pg-icon">📄</div>
            <h3>GST Registered</h3>
            <p>B2B Input Tax Credit available for all registered Indian businesses.</p>
          </div>

          {/* Card 4 */}
          <div className={`pg-card pg-orange ${isVisible ? 'anim-fade-up delay-4' : ''}`} style={{ opacity: 0 }}>
            <div className="pg-icon">🛡️</div>
            <h3>Our Policies</h3>
            <ul className="pg-links">
              <li><Link href="/shipping">Shipping Policy &rarr;</Link></li>
              <li><Link href="/refunds">Refund Guarantee &rarr;</Link></li>
              <li><Link href="/terms">Terms of Service &rarr;</Link></li>
              <li><Link href="/privacy">Privacy Policy &rarr;</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pg-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .pg-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 2rem;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        
        .pg-card h3 {
          color: var(--navy-900);
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          font-weight: 700;
        }
        
        .pg-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .pg-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pg-card:hover .pg-icon {
          transform: translateY(-8px) scale(1.1);
        }

        .pg-card.pg-green:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15);
          border-color: #22C55E;
        }

        .pg-card.pg-orange:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.15);
          border-color: var(--accent-orange);
        }

        .pg-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pg-links li {
          margin-bottom: 0.5rem;
        }
        .pg-links a {
          color: var(--navy-700);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-block;
        }
        .pg-links a:hover {
          color: var(--accent-orange);
          padding-left: 6px;
        }
      `}} />
    </section>
  );
}
