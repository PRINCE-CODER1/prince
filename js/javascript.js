const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------------
   PRELOADER & PAGE ENTRY TIMELINE
   --------------------------------------------------------------------- */
function bootPreloader() {
  const preloader = document.getElementById("preloader");
  const percentText = document.getElementById("preloader-percent");
  const progressBar = document.querySelector(".preloader__progress-bar");
  
  if (!preloader) return;

  if (prefersReducedMotion) {
    preloader.style.display = "none";
    gsap.set(".site-nav", { y: 0, autoAlpha: 1 });
    gsap.set(".word-mask span", { translateY: 0 });
    return;
  }

  let count = 0;
  const target = 100;
  const duration = 2.0; 
  const incrementTime = (duration * 1000) / target;
  
  const timer = setInterval(() => {
    count++;
    if (count <= target) {
      const paddedCount = count.toString().padStart(2, "0");
      percentText.textContent = paddedCount;
      if (progressBar) {
        progressBar.style.width = `${count}%`;
      }
    } else {
      clearInterval(timer);
      triggerPageEntry();
    }
  }, incrementTime);
}

function triggerPageEntry() {
  const tl = gsap.timeline();
  
  tl.to(".preloader", {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut"
  });

  tl.to(".site-nav", {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.4");

  tl.to(".word-mask span", {
    yPercent: 0,
    rotate: 0,
    stagger: 0.08,
    duration: 1.2,
    ease: "power4.out"
  }, "-=0.8");

  tl.from(".hero__meta-top, .hero__footer, .hero__metrics", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.9");
}

/* ---------------------------------------------------------------------
   SMOOTH SCROLL (Lenis)
   --------------------------------------------------------------------- */
let lenisInstance = null;
function bootSmoothScroll() {
  if (
    prefersReducedMotion ||
    typeof Lenis === "undefined" ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  )
    return;

  lenisInstance = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
  });

  // Track mouse coordinates to simulate pointer movements during scrolls
  let mouseX = 0, mouseY = 0;
  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  lenisInstance.on("scroll", () => {
    ScrollTrigger.update();
    
    // Simulate pointermove to update cursor states on scroll
    const e = new PointerEvent("pointermove", {
      clientX: mouseX,
      clientY: mouseY,
      bubbles: true
    });
    window.dispatchEvent(e);
  });

  gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------------------------------------------------------------------
   DUAL-DOT CUSTOM CURSOR WITH INTERACTIVE STATES
   --------------------------------------------------------------------- */
function bootCursor() {
  const cursor = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor__dot");
  const ring = document.querySelector(".cursor__ring");
  const label = document.querySelector(".cursor__label");
  
  if (
    !cursor ||
    !isFinePointer ||
    prefersReducedMotion ||
    typeof gsap === "undefined"
  ) {
    if (cursor) cursor.style.display = "none";
    return;
  }

  document.body.style.cursor = "none";

  const dotX = gsap.quickTo(dot, "left", { duration: 0.05, ease: "power3.out" });
  const dotY = gsap.quickTo(dot, "top", { duration: 0.05, ease: "power3.out" });
  
  const ringX = gsap.quickTo(ring, "left", { duration: 0.35, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "top", { duration: 0.35, ease: "power3.out" });
  
  const labelX = gsap.quickTo(label, "left", { duration: 0.25, ease: "power3.out" });
  const labelY = gsap.quickTo(label, "top", { duration: 0.25, ease: "power3.out" });

  window.addEventListener("pointermove", (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    
    ringX(e.clientX);
    ringY(e.clientY);
    
    labelX(e.clientX);
    labelY(e.clientY);
  }, { passive: true });

  const interactives = document.querySelectorAll("a, button, .nav-item, .explore-btn, .footer__copyright span");
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  const workCards = document.querySelectorAll(".work-card");
  workCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-interactive");
      label.textContent = "VIEW";
    });
    card.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-interactive");
    });
  });

  const featureMedia = document.querySelector(".feature__media");
  if (featureMedia) {
    const video = featureMedia.querySelector("video");
    featureMedia.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-play");
      label.textContent = video.paused ? "PLAY" : "PAUSE";
    });
    featureMedia.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-play");
    });
    featureMedia.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        label.textContent = "PAUSE";
      } else {
        video.pause();
        label.textContent = "PLAY";
      }
    });
  }

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const relX = event.clientX - rect.left - rect.width / 2;
      const relY = event.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: relX * 0.35,
        y: relY * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("pointerleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });
}

/* ---------------------------------------------------------------------
   3D PARALLAX CARD TILT
   --------------------------------------------------------------------- */
function boot3DTilt() {
  if (prefersReducedMotion || !isFinePointer || typeof gsap === "undefined") return;

  const cards = document.querySelectorAll(".manifesto-card, .process-step");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const xPercent = (x / rect.width - 0.5) * 2; 
      const yPercent = (y / rect.height - 0.5) * 2; 
      
      gsap.to(card, {
        rotateY: xPercent * 10, // Max 10 deg rotation
        rotateX: -yPercent * 10,
        x: xPercent * 6,       // Subtle translation drift
        y: yPercent * 6,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  });
}

/* ---------------------------------------------------------------------
   HORIZONTAL PINNED SCROLL (Selected Work)
   --------------------------------------------------------------------- */
function bootHorizontalScroll() {
  if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  const isDesktop = window.matchMedia("(min-width: 821px)");
  let workCtx;

  function initScrollTrigger(e) {
    if (workCtx) workCtx.revert();
    if (!e.matches) return;

    workCtx = gsap.context(() => {
      const workSection = document.querySelector(".work");
      const horizontalWrap = document.querySelector(".work__horizontal-wrap");
      if (!workSection || !horizontalWrap) return;

      // Dynamic calculation getter function to prevent resize jumps
      const getScrollAmount = () => horizontalWrap.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(horizontalWrap, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: ".work",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        }
      });

      // Dynamic Parallax effect on images
      gsap.utils.toArray(".work-card__media img").forEach(img => {
        gsap.fromTo(img, {
          xPercent: -8,
        }, {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".work__slide"),
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });
    });
  }

  isDesktop.addEventListener("change", initScrollTrigger);
  initScrollTrigger(isDesktop);
}

/* ---------------------------------------------------------------------
   UPGRADED THREE.JS WEBGL GLOW BLOB & PARTICLES
   --------------------------------------------------------------------- */
function bootThreeScene() {
  const canvas = document.querySelector("#webgl");
  if (
    !canvas ||
    typeof THREE === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    prefersReducedMotion
  )
    return;

  const vertexShaderSource = `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    float getDisplacement(vec3 p) {
      float d = sin(p.x * 2.5 + uTime * 0.8) * cos(p.y * 2.0 + uTime * 0.6) * 0.15;
      d += sin(p.z * 1.8 - uTime * 0.5) * 0.1;
      return d;
    }
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      
      float displacement = getDisplacement(position);
      vec3 newPosition = position + normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShaderSource = `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
      
      vec3 colorBlue = vec3(0.31, 0.44, 0.91);   
      vec3 colorOrange = vec3(1.0, 0.36, 0.13); 
      vec3 colorLime = vec3(0.71, 1.0, 0.25);   
      
      vec3 finalGrad = mix(colorBlue, colorOrange, vNormal.x * 0.5 + 0.5);
      finalGrad = mix(finalGrad, colorLime, sin(uTime * 0.3) * 0.3 + 0.3);
      
      vec3 outputColor = finalGrad + vec3(fresnel * 0.7);
      
      gl_FragColor = vec4(outputColor, 0.15 + fresnel * 0.75);
    }
  `;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  const geometry = new THREE.IcosahedronGeometry(1.6, 48);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    uniforms: {
      uTime: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  // Surrounded particles
  const starsCount = 450;
  const starsGeometry = new THREE.BufferGeometry();
  const starsPositions = new Float32Array(starsCount * 3);
  const starsSpeeds = [];

  for (let i = 0; i < starsCount * 3; i += 3) {
    const radius = 2.0 + Math.random() * 8.0;
    const angle = Math.random() * Math.PI * 2;
    starsPositions[i] = Math.cos(angle) * radius;
    starsPositions[i + 1] = (Math.random() - 0.5) * 6.0;
    starsPositions[i + 2] = Math.sin(angle) * radius;

    starsSpeeds.push({
      radius,
      angle,
      speed: 0.05 + Math.random() * 0.12
    });
  }

  starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xfaf8f5,
    size: 0.024,
    transparent: true,
    opacity: 0.6,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0xffffff, 0.2));

  const handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", handleResize, { passive: true });

  let targetMouseX = 0, targetMouseY = 0;
  let currentMouseX = 0, currentMouseY = 0;

  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
    targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 1.2;
  }, { passive: true });

  /* Section-by-Section Precise WebGL Blob Choreography */
  // Transition to profile
  gsap.to(orb.position, {
    x: 1.8, y: 0.2, z: 0,
    scrollTrigger: {
      trigger: ".manifesto",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    }
  });
  gsap.to(orb.scale, {
    x: 0.8, y: 0.8, z: 0.8,
    scrollTrigger: {
      trigger: ".manifesto",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    }
  });

  // Transition to work
  gsap.to(orb.position, {
    x: -1.6, y: -0.2, z: -1,
    scrollTrigger: {
      trigger: ".work",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    }
  });
  gsap.to(orb.scale, {
    x: 1.1, y: 1.1, z: 1.1,
    scrollTrigger: {
      trigger: ".work",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    }
  });

  // Transition to footer
  gsap.to(orb.position, {
    x: 0, y: -1.2, z: 1,
    scrollTrigger: {
      trigger: ".footer",
      start: "top bottom",
      end: "top center",
      scrub: 1,
    }
  });
  gsap.to(orb.scale, {
    x: 2.2, y: 2.2, z: 2.2,
    scrollTrigger: {
      trigger: ".footer",
      start: "top bottom",
      end: "top center",
      scrub: 1,
    }
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const elapsed = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsed;

    orb.rotation.y = elapsed * 0.15;
    orb.rotation.z = elapsed * 0.08;

    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;
    orb.position.x += currentMouseX * 0.015;
    orb.position.y += currentMouseY * 0.015;

    // Vortex animation & velocity-based scale stretch
    const velocity = lenisInstance ? lenisInstance.velocity : 0;
    stars.scale.y = 1.0 + Math.min(Math.abs(velocity) * 0.008, 1.5);

    const positions = starsGeometry.attributes.position.array;
    for (let i = 0; i < starsCount; i++) {
      const idx = i * 3;
      const star = starsSpeeds[i];
      star.angle += star.speed * 0.03;
      positions[idx] = Math.cos(star.angle) * star.radius + currentMouseX * 0.25;
      positions[idx + 2] = Math.sin(star.angle) * star.radius + currentMouseY * 0.25;
    }
    starsGeometry.attributes.position.needsUpdate = true;
    stars.rotation.y = -elapsed * 0.02;

    renderer.render(scene, camera);
  });
}

/* ---------------------------------------------------------------------
   ADDITIONAL SCROLL REVEALS & COMPONENT MICRO-ANIMATIONS
   --------------------------------------------------------------------- */
function splitTextIntoSpans(element) {
  const text = element.textContent.trim();
  const words = text.split(/\s+/);
  const fragment = document.createDocumentFragment();
  
  words.forEach((word, wordIndex) => {
    // Create inline-block container for the word to protect word wrap
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    
    [...word].forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.display = "inline-block";
      wordSpan.appendChild(charSpan);
    });
    
    fragment.appendChild(wordSpan);
    
    // Add normal breakable space between words
    if (wordIndex < words.length - 1) {
      const spaceNode = document.createTextNode(" ");
      fragment.appendChild(spaceNode);
    }
  });
  
  element.replaceChildren(fragment);
  return element.querySelectorAll("span > span"); // Return target characters to animate
}

function bootScrollTriggers() {
  if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  document.querySelectorAll(".reveal-text").forEach((element) => {
    const spans = splitTextIntoSpans(element);
    gsap.to(spans, {
      color: "#FAF8F5", 
      stagger: 0.012,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 35%",
        scrub: 0.8,
      },
    });
  });

  gsap.to(".marquee__track:not(.marquee__track--reverse)", {
    xPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  gsap.to(".marquee__track--reverse", {
    xPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  gsap.fromTo(".feature__media", 
    { clipPath: "inset(12% 8% round 32px)", scale: 0.95 },
    {
      clipPath: "inset(0% 0% round 0px)",
      scale: 1,
      scrollTrigger: {
        trigger: ".feature",
        start: "top 80%",
        end: "top 10%",
        scrub: 1,
      }
    }
  );

  document.querySelectorAll(".process-step").forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 75%",
      onEnter: () => step.classList.add("active"),
      onLeaveBack: () => step.classList.remove("active"),
    });
  });

  const backToTop = document.querySelector(".footer__copyright span:last-child");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
}

/* ---------------------------------------------------------------------
   INITIALIZATION
   --------------------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  bootPreloader();
  bootSmoothScroll();
  bootCursor();
  boot3DTilt();
  bootHorizontalScroll();
  bootThreeScene();
  bootScrollTriggers();
});
