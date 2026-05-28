import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | Astra NCR',
  description: 'Terms and Conditions for Astra NCR custom printing services.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#FF6B35', fontWeight: '500', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>
          
          <h1 style={{ color: '#0A192F', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Terms & Conditions</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '3rem' }}>Last updated: January 2024</p>
          
          <div style={{ color: '#334155', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction & Acceptance of Terms</h2>
            <p style={{ marginBottom: '1.5rem' }}>Welcome to Astra Enterprises. By accessing our website and utilizing our custom NCR printing services, you agree to comply with and be bound by the following terms and conditions.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Products & Services</h2>
            <p style={{ marginBottom: '1.5rem' }}>We provide custom carbonless NCR printing, including but not limited to invoice books, receipt pads, and custom orders. All specifications must be verified prior to production.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Order Process & Quote Acceptance</h2>
            <p style={{ marginBottom: '1.5rem' }}>Orders are processed once a digital proof is approved and payment is secured. Quotes are valid for 30 days from the date of issuance.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>4. Pricing & Payment</h2>
            <p style={{ marginBottom: '1.5rem' }}>All prices are subject to change. We accept secure payments via Razorpay, Stripe, and PayPal. Full payment is required before production commences on custom orders.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Intellectual Property</h2>
            <p style={{ marginBottom: '1.5rem' }}>You warrant that you have the right to use any logos, trademarks, or artwork submitted for printing. Astra Enterprises retains the rights to all internal templates and designs provided by us.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>6. Limitation of Liability</h2>
            <p style={{ marginBottom: '1.5rem' }}>Astra Enterprises shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or services, including delays in transit.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>7. Governing Law</h2>
            <p style={{ marginBottom: '1.5rem' }}>These terms shall be governed in accordance with the jurisdictions of India, the UK, and the USA, depending on the operational entity fulfilling your order.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>8. Contact Information</h2>
            <p style={{ marginBottom: '1.5rem' }}>For any queries regarding these Terms & Conditions, please contact our legal team via the contact form on our website.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
