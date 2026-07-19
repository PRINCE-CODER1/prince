const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function bootSmoothScroll() {
  if (
    prefersReducedMotion ||
    typeof Lenis === "undefined" ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  )
    return;

  const lenis = new Lenis({
    duration: 0.95,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.15,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function bootCursor() {
  const cursor = document.querySelector(".cursor");
  if (
    !cursor ||
    !isFinePointer ||
    prefersReducedMotion ||
    typeof gsap === "undefined"
  ) {
    if (cursor) cursor.hidden = true;
    return;
  }

  const setX = gsap.quickSetter(cursor, "x", "px");
  const setY = gsap.quickSetter(cursor, "y", "px");
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  window.addEventListener(
    "pointermove",
    (event) => {
      x = event.clientX;
      y = event.clientY;
    },
    { passive: true },
  );

  gsap.ticker.add(() => {
    setX(x);
    setY(y);
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      gsap.to(element, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.25,
        y: (event.clientY - rect.top - rect.height / 2) * 0.25,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    element.addEventListener("pointerleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.35)",
      });
    });
  });

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cursor.style.width = "280px";
      cursor.style.height = "180px";
      cursor.style.borderRadius = "24px";
      cursor.style.backgroundImage = `url(${card.dataset.image})`;
    });

    card.addEventListener("mouseleave", () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.borderRadius = "50%";
      cursor.style.backgroundImage = "none";
    });
  });
}

function splitLetters(element) {
  const fragment = document.createDocumentFragment();
  [...element.textContent].forEach((character) => {
    const span = document.createElement("span");
    span.textContent = character;
    fragment.appendChild(span);
  });
  element.replaceChildren(fragment);
  return element.querySelectorAll("span");
}

function bootMotion() {
  if (
    prefersReducedMotion ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  )
    return;

  gsap.from(".site-nav", {
    y: -40,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".hero h1 span", {
    yPercent: 115,
    rotate: 2,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 1.2,
    ease: "power4.out",
  });
  gsap.from(".hero__footer, .hero__metrics", {
    y: 28,
    autoAlpha: 0,
    delay: 0.45,
    duration: 1,
    ease: "power3.out",
  });

  gsap.to(".hero__backdrop img", {
    scale: 1.16,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  document.querySelectorAll(".reveal-text").forEach((element) => {
    gsap.to(splitLetters(element), {
      color: "#f5efe6",
      stagger: 0.01,
      scrollTrigger: {
        trigger: element,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.8,
      },
    });
  });

  gsap.to(".marquee__track:not(.marquee__track--reverse)", {
    xPercent: -18,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
    },
  });

  gsap.to(".marquee__track--reverse", {
    xPercent: 14,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
    },
  });

  gsap.utils
    .toArray(".manifesto article, .work-card, .process__steps div")
    .forEach((element) => {
      gsap.from(element, {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 86%" },
      });
    });

  gsap.from(".feature__media", {
    clipPath: "inset(12% round 42px)",
    scale: 0.94,
    scrollTrigger: {
      trigger: ".feature",
      start: "top 75%",
      end: "center center",
      scrub: 0.8,
    },
  });
}

function bootThreeScene() {
  const canvas = document.querySelector("#webgl");
  if (
    !canvas ||
    typeof THREE === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    prefersReducedMotion
  )
    return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 8;

  const geometry = new THREE.IcosahedronGeometry(1.75, 3);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6f3d,
    roughness: 0.42,
    metalness: 0.28,
    wireframe: true,
  });
  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        Array.from({ length: 900 }, () => (Math.random() - 0.5) * 22),
        3,
      ),
    ),
    new THREE.PointsMaterial({
      color: 0xf5efe6,
      size: 0.018,
      transparent: true,
      opacity: 0.72,
    }),
  );
  scene.add(stars);
  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const light = new THREE.DirectionalLight(0x7f9cff, 2.3);
  light.position.set(3, 4, 5);
  scene.add(light);

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  let scrollProgress = 0;
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      scrollProgress = self.progress;
    },
  });

  renderer.setAnimationLoop((time) => {
    const t = time * 0.001;
    orb.rotation.x = t * 0.18 + scrollProgress * 2.2;
    orb.rotation.y = t * 0.26;
    orb.position.y = Math.sin(t * 0.7) * 0.18;
    stars.rotation.y = t * 0.025;
    renderer.render(scene, camera);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  bootSmoothScroll();
  bootCursor();
  bootMotion();
  bootThreeScene();
});
