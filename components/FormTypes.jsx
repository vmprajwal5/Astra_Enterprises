'use client';
import { useState, useEffect, useRef } from 'react';
import FormStage from './FormStage';

export default function FormTypes() {
  const [stageType, setStageType] = useState(null);
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
    <section id="form-types" ref={sectionRef} style={{ position: 'relative' }}>
      <div 
        className="form-types-dim-overlay" 
        style={{ 
          position: 'absolute', inset: 0, 
          background: 'rgba(0,0,0,0.3)', 
          opacity: stageType ? 1 : 0, 
          pointerEvents: 'none', 
          transition: 'opacity 0.4s ease', 
          zIndex: 1 
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Which form suits your business?</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          Select your industry to see our recommended custom forms in action.
        </p>
        <div style={{ overflowX: 'auto' }} className={isVisible ? "anim-fade-up delay-3" : ""} style={{ opacity: isVisible ? 1 : 0 }}>
          <table className="recommendation-table ft-table">
            <thead>
              <tr>
                <th>Industry / Use Case</th>
                <th>Recommended Form Type</th>
                <th>Standard Copies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={isVisible ? "anim-fade-left" : ""} style={{ opacity: 0, animationDelay: '0.1s' }}>
                <td>
                  <div className="ft-industry-cell">
                    <span className="ft-emoji">🛠️</span>
                    <span>Contractors, Plumbers, Electricians</span>
                  </div>
                </td>
                <td><strong>Invoice</strong><br/>With sequential numbering & wrap-around covers.</td>
                <td>3-part (White, Yellow, Pink)</td>
                <td>
                  <button className="btn btn-outline ft-btn" onClick={() => setStageType('contractor')}>
                    Configure This <span className="ft-arrow">&rarr;</span>
                  </button>
                </td>
              </tr>
              <tr className={isVisible ? "anim-fade-left" : ""} style={{ opacity: 0, animationDelay: '0.18s' }}>
                <td>
                  <div className="ft-industry-cell">
                    <span className="ft-emoji">✂️</span>
                    <span>Salons, Spas, Medical Clinics</span>
                  </div>
                </td>
                <td><strong>Estimate / Quotation</strong><br/>Clean layouts for pre-job pricing.</td>
                <td>2-part (White, Canary)</td>
                <td>
                  <button className="btn btn-outline ft-btn" onClick={() => setStageType('salon')}>
                    Configure This <span className="ft-arrow">&rarr;</span>
                  </button>
                </td>
              </tr>
              <tr className={isVisible ? "anim-fade-left" : ""} style={{ opacity: 0, animationDelay: '0.26s' }}>
                <td>
                  <div className="ft-industry-cell">
                    <span className="ft-emoji">🛍️</span>
                    <span>Retailers, Restaurants, Bakeries</span>
                  </div>
                </td>
                <td><strong>Receipt</strong><br/>Pocket-sized pads for quick on-the-go writing.</td>
                <td>2-part (White, Canary)</td>
                <td>
                  <button className="btn btn-outline ft-btn" onClick={() => setStageType('retail')}>
                    Configure This <span className="ft-arrow">&rarr;</span>
                  </button>
                </td>
              </tr>
              <tr className={isVisible ? "anim-fade-left" : ""} style={{ opacity: 0, animationDelay: '0.34s', background: 'rgba(255, 107, 53, 0.05)' }}>
                <td>
                  <div className="ft-industry-cell">
                    <span className="ft-emoji">🏢</span>
                    <span>All Complete Workflows</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong>Full Bundle</strong>
                    <span className="select-bundle-badge" style={{ fontSize: '0.6rem', background: '#22C55E', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>⭐ BEST VALUE</span>
                  </div>
                  Invoice + Estimate + Receipt combined set.
                </td>
                <td>3-part Standard</td>
                <td>
                  <button className="btn btn-primary ft-btn-primary" onClick={() => setStageType('corporate')}>
                    Configure This <span className="ft-arrow">&rarr;</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FormStage isOpen={!!stageType} onClose={() => setStageType(null)} formType={stageType} />

      <style dangerouslySetInnerHTML={{ __html: `
        .recommendation-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .recommendation-table th {
          background: var(--navy-900);
          color: white;
          text-align: left;
          padding: 1.2rem;
          font-weight: 600;
        }
        .recommendation-table td {
          padding: 1.2rem;
          border-bottom: 1px solid var(--gray-light, #E2E8F0);
          vertical-align: middle;
        }
        .ft-table tr {
          transition: background 0.3s ease;
        }
        .ft-table tr:hover {
          background: #F8FAFC !important;
        }
        
        .ft-industry-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ft-emoji {
          font-size: 1.5rem;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
        }
        .ft-table tr:hover .ft-emoji {
          transform: scale(1.2) rotate(10deg);
        }

        .ft-btn, .ft-btn-primary {
          padding: 0.5rem 1.2rem;
          font-size: 0.9rem;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .ft-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .ft-btn:hover {
          animation: borderPulse 1s infinite;
        }
        .ft-btn:hover .ft-arrow, .ft-btn-primary:hover .ft-arrow {
          transform: translateX(6px);
        }
      `}} />
    </section>
  );
}
