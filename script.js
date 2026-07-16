/* script.js — Dynamic Island scroll, IntersectionObserver reveals, FAQ, card tilt, mobile menu */

/* ---- Dynamic Island scroll shrink ---- */
(function () {
  const nav = document.querySelector('.dynamic-island-nav');
  if (!nav) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---- Mobile hamburger menu ---- */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const dropdown = document.querySelector('.mobile-dropdown');
  if (!hamburger || !dropdown) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    dropdown.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
      hamburger.classList.remove('open');
      dropdown.classList.remove('open');
    }
  });
})();

/* ---- IntersectionObserver Scroll Reveal ---- */
(function () {
  document.body.classList.add('reveal-ready');

  // Stagger children with data-reveal
  document.querySelectorAll('[data-reveal-stagger]').forEach((parent, pi) => {
    Array.from(parent.children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--i', i);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();

/* ---- Landing Page Tab Switcher ---- */
(function () {
  const tabs = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('[data-panel]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.tab === target);
        t.setAttribute('aria-selected', String(t.dataset.tab === target));
      });
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== target));
    });
  });
})();

/* ---- Counting Animation for stats ---- */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.countSuffix || '+';
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => io.observe(c));
})();

/* ---- Subtle card 3D tilt on mouse move ---- */
(function () {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
