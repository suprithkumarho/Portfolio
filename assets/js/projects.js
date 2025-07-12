
document.addEventListener('DOMContentLoaded', function() {
    
    const projectsData = [
        {
            title: "KioskInsight",
            description: "Automated product recognition and shelf placement in kiosks using Python and AWS achieving 70% accuracy. Generated detailed reports and improved inventory management, reducing manual verification time by 80%.",
            image: "kioskinsight.jpg",
            technologies: ["Python", "FPDF", "PIL", "OpenCV", "AWS S3", "AWS Rekognition", "AWS Lambda", "AWS SageMaker"],
            links: {
                github: "#"
            },
            date: "May 2024 – May 2024"
        },
        {
            title: "PatientVerify",
            description: "A scalable healthcare patient management app using AWS with facial recognition, reducing identification errors by 20% and administrative burden. Provided doctors with easy access to patient medical history for improved care.",
            image: "patientverify.png",
            technologies: ["HTML", "CSS", "JavaScript", "AWS S3", "AWS Rekognition", "DynamoDB", "Lambda", "API Gateway", "IAM"],
            links: {
                github: "https://github.com/suprithkumarho/AWS_Patient_Identity_Verification"
            },
            date: "Mar 2024 – Apr 2024"
        },
        {
            title: "Sentiment Analysis for Movie Reviews",
            description: "Implemented a deep learning-based sentiment analysis model for movie reviews. Achieved up to 87.83% accuracy through advanced preprocessing and neural network techniques.",
            image: "sentiment-analysis.jpg",
            technologies: ["Python", "TensorFlow", "NLTK", "Word2Vec", "LSTM", "CNN", "RNN", "BiLSTM"],
            links: {
                github: "#"
            },
            date: "Jan 2024 – Mar 2024"
        },
        {
            title: "ResiComm",
            description: "Academic web app for housing community with house booking, visitor passes, parking management, chat, and announcements, improving resident engagement by 40%.",
            image: "resicomm.jpg",
            technologies: ["HTML", "CSS", "JavaScript", "Laravel", "PHP", "NodeJs", "React", "MySQL", "XAMPP"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Sep 2023 – Dec 2023"
        },
        {
            title: "PARK-IT",
            description: "Parking management system integrated with campus maps and sensors, enabling users to find, reserve, and navigate to available parking slots. Reduced congestion and parking time by 50%.",
            image: "parkit.jpg",
            technologies: ["ReactJs", "Firebase", "smtplib", "GCP Spanner", "Video Intelligence API", "Cloud Storage"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Jan 2023 – Apr 2023"
        },
        {
            title: "Issue Tracker",
            description: "Developed a location-based public grievances platform enabling users to report community issues in real-time. Implemented tracking of resolution status and increased civic engagement.",
            image: "issue-tracker.jpg",
            technologies: ["PHP", "MySQL"],
            links: {
                demo: "#",
                github: "#"
            },
            date: "Sep 2022 – Dec 2022"
        },
        {
            title: "Nike Footwear Fashion",
            description: "Modern React app showcasing latest footwear fashion with interactive UI components.",
            image: "Nike.jpg",
            technologies: ["React", "HTML", "CSS"],
            links: {
                github: "https://github.com/suprithkumarho/NikeShopping"
            },
            date: "June 2024"
        }
    ];

    function getImagePath(imagePath) {
        // Base path for images (relative to current page)
        const basePath = 'assets/images/';
        
        // Default fallback image
        const fallbackImage = `${basePath}profile.jpg`;
        
        // If no image path provided, return fallback
        if (!imagePath) {
            console.warn('No image path provided, using fallback');
            return fallbackImage;
        }
        
        // If image path doesn't start with basePath, add it
        if (!imagePath.startsWith(basePath)) {
            imagePath = basePath + imagePath.split('/').pop();
        }
        
        console.log(`Image path resolved: ${imagePath}`);
        return imagePath;
    }

    // Function to create project cards with animation delay
    function createProjectCards(filteredProjects = projectsData) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
    
        const projectsHTML = filteredProjects.map((project, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <div class="project-image">
                    <img src="${getImagePath(project.image)}" 
                         alt="${project.title}"
                         loading="lazy"
                         onerror="console.warn('Failed to load image for ${project.title}, using fallback'); this.src='assets/images/profile.jpg'; this.onerror=null;"
                         onload="console.log('Successfully loaded image for ${project.title}'); this.classList.add('loaded')"
                    >
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