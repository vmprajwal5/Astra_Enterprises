'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isResetMode) {
      if (!email) {
        setError('Please enter your email address first.');
        setLoading(false);
        return;
      }
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess('Reset link sent! Check your inbox.');
      }
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email, password
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Try again.');
      } else if (authError.message.includes('Email not confirmed')) {
        setError('Please verify your email first.');
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err) {
      router.push('/');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT SIDE - Hidden on Mobile */}
      <div className="login-left-panel" style={{
        width: '45%',
        backgroundColor: '#0A0F1E',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 4rem',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}>
        {/* Floating background animation */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '300px',
          height: '400px',
          backgroundColor: '#FFFFFF',
          opacity: 0.05,
          borderRadius: '12px',
          transform: 'rotate(15deg)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideRight 0.6s ease-out' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: "900",
              color: "#FFFFFF"
            }}>
              <span>ASTRA ENTERPRISES</span>
              <span style={{ color: "#FF6B35" }}>.</span>
            </div>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideRight 0.7s ease-out', marginTop: 'auto', marginBottom: 'auto' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3.5rem',
            lineHeight: 1.2,
            marginBottom: '2rem'
          }}>
            Heritage Print Quality.<br/>
            Modern Workflow.
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> 500+ Businesses Served
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> Ships to India, UK & USA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> 2-Hour Quote Response
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideRight 0.8s ease-out', fontSize: '1.1rem' }}>
          <span style={{ color: '#94A3B8' }}>Don't have an account? </span>
          <Link href="/register" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>
            Create one free →
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right-panel" style={{
        width: '55%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {/* Mobile Header elements */}
        <div className="mobile-only-header" style={{ display: 'none', width: '100%', maxWidth: '420px', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: "900",
              color: "#0A0F1E"
            }}>
              <span>ASTRA ENTERPRISES</span>
              <span style={{ color: "#FF6B35" }}>.</span>
            </div>
          </Link>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '420px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#0A0F1E',
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>
            Welcome back
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Sign in to your Astra account
          </p>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', width: '100%', marginBottom: '2rem' }}></div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ animation: mounted ? 'fadeIn 0.5s ease-out 0.1s both' : 'none' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1E293B' }}>Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="auth-input"
                placeholder="you@company.com"
              />
            </div>

            {!isResetMode ? (
              <div style={{ animation: mounted ? 'fadeIn 0.5s ease-out 0.2s both' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B' }}>Password</label>
                  <button type="button" onClick={() => setIsResetMode(true)} style={{ background: 'none', border: 'none', color: '#FF6B35', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="auth-input"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1rem'
                  }}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.4s ease-out', color: '#64748B', fontSize: '0.95rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                Enter your email above and click Send Reset Link.
                <button type="button" onClick={() => { setIsResetMode(false); setSuccess(''); setError(''); }} style={{ display: 'block', background: 'none', border: 'none', color: '#FF6B35', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem', padding: 0 }}>
                  ← Back to Sign In
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              style={{
                width: '100%',
                background: '#FF6B35',
                color: 'white',
                padding: '1rem',
                border: 'none',
                borderRadius: '100px',
                fontWeight: 600,
                fontSize: '1.05rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s',
                marginTop: '0.5rem',
                animation: mounted ? 'fadeIn 0.5s ease-out 0.3s both' : 'none'
              }}
              className="auth-submit-btn"
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner-small"></div>
                  {isResetMode ? 'Sending...' : 'Authenticating...'}
                </div>
              ) : (
                isResetMode ? 'Send Reset Link' : 'Sign In'
              )}
            </button>

            {error && <div style={{ color: '#EF4444', textAlign: 'center', fontSize: '0.95rem', marginTop: '0.5rem', animation: 'fadeInUp 0.3s ease-out' }}>{error}</div>}
            {success && <div style={{ color: '#10B981', textAlign: 'center', fontSize: '0.95rem', marginTop: '0.5rem', animation: 'fadeInUp 0.3s ease-out' }}>{success}</div>}

          </form>

        </div>
        
        {/* Mobile footer element */}
        <div className="mobile-only-footer" style={{ display: 'none', marginTop: '3rem', fontSize: '1rem' }}>
          <span style={{ color: '#64748B' }}>Don't have an account? </span>
          <Link href="/register" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>
            Create one free →
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-input {
          width: 100%;
          padding: 1rem 1.2rem;
          border-radius: 8px;
          border: 1px solid #CBD5E1;
          outline: none;
          color: #0F172A;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .auth-input:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
        }
        .auth-submit-btn:hover:not(:disabled) {
          background: #E85A28 !important;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(15deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes slideRight {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spinner-small {
          width: 20px; height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { width: 100% !important; padding: 2rem !important; }
          .mobile-only-header { display: block !important; }
          .mobile-only-footer { display: block !important; }
        }
      `}} />
    </div>
  );
}
