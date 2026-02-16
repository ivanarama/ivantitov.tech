document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  initScrollReveal();

  // Code typing animation
  const codeOutput = document.getElementById('codeOutput');
  if (codeOutput) {
    const typer = new CodeTyper(codeOutput, codeTokens);
    typer.start();
  }

  // Mobile menu
  const burger = document.getElementById('navBurger');
  const overlay = document.getElementById('mobileOverlay');
  const overlayLinks = overlay.querySelectorAll('.mobile-overlay__link');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Contact form (prevent default, placeholder behavior)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Отправлено!';
      btn.style.background = 'var(--accent-primary)';
      btn.style.color = 'var(--bg-deep)';
      setTimeout(() => {
        btn.textContent = 'Отправить';
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 2000);
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
