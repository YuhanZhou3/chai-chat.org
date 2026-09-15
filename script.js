document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to bright mode');
      themeToggle.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to bright mode');
      themeToggle.querySelector('.theme-icon').textContent = isLight ? '☀' : '☾';
    }
  };

  const savedTheme = localStorage.getItem('chai-chat-theme');
  applyTheme(savedTheme || 'dark');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('chai-chat-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  // --- Inject logo SVG so it can be recolored via CSS ---
  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    fetch('assets/logo.svg')
      .then(res => res.text())
      .then(svgText => {
        brandLogo.innerHTML = svgText;
      });
  }

  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  const nextWalk = document.querySelector('[data-next-walk]');
  if (nextWalk) {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0 TODO: timezone issues?
    let daysUntil = (5 - day + 7) % 7;
    const cutoffPassed = day === 5 && (now.getHours() >= 20);
    if (daysUntil === 0 && cutoffPassed) daysUntil = 7;
    const date = new Date(now);
    date.setDate(now.getDate() + daysUntil);
    nextWalk.textContent = date.toLocaleDateString('en-CA', { weekday:'long', month:'long', day:'numeric' }) + ' · 6:00 PM';
  }

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.filter;
      document.querySelectorAll('[data-community]').forEach(card => {
        card.hidden = target !== 'all' && card.dataset.community !== target;
      });
    });
  });

  const form = document.querySelector('[data-subscribe]');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = form.parentElement.querySelector('.form-message');
      if (msg) msg.textContent = 'Thanks — we’ll be in touch. Connect the form to your email service before launch.';
    });
  }
});
