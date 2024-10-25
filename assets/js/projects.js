
document.addEventListener('DOMContentLoaded', function() {
    
    const projectsData = [
        {
            title: "PatientVerify",
            description: "A scalable healthcare patient management app using AWS with facial recognition, reducing identification errors by 20% and administrative burden.",
            image: "assets/images/projects/patientverify.jpg",
            technologies: ["HTML", "CSS", "JavaScript", "AWS S3", "AWS Rekognition", "DynamoDB", "Lambda", "API Gateway", "IAM"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Mar 2024 – Apr 2024"
        },
        {
            title: "ResiComm",
            description: "Academic web app for housing community with house booking, visitor passes, parking management, chat, and announcements, improving resident engagement by 40%.",
            image: "assets/images/projects/resicomm.jpg",
            technologies: ["HTML", "CSS", "JavaScript", "Laravel", "PHP", "NodeJs", "React", "MySQL", "XAMPP"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Sep 2023 – Dec 2023"
        },
        {
            title: "PARK-IT",
            description: "Parking management system integrated with campus maps and sensors, enabling users to find, reserve, and navigate to available parking slots.",
            image: "assets/images/projects/parkit.jpg",
            technologies: ["ReactJs", "Firebase", "GCP Spanner", "Video Intelligence API", "Cloud Storage"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Jan 2023 – Apr 2023"
        },
        {
            title: "Smart Home Automation",
            description: "IoT-based home automation system with real-time monitoring and control capabilities using AWS IoT Core and React Native mobile app.",
            image: "assets/images/projects/smarthome.jpg",
            technologies: ["React Native", "AWS IoT", "NodeJS", "MongoDB", "MQTT", "Express"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Jun 2023 – Aug 2023"
        },
        {
            title: "AI Image Generator",
            description: "Web application utilizing OpenAI's DALL-E API to generate and manipulate images with natural language prompts.",
            image: "assets/images/projects/aigen.jpg",
            technologies: ["React", "Node.js", "OpenAI API", "MongoDB", "Express", "AWS S3"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Apr 2023 – May 2023"
        },
        {
            title: "DevOps Pipeline",
            description: "Automated CI/CD pipeline implementation using Jenkins, Docker, and Kubernetes for microservices deployment.",
            image: "assets/images/projects/devops.jpg",
            technologies: ["Jenkins", "Docker", "Kubernetes", "AWS", "Terraform", "Git"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Feb 2023 – Mar 2023"
        }
    ];

    // Function to create project cards with animation delay
    function createProjectCards(filteredProjects = projectsData) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        const projectsHTML = filteredProjects.map((project, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay"></div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-stack">
                        ${project.technologies.map(tech => `
                            <span class="tech-badge" data-tech="${tech}">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        ${project.links.demo ? `
                            <a href="${project.links.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>
                        ` : ''}
                        ${project.links.github ? `
                            <a href="${project.links.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github"></i>
                                Source Code
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        projectsGrid.innerHTML = projectsHTML;
    }

    
    function initializeFilters() {
        const technologies = new Set();
        projectsData.forEach(project => {
            project.technologies.forEach(tech => technologies.add(tech));
        });

        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.innerHTML = `
            <div class="filter-chips">
                <button class="filter-chip active" data-tech="all">All Projects</button>
                ${Array.from(technologies).sort().map(tech => `
                    <button class="filter-chip" data-tech="${tech}">${tech}</button>
                `).join('')}
            </div>
        `;

        const projectsSection = document.querySelector('#projects');
        projectsSection.insertBefore(filterContainer, projectsSection.querySelector('.projects-grid'));

        // Filter event listeners with animation
        filterContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-chip')) return;

            // Update active state
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.remove('active');
            });
            e.target.classList.add('active');

            // Filter projects with animation
            const selectedTech = e.target.dataset.tech;
            const projectsGrid = document.querySelector('.projects-grid');
            
            // Add fade-out class
            projectsGrid.classList.add('fade-out');

            // Wait for fade-out animation
            setTimeout(() => {
                if (selectedTech === 'all') {
                    createProjectCards(projectsData);
                } else {
                    const filteredProjects = projectsData.filter(project =>
                        project.technologies.includes(selectedTech)
                    );
                    createProjectCards(filteredProjects);
                }
                
                // Remove fade-out class and add fade-in
                projectsGrid.classList.remove('fade-out');
                projectsGrid.classList.add('fade-in');

                // Remove fade-in class after animation
                setTimeout(() => {
                    projectsGrid.classList.remove('fade-in');
                }, 500);
            }, 300);
        });
    }

    // Initialize lazy loading for images
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize
    createProjectCards();
    initializeFilters();
    initializeLazyLoading();

    // Add resize handler for grid layout
    window.addEventListener('resize', () => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = 1; // Reset opacity for resize
        });
    });
});