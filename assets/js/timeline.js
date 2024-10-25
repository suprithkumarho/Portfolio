// Timeline Component Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Experience data based on your resume
    const experienceData = [
        {
            company: "Cisco Systems, Inc.",
            role: "Senior Software Engineer",
            duration: "Aug 2021 – Aug 2022",
            location: "Bengaluru, India",
            project: "Hosted Collaboration Solution (Migration)",
            achievements: [
                "Crafted efficient RESTful APIs with Python and Django, facilitating the migration of more than 15 million phones from customer on-premise to Cisco Unified Communications Manager Cloud",
                "Spearheaded a POC to optimize AWS cloud infrastructure for UC app migration, boosting system scalability by 50%",
                "Implemented and managed Kubernetes environments to deploy and scale Cisco UC applications",
                "Executed cloud migration strategies with zero data loss and minimal downtime"
            ],
            technologies: ["Python", "Django", "AWS", "Kubernetes", "Jenkins", "Docker", "Ansible", "Terraform"]
        },
        {
            company: "Cisco Systems, Inc. (Varite Inc.)",
            role: "Software Engineer",
            duration: "Jan 2020 – Aug 2021",
            location: "Bengaluru, India",
            project: "Hosted Collaboration Solution",
            achievements: [
                "Built microservices using Java and Spring Boot, improving call manager serviceability by 30%",
                "Created OneClick dashboard portal for real-time monitoring and debugging",
                "Engineered Python scripts to automate call flows, reducing manual effort by 40%",
                "Conducted performance testing, improving application response times by 30%"
            ],
            technologies: ["Java", "Spring Boot", "Python", "JUnit", "Mockito", "Maven"]
        },
        {
            company: "Tech Mahindra",
            role: "Software Engineer",
            duration: "Feb 2017 – Dec 2019",
            location: "Bengaluru, India",
            project: "British Telecom OSS",
            achievements: [
                "Developed 20+ features for FTTP and FTTC networks using PL/SQL, Java, and XML",
                "Leveraged Oracle Data Integrator and Apache Sqoop for data transfer and validation",
                "Engaged in full-stack development of React-based Cramer OSS",
                "Led automated OSS telecom network creation, reducing manual effort by 50%"
            ],
            technologies: ["Java", "React", "PL/SQL", "Oracle Data Integrator", "Apache Sqoop", "Hibernate"]
        }
    ];

    // Function to create timeline HTML
    function createTimelineHTML() {
        const timelineContainer = document.querySelector('.timeline-container');
        if (!timelineContainer) return;

        const timelineHTML = experienceData.map((exp, index) => `
            <div class="timeline-item" data-index="${index}">
                <div class="company-card">
                    <div class="company-header">
                        <div class="company-info">
                            <h3 class="company-name">${exp.company}</h3>
                            <div class="company-duration">
                                <i class="fas fa-calendar-alt"></i>
                                ${exp.duration}
                            </div>
                            <div class="company-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${exp.location}
                            </div>
                        </div>
                    </div>
                    <div class="role-details">
                        <h4 class="role-title">${exp.role}</h4>
                        <p class="project-name"><strong>Project:</strong> ${exp.project}</p>
                        <ul class="achievements-list">
                            ${exp.achievements.map(achievement => `
                                <li class="achievement-item">${achievement}</li>
                            `).join('')}
                        </ul>
                        <div class="technologies-used">
                            ${exp.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        timelineContainer.innerHTML = timelineHTML;
    }

    // Initialize timeline
    createTimelineHTML();

    // Add click event listeners to company cards
    document.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', function() {
            const roleDetails = this.querySelector('.role-details');
            const isExpanded = roleDetails.classList.contains('active');
            
            // Close all other expanded cards
            document.querySelectorAll('.role-details.active').forEach(detail => {
                if (detail !== roleDetails) {
                    detail.classList.remove('active');
                }
            });

            // Toggle current card
            roleDetails.classList.toggle('active');

            // Smooth scroll to card if expanding
            if (!isExpanded) {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
});