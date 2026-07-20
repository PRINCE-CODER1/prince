"use client";

import { SOCIAL_LINKS, NAV_ITEMS, SITE } from "@/lib/constants";
import { motion } from "framer-motion";
import { scrollTo } from "@/hooks/useSmoothScroll";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border" id="footer">
      {/* Huge watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-[var(--font-display)] text-[20vw] font-extrabold text-[rgba(255,255,255,0.02)] whitespace-nowrap leading-none">
          PRINCE
        </span>
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Top section */}
        <div className="py-16 md:py-24 flex flex-col md:flex-row justify-between gap-12">
          {/* Left - Brand */}
          <div className="flex flex-col gap-6 max-w-md">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo(0); }}
              className="inline-block"
            >
              <span className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight">
                PRINCE<span className="gradient-text-static">.</span>
              </span>
            </a>
            <p className="text-body-lg !text-sm !leading-relaxed">
              Crafting cinematic digital experiences that blur the line between art and technology.
              Every pixel, every animation, every interaction — intentional.
            </p>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-kicker mb-2">Navigation</h4>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right - Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-kicker mb-2">Connect</h4>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-300 text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              className="text-text-secondary hover:text-accent transition-colors duration-300 text-sm mt-2"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted tracking-wider uppercase">
            © {new Date().getFullYear()} Prince Kumar. All rights reserved.
          </p>
          <motion.button
            onClick={() => scrollTo(0)}
            whileHover={{ y: -3 }}
            className="text-xs text-text-muted tracking-wider uppercase hover:text-accent transition-colors cursor-pointer"
          >
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
