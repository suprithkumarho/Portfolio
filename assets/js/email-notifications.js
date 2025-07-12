// Email Notification System for Portfolio Views
class ProfileViewNotifier {
    constructor() {
        this.notificationSent = false;
        this.lastNotificationDate = null;
        this.storageKey = 'portfolio_view_notification';
        this.init();
    }

    init() {
        // Check if we should send a notification
        this.checkAndSendNotification();
    }

    checkAndSendNotification() {
        const today = new Date().toDateString();
        const lastNotification = localStorage.getItem(this.storageKey);
        
        // Only send one notification per day to avoid spam
        if (lastNotification !== today) {
            this.sendNotification();
            localStorage.setItem(this.storageKey, today);
        }
    }

    async sendNotification() {
        try {
            // Get visitor information
            const visitorInfo = await this.getVisitorInfo();
            
            // Create notification data
            const notificationData = {
                to: 'suprith0112@gmail.com',
                subject: 'Portfolio View Notification',
                message: this.createNotificationMessage(visitorInfo),
                timestamp: new Date().toISOString(),
                visitor: visitorInfo
            };

            // Using Formspree (your endpoint)
            await this.sendViaFormspree(notificationData);
            
            console.log('Profile view notification sent successfully');
            this.notificationSent = true;
            
        } catch (error) {
            console.error('Error sending profile view notification:', error);
        }
    }

    async sendViaFormspree(notificationData) {
        // Using your Formspree endpoint
        const formData = new FormData();
        formData.append('email', notificationData.to);
        formData.append('subject', notificationData.subject);
        formData.append('message', notificationData.message);
        formData.append('visitor_ip', notificationData.visitor.ip);
        formData.append('visitor_location', notificationData.visitor.location);
        formData.append('visitor_browser', notificationData.visitor.browser);
        formData.append('visitor_device', notificationData.visitor.device);
        formData.append('visit_date', new Date().toLocaleString());
        formData.append('portfolio_url', window.location.href);

        const response = await fetch('https://formspree.io/f/mnnzaaoz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Notification sent via Formspree successfully');
        } else {
            throw new Error('Failed to send via Formspree');
        }
    }

    createNotificationMessage(visitorInfo) {
        return `
🚀 New Portfolio View Detected!

📊 Visitor Information:
• IP Address: ${visitorInfo.ip}
• Location: ${visitorInfo.location}
• Browser: ${visitorInfo.browser}
• Device: ${visitorInfo.device}
• Visit Date: ${new Date().toLocaleString()}
• Portfolio URL: ${window.location.href}

📈 This is an automated notification from your portfolio website.
The visitor has viewed your portfolio and may be interested in your work!

Best regards,
Your Portfolio Website
        `;
    }

    async getVisitorInfo() {
        try {
            // Get IP and location info
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            // Detect browser and device info
            const userAgent = navigator.userAgent;
            const browser = this.detectBrowser(userAgent);
            const device = this.detectDevice(userAgent);
            
            return {
                ip: data.ip || 'Unknown',
                location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
                browser: browser,
                device: device,
                userAgent: userAgent.substring(0, 100) + '...'
            };
        } catch (error) {
            console.error('Error fetching visitor info:', error);
            return {
                ip: 'Unknown',
                location: 'Unknown',
                browser: 'Unknown',
                device: 'Unknown',
                userAgent: navigator.userAgent.substring(0, 100) + '...'
            };
        }
    }

    detectBrowser(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        return 'Unknown Browser';
    }

    detectDevice(userAgent) {
        if (userAgent.includes('Mobile')) return 'Mobile';
        if (userAgent.includes('Tablet')) return 'Tablet';
        if (userAgent.includes('iPad')) return 'iPad';
        if (userAgent.includes('iPhone')) return 'iPhone';
        if (userAgent.includes('Android')) return 'Android';
        return 'Desktop';
    }

    // Method to manually send notification (for testing)
    async sendTestNotification() {
        console.log('Sending test notification...');
        await this.sendNotification();
    }
}

// Initialize profile view notifications when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure other scripts are loaded
    setTimeout(() => {
        window.profileViewNotifier = new ProfileViewNotifier();
    }, 1000);
});

// Alternative: Simple notification using a free email service
class SimpleEmailNotifier {
    constructor() {
        this.notificationSent = false;
        this.lastNotificationDate = null;
        this.storageKey = 'portfolio_simple_email';
        this.init();
    }

    init() {
        this.checkAndSendNotification();
    }

    checkAndSendNotification() {
        const today = new Date().toDateString();
        const lastNotification = localStorage.getItem(this.storageKey);
        
        if (lastNotification !== today) {
            this.sendSimpleEmail();
            localStorage.setItem(this.storageKey, today);
        }
    }

    async sendSimpleEmail() {
        try {
            const visitorInfo = await this.getVisitorInfo();
            
            // Using Formspree for simple notifications too
            const formData = new FormData();
            formData.append('email', 'suprith0112@gmail.com');
            formData.append('subject', 'Portfolio View Notification');
            formData.append('message', this.createEmailMessage(visitorInfo));
            formData.append('visitor_ip', visitorInfo.ip);
            formData.append('visitor_location', visitorInfo.location);
            formData.append('visitor_browser', visitorInfo.browser);
            formData.append('visitor_device', visitorInfo.device);
            formData.append('visit_date', new Date().toLocaleString());

            const response = await fetch('https://formspree.io/f/mnnzaaoz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log('📧 Email Notification sent to suprith0112@gmail.com');
                this.notificationSent = true;
            } else {
                console.error('Failed to send notification');
            }
            
        } catch (error) {
            console.error('Error sending email notification:', error);
        }
    }

    createEmailMessage(visitorInfo) {
        return `
Hello Harihar Omkarachari Suprith Kumar,

You have a new portfolio view!

Visitor Details:
- IP: ${visitorInfo.ip}
- Location: ${visitorInfo.location}
- Browser: ${visitorInfo.browser}
- Device: ${visitorInfo.device}
- Time: ${new Date().toLocaleString()}

Someone is checking out your work! 🎉

Best regards,
Your Portfolio Website
        `;
    }

    async getVisitorInfo() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            return {
                ip: data.ip || 'Unknown',
                location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
                browser: this.detectBrowser(navigator.userAgent),
                device: this.detectDevice(navigator.userAgent)
            };
        } catch (error) {
            return {
                ip: 'Unknown',
                location: 'Unknown',
                browser: 'Unknown',
                device: 'Unknown'
            };
        }
    }

    detectBrowser(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    detectDevice(userAgent) {
        if (userAgent.includes('Mobile')) return 'Mobile';
        if (userAgent.includes('Tablet')) return 'Tablet';
        return 'Desktop';
    }
}

// Initialize simple email notifier
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.simpleEmailNotifier = new SimpleEmailNotifier();
    }, 1000);
}); 