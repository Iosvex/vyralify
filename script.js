/* ============================================================
   VYRALIFY — FRONTEND INTERACTIVITY & MOTION ENGINE
   ============================================================ */

import { auth, db } from './assets/js/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc, collection, query, where, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCustomCursor();
  initNavbarMotion();
  initMagneticButtons();
  initCard3DTilt();
  initEverythingInsideTabs();
  initSpringAccordions();
  initDragCarousels();
  initOvershootCounters();
  initDashboardMockup();
  initScrollReveals();
  initAuthStateAndLiveData();
  initCookieConsent();
});

/* ============================================================
   1. SCROLL PROGRESS BAR & STICKY NAVBAR
   ============================================================ */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const pct = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${pct}%`;
    }
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   2. CUSTOM CURSOR WITH HOVER SCALE
   ============================================================ */
function initCustomCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  let cursor = document.getElementById('customCursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'customCursor';
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let isActive = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isActive) {
      cursor.classList.add('active');
      isActive = true;
    }
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) ${cursor.classList.contains('hovering') ? 'scale(2.2)' : 'scale(1)'}`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover targets
  const hoverSelector = 'a, button, .btn, .card, .tab-btn, .ai-chip, .faq-header, .incl-toggle, .dash-nav-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.remove('hovering');
    }
  });
}

/* ============================================================
   3. NAVBAR SLIDING PILL UNDERLINE & SCROLLSPY
   ============================================================ */
function initNavbarMotion() {
  const navLinksContainer = document.getElementById('navLinks');
  const pill = document.getElementById('navSliderPill');
  const links = document.querySelectorAll('.nav-link-item');
  if (!navLinksContainer || !links.length) return;

  function movePill(targetEl) {
    if (!pill || !targetEl) {
      if (pill) pill.style.opacity = '0';
      return;
    }
    const containerRect = navLinksContainer.getBoundingClientRect();
    const linkRect = targetEl.getBoundingClientRect();
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;
    pill.style.left = `${left}px`;
    pill.style.width = `${width}px`;
    pill.style.opacity = '1';
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', () => movePill(link));
  });

  navLinksContainer.addEventListener('mouseleave', () => {
    const activeLink = document.querySelector('.nav-link-item.active');
    if (activeLink) movePill(activeLink);
    else if (pill) pill.style.opacity = '0';
  });

  // Scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const isMatch = href.endsWith(`#${currentId}`);
      link.classList.toggle('active', isMatch);
      if (isMatch) movePill(link);
    });
  }, { passive: true });

  // Mobile Drawer
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBurger = document.getElementById('closeBurger');
  const mobileNav = document.getElementById('mobileNav');

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (closeBurger && mobileNav) {
    closeBurger.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

/* ============================================================
   4. MAGNETIC BUTTON HOVER & PRESS FEEDBACK
   ============================================================ */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ============================================================
   5. 3D CARD TILT ON CURSOR MOVE
   ============================================================ */
function initCard3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.card, .feat-card, .why-card, .success-card, .testi-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = -y * 10;
      const rotateY = x * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   6. EVERYTHING INSIDE TABS & SLIDING INDICATOR
   ============================================================ */
const EVERYTHING_INSIDE_DATA = {
  foundation: [
    { title: 'Welcome To Vyralify & Platform Setup', type: 'lesson', icon: 'ph-play-circle' },
    { title: 'Choosing Your High-Demand Instagram Niche', type: 'lesson', icon: 'ph-target' },
    { title: 'Building & Branding Your First Page', type: 'lesson', icon: 'ph-paint-brush' },
    { title: 'Profile Bio & Username Optimisation Framework', type: 'template', icon: 'ph-file-text' },
    { title: 'Instagram Algorithm Rules & Guidelines 2026', type: 'checklist', icon: 'ph-check-square' }
  ],
  content: [
    { title: 'Viral Content Strategies & Reel Hooks', type: 'lesson', icon: 'ph-video-camera' },
    { title: 'High-Retention Video Editing Playbook', type: 'lesson', icon: 'ph-film-strip' },
    { title: 'AI Caption & Hashtag Generator Vault', type: 'template', icon: 'ph-sparkle' },
    { title: 'Trending Audio Library & Weekly Updates', type: 'download', icon: 'ph-music-notes' },
    { title: 'High-Converting Call-To-Action Library', type: 'checklist', icon: 'ph-lightning' }
  ],
  growth: [
    { title: '0 to 100K Followers Organic Growth System', type: 'lesson', icon: 'ph-chart-line-up' },
    { title: 'Daily Reels Posting & Scheduling Calendar', type: 'template', icon: 'ph-calendar' },
    { title: 'Multi-Page Portfolio Scaling Strategy', type: 'lesson', icon: 'ph-stack' },
    { title: 'Analytics & Growth Metric Progress Tracker', type: 'download', icon: 'ph-gauge' },
    { title: 'Top 10 Creator Case Studies & Tear Downs', type: 'lesson', icon: 'ph-book-open' }
  ],
  monetisation: [
    { title: 'Digital Product Launch & Store Setup Guide', type: 'lesson', icon: 'ph-shopping-cart' },
    { title: 'High-Ticket Sales Scripts & DM Funnels', type: 'template', icon: 'ph-chats-teardrop' },
    { title: 'Vyralify 40% Affiliate System Setup', type: 'lesson', icon: 'ph-currency-dollar' },
    { title: 'Brand Sponsorships & Deal Negotiation Deck', type: 'download', icon: 'ph-handshake' },
    { title: 'Automated Email Sales Sequence Templates', type: 'template', icon: 'ph-envelope-simple' }
  ],
  community: [
    { title: 'Creator Introductions & Networking Channel', type: 'lesson', icon: 'ph-users-three' },
    { title: 'Daily Wins, Milestones & Accountability', type: 'checklist', icon: 'ph-trophy' },
    { title: 'Weekly Live Page Reviews & Feedback', type: 'video', icon: 'ph-broadcast' },
    { title: 'General Creator Q&A & Support Feed', type: 'lesson', icon: 'ph-chats' }
  ]
};

function initEverythingInsideTabs() {
  const tabsBar = document.getElementById('tabsBar');
  const panel = document.getElementById('eiListPanel');
  const labelEl = document.getElementById('eiVisualLabel');
  if (!tabsBar || !panel) return;

  // Create sliding pill indicator if missing
  let indicator = tabsBar.querySelector('.tab-sliding-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'tab-sliding-indicator';
    tabsBar.appendChild(indicator);
  }

  function updateTabIndicator(activeBtn) {
    if (!activeBtn) return;
    const barRect = tabsBar.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left = btnRect.left - barRect.left;
    const width = btnRect.width;
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }

  function renderTabContent(categoryKey) {
    const items = EVERYTHING_INSIDE_DATA[categoryKey] || EVERYTHING_INSIDE_DATA.foundation;
    
    // Cross-fade animation
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(10px)';

    setTimeout(() => {
      panel.innerHTML = items.map(item => `
        <div class="ei-list-item">
          <i class="ph-bold ${item.icon}"></i>
          <span>${item.title}</span>
        </div>
      `).join('');

      if (labelEl) {
        const titleMap = {
          foundation: 'Foundation Module',
          content: 'Content & Posting Module',
          growth: 'Scaling & Growth Module',
          monetisation: 'Monetisation Module',
          community: 'Community Module'
        };
        labelEl.textContent = titleMap[categoryKey] || 'Module Overview';
      }

      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    }, 200);
  }

  const buttons = tabsBar.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTabIndicator(btn);
      renderTabContent(btn.dataset.tab);
    });
  });

  // Init default active tab
  const activeInitial = tabsBar.querySelector('.tab-btn.active') || buttons[0];
  if (activeInitial) {
    updateTabIndicator(activeInitial);
    renderTabContent(activeInitial.dataset.tab || 'foundation');
  }

  window.addEventListener('resize', () => {
    const activeCurrent = tabsBar.querySelector('.tab-btn.active');
    if (activeCurrent) updateTabIndicator(activeCurrent);
  }, { passive: true });
}

/* ============================================================
   7. SPRING ACCORDIONS (FAQ & PRICING INCLUDED)
   ============================================================ */
function initSpringAccordions() {
  // Pricing toggle
  const inclToggle = document.getElementById('inclToggle');
  const inclBody = document.getElementById('inclBody');
  if (inclToggle && inclBody) {
    inclToggle.addEventListener('click', () => {
      const isOpen = inclToggle.classList.toggle('open');
      if (isOpen) {
        inclBody.style.height = `${inclBody.scrollHeight}px`;
      } else {
        inclBody.style.height = '0px';
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other accordions
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.height = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        body.style.height = '0px';
      } else {
        item.classList.add('open');
        body.style.height = `${body.scrollHeight}px`;
      }
    });
  });
}

/* ============================================================
   8. DRAG-TO-SCROLL CAROUSELS WITH MOMENTUM & PROGRESS
   ============================================================ */
function initDragCarousels() {
  const scrollers = document.querySelectorAll('.scroller');

  scrollers.forEach(scroller => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const fill = scroller.parentElement?.querySelector('.carousel-progress-fill');

    function updateProgress() {
      if (!fill) return;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll > 0) {
        const pct = (scroller.scrollLeft / maxScroll) * 100;
        fill.style.width = `${Math.max(20, pct)}%`;
      }
    }

    scroller.addEventListener('scroll', updateProgress, { passive: true });

    // Mouse drag
    scroller.addEventListener('mousedown', (e) => {
      isDown = true;
      scroller.classList.add('dragging');
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener('mouseleave', () => {
      isDown = false;
      scroller.classList.remove('dragging');
    });

    scroller.addEventListener('mouseup', () => {
      isDown = false;
      scroller.classList.remove('dragging');
    });

    scroller.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.8;
      scroller.scrollLeft = scrollLeft - walk;
    });

    // Arrow navigation
    const prevBtn = scroller.parentElement?.querySelector('.scroll-btn.prev');
    const nextBtn = scroller.parentElement?.querySelector('.scroll-btn.next');

    prevBtn?.addEventListener('click', () => {
      scroller.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', () => {
      scroller.scrollBy({ left: 320, behavior: 'smooth' });
    });

    updateProgress();
  });
}

/* ============================================================
   9. OVERSHOOT SPRING COUNT-UP STATS
   ============================================================ */
function initOvershootCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function with overshoot spring finish
      let eased = 1 - Math.pow(1 - progress, 3);
      if (progress < 1) {
        eased += Math.sin(progress * Math.PI) * 0.04;
      }

      const val = Math.floor(eased * target);
      el.textContent = `${val.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target.toLocaleString()}${suffix}`;
      }
    }
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => io.observe(c));
}

/* ============================================================
   10. INTERACTIVE DASHBOARD MOCKUP
   ============================================================ */
function initDashboardMockup() {
  const dashWrap = document.getElementById('dashWrap');
  const dashWindow = document.getElementById('dashWindow');
  const bezel = document.querySelector('.dash-bezel-frame');

  function resizeMockup() {
    if (!bezel || !dashWindow) return;
    const isMobile = window.innerWidth <= 850;

    if (isMobile) {
      // Fallback to viewport calculation if clientWidth is 0 during early layout passes
      const bezelWidth = bezel.clientWidth || Math.min(500, window.innerWidth - 24);
      const innerWidth = bezelWidth - 12;
      const scaleFactor = innerWidth / 800;

      dashWindow.style.width = '800px';
      dashWindow.style.height = '480px';
      dashWindow.style.transform = `scale(${scaleFactor})`;
      dashWindow.style.transformOrigin = 'top left';
      dashWindow.style.position = 'absolute';
      dashWindow.style.left = '6px';
      dashWindow.style.top = '6px';

      const scaledHeight = 480 * scaleFactor;
      bezel.style.height = `${scaledHeight + 12}px`;
    } else {
      dashWindow.style.width = '';
      dashWindow.style.height = '';
      dashWindow.style.transform = '';
      dashWindow.style.transformOrigin = '';
      dashWindow.style.position = '';
      dashWindow.style.left = '';
      dashWindow.style.top = '';
      bezel.style.height = '';
    }
  }

  window.addEventListener('resize', resizeMockup);
  // Also call multiple times to guarantee initial rendering
  resizeMockup();
  setTimeout(resizeMockup, 50);
  setTimeout(resizeMockup, 200);

  if (dashWrap && dashWindow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dashWrap.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 850) return;
      const rect = dashWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      dashWindow.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    dashWrap.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 850) return;
      dashWindow.style.transform = '';
    });
  }

  // Sidebar tab switching & dynamic view rendering
  const sidebarItems = document.querySelectorAll('.dash-nav-item');
  const dashMain = document.querySelector('.dash-main');

  const TAB_TEMPLATES = {
    'dashboard': `
      <!-- Dark Hero Banner Card -->
      <div class="dash-hero-banner">
        <div class="banner-watermark">ECOM PRODIGY</div>
        <div class="banner-left">
          <div class="banner-tags">
            <span class="tag tag-active">● Active course</span>
            <span class="tag tag-dfy">Done-For-You</span>
          </div>
          <h3 class="banner-title">EcomProdigy</h3>
          <p class="banner-sub">End-to-end Shopify dropshipping curriculum • 12 modules</p>
          <div class="banner-progress-row">
            <span>Setup progress</span>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 68%;"></div></div>
            <span class="pct-text">68%</span>
          </div>
        </div>
        <div class="banner-right">
          <button class="btn-launch-course">Launch course <i class="ph-bold ph-arrow-up-right"></i></button>
          <span class="rebrand-chip">Rebrand</span>
        </div>
      </div>

      <!-- 4 Stat Metric Cards Row -->
      <div class="dash-stats-row-4">
        <div class="stat-box stat-green">
          <div class="stat-head"><span class="stat-title-wrap"><span class="stat-dot dot-green">●</span> Revenue</span><i class="ph-bold ph-currency-dollar" style="opacity:0.4;"></i></div>
          <div class="stat-num">$48,240</div>
          <div class="stat-change green-txt">↗ +24% vs last week</div>
        </div>
        <div class="stat-box stat-blue">
          <div class="stat-head"><span class="stat-title-wrap"><span class="stat-dot dot-blue">●</span> Orders</span><i class="ph-bold ph-shopping-bag" style="opacity:0.4;"></i></div>
          <div class="stat-num">1,284</div>
          <div class="stat-change blue-txt">↗ +18% vs last week</div>
        </div>
        <div class="stat-box stat-purple">
          <div class="stat-head"><span class="stat-title-wrap"><span class="stat-dot dot-purple">●</span> Visitors</span><i class="ph-bold ph-eye" style="opacity:0.4;"></i></div>
          <div class="stat-num">92,418</div>
          <div class="stat-change purple-txt">↗ +31% vs last week</div>
        </div>
        <div class="stat-box stat-orange">
          <div class="stat-head"><span class="stat-title-wrap"><span class="stat-dot dot-orange">●</span> Conversion</span><i class="ph-bold ph-percent" style="opacity:0.4;"></i></div>
          <div class="stat-num">6.8%</div>
          <div class="stat-change orange-txt">↗ +1.2% vs last week</div>
        </div>
      </div>

      <!-- Bottom Widgets Row -->
      <div class="dash-bottom-widgets">
        <div class="widget-box widget-chart">
          <div class="widget-head">
            <div><strong style="font-size:0.86rem; color:#111827;">Revenue</strong><div style="font-size:0.7rem; color:#9CA3AF; font-weight:400;">Last 7 days</div></div>
            <span class="line-badge">● Live</span>
          </div>
          <div class="wave-chart-wrap">
            <svg viewBox="0 0 400 110" preserveAspectRatio="none" class="chart-svg">
              <defs><linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2FAE6B" stop-opacity="0.32"/><stop offset="100%" stop-color="#2FAE6B" stop-opacity="0.01"/></linearGradient></defs>
              <path d="M 0,85 Q 70,65 140,80 T 280,35 T 380,20 L 400,18 L 400,110 L 0,110 Z" fill="url(#chartGrad1)"/>
              <path d="M 0,85 Q 70,65 140,80 T 280,35 T 380,20 L 400,18" fill="none" stroke="#2FAE6B" stroke-width="2.8" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="chart-days-row"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </div>

        <div class="widget-box widget-activity">
          <div class="widget-head"><span style="font-size:0.84rem; font-weight:700; color:#111827;">Live activity</span><span class="dot-green-pulse">●</span></div>
          <div class="activity-list">
            <div class="activity-item"><span class="act-left"><span class="act-icon icon-green"><i class="ph-bold ph-bag"></i></span> New sale</span><strong>$89</strong><small>2s</small></div>
            <div class="activity-item"><span class="act-left"><span class="act-icon icon-pink"><i class="ph-bold ph-heart"></i></span> Engagement</span><strong>+412</strong><small>8s</small></div>
            <div class="activity-item"><span class="act-left"><span class="act-icon icon-blue"><i class="ph-bold ph-globe"></i></span> Visitor</span><strong>US</strong><small>11s</small></div>
            <div class="activity-item"><span class="act-left"><span class="act-icon icon-green"><i class="ph-bold ph-bag"></i></span> New sale</span><strong>$142</strong><small>24s</small></div>
          </div>
        </div>

        <div class="widget-box widget-reach">
          <div class="widget-head" style="font-size:0.84rem; font-weight:700; color:#111827;">Reach</div>
          <div class="reach-list">
            <div class="reach-item"><i class="ph-bold ph-instagram-logo" style="color:#E1306C;"></i> <span>312K</span></div>
            <div class="reach-item"><i class="ph-bold ph-tiktok-logo" style="color:#000000;"></i> <span>2.1M</span></div>
            <div class="reach-item"><i class="ph-bold ph-youtube-logo" style="color:#FF0000;"></i> <span>148K</span></div>
          </div>
        </div>
      </div>
    `,
    'products': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div><h3 style="margin:0; font-size:1.1rem; color:#111827;">Digital Products & Catalog</h3><p style="margin:2px 0 0; font-size:0.78rem; color:#6B7280;">Manage your digital products, ebooks, and video courses.</p></div>
          <button style="background:#3A5AFF; color:#fff; border:none; padding:8px 14px; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">+ Create Product</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:12px;">
          <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
            <div style="font-size:0.7rem; font-weight:700; color:#2FAE6B; text-transform:uppercase;">Ebook / Vault</div>
            <h4 style="margin:6px 0 4px; font-size:0.92rem; color:#111827;">Instagram Monetisation Vault</h4>
            <p style="margin:0 0 10px; font-size:0.74rem; color:#6B7280;">50+ Monetisation Templates & Sales Scripts.</p>
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.84rem; color:#111827;"><span>$49</span><span style="color:#059669;">342 Sales</span></div>
          </div>
          <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
            <div style="font-size:0.7rem; font-weight:700; color:#3A5AFF; text-transform:uppercase;">Video Masterclass</div>
            <h4 style="margin:6px 0 4px; font-size:0.92rem; color:#111827;">Viral Reel Hooks Pack</h4>
            <p style="margin:0 0 10px; font-size:0.74rem; color:#6B7280;">100+ High-Retention Visual Hook Assets.</p>
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.84rem; color:#111827;"><span>$29</span><span style="color:#059669;">819 Sales</span></div>
          </div>
          <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
            <div style="font-size:0.7rem; font-weight:700; color:#8B5CF6; text-transform:uppercase;">Curriculum</div>
            <h4 style="margin:6px 0 4px; font-size:0.92rem; color:#111827;">Faceless Creator Blueprint</h4>
            <p style="margin:0 0 10px; font-size:0.74rem; color:#6B7280;">12-step Faceless Instagram Growth System.</p>
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.84rem; color:#111827;"><span>$99</span><span style="color:#059669;">124 Sales</span></div>
          </div>
        </div>
      </div>
    `,
    'websites': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div><h3 style="margin:0; font-size:1.1rem; color:#111827;">AI Website & Store Builder</h3><p style="margin:2px 0 0; font-size:0.78rem; color:#6B7280;">Live domain: <strong style="color:#3A5AFF;">vyralify.site/creator-page</strong></p></div>
          <span style="background:#ECFDF5; color:#059669; border:1px solid rgba(5,150,105,0.3); font-size:0.72rem; font-weight:700; padding:4px 10px; border-radius:99px;">● Domain Active</span>
        </div>
        <div style="background:#161820; border-radius:10px; padding:24px 16px; color:#fff; text-align:center;">
          <div style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">Ace's Creator Portal</div>
          <p style="font-size:0.8rem; color:rgba(255,255,255,0.7); max-width:320px; margin:0 auto 14px;">Build high-converting bio link stores and sell digital products on auto-pilot.</p>
          <button style="background:#3A5AFF; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">Edit Site Template →</button>
        </div>
      </div>
    `,
    'marketing': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <h3 style="margin:0 0 4px; font-size:1.1rem; color:#111827;">Organic Reel Growth Engine</h3>
        <p style="margin:0 0 16px; font-size:0.78rem; color:#6B7280;">Track reel posting schedules, viral hashtags, and trending audio.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
          <div style="border:1px solid #E5E7EB; padding:14px; border-radius:10px; background:#FAFAFC;">
            <div style="font-size:0.78rem; font-weight:700; color:#111827; margin-bottom:8px;">🔥 Active Hashtag Vault</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <span style="background:#EFF6FF; color:#2563EB; font-size:0.7rem; padding:3px 8px; border-radius:4px; font-weight:600;">#InstagramGrowth</span>
              <span style="background:#EFF6FF; color:#2563EB; font-size:0.7rem; padding:3px 8px; border-radius:4px; font-weight:600;">#ReelStrategy</span>
              <span style="background:#EFF6FF; color:#2563EB; font-size:0.7rem; padding:3px 8px; border-radius:4px; font-weight:600;">#FacelessCreator</span>
            </div>
          </div>
          <div style="border:1px solid #E5E7EB; padding:14px; border-radius:10px; background:#FAFAFC;">
            <div style="font-size:0.78rem; font-weight:700; color:#111827; margin-bottom:8px;">🎵 Trending Audio Velocity</div>
            <div style="font-size:0.78rem; color:#059669; font-weight:700;">+420% Viral pace this week</div>
            <small style="color:#6B7280; font-size:0.7rem;">Updated 15 mins ago</small>
          </div>
        </div>
      </div>
    `,
    'payments': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div><h3 style="margin:0; font-size:1.1rem; color:#111827;">Creator Monetisation & Payouts</h3><p style="margin:2px 0 0; font-size:0.78rem; color:#6B7280;">Connected via Stripe Express • Auto-payouts enabled</p></div>
          <strong style="font-size:1.3rem; color:#059669; font-family:var(--font-display);">$48,240.00</strong>
        </div>
        <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
          <div style="font-size:0.78rem; font-weight:700; color:#111827; margin-bottom:8px;">Recent Transactions</div>
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; padding:6px 0; border-bottom:1px solid #F3F4F6;"><span>EcomProdigy Course Sale</span><strong style="color:#059669;">+$89.00</strong></div>
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; padding:6px 0; border-bottom:1px solid #F3F4F6;"><span>Viral Reel Hooks Pack</span><strong style="color:#059669;">+$29.00</strong></div>
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; padding:6px 0;"><span>Weekly Payout Transfer</span><strong style="color:#2563EB;">-$1,240.00</strong></div>
        </div>
      </div>
    `,
    'manage': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <h3 style="margin:0 0 4px; font-size:1.1rem; color:#111827;">Creator Account & Niche Settings</h3>
        <p style="margin:0 0 16px; font-size:0.78rem; color:#6B7280;">Manage active Instagram accounts and API integrations.</p>
        <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div><strong style="font-size:0.86rem; color:#111827;">@faceless.growth</strong><div style="font-size:0.74rem; color:#6B7280;">Niche: Business & Personal Growth • 312K Followers</div></div>
            <span style="background:#ECFDF5; color:#059669; font-size:0.7rem; font-weight:700; padding:3px 8px; border-radius:4px;">Connected</span>
          </div>
        </div>
      </div>
    `,
    'automations': `
      <div style="background:#fff; border:1px solid #E5E7EB; border-radius:14px; padding:20px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div><h3 style="margin:0; font-size:1.1rem; color:#111827;">AI DM Auto-Responder & Comment Workflows</h3><p style="margin:2px 0 0; font-size:0.78rem; color:#6B7280;">Automatically send digital product links when users comment on Reels.</p></div>
          <span style="background:#ECFDF5; color:#059669; font-size:0.72rem; font-weight:700; padding:4px 10px; border-radius:99px;">● 3 Workflows Active</span>
        </div>
        <div style="border:1px solid #E5E7EB; border-radius:10px; padding:14px; background:#FAFAFC;">
          <div style="font-size:0.78rem; font-weight:700; color:#111827;">Keyword Trigger: "VAULT"</div>
          <p style="font-size:0.75rem; color:#6B7280; margin:4px 0 0;">Auto-sends: "Hey! Here is your link to unlock the Instagram Monetisation Vault: vyralify.site/vault"</p>
        </div>
      </div>
    `
  };

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const tabKey = item.dataset.tab || item.innerText.toLowerCase().trim().replace(/[^a-z]/g, '');

      if (dashMain && TAB_TEMPLATES[tabKey]) {
        dashMain.style.opacity = '0.3';
        setTimeout(() => {
          dashMain.innerHTML = TAB_TEMPLATES[tabKey];
          dashMain.style.opacity = '1';
        }, 120);
      }
    });
  });

  // AI Widget interactive chips & typewriter
  const chips = document.querySelectorAll('.ai-chip');
  const typeLine = document.getElementById('aiTypeLine');

  const prompts = {
    'Generate Captions': 'Writing viral caption for Instagram aesthetic theme page...',
    'Generate Hooks': '3 High-retention hooks generated: "Nobody talks about this..."',
    'Find Trends': 'Trending Audio Found: "Aesthetic Chill Vibe #492" (+420% viral velocity)',
    'Generate Ideas': '5 Digital Product Ideas for Faceless Business Niche created!'
  };

  function runTypewriter(text) {
    if (!typeLine) return;
    typeLine.innerHTML = `<span class="cursor"></span>`;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        typeLine.insertAdjacentHTML('beforeend', text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptKey = chip.textContent?.trim() || '';
      const response = prompts[promptKey] || `Generating ${promptKey}...`;
      runTypewriter(response);
    });
  });

  // Initial typewriter loop for guest preview
  if (typeLine) {
    setTimeout(() => {
      runTypewriter('AI Assistant Ready. Select a suggestion chip above to test!');
    }, 1200);
  }

  // Animate mockup progress bars & chart
  setTimeout(() => {
    document.querySelectorAll('.module-row .bar i').forEach(b => {
      b.style.width = `${b.dataset.w || 50}%`;
    });
    document.querySelectorAll('.dash-chart-card b').forEach(b => {
      b.style.height = `${b.dataset.h || 40}%`;
    });
    const ringFg = document.getElementById('ringFg');
    const ringPct = document.getElementById('ringPct');
    if (ringFg) ringFg.style.strokeDashoffset = '65';
    if (ringPct) ringPct.textContent = '60%';
  }, 600);
}

/* ============================================================
   11. SCROLL REVEAL INTERSECTION OBSERVER
   ============================================================ */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(r => io.observe(r));
}

/* ============================================================
   12. AUTH STATE & LIVE DATA BINDINGS
   ============================================================ */
function initAuthStateAndLiveData() {
  onAuthStateChanged(auth, async (user) => {
    const authLink = document.getElementById('navAuthLink');
    const ctaBtn = document.getElementById('navCtaBtn');
    const heroTitle = document.querySelector('.dash-head-row h4');

    if (user) {
      // User is logged in
      if (authLink) {
        authLink.textContent = 'Dashboard';
        authLink.href = '/dashboard.html';
      }
      if (ctaBtn) {
        ctaBtn.textContent = 'Go to Dashboard';
        ctaBtn.href = '/dashboard.html';
      }

      // Fetch user profile from Firestore
      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        const data = userSnap.data() || {};

        if (heroTitle) {
          const name = data.displayName || user.displayName || user.email?.split('@')[0] || 'Creator';
          heroTitle.textContent = `Welcome back, ${name} 👋`;
        }

        // Fetch affiliate earnings if code exists
        const affCode = data.affiliateCode;
        if (affCode) {
          const affSnap = await getDoc(doc(db, 'affiliates', affCode));
          const affData = affSnap.data() || {};
          const earningsCount = document.getElementById('earningsCount');
          if (earningsCount) {
            const conv = affData.conversions || 0;
            const amt = conv * 200; // Estimated INR / USD referral bonus
            earningsCount.textContent = `₹${amt}`;
          }
        }

      } catch (err) {
        console.warn('Live data fetch non-blocking error:', err);
      }
    }
  });
}

/* ============================================================
   13. COOKIE CONSENT PERMISSION BANNER
   ============================================================ */
function initCookieConsent() {
  if (localStorage.getItem('vyralify_cookies') === 'accepted') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.innerHTML = `
    <div class="cookie-banner-head">
      <i class="ph-bold ph-cookie"></i>
      <span>Cookie Preferences &amp; Privacy</span>
    </div>
    <p>We use cookies and analytical tokens to optimize performance, remember your membership preferences, and protect authentication security. Read our <a href="/privacy.html">Privacy Policy</a>.</p>
    <div class="cookie-banner-actions">
      <button class="cookie-btn-accept" id="acceptAllCookies">Accept All</button>
      <button class="cookie-btn-essential" id="essentialCookies">Essential Only</button>
    </div>
  `;
  document.body.appendChild(banner);

  setTimeout(() => banner.classList.add('show'), 1200);

  const closeBanner = () => {
    banner.classList.remove('show');
    localStorage.setItem('vyralify_cookies', 'accepted');
    setTimeout(() => banner.remove(), 500);
  };

  document.getElementById('acceptAllCookies')?.addEventListener('click', closeBanner);
  document.getElementById('essentialCookies')?.addEventListener('click', closeBanner);
}

