/* ═══════════════════════════════════════════════════════════════════════════
   VEDA CARE — Main JavaScript
   Libraries: GSAP, ScrollTrigger, Lenis
   ═══════════════════════════════════════════════════════════════════════════ */

(function() {
  "use strict";

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── 1. PRELOADER ──────────────────────────────────────────────────────── */
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.preloader__progress');
    
    if (!preloader || isReducedMotion) {
      document.body.classList.remove('loading');
      initAnimations();
      return;
    }

    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.random() * 20;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        setTimeout(() => {
          document.body.classList.remove('loading');
          initAnimations();
        }, 400);
      }
      progress.style.width = percent + '%';
    }, 100);
  }

  /* ─── 2. SMOOTH SCROLL (LENIS) ──────────────────────────────────────────── */
  let lenis;
  function initLenis() {
    if (isReducedMotion) return;

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
          // Close cart if open
          document.body.classList.remove('cart-open');
        }
      });
    });
  }

  /* ─── 3. NAVIGATION ─────────────────────────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ─── 4. FAQ ACCORDION ──────────────────────────────────────────────────── */
  function initFAQ() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.accordion-header').forEach(h => {
          h.classList.remove('active');
          h.nextElementSibling.style.maxHeight = null;
        });
        
        // Open clicked if it wasn't active
        if (!isActive) {
          header.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  /* ─── 5. INGREDIENTS HORIZONTAL SCROLL ──────────────────────────────────── */
  function initHorizontalScroll() {
    if (isReducedMotion) return;
    
    const wrapper = document.querySelector('.ingredients-scroll-wrapper');
    const track = document.querySelector('.ingredients-track');
    
    if (!wrapper || !track) return;
    
    // Calculate total scroll distance based on track width vs viewport width
    function getScrollAmount() {
      return track.scrollWidth - window.innerWidth + 48; // 48 is padding
    }

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 20%",
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    });
  }

  /* ─── 6. MAGNETIC BUTTONS ───────────────────────────────────────────────── */
  function initMagnetic() {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Skip on touch
    
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0, 0)`;
      });
    });
  }

  /* ─── 7. GSAP ANIMATIONS ────────────────────────────────────────────────── */
  function initAnimations() {
    if (isReducedMotion) {
      document.querySelectorAll('.reveal-fade, .reveal-slide, .reveal-scale, .reveal-up, .word').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      return;
    }

    // Hero Text Reveal
    gsap.to(".hero .word", {
      y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out"
    });
    
    gsap.to(".hero .reveal-fade", {
      opacity: 1, duration: 1, stagger: 0.2, delay: 0.8, ease: "power2.out"
    });

    // Parallax Hero Image
    gsap.to(".hero__bg-img", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Scroll Reveals
    const createReveal = (selector, animProps) => {
      document.querySelectorAll(selector).forEach(el => {
        gsap.to(el, {
          ...animProps,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    };

    createReveal('.reveal-slide', { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    createReveal('.reveal-scale', { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" });
    
    // Staggered reveals for grids
    const createStagger = (container, items, yOffset) => {
      document.querySelectorAll(container).forEach(grid => {
        gsap.to(grid.querySelectorAll(items), {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    };

    createStagger('.products-grid', '.reveal-up', 30);
    createStagger('.routines-grid', '.reveal-up', 30);
  }

  /* ─── 8. INIT ALL ───────────────────────────────────────────────────────── */
  function init() {
    initLenis();
    initNav();
    initFAQ();
    initMagnetic();
    // Setup horizontal scroll before page is fully loaded to calculate widths correctly
    initHorizontalScroll();
    initPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
