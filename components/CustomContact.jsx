'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';

export default function CustomContact() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.message || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id.replace('c_', '')]: e.target.value });
    if (errors[e.target.id.replace('c_', '')]) {
      setErrors({ ...errors, [e.target.id.replace('c_', '')]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStatus('loading');
    
    try {
      const { error } = await supabase.from('messages').insert({
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        status: 'Unread'
      });

      if (error) {
        console.error('Failed to save message', error);
        setStatus('error');
      } else {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'admin@astrancr.co.uk',
            subject: 'New Contact Form Submission',
            html: `<p>You have a new message from <strong>${formData.name}</strong> (${formData.email}):</p><p>${formData.message}</p>`
          })
        });
        setStatus('success');
      }
    } catch (err) {
      console.error('Exception saving message', err);
      setStatus('error');
    }
  };

  const contactCards = [
    { icon: '📧', title: 'Email Us', desc: 'support@astrancr.com', delay: 1 },
    { icon: '📞', title: 'Call Us', desc: '(555) 123-4567', delay: 2 },
    { icon: '🏢', title: 'Headquarters', desc: '123 Print Ave, New York', delay: 3 }
  ];

  return (
    <section id="custom-contact" ref={sectionRef} style={{ padding: '6rem 5%', background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
            <span className="heading-reveal-text">Need Something Completely Custom?</span>
          </h2>
          <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
            Our design team can build complex forms, logbooks, and custom stationery from scratch.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left: Contact Info Block */}
          <div className="contact-info-block">
            {contactCards.map((card, i) => (
              <div 
                key={i} 
                className={`contact-info-card ${isVisible ? `anim-fade-left delay-${card.delay}` : ''}`} 
                style={{ opacity: 0 }}
              >
                <div className="contact-card-icon">{card.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: 'var(--navy-900)' }}>{card.title}</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div className={`contact-form-wrapper ${isVisible ? 'anim-fade-right delay-2' : ''}`} style={{ opacity: 0, position: 'relative' }}>
            
            {status === 'loading' && (
              <div className="form-overlay-loader">
                <div className="spinner"></div>
                <div style={{ marginTop: '1rem', fontWeight: '600', color: 'var(--navy-900)' }}>Sending Message...</div>
              </div>
            )}

            {status === 'success' ? (
              <div className="custom-contact-success anim-fade-up">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ background: '#DCFCE7', color: '#16A34A', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✓</div>
                  <h3 style={{ margin: 0, color: '#1A202C', fontSize: '1.4rem' }}>Message Sent!</h3>
                </div>
                <p style={{ color: '#4A5568', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thanks <strong>{formData.name}</strong>, we'll get back to you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button className="btn btn-outline" onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="custom-form-card" style={{ opacity: status === 'loading' ? 0.5 : 1, pointerEvents: status === 'loading' ? 'none' : 'auto' }}>
                <div className="form-row">
                  <div className="form-group floating-label-group input-focus-glow">
                    <input type="text" id="c_name" value={formData.name} onChange={handleChange} placeholder=" " style={{ borderColor: errors.name ? '#E53E3E' : '' }} />
                    <label htmlFor="c_name">Name</label>
                    {errors.name && <div className="error-text anim-fade-up" style={{ color: '#E53E3E', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</div>}
                  </div>
                  <div className="form-group floating-label-group input-focus-glow">
                    <input type="email" id="c_email" value={formData.email} onChange={handleChange} placeholder=" " style={{ borderColor: errors.email ? '#E53E3E' : '' }} />
                    <label htmlFor="c_email">Email</label>
                    {errors.email && <div className="error-text anim-fade-up" style={{ color: '#E53E3E', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                </div>
                <div className="form-group floating-label-group input-focus-glow">
                  <textarea id="c_message" value={formData.message} onChange={handleChange} placeholder=" " style={{ minHeight: '150px', borderColor: errors.message ? '#E53E3E' : '' }}></textarea>
                  <label htmlFor="c_message">Describe your custom project requirements...</label>
                  {errors.message && <div className="error-text anim-fade-up" style={{ color: '#E53E3E', fontSize: '0.8rem', marginTop: '4px' }}>{errors.message}</div>}
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary shimmer-submit" 
                  style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontWeight: 'bold' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: flex-start;
        }

        .contact-info-block {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        .contact-info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .contact-card-icon {
          font-size: 2rem;
          background: var(--surface-3);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .contact-form-wrapper {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .input-focus-glow:focus-within input,
        .input-focus-glow:focus-within textarea {
          border-color: var(--accent-orange) !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
        }

        .shimmer-submit {
          position: relative;
          overflow: hidden;
          background-image: linear-gradient(135deg, var(--accent-orange) 0%, #FF8C42 40%, #FFE0D1 50%, #FF8C42 60%, var(--accent-orange) 100%);
          background-size: 200% auto;
          transition: transform 0.3s ease;
        }
        .shimmer-submit:hover {
          animation: shimmer 3s linear infinite;
          transform: scale(1.02);
        }

        .form-overlay-loader {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.9);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--surface-3);
          border-top-color: var(--accent-orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
