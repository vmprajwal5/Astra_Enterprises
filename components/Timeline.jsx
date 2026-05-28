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
    }, { threshold: 0.2 });
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const steps = [
    { title: "Quote & Order", desc: "Approve quote and submit your artwork.", day: "Day 1" },
    { title: "Proofing", desc: "We send a digital proof for your approval.", day: "Day 1-2" },
    { title: "Printing", desc: "Your order is printed, numbered, and bound.", day: "Day 3-5" },
    { title: "Standard Shipping", desc: "Order is quality-checked and shipped.", day: "Day 6-7" },
    { title: "Rush Delivery", desc: "Expedited processing and overnight shipping.", day: "24-48 Hours" }
  ];

  return (
    <section id="timeline-section">
      <div className="container">
        <h2 className={`section-title heading-reveal ${animated ? 'visible' : ''}`}>
          <span className="heading-reveal-text">From Click to Delivery</span>
        </h2>
        <p className={animated ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: animated ? 1 : 0 }}>
          Our streamlined production process ensures your custom forms arrive on time, every time.
        </p>

        <div className="process-timeline" ref={timelineRef}>
          <div className="timeline-line-dynamic" style={{ transform: animated ? 'scaleY(1)' : 'scaleY(0)' }}></div>
          {steps.map((step, i) => (
            <div key={i} className={`timeline-step ${i % 2 === 0 ? 'left-step' : 'right-step'}`}>
              <div 
                className="timeline-dot" 
                style={{ 
                  opacity: animated ? 1 : 0,
                  animation: animated ? `popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.2}s forwards, borderPulse 2s ease ${0.8 + i * 0.2}s infinite` : 'none'
                }}
              >
                {i + 1}
              </div>
              <div 
                className={`timeline-step-content ${animated ? (i % 2 === 0 ? 'anim-fade-right' : 'anim-fade-left') : ''}`}
                style={{ opacity: 0, animationDelay: `${0.4 + i * 0.2}s` }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>{step.desc}</p>
                <div className="timeline-day">{step.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .process-timeline {
          position: relative;
          max-width: 800px;
          margin: 4rem auto;
          padding: 2rem 0;
        }
        .timeline-line-dynamic {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          margin-left: -2px;
          background: var(--surface-3);
          transform-origin: top;
          transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .timeline-step {
          position: relative;
          width: 50%;
          margin-bottom: 3rem;
        }
        .timeline-step.left-step {
          left: 0;
          padding-right: 3rem;
          text-align: right;
        }
        .timeline-step.right-step {
          left: 50%;
          padding-left: 3rem;
          text-align: left;
        }
        
        .timeline-dot {
          position: absolute;
          top: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--accent-orange);
          color: var(--accent-orange);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .timeline-step.left-step .timeline-dot {
          right: -20px;
        }
        .timeline-step.right-step .timeline-dot {
          left: -20px;
        }

        .timeline-step-content {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          position: relative;
          border: 1px solid var(--gray-light);
        }
        .timeline-day {
          display: inline-block;
          margin-top: 1rem;
          padding: 4px 12px;
          background: #FFF3ED;
          color: var(--accent-orange);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .timeline-line-dynamic {
            left: 20px;
          }
          .timeline-step.left-step, .timeline-step.right-step {
            width: 100%;
            left: 0;
            padding-left: 60px;
            padding-right: 0;
            text-align: left;
          }
          .timeline-step.left-step .timeline-dot, .timeline-step.right-step .timeline-dot {
            left: 0;
            right: auto;
          }
        }
      `}} />
    </section>
  );
}
