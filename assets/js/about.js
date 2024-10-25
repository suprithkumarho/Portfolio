// About Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing cursor elements first
    const existingCursor = document.querySelector('.typing-cursor');
    if (existingCursor) {
        existingCursor.remove();
    }

    // Initialize Typed.js for role animation
    const typedRoles = new Typed('.typed-roles', {
        strings: [
            ' Software Engineer',
            ' Cloud Engineer',
            ' Full Stack Developer',
            ' DevOps Engineer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });

    // Make sure only one cursor is shown
    const cursors = document.querySelectorAll('.typed-cursor');
    if (cursors.length > 1) {
        cursors.forEach((cursor, index) => {
            if (index > 0) cursor.remove();
        });
    }

    // Add custom styles for the cursor
    const style = document.createElement('style');
    style.textContent = `
        .typed-cursor {
            color: var(--primary-color) !important;
            font-weight: normal !important;
            animation: blink 1s infinite !important;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Counter Animation Function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const step = (target * 30) / duration; // Update every 30ms
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Initialize counters with Intersection Observer
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Skill Cards Animation
    const focusCards = document.querySelectorAll('.focus-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    focusCards.forEach(card => cardObserver.observe(card));

    // Tech Stack Tags Animation with staggered delay
    const techTags = document.querySelectorAll('.tech-tag');
    let delay = 0;

    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.style.animationDelay) {
                entry.target.style.animationDelay = `${delay}ms`;
                delay += 100;
                entry.target.classList.add('animate');
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    techTags.forEach(tag => tagObserver.observe(tag));

    // Highlight Cards Hover Effect
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) icon.classList.add('fa-beat');
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) icon.classList.remove('fa-beat');
        });
    });

    // Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    let scrollThrottle;
    window.addEventListener('scroll', () => {
        if (!scrollThrottle) {
            scrollThrottle = setTimeout(() => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
                scrollThrottle = null;
            }, 50);
        }
    });

    // About Section Text Animation
    function createWordSpans(element) {
        if (!element) return;
        
        const text = element.textContent;
        const words = text.split(' ');
        element.textContent = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'animate-word';
            span.style.animationDelay = `${index * 100}ms`;
            span.textContent = word + ' ';
            element.appendChild(span);
        });
    }

    const aboutDescription = document.querySelector('.about-description');
    createWordSpans(aboutDescription);

    // Parallax Effect for Focus Cards
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const focusCards = document.querySelectorAll('.focus-card');
                focusCards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const centerPosition = window.innerHeight / 2;
                    const distanceFromCenter = centerPosition - rect.top;
                    const parallaxValue = (distanceFromCenter * 0.1);
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        card.style.transform = `translateY(${parallaxValue}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Dynamic Color Theme Based on Time
    function updateThemeColors() {
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        if (hour >= 18 || hour < 6) {
            // Evening/Night theme
            root.style.setProperty('--primary-color', '#3b82f6');
            root.style.setProperty('--primary-light', '#60a5fa');
        } else {
            // Day theme
            root.style.setProperty('--primary-color', '#2563eb');
            root.style.setProperty('--primary-light', '#3b82f6');
        }
    }

    // Initialize theme colors and update periodically
    updateThemeColors();
    setInterval(updateThemeColors, 1800000); // Update every 30 minutes

    // Error Handling for Images
    window.addEventListener('error', (e) => {
        if (e.target.matches('img')) {
            e.target.src = 'assets/images/placeholder.jpg';
        }
    }, true);
});