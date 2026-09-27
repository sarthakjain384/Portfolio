document.addEventListener('DOMContentLoaded', () => {
    const typedTextEl = document.getElementById('typedText');
    const phrases = ['Full Stack Developer.','AI/ML Engineer.','React & Spring Boot Engineer.','Competitive Programmer.','Problem Solver.'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    const typeSpeed = 70, deleteSpeed = 40, pauseEnd = 1800, pauseStart = 400;
    function type() {
        const current = phrases[phraseIndex];
        if (!isDeleting) {
            typedTextEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) { isDeleting = true; setTimeout(type, pauseEnd); return; }
            setTimeout(type, typeSpeed);
        } else {
            typedTextEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(type, pauseStart); return; }
            setTimeout(type, deleteSpeed);
        }
    }
    type();

    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    function handleNavScroll() {
        if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
        let current = '';
        sections.forEach(section => { if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id'); });
        navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === '#' + current); });
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('mobile-open');
        document.body.style.overflow = navLinksContainer.classList.contains('mobile-open') ? 'hidden' : '';
    });
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    document.querySelectorAll('.project-card').forEach((card, i) => card.style.transitionDelay = `${i * 0.1}s`);
    document.querySelectorAll('.skill-category').forEach((cat, i) => cat.style.transitionDelay = `${i * 0.08}s`);
});
