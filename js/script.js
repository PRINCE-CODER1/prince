/* ═══════════════════════════════════════════════════════════════════════════
   PRINCE KUMAR — Ultra-Premium Portfolio Script
   Libraries: GSAP + ScrollTrigger, Lenis, Three.js
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─── Register GSAP Plugins ─────────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ─── Constants ─────────────────────────────────────────────────────────
  const EASE_SMOOTH = "power3.out";
  const EASE_IO = "power3.inOut";
  const IS_TOUCH = window.matchMedia("(pointer: coarse)").matches;
  const IS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ═══════════════════════════════════════════════════════════════════════
     1. PRELOADER
     ═══════════════════════════════════════════════════════════════════════ */
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const countEl = document.getElementById("preloader-count");
    const barFill = document.querySelector(".preloader__bar-fill");
    const logo = document.querySelector(".preloader__logo");
    const counter = document.querySelector(".preloader__counter");
    const tag = document.querySelector(".preloader__tag");
    const meta = document.querySelector(".preloader__meta");

    if (!preloader || IS_REDUCED_MOTION) {
      if (preloader) preloader.style.display = "none";
      document.querySelector(".nav")?.classList.add("visible");
      initPageAnimations();
      return;
    }

    // Animate preloader elements in
    const tl = gsap.timeline();
    tl.to(logo, { opacity: 1, y: 0, duration: 0.6, ease: EASE_SMOOTH })
      .to(counter, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, "-=0.2")
      .to(tag, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, "-=0.2")
      .to(meta, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, "-=0.2");

    // Count up
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(finishPreloader, 400);
      }
      countEl.textContent = Math.min(Math.round(progress), 100);
      barFill.style.width = Math.min(progress, 100) + "%";
    }, 80);

    function finishPreloader() {
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: EASE_IO,
        onComplete: () => {
          preloader.style.display = "none";
          initPageAnimations();
        },
      });

      // Show nav after preloader
      setTimeout(() => {
        document.querySelector(".nav")?.classList.add("visible");
      }, 300);
    }
  }


  /* ═══════════════════════════════════════════════════════════════════════
     2. LENIS SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════════════════ */
  let lenis;

  function initSmoothScroll() {
    if (IS_REDUCED_MOTION) return;

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target) lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     3. CUSTOM CURSOR
     ═══════════════════════════════════════════════════════════════════════ */
  function initCursor() {
    if (IS_TOUCH) return;

    const dot = document.querySelector(".cursor__dot");
    const ring = document.querySelector(".cursor__ring");
    if (!dot || !ring) return;

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    // Hover detection
    const interactiveSelector = "a, button, [role='button'], input, textarea, .magnetic, .interactive, .project-card, .skill-card, .service-card";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.add("cursor-hover");
      }
    }, { passive: true });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.remove("cursor-hover");
      }
    }, { passive: true });

    // Animation loop
    function animate() {
      dotPos.x += (mouse.x - dotPos.x) * 0.15;
      dotPos.y += (mouse.y - dotPos.y) * 0.15;
      ringPos.x += (mouse.x - ringPos.x) * 0.08;
      ringPos.y += (mouse.y - ringPos.y) * 0.08;

      dot.style.left = dotPos.x + "px";
      dot.style.top = dotPos.y + "px";
      ring.style.left = ringPos.x + "px";
      ring.style.top = ringPos.y + "px";

      requestAnimationFrame(animate);
    }
    animate();
  }


  /* ═══════════════════════════════════════════════════════════════════════
     4. CURSOR GLOW (Mouse-following light)
     ═══════════════════════════════════════════════════════════════════════ */
  function initCursorGlow() {
    if (IS_TOUCH) return;

    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    }, { passive: true });

    function animate() {
      pos.x += (target.x - pos.x) * 0.04;
      pos.y += (target.y - pos.y) * 0.04;
      glow.style.background =
        `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(0,212,255,0.04), transparent 40%)`;
      requestAnimationFrame(animate);
    }
    animate();
  }


  /* ═══════════════════════════════════════════════════════════════════════
     5. NAVIGATION
     ═══════════════════════════════════════════════════════════════════════ */
  function initNavigation() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("nav-burger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!nav) return;

    // Glass on scroll
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    }, { passive: true });

    // Active link tracking
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    // Mobile menu
    if (burger && mobileMenu) {
      burger.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        burger.classList.toggle("open");
        burger.setAttribute("aria-expanded", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      // Close on link click
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          burger.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }

    // Back to top
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      backToTop.addEventListener("click", () => {
        if (lenis) lenis.scrollTo(0, { duration: 2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════════════════
     6. MAGNETIC BUTTONS
     ═══════════════════════════════════════════════════════════════════════ */
  function initMagneticButtons() {
    if (IS_TOUCH) return;

    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        el.style.transition = "transform 0.2s ease-out";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
        el.style.transition = "transform 0.5s ease-out";
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     7. PAGE ANIMATIONS (Called after preloader)
     ═══════════════════════════════════════════════════════════════════════ */
  function initPageAnimations() {
    if (IS_REDUCED_MOTION) {
      // Show everything immediately
      document.querySelectorAll(".reveal-up, .word").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // ─── Hero word-by-word reveal ──────────────────────────────────────
    const heroWords = document.querySelectorAll(".hero .word");
    gsap.to(heroWords, {
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: EASE_SMOOTH,
      delay: 0.3,
    });

    // ─── Hero elements staggered ───────────────────────────────────────
    gsap.from(".hero__meta", {
      opacity: 0, y: 20,
      duration: 0.8, delay: 0.8, ease: EASE_SMOOTH,
    });

    gsap.from(".hero__desc", {
      opacity: 0, y: 30,
      duration: 0.8, delay: 1.0, ease: EASE_SMOOTH,
    });

    gsap.from(".hero__actions", {
      opacity: 0, y: 30,
      duration: 0.8, delay: 1.2, ease: EASE_SMOOTH,
    });

    gsap.from(".hero__stats .stat-card", {
      opacity: 0, y: 40,
      duration: 0.8, stagger: 0.15, delay: 1.4, ease: EASE_SMOOTH,
    });

    gsap.from(".hero__scroll", {
      opacity: 0,
      duration: 1, delay: 2, ease: EASE_SMOOTH,
    });

    // ─── Scroll-triggered reveals ──────────────────────────────────────
    document.querySelectorAll(".reveal-up").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE_SMOOTH,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ─── Skill bars ────────────────────────────────────────────────────
    document.querySelectorAll(".skill-card__bar-fill").forEach((bar) => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, {
        width: width + "%",
        duration: 1.5,
        ease: EASE_SMOOTH,
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ─── Counter animations ────────────────────────────────────────────
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: EASE_SMOOTH,
            onUpdate: () => {
              el.textContent = Math.round(obj.val);
            },
          });
        },
      });
    });

    // ─── Timeline line animation ───────────────────────────────────────
    const timelineLine = document.querySelector(".timeline__line");
    if (timelineLine) {
      gsap.from(timelineLine, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        ease: EASE_SMOOTH,
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }

    // ─── Timeline dots pulse ───────────────────────────────────────────
    document.querySelectorAll(".timeline__dot").forEach((dot) => {
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: dot,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ─── Project card tilt on hover ────────────────────────────────────
    if (!IS_TOUCH) {
      document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0) perspective(1000px) rotateX(0) rotateY(0)";
          card.style.transition = "transform 0.5s ease-out";
        });

        card.addEventListener("mouseenter", () => {
          card.style.transition = "transform 0.1s ease-out";
        });
      });
    }

    // ─── Parallax on shapes ────────────────────────────────────────────
    gsap.to(".shape--circle", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".shape--ring", {
      y: -50,
      x: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // ─── Image parallax ───────────────────────────────────────────────
    document.querySelectorAll(".about__img-wrap img, .project-card__media img").forEach((img) => {
      gsap.to(img, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // ─── Marquee speed on scroll ──────────────────────────────────────
    const marquees = document.querySelectorAll(".marquee__track");
    marquees.forEach((track) => {
      gsap.to(track, {
        x: track.classList.contains("marquee__track--reverse") ? "+=20" : "-=20",
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     8. CONTACT FORM
     ═══════════════════════════════════════════════════════════════════════ */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll("[required]");
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = "#EF4444";
          setTimeout(() => { input.style.borderColor = ""; }, 2000);
        }
      });

      if (!valid) return;

      // Simulate send
      submitBtn.classList.add("loading");

      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");
        form.reset();

        setTimeout(() => {
          submitBtn.classList.remove("success");
        }, 3000);
      }, 1500);
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     9. THREE.JS PARTICLES
     ═══════════════════════════════════════════════════════════════════════ */
  function initParticles() {
    if (IS_REDUCED_MOTION || IS_TOUCH) return;

    const canvas = document.getElementById("webgl");
    if (!canvas || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particles
    const count = 60;
    const positions = new Float32Array(count * 3);
    const speeds = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds.push({
        speed: Math.random() * 0.003 + 0.001,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00D4FF,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse influence
    const mouseWorld = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouseWorld.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseWorld.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      const posArray = geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const s = speeds[i];
        posArray[i * 3] += Math.sin(time * s.speed * 50 + s.offset) * 0.002;
        posArray[i * 3 + 1] += Math.cos(time * s.speed * 30 + s.offset) * 0.002;
      }
      geometry.attributes.position.needsUpdate = true;

      // Subtle camera movement following mouse
      camera.position.x += (mouseWorld.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouseWorld.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     10. INITIALIZATION
     ═══════════════════════════════════════════════════════════════════════ */
  function init() {
    initSmoothScroll();
    initCursor();
    initCursorGlow();
    initNavigation();
    initMagneticButtons();
    initContactForm();
    initParticles();
    initPreloader(); // This triggers page animations when done
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
