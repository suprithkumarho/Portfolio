// Main Site Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const topNav = document.querySelector('.top-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const downloadButton = document.querySelector('.download-resume');

    // State Management
    let currentSection = 'about';
    let isMobile = window.innerWidth <= 768;
    let isScrolling = false;

    // Mobile Menu Toggle Functions
    function toggleSidebarMenu() {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    function toggleTopNavMenu() {
        topNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    }

    // Event Listeners for Mobile Menus
    menuToggle?.addEventListener('click', toggleSidebarMenu);
    mobileMenuToggle?.addEventListener('click', toggleTopNavMenu);

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobile) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleSidebarMenu();
            }
            
            if (topNav.classList.contains('active') && 
                !topNav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                toggleTopNavMenu();
            }
        }
    });

    // Navigation Functionality
    function navigateToSection(sectionId) {
        if (isScrolling) return;
        
        // Update active section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Update active nav link in both top nav and sidebar
        updateActiveNavLink(sectionId);

        // Close mobile menus after navigation
        if (isMobile) {
            if (sidebar.classList.contains('active')) {
                toggleSidebarMenu();
            }
            if (topNav.classList.contains('active')) {
                toggleTopNavMenu();
            }
        }

        // Update URL without page reload
        history.pushState(null, null, `#${sectionId}`);
        currentSection = sectionId;

        // Smooth scroll to section
        smoothScrollToSection(sectionId);
    }

    // Update Active Navigation Link
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.remove('active');
            if (href === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Navigation Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });

    // Handle Browser Navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'about';
        navigateToSection(hash);
    });

    // Resume Download Functionality
    downloadButton?.addEventListener('click', async () => {
        try {
            const response = await fetch('assets/resume/Harihar_Omkarachari_Suprith_Kumar_Resume.pdf');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Harihar_Suprith_Kumar_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Unable to download resume. Please try again later.');
        }
    });

    // Scroll Restoration
    history.scrollRestoration = 'manual';

    // Smooth Scroll to Section with Better Offset Calculation
    function smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            isScrolling = true;
            const topNavHeight = topNav.offsetHeight;
            const yOffset = -topNavHeight - 20; // Added extra offset for better positioning
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });

            // Reset scrolling state after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Handle Initial Load
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1) || 'about';
        navigateToSection(hash);
    }

    // Initialize
    handleInitialLoad();

    // Responsive Design Handler
    window.addEventListener('resize', () => {
        const wasNotMobile = !isMobile;
        isMobile = window.innerWidth <= 768;

        if (wasNotMobile && isMobile) {
            sidebar.classList.remove('active');
            topNav.classList.remove('active');
            menuToggle?.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        }
    });

    // Improved Scroll Event Handler
    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Handle nav bar hiding
        if (currentScroll > lastScroll && currentScroll > topNav.offsetHeight) {
            topNav.classList.add('nav-hidden');
        } else {
            topNav.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;

        // Debounced section detection
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isScrolling) {
                const scrollPosition = window.pageYOffset + topNav.offsetHeight + 100;
                let activeSection = '';

                // Find the current section
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        activeSection = section.id;
                    }
                });

                // Update active state only if we have a valid section
                if (activeSection && activeSection !== currentSection) {
                    currentSection = activeSection;
                    updateActiveNavLink(activeSection);
                }
            }
        }, 100);
    });
});