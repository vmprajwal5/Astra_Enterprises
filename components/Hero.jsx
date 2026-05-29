'use client';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const words = ["Business.", "Invoices.", "Orders.", "Receipts."];

  const fields = [
    { key: 'invoiceNum', text: 'INV-2024-0847', delay: 0 },
    { key: 'date', text: new Date().toLocaleDateString(), delay: 800 },
    { key: 'billTo', text: "John's Plumbing Co.", delay: 1600 },
    { key: 'dueDate', text: '30 Days', delay: 2400 },
    { key: 'item1', text: 'NCR Work Order Pads', delay: 2600 },
    { key: 'item2', text: 'Custom Logo Print', delay: 3400 },
    { key: 'item3', text: 'Express Delivery', delay: 4200 }
  ];

  const [typedFields, setTypedFields] = useState({});
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const timers = fields.map(field => {
      let charIndex = 0;
      const startTimer = setTimeout(() => {
        const interval = setInterval(() => {
          charIndex++;
          setTypedFields(prev => ({
            ...prev,
            [field.key]: field.text.slice(0, charIndex)
          }));
          if (charIndex >= field.text.length) {
            clearInterval(interval);
          }
        }, 50);
        return interval;
      }, field.delay);
      return startTimer;
    });

    const loopTimer = setTimeout(() => {
      setTypedFields({});
      setLoopCount(prev => prev + 1);
    }, 8000);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearTimeout(loopTimer);
    };
  }, [loopCount]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolledPast = scrollY > (typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600);

  return (
    <section className="hero-section" id="hero">
      {/* Background Layers */}
      <div className="hero-bg-base"></div>
      
      {/* Orbs */}
      <div className="hero-orb orb-1"></div>
      <div className="hero-orb orb-2"></div>
      <div className="hero-orb orb-3"></div>
      
      {/* Dot Grid */}
      <div className="hero-dot-grid"></div>

      {/* Ghost Cards */}
      <div className="hero-ghost-card ghost-1"></div>
      <div className="hero-ghost-card ghost-2"></div>
      <div className="hero-ghost-card ghost-3"></div>
      <div className="hero-ghost-card ghost-4"></div>

      {/* Noise Grain */}
      <div className="hero-noise"></div>

      <div className={`hero-container ${isScrolledPast ? 'scrolled-past' : ''}`}>
        
        {/* LEFT SIDE: Headline Block */}
        <div className="hero-left">
          <h1 className="hero-headline">
            <div className="headline-line headline-enter">Print That</div>
            <div className="headline-line headline-enter flip-container">
              Means 
              <div className="word-flipper">
                {words.map((word, i) => (
                  <span key={i} className="flip-word" style={{ animationDelay: `${i * 2}s` }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </h1>
          
          <p className="hero-subhead enter-subhead">
            Custom NCR printing for trades, salons & businesses — India, UK & USA.
          </p>

          <div className="hero-ctas">
            <a href="#quote" className="hero-btn primary-btn enter-cta-1">
              Get a Custom Quote &rarr;
              <div className="btn-shimmer"></div>
            </a>
            <a href="#works" className="hero-btn secondary-btn enter-cta-2">
              See How It Works
            </a>
          </div>

          <div className="hero-trust-badges enter-badges">
            <div className="trust-badge"><span className="dot"></span>500+ Businesses Served</div>
            <div className="trust-divider"></div>
            <div className="trust-badge"><span className="dot"></span>Ships to 3 Countries</div>
            <div className="trust-divider"></div>
            <div className="trust-badge"><span className="dot"></span>2-Hour Quote Response</div>
          </div>
        </div>

        {/* RIGHT SIDE: Animated Invoice Stack */}
        <div className="hero-right">
          <div className="invoice-glow enter-glow"></div>
          
          <div className="invoice-stack-wrapper enter-stack">
            <div className="invoice-stack">
              
              {/* Card 3 (Pink) */}
              <div className="inv-card inv-card-3"></div>
              
              {/* Card 2 (Yellow) */}
              <div className="inv-card inv-card-2"></div>
              
              {/* Card 1 (White) */}
              <div className="inv-card inv-card-1">
                <div className="inv-header-mini">
                  <span className="inv-brand">ASTRA ENTERPRISES</span>
                  <span className="inv-title">TAX INVOICE</span>
                </div>
                <div className="inv-header-line"></div>
                
                <div className="inv-body">
                  <div className="inv-fields">
                    <div className="inv-field">
                      <span className="label">Invoice #:</span>
                      <span className="value">
                        {typedFields.invoiceNum || ''}
                        {(typedFields.invoiceNum || '').length < 'INV-2024-0847'.length && <span className="typing-cursor"></span>}
                      </span>
                    </div>
                    <div className="inv-field">
                      <span className="label">Date:</span>
                      <span className="value">
                        {typedFields.date || ''}
                        {(typedFields.date || '').length < new Date().toLocaleDateString().length && <span className="typing-cursor"></span>}
                      </span>
                    </div>
                    <div className="inv-field">
                      <span className="label">Bill To:</span>
                      <span className="value">
                        {typedFields.billTo || ''}
                        {(typedFields.billTo || '').length < "John's Plumbing Co.".length && <span className="typing-cursor"></span>}
                      </span>
                    </div>
                    <div className="inv-field">
                      <span className="label">Due Date:</span>
                      <span className="value">
                        {typedFields.dueDate || ''}
                        {(typedFields.dueDate || '').length < '30 Days'.length && <span className="typing-cursor"></span>}
                      </span>
                    </div>
                  </div>

                  <div className="inv-table">
                    <div className="inv-th">
                      <span>Description</span><span>Qty</span><span>Unit</span><span>Total</span>
                    </div>
                    <div className="inv-tr">
                      <span>
                        {typedFields.item1 || ''}
                        {(typedFields.item1 || '').length < 'NCR Work Order Pads'.length && <span className="typing-cursor"></span>}
                      </span><span>50</span><span>$0.90</span><span>$45.00</span>
                    </div>
                    <div className="inv-tr alt">
                      <span>
                        {typedFields.item2 || ''}
                        {(typedFields.item2 || '').length < 'Custom Logo Print'.length && <span className="typing-cursor"></span>}
                      </span><span>1</span><span>$15</span><span>$15.00</span>
                    </div>
                    <div className="inv-tr">
                      <span>
                        {typedFields.item3 || ''}
                        {(typedFields.item3 || '').length < 'Express Delivery'.length && <span className="typing-cursor"></span>}
                      </span><span>1</span><span>$8</span><span>$8.00</span>
                    </div>
                  </div>

                  <div className="inv-total-row">
                    TOTAL: $68.00
                  </div>
                </div>

                <div className="inv-footer">
                  Thank you for your business — astraenterprises.co
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>

      <div className="scroll-indicator">
        Scroll to see the magic &darr;
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background-color: var(--navy-900);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5%;
        }

        /* --- BACKGROUND LAYERS --- */
        .hero-bg-base {
          position: absolute;
          inset: 0;
          background-color: var(--navy-900);
          z-index: 0;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: var(--orange-500);
          top: -100px; right: -100px;
          opacity: 0.15;
          animation: orb-drift-1 20s linear infinite;
        }
        .orb-2 {
          width: 800px; height: 800px;
          background: var(--navy-600);
          bottom: -200px; left: -200px;
          opacity: 0.18;
          animation: orb-drift-2 25s linear infinite;
        }
        .orb-3 {
          width: 400px; height: 400px;
          background: var(--gold-400);
          top: 40%; right: 20%;
          opacity: 0.12;
          animation: pulse-glow 15s ease-in-out infinite;
        }

        .hero-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--white) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0;
          z-index: 2;
          animation: fade-in 1s ease 0.2s forwards;
        }

        .hero-ghost-card {
          position: absolute;
          border: 1px solid var(--white-15, rgba(255,255,255,0.15));
          border-radius: 8px;
          pointer-events: none;
          z-index: 2;
          will-change: transform, opacity;
        }
        .ghost-1 { width: 150px; height: 200px; top: 15%; left: 8%; opacity: 0.05; animation: ghost-rot-1 25s linear infinite; }
        .ghost-2 { width: 120px; height: 160px; top: 65%; right: 10%; opacity: 0.04; animation: ghost-rot-2 30s linear infinite; }
        .ghost-3 { width: 200px; height: 280px; bottom: 10%; left: 25%; opacity: 0.06; animation: ghost-rot-1 35s linear infinite reverse; }
        .ghost-4 { width: 180px; height: 240px; top: 25%; right: 30%; opacity: 0.08; animation: ghost-rot-2 20s linear infinite reverse; }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 1;
          pointer-events: none;
          z-index: 3;
        }

        /* --- CONTAINER --- */
        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          width: 100%;
          max-width: 1200px;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }

        .scrolled-past {
          /* Headline compresses upward handled in child, stack tilts handled in child */
        }
        .scrolled-past .hero-left {
          transform: translateY(-40px);
          opacity: 0;
        }
        .scrolled-past .hero-right {
          transform: rotateX(15deg) translateY(-20px);
          opacity: 0;
        }

        /* --- LEFT SIDE --- */
        .hero-left {
          width: 55%;
          transition: transform 0.6s ease, opacity 0.6s ease;
        }

        .hero-headline {
          font-family: 'Playfair Display', serif;
          font-size: 5.5rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .headline-line {
          opacity: 0;
          transform: translateY(30px);
        }
        .headline-enter {
          animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .flip-container {
          display: flex;
          gap: 15px;
          white-space: nowrap;
          perspective: 1000px;
        }
        .word-flipper {
          position: relative;
          display: inline-block;
          color: var(--orange-500);
          text-shadow: 0 0 20px var(--orange-glow);
          border-bottom: 4px solid var(--orange-500);
          box-shadow: 0 10px 20px -10px var(--orange-glow);
        }
        .flip-word {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          transform-origin: 50% 100%;
          animation: word-flip 8s infinite; 
        }
        .flip-word:first-child {
          position: relative;
        }
        @keyframes word-flip {
          0% { opacity: 0; transform: rotateX(-90deg) translateY(20px); }
          5% { opacity: 1; transform: rotateX(0deg) translateY(0); }
          20% { opacity: 1; transform: rotateX(0deg) translateY(0); }
          25% { opacity: 0; transform: rotateX(90deg) translateY(-20px); }
          100% { opacity: 0; transform: rotateX(90deg) translateY(-20px); }
        }

        .hero-subhead {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: var(--white);
          opacity: 0;
          margin-bottom: 2.5rem;
          max-width: 90%;
        }
        .enter-subhead {
          animation: fade-in 0.8s ease 0.8s forwards;
        }

        .hero-ctas {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .hero-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          border-radius: var(--radius-pill, 100px);
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .primary-btn {
          background-color: var(--orange-500);
          color: var(--white);
        }
        .primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px var(--orange-glow);
        }
        .btn-shimmer {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
        }
        .primary-btn:hover .btn-shimmer {
          animation: sweep-light 0.8s ease;
        }
        .secondary-btn {
          background-color: transparent;
          color: var(--white);
          border: 2px solid var(--white);
        }
        .secondary-btn:hover {
          border-color: var(--orange-500);
          color: var(--orange-500);
        }
        .enter-cta-1 { animation: slide-up-fade 0.6s ease 1.1s forwards; }
        .enter-cta-2 { animation: slide-up-fade 0.6s ease 1.25s forwards; }

        .hero-trust-badges {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
        }
        .enter-badges { animation: fade-in 1s ease 1.4s forwards; }
        .trust-badge {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: var(--white);
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dot {
          width: 6px; height: 6px;
          background-color: var(--orange-500);
          border-radius: 50%;
          display: inline-block;
        }
        .trust-divider {
          width: 1px; height: 12px;
          background-color: var(--white);
          opacity: 0.2;
        }

        /* --- RIGHT SIDE --- */
        .hero-right {
          width: 45%;
          position: relative;
          perspective: 1000px;
          transition: transform 0.6s ease, opacity 0.6s ease;
        }

        .invoice-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 400px; height: 400px;
          background: var(--orange-500);
          filter: blur(80px);
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 0;
        }
        .enter-glow { animation: pulse-glow-appear 4s infinite 1.6s forwards; }
        @keyframes pulse-glow-appear {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
          10% { opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }

        .invoice-stack-wrapper {
          position: relative;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
          opacity: 0;
          transform: scale(0.85);
          z-index: 10;
        }
        .enter-stack {
          animation: pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s forwards, float 4s ease-in-out infinite 1.8s;
        }
        @keyframes pop-in {
          to { opacity: 1; transform: scale(1); }
        }

        .invoice-stack {
          position: relative;
          width: 100%;
          padding-bottom: 120%; /* Aspect ratio */
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
        }

        .invoice-stack:hover .inv-card-1 {
          transform: translateY(-20px) rotate(-2deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }
        .invoice-stack:hover .inv-card-2 {
          transform: translateY(0px) rotate(3deg);
        }

        .inv-card {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        
        .inv-card-3 {
          background-color: #FFC0CB; /* Pink */
          transform: translateY(16px) rotate(6deg);
          opacity: 0.5;
          z-index: 1;
        }
        .inv-card-2 {
          background-color: #FFF9C4; /* Yellow */
          transform: translateY(8px) rotate(3deg);
          opacity: 0.75;
          z-index: 2;
        }
        .inv-card-1 {
          background-color: var(--white);
          transform: translateY(0px) rotate(0deg);
          opacity: 1;
          z-index: 3;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        /* --- INVOICE MINI DESIGN --- */
        .inv-header-mini {
          display: flex; justify-content: space-between; align-items: flex-end;
          background: var(--navy-900); color: var(--white);
          padding: 12px; border-radius: 6px 6px 0 0;
        }
        .inv-brand { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 14px; }
        .inv-title { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1px; }
        .inv-header-line { height: 3px; background-color: var(--orange-500); width: 100%; margin-bottom: 20px; }

        .inv-body { flex: 1; display: flex; flex-direction: column; gap: 20px; }
        
        .inv-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .inv-field { display: flex; flex-direction: column; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
        .inv-field .label { color: #888; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 9px; text-transform: uppercase; }
        .inv-field .value { color: #111; font-weight: 500; overflow: hidden; white-space: nowrap; border-right: 2px solid transparent; }
        
        .inv-table { font-family: 'Inter', sans-serif; font-size: 10px; width: 100%; border-collapse: collapse; }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #FF6B35;
          margin-left: 2px;
          animation: blink 0.7s ease infinite;
          vertical-align: text-bottom;
        }
        .inv-th, .inv-tr { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 8px 4px; border-bottom: 1px solid #EEE; }
        .inv-th { font-weight: 700; color: #666; border-bottom: 2px solid #DDD; }
        .inv-tr span, .inv-th span { text-align: right; }
        .inv-tr span:first-child, .inv-th span:first-child { text-align: left; }
        .inv-tr.alt { background-color: #F9F9F9; }

        .inv-total-row {
          background-color: var(--navy-900); color: var(--white);
          padding: 12px; text-align: right; font-weight: 700; font-size: 14px;
          border-radius: 4px; margin-top: auto;
        }

        .inv-footer {
          text-align: center; font-size: 9px; color: #999; margin-top: 20px; font-family: 'Inter', sans-serif;
        }

        /* --- MOBILE RESPONSIVE --- */
        @media (max-width: 768px) {
          .hero-container { flex-direction: column; text-align: center; margin-top: 80px; }
          .hero-left { width: 100%; margin-bottom: 40px; display: flex; flex-direction: column; align-items: center; }
          .hero-right { width: 100%; max-width: 300px; }
          .hero-headline { font-size: 3.5rem; }
          .flip-container { justify-content: center; }
          .hero-subhead { font-size: 1.1rem; }
          .hero-ctas { flex-direction: column; width: 100%; max-width: 300px; }
          .hero-trust-badges { flex-direction: column; gap: 8px; }
          .trust-divider { display: none; }
          .ghost-1, .ghost-2, .ghost-3, .ghost-4 { display: none; }
          .orb-3 { display: none; }
          .invoice-stack-wrapper { transform: scale(0.75); }
          .enter-stack { animation: pop-in-mobile 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s forwards, float 4s ease-in-out infinite 1.8s; }
        }
        @keyframes pop-in-mobile { to { opacity: 1; transform: scale(0.75); } }
        
        @keyframes slide-up-fade {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}} />
    </section>
  );
}
