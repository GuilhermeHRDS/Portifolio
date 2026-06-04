// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Navigation Active Link
function updateActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

updateActiveNav();

// Hero Slider
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dotsContainer = document.querySelector('.slider-dots');
    this.currentIndex = 0;
    this.autoplayInterval = null;

    if (this.slides.length === 0) return;

    this.init();
  }

  init() {
    this.createDots();
    this.setupControls();
    this.startAutoplay();
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = index === 0 ? 'active' : '';
      button.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer?.appendChild(button);
    });
  }

  setupControls() {
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    prevBtn?.addEventListener('click', () => this.previousSlide());
    nextBtn?.addEventListener('click', () => this.nextSlide());
  }

  goToSlide(index) {
    this.currentIndex = index % this.slides.length;
    this.updateSlides();
    this.restartAutoplay();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  previousSlide() {
    this.goToSlide(this.currentIndex - 1 + this.slides.length);
  }

  updateSlides() {
    const dots = this.dotsContainer?.querySelectorAll('button') || [];
    
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  restartAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
  
  // Email Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
});

function handleContactForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, informe um e-mail válido.');
    return;
  }

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target)
      .then(() => {
        alert('Mensagem enviada com sucesso!');
        e.target.reset();
      })
      .catch(() => {
        alert('Erro ao enviar. Tente novamente.');
      });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});