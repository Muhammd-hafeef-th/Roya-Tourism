import { useState } from 'react';
import CinematicIntro from './components/CinematicIntro';
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
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="font-sans" style={{ background: '#faf9f7' }}>
      {/* Cinematic intro — renders above everything, removes itself after completion */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      {/* Main site — rendered beneath intro so video preloads immediately */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
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
    </div>
  );
}

export default App;
