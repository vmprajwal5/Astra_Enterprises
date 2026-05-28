'use client';
import { useEffect, useRef, useState } from 'react';

export default function Gallery() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} style={{ backgroundColor: '#FFFFFF', padding: '6rem 5%' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
            <span className="heading-reveal-text">Our Work in Print</span>
          </h2>
          <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ margin: '1rem auto 0', opacity: isVisible ? 1 : 0 }}>
            Real NCR products crafted for real businesses
          </p>
        </div>

        <div className="gallery-css-grid">
          {/* Card 1: Work Order Pad */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-1' : ''}`} style={{ height: '240px', background: '#1C1C1E', opacity: 0 }}>
            <span className="g-badge">Work Order</span>
            <div className="g-overlay"></div>
            <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
              <div style={{ width: '4px', background: '#FF6B35', height: '100%' }}></div>
              <div style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>WORK ORDER</div>
                <div style={{ height: '2px', background: '#333', marginBottom: '1rem', width: '100%' }}></div>
                <div style={{ height: '2px', background: '#333', marginBottom: '1rem', width: '100%' }}></div>
                <div style={{ height: '2px', background: '#333', marginBottom: '1rem', width: '100%' }}></div>
                <div style={{ height: '2px', background: '#333', marginBottom: '1rem', width: '70%' }}></div>
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '15px', color: 'white', fontSize: '0.7rem', fontWeight: '600' }}>COPY 1</div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 2: Salon Consent Form */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-2' : ''}`} style={{ height: '200px', background: '#FFF0F3', opacity: 0 }}>
            <span className="g-badge">Consent Form</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.2rem' }}>🩷</div>
              <div style={{ color: '#BE185D', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '1px' }}>CLIENT CARD</div>
              <div style={{ borderBottom: '1px solid rgba(190, 24, 93, 0.2)', paddingBottom: '0.8rem', marginBottom: '0.8rem' }}></div>
              <div style={{ borderBottom: '1px solid rgba(190, 24, 93, 0.2)', paddingBottom: '0.8rem', marginBottom: '0.8rem' }}></div>
              <div style={{ borderBottom: '1px solid rgba(190, 24, 93, 0.2)', paddingBottom: '0.8rem', marginBottom: '0.8rem' }}></div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 3: Invoice Book */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-3' : ''}`} style={{ height: '260px', background: 'white', border: '1px solid #E2E8F0', opacity: 0 }}>
            <span className="g-badge">Invoice</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ background: '#0A192F', color: 'white', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>INVOICE</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>#1042</span>
              </div>
              <div style={{ background: '#F8FAFC', height: '24px', marginBottom: '4px' }}></div>
              <div style={{ background: 'white', height: '24px', marginBottom: '4px' }}></div>
              <div style={{ background: '#F8FAFC', height: '24px', marginBottom: 'auto' }}></div>
              <div style={{ background: '#0A192F', color: 'white', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <span>TOTAL</span>
                <span>$0.00</span>
              </div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 4: Receipt Roll */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-4' : ''}`} style={{ height: '200px', background: 'white', display: 'flex', justifyContent: 'center', opacity: 0 }}>
            <span className="g-badge">Receipt</span>
            <div className="g-overlay"></div>
            <div style={{ width: '65%', background: '#F8FAFC', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.5rem', borderTop: '2px dashed #CBD5E1', borderBottom: '2px dashed #CBD5E1' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0A192F', marginBottom: '1.5rem', letterSpacing: '1px' }}>RECEIPT</div>
              <div style={{ height: '2px', width: '80%', background: '#E2E8F0', marginBottom: '0.8rem' }}></div>
              <div style={{ height: '2px', width: '80%', background: '#E2E8F0', marginBottom: '0.8rem' }}></div>
              <div style={{ height: '2px', width: '60%', background: '#E2E8F0', marginBottom: '0.8rem' }}></div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 5: Quotation Sheet */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-5' : ''}`} style={{ height: '220px', background: '#F8FAFF', opacity: 0 }}>
            <span className="g-badge">Quotation</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '2rem 1.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0A192F', marginBottom: '1.5rem' }}>ESTIMATE / QUOTATION</div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '4px', background: '#CBD5E1', marginBottom: '6px', width: '80%' }}></div>
                  <div style={{ height: '4px', background: '#E2E8F0', marginBottom: '6px', width: '100%' }}></div>
                  <div style={{ height: '4px', background: '#E2E8F0', width: '60%' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '4px', background: '#CBD5E1', marginBottom: '6px', width: '100%' }}></div>
                  <div style={{ height: '4px', background: '#E2E8F0', marginBottom: '6px', width: '90%' }}></div>
                  <div style={{ height: '4px', background: '#E2E8F0', width: '40%' }}></div>
                </div>
              </div>
              <div style={{ height: '1px', background: '#CBD5E1', width: '100%', marginBottom: '1rem' }}></div>
              <div style={{ height: '1px', background: '#CBD5E1', width: '100%' }}></div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 6: Delivery Note */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-6' : ''}`} style={{ height: '200px', background: '#EFF6FF', opacity: 0 }}>
            <span className="g-badge">Delivery Note</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ color: '#2D3748', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px' }}>DELIVERY NOTE</div>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '4px', background: '#93C5FD', marginBottom: '6px', width: '100%' }}></div>
                  <div style={{ height: '4px', background: '#BFDBFE', marginBottom: '6px', width: '80%' }}></div>
                  <div style={{ height: '4px', background: '#BFDBFE', width: '60%' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '16px', background: '#DBEAFE', marginBottom: '4px', width: '100%' }}></div>
                  <div style={{ height: '16px', background: '#DBEAFE', width: '100%' }}></div>
                </div>
              </div>
              <div style={{ borderBottom: '2px solid #93C5FD', width: '40%', marginLeft: 'auto' }}></div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 7: Purchase Order */}
          <div className={`g-card ${isVisible ? 'anim-scale-in delay-7' : ''}`} style={{ height: '260px', background: 'white', opacity: 0 }}>
            <span className="g-badge">Purchase Order</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '1.5rem', position: 'relative', height: '100%' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '60px', height: '60px', borderRadius: '50%', border: '2px dashed #94A3B8', opacity: '0.4' }}></div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0F172A', marginBottom: '0.5rem' }}>PURCHASE ORDER</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '2rem' }}>PO-2024-0012</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: '#E2E8F0', border: '1px solid #E2E8F0' }}>
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>

                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
                <div style={{ height: '24px', background: 'white' }}></div>
              </div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

          {/* Card 8: Bundle Set */}
          <div className={`g-card bundle-card ${isVisible ? 'anim-scale-in delay-8' : ''}`} style={{ height: '240px', background: 'linear-gradient(135deg, #0A192F 0%, #1A3A5C 100%)', opacity: 0 }}>
            <span className="g-badge">⭐ Bundle — Best Value</span>
            <div className="g-overlay"></div>
            <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div className="bundle-cards-container" style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '2rem' }}>
                <div className="b-card b-white" style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '110px', background: 'white', transform: 'rotate(-6deg)', borderRadius: '4px', boxShadow: '-4px 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', zIndex: 1 }}></div>
                <div className="b-card b-yellow" style={{ position: 'absolute', top: '10px', left: 0, width: '100px', height: '110px', background: '#FEF08A', transform: 'rotate(0deg)', borderRadius: '4px', boxShadow: '0px 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', zIndex: 2 }}></div>
                <div className="b-card b-pink" style={{ position: 'absolute', top: '20px', left: 0, width: '100px', height: '110px', background: '#FFD6E0', transform: 'rotate(6deg)', borderRadius: '4px', boxShadow: '4px 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', zIndex: 3 }}></div>
              </div>
              <div style={{ color: '#C9A84C', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '0.2rem' }}>BUNDLE SET</div>
              <div style={{ color: 'white', fontSize: '0.75rem', opacity: 0.9 }}>Invoice + Estimate + Receipt</div>
            </div>
            <button className="g-view-btn">View Sample &rarr;</button>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#quote" className="btn btn-primary shimmer-btn" style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
            Request a Sample Pack &rarr;
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .gallery-css-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .gallery-css-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .gallery-css-grid { grid-template-columns: 1fr; }
        }

        .g-card {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        .g-card:hover {
          transform: scale(1.04);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .g-badge {
          position: absolute;
          top: 0;
          left: 0;
          background: #0A192F;
          color: white;
          padding: 6px 12px;
          border-radius: 0 0 8px 0;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 10;
          transition: background 0.3s ease;
        }
        .g-card:hover .g-badge {
          background: #FF6B35;
        }

        .g-overlay {
          position: absolute;
          inset: 0;
          background: #FF6B35;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 5;
          pointer-events: none;
        }
        .g-card:hover .g-overlay {
          opacity: 0.08;
        }

        .g-view-btn {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #FF6B35;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.85rem;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
          z-index: 10;
          white-space: nowrap;
          opacity: 0;
        }
        .g-card:hover .g-view-btn {
          transform: translateX(-50%) translateY(0);
          bottom: 16px;
          opacity: 1;
        }

        .bundle-card:hover .b-white { transform: rotate(-8deg) translateX(-10px) !important; }
        .bundle-card:hover .b-yellow { transform: rotate(0deg) !important; }
        .bundle-card:hover .b-pink { transform: rotate(8deg) translateX(10px) !important; }

        .shimmer-btn {
          position: relative;
          overflow: hidden;
          background-size: 200% auto;
          background-image: linear-gradient(135deg, var(--accent-orange) 0%, #FF8C42 40%, #FFE0D1 50%, #FF8C42 60%, var(--accent-orange) 100%);
          animation: shimmer 3s linear infinite;
        }
      `}} />
    </section>
  );
}
