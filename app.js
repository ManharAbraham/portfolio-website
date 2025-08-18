// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Function to scroll to specific section (used by buttons)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.background = 'rgba(13, 20, 33, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 20, 33, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Download CV functionality
function downloadCV() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'MANHAR ABRAHAM.RESUME.pdf'; // Path to your actual CV file
    link.download = 'Sivalanka_Manhar_Abraham_Resume.pdf';
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Social media links
function openLinkedIn() {
    // In a real implementation, this would open the actual LinkedIn profile
    window.open('https://in.linkedin.com/in/s-manhar-abraham-0b29322a4', '_blank');
    // For demo purposes, show an alert
    //alert('This would open the LinkedIn profile. Replace with actual LinkedIn URL.');
}

function openGitHub() {
    // In a real implementation, this would open the actual GitHub profile
    window.open('https://github.com/ManharAbraham', '_blank');
    // For demo purposes, show an alert
    //alert('This would open the GitHub profile. Replace with actual GitHub URL.');
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .cert-category, .contact-item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Start subtitle animation after title is complete
            animateSubtitle();
        }
    }, 100);
}

function animateSubtitle() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
    }
}

// Enhanced scroll to top functionality
let scrollToTopBtn;

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-primary);
        color: var(--bg-primary);
        border: none;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(0, 191, 255, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
        scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(0, 191, 255, 0.3)';
    });
    
    document.body.appendChild(scrollToTopBtn);
}

// Show/hide scroll to top button
function toggleScrollToTopButton() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
}

// Smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isDecimal = finalValue.includes('.');
        const numericValue = parseFloat(finalValue);
        
        if (!isNaN(numericValue)) {
            stat.textContent = '0';
            
            const increment = numericValue / 50; // 50 steps for animation
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    if (isDecimal) {
                        stat.textContent = current.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                    }
                }
            }, 50);
        }
    });
}

// Enhanced project card interactions
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Skill tag hover effects
function enhanceSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05) translateY(-2px)';
            tag.style.boxShadow = '0 4px 15px rgba(0, 191, 255, 0.2)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    createScrollToTopButton();
    
    // Enhance interactive elements
    enhanceProjectCards();
    enhanceSkillTags();
    
    // Set up scroll listener for scroll to top button
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Optional: Enable typing effect for hero title
    // Uncomment the line below if you want the typing effect
    // setTimeout(typeWriterEffect, 1000);
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimized scroll handlers
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
const debouncedToggleScrollToTopButton = debounce(toggleScrollToTopButton, 10);

// Replace scroll event listeners with debounced versions for better performance
window.removeEventListener('scroll', updateActiveNavLink);
window.removeEventListener('scroll', toggleScrollToTopButton);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);
window.addEventListener('scroll', debouncedToggleScrollToTopButton);

// Handle contact form interactions (if a form is added later)
function handleContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const emailLink = item.querySelector('a[href^="mailto:"]');
            const phoneLink = item.querySelector('a[href^="tel:"]');
            
            if (emailLink) {
                window.location.href = emailLink.href;
            } else if (phoneLink) {
                window.location.href = phoneLink.href;
            }
        });
    });
}

// Initialize contact interactions
document.addEventListener('DOMContentLoaded', handleContactForm);

// Prevent default behavior for demo links
document.addEventListener('DOMContentLoaded', () => {
    const demoButtons = document.querySelectorAll('.btn-outline');
    demoButtons.forEach(btn => {
        if (btn.textContent.includes('LinkedIn') || btn.textContent.includes('GitHub')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.textContent.includes('LinkedIn')) {
                    openLinkedIn();
                } else {
                    openGitHub();
                }
            });
        }
    });
});