// Visitor Tracking System
class VisitorTracker {
    constructor() {
        this.visitorCount = document.getElementById('visitorCount');
        this.sidebarVisitorCount = document.getElementById('sidebarVisitorCount');
        this.countryList = document.getElementById('countryList');
        this.storageKey = 'portfolio_visitors';
        this.countryDataKey = 'portfolio_country_data';
        this.visitorsData = this.loadVisitorsData();
        this.init();
    }

    // Initialize visitor tracking
    async init() {
        try {
            // Increment visit count
            this.incrementVisitCount();

            // Get visitor's country
            const countryData = await this.getVisitorCountry();
            if (countryData) {
                this.updateCountryStats(countryData);
            }

            // Update the display
            this.updateDisplay();
            
            // Save data
            this.saveVisitorsData();
        } catch (error) {
            console.error('Error initializing visitor tracker:', error);
        }
    }

    updateTotalVisits() {
        // Calculate total from country counts
        this.visitorsData.totalVisits = Object.values(this.visitorsData.countries)
            .reduce((total, country) => total + country.count, 0);
    }


    // Load existing visitor data
    loadVisitorsData() {
        const savedData = localStorage.getItem(this.storageKey);
        return savedData ? JSON.parse(savedData) : {
            totalVisits: 0,
            countries: {},
            lastVisit: null
        };
    }

    // Save visitor data
    saveVisitorsData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.visitorsData));
    }

    // Increment visit count
    incrementVisitCount() {
        const today = new Date().toDateString();
        
        // Only increment if it's a new visit (different day)
        if (this.visitorsData.lastVisit !== today) {
            this.visitorsData.lastVisit = today;
            
            // Get visitor's country and update stats
            this.getVisitorCountry().then(countryData => {
                if (countryData) {
                    this.updateCountryStats(countryData);
                    this.saveVisitorsData();
                    this.updateDisplay();
                }
            });
        }
    }

    // Get visitor's country using IP API
    async getVisitorCountry() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                name: data.country_name,
                code: data.country_code,
                flag: this.getFlagEmoji(data.country_code)
            };
        } catch (error) {
            console.error('Error fetching country data:', error);
            return null;
        }
    }

    // Convert country code to flag emoji
    getFlagEmoji(countryCode) {
        if (!countryCode) return '🌐';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    // Update country statistics
    updateCountryStats(countryData) {
        if (!countryData || !countryData.name) return;

        if (!this.visitorsData.countries[countryData.name]) {
            this.visitorsData.countries[countryData.name] = {
                count: 0,
                flag: countryData.flag
            };
        }
        this.visitorsData.countries[countryData.name].count++;
        
        // Update total visits after updating country count
        this.updateTotalVisits();
    }


    // Animate number counting
    animateCount(element, target, duration = 2000) {
        const start = parseInt(element.textContent);
        const increment = target > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / (target - start)));
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Update the display
    updateDisplay() {
        // Update total visits with animation
        this.animateCount(this.visitorCount, this.visitorsData.totalVisits);

        // Update sidebar visitor count
        if (this.sidebarVisitorCount) {
            this.animateCount(this.sidebarVisitorCount, this.visitorsData.totalVisits);
        }

        // Update country list
        this.updateCountryList();
    }

    // Update the country list display
    updateCountryList() {
        if (!this.countryList) return;

        // Sort countries by visit count
        const sortedCountries = Object.entries(this.visitorsData.countries)
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 5); // Show top 5 countries

        // Create HTML for country list
        const countriesHTML = sortedCountries.map(([name, data]) => `
            <li class="country-item">
                <span class="country-flag">${data.flag}</span>
                <span class="country-name">${name}</span>
                <span class="country-count">${data.count}</span>
            </li>
        `).join('');

        this.countryList.innerHTML = countriesHTML || `
            <li class="country-item">
                <span class="country-flag">🌐</span>
                <span class="country-name">No visits yet</span>
                <span class="country-count">0</span>
            </li>
        `;
    }

    // Reset visitor stats (for testing)
    resetStats() {
        if (confirm('Are you sure you want to reset all visitor statistics?')) {
            localStorage.removeItem(this.storageKey);
            this.visitorsData = {
                totalVisits: 0,
                countries: {},
                lastVisit: null
            };
            this.updateDisplay();
            this.saveVisitorsData();
        }
    }
}

// Initialize visitor tracking when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.visitorTracker = new VisitorTracker();
});
