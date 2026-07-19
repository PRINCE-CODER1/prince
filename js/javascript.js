gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 761px)").matches;

if (typeof Lenis !== "undefined" && !prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 0.9,
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const cursor = document.querySelector(".cursor");
const main = document.querySelector(".main");

if (cursor && main && isDesktop && !prefersReducedMotion) {
  const setX = gsap.quickSetter(cursor, "x", "px");
  const setY = gsap.quickSetter(cursor, "y", "px");
  let cursorX = 0;
  let cursorY = 0;
  let ticking = false;

  main.addEventListener(
    "pointermove",
    (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      if (!ticking) {
        requestAnimationFrame(() => {
          setX(cursorX);
          setY(cursorY);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
} else if (cursor) {
  cursor.hidden = true;
}

function splitText(selector) {
  const element = document.querySelector(selector);
  if (!element) return [];

  const fragment = document.createDocumentFragment();
  [...element.textContent].forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    fragment.appendChild(span);
  });

  element.replaceChildren(fragment);
  return element.querySelectorAll("span");
}

if (!prefersReducedMotion) {
  const hero = gsap.timeline({
    scrollTrigger: {
      trigger: ".page-1",
      start: "top top",
      end: "bottom top",
      scrub: 0.7,
      pin: true,
      anticipatePin: 1,
    },
    defaults: { ease: "none" },
  });

  hero
    .to("#img-1", { xPercent: 18 }, "hero")
    .to("#img-2", { xPercent: -18 }, "hero")
    .to("#img-3", { xPercent: 22 }, "hero")
    .to("#img-4", { xPercent: -22 }, "hero")
    .to("#fence-img-1", { xPercent: 10 }, "hero")
    .to("#fence-img-2", { xPercent: -10 }, "hero")
    .to("#fence-img-3", { x: () => window.innerWidth * 1.05, filter: "brightness(20%)" }, "hero")
    .to("#fence-img-4, #fence-img-7", { yPercent: -50 }, "hero")
    .to("#fence-img-5, #fence-img-9", { yPercent: -44, xPercent: 8 }, "hero")
    .to("#fence-img-6", { yPercent: -62 }, "hero")
    .to("#fence-img-8", { yPercent: -50, xPercent: 4 }, "hero")
    .to("#fence-img-10", { yPercent: -60, xPercent: -2, scale: 1.1 }, "hero")
    .to(".page-1-img img", { scale: 1.12 }, "hero")
    .to(".planet img", { yPercent: -45, rotate: 30 }, "hero")
    .to(".meteor img", { y: () => window.innerHeight * 1.5, x: () => -window.innerWidth * 1.4 }, "hero")
    .to(".landing-para", { y: -160, opacity: 1 }, "hero");

  gsap.to(".strategy", {
    backgroundColor: "#fff",
    scrollTrigger: {
      trigger: ".strategy",
      start: "bottom 20%",
      end: "bottom top",
      scrub: 0.7,
    },
  });

  gsap.to(".strat-1 h1", {
    color: "#000",
    scrollTrigger: {
      trigger: ".strategy",
      start: "top top",
      end: "bottom -40%",
      scrub: 0.7,
    },
  });

  gsap.to(".strategy svg", {
    xPercent: 680,
    rotate: 90,
    color: "#000",
    scrollTrigger: {
      trigger: ".strategy",
      start: "top top",
      end: "bottom -40%",
      scrub: 0.7,
    },
  });

  gsap.to(".name", {
    y: -40,
    scrollTrigger: {
      start: "30% 10%",
      end: "top top",
      scrub: 0.7,
    },
  });

  [".part-1>p", ".part-3>p"].forEach((selector) => {
    const letters = splitText(selector);
    gsap.to(letters, {
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        end: "bottom top",
        scrub: 1,
      },
      color: "#fff",
      stagger: 0.02,
    });
  });

  const marquee = gsap.timeline({
    scrollTrigger: {
      trigger: ".part-2",
      start: "top 90%",
      end: "bottom top",
      scrub: 0.3,
    },
    defaults: { ease: "none" },
  });

  marquee.to(".stripe-l", { xPercent: -16 }, "loop").to(".stripe-r", { xPercent: 20 }, "loop");

  const zoom = gsap.timeline({
    scrollTrigger: {
      trigger: ".zooming",
      start: "50% 50%",
      end: "150% 50%",
      scrub: 0.7,
      pin: true,
      anticipatePin: 1,
    },
  });

  zoom
    .to(".top-cnt", { rotateX: 110, opacity: 0, duration: 1.5 }, "rotate")
    .to(".btm-cnt", { rotateX: -110, opacity: 0, duration: 1.5 }, "rotate")
    .to(".img", { width: "100%", height: "100%", borderRadius: 0, duration: 5 }, "rotate");
} else {
  document.querySelector(".landing-para")?.style.setProperty("opacity", "1");
}

if (cursor && isDesktop) {
  document.querySelectorAll(".hov-1").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const image = item.getAttribute("data-image");
      cursor.style.width = "300px";
      cursor.style.height = "300px";
      cursor.style.borderRadius = "0";
      cursor.style.backgroundImage = `url(${image})`;
    });

    item.addEventListener("mouseleave", () => {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      cursor.style.borderRadius = "50%";
      cursor.style.backgroundImage = "none";
    });
  });
}
