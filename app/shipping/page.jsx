import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping & Delivery | Astra NCR',
  description: 'Shipping timelines and delivery information for Astra NCR orders.',
};

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#FF6B35', fontWeight: '500', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>
          
          <h1 style={{ color: '#0A192F', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Shipping & Delivery</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '3rem' }}>Last updated: January 2024</p>
          
          <div style={{ color: '#334155', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Production Timeline</h2>
            <p style={{ marginBottom: '1.5rem' }}>Our standard production process takes 3–5 business days from the moment your final artwork proof is approved and payment is processed.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Shipping by Region</h2>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>India:</strong> 2–4 days after dispatch.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>United Kingdom:</strong> 3–5 days after dispatch.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>United States:</strong> 5–8 days after dispatch.</li>
            </ul>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Express Options</h2>
            <p style={{ marginBottom: '1.5rem' }}>If you are on a strict deadline, we offer a rush 24-hour production upgrade at an additional cost. Expedited shipping rates will be calculated at checkout.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>4. Tracking Information</h2>
            <p style={{ marginBottom: '1.5rem' }}>Once your custom order leaves our facility, you will receive a dispatch confirmation email containing a tracking link to monitor your shipment's progress.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Lost or Damaged Shipments</h2>
            <p style={{ marginBottom: '1.5rem' }}>While rare, transit issues can occur. If your package is significantly delayed or arrives damaged, please notify us immediately so we can open an investigation and arrange a replacement if necessary.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>6. Customs & Import Duties</h2>
            <p style={{ marginBottom: '1.5rem' }}>For international deliveries outside of our standard domestic zones, the customer is responsible for any applicable customs fees, import duties, or local taxes levied by the destination country.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
