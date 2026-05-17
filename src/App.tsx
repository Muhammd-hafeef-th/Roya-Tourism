import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollJourney from './components/ScrollJourney';
import About from './components/About';
import Umrah from './components/Umrah';
import Packages from './components/Packages';
import Destinations from './components/Destinations';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="font-sans" style={{ background: '#faf9f7' }}>
      <Navbar />
      <Hero />
      <ScrollJourney />
      <About />
      <Umrah />
      <Packages />
      <Destinations />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
