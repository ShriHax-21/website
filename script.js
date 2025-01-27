document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const themeIcon = document.getElementById('theme-icon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on system preference
    if (prefersDarkScheme.matches) {
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    themeIcon.addEventListener('click', () => {
        const isLightTheme = document.body.classList.toggle('light-theme');
        updateThemeIcon(isLightTheme);
    });

    function updateThemeIcon(isLight) {
        themeIcon.src = isLight 
            ? 'https://api.iconify.design/lucide:moon.svg'
            : 'https://api.iconify.design/lucide:sun.svg';
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add fade-in class for animation
    document.querySelector('.hero').classList.add('fade-in');
});

// Add this CSS to your stylesheet
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);