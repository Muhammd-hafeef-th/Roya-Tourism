import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// ── Code Splitting & Lazy Loading ──
const ScrollJourney = lazy(() => import('./components/ScrollJourney'));
const About = lazy(() => import('./components/About'));
const Umrah = lazy(() => import('./components/Umrah'));
const Packages = lazy(() => import('./components/Packages'));
const Gallery = lazy(() => import('./components/Gallery'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

const InternationalTrips = lazy(() => import('./pages/InternationalTrips'));

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      // We use a small polling mechanism because the sections are lazy-loaded via Suspense
      // and might not immediately exist in the DOM on first render.
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(targetId);
        if (el) {
          // Add a tiny delay to ensure layout is complete before scrolling
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        } else if (attempts < 20) {
          // If not found, check again in 100ms (max 2 seconds)
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    } else {
      // Delay scrolling to top slightly so that Suspense/lazy-loaded content doesn't disrupt it
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-20 w-full" />}>
        <ScrollJourney />
        <About />
        <Umrah />
        <Packages />
        <Gallery />
        <Testimonials />
        <Contact />
      </Suspense>
    </>
  );
}

function MainApp() {
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="font-sans" style={{ background: '#faf9f7' }}>
      {/* Cinematic intro — renders above everything, removes itself after completion */}
      {isHome && !introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}

      {/* Main site */}
      <div
        style={{
          opacity: 1,
          pointerEvents: (isHome && !introComplete) ? 'none' : 'auto',
        }}
      >
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/international-trips" element={
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-gold"><div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div></div>}>
              <InternationalTrips />
            </Suspense>
          } />
        </Routes>
        
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
