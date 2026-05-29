'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currency, setCurrency] = useState('GBP')
  const router = useRouter()

  const currencies = ['GBP', 'USD', 'INR']
  const currencySymbols = { GBP: '£', USD: '$', INR: '₹' }

  const toggleCurrency = () => {
    const idx = currencies.indexOf(currency)
    const next = currencies[(idx + 1) % currencies.length]
    setCurrency(next)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('currencyChange', { detail: next }))
      localStorage.setItem('astra_currency', next)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('astra_currency')
    if (saved) setCurrency(saved)

    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) await loadProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadProfile(session.user.id)
        }
        if (event === 'SIGNED_OUT') setProfile(null)
        setLoading(false)
      }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const loadProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (data) setProfile(data)
    } catch (err) {
      console.error('Profile load error:', err)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
    setDropdownOpen(false)
    router.push('/')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Configure', href: '#configurator' },
    { label: 'Preview', href: '#preview' },
    { label: 'Design', href: '#design' },
    { label: 'Process', href: '#process' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 9999,
        boxSizing: 'border-box',
        background: scrolled
          ? 'rgba(10,15,30,0.98)'
          : 'rgba(10,15,30,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,107,53,0.3)'
          : '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
      }}>

        {/* LEFT — Logo */}
        <Link href="/" style={{
          color: '#FF6B35',
          fontSize: '18px',
          fontWeight: '800',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.3px',
          flexShrink: 0,
          zIndex: 1,
        }}>
          ASTRA ENTERPRISES.
        </Link>

        {/* CENTER — Nav Links (desktop only) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="astra-desktop-nav">
          {navLinks.map((link) => (
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
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FF6B35'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#FFFFFF'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT — Currency + Auth */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
          zIndex: 1,
        }}>

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            title="Switch currency"
            style={{
              background: 'rgba(255,107,53,0.15)',
              border: '1px solid rgba(255,107,53,0.5)',
              color: '#FF6B35',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,107,53,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,107,53,0.15)'
            }}
          >
            {currencySymbols[currency]} {currency}
            <span style={{ fontSize: '9px' }}>▼</span>
          </button>

          {/* Auth Section */}
          {loading ? (
            <div style={{ width: '80px', height: '36px' }} />
          ) : profile ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>
                  {getInitials(profile.full_name)}
                </div>
                <span style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {profile.full_name?.split(' ')[0]}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '10px',
                }}>▾</span>
              </div>

              {dropdownOpen && (
                <>
                  <div
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 10000,
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: '#0D1B2A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '180px',
                    zIndex: 10001,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}>
                    {[
                      { icon: '👤', label: 'My Account' },
                      { icon: '📋', label: 'My Quotes' },
                      { icon: '🚪', label: 'Sign Out', action: handleSignOut },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action || (() => setDropdownOpen(false))}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 16px',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(255,107,53,0.15)'
                          e.currentTarget.style.color = '#FF6B35'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'none'
                          e.currentTarget.style.color = '#FFFFFF'
                        }}
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.35)',
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FF6B35'
                e.currentTarget.style.color = '#FF6B35'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              >
                Sign In
              </Link>
              <a href="#quote" style={{
                color: '#FFFFFF',
                background: '#FF6B35',
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E85D2A'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FF6B35'
              }}
              >
                Get a Quote
              </a>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="astra-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              marginLeft: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileOpen
                  ? i === 0
                    ? 'rotate(45deg) translateY(7px)'
                    : i === 2
                      ? 'rotate(-45deg) translateY(-7px)'
                      : 'scaleX(0)'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: '#0A0F1E',
          padding: '20px 24px 28px',
          zIndex: 9998,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                padding: '13px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '16px',
          }}>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '12px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Sign In
            </Link>
            <a
              href="#quote"
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                color: '#FFFFFF',
                background: '#FF6B35',
                padding: '12px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}

      {/* Scoped responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .astra-desktop-nav {
            display: none !important;
          }
          .astra-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .astra-desktop-nav {
            display: flex !important;
          }
          .astra-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
