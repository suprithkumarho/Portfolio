// Education Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Education section functionality
    const educationSection = document.getElementById('education');
    
    if (educationSection) {
        // Add any education-specific animations or interactions here
        console.log('Education section loaded');
        
        // Optional: Add smooth scrolling for education links
        const educationLinks = educationSection.querySelectorAll('a[href^="#"]');
        educationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}); 