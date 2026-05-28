'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('astra_cookie_consent');
      if (!consent) {
        setShow(true);
      }
    } catch (e) {
      console.error('localStorage access denied', e);
    }
  }, []);

  const handleConsent = (level) => {
    try {
      localStorage.setItem('astra_cookie_consent', JSON.stringify({
        consent: level,
        date: new Date().toISOString()
      }));
    } catch (e) {
      console.error('localStorage access denied', e);
    }
    
    setExiting(true);
    setTimeout(() => {
      setShow(false);
    }, 400); // Wait for exit animation
  };

  if (!show) return null;

  return (
    <>
      <div className={`cookie-banner-container ${exiting ? 'exiting' : ''}`}>
        <div className="cookie-banner-content">
          <div className="cookie-text">
            🍪 We use cookies to improve your experience and analyse site usage. By continuing, you agree to our <Link href="/privacy" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Privacy Policy</Link>.
          </div>
          <div className="cookie-actions">
            <button className="btn-cookie-all" onClick={() => handleConsent('all')}>
              Accept All
            </button>
            <button className="btn-cookie-necessary" onClick={() => handleConsent('necessary')}>
              Necessary Only
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .cookie-banner-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0D1B2A;
          border-top: 2px solid #FF6B35;
          z-index: 9997;
          padding: 16px 24px;
          animation: slideUp 0.4s ease forwards;
        }
        
        .cookie-banner-container.exiting {
          animation: slideDown 0.4s ease forwards;
        }

        .cookie-banner-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cookie-text {
          color: white;
          font-size: 14px;
          max-width: 600px;
          line-height: 1.5;
        }

        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .btn-cookie-all {
          background: #FF6B35;
          color: white;
          border: none;
          padding: 8px 24px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .btn-cookie-all:hover {
          background: #E85D2A;
        }

        .btn-cookie-necessary {
          background: transparent;
          color: white;
          border: 1px solid white;
          padding: 8px 24px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .btn-cookie-necessary:hover {
          background: rgba(255,255,255,0.1);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }

        @media (max-width: 640px) {
          .cookie-banner-container {
            padding: 16px;
          }
          .cookie-banner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .cookie-actions {
            width: 100%;
            flex-direction: column;
            gap: 10px;
          }
          .btn-cookie-all, .btn-cookie-necessary {
            width: 100%;
            text-align: center;
          }
        }
      `}} />
    </>
  );
}
