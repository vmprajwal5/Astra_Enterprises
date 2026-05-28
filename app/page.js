import Hero from '@/components/Hero';
import WhoItsFor from '@/components/WhoItsFor';
import Products from '@/components/Products';
import Configurator from '@/components/Configurator';
import FormTypes from '@/components/FormTypes';
import LivePreview from '@/components/LivePreview';
import DIYCanvas from '@/components/DIYCanvas';
import PaperQuality from '@/components/PaperQuality';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import Partners from '@/components/Partners';
import PoliciesGateways from '@/components/PoliciesGateways';
import CustomContact from '@/components/CustomContact';
import QuoteForm from '@/components/QuoteForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider bg="var(--navy-900)" fill="var(--white)" type="convex" />
        
        <WhoItsFor />
        <SectionDivider bg="var(--white)" fill="var(--surface-2, #F4F7FA)" type="concave" />
        
        <Products />
        <SectionDivider bg="var(--surface-2, #F4F7FA)" fill="var(--bg-light)" type="convex" />
        
        <Configurator />
        <SectionDivider bg="var(--bg-light)" fill="var(--white)" type="concave" />
        
        <FormTypes />
        <SectionDivider bg="var(--white)" fill="#1A202C" type="convex" />
        
        <LivePreview />
        <SectionDivider bg="#1A202C" fill="var(--bg-light)" type="concave" />
        
        <DIYCanvas />
        <SectionDivider bg="var(--bg-light)" fill="var(--white)" type="convex" />
        
        <PaperQuality />
        <SectionDivider bg="var(--white)" fill="var(--white)" type="concave" />
        
        <Timeline />
        <SectionDivider bg="var(--surface-3, #EAF0F6)" fill="var(--bg-light)" type="convex" />
        
        <Partners />
        <SectionDivider bg="var(--bg-light)" fill="var(--white)" type="concave" />
        
        <Gallery />
        <SectionDivider bg="var(--white)" fill="var(--surface-3, #EAF0F6)" type="concave" />
        
        <PoliciesGateways />
        <SectionDivider bg="var(--surface-3, #EAF0F6)" fill="var(--navy-900)" type="convex" />
        
        <CustomContact />
        <SectionDivider bg="var(--navy-900)" fill="var(--bg-light)" type="concave" />
        
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
