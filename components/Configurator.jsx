'use client';
import { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ options, value, onChange, name }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="custom-select-container" ref={ref}>
      <div className={`custom-select-header ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div className="cs-val-label">{selected.label}</div>
          <div className="cs-val-sub">{selected.sub}</div>
        </div>
        <div className="cs-arrow">▼</div>
      </div>
      {open && (
        <div className="custom-select-menu anim-fade-up" style={{ animationDuration: '0.2s' }}>
          {options.map(o => (
            <div 
              key={o.value} 
              className={`custom-select-item ${value === o.value ? 'selected' : ''}`} 
              onClick={() => { onChange({ target: { name, value: o.value } }); setOpen(false); }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="cs-opt-label">{o.label}</div>
                {o.badge && <div className="select-bundle-badge">{o.badge}</div>}
              </div>
              <div className="cs-opt-sub">{o.sub}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Configurator() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [config, setConfig] = useState({
    formType: 'invoice',
    paperSize: 'a4',
    bindingStyle: 'loose',
    parts: '2',
    numbering: 'yes',
    quantity: '500',
    paperColor: 'white_yellow',
    printSide: 'single',
    marginStyle: 'standard',
    inkColor: 'black'
  });
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [pulse, setPulse] = useState(false);

  const paperSizeOptions = [
    { value: 'a4', label: 'A4', sub: '210 × 297mm' },
    { value: 'a5', label: 'A5', sub: '148 × 210mm' },
    { value: 'letter', label: 'US Letter', sub: '8.5 × 11in' },
    { value: 'half_letter', label: 'Half US Letter', sub: '5.5 × 8.5in' },
    { value: 'receipt', label: 'Receipt', sub: '80mm × Custom Length' }
  ];

  const bindingOptions = [
    { value: 'loose', label: 'Loose', sub: 'Individual sheets, no binding' },
    { value: 'padded_back', label: 'Padded at Back with Cardboard', sub: 'Glued at top, rigid cardboard backing' },
    { value: 'padded_wrap', label: 'Padded with Wrap Around', sub: 'Glued at top, full wrap-around card cover' }
  ];

  const formTypeOptions = [
    { value: 'invoice', label: 'Invoice', sub: 'Standard billing document' },
    { value: 'estimate', label: 'Estimate / Quotation', sub: 'Pre-job pricing document' },
    { value: 'receipt', label: 'Receipt', sub: 'Proof of payment' },
    { value: 'bundle', label: 'Bundle — Invoice + Estimate + Receipt', sub: 'Get all 3 form types printed together.', badge: '⭐ BEST VALUE' }
  ];

  const paperColorOptions = [
    { value: 'white_yellow', label: 'White / Yellow', sub: 'Standard 2-part sequence' },
    { value: 'white_yellow_pink', label: 'White / Yellow / Pink', sub: 'Standard 3-part sequence' },
    { value: 'custom', label: 'Custom Sequence', sub: 'Specify in notes at checkout' }
  ];

  const printSideOptions = [
    { value: 'single', label: 'Single-sided', sub: 'Front printing only' },
    { value: 'double', label: 'Double-sided', sub: 'T&Cs printed on reverse' }
  ];

  const marginStyleOptions = [
    { value: 'standard', label: 'Standard Edge', sub: 'Glued on top edge' },
    { value: 'perforated', label: 'Perforated Stub', sub: 'Tear-out margin for books' }
  ];

  const inkColorOptions = [
    { value: 'black', label: 'Black Ink', sub: 'Economical standard' },
    { value: 'blue', label: 'Blue Ink', sub: 'Standard blue' },
    { value: 'full_color', label: 'Full Color', sub: 'CMYK printing' }
  ];

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

  const calculatePrice = (cfg) => {
    // Base price by form type
    const formTypePrices = {
      'invoice': 45,
      'estimate': 45,
      'receipt': 35,
      'bundle': 120
    };
    let basePrice = formTypePrices[cfg.formType?.toLowerCase()] || 45;

    // Multiply by parts
    const partMultiplier = { '2': 1, '3': 1.4, '4': 1.8 };
    basePrice *= (partMultiplier[cfg.parts] || 1);

    // Multiply by quantity
    const qtyMultiplier = {
      '100': 1, '250': 2.2, '500': 4,
      '1000': 7.5, '2000': 14, '5000': 32
    };
    basePrice *= (qtyMultiplier[cfg.quantity] || 1);

    // Paper size adjustment
    if (cfg.paperSize === 'a4' || cfg.paperSize === 'letter') {
      basePrice *= 1;
    } else if (cfg.paperSize === 'a5' || cfg.paperSize === 'half_letter') {
      basePrice *= 0.75;
    } else if (cfg.paperSize === 'receipt') {
      basePrice *= 0.6;
    }

    // Binding adjustment
    if (cfg.bindingStyle === 'padded_wrap') basePrice *= 1.2;
    else if (cfg.bindingStyle === 'padded_back') basePrice *= 1.1;

    // Bundle discount 15%
    if (cfg.formType?.toLowerCase() === 'bundle') {
      basePrice *= 0.85;
    }

    return Math.round(basePrice);
  };

  useEffect(() => {
    const orig = calculatePrice({ ...config, formType: config.formType === 'bundle' ? 'bundle_pre' : config.formType });
    const finalPrice = calculatePrice(config);
    setOriginalPrice(config.formType === 'bundle' ? Math.round(finalPrice / 0.85) : finalPrice);
    setPrice(finalPrice);

    setPulse(true);
    const t = setTimeout(() => setPulse(false), 400);
    return () => clearTimeout(t);
  }, [config]);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const getBindingIcon = () => {
    if (config.bindingStyle === 'loose') return '📄';
    if (config.bindingStyle === 'padded_back') return '📋';
    return '📓';
  };

  const completedSteps = Object.values(config).filter(v => v).length;
  const progressPercent = (completedSteps / 10) * 100;

  return (
    <section id="configurator" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Build Your Custom Order</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-2" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          Select your specifications to see live pricing.
        </p>
        
        <div className={`config-progress-bar-wrapper ${isVisible ? 'anim-fade-up delay-3' : ''}`} style={{ width: '100%', height: '8px', background: 'var(--surface-3)', borderRadius: '4px', marginBottom: '3rem', opacity: isVisible ? 1 : 0, overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--orange-500)', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
        </div>

        <div className="configurator-layout">
          <div className="config-options-panel">
            
            <div className="config-group" style={{ gridColumn: '1 / -1' }}>
              <label>Form Type</label>
              <CustomSelect name="formType" value={config.formType} onChange={handleChange} options={formTypeOptions} />
            </div>

            <div className="config-group">
              <label>Paper Size</label>
              <CustomSelect name="paperSize" value={config.paperSize} onChange={handleChange} options={paperSizeOptions} />
            </div>

            <div className="config-group">
              <label>Binding Style</label>
              <CustomSelect name="bindingStyle" value={config.bindingStyle} onChange={handleChange} options={bindingOptions} />
            </div>

            <div className="config-group">
              <label>NCR Parts (Copies)</label>
              <select name="parts" value={config.parts} onChange={handleChange} className="standard-select">
                <option value="2">2-Part (White/Yellow)</option>
                <option value="3">3-Part (White/Yellow/Pink)</option>
                <option value="4">4-Part (Wht/Yel/Pnk/Gld)</option>
              </select>
            </div>
            
            <div className="config-group">
              <label>Sequential Numbering</label>
              <select name="numbering" value={config.numbering} onChange={handleChange} className="standard-select">
                <option value="yes">Yes, include numbering</option>
                <option value="no">No, blank</option>
              </select>
            </div>

            <div className="config-group">
              <label>Paper Colour Sequence</label>
              <CustomSelect name="paperColor" value={config.paperColor} onChange={handleChange} options={paperColorOptions} />
            </div>

            <div className="config-group">
              <label>Print Side</label>
              <CustomSelect name="printSide" value={config.printSide} onChange={handleChange} options={printSideOptions} />
            </div>

            <div className="config-group">
              <label>Margin Style</label>
              <CustomSelect name="marginStyle" value={config.marginStyle} onChange={handleChange} options={marginStyleOptions} />
            </div>

            <div className="config-group">
              <label>Ink Colour</label>
              <CustomSelect name="inkColor" value={config.inkColor} onChange={handleChange} options={inkColorOptions} />
            </div>
            
            <div className="config-group" style={{ gridColumn: '1 / -1' }}>
              <label>Quantity (Total Sets)</label>
              <select name="quantity" value={config.quantity} onChange={handleChange} className="standard-select">
                <option value="100">100 Sets</option>
                <option value="250">250 Sets</option>
                <option value="500">500 Sets</option>
                <option value="1000">1,000 Sets</option>
                <option value="2000">2,000 Sets</option>
                <option value="5000">5,000 Sets</option>
              </select>
            </div>

            <div className="config-option-chips" style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {Object.entries(config).map(([k, v]) => (
                <div key={v} className="config-chip anim-scale-in" style={{ background: 'var(--surface-2)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.8rem', border: '1px solid var(--border)', textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
                  {k.replace(/([A-Z])/g, ' $1')}: <strong style={{color: 'var(--navy)'}}>{v.replace(/_/g, ' ')}</strong>
                </div>
              ))}
            </div>

          </div>
          
          <div className={`config-summary-panel ${pulse ? 'pulse-anim' : ''}`}>
            <h3>Order Summary</h3>
            <div className="paper-stack">
              <div className="paper-layer" style={{ background: '#FFF', top: '0', zIndex: 4, left: '-5px' }}></div>
              <div className="paper-layer" style={{ background: '#FFF9C4', top: '10px', zIndex: 3, left: '0px' }}></div>
              {config.parts >= '3' && <div key="p3" className="paper-layer" style={{ background: '#F8BBD0', top: '20px', zIndex: 2, left: '5px', animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}></div>}
              {config.parts === '4' && <div key="p4" className="paper-layer" style={{ background: '#FFE0B2', top: '30px', zIndex: 1, left: '10px', animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}></div>}
            </div>
            <ul id="cfg-summary-list">
              <li>Type: <span>{formTypeOptions.find(o => o.value === config.formType)?.label}</span></li>
              <li>Size: <span>{paperSizeOptions.find(o => o.value === config.paperSize)?.label}</span></li>
              <li>Binding: <span>{getBindingIcon()} {bindingOptions.find(o => o.value === config.bindingStyle)?.label}</span></li>
              <li>Parts: <span>{config.parts}-Part NCR</span></li>
              <li>Numbering: <span>{config.numbering === 'yes' ? 'Included' : 'None'}</span></li>
              <li>Quantity: <span>{config.quantity} sets</span></li>
            </ul>
            
            {config.paperSize === 'receipt' && (
              <div className="summary-note">
                <strong>Note:</strong> Receipt rolls available in 57mm and 80mm widths.
              </div>
            )}
            
            {config.formType === 'bundle' && (
              <div className="summary-note" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                ⭐ Bundle selected! 15% discount applied.
              </div>
            )}

            <div className="live-price-box">
              <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>Estimated Total</div>
              {config.formType === 'bundle' && (
                <div style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#94A3B8', textAlign: 'center', marginBottom: '4px' }}>
                  Was: ${originalPrice.toLocaleString()}
                </div>
              )}
              <div key={price} style={{ fontSize: '2.4rem', fontWeight: 'bold', color: config.formType === 'bundle' ? 'var(--success)' : 'var(--accent-gold)', animation: 'countUp 0.3s ease-out forwards', textAlign: 'center' }}>
                ${price.toLocaleString()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#94A3B8', flexWrap: 'wrap' }}>
                <span>£{Math.round(price * 0.79).toLocaleString()}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>₹{Math.round(price * 83).toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', textAlign: 'center', marginTop: '0.4rem' }}>USD · GBP · INR — indicative pricing</div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Proceed to Quote</button>
            <div className="config-tag-chips">
              <span className="config-tag">✨ High Quality</span>
              <span className="config-tag">🚚 Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-select-container {
          position: relative;
          width: 100%;
        }
        .custom-select-header {
          padding: 0.8rem 1rem;
          border: 1px solid var(--gray-light, #E2E8F0);
          border-radius: var(--radius-pill, 100px);
          background-color: #F8FAFC;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        .custom-select-header:hover, .custom-select-header.open, .standard-select:focus, .standard-select:hover {
          border-color: var(--accent-orange, #FF6B35);
          background-color: var(--white, #fff);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
        }
        .standard-select {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid var(--gray-light, #E2E8F0);
          border-radius: var(--radius-pill, 100px);
          background-color: #F8FAFC;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
        }
        .cs-val-label {
          font-weight: 600;
          color: var(--navy, #0A192F);
          font-size: 0.95rem;
        }
        .cs-val-sub {
          font-size: 0.75rem;
          color: var(--text-muted, #64748B);
          margin-top: 2px;
        }
        .cs-arrow {
          color: var(--text-muted);
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }
        .custom-select-header.open .cs-arrow {
          transform: rotate(180deg);
        }
        .custom-select-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 100%;
          background: var(--white, #fff);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid var(--gray-light, #E2E8F0);
          z-index: 100;
          overflow: hidden;
          max-height: 350px;
          overflow-y: auto;
        }
        .custom-select-item {
          padding: 0.8rem 1rem;
          cursor: pointer;
          border-bottom: 1px solid var(--gray-light, #E2E8F0);
          transition: background 0.2s ease;
        }
        .custom-select-item:last-child {
          border-bottom: none;
        }
        .custom-select-item:hover, .custom-select-item.selected {
          background: #F8FAFC;
        }
        .cs-opt-label {
          font-weight: 600;
          color: var(--navy, #0A192F);
          font-size: 0.9rem;
        }
        .cs-opt-sub {
          font-size: 0.75rem;
          color: var(--text-muted, #64748B);
          margin-top: 2px;
        }
        .select-bundle-badge {
          background: var(--success, #22C55E);
          color: white;
          font-size: 0.6rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
        }
        .config-summary-panel {
          transition: box-shadow 0.4s ease;
          border-radius: 12px;
        }
        .config-summary-panel.pulse-anim {
          box-shadow: 0 0 0 8px rgba(255,107,53,0.3);
        }
      `}} />
    </section>
  );
}
