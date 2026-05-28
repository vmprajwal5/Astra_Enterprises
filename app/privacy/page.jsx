import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Astra NCR',
  description: 'GDPR Compliant Privacy Policy for Astra NCR.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#FF6B35', fontWeight: '500', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>
          
          <h1 style={{ color: '#0A192F', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '3rem' }}>Last updated: January 2024</p>
          
          <div style={{ color: '#334155', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. What Data We Collect</h2>
            <p style={{ marginBottom: '1.5rem' }}>We collect personal identification information (Name, Email address, Phone number, Business details) and transactional data required to process your printing orders.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Data</h2>
            <p style={{ marginBottom: '1.5rem' }}>Your data is used strictly to fulfill your orders, provide customer support, and, with your explicit consent, send promotional offers or newsletters.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Data Storage & Security</h2>
            <p style={{ marginBottom: '1.5rem' }}>We implement robust security measures to safeguard your personal information. Data is stored securely on encrypted servers and retained only for as long as necessary to fulfill the purposes outlined in this policy.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>4. Cookies Policy</h2>
            <p style={{ marginBottom: '1.5rem' }}>Our website uses cookies to enhance user experience and analyze site traffic. You can manage your cookie preferences via our Cookie Consent banner.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Your Rights</h2>
            <p style={{ marginBottom: '1.5rem' }}>Under GDPR, you have the right to access, correct, delete, or port your personal data. You may withdraw consent for marketing communications at any time.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>6. Third Party Services</h2>
            <p style={{ marginBottom: '1.5rem' }}>We utilize trusted third-party payment processors including Stripe, Razorpay, and PayPal. These services adhere to strict security and privacy standards; we do not store your raw payment details.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>7. Contact for Data Requests</h2>
            <p style={{ marginBottom: '1.5rem' }}>To exercise your data rights or if you have any privacy-related concerns, please contact our Data Protection Officer through our website.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
