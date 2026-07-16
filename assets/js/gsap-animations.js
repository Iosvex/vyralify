// Landing motion engine — SectionFlow-inspired scroll reveals + parallax + 3D tilt.
// Vanilla + IntersectionObserver so content is reliable even if a CDN fails.
// Content is visible by default (see base.css); we only opt into the
// hidden->shown transition when JS + motion are available.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

/* Staggered, directional scroll reveals. Each item's --i (its index among
   revealing siblings) drives a cascading delay, like SectionFlow's layers. */
function reveal() {
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!items.length) return;
  // SectionFlow-style: section headers reveal with a clip-path wipe.
  document.querySelectorAll('.section-head[data-reveal]').forEach(el => el.setAttribute('data-reveal', 'clip'));
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  document.body.classList.add('reveal-ready');
  // Assign a stagger index within each reveal group (same parent).
  const seen = new Map();
  items.forEach(el => {
    const p = el.parentElement;
    const n = seen.get(p) || 0;
    el.style.setProperty('--i', n);
    seen.set(p, n + 1);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  items.forEach(el => io.observe(el));
  // Failsafe: anything still hidden after 2.5s is shown regardless.
  setTimeout(() => items.forEach(el => el.classList.add('in')), 2500);
}

/* Hero intro: staggered fade-up on load. */
function heroIn() {
  if (reduce) return;
  document.querySelectorAll('[data-hero]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 90 + i * 110);
  });
}

/* Scroll-linked parallax: elements drift at their own speed as they cross
   the viewport (compositor-friendly translate3d only). */
function parallax() {
  if (reduce) return;
  const els = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!els.length) return;
  let ticking = false;
  const update = () => {
    const vh = innerHeight;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const speed = parseFloat(el.dataset.parallax) || 0;
      const shift = ((mid - vh / 2) / vh) * speed;
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();
}

/* 3D pointer tilt on cards — gives depth without a library. Pointer-fine only. */
function tilt() {
  if (reduce || !finePointer) return;
  const sel = '.feature.card,.value.card,.step.card,.stat.card,.pricing.card,.mockup';
  document.querySelectorAll(sel).forEach(card => {
    card.classList.add('tiltable');
    const max = card.classList.contains('mockup') ? 10 : 6;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* Animated stat count-ups. */
function countUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const run = (el) => {
    const end = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '+';
    if (reduce) { el.textContent = end.toLocaleString() + suffix; return; }
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * end);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

function init() { heroIn(); reveal(); parallax(); tilt(); countUp(); }

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
