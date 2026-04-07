const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealOnScroll() {
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  if (!target) return;

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = String(target);
    }
  }

  requestAnimationFrame(tick);
}

function setupCounters() {
  const stats = document.querySelectorAll('.stat-value');
  if (!stats.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    stats.forEach((stat) => {
      stat.textContent = stat.dataset.target || '0';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.7 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

function setupProjectFilters() {
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const projects = Array.from(document.querySelectorAll('.project[data-category]'));
  if (!buttons.length || !projects.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter || 'all';

      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      projects.forEach((project) => {
        const category = project.dataset.category;
        const visible = selected === 'all' || category === selected;
        project.classList.toggle('is-hidden', !visible);
      });
    });
  });
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map((link) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return null;
      return document.querySelector(href);
    })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const sectionToLink = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionToLink.set(section, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove('is-active'));
        const activeLink = sectionToLink.get(entry.target);
        if (activeLink) activeLink.classList.add('is-active');
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupHeroRotate() {
  const el = document.getElementById('hero-rotate');
  if (!el) return;

  const words = ['Portfolio', 'Showcase', 'Journey'];
  let index = 0;

  if (prefersReducedMotion) {
    el.textContent = words[0];
    return;
  }

  setInterval(() => {
    index = (index + 1) % words.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = words[index];
      el.style.opacity = '1';
    }, 180);
  }, 2200);
}

function setupHeroParallax() {
  const heroImage = document.querySelector('.hero-image');
  const hero = document.querySelector('.hero');
  if (!heroImage || !hero || prefersReducedMotion) return;

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const offset = Math.max(-120, Math.min(120, rect.top * -0.12));
      heroImage.style.transform = `translateY(${offset}px) scale(1.05)`;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = Array.from(document.querySelectorAll('.mobile-link'));
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('is-open');
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

function setupBackToTop() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;

  function onScroll() {
    const show = window.scrollY > 540;
    button.classList.toggle('is-visible', show);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  setupCounters();
  setupProjectFilters();
  setupActiveNav();
  setupHeroRotate();
  setupHeroParallax();
  setupMobileMenu();
  setupBackToTop();
});
