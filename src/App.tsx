import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import ScrollJourney from './components/ScrollJourney';
import About from './components/About';
import Umrah from './components/Umrah';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const InternationalTrips = lazy(() => import('./pages/InternationalTrips'));

function HomePage({ startHeroAnimation }: { startHeroAnimation: boolean }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      let lastY = -1;
      
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -80; // height of navbar
          
          // Calculate absolute offset top from document top (independent of window.scrollY)
          let top = 0;
          let curr: HTMLElement | null = el;
          while (curr) {
            top += curr.offsetTop;
            curr = curr.offsetParent as HTMLElement | null;
          }
          const targetY = top + yOffset;
          
          if (Math.abs(targetY - lastY) > 5) {
            lastY = targetY;
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(targetY, { duration: 1.2 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }
          
          // Poll multiple times to adapt to any late layout changes
          if (attempts < 5) {
            setTimeout(() => tryScroll(attempts + 1), 250);
          }
        } else if (attempts < 20) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    }
  }, [location]);

  return (
    <>
      <Hero startAnimation={startHeroAnimation} />
      <ScrollJourney />
      <About />
      <Umrah />
      <Packages />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}

function MainApp() {
  const [introComplete, setIntroComplete] = useState(false);
  const [exitStarted, setExitStarted] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isSiteVisible = !isHome || exitStarted || introComplete;
  const startHeroAnimation = !isHome || exitStarted || introComplete;

  return (
    <div className="font-sans" style={{ background: '#faf9f7' }}>
      {/* Cinematic intro — renders above everything, removes itself after completion */}
      {isHome && !introComplete && (
        <CinematicIntro 
          onComplete={() => setIntroComplete(true)} 
          onExitStart={() => setExitStarted(true)} 
        />
      )}

      {/* Main site */}
      <div
        style={{
          opacity: isSiteVisible ? 1 : 0,
          pointerEvents: (isHome && !introComplete) ? 'none' : 'auto',
          transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <Navbar startAnimation={startHeroAnimation} />
        
        <Routes>
          <Route path="/" element={<HomePage startHeroAnimation={startHeroAnimation} />} />
          <Route path="/international-trips" element={
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-gold"><div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div></div>}>
              <InternationalTrips />
            </Suspense>
          } />
        </Routes>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration to prevent it from resetting scroll coordinates randomly
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
