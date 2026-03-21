/* ═══════════════════════════════════════════════════════
   PORTFOLIO — script.js
   Handles: theme toggle, hamburger nav, scroll effects,
            active nav link, AOS-like scroll reveal
   ═══════════════════════════════════════════════════════ */
 
/* ─── DOM REFS ──────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const navOverlay  = document.getElementById('navOverlay');
const navbar      = document.getElementById('navbar');
const html        = document.documentElement;
 
/* ─── THEME TOGGLE ──────────────────────────────────── */
// Read saved theme on load
const savedTheme = localStorage.getItem('pk-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
 
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pk-theme', next);
});
 
/* ─── HAMBURGER / MOBILE NAV ────────────────────────── */
function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
 
function openNav() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
 
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('open');
  isOpen ? closeNav() : openNav();
});
 
navOverlay.addEventListener('click', closeNav);
 
// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});
 
/* ─── SCROLL: NAVBAR SHADOW + ACTIVE LINK ───────────── */
const sections   = document.querySelectorAll('main, [id]');
const allNavLinks = document.querySelectorAll('.nav-link');
 
function updateActiveLink() {
  const scrollY = window.scrollY;
 
  // Navbar scroll shadow
  navbar.classList.toggle('scrolled', scrollY > 10);
 
  // Active section detection
  const sectionMap = [
    { id: 'home',  href: '#home'  },
    { id: 'about', href: '#about' },
    { id: 'work',  href: '#work'  },
  ];
 
  let current = 'home';
  sectionMap.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top;
      if (top <= 80) current = id;
    }
  });
 
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${current}`);
  });
}
 
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink(); // run on load
 
/* ─── SCROLL REVEAL (AOS-like) ──────────────────────── */
const aosEls = document.querySelectorAll('[data-aos]');
 
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if container
        entry.target.classList.add('aos-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
 
aosEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
  observer.observe(el);
});
 
/* ─── SKILL HOVER TOOLTIP ───────────────────────────── */
// Optional: add a subtle ripple on skill icon click
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(0.95)';
    setTimeout(() => { item.style.transform = ''; }, 150);
  });
});
 
/* ─── SMOOTH LINK SCROLL ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
 
/* ─── CONSOLE EASTER EGG ────────────────────────────── */
console.log('%c👋 Hi there! I\'m Priyesh Kumar.', 'font-size:16px;font-weight:bold;color:#2d6a4f;');
console.log('%cCheck out my portfolio & feel free to connect!', 'font-size:13px;color:#6b6962;');
 
/* ─── Profile Pic Chnages ────────────────────────────── */
  const images = document.querySelectorAll(".profile-img-slider img");
  let index = 0;

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 3000); // change every 3 seconds
 