import Hero from '../sections/Hero';
import ProductIntro from '../sections/ProductIntro';
import HowItWorks from '../sections/HowItWorks';
import Decks from '../sections/Decks';
import Voices from '../sections/Voices';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ProductIntro />
      <HowItWorks />
      <Decks />
      <Voices />
      <CTA />
      <Footer />
    </main>
  );
}
