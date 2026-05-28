import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refunds & Returns | Astra NCR',
  description: 'Our policy regarding refunds and returns for custom print orders.',
};

export default function RefundsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: '#FF6B35', fontWeight: '500', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>
          
          <h1 style={{ color: '#0A192F', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Refunds & Returns</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '3rem' }}>Last updated: January 2024</p>
          
          <div style={{ color: '#334155', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Our Print Quality Guarantee</h2>
            <p style={{ marginBottom: '1.5rem' }}>We take pride in our workmanship. Every order undergoes a rigorous quality check before dispatch to ensure it meets our high standards.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. When Refunds Apply</h2>
            <p style={{ marginBottom: '1.5rem' }}>Refunds or reprints are granted if the final product arrives damaged in transit, deviates significantly from the approved specifications, or if there is a verifiable error on our part during production.</p>
            
            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. When Refunds Don't Apply</h2>
            <p style={{ marginBottom: '1.5rem' }}>Due to the custom nature of our products, we cannot offer refunds for orders where a digital proof was approved by the client and the error was present in that proof, or for simple changes of mind post-production.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>4. How to Request a Refund</h2>
            <p style={{ marginBottom: '1.5rem' }}>Please submit your claim via email within 7 days of receiving your order. Ensure you include your order number and clear photographs demonstrating the issue.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>5. Refund Timeline</h2>
            <p style={{ marginBottom: '1.5rem' }}>Approved refunds will be processed and credited back to your original method of payment within 5–10 business days, depending on your bank or payment provider.</p>

            <h2 style={{ color: '#0A192F', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>6. Reprint Policy</h2>
            <p style={{ marginBottom: '1.5rem' }}>In cases where a production error has occurred, we may offer a complimentary expedited reprint of the defective items in lieu of a refund to ensure your business operations remain uninterrupted.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
