import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScrollParallax() {
  useEffect(() => {
    let lenis = null;
    let updateTicker = null;
    let handleAnchorClick = null;
    let ctx = null;

    try {
      // 1. Initialize Lenis Smooth Scroll Engine
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false,
      });

      // Make lenis globally accessible for anchor clicks
      window.lenis = lenis;

      // 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      updateTicker = (time) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Smooth anchor navigation with Lenis
      handleAnchorClick = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl && lenis) {
              e.preventDefault();
              lenis.scrollTo(targetEl, { offset: -40, duration: 1.4 });
            }
          }
        }
      };
      document.addEventListener('click', handleAnchorClick);

      // 3. Setup GSAP ScrollTrigger Parallax Animations
      ctx = gsap.context(() => {
        
        // =======================================================================
        // HERO PARALLAX: Text drifts up with depth, background canvas lags behind
        // =======================================================================
        const heroSection = document.querySelector('#hero-section');
        const heroText = document.querySelector('#hero-section .relative.z-10');
        const heroCanvas = document.querySelector('#hero-section .absolute.z-0');

        if (heroSection && heroText) {
          gsap.to(heroText, {
            y: -120,
            opacity: 0.25,
            scale: 0.96,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        if (heroSection && heroCanvas) {
          gsap.to(heroCanvas, {
            y: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        // =======================================================================
        // SECTION 04: SOCIAL PROOF & BKLIT ANALYTICS PARALLAX
        // =======================================================================
        const socialProof = document.querySelector('#social-proof');
        if (socialProof) {
          // Section Header Reveal
          const spHeader = socialProof.querySelector('.text-center');
          if (spHeader) {
            gsap.fromTo(
              spHeader,
              { y: 55, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: socialProof,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          // BKLIT 3-Card Row Staggered Parallax
          const bklitCards = socialProof.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3 > div');
          if (bklitCards.length) {
            gsap.fromTo(
              bklitCards,
              { y: 65, opacity: 0.2 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: socialProof,
                  start: 'top 75%',
                  end: 'top 40%',
                  scrub: 1,
                },
              }
            );
          }

          // Interactive Area Chart Card Parallax Float
          const chartCard = socialProof.querySelector('.shadow-xl');
          if (chartCard) {
            gsap.fromTo(
              chartCard,
              { y: 80, opacity: 0.4 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: chartCard,
                  start: 'top 88%',
                  end: 'top 50%',
                  scrub: 1.3,
                },
              }
            );
          }

          // Bento Grid Differential Layer Parallax (Left 7-col vs Right 5-col)
          const bentoCol1 = socialProof.querySelector('.lg\\:col-span-7');
          const bentoCol2 = socialProof.querySelector('.lg\\:col-span-5');

          if (bentoCol1 && bentoCol2) {
            gsap.fromTo(
              bentoCol1,
              { y: 40 },
              {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                  trigger: socialProof.querySelector('.grid.lg\\:grid-cols-12'),
                  start: 'top 85%',
                  end: 'bottom 20%',
                  scrub: 1.4,
                },
              }
            );

            gsap.fromTo(
              bentoCol2,
              { y: 70 },
              {
                y: -10,
                ease: 'none',
                scrollTrigger: {
                  trigger: socialProof.querySelector('.grid.lg\\:grid-cols-12'),
                  start: 'top 85%',
                  end: 'bottom 20%',
                  scrub: 1.1,
                },
              }
            );
          }
        }

        // =======================================================================
        // SECTION 05: FEATURES PARALLAX STAGGER
        // =======================================================================
        const features = document.querySelector('#features');
        if (features) {
          const featureCards = features.querySelectorAll('.grid > div');
          if (featureCards.length) {
            gsap.fromTo(
              featureCards,
              { y: 70, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: features,
                  start: 'top 80%',
                  end: 'top 35%',
                  scrub: 1.2,
                },
              }
            );
          }
        }

        // =======================================================================
        // SECTION 06: CLIP & EARN PARALLAX FLOAT
        // =======================================================================
        const clipAndEarn = document.querySelector('#clip-and-earn');
        if (clipAndEarn) {
          gsap.fromTo(
            clipAndEarn,
            { y: 60, opacity: 0.6 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: clipAndEarn,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 1.3,
              },
            }
          );
        }

      });
    } catch (err) {
      console.warn("GSAP/Lenis parallax initialization error:", err);
    }

    // 4. Teardown on unmount
    return () => {
      try {
        if (handleAnchorClick) document.removeEventListener('click', handleAnchorClick);
        if (ctx) ctx.revert();
        if (updateTicker) gsap.ticker.remove(updateTicker);
        if (lenis) lenis.destroy();
        delete window.lenis;
      } catch (cleanupErr) {
        console.warn("GSAP/Lenis cleanup error:", cleanupErr);
      }
    };
  }, []);
}

export default useGsapScrollParallax;
