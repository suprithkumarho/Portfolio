// Skills Component Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Skill data structure
    const skillsData = {
        languages: [
            { name: 'Java', icon: 'fab fa-java', level: 90 },
            { name: 'Python', icon: 'fab fa-python', level: 85 },
            { name: 'JavaScript', icon: 'fab fa-js', level: 88 },
            { name: 'C/C++', icon: 'fas fa-code', level: 82 },
            { name: 'SQL', icon: 'fas fa-database', level: 90 },
            { name: 'PL/SQL', icon: 'fas fa-database', level: 85 }
        ],
        frameworks: [
            { name: 'React', icon: 'fab fa-react', level: 88 },
            { name: 'Node.js', icon: 'fab fa-node-js', level: 85 },
            { name: 'Django', icon: 'fab fa-python', level: 82 },
            { name: 'Spring Boot', icon: 'fas fa-leaf', level: 88 },
            { name: 'Laravel', icon: 'fab fa-laravel', level: 80 },
            { name: 'Flask', icon: 'fab fa-python', level: 85 }
        ],
        cloud: [
            { name: 'AWS', icon: 'fab fa-aws', level: 90 },
            { name: 'Docker', icon: 'fab fa-docker', level: 85 },
            { name: 'Kubernetes', icon: 'fas fa-dharmachakra', level: 82 },
            { name: 'Jenkins', icon: 'fab fa-jenkins', level: 85 },
            { name: 'GCP', icon: 'fab fa-google', level: 80 },
            { name: 'Terraform', icon: 'fas fa-cloud', level: 78 }
        ],
        databases: [
            { name: 'MySQL', icon: 'fas fa-database', level: 90 },
            { name: 'PostgreSQL', icon: 'fas fa-database', level: 85 },
            { name: 'MongoDB', icon: 'fas fa-database', level: 82 },
            { name: 'Oracle', icon: 'fas fa-database', level: 88 },
            { name: 'DynamoDB', icon: 'fas fa-database', level: 80 },
            { name: 'Redis', icon: 'fas fa-database', level: 75 }
        ]
    };

    // DOM Elements
    const skillsContainer = document.querySelector('.skills-container');
    const skillNavItems = document.querySelectorAll('.skill-nav-item');
    let currentCategory = 'languages';

    // Create skill cards
    function createSkillCard(skill) {
        return `
            <div class="skill-card" data-aos="fade-up">
                <i class="${skill.icon} skill-icon"></i>
                <h3>${skill.name}</h3>
                <div class="skill-level">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
    }

    // Render skills for a category
    function renderSkills(category) {
        const skillsGroup = document.getElementById(category);
        if (!skillsGroup) return;

        const skillsHTML = skillsData[category].map(createSkillCard).join('');
        const skillsGrid = skillsGroup.querySelector('.skills-grid');
        skillsGrid.innerHTML = skillsHTML;

        // Trigger progress bar animations
        setTimeout(() => {
            skillsGrid.querySelectorAll('.skill-progress').forEach(progress => {
                progress.style.transform = 'scaleX(1)';
            });
        }, 100);
    }

    // Switch category
    function switchCategory(category) {
        // Update active states
        document.querySelectorAll('.skills-group').forEach(group => {
            group.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');

        // Update navigation
        skillNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.target === category) {
                item.classList.add('active');
            }
        });

        // Render new category
        renderSkills(category);
        currentCategory = category;
    }

    // Initialize skills section
    function initializeSkills() {
        // Add click events to navigation items
        skillNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.target;
                if (category !== currentCategory) {
                    switchCategory(category);
                }
            });
        });

        // Initial render
        renderSkills(currentCategory);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill cards when they come into view
                entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add observer to skills groups
    document.querySelectorAll('.skills-group').forEach(group => {
        skillsObserver.observe(group);
    });

    // Filter functionality
    function filterSkills(searchTerm) {
        const normalizedSearch = searchTerm.toLowerCase();
        document.querySelectorAll('.skill-card').forEach(card => {
            const skillName = card.querySelector('h3').textContent.toLowerCase();
            if (skillName.includes(normalizedSearch)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add search functionality if needed
    const searchInput = document.querySelector('.skills-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterSkills(e.target.value);
        });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderSkills(currentCategory);
        }, 250);
    });

    // Initialize
    initializeSkills();
});