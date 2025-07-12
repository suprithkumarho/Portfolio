// Theme Management
class ThemeManager {
    constructor() {
        // Theme Elements
        this.themeToggle = document.querySelector('.theme-toggle');
        this.mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
        this.root = document.documentElement;
        
        // Theme State
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isTransitioning = false;

        // Color schemes for themes
        this.themes = {
            light: {
                '--primary-color': '#2563eb',
                '--primary-light': '#3b82f6',
                '--primary-dark': '#1d4ed8',
                '--background-light': '#ffffff',
                '--background-dark': '#f8fafc',
                '--text-primary': '#1e293b',
                '--text-secondary': '#475569',
                '--border-color': '#e2e8f0'
            },
            dark: {
                '--primary-color': '#3b82f6',
                '--primary-light': '#60a5fa',
                '--primary-dark': '#2563eb',
                '--background-light': '#1a1a1a',
                '--background-dark': '#111111',
                '--text-primary': '#e2e8f0',
                '--text-secondary': '#cbd5e1',
                '--border-color': '#2d2d2d'
            }
        };

        this.init();
    }

    init() {
        // Initialize theme
        this.loadTheme();
        this.setupEventListeners();
        this.updateThemeIcons();
        this.checkSystemPreference();
    }

    loadTheme() {
        // Set initial theme
        this.root.setAttribute('data-theme', this.currentTheme);
        this.applyThemeColors(this.currentTheme);
    }

    setupEventListeners() {
        // Theme toggle buttons
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                this.toggleTheme();
            }
        });

        // System theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.loadTheme();
                this.updateThemeIcons();
            }
        });
    }

    toggleTheme() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';

        // Add transition class
        this.root.classList.add('theme-transition');

        // Animate theme change
        requestAnimationFrame(() => {
            this.root.setAttribute('data-theme', newTheme);
            this.applyThemeColors(newTheme);
            this.currentTheme = newTheme;
            this.updateThemeIcons();

            // Save preference
            localStorage.setItem('theme', newTheme);

            // Remove transition class after animation
            setTimeout(() => {
                this.root.classList.remove('theme-transition');
                this.isTransitioning = false;
            }, 300);
        });
    }

    applyThemeColors(theme) {
        const colors = this.themes[theme];
        Object.entries(colors).forEach(([property, value]) => {
            this.root.style.setProperty(property, value);
        });
    }

    updateThemeIcons() {
        const isDark = this.currentTheme === 'dark';
        
        // Update main theme toggle
        if (this.themeToggle) {
            const lightIcon = this.themeToggle.querySelector('.light-icon');
            const darkIcon = this.themeToggle.querySelector('.dark-icon');
            if (lightIcon) lightIcon.style.display = isDark ? 'block' : 'none';
            if (darkIcon) darkIcon.style.display = isDark ? 'none' : 'block';
        }

        // Update mobile theme toggle
        if (this.mobileThemeToggle) {
            const lightIcon = this.mobileThemeToggle.querySelector('.light-icon');
            const darkIcon = this.mobileThemeToggle.querySelector('.dark-icon');
            if (lightIcon) lightIcon.style.display = isDark ? 'block' : 'none';
            if (darkIcon) darkIcon.style.display = isDark ? 'none' : 'block';
        }

        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: this.currentTheme } 
        }));
    }

    checkSystemPreference() {
        // Check system theme preference if no saved theme
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
            this.loadTheme();
            this.updateThemeIcons();
        }
    }

    // Public methods for external use
    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.loadTheme();
            this.updateThemeIcons();
            localStorage.setItem('theme', theme);
        }
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();

    // Optional: Add theme change observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = document.documentElement.getAttribute('data-theme');
                document.dispatchEvent(new CustomEvent('themeChanged', {
                    detail: { theme: newTheme }
                }));
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});