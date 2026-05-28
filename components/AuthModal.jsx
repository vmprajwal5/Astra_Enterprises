'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('register'); // 'register' or 'login'
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Register Form State
  const [regData, setRegData] = useState({
    name: '', email: '', phoneCode: '+1', phone: '', country: 'United States',
    bizName: '', salesCount: 'Less than 100', source: 'Google Search',
    password: '', confirmPassword: '', agree: false
  });

  // Login Form State
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [forgotStep, setForgotStep] = useState(0);
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setShowConfetti(false);
        setWelcomeName('');
        setForgotStep(0);
        setForgotEmail('');
        setErrorMsg('');
      }, 500);
    }
  }, [isOpen]);

  const handleRegChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRegData({ ...regData, [e.target.name]: value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (regData.password !== regData.confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      }
      if (!regData.agree) {
        setErrorMsg("You must agree to terms");
        return;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email: regData.email,
        password: regData.password,
        options: {
          data: { full_name: regData.name }
        }
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: regData.name,
          business_name: regData.bizName,
          country: regData.country,
          contact_number: `${regData.phoneCode} ${regData.phone}`,
          sales_count: regData.salesCount,
          discovery_source: regData.source,
          role: 'user'
        });

      if (profileError) {
        setErrorMsg('Failed to create profile.');
        return;
      }
      
      setWelcomeName(regData.name.split(' ')[0]);
      setShowConfetti(true);

      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    });

    if (error) {
      setErrorMsg('Invalid email or password');
      return;
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="auth-backdrop open" onClick={onClose} />
      <div className="auth-modal open">
        <button className="auth-close" onClick={onClose}>&times;</button>
        
        {showConfetti ? (
          <div className="auth-success">
            <div className="confetti-container">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  background: ['#FF6B35', '#22C55E', '#FFB347'][Math.floor(Math.random() * 3)]
                }} />
              ))}
            </div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ color: 'var(--primary-navy)' }}>Welcome to Astra NCR, {welcomeName}!</h2>
            <p>Your account is ready.</p>
          </div>
        ) : (
          <>
            <div className="auth-tabs">
              <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Create Account</button>
              <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Sign In</button>
            </div>

            <div className="auth-content">
              {errorMsg && <div style={{ color: 'var(--error, red)', marginBottom: '1rem', fontSize: '0.9rem' }}>{errorMsg}</div>}
              {tab === 'register' && (
                <form onSubmit={handleRegisterSubmit}>
                  {step === 1 && (
                    <div className="auth-step animate-fade-left">
                      <h3>Step 1: About You</h3>
                      <div className="form-group floating-label-group">
                        <input type="text" id="r_name" name="name" required placeholder=" " value={regData.name} onChange={handleRegChange} />
                        <label htmlFor="r_name">Full Name *</label>
                      </div>
                      <div className="form-group floating-label-group">
                        <input type="email" id="r_email" name="email" required placeholder=" " value={regData.email} onChange={handleRegChange} />
                        <label htmlFor="r_email">Email Address *</label>
                      </div>
                      <div className="form-group" style={{ display: 'flex', gap: '0.5rem' }}>
                        <select name="phoneCode" value={regData.phoneCode} onChange={handleRegChange} style={{ width: '80px', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                        </select>
                        <div className="floating-label-group" style={{ flex: 1 }}>
                          <input type="tel" id="r_phone" name="phone" required placeholder=" " value={regData.phone} onChange={handleRegChange} />
                          <label htmlFor="r_phone">Contact Number *</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Country</label>
                        <select name="country" value={regData.country} onChange={handleRegChange} className="standard-select">
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="India">India</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="auth-step animate-fade-left">
                      <h3>Step 2: Your Business</h3>
                      <div className="form-group floating-label-group">
                        <input type="text" id="r_biz" name="bizName" required placeholder=" " value={regData.bizName} onChange={handleRegChange} />
                        <label htmlFor="r_biz">Business Name *</label>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>How many NCR sets do you sell per year?</label>
                        <select name="salesCount" value={regData.salesCount} onChange={handleRegChange} className="standard-select">
                          <option value="Less than 100">Less than 100</option>
                          <option value="100–500">100–500</option>
                          <option value="500–2000">500–2000</option>
                          <option value="2000–5000">2000–5000</option>
                          <option value="5000+">5000+</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>How did you find us?</label>
                        <select name="source" value={regData.source} onChange={handleRegChange} className="standard-select">
                          <option value="Google Search">Google Search</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Facebook">Facebook</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Word of Mouth">Word of Mouth</option>
                          <option value="Referred by a Client">Referred by a Client</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="auth-step animate-fade-left">
                      <h3>Step 3: Set Password</h3>
                      <div className="form-group floating-label-group" style={{ position: 'relative' }}>
                        <input type={showPass ? "text" : "password"} id="r_pass" name="password" minLength="8" required placeholder=" " value={regData.password} onChange={handleRegChange} />
                        <label htmlFor="r_pass">Password (min 8 chars) *</label>
                        <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                          {showPass ? '👁️‍🗨️' : '👁️'}
                        </button>
                      </div>
                      <div className="form-group floating-label-group" style={{ position: 'relative' }}>
                        <input type={showPass ? "text" : "password"} id="r_cpass" name="confirmPassword" required placeholder=" " value={regData.confirmPassword} onChange={handleRegChange} />
                        <label htmlFor="r_cpass">Confirm Password *</label>
                      </div>
                      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <input type="checkbox" id="r_agree" name="agree" checked={regData.agree} onChange={handleRegChange} />
                        <label htmlFor="r_agree" style={{ fontSize: '0.85rem' }}>I agree to the Terms & Conditions and Privacy Policy</label>
                      </div>
                    </div>
                  )}

                  <div className="auth-nav-buttons">
                    {step > 1 ? (
                      <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>
                    ) : <div />}
                    <button type="submit" className="btn btn-primary">
                      {step < 3 ? 'Next Step' : 'Create My Account'}
                    </button>
                  </div>
                </form>
              )}

              {tab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="animate-fade-left">
                  <div className="form-group floating-label-group">
                    <input type="email" id="l_email" name="email" required placeholder=" " value={loginData.email} onChange={handleLoginChange} />
                    <label htmlFor="l_email">Email Address</label>
                  </div>
                  <div className="form-group floating-label-group" style={{ position: 'relative' }}>
                    <input type={showPass ? "text" : "password"} id="l_pass" name="password" required placeholder=" " value={loginData.password} onChange={handleLoginChange} />
                    <label htmlFor="l_pass">Password</label>
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                      {showPass ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                  
                  {forgotStep === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                      <button type="button" className="text-link" onClick={() => setForgotStep(1)} style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Forgot Password?
                      </button>
                    </div>
                  ) : forgotStep === 1 ? (
                    <div style={{ marginBottom: '1.5rem', background: 'var(--surface-2)', padding: '1rem', borderRadius: '4px' }}>
                      <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Enter your email to reset password:</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} className="standard-input" style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} placeholder="Email address" />
                        <button type="button" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '4px' }} onClick={() => setForgotStep(2)}>Send</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Reset link sent to {forgotEmail || 'your email'}!</span>
                    </div>
                  )}
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
