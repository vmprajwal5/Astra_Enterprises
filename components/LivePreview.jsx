'use client';
import { useState, useEffect, useRef } from 'react';

export default function LivePreview() {
  const [theme, setTheme] = useState('navy');
  const [logoText, setLogoText] = useState('ASTRA.');
  const [tagline, setTagline] = useState('Quality Forms & Printing');
  const [address, setAddress] = useState('123 Business Rd.\nCity, State 12345');
  const [contact, setContact] = useState('(555) 123-4567');
  const [taxNumber, setTaxNumber] = useState('TAX: 12-3456789');
  
  const [activeField, setActiveField] = useState(null);
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);

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

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    setActiveField(field);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveField(null), 300);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoUploaded(true);
      setActiveField('logo-upload');
      setTimeout(() => setActiveField(null), 300);
    }
  };

  const themes = [
    { id: 'navy', color: '#0A192F' },
    { id: 'forest', color: '#1e4620' },
    { id: 'charcoal', color: '#333333' },
    { id: 'burgundy', color: '#800020' },
    { id: 'slate', color: '#708090' }
  ];

  const getFlashStyle = (field) => ({
    background: activeField === field ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
    transition: 'background 0.3s ease',
    borderRadius: '4px'
  });

  return (
    <section id="live-preview-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Live Form Preview</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          Customize the look and feel of your business stationery in real-time.
        </p>

        <div className="invoice-generator-layout">
          <div className={isVisible ? "invoice-controls anim-fade-left delay-3" : "invoice-controls"} style={{ opacity: isVisible ? 1 : 0 }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--navy)' }}>Customization Tools</h3>
            
            <div className="form-group">
              <label>Brand Theme Color</label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                {themes.map(t => (
                  <button
                    key={t.id}
                    className={`color-swatch-btn ${theme === t.id ? 'active' : ''}`}
                    style={{ backgroundColor: t.color }}
                    onClick={() => { setTheme(t.id); setActiveField('theme'); setTimeout(() => setActiveField(null), 300); }}
                    aria-label={`Select ${t.id} theme`}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Company Logo Name</label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => handleFieldChange('logoText', e.target.value, setLogoText)}
                maxLength={20}
                placeholder="Enter text..."
                className="standard-input"
              />
            </div>

            <div className="form-group">
              <label>Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => handleFieldChange('tagline', e.target.value, setTagline)}
                maxLength={40}
                placeholder="Quality Forms & Printing"
                className="standard-input"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                value={address}
                onChange={(e) => handleFieldChange('address', e.target.value, setAddress)}
                rows="2"
                placeholder="123 Business Rd."
                className="standard-input"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Contact Info</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => handleFieldChange('contact', e.target.value, setContact)}
                placeholder="(555) 123-4567"
                className="standard-input"
              />
            </div>

            <div className="form-group">
              <label>Tax / Registration Number</label>
              <input
                type="text"
                value={taxNumber}
                onChange={(e) => handleFieldChange('taxNumber', e.target.value, setTaxNumber)}
                placeholder="TAX: 12-3456789"
                className="standard-input"
              />
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Upload Logo Image</label>
              <div className={`logo-upload-area ${logoUploaded ? 'uploaded' : ''}`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
                />
                <div className="upload-content">
                  {logoUploaded ? (
                    <span className="upload-success-icon">✅ Logo Attached</span>
                  ) : (
                    <span>Click to upload image</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ flex: 1, minWidth: '150px' }}>Request This Design</button>
              <button className="btn btn-outline dl-pdf-btn" style={{ flex: 1, minWidth: '150px' }}>
                <span className="dl-icon">↓</span> Download PDF
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
              This is a live preview. Your actual forms can be 100% custom designed by our team at no extra cost.
            </p>
          </div>

          <div className={isVisible ? "invoice-preview-container anim-scale-in delay-4" : "invoice-preview-container"} style={{ opacity: isVisible ? 1 : 0, maxWidth: '100%', overflowX: 'auto', padding: '1rem' }}>
            <div className={`live-invoice-card theme-${theme} float-preview`}>
              <div className="inv-fold-line" />
              <div className="inv-page-indicator">Page 1 of 1</div>
              
              <div className="inv-header">
                <div className="inv-logo-area" style={getFlashStyle('logoText')}>
                  <div style={{...getFlashStyle('logo-upload'), padding: '4px'}}>
                    <strong style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>{logoText || 'LOGO'}</strong>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', ...getFlashStyle('tagline'), padding: '2px' }}>{tagline}</div>
                </div>
                <div className="inv-company-details">
                  <h3 style={getFlashStyle('theme')}>INVOICE</h3>
                  <p>
                    <span style={getFlashStyle('address')}>{address.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</span>
                    <span style={getFlashStyle('contact')}>{contact && <span>{contact}<br /></span>}</span>
                    <span style={getFlashStyle('taxNumber')}>{taxNumber && <span>{taxNumber}</span>}</span>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Bill To:</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--inv-text)' }}>John Client<br />456 Client Ave.</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Date:</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--inv-text)' }}>Oct 24, 2023</div>
                </div>
              </div>
              
              <table className="inv-dummy-table">
                <thead>
                  <tr style={getFlashStyle('theme')}>
                    <th>Description</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Custom Printing Services</td>
                    <td style={{ textAlign: 'right' }}>$150.00</td>
                  </tr>
                  <tr>
                    <td>Design Setup Fee</td>
                    <td style={{ textAlign: 'right' }}>$45.00</td>
                  </tr>
                  <tr style={{ borderTop: '2px solid var(--inv-accent)', ...getFlashStyle('theme') }}>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>$195.00</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Thank you for your business!
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .color-swatch-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          transform: scale(0.9);
        }
        .color-swatch-btn.active {
          transform: scale(1.3);
          box-shadow: 0 0 0 2px white, 0 0 0 4px var(--accent-orange);
          z-index: 2;
        }

        .dl-pdf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .dl-icon {
          display: inline-block;
          transition: transform 0.5s ease;
        }
        .dl-pdf-btn:hover .dl-icon {
          animation: rotateSlow 0.5s linear forwards;
        }

        .logo-upload-area {
          position: relative;
          border: 2px dashed #CBD5E1;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          background: #F8FAFC;
          color: #64748B;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .logo-upload-area:hover {
          animation: borderPulse 1s infinite;
          background: #F1F5F9;
        }
        .logo-upload-area.uploaded {
          border-color: #22C55E;
          background: rgba(34, 197, 94, 0.05);
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .upload-success-icon {
          color: #22C55E;
          font-weight: 600;
        }

        .float-preview {
          animation: floatPreview 3s ease-in-out infinite;
        }
        @keyframes floatPreview {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* Color transitions */
        .live-invoice-card {
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }
        .live-invoice-card h3, .inv-dummy-table th, .inv-dummy-table tr {
          transition: color 0.5s ease, border-color 0.5s ease;
        }
      `}} />
    </section>
  );
}
