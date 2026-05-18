import { useState, lazy, Suspense } from 'react';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// ── Code Splitting & Lazy Loading ──
// These components are "below the fold". We lazy load them to drastically 
// reduce the initial bundle size, speeding up initial page load. 
// They will quietly download in the background while the intro animation plays!
const ScrollJourney = lazy(() => import('./components/ScrollJourney'));
const About = lazy(() => import('./components/About'));
const Umrah = lazy(() => import('./components/Umrah'));
const Packages = lazy(() => import('./components/Packages'));
const Gallery = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="font-sans" style={{ background: '#faf9f7' }}>
      {/* Cinematic intro — renders above everything, removes itself after completion */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      {/* Main site — rendered beneath intro so video preloads immediately */}
      <div
        style={{
          opacity: 1,
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar />
        <Hero />
        
        {/* Suspense wrapper handles the lazy loading states gracefully */}
        <Suspense fallback={<div className="h-20 w-full" />}>
          <ScrollJourney />
          <About />
          <Umrah />
          <Packages />
          <Gallery />
          <Testimonials />
          <Contact />
          <Footer />
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
