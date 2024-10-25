// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create and inject contact form HTML
    function createContactForm() {
        const contactContainer = document.querySelector('.contact-container');
        if (!contactContainer) return;

        contactContainer.innerHTML = `
            <div class="contact-wrapper">
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:kumar.suprithho@gmail.com">kumar.suprithho@gmail.com</a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <a href="https://linkedin.com/in/hosuprithkumar" target="_blank">linkedin.com/in/hosuprithkumar</a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <a href="https://github.com/suprithkumarho" target="_blank">github.com/suprithkumarho</a>
                    </div>
                </div>
                <form id="contactForm" class="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">
                        <i class="fas fa-paper-plane"></i>
                        Send Message
                    </button>
                </form>
            </div>
        `;
    }

    // Initialize contact form
    createContactForm();

    // Form validation
    function validateForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Reset previous error states
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });

        let isValid = true;

        // Name validation
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('error');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            isValid = false;
        }

        // Subject validation
        if (subjectInput.value.trim().length < 3) {
            subjectInput.classList.add('error');
            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate form submission (replace with actual email service implementation)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

                // Clear form
                contactForm.reset();
                showNotification('Message sent successfully!', 'success');
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Real-time validation feedback
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm();
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateForm();
            }
        });
    });
});