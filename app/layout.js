import './globals.css';
import ScrollManager from '@/components/ScrollManager';
import CookieBanner from '@/components/CookieBanner';
import { AuthProvider } from '@/lib/AuthContext';
import { CurrencyProvider } from '@/lib/CurrencyContext';

export const metadata = {
  title: 'Astra NCR | Custom NCR Printing — India, UK & USA',
  description: 'Premium custom NCR carbonless printing for tradespeople, salons, and businesses. Invoice books, work order pads, receipt books. Ships to India, UK & USA.',
  keywords: 'NCR printing, carbonless copy paper, invoice books, work order pads, custom printing India, NCR pads UK',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Astra NCR | Heritage Print Quality. Modern Workflow.',
    description: 'Custom NCR carbonless printing for professionals. 500+ businesses served across India, UK & USA.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Astra NCR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra NCR | Custom NCR Printing',
    description: 'Premium carbonless copy printing. Fast turnaround.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <AuthProvider>
          <CurrencyProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Astra Enterprises",
                "description": "Custom NCR carbonless printing for businesses",
                "url": "https://www.astraenterprises.co",
                "priceRange": "££",
                "currenciesAccepted": "GBP, USD, INR",
                "paymentAccepted": "Stripe, Razorpay, PayPal",
                "areaServed": ["IN", "GB", "US"]
              })}}
            />
            <ScrollManager />
            {children}
            <CookieBanner />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
