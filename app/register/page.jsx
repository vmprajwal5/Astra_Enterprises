'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    country: 'India',
    businessName: '',
    salesCount: 'Less than 100',
    discovery: 'Google Search',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length === 0) return { label: '', color: '' };
    if (pwd.length < 8) return { label: 'Weak', color: '#EF4444' };
    const hasNum = /\d/.test(pwd);
    const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    if (pwd.length >= 8 && hasNum && hasSpec) return { label: 'Strong', color: '#10B981' };
    return { label: 'Fair', color: '#F59E0B' };
  };

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (formData.fullName.length < 2) { setError('Full Name must be at least 2 characters.'); return; }
      if (!formData.email) { setError('Email is required.'); return; }
      if (!formData.phone) { setError('Contact Number is required.'); return; }
      setStep(2);
    } else if (step === 2) {
      if (!formData.businessName) { setError('Business Name is required.'); return; }
      setStep(3);
    }
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreed) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: formData.fullName,
          email: formData.email,
          business_name: formData.businessName,
          country: formData.country,
          contact_number: `${formData.countryCode}${formData.phone}`,
          sales_count: formData.salesCount,
          discovery_source: formData.discovery,
          role: 'user'
        });

        if (profileError) {
          console.error("Profile insertion error:", profileError);
        }
      }

      setSuccess(true);
    } catch (err) {
      setError('An unexpected error occurred.');
    }
    setLoading(false);
  };

  const renderProgressBar = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', width: '100%' }}>
        {[1, 2, 3].map((num, i) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 600,
              transition: 'all 0.3s ease',
              background: step > num ? '#FF6B35' : (step === num ? '#FF6B35' : 'transparent'),
              color: step >= num ? 'white' : '#94A3B8',
              border: step >= num ? '2px solid #FF6B35' : '2px solid #CBD5E1'
            }}>
              {step > num ? '✓' : num}
            </div>
            {i < 2 && (
              <div style={{
                width: '40px', height: '2px',
                background: step > num ? '#FF6B35' : '#E2E8F0',
                margin: '0 8px',
                transition: 'all 0.3s ease'
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (success) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <div style={{ background: 'white', padding: '4rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '500px', animation: 'fadeInUp 0.5s ease-out' }}>
          <div style={{ width: '80px', height: '80px', background: '#DCFCE7', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem', animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both' }}>
            ✓
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0A0F1E', marginBottom: '1rem' }}>
            Welcome to Astra NCR, {formData.fullName.split(' ')[0]}!
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your account has been created successfully.</p>
          <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Check your email to verify your account.</p>
          <Link href="/" style={{
            display: 'inline-block',
            background: '#FF6B35', color: 'white', padding: '1rem 2rem',
            borderRadius: '100px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s'
          }}>
            Go to Homepage →
          </Link>
        </div>
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT SIDE - Registration Form */}
      <div className="register-left-panel" style={{
        width: '55%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div className="mobile-only-header" style={{ display: 'none', width: '100%', maxWidth: '420px', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: "900", color: "#0A0F1E" }}>
              <span>ASTRA ENTERPRISES</span>
              <span style={{ color: "#FF6B35" }}>.</span>
            </div>
          </Link>
        </div>

        <div style={{ width: '100%', maxWidth: '420px', opacity: mounted ? 1 : 0, transition: 'opacity 0.6s' }}>
          <div className="mobile-only-progress" style={{ display: 'none', textAlign: 'center', color: '#64748B', fontWeight: 600, marginBottom: '1.5rem' }}>
            Step {step} of 3
          </div>
          
          <div className="desktop-only-progress">
            {renderProgressBar()}
          </div>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* STEP 1 */}
            <div style={{ display: step === 1 ? 'block' : 'none', animation: 'fadeInRight 0.4s ease-out' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#0A0F1E', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Let's get started</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label className="auth-label">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="auth-input" placeholder="John Doe" />
                </div>
                <div>
                  <label className="auth-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="auth-input" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="auth-label">Contact Number</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="auth-input" style={{ width: '100px', padding: '1rem 0.5rem' }}>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="auth-input" style={{ flex: 1 }} placeholder="00000 00000" />
                  </div>
                </div>
                <div>
                  <label className="auth-label">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="auth-input">
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="button" onClick={nextStep} className="auth-submit-btn" style={{ background: '#0F172A', marginTop: '0.5rem' }}>Continue →</button>
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ display: step === 2 ? 'block' : 'none', animation: 'fadeInRight 0.4s ease-out' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#0A0F1E', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Tell us about your business</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label className="auth-label">Business Name</label>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="auth-input" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="auth-label">How many NCR sets do you need per year?</label>
                  <select name="salesCount" value={formData.salesCount} onChange={handleChange} className="auth-input">
                    <option value="Less than 100">Less than 100</option>
                    <option value="100–500">100–500</option>
                    <option value="500–2,000">500–2,000</option>
                    <option value="2,000–5,000">2,000–5,000</option>
                    <option value="5,000+">5,000+</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">How did you find us?</label>
                  <select name="discovery" value={formData.discovery} onChange={handleChange} className="auth-input">
                    <option value="Google Search">Google Search</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Word of Mouth">Word of Mouth</option>
                    <option value="Referred by a Client">Referred by a Client</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={prevStep} className="auth-submit-btn" style={{ background: 'transparent', color: '#0F172A', border: '1px solid #CBD5E1', flex: 1 }}>← Back</button>
                  <button type="button" onClick={nextStep} className="auth-submit-btn" style={{ background: '#0F172A', flex: 2 }}>Continue →</button>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ display: step === 3 ? 'block' : 'none', animation: 'fadeInRight 0.4s ease-out' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#0A0F1E', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Almost there!</h2>
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label className="auth-label">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" value={formData.password} onChange={handleChange} 
                      className="auth-input" placeholder="Min 8 characters" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1rem'
                    }}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {formData.password.length > 0 && (
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: getPasswordStrength(formData.password).color, marginTop: '4px', textAlign: 'right' }}>
                      Strength: {getPasswordStrength(formData.password).label}
                    </div>
                  )}
                </div>
                <div>
                  <label className="auth-label">Confirm Password</label>
                  <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="auth-input" placeholder="Must match" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '0.5rem' }}>
                  <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} style={{ marginTop: '4px', width: '16px', height: '16px', cursor: 'pointer' }} />
                  <label style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
                    I agree to the <Link href="/terms" style={{ color: '#FF6B35' }}>Terms & Conditions</Link> and <Link href="/privacy" style={{ color: '#FF6B35' }}>Privacy Policy</Link>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={prevStep} className="auth-submit-btn" style={{ background: 'transparent', color: '#0F172A', border: '1px solid #CBD5E1', flex: 1 }}>← Back</button>
                  <button type="submit" disabled={loading} className="auth-submit-btn" style={{ flex: 2, background: '#FF6B35', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Creating...' : 'Create My Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {error && <div style={{ color: '#EF4444', textAlign: 'center', fontSize: '0.95rem', marginTop: '1rem', animation: 'fadeInUp 0.3s ease-out' }}>{error}</div>}
        </div>
        
        <div className="mobile-only-footer" style={{ display: 'none', marginTop: '3rem', fontSize: '1rem' }}>
          <span style={{ color: '#64748B' }}>Already have an account? </span>
          <Link href="/login" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>Sign In →</Link>
        </div>
      </div>

      {/* RIGHT SIDE - Branding */}
      <div className="register-right-panel" style={{
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
          left: '-10%',
          width: '300px',
          height: '400px',
          backgroundColor: '#FFFFFF',
          opacity: 0.05,
          borderRadius: '12px',
          transform: 'rotate(-15deg)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideLeft 0.6s ease-out', textAlign: 'right' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: "900", color: "#FFFFFF" }}>
              <span>ASTRA ENTERPRISES</span>
              <span style={{ color: "#FF6B35" }}>.</span>
            </div>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideLeft 0.7s ease-out', marginTop: 'auto', marginBottom: 'auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '2rem' }}>
            Elevate Your<br/>Brand Identity.
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> Premium Custom Printing
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> Sustainable Materials
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
              <span style={{ color: '#FF6B35' }}>✦</span> Unmatched Quality Control
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, animation: 'slideLeft 0.8s ease-out', fontSize: '1.1rem' }}>
          <span style={{ color: '#94A3B8' }}>Already have an account? </span>
          <Link href="/login" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>
            Sign In →
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-label {
          display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: #1E293B;
        }
        .auth-input {
          width: 100%; padding: 1rem 1.2rem; border-radius: 8px; border: 1px solid #CBD5E1; outline: none; color: #0F172A; font-size: 1rem; transition: border-color 0.2s, box-shadow 0.2s; background: white;
        }
        .auth-input:focus { border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2); }
        .auth-submit-btn {
          width: 100%; color: white; padding: 1rem; border: none; border-radius: 100px; font-weight: 600; font-size: 1.05rem; cursor: pointer; transition: background 0.2s;
        }
        .auth-submit-btn:hover:not(:disabled) { opacity: 0.9; }
        
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(-15deg); } 50% { transform: translateY(-20px) rotate(-15deg); } }
        @keyframes slideLeft { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .register-right-panel { display: none !important; }
          .register-left-panel { width: 100% !important; padding: 2rem !important; }
          .desktop-only-progress { display: none !important; }
          .mobile-only-header, .mobile-only-progress, .mobile-only-footer { display: block !important; }
        }
      `}} />
    </div>
  );
}
