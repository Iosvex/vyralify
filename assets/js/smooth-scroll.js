import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const lenis=new Lenis({lerp:.09});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);window.lenis=lenis}
