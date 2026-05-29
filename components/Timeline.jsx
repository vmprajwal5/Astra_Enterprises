'use client';
import { useEffect, useRef, useState } from 'react';

export default function Timeline() {
  const [animated, setAnimated] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimated(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: 'Quote & Order',
      day: 'Day 1',
      description: 'Approve your quote and submit artwork or design brief. Our team reviews requirements and confirms specs.'
    },
    {
      title: 'Proofing',
      day: 'Day 1–2',
      description: 'We send a digital proof for your review and approval. Revisions included — we don\'t print until you\'re happy.'
    },
    {
      title: 'Printing',
      day: 'Day 3–5',
      description: 'Your order is printed, numbered, and bound to spec using premium carbonless paper stock.'
    },
    {
      title: 'Standard Shipping',
      day: 'Day 6–7',
      description: 'Order is quality-checked, packed, and dispatched. Tracked delivery to India, UK & USA.'
    },
    {
      title: 'Rush Delivery Available',
      day: '24–48 Hours',
      description: 'Need it fast? Expedited processing and overnight shipping available on request. Contact us to arrange.'
    },
  ];

  return (
    <section id="timeline-section" ref={timelineRef}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${animated ? 'visible' : ''}`}>
          <span className="heading-reveal-text">From Click to Delivery</span>
        </h2>
        <p
          className={animated ? 'section-subtitle anim-fade-up delay-2' : 'section-subtitle'}
          style={{ opacity: animated ? 1 : 0 }}
        >
          Our streamlined production process ensures your custom forms arrive on time, every time.
        </p>

        <div style={{
          maxWidth: '700px',
          margin: '3rem auto 0',
          padding: '0 24px',
          position: 'relative',
        }}>
          {/* Vertical connecting line */}
          {animated && (
            <div style={{
              position: 'absolute',
              left: '47px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, #FF6B35, rgba(255,107,53,0.08))',
              borderRadius: '2px',
            }} />
          )}

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                marginBottom: index < steps.length - 1 ? '28px' : '0',
                position: 'relative',
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
              }}
            >
              {/* Step number circle */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#FF6B35',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '800',
                flexShrink: 0,
                zIndex: 1,
                boxShadow: '0 0 0 4px rgba(255,107,53,0.18), 0 4px 12px rgba(255,107,53,0.3)',
                fontFamily: 'Inter, sans-serif',
              }}>
                {index + 1}
              </div>

              {/* Step card */}
              <div
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '18px 22px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #E2E8F0',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}>
                  <h3 style={{
                    margin: 0,
                    color: '#0A192F',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: '1.3',
                  }}>
                    {step.title}
                  </h3>
                  <span style={{
                    background: 'rgba(255,107,53,0.1)',
                    color: '#FF6B35',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.3px',
                    flexShrink: 0,
                  }}>
                    {step.day}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  color: '#64748B',
                  fontSize: '13.5px',
                  lineHeight: '1.65',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #timeline-section {
          padding: 6rem 5%;
          background: #F8FAFC;
        }
        @media (max-width: 600px) {
          #timeline-section {
            padding: 4rem 5%;
          }
        }
      `}} />
    </section>
  );
}
