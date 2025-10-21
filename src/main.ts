import './style.css'
import Lenis from '@studio-freight/lenis'

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

// Initialize Lenis for smoother, slower scroll
const lenis = new Lenis({
  duration: 1.8, // increase for slower scroll
  easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic easing for smooth deceleration
  smoothWheel: true,
  autoResize: true,
});

lenis.on('scroll', ({ velocity }: { velocity: number }) => {
  if (Math.abs(velocity) > 100) {
    lenis.stop(); // pause to avoid glitch
    requestAnimationFrame(() => lenis.start());
  }
});

  // Use requestAnimationFrame to update Lenis each frame
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});