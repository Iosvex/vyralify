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

  if (dashWrap && dashWindow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dashWrap.addEventListener('mousemove', (e) => {
      const rect = dashWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      dashWindow.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    dashWrap.addEventListener('mouseleave', () => {
      dashWindow.style.transform = '';
    });
  }

  // Sidebar tab switching simulation
  const sidebarItems = document.querySelectorAll('.dash-nav-item');
  const dashMain = document.querySelector('.dash-main');

  sidebarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (dashMain) {
        dashMain.style.opacity = '0.4';
        setTimeout(() => {
          dashMain.style.opacity = '1';
        }, 150);
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
