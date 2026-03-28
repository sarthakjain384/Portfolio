/* ============================================================
   SARTHAK JAIN – PORTFOLIO
   Interactive Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =================== TYPING ANIMATION ===================
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Full Stack Developer.',
        'React & Spring Boot Engineer.',
        'Competitive Programmer.',
        'Problem Solver.',
        'Tech Enthusiast.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const deleteSpeed = 40;
    const pauseEnd = 1800;
    const pauseStart = 400;

    function type() {
        const current = phrases[phraseIndex];
        if (!isDeleting) {
            typedTextEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, pauseEnd);
                return;
            }
            setTimeout(type, typeSpeed);
        } else {
            typedTextEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, pauseStart);
                return;
            }
            setTimeout(type, deleteSpeed);
        }
    }
    type();

    // =================== NAVBAR SCROLL ===================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // =================== HAMBURGER MENU ===================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('mobile-open');
        document.body.style.overflow = navLinksContainer.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // =================== SCROLL REVEAL ===================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =================== SMOOTH SCROLL FOR ALL ANCHORS ===================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =================== STAGGER PROJECT CARDS ===================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // =================== SKILL PILLS STAGGER ===================
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((cat, index) => {
        cat.style.transitionDelay = `${index * 0.08}s`;
    });

});
