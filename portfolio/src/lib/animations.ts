// ─── Animation Utilities & GSAP Presets ────────────────────────────────────
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium easing curves (Apple / Linear feel)
export const EASE = {
  smooth: "power3.out",
  smoothInOut: "power3.inOut",
  snap: "power4.out",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  bounce: "back.out(1.7)",
} as const;

// Scroll-triggered fade-up animation
export function fadeUp(
  element: string | Element | Element[],
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    trigger?: string | Element;
    start?: string;
    stagger?: number;
  } = {}
) {
  const {
    duration = 1,
    delay = 0,
    y = 60,
    trigger,
    start = "top 85%",
    stagger = 0.1,
  } = options;

  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: EASE.smooth,
    stagger,
    scrollTrigger: trigger
      ? {
          trigger: trigger,
          start,
          toggleActions: "play none none reverse",
        }
      : undefined,
  });
}

// Scroll-triggered fade-in animation
export function fadeIn(
  element: string | Element | Element[],
  options: {
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
  } = {}
) {
  const { duration = 1, delay = 0, trigger, start = "top 85%" } = options;

  return gsap.from(element, {
    opacity: 0,
    duration,
    delay,
    ease: EASE.smooth,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          toggleActions: "play none none reverse",
        }
      : undefined,
  });
}

// Text split + reveal animation
export function splitTextReveal(
  element: string | Element,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    trigger?: string | Element;
  } = {}
) {
  const { duration = 0.8, stagger = 0.04, delay = 0, trigger } = options;
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || "";
  el.textContent = "";

  const words = text.split(" ");
  words.forEach((word, i) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";

    wrapper.appendChild(inner);
    el.appendChild(wrapper);
  });

  const innerSpans = el.querySelectorAll("span > span");

  return gsap.from(innerSpans, {
    y: "110%",
    rotateX: -10,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: EASE.smooth,
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      : undefined,
  });
}

// Stagger children animation
export function staggerReveal(
  parent: string | Element,
  childSelector: string,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    trigger?: string | Element;
  } = {}
) {
  const { duration = 0.8, stagger = 0.15, y = 40, trigger } = options;

  const parentEl =
    typeof parent === "string" ? document.querySelector(parent) : parent;
  if (!parentEl) return;

  const children = parentEl.querySelectorAll(childSelector);

  return gsap.from(children, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: EASE.smooth,
    scrollTrigger: trigger
      ? {
          trigger: trigger || parentEl,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      : undefined,
  });
}

// Parallax effect
export function parallax(
  element: string | Element,
  options: {
    speed?: number;
    trigger?: string | Element;
  } = {}
) {
  const { speed = 0.3, trigger } = options;

  return gsap.to(element, {
    y: () => `${speed * 100}%`,
    ease: "none",
    scrollTrigger: {
      trigger: (trigger || element) as string | Element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

// Horizontal scroll pin
export function horizontalScroll(
  container: string | Element,
  wrapper: string | Element
) {
  const containerEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;
  if (!containerEl) return;

  const totalWidth = (containerEl as HTMLElement).scrollWidth;
  const viewWidth = window.innerWidth;

  return gsap.to(container, {
    x: -(totalWidth - viewWidth),
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: `+=${totalWidth - viewWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
}

// Count-up animation
export function countUp(
  element: string | Element,
  target: number,
  options: {
    duration?: number;
    trigger?: string | Element;
    suffix?: string;
  } = {}
) {
  const { duration = 2, trigger, suffix = "" } = options;
  const obj = { val: 0 };

  return gsap.to(obj, {
    val: target,
    duration,
    ease: EASE.smooth,
    onUpdate: () => {
      const el =
        typeof element === "string"
          ? document.querySelector(element)
          : element;
      if (el) {
        el.textContent = Math.round(obj.val) + suffix;
      }
    },
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      : undefined,
  });
}
