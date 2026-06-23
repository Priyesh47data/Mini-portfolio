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
  hamburger.classList.contains('open') ? closeNav() : openNav();
});
 
navOverlay.addEventListener('click', closeNav);

// Close on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});
 
/* ─── SCROLL: NAVBAR SHADOW + ACTIVE LINK ───────────── */
const allNavLinks = document.querySelectorAll('.nav-link');
 
function updateActiveLink() {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 10);
 
  const sectionMap = [
    { id: 'home',  href: '#home'  },
    { id: 'about', href: '#about' },
    { id: 'work',  href: '#work'  },
  ];
 
  let current = 'home';
  sectionMap.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 80) current = id;
  });
 
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
 
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
 
/* ─── SCROLL REVEAL (AOS-like) ──────────────────────── */
const aosEls = document.querySelectorAll('[data-aos]');
 
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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
 
/* ─── SKILL HOVER RIPPLE ────────────────────────────── */
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
 
/* ─── PROFILE PIC SLIDER ────────────────────────────── */
const images = document.querySelectorAll('.profile-img-slider img');
let index = 0;

setInterval(() => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}, 3000);








const learnings = [
  {
      title: "Excel",
      description: "Built dashboards, automated reports, used advanced formulas, Pivot Tables, Power Query, lookup functions, data cleaning and MIS reporting workflows.",
      image: "images/excel.svg",
      link: "learning/excel"
  },

  {
      title: "Power BI",
      description: "Developed interactive dashboards, DAX calculations, data modeling, KPI reports, business intelligence solutions and executive-level visual analytics.",
      image: "images/bi.svg",
      link: "learning/power-bi"
  },

  {
      title: "SQL",
      description: "Created complex queries, joins, subqueries, CTEs, window functions, database optimization and analytical reporting for business decision making.",
      image: "images/sql.svg",
      link: "learning/sql"
  },
    {
        title: "Python",
        description: "Learned Python fundamentals including variables, loops, functions, OOP concepts, file handling, modules, exception handling, automation scripting and real-world projects.",
        image: "images/python.svg",
        link: "learning/python"
    },

    {
        title: "Pandas",
        description: "Worked with data cleaning, transformation, aggregation, merging, grouping, filtering, missing values handling, exploratory data analysis and business datasets.",
        image: "images/pandas.svg",
        link: "learning/pandas"
    },


    {
        title: "Dashboard Design",
        description: "Designed professional dashboards focused on storytelling, KPI tracking, business reporting, user experience, visual hierarchy and actionable insights.",
        image: "images/dashboard.svg",
        link: "learning/dashboard"
    }
];


const learningGrid = document.getElementById("learning-grid");

function renderLearningCards(data) {

    learningGrid.innerHTML = "";

    data.forEach(item => {

        learningGrid.innerHTML += `
            <div class="learning-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="card-content">
                    <h3>${item.title}</h3>

                    <p>
                        ${item.description}
                    </p>

                    <a href="${item.link}" class="read-btn">
                        Read More →
                    </a>
                </div>

            </div>
        `;
    });
}

renderLearningCards(learnings);