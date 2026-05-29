'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useCurrency } from '@/lib/CurrencyContext';

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { convert } = useCurrency();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data) setProducts(data);
    }
    loadProducts();

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

  const [products, setProducts] = useState([]);

  const staticProducts = [
    {
      name: 'Blank NCR Sheets',
      basePriceGBP: 15,
      description: 'Pre-collated carbonless sets ready for your own printing press or handwriting.',
      features: ['2, 3 or 4-part sets', 'White / Yellow / Pink paper', 'Standard A4 & A5 sizes', 'Ideal for tradespeople'],
    },
    {
      name: 'Custom Printed NCR',
      basePriceGBP: 45,
      description: 'Fully custom-designed NCR forms with your logo, branding, and layout.',
      features: ['Full-colour or black ink', 'Logo & branding included', 'Sequential numbering', 'Padded & loose options'],
    },
    {
      name: 'Digital Templates',
      basePriceGBP: 10,
      description: 'Ready-to-use digital invoice and receipt templates for contractors and salons.',
      features: ['Instant download', 'Easily editable', 'Professionally designed', 'Industry specific'],
    }
  ];

  const displayProducts = products.length > 0
    ? products.map(p => ({ ...p, basePriceGBP: p.price_gbp || 15 }))
    : staticProducts;

  return (
    <section id="products" ref={sectionRef} style={{ padding: '6rem 5%' }}>
      <div className="container">
        <h2 className={`section-title heading-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="heading-reveal-text">Our Products</span>
        </h2>
        <p className={isVisible ? "section-subtitle anim-fade-up delay-3" : "section-subtitle"} style={{ opacity: isVisible ? 1 : 0 }}>
          From raw materials to finished custom stationery.
        </p>

        <div className="product-grid">
          {displayProducts.map((product, i) => {
            const cssId = product.name.toLowerCase().includes('blank') ? 'blank-ncr' 
                        : product.name.toLowerCase().includes('digital') ? 'digital-ncr' 
                        : 'custom-ncr';
            
            return (
            <div key={i} className={`product-card ${isVisible ? `anim-scale-in delay-${i + 1}` : ''}`} style={{ opacity: 0 }}>
              <div className="card-top-edge"></div>
              <div className="card-shine"></div>
              
              <div className="product-img-css-wrapper">
                <div className="css-illus-wrapper">
                  {cssId === 'blank-ncr' && (
                    <div className="css-illus-blank" style={{ height: '180px', background: '#F4F7FA', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'relative', width: '120px', height: '140px' }}>
                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '100px', height: '120px', background: '#FCE4EC', border: '1px solid #F48FB1', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}></div>
                        <div style={{ position: 'absolute', top: '5px', left: '5px', width: '100px', height: '120px', background: '#FFF9C4', border: '1px solid #FFF59D', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}></div>
                        <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '100px', height: '120px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#E2E8F0', fontWeight: 'bold', fontSize: '1.5rem', transform: 'rotate(-45deg)' }}>NCR</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {cssId === 'custom-ncr' && (
                    <div className="css-illus-custom" style={{ height: '180px', background: '#EEF2FF', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'relative', width: '120px', height: '140px' }}>
                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '100px', height: '120px', background: '#FCE4EC', border: '1px solid #F48FB1' }}></div>
                        <div style={{ position: 'absolute', top: '5px', left: '5px', width: '100px', height: '120px', background: '#FFF9C4', border: '1px solid #FFF59D' }}></div>
                        <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '100px', height: '120px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                          <div style={{ height: '15px', background: '#0A192F', display: 'flex', alignItems: 'center', paddingLeft: '5px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B35' }}></div>
                          </div>
                          <div style={{ padding: '8px' }}>
                            <div style={{ height: '4px', width: '60%', background: '#CBD5E1', marginBottom: '6px' }}></div>
                            <div style={{ height: '4px', width: '80%', background: '#E2E8F0', marginBottom: '6px' }}></div>
                            <div style={{ height: '4px', width: '40%', background: '#E2E8F0' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cssId === 'digital-ncr' && (
                    <div className="css-illus-digital" style={{ height: '180px', background: '#F0F9FF', borderRadius: '8px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '120px', height: '80px', border: '3px solid #0A192F', borderRadius: '6px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ width: '30px', height: '40px', background: 'white', border: '1px dashed #94A3B8', padding: '4px' }}>
                          <div style={{ height: '2px', background: '#94A3B8', marginBottom: '2px' }}></div>
                          <div style={{ height: '2px', background: '#94A3B8', marginBottom: '2px', width: '80%' }}></div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '12px', background: '#0A192F', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}></div>
                      </div>
                      <div style={{ marginTop: '20px', color: '#0A192F', fontSize: '1.2rem', fontWeight: 'bold' }}>&darr;</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="product-content">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price-display">
                  <div className="product-price-from">From</div>
                  <div className="product-price-main">
                    {convert(product.basePriceGBP || 15)}
                  </div>
                </div>
                <p className="product-desc">{product.description}</p>
                <ul className="product-features">
                  {product.features?.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="card-cta-wrapper">
                <button className="btn p-cta-btn">Configure &rarr;</button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
          position: relative;
        }
        
        .card-top-edge {
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: var(--orange-500);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s ease;
          z-index: 2;
        }
        .card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);
          background-size: 200%;
          z-index: 3;
          opacity: 0;
          pointer-events: none;
        }
        
        .product-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        }
        .product-card:hover .card-top-edge {
          transform: scaleX(1);
        }
        .product-card:hover .card-shine {
          opacity: 1;
          animation: shimmer 0.6s ease forwards;
        }

        .product-img-css-wrapper {
          padding: 1.5rem;
          border-bottom: 1px solid var(--surface-2);
        }
        .css-illus-wrapper {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .product-card:hover .css-illus-wrapper {
          transform: scale(1.05);
        }

        .product-content {
          padding: 1.5rem;
        }
        .product-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--navy-900);
          margin-bottom: 0.8rem;
          flex: 1;
          padding-right: 1rem;
        }
        .p-price-badge {
          background: var(--surface-3);
          color: var(--navy-900);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .product-card:hover .p-price-badge {
          transform: scale(1.08);
          background: var(--orange-500);
          color: white;
        }

        .product-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }
        .product-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }
        .product-features li {
          font-size: 0.85rem;
          color: var(--navy-700);
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          font-weight: 500;
        }

        .card-cta-wrapper {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
        }
        .p-cta-btn {
          width: 100%;
          background: var(--orange-500);
          color: white;
          padding: 0.8rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .product-card:hover .p-cta-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .product-price-display {
          margin-bottom: 0.8rem;
        }
        .product-price-from {
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .product-price-main {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FF6B35;
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          flex-wrap: wrap;
        }
        .price-gbp {
          font-size: 1.35rem;
          color: #FF6B35;
        }
        .price-sep {
          color: #CBD5E1;
          font-weight: 400;
        }
        .price-usd, .price-inr {
          font-size: 1.05rem;
          color: #0A192F;
        }
      `}} />
    </section>
  );
}
