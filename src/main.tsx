import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Lenis from 'lenis';

// ─── Lenis Smooth Scroll ─────────────────────────────────────────────────────
// Synced with Framer Motion via a single requestAnimationFrame loop.
// Using a single RAF avoids jitter between scroll physics and motion values.
// ─────────────────────────────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.35,
  // Expo-out easing — fast start, buttery deceleration
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.6,
  infinite: false,
});

Object.assign(window, { lenis });

// Single RAF loop — Framer Motion useScroll reads native scrollY,
// Lenis intercepts wheel/touch and drives scrollY smoothly.
function rafLoop(time: number) {
  lenis.raf(time);
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
