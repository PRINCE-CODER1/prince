/* ═══════════════════════════════════════════════════════════════════════════
   VEDA CARE — Main JavaScript
   Libraries: GSAP, ScrollTrigger, Lenis
   ═══════════════════════════════════════════════════════════════════════════ */

(function() {
  "use strict";

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── 0. CART MANAGER ───────────────────────────────────────────────────── */
  class CartManager {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('vedaCart')) || [];
      this.initEventListeners();
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
      // Update Badges
      const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });

      // Update Drawers/Cart Pages
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
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
                <button type="button" onclick="window.cart.updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="window.cart.updateQuantity('${item.id}', 1)">+</button>
              </div>
            </div>
            <button class="btn-remove" onclick="window.cart.remove('${item.id}')" title="Remove">×</button>
          </div>
        `).join('');
      });

      document.querySelectorAll('.cart-drawer__total span:last-child, .cart-subtotal').forEach(el => {
        el.textContent = '$' + total.toFixed(2);
      });
      
      // Update checkout totals if they exist
      const checkoutTotalEl = document.getElementById('checkout-total');
      if (checkoutTotalEl) {
        const tax = total * 0.05; // 5% tax
        const shipping = total > 50 ? 0 : 10;
        const grandTotal = total + tax + shipping;
        
        document.getElementById('checkout-subtotal').textContent = '$' + total.toFixed(2);
        document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
        document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
        checkoutTotalEl.textContent = '$' + grandTotal.toFixed(2);
      }
    }

    initEventListeners() {
      // Listen for "Add to Cart" button clicks dynamically
      document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-cart')) {
          const btn = e.target.closest('.btn-add-cart');
          const id = btn.getAttribute('data-id') || 'prod_' + Math.random().toString(36).substr(2, 9);
          const name = btn.getAttribute('data-name') || 'Ayurvedic Product';
          const price = parseFloat(btn.getAttribute('data-price')) || 0.00;
          const img = btn.getAttribute('data-img') || 'images/herbs_collection_1784539652170.png';
          
          let qty = 1;
          const qtyInput = document.getElementById('qty-input');
          if (qtyInput) qty = parseInt(qtyInput.value) || 1;

          this.add(id, name, price, img, qty);
        }
      });
    }
  }

  /* ─── 0.5. PRODUCT DATABASE ─────────────────────────────────────────────── */
  const productsDB = {
    'prod_ashwa': {
      name: 'Ashwagandha Gold',
      price: 35.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'The ultimate adaptogen formula. Clinically proven to reduce cortisol levels, ease stress, and boost physical stamina naturally. Formulated with KSM-66® pure root extract.',
      bullets: ['Lowers cortisol and manages stress.', 'Improves sleep quality and duration.', 'Enhances muscle strength and recovery.'],
      ingredients: [
        { name: 'Organic Ashwagandha Root (500mg)', desc: 'Pure root extract. Sourced from Rajasthan, India.' },
        { name: 'Black Pepper Extract (5mg)', desc: 'Enhances absorption by up to 2000%.' }
      ]
    },
    'prod_triphala': {
      name: 'Triphala Extract',
      price: 28.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Gentle daily detox, digestion support, and colon cleanse. Formulated with equal parts Amalaki, Bibhitaki, and Haritaki.',
      bullets: ['Relieves constipation naturally.', 'Improves gut health and digestion.', 'Rich in Vitamin C and antioxidants.'],
      ingredients: [
        { name: 'Amalaki (Phyllanthus emblica)', desc: 'Cooling antioxidant.' },
        { name: 'Bibhitaki (Terminalia bellirica)', desc: 'Supports respiratory health.' },
        { name: 'Haritaki (Terminalia chebula)', desc: 'The king of medicines for digestion.' }
      ]
    },
    'prod_brahmi': {
      name: 'Brahmi Mind Focus',
      price: 42.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Enhances memory, cognitive function, and mental clarity. A premium nootropic herb used for centuries by scholars and meditators.',
      bullets: ['Improves focus and concentration.', 'Reduces brain fog.', 'Calms the nervous system.'],
      ingredients: [
        { name: 'Brahmi Extract (Bacopa monnieri)', desc: 'Standardized to 20% bacosides.' }
      ]
    },
    'prod_liver': {
      name: 'Liver Shield (Kutki)',
      price: 48.00,
      img: 'images/herbs_collection_1784539652170.png',
      desc: 'Premium liver detox and regeneration formula. Protects the liver from toxins and supports healthy bile production.',
      bullets: ['Detoxifies the liver naturally.', 'Supports healthy metabolism.', 'Improves skin health (reduces acne).'],
      ingredients: [
        { name: 'Kutki (Picrorhiza kurroa)', desc: 'Himalayan herb known for hepatoprotective properties.' },
        { name: 'Bhringraj', desc: 'Rejuvenates the liver.' }
      ]
    }
  };

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

  /* ─── 8. PRODUCT GALLERY & TABS ─────────────────────────────────────────── */
  function initProductDetails() {
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`tab-${tabId}`).classList.add('active');
      });
    });

    // Gallery
    const mainImg = document.getElementById('main-product-img');
    const thumbs = document.querySelectorAll('.thumb');
    
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // Update main image source (simulate swap)
        const newSrc = thumb.querySelector('img').src;
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 300);
      });
    });

    // Populate Dynamic Data from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && productsDB[productId]) {
      const product = productsDB[productId];
      
      // Update DOM
      document.title = product.name + ' | Veda Care';
      document.getElementById('dyn-name').textContent = product.name;
      document.getElementById('dyn-price').textContent = '$' + product.price.toFixed(2);
      document.getElementById('dyn-desc').textContent = product.desc;
      mainImg.src = product.img;
      
      // Update Add to cart button
      const addBtn = document.getElementById('dyn-add-btn');
      if (addBtn) {
        addBtn.setAttribute('data-id', productId);
        addBtn.setAttribute('data-name', product.name);
        addBtn.setAttribute('data-price', product.price);
        addBtn.setAttribute('data-img', product.img);
        addBtn.textContent = `Add to Cart - $${product.price.toFixed(2)}`;
      }

      // Update Bullets
      const bulletList = document.getElementById('dyn-bullets');
      if (bulletList) {
        bulletList.innerHTML = product.bullets.map(b => `<li>${b}</li>`).join('');
      }

      // Update Ingredients
      const ingList = document.getElementById('dyn-ingredients');
      if (ingList) {
        ingList.innerHTML = product.ingredients.map(ing => `
          <div class="ing-item">
            <strong>${ing.name}</strong>
            <p>${ing.desc}</p>
          </div>
        `).join('');
      }
    }
  }

  /* ─── 8.5 CHECKOUT HANDLER ─────────────────────────────────────────────── */
  function initCheckout() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop normal form submit
        
        // Gather data
        const fname = document.getElementById('chk-fname').value;
        const lname = document.getElementById('chk-lname').value;
        const address = document.getElementById('chk-address').value;
        const city = document.getElementById('chk-city').value;
        const card = document.getElementById('chk-card').value;
        
        // Get last 4 digits of card (if long enough)
        const last4 = card.length >= 4 ? card.slice(-4) : 'XXXX';

        // Save order data
        const orderData = {
          name: `${fname} ${lname}`,
          address: `${address}, ${city}`,
          card: last4
        };
        localStorage.setItem('vedaOrderData', JSON.stringify(orderData));
        
        // Redirect
        window.location.href = 'success.html';
      });
    }

    // Load Data on Success Page
    const successDetails = document.getElementById('success-details');
    if (successDetails) {
      const data = JSON.parse(localStorage.getItem('vedaOrderData'));
      if (data) {
        successDetails.innerHTML = `
          <div class="glass-card p-3 border mb-5 text-left">
            <h3 class="mb-3">Shipping Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Payment:</strong> Card ending in ${data.card}</p>
          </div>
        `;
      }
    }
  }

  /* ─── 9. CONSULTATION CALENDAR ──────────────────────────────────────────── */
  function initCalendar() {
    const calDays = document.querySelectorAll('.cal-day:not(.disabled)');
    const slotBtns = document.querySelectorAll('.slot-btn');
    const typeCards = document.querySelectorAll('.c-type-card');
    
    // Day Selection
    calDays.forEach(day => {
      day.addEventListener('click', () => {
        calDays.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
        // In a real app, we would fetch slots for this day here
      });
    });
    
    // Slot Selection
    slotBtns.forEach(slot => {
      slot.addEventListener('click', () => {
        slotBtns.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
      });
    });
    
    // Type Selection
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  /* ─── 10. INIT ALL ──────────────────────────────────────────────────────── */
  function init() {
    window.cart = new CartManager(); // Expose globally for inline onclicks
    initLenis();
    initNav();
    initFAQ();
    initMagnetic();
    initHorizontalScroll();
    initProductDetails();
    initCheckout();
    initCalendar();
    initPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
