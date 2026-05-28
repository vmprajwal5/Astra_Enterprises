'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [launched, setLaunched] = useState(false);
  const [email, setEmail] = useState('');
  const [nlStatus, setNlStatus] = useState('idle');
  const [shake, setShake] = useState(false);

  const handleLaunch = () => {
    setLaunched(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setLaunched(false), 1000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setNlStatus('loading');
    setTimeout(() => {
      try {
        const subs = JSON.parse(localStorage.getItem('astra_subscribers') || '[]');
        subs.push({ email, date: new Date().toISOString() });
        localStorage.setItem('astra_subscribers', JSON.stringify(subs));
      } catch (err) {}
      setNlStatus('success');
    }, 1000);
  };

  return (
    <footer className="footer-bg-anim" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand animate-fade-up">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'white' }}>
              Astra Enterprises<span style={{ color: 'var(--accent-orange)' }}>.</span>
            </h3>
            <p style={{ color: '#CBD5E1', marginBottom: '1rem', lineHeight: '1.6' }}>
              Premium custom NCR forms, carbonless books, and professional business stationery shipped worldwide.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/astra-ncr" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ textDecoration: 'none' }} aria-label="LinkedIn">in</a>
              <a href="https://www.instagram.com/astrancr" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ textDecoration: 'none' }} aria-label="Instagram">ig</a>
            </div>
            
            <div className="footer-newsletter">
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'white' }}>Subscribe to Updates</h4>
              {nlStatus === 'success' ? (
                <div className="animate-fade-up" style={{ color: '#22C55E', fontWeight: '500', padding: '0.5rem 0' }}>
                  ✓ You're subscribed! We'll be in touch.
                </div>
              ) : (
                <form className={`newsletter-form ${shake ? 'shake-anim' : ''}`} onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={nlStatus === 'loading'}
                    className="nl-input"
                  />
                  <button type="submit" disabled={nlStatus === 'loading'} className="nl-btn">
                    {nlStatus === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-links animate-fade-up" data-stagger-delay="0.1s">
            <h4>Products</h4>
            <ul>
              <li><Link href="/#products" className="ft-link">Invoice Books</Link></li>
              <li><Link href="/#products" className="ft-link">Receipt Pads</Link></li>
              <li><Link href="/#products" className="ft-link">Purchase Orders</Link></li>
              <li><Link href="/#products" className="ft-link">Client Intake Forms</Link></li>
              <li><Link href="/#configurator" className="ft-link">Custom Design Tool</Link></li>
            </ul>
          </div>

          <div className="footer-links animate-fade-up" data-stagger-delay="0.2s">
            <h4>Support</h4>
            <ul>
              <li><Link href="/#quote" className="ft-link">Get a Quote</Link></li>
              <li><Link href="/#custom-contact" className="ft-link">Contact Us</Link></li>
              <li><Link href="/shipping" className="ft-link">Shipping & Delivery</Link></li>
              <li><Link href="/refunds" className="ft-link">Refunds & Returns</Link></li>
              <li><Link href="/privacy" className="ft-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="ft-link">Terms & Conditions</Link></li>
            </ul>
            
            <div className="tax-info" style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#CBD5E1', lineHeight: '1.5' }}>
              <p style={{ marginBottom: '0.5rem' }}>Registered business operating across India, UK & USA.</p>
              <p>Tax registration details provided upon invoice request.</p>
            </div>
          </div>
        </div>

        <div className="back-to-top-rocket" onClick={handleLaunch}>
          <span className={`rocket-emoji ${launched ? 'launched' : ''}`}>🚀</span>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', margin: '0.5rem auto 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Back to top
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Astra Enterprises. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Est. 2024</p>
        </div>
      </div>

      <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <span className="wa-tooltip">Chat on WhatsApp</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px"><path d="M12.031 0C5.394 0 .012 5.38.012 12.016c0 2.12.553 4.192 1.603 6.014L0 24l6.113-1.602a11.96 11.96 0 005.918 1.564h.005c6.635 0 12.018-5.38 12.018-12.016 0-3.216-1.253-6.24-3.535-8.514A11.972 11.972 0 0012.031 0zm0 21.968h-.004a9.957 9.957 0 01-5.074-1.385l-.364-.216-3.774.989.998-3.68-.237-.377a9.96 9.96 0 01-1.528-5.283c0-5.501 4.478-9.98 9.983-9.98 2.665 0 5.17 1.039 7.054 2.926A9.954 9.954 0 0122.003 12c0 5.501-4.477 9.968-9.972 9.968zm5.474-7.48c-.3-.15-1.776-.877-2.05-.978-.274-.101-.475-.15-.675.15-.2.3-.776.978-.95 1.178-.175.201-.35.226-.65.076a8.214 8.214 0 01-2.42-1.498c-.933-.808-1.562-1.808-1.737-2.108-.175-.3-.018-.463.132-.613.135-.135.3-.35.45-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.226-.244-.585-.49-.505-.675-.514-.175-.008-.375-.008-.575-.008a1.11 1.11 0 00-.8.375c-.275.3-1.05 1.026-1.05 2.502s1.075 2.895 1.225 3.095c.15.2 2.112 3.226 5.112 4.526 2.593 1.122 3.146 1.05 3.722.95.576-.1 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.426-.075-.126-.275-.201-.575-.351z"/></svg>
      </a>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-bg-anim {
          background: linear-gradient(120deg, #0A192F, #1A365D, #0A192F, #0f2a4a);
          background-size: 300% 300%;
          animation: bgDrift 20s ease infinite;
        }
        @keyframes bgDrift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .ft-link {
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ft-link:hover {
          transform: translateX(4px);
          color: var(--accent-orange) !important;
        }

        .rocket-emoji {
          display: inline-block;
          font-size: 2.5rem;
          animation: floatPreview 3s ease-in-out infinite;
          transition: transform 0.4s ease;
        }
        .back-to-top-rocket:hover .rocket-emoji {
          animation: flipInX 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .rocket-emoji.launched {
          animation: none;
          transform: translateY(-2000px) scale(2);
          transition: transform 1s cubic-bezier(0.8, 0, 0.2, 1);
        }

        .social-icon {
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .social-icon:hover {
          transform: scale(1.15);
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .shake-anim { animation: shake 0.4s ease; }
        
        .nl-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--accent-orange) !important;
        }
        .nl-btn {
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .nl-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
        }
        .nl-btn:hover::after {
          animation: shimmer 1s ease;
        }

        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: #25D366;
          color: #FFF;
          width: 56px;
          height: 56px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          z-index: 9998;
          transition: transform 0.2s ease;
          animation: whatsapp-pulse 2s infinite;
        }
        .wa-tooltip {
          position: absolute;
          right: 68px;
          background-color: white;
          color: #0A192F;
          border-radius: 6px;
          padding: 6px 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .whatsapp-float:hover .wa-tooltip {
          opacity: 1;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
        }
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @media (max-width: 768px) {
          .whatsapp-float {
            width: 48px; height: 48px; bottom: 16px; right: 16px;
          }
          .whatsapp-float svg { width: 24px; height: 24px; }
          .wa-tooltip { right: 58px; }
        }
      `}} />
    </footer>
  );
}
