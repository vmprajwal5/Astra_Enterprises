'use client';
import { useEffect } from 'react';

export default function FormStage({ isOpen, onClose, formType }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen && !formType) return null;

  return (
    <>
      <div className={`form-stage-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`form-stage-overlay ${isOpen ? 'open' : ''}`}>
        <button className="form-stage-close" onClick={onClose}>&times;</button>
        {formType === 'contractor' && (
          <div className="fs-contractor">
            <div className="fs-contractor-header">
              <h2>Work Order / Estimate</h2>
              <p>Astra Contracting Services</p>
            </div>
            <div style={{ padding: '2rem', position: 'relative' }}>
              <div className="fs-watermark">ESTIMATE</div>
              <div className="fs-contractor-row" style={{ transitionDelay: '0.2s' }}>
                <small>Date:</small> Oct 24, 2023 | <small>Job:</small> #1040
              </div>
              <div className="fs-contractor-row" style={{ transitionDelay: '0.3s' }}>
                <small>Client:</small> Sarah Jenkins - 123 Main St.
              </div>
              <div className="fs-contractor-row" style={{ transitionDelay: '0.4s' }}>
                <small>Desc:</small> Plumbing repair - Kitchen Sink Leak
              </div>
              <div className="fs-contractor-row" style={{ transitionDelay: '0.5s' }}>
                <small>Materials:</small> $145.00 | <small>Labor:</small> $200.00
              </div>
              <div className="fs-contractor-row" style={{ transitionDelay: '0.6s' }}>
                <strong>Total: $345.00</strong>
              </div>
              <div className="fs-copy-tabs">
                <div className="fs-copy-tab" style={{ background: '#FFFFFF', border: '1px solid #ddd' }}>White (Original)</div>
                <div className="fs-copy-tab" style={{ background: '#FFF9C4', border: '1px solid #ddd' }}>Yellow (Client)</div>
                <div className="fs-copy-tab" style={{ background: '#F8BBD0', border: '1px solid #ddd' }}>Pink (Office)</div>
              </div>
            </div>
          </div>
        )}
        {formType === 'salon' && (
          <div className="fs-salon">
            <div className="fs-salon-header shimmer">
              <h2 style={{ color: '#D81B60' }}>Client Intake & Consent</h2>
              <div className="fs-salon-floral">
                <svg viewBox="0 0 100 100" fill="none" stroke="#FFB3C1" strokeWidth="2">
                  <path d="M50 50 C 20 20, 20 80, 50 50 C 80 20, 80 80, 50 50 Z" />
                </svg>
              </div>
            </div>
            <div style={{ padding: '1rem 0' }}>
              <div className="fs-salon-field" style={{ transitionDelay: '0.2s' }}>Name: ______________________</div>
              <div className="fs-salon-field" style={{ transitionDelay: '0.3s' }}>Service: Hair Coloring & Balayage</div>
              <div className="fs-salon-field" style={{ transitionDelay: '0.4s' }}>Allergies: None known</div>
              <div className="fs-salon-field" style={{ transitionDelay: '0.5s' }}>
                <small>I consent to the chemical treatment...</small><br/>
                Signature: <em>Jane Doe</em>
              </div>
            </div>
          </div>
        )}
        {formType === 'retail' && (
          <div className="fs-retail">
            <div style={{ background: '#f4f4f4', padding: '1rem', textAlign: 'center', borderBottom: '2px dashed #ccc' }}>
              <strong>ASTRA BOUTIQUE</strong><br/>Receipt
            </div>
            <div className="fs-retail-body">
              <div className="fs-retail-row"><div className="fs-retail-row-inner" style={{ transitionDelay: '0.2s' }}>Item 1: Vintage Jacket ..... $45.00</div></div>
              <div className="fs-retail-row"><div className="fs-retail-row-inner" style={{ transitionDelay: '0.3s' }}>Item 2: Leather Belt ....... $22.00</div></div>
              <div className="fs-retail-row"><div className="fs-retail-row-inner" style={{ transitionDelay: '0.4s' }}>Tax: ....................... $3.35</div></div>
              <div className="fs-retail-row"><div className="fs-retail-row-inner" style={{ transitionDelay: '0.5s' }}><strong>TOTAL: ..................... $70.35</strong></div></div>
              <div className="fs-barcode">
                {[...Array(20)].map((_,i) => <span key={i} style={{ width: Math.random()*4+1+'px' }}></span>)}
              </div>
            </div>
          </div>
        )}
        {formType === 'freelancer' && (
          <div className="fs-freelancer">
            <div className="fs-freelancer-sidebar" />
            <div className="fs-freelancer-body">
              <div className="fs-freelancer-watermark">INVOICE</div>
              <h2 className="fs-freelancer-item" style={{ transitionDelay: '0.1s', borderBottom: '2px solid #0F766E', paddingBottom: '1rem' }}>INVOICE #2023-08</h2>
              <div style={{ marginTop: '2rem' }}>
                <div className="fs-freelancer-item" style={{ transitionDelay: '0.2s', marginBottom: '1rem' }}><strong>To:</strong> Acme Corp</div>
                <div className="fs-freelancer-item" style={{ transitionDelay: '0.3s', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                  <span>Website Design</span><span>$1,200.00</span>
                </div>
                <div className="fs-freelancer-item" style={{ transitionDelay: '0.4s', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                  <span>Logo Branding</span><span>$450.00</span>
                </div>
                <div className="fs-freelancer-item" style={{ transitionDelay: '0.5s', display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', fontWeight: 'bold' }}>
                  <span>Total Due</span><span>$1,650.00</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {formType === 'corporate' && (
          <div className="fs-corporate">
            <h2 className="fs-corporate-cell" style={{ transitionDelay: '0.1s', textAlign: 'center', marginBottom: '2rem' }}>PURCHASE ORDER</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className="fs-corporate-cell" style={{ transitionDelay: '0.2s', border: '1px solid #ccc', padding: '1rem' }}><strong>Vendor:</strong> SupplyCo Inc.</div>
              <div className="fs-corporate-cell" style={{ transitionDelay: '0.3s', border: '1px solid #ccc', padding: '1rem' }}><strong>PO #:</strong> 889021<br/><strong>Date:</strong> 10/24/23</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr className="fs-corporate-cell" style={{ transitionDelay: '0.4s', background: '#eee' }}>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Qty</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Item</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fs-corporate-cell" style={{ transitionDelay: '0.5s' }}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>500</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>NCR Books (3-part)</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>$850.00</td>
                </tr>
              </tbody>
            </table>
            <div style={{ position: 'relative', marginTop: '3rem' }}>
              <div className="fs-corporate-stamp">APPROVED</div>
              <div className="fs-signature-line">Auth. Signature</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
