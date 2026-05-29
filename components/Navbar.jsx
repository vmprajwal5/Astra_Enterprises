'use client';
import { useState, useEffect, useRef } from 'react';
import UserDashboard from './UserDashboard';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { user, profile } = useAuth();
  const { currency, setCurrency, currencies, symbols } = useCurrency();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleCurrency = () => {
    const idx = currencies.indexOf(currency);
    setCurrency(currencies[(idx + 1) % currencies.length]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAvatarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.2 });
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAvatarDropdownOpen(false);
  };

  return (
    <>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '70px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        boxSizing: 'border-box',
        background: 'rgba(10, 15, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem",
          fontWeight: "900",
          color: "#FFFFFF",
          cursor: "pointer",
          zIndex: 10002
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>ASTRA ENTERPRISES</span>
            <span style={{ color: "#FF6B35" }}>.</span>
          </Link>
        </div>
        
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center', 
            gap: '32px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }} className="desktop-nav-links">
            {[
              { label: 'Products', href: '#products' },
              { label: 'Configure', href: '#configurator' },
              { label: 'Preview', href: '#preview' },
              { label: 'Design', href: '#design' },
              { label: 'Process', href: '#process' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  opacity: 1,
                  visibility: 'visible',
                  display: 'inline-block',
                  padding: '4px 0',
                  borderBottom: '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6B35'
                  e.currentTarget.style.borderBottomColor = '#FF6B35'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.borderBottomColor = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
            
            {/* Currency switcher */}
            <button
              onClick={toggleCurrency}
              className="currency-switcher-btn"
              title="Switch currency"
            >
              <span className="currency-symbol-only">{symbols[currency]}</span>
              <span className="currency-full">{symbols[currency]} {currency}</span>
              <span style={{ fontSize: '10px', opacity: 0.7 }}>▼</span>
            </button>

            <a
              href="#quote"
              style={{
                color: '#FFFFFF',
                backgroundColor: '#FF6B35',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                padding: '10px 24px',
                borderRadius: '100px',
                display: 'inline-block',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Get a Quote
            </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!user ? (
              <Link href="/login" style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 16px',
                borderRadius: '100px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none'
              }}>Sign In</Link>
            ) : (
              <div ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                <div onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <div style={{ width: '32px', height: '32px', backgroundColor: '#FF6B35', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span style={{ color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    {profile?.full_name?.split(' ')[0] || 'User'}
                  </span>
                </div>
                
                {avatarDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: '0',
                    backgroundColor: '#0D1B2A', borderRadius: '8px', padding: '8px 0', minWidth: '160px', zIndex: 1000
                  }}>
                    <div className="avatar-dropdown-item" onClick={() => { setDashboardOpen(true); setAvatarDropdownOpen(false); }}>My Account</div>
                    <div className="avatar-dropdown-item" onClick={() => { setDashboardOpen(true); setAvatarDropdownOpen(false); }}>My Quotes</div>
                    <div className="avatar-dropdown-item" onClick={handleSignOut}>Sign Out</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation menu">
          <span></span><span></span><span></span>
        </button>

        <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}></div>
        <div className={`mobile-menu-panel ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-links">
            <a href="/#products" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.05s' }}>Products</a>
            <a href="/#configurator" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.10s' }}>Configure</a>
            <a href="/#preview" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.15s' }}>Preview</a>
            <a href="/#design" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.20s' }}>Design</a>
            <a href="/#process" onClick={() => setMobileOpen(false)} style={{ animationDelay: '0.25s' }}>Process</a>
          </div>
          <div className="mobile-actions" style={{ animationDelay: '0.25s' }}>
            {/* Mobile currency switcher */}
            <button
              onClick={toggleCurrency}
              style={{
                width: '100%',
                background: 'rgba(255,107,53,0.15)',
                border: '1px solid rgba(255,107,53,0.4)',
                color: '#FF6B35',
                padding: '12px 16px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {symbols[currency]} {currency} <span style={{ fontSize: '10px', opacity: 0.7 }}>▼ tap to switch</span>
            </button>
            {!user ? (
              <Link href="/login" className="nav-signin-btn-mobile" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', textAlign: 'center', display: 'block', boxSizing: 'border-box' }}>Sign In</Link>
            ) : (
              <button className="nav-signin-btn-mobile" onClick={() => { setDashboardOpen(true); setMobileOpen(false); }}>My Account</button>
            )}
            <a href="/#quote" className="mobile-quote-btn" onClick={() => setMobileOpen(false)}>Get a Quote</a>
          </div>
        </div>
      </nav>

      <UserDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} onEditProfile={() => { window.location.href = '/login'; }} />

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--white) !important;
          transition: text-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
          z-index: 10002;
        }
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0%, 80% { left: -100%; }
          100% { left: 200%; }
        }

        .nav-user-profile {
          display: flex; align-items: center; gap: 0.5rem; cursor: pointer;
        }
        .nav-avatar {
          width: 32px; height: 32px;
          background: var(--orange-500); color: white;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: bold; font-family: 'Inter', sans-serif;
        }
        .nav-user-name {
          color: var(--white); font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500;
        }
        
        .avatar-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: var(--navy-800);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.5rem 0;
          min-width: 160px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 1000;
        }
        .avatar-dropdown-item {
          padding: 0.75rem 1.2rem;
          color: var(--white);
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .avatar-dropdown-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--orange-500);
        }
        
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10002;
        }
        .hamburger span {
          width: 24px;
          height: 2px;
          background: white;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }
        .hamburger.open span:first-child { transform: rotate(45deg) translateY(6px) translateX(2.5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translateY(-6px) translateX(2.5px); }
        
        .mobile-menu-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 9998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        
        .mobile-menu-panel {
          position: fixed;
          top: 75px;
          left: 0;
          width: 100vw;
          background: #0A0F1E;
          padding: 24px;
          transform: translateY(-100%);
          transition: transform 0.35s ease;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          z-index: 9999;
          pointer-events: none;
        }
        .mobile-menu-panel.open {
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .mobile-links a {
          min-height: 48px;
          display: flex;
          align-items: center;
          color: white;
          font-size: 16px;
          text-decoration: none;
          border-left: 4px solid transparent;
          padding-left: 1rem;
          transition: border-color 0.2s, background 0.2s;
          opacity: 0;
          transform: translateX(-20px);
        }
        .mobile-menu-panel.open .mobile-links a, .mobile-menu-panel.open .mobile-actions {
          animation: fadeSlideIn 0.3s forwards;
        }
        @keyframes fadeSlideIn {
          to { opacity: 1; transform: translateX(0); }
        }
        .mobile-links a:hover, .mobile-links a:active {
          border-left-color: var(--orange-500);
          background: rgba(255,255,255,0.05);
        }
        
        .mobile-actions {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          opacity: 0;
          transform: translateX(-20px);
        }
        .mobile-quote-btn {
          width: 100%;
          background: var(--orange-500);
          color: white;
          border-radius: 100px;
          padding: 1rem;
          text-align: center;
          font-weight: 600;
          text-decoration: none;
        }
        .nav-signin-btn-mobile {
          width: 100%;
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 100px;
          padding: 1rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .new-nav-links, .nav-actions { display: none !important; }
          .desktop-nav { display: none !important; }
        }

        .currency-switcher-btn {
          background: rgba(255,107,53,0.15);
          border: 1px solid rgba(255,107,53,0.4);
          color: #FF6B35;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: Inter, sans-serif;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .currency-switcher-btn:hover {
          background: rgba(255,107,53,0.25);
          border-color: #FF6B35;
        }
        .currency-symbol-only { display: none; }
        .currency-full { display: inline; }
        @media (max-width: 900px) {
          .currency-symbol-only { display: inline; }
          .currency-full { display: none; }
        }
      `}} />
    </>
  );
}
