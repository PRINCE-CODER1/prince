/* ═══════════════════════════════════════════════════════════════════════════
   VEDA CARE — Main Engine & SPA State Router
   ═══════════════════════════════════════════════════════════════════════════ */

(function() {
  "use strict";

  // Register GSAP Plugins
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch(e) {
    console.warn("GSAP plugins failed to register:", e);
  }
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── 0. PRODUCT DATABASE ─────────────────────────────────────────────── */
  const productsDB = {
    'prod_ashwa': {
      id: 'prod_ashwa',
      name: 'Ashwagandha Gold',
      price: 35.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'The ultimate adaptogen formula. Clinically proven to reduce cortisol levels, ease stress, and boost physical stamina naturally. Formulated with KSM-66® pure root extract.',
      bullets: ['Lowers cortisol and manages stress.', 'Improves sleep quality and duration.', 'Enhances muscle strength and recovery.']
    },
    'prod_triphala': {
      id: 'prod_triphala',
      name: 'Triphala Extract',
      price: 28.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Gentle daily detox, digestion support, and colon cleanse. Formulated with equal parts Amalaki, Bibhitaki, and Haritaki.',
      bullets: ['Relieves constipation naturally.', 'Improves gut health and digestion.', 'Rich in Vitamin C and antioxidants.']
    },
    'prod_brahmi': {
      id: 'prod_brahmi',
      name: 'Brahmi Mind Focus',
      price: 42.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Enhances memory, cognitive function, and mental clarity. A premium nootropic herb used for centuries by scholars and meditators.',
      bullets: ['Improves focus and concentration.', 'Reduces brain fog.', 'Calms the nervous system.']
    },
    'prod_liver': {
      id: 'prod_liver',
      name: 'Liver Shield (Kutki)',
      price: 48.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Premium liver detox and regeneration formula. Protects the liver from toxins and supports healthy bile production.',
      bullets: ['Detoxifies the liver naturally.', 'Supports healthy metabolism.', 'Improves skin health.']
    }
  };

  /* ─── 1. CUSTOM CURSOR ─────────────────────────────────────────────────── */
  function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    // Expand cursor on hovering links
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.interactive-link') || e.target.closest('a') || e.target.closest('button')) {
        cursor.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.interactive-link') || e.target.closest('a') || e.target.closest('button')) {
        cursor.classList.remove('hover');
      }
    });
  }

  /* ─── 2. PRELOADER ──────────────────────────────────────────────────────── */
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.preloader__progress');
    
    if (!preloader) {
      document.body.classList.remove('loading');
      return;
    }

    try {
      let percent = 0;
      const interval = setInterval(() => {
        percent += Math.random() * 25;
        if (percent >= 100) {
          percent = 100;
          clearInterval(interval);
          setTimeout(() => {
            document.body.classList.remove('loading');
            try {
              handleRouting();
            } catch(routeErr) {
              console.error("Routing error on load:", routeErr);
            }
          }, 500);
        }
        if (progress) progress.style.width = percent + '%';
      }, 80);
    } catch(e) {
      document.body.classList.remove('loading');
      console.error("Preloader thread crashed, fallback to load:", e);
    }
  }

  /* ─── 3. SMOOTH SCROLL (LENIS) ──────────────────────────────────────────── */
  let lenis;
  function initLenis() {
    if (isReducedMotion) return;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch(e) {
      console.warn("Lenis library failed to initialize:", e);
    }
  }

  /* ─── 4. CART MANAGER STATE ─────────────────────────────────────────────── */
  class CartManager {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('vedaCart')) || [];
      this.updateUI();
    }

    save() {
      localStorage.setItem('vedaCart', JSON.stringify(this.items));
      this.updateUI();
    }

    add(id, name, price, img, quantity = 1) {
      const existing = this.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ id, name, price, img, quantity });
      }
      this.save();
      document.body.classList.add('cart-open');
    }

    remove(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.save();
    }

    updateQuantity(id, change) {
      const item = this.items.find(i => i.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) this.remove(id);
        else this.save();
      }
    }

    updateUI() {
      const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });

      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Update Drawers
      document.querySelectorAll('.cart-drawer__items, .full-cart-items').forEach(container => {
        if (this.items.length === 0) {
          container.innerHTML = '<p style="padding: 24px; text-align: center; color: var(--c-text-lt);">Your cart is empty.</p>';
          return;
        }

        container.innerHTML = this.items.map(item => `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__info">
              <h4>${item.name}</h4>
              <div class="cart-item__price">$${item.price.toFixed(2)}</div>
              <div class="qty-control mt-2">
                <button type="button" class="interactive-link" onclick="window.cart.updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button type="button" class="interactive-link" onclick="window.cart.updateQuantity('${item.id}', 1)">+</button>
              </div>
            </div>
            <button class="btn-remove interactive-link" onclick="window.cart.remove('${item.id}')" title="Remove">×</button>
          </div>
        `).join('');
      });

      document.querySelectorAll('.cart-subtotal').forEach(el => {
        el.textContent = '$' + total.toFixed(2);
      });
      
      // Update Checkout totals
      const checkoutTotalEl = document.getElementById('checkout-total');
      if (checkoutTotalEl) {
        const shipping = total > 50 || total === 0 ? 0 : 10;
        const grandTotal = total + shipping;
        
        document.getElementById('checkout-subtotal').textContent = '$' + total.toFixed(2);
        document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
        checkoutTotalEl.textContent = '$' + grandTotal.toFixed(2);
      }
    }
  }

  /* ─── 5. DYNAMIC VIEWS ROUTER ───────────────────────────────────────────── */
  let activeViewId = 'view-home';

  function handleRouting() {
    const hash = window.location.hash || '#home';
    let targetViewId = 'view-home';
    let productId = null;

    if (hash.startsWith('#shop')) {
      targetViewId = 'view-shop';
    } else if (hash.startsWith('#product')) {
      targetViewId = 'view-product-detail';
      const parts = hash.split('?id=');
      if (parts.length > 1) productId = parts[1];
    } else if (hash.startsWith('#book')) {
      targetViewId = 'view-book';
    } else if (hash.startsWith('#checkout')) {
      targetViewId = 'view-checkout';
    } else if (hash.startsWith('#success')) {
      targetViewId = 'view-success';
    }

    if (targetViewId === 'view-product-detail' && productId) {
      populateProductDetail(productId);
    } else if (targetViewId === 'view-shop') {
      populateShopGrid();
    }

    switchView(targetViewId);
  }

  function switchView(targetViewId) {
    if (activeViewId === targetViewId && document.getElementById(activeViewId).classList.contains('active')) return;

    const currentView = document.getElementById(activeViewId);
    const targetView = document.getElementById(targetViewId);

    if (isReducedMotion) {
      if (currentView) currentView.classList.remove('active');
      targetView.classList.add('active');
      activeViewId = targetViewId;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      return;
    }

    // Scroll back to top before swapping
    if (lenis) lenis.scrollTo(0, { immediate: true });

    const tl = gsap.timeline({
      onComplete: () => {
        if (currentView) currentView.classList.remove('active');
        targetView.classList.add('active');
        activeViewId = targetViewId;
        
        // Refresh triggers
        ScrollTrigger.refresh();
        
        // Fade in target view
        gsap.to(targetView, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });

    if (currentView) {
      tl.to(currentView, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    } else {
      tl.play();
    }
  }

  /* ─── 6. DYNAMIC BUILDERS ───────────────────────────────────────────────── */
  function populateShopGrid() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    grid.innerHTML = Object.values(productsDB).map(prod => `
      <div class="product-card glass-card reveal-up">
        <div class="product-img-wrap">
          <a href="#product?id=${prod.id}" class="interactive-link"><img src="${prod.img}" alt="${prod.name}" class="product-img"></a>
        </div>
        <div class="product-content">
          <h3 class="product-title"><a href="#product?id=${prod.id}" class="interactive-link">${prod.name}</a></h3>
          <p class="product-desc">${prod.desc}</p>
          <div class="product-meta">
            <span class="price">$${prod.price.toFixed(2)}</span>
            <button class="btn-add-cart interactive-link" onclick="window.cart.add('${prod.id}', '${prod.name}', ${prod.price}, '${prod.img}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function populateProductDetail(id) {
    const prod = productsDB[id];
    if (!prod) return;

    document.getElementById('dyn-prod-breadcrumb').textContent = prod.name;
    document.getElementById('dyn-prod-title').textContent = prod.name;
    document.getElementById('dyn-prod-price').textContent = '$' + prod.price.toFixed(2);
    document.getElementById('dyn-prod-desc').textContent = prod.desc;
    document.getElementById('main-product-img').src = prod.img;

    const addBtn = document.getElementById('dyn-prod-add-btn');
    if (addBtn) {
      addBtn.onclick = () => {
        window.cart.add(prod.id, prod.name, prod.price, prod.img);
      };
    }
  }

  /* ─── 7. BOOKING CALENDAR SYSTEM ────────────────────────────────────────── */
  function initBookingCalendar() {
    const days = document.querySelectorAll('.cal-day-pick');
    const slots = document.querySelectorAll('.slot-btn');

    days.forEach(day => {
      day.addEventListener('click', () => {
        days.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
      });
    });

    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        slots.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
      });
    });

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fname = document.getElementById('bk-fname').value;
        const lname = document.getElementById('bk-lname').value;
        const email = document.getElementById('bk-email').value;

        // Store consult details
        const consultData = {
          name: `${fname} ${lname}`,
          email: email
        };
        localStorage.setItem('vedaConsultData', JSON.stringify(consultData));
        
        // Show success screen with custom text
        document.getElementById('success-message').innerHTML = `Your Video Consultation with Dr. Sharma has been scheduled for <strong>August 5, 2026 at 10:30 AM</strong>.`;
        document.getElementById('success-details').innerHTML = `
          <div class="glass-card p-3 border mb-5 text-left">
            <h3 class="mb-3">Appointment Info</h3>
            <p><strong>Name:</strong> ${consultData.name}</p>
            <p><strong>Email:</strong> ${consultData.email}</p>
            <p><strong>Platform:</strong> Zoom Video Link sent to email</p>
          </div>
        `;
        window.location.hash = '#success';
      });
    }
  }

  /* ─── 8. CHECKOUT SECURE SYSTEM ─────────────────────────────────────────── */
  function initCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fname = document.getElementById('chk-fname').value;
        const lname = document.getElementById('chk-lname').value;
        const address = document.getElementById('chk-address').value;
        const city = document.getElementById('chk-city').value;
        const card = document.getElementById('chk-card').value;

        const last4 = card.length >= 4 ? card.slice(-4) : 'XXXX';

        const orderData = {
          name: `${fname} ${lname}`,
          address: `${address}, ${city}`,
          card: last4
        };
        localStorage.setItem('vedaOrderData', JSON.stringify(orderData));

        // Show loading state
        const btn = checkoutForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Processing Securely...';
          btn.disabled = true;
          btn.style.opacity = '0.6';
        }

        setTimeout(() => {
          // Clear cart
          window.cart.items = [];
          window.cart.save();

          // Load success view details
          document.getElementById('success-message').innerHTML = `Your order <strong>#VC-9831</strong> has been placed successfully.`;
          document.getElementById('success-details').innerHTML = `
            <div class="glass-card p-3 border mb-5 text-left">
              <h3 class="mb-3">Delivery Information</h3>
              <p><strong>Name:</strong> ${orderData.name}</p>
              <p><strong>Shipping to:</strong> ${orderData.address}</p>
              <p><strong>Payment Card:</strong> Visa ending in ${orderData.card}</p>
            </div>
          `;
          
          btn.textContent = 'Complete Secure Order';
          btn.disabled = false;
          btn.style.opacity = '1';
          
          window.location.hash = '#success';
        }, 1500);
      });
    }
  }

  /* ─── 9. GSAP SCROLL TRIGGERS ───────────────────────────────────────────── */
  function initScrollAnimations() {
    if (isReducedMotion) return;

    try {
      // Parallax Hero
      gsap.to(".hero__bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Horizontal scroll ingredients
      const track = document.getElementById('ingredients-track');
      if (track) {
        const getScrollAmount = () => track.scrollWidth - window.innerWidth + 48;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: ".ingredients-scroll-wrapper",
            start: "top 20%",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }
    } catch(e) {
      console.warn("Scroll animation initialization failed:", e);
    }
  }

  /* ─── 10. BOOTSTRAP ─────────────────────────────────────────────────────── */
  function init() {
    try {
      window.cart = new CartManager();
      initCursor();
      initLenis();
      initBookingCalendar();
      initCheckoutForm();
      initScrollAnimations();
    } catch(err) {
      console.error("Bootstrap sequence failed:", err);
    } finally {
      initPreloader();
    }

    // Hash Navigation Listener
    window.addEventListener('hashchange', handleRouting);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
