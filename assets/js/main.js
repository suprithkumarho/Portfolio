// Main Site Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const topNav = document.querySelector('.top-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const downloadButton = document.querySelector('.download-resume');
    const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
    const desktopThemeToggle = document.querySelector('.desktop-theme-toggle');

    // State Management
    let currentSection = 'about';
    let isMobile = window.innerWidth <= 768;
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Theme Management
    function initializeTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', initialTheme);
            currentTheme = initialTheme;
        }
        updateThemeIcons();
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        currentTheme = newTheme;
        updateThemeIcons();
    }

    function updateThemeIcons() {
        const isDark = currentTheme === 'dark';
        document.querySelectorAll('.theme-toggle').forEach(toggle => {
            const lightIcon = toggle.querySelector('.light-icon');
            const darkIcon = toggle.querySelector('.dark-icon');
            if (lightIcon && darkIcon) {
                lightIcon.style.display = isDark ? 'block' : 'none';
                darkIcon.style.display = isDark ? 'none' : 'block';
            }
        });
    }

    // Theme Event Listeners
    mobileThemeToggle?.addEventListener('click', toggleTheme);
    desktopThemeToggle?.addEventListener('click', toggleTheme);

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            currentTheme = newTheme;
            updateThemeIcons();
        }
    });

    // Mobile Menu Toggle Functions
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
    }

    function toggleMobileNavMenu() {
        mobileNavMenu.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    function toggleTopNavMenu() {
        topNav.classList.toggle('active');
    }

    // Event Listeners for Mobile Menus
    menuToggle?.addEventListener('click', toggleMobileNavMenu);
    sidebarToggle?.addEventListener('click', toggleSidebar);
    
    // Close mobile menu when clicking overlay
    mobileNavOverlay?.addEventListener('click', toggleMobileNavMenu);
    
    // Close sidebar when clicking overlay
    sidebarOverlay?.addEventListener('click', toggleSidebar);

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobile) {
            if (mobileNavMenu.classList.contains('active') && 
                !mobileNavMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMobileNavMenu();
            }
            
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                toggleSidebar();
            }
        }
    });

    // Navigation Functionality in main.js
function navigateToSection(sectionId) {
    // Hide all sections first
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active state in navigation (both desktop and mobile)
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // Close mobile menus if open
    if (isMobile) {
        if (mobileNavMenu.classList.contains('active')) {
            toggleMobileNavMenu();
        }
        if (topNav.classList.contains('active')) {
            toggleTopNavMenu();
        }
    }

    // Update URL without scrolling
    history.pushState(null, null, `#${sectionId}`);
    currentSection = sectionId;
    }

    // Navigation Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });

    // Mobile Navigation Event Listeners
    mobileNavLinks.forEach(link => {
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
            const response = await fetch('resume/Harihar_Omkarachari_Suprith_Kumar_Resume.pdf');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Harihar_Omkarachari_Suprith_Kumar_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Unable to download resume. Please try again later.');
        }
    });


    // Responsive Design Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasNotMobile = !isMobile;
            isMobile = window.innerWidth <= 768;

            if (wasNotMobile && isMobile) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                sidebarToggle.classList.remove('active');
                mobileNavMenu.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                topNav.classList.remove('active');
                menuToggle?.classList.remove('active');
            }
        }, 250);
    });

    // Initialize
    initializeTheme();
    const hash = window.location.hash.substring(1) || 'about';
    navigateToSection(hash);
});