// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll for anchor links (only for internal links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open current if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set end time to end of day
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        countdownElement.textContent = '00:00:00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Affiliate link click tracking
const affiliateLink = "https://efbb9hmdfliyls0xekyc-c-t67.hop.clickbank.net";

// Track all affiliate link clicks
document.querySelectorAll(`a[href="${affiliateLink}"]`).forEach(link => {
    link.addEventListener('click', function(e) {
        const card = this.closest('.pricing-card');
        let packageName = "General";
        let price = "";
        
        if (card) {
            packageName = card.querySelector('.pricing-badge')?.textContent || 'Package';
            price = card.querySelector('.current-price')?.textContent || '';
        } else if (this.closest('.hero-cta')) {
            packageName = "Hero Section";
        } else if (this.closest('.guarantee')) {
            packageName = "Guarantee Section";
        }
        
        // Google Analytics would go here
        console.log(`💰 Affiliate Click - Package: ${packageName}, Price: ${price}`);
        console.log(`🔗 Redirecting to: ${affiliateLink}`);
        
        // Allow the default link behavior to proceed
        // No e.preventDefault() - let the link work normally
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Animate stats counter when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.round(current) + (stat.textContent.includes('k') ? 'k+' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + (stat.textContent.includes('k') ? 'k+' : '');
                    }
                };
                
                updateCounter();
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.testimonial-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Page loaded analytics
console.log('🚀 Premium landing page loaded');
console.log('💰 Pricing packages displayed with affiliate links');
console.log('🔗 Affiliate URL: https://efbb9hmdfliyls0xekyc-c-t67.hop.clickbank.net');
console.log('⭐ Testimonials loaded');
console.log('🛡️ 60-day guarantee highlighted');