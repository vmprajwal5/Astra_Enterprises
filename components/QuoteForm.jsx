'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', bizType: '', type: '', parts: '', qty: '', details: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || prev.name,
        email: user.email || prev.email,
        phone: profile.contact_number || prev.phone,
        company: profile.business_name || prev.company
      }));
    }
  }, [profile, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      const reference = 'QR-' + Date.now().toString().slice(-6);

      try {
        const { error } = await supabase.from('quotes').insert({
          user_id: user?.id || null,
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business_type: formData.bizType,
          product_needed: formData.type || 'Custom Forms',
          number_of_parts: formData.parts || '2',
          estimated_quantity: formData.qty || '100',
          additional_details: formData.details,
          reference_number: reference,
          status: 'Under Review'
        });

        if (error) {
          console.error('Error saving quote:', error);
          alert('Failed to submit quote request. Please try again.');
        } else {
          // Send Admin Notification
          await fetch('/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'admin@astrancr.co.uk',
              subject: `New Quote Request: ${reference}`,
              html: `<p>A new quote request has been received from <strong>${formData.name}</strong>.</p><p>Reference: ${reference}</p>`
            })
          });

          // Send User Confirmation
          if (formData.email) {
            await fetch('/api/email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: formData.email,
                subject: `Astra NCR - Quote Request Received (${reference})`,
                html: `<p>Hi ${formData.name},</p><p>We have received your quote request (Reference: ${reference}). Our design team will review it and get back to you shortly.</p>`
              })
            });
          }

          setSubmitted(true);
        }
      } catch(e) {
        console.error('Exception saving quote:', e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFileUploaded(true);
  };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFileUploaded(true);
  };

  if (!user) {
    return (
      <section id="quote" ref={sectionRef}>
        <div className="container">
          <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
            <span className="heading-reveal-text">Get a Custom Quote</span>
          </h2>
          <div className={`quote-wrapper ${isVisible ? 'anim-fade-up delay-2' : ''}`} style={{ opacity: 0, textAlign: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--navy-900)' }}>Sign In Required</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Please sign in or create a free account to submit a quote request.
            </p>
            <button className="btn btn-primary shimmer-btn" onClick={() => window.location.href='/login'}>Sign In / Create Account</button>
          </div>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="quote" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="quote-wrapper" style={{ textAlign: 'center', overflow: 'hidden' }}>
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  background: ['#FF6B35', '#FFB347', '#22C55E', '#0A192F'][Math.floor(Math.random() * 4)]
                }} />
              ))}
            </div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="section-title">Quote Request Received!</h2>
            <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
              Our design team is reviewing your requirements and will get back to you within 2 hours.
            </p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setFileUploaded(false); }}>
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  const progressPercent = ((step - 1) / 2) * 100;

  return (
    <section id="quote" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Get a Custom Quote</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          Fill out the details below and we'll get back to you with a competitive price.
        </p>

        <div className={`quote-wrapper ${isVisible ? 'anim-scale-in delay-3' : ''}`} style={{ opacity: 0 }}>
          
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-3)', borderRadius: '100px', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${progressPercent}%`, background: 'var(--orange-500)', transition: 'width 0.5s ease' }}></div>
          </div>

          <div className="quote-step-progress" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
            <div className={`quote-step-text ${step >= 1 ? 'active' : ''}`}>1. Contact</div>
            <div className={`quote-step-text ${step >= 2 ? 'active' : ''}`}>2. Specs</div>
            <div className={`quote-step-text ${step >= 3 ? 'active' : ''}`}>3. Details</div>
          </div>

          <form onSubmit={handleSubmit} className="quote-steps-container">
            <div style={{ overflow: 'hidden', width: '100%', padding: '0.5rem' }}>
              <div style={{ display: 'flex', transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: `translateX(-${(step - 1) * 100}%)` }}>
                
                {/* STEP 1 */}
                <div style={{ minWidth: '100%', paddingRight: '10px' }} className="quote-step-panel">
                  <h3 className="quote-step-title">Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group floating-label-group q-input-pulse">
                      <input type="text" id="name" required placeholder=" " value={formData.name} onChange={handleChange} />
                      <label htmlFor="name">Full Name <span>*</span></label>
                    </div>
                    <div className="form-group floating-label-group q-input-pulse">
                      <input type="email" id="email" required placeholder=" " value={formData.email} onChange={handleChange} />
                      <label htmlFor="email">Email Address <span>*</span></label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group floating-label-group q-input-pulse">
                      <input type="text" id="company" placeholder=" " value={formData.company} onChange={handleChange} />
                      <label htmlFor="company">Company Name</label>
                    </div>
                    <div className="form-group floating-label-group q-input-pulse">
                      <input type="tel" id="phone" placeholder=" " value={formData.phone} onChange={handleChange} />
                      <label htmlFor="phone">Phone Number</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group floating-label-group q-input-pulse">
                      <select id="bizType" value={formData.bizType} onChange={handleChange} style={{ appearance: 'none' }}>
                        <option value="" disabled></option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Salon">Salon / Spa</option>
                        <option value="Retail">Retail</option>
                        <option value="Other">Other</option>
                      </select>
                      <label htmlFor="bizType">Business Type</label>
                    </div>
                  </div>
                </div>

                {/* STEP 2 */}
                <div style={{ minWidth: '100%', paddingRight: '10px' }} className="quote-step-panel">
                  <h3 className="quote-step-title">Project Specifications</h3>
                  <div className="form-row">
                    <div className="form-group floating-label-group q-input-pulse">
                      <select id="type" required={step===2} value={formData.type} onChange={handleChange} style={{ appearance: 'none' }}>
                        <option value="" disabled></option>
                        <option value="Invoice">Invoice</option>
                        <option value="Estimate">Estimate</option>
                        <option value="Receipt">Receipt</option>
                        <option value="Bundle">Bundle (All 3)</option>
                      </select>
                      <label htmlFor="type">Product Type <span>*</span></label>
                    </div>
                    <div className="form-group floating-label-group q-input-pulse">
                      <select id="parts" required={step===2} value={formData.parts} onChange={handleChange} style={{ appearance: 'none' }}>
                        <option value="" disabled></option>
                        <option value="2">2-Part</option>
                        <option value="3">3-Part</option>
                        <option value="4">4-Part</option>
                      </select>
                      <label htmlFor="parts">NCR Parts <span>*</span></label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group floating-label-group q-input-pulse">
                      <input type="number" id="qty" required={step===2} placeholder=" " value={formData.qty} onChange={handleChange} />
                      <label htmlFor="qty">Estimated Quantity <span>*</span></label>
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div style={{ minWidth: '100%' }} className="quote-step-panel">
                  <h3 className="quote-step-title">Additional Details</h3>
                  <div className="form-group floating-label-group q-input-pulse">
                    <textarea id="details" placeholder=" " value={formData.details} onChange={handleChange}></textarea>
                    <label htmlFor="details">Project Details (Numbering, Drilling, Custom Sizes, etc.)</label>
                  </div>
                  <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label>Do you have a design file?</label>
                    <div 
                      className={`q-dropzone ${fileUploaded ? 'uploaded' : ''}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                    >
                      <input type="file" onChange={handleFileChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
                      <div style={{ position: 'relative', zIndex: 5 }}>
                        {fileUploaded ? (
                          <div style={{ color: '#22C55E', fontWeight: 'bold' }}>✓ File Attached Successfully</div>
                        ) : (
                          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                            Drag & Drop files here or <span style={{ color: 'var(--accent-orange)', textDecoration: 'underline' }}>Browse</span>
                          </p>
                        )}
                        {!fileUploaded && <small style={{ display: 'block', marginTop: '0.5rem', color: '#94a3b8' }}>Supports: PDF, AI, PSD, PNG, JPG</small>}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="quote-nav-buttons" style={{ marginTop: '2rem' }}>
              {step > 1 ? (
                <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              ) : <div />}
              
              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ position: 'relative', overflow: 'hidden' }}>
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                    Submitting...
                    <span className="paper-plane fly-away" style={{ display: 'inline-block' }}>✈️</span>
                  </span>
                ) : (
                  <span>
                    {step < 3 ? 'Next Step' : 'Submit Request '}
                    {step === 3 && <span className="paper-plane" style={{ display: 'inline-block' }}>✈️</span>}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .quote-step-text {
          font-weight: 600;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }
        .quote-step-text.active {
          color: var(--navy-900);
        }
        
        .q-input-pulse {
          border-radius: 8px;
          transition: box-shadow 0.3s ease;
        }
        .q-input-pulse:focus-within {
          animation: borderPulse 1.5s infinite;
        }
        
        .q-dropzone {
          position: relative;
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          background: #F8FAFC;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }
        .q-dropzone:hover {
          background: #F1F5F9;
        }
        .q-dropzone.uploaded {
          border-color: #22C55E;
          background: rgba(34, 197, 94, 0.05);
        }

        .paper-plane {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease;
        }
        .paper-plane.fly-away {
          transform: translate(200px, -200px) rotate(45deg);
          opacity: 0;
        }

        .shimmer-btn {
          position: relative;
          overflow: hidden;
          background-size: 200% auto;
          background-image: linear-gradient(135deg, var(--accent-orange) 0%, #FF8C42 40%, #FFE0D1 50%, #FF8C42 60%, var(--accent-orange) 100%);
          animation: shimmer 3s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
