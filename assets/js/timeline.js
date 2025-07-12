// Timeline Component Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Experience data based on your resume
    const experienceData = [
        {
            company: "Boto3, Inc. (Client: The Vanguard Group, Inc.)",
            role: "Software Developer",
            duration: "Apr. 2025 – Present",
            location: "California, USA",
            project: "Vanguard Personalized Indexing",
            achievements: [
                "Developed a robust VBA macro script to automate daily data fetching, analysis, and complex computations, streamlining the preparation of trading accounts for portfolio managers; reduced manual processing time by over 1 hour each day, enhancing operational efficiency",
                "Designed and implemented a centralized database architecture to store trading, custodian, and account data, enabling seamless access across applications and improving data availability, integrity, and retrieval efficiency for trading operations"
            ],
            technologies: ["VBA", "Database Architecture"]
        },
        {
            company: "Induci Inc. (Client: The Vanguard Group, Inc.)",
            role: "Software Developer",
            duration: "Jan. 2025 – Mar. 2025",
            location: "California, USA",
            project: "Vanguard Personalized Indexing",
            achievements: [
                "Designed and developed backend applications using Python, Flask, and Dash to streamline portfolio analysis and optimize trading workflows, reducing manual effort for portfolio managers by 40%",
                "Engineered scalable data pipelines handling 400+ high-net-worth client portfolios, utilizing AWS services, and optimizing tax-loss harvesting workflows for enhanced efficiency and savings"
            ],
            technologies: ["Python", "Flask", "Dash", "AWS"]
        },
        {
            company: "ConsultAdd, Inc.",
            role: "Software Developer",
            duration: "Sep. 2024 – Jan. 2025",
            location: "Arlington, USA",
            project: "E-commerce Platform Development",
            achievements: [
                "Developed comprehensive RESTful APIs using Python and Django for e-commerce backend services, implementing features for user authentication, order processing, and payment integration",
                "Executed end-to-end testing and deployment processes, including unit testing, integration testing, and automated deployment pipelines, ensuring robust code quality and seamless production releases"
            ],
            technologies: ["Python", "Django", "RESTful APIs"]
        },
        {
            company: "Changing The Present (Voluntary, NGO)",
            role: "Software Intern",
            duration: "Jul. 2024 – Sep. 2024",
            location: "Arlington, USA",
            project: "Ecommerce Website for small Business",
            achievements: [
                "Implemented automated web scraping solutions using Python to gather product data from multiple websites, increasing data collection efficiency by 40% and supporting market analysis",
                "Built end-to-end data pipelines that transformed raw scraped data into usable marketing insights, enabling more targeted campaign strategies and improved decision-making processes"
            ],
            technologies: ["Python", "Web Scraping", "Data Pipelines"]
        },
        {
            company: "University of Texas at Arlington",
            role: "Student Assistant",
            duration: "May 2023 – May 2024",
            location: "Arlington, USA",
            project: "Office of Information Technology",
            achievements: [
                "Developed and implemented a comprehensive faculty hierarchy visualization feature for UTA's internal website, designing database queries and user interfaces that improved information accessibility for over 500 users across departments, resulting in enhanced transparency in organizational structure",
                "Resolved critical student authentication issues by identifying root causes and implementing systematic solutions, which reduced related support tickets by 15% and significantly improved student access to online university services",
                "Engineered Python scripts to categorize and organize ServiceNode tickets for an AI-driven ChatBot initiative, collaborating with cross-functional teams to establish data foundations that streamlined issue resolution processes and created a framework for future automation"
            ],
            technologies: ["Python", "Database Queries", "Web Development"]
        },
        {
            company: "Cisco Systems, Inc.",
            role: "Senior Software Engineer",
            duration: "Aug. 2021 – Aug. 2022",
            location: "Bengaluru, India",
            project: "Hosted Collaboration Solution (Migration)",
            achievements: [
                "Led migration of 15+ million phones to Cisco Unified Communications Manager Cloud using AWS services, resulting in 30% improved service reliability and scalability while reducing system downtime by 30%",
                "Developed RESTful APIs with Python and Django to facilitate migration workflows, integrating with CI/CD pipelines for 60% faster deployments and continuous delivery",
                "Engineered automated testing frameworks with PyTest integrated with Jenkins, increasing test coverage by 40% and significantly reducing post-deployment issues",
                "Implemented monitoring solutions using Grafana and Prometheus to track critical metrics during migration, achieving 99.9% uptime throughout the process",
                "Optimized AWS cloud infrastructure for UC applications, boosting system scalability by 50%",
                "Automated infrastructure management using Kubernetes, Docker, Jenkins, Ansible, and Terraform, achieving faster deployments and higher reliability"
            ],
            technologies: ["Python", "Django", "AWS", "PyTest", "Jenkins", "Grafana", "Prometheus", "Kubernetes", "Docker", "Ansible", "Terraform"],
            awards: ["Cisco Connected Recognition (CR) for successful migration and documentation"]
        },
        {
            company: "Varite Inc. (Client: Cisco Systems, Inc.)",
            role: "Software Engineer",
            duration: "Jan. 2020 – Aug. 2021",
            location: "Bengaluru, India",
            project: "Hosted Collaboration Solution",
            achievements: [
                "Developed microservices architecture using Java, Spring Boot, and Flask, improving service scalability and cloud integration by 30% while ensuring system reliability",
                "Created the OneClick dashboard using React for real-time system monitoring, reducing debugging time by 25% and accelerating issue resolution across development environments",
                "Automated call flows in UC applications using Python scripts, decreasing manual intervention by 40% and streamlining operational processes for enhanced efficiency",
                "Implemented CI/CD pipelines with GitLab and Docker, resulting in 40% faster deployment times and ensuring smoother system upgrades with minimal disruption",
                "Built microservices using Java and Spring Boot, improving Cisco UC app performance and cloud integration",
                "Created a OneClick dashboard for real-time monitoring of development suites, increasing user satisfaction by 25%"
            ],
            technologies: ["Java", "Spring Boot", "Flask", "React", "Python", "GitLab", "Docker"]
        },
        {
            company: "Tech Mahindra",
            role: "Software Engineer",
            duration: "Feb. 2017 – Dec. 2019",
            location: "Bengaluru, India",
            project: "British Telecom OSS & Mahindra IntelliPilot (R&D)",
            achievements: [
                "Developed 20+ features for FTTP and FTTC networks using PL/SQL, Java, and XML, significantly improving network reliability and operational efficiency",
                "Designed and implemented automation solutions for telecom network creation using Python and Flask, reducing manual effort by 50% and enhancing network design performance",
                "Migrated 5 TB of data from SQL Developer to Hadoop HDFS using Oracle Data Integrator and Apache Sqoop, decreasing data retrieval times by 40%",
                "Enhanced obstacle recognition systems using TI mmWave radar and custom detection algorithms, improving detection accuracy in various road conditions and environments",
                "Developed vehicle speed prediction models using scikit-learn, resulting in 20% improved prediction accuracy for autonomous driving decisions",
                "Developed features for British Telecom OSS, utilizing Java, PL/SQL, and XML, enhancing network design performance by 50%",
                "Led data migration from SQL Developer to HDFS, improving retrieval speeds by 40%",
                "Developed a React-based Cramer OSS with a Java backend, streamlining network architecture insights and reducing errors"
            ],
            technologies: ["PL/SQL", "Java", "XML", "Python", "Flask", "Hadoop", "Oracle Data Integrator", "Apache Sqoop", "GitLab", "Jenkins", "scikit-learn", "TI mmWave radar", "Kalman filter", "React", "Hibernate"],
            awards: ["Pat on the Back Award for excellent performance", "Bravo Award for outstanding contribution to project success"]
        }
    ];

    // Function to create timeline HTML
    function createTimelineHTML() {
        const timelineContainer = document.querySelector('.timeline-container');
        if (!timelineContainer) {
            console.error('Timeline container not found');
            return;
        }

        console.log('Creating timeline with', experienceData.length, 'entries');
        
        const timelineHTML = experienceData.map((exp, index) => {
            console.log(`Entry ${index}: ${exp.company} - Awards:`, exp.awards);
            
            return `
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
                        ${exp.awards && exp.awards.length > 0 ? `
                            <div class="awards-section">
                                <h5 class="awards-title"><i class="fas fa-trophy"></i> Awards & Recognition</h5>
                                <ul class="awards-list">
                                    ${exp.awards.map(award => `
                                        <li class="award-item"><i class="fas fa-medal"></i> ${award}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        <div class="technologies-used">
                            ${exp.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `}).join('');

        timelineContainer.innerHTML = timelineHTML;
        console.log('Timeline HTML created successfully');
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
                    detail.closest('.company-card').classList.remove('active');
                }
            });

            // Toggle current card
            roleDetails.classList.toggle('active');
            this.classList.toggle('active');

            // Smooth scroll to card if expanding
            if (!isExpanded) {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
});