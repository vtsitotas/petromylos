// ================================================
// ΠΕΤΡΟΜΥΛΟΣ — Enhanced Interactions
// ================================================

// --- Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const links     = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isActive));
    hamburger.setAttribute('aria-label', isActive ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Άνοιγμα μενού');
    });
});

// --- Smooth scroll ---
function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerH = header.offsetHeight;
            const targetY = target.getBoundingClientRect().top + window.scrollY - headerH;
            smoothScrollTo(targetY, 900);
        }
    });
});

// --- Header scroll shadow + shrink ---
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

// --- Back to top ---
backToTop.addEventListener('click', () => {
    smoothScrollTo(0, 900);
});


// --- Scroll reveal (IntersectionObserver) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.10,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});
