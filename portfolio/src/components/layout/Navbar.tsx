"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { scrollTo } from "@/hooks/useSmoothScroll";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionObserver = () => {
      const sections = NAV_ITEMS.map((item) =>
        document.querySelector(item.href)
      ).filter(Boolean);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((section) => section && observer.observe(section));
      return () => observer.disconnect();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const cleanup = handleSectionObserver();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup?.();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollTo(href);
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 backdrop-blur-2xl bg-[rgba(10,10,10,0.8)] border-b border-[rgba(255,255,255,0.06)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="relative z-10 flex items-center gap-1"
          >
            <span className="font-[var(--font-display)] text-xl font-extrabold tracking-tight text-text-primary">
              PRINCE
            </span>
            <span className="font-[var(--font-display)] text-xl font-extrabold tracking-tight gradient-text-static">
              .
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative py-2 text-sm font-medium tracking-wide text-text-secondary hover:text-text-primary transition-colors duration-300 group"
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    activeSection === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden md:inline-flex btn-primary !py-3 !px-6 !text-xs"
            >
              <span>Let&apos;s Talk</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center z-[1001]"
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-6 h-4">
                <span
                  className={`absolute left-0 h-[1.5px] bg-text-primary transition-all duration-300 ${
                    isMobileOpen
                      ? "top-1/2 w-6 -rotate-45"
                      : "top-0 w-6"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[1.5px] bg-text-primary transition-all duration-300 ${
                    isMobileOpen ? "opacity-0 w-0" : "opacity-100 w-4"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] bg-text-primary transition-all duration-300 ${
                    isMobileOpen
                      ? "top-1/2 w-6 rotate-45"
                      : "bottom-0 w-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] bg-bg/95 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="heading-section text-text-primary hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.1, duration: 0.5 }}
                className="btn-primary mt-4"
              >
                <span>Let&apos;s Talk</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
