  // Create snowflakes
        function createSnowflakes() {
            const snowContainer = document.getElementById('snow-container');
            const snowflakeCount = 80;
            
            for (let i = 0; i < snowflakeCount; i++) {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                snowflake.style.width = `${size}px`;
                snowflake.style.height = `${size}px`;
                
                // Random position
                snowflake.style.left = `${Math.random() * 100}vw`;
                
                // Random animation duration between 5s and 15s
                const duration = Math.random() * 10 + 5;
                snowflake.style.animationDuration = `${duration}s`;
                
                // Random delay
                snowflake.style.animationDelay = `${Math.random() * 5}s`;
                
                snowContainer.appendChild(snowflake);
            }
        }
        
        // Initialize GSAP animations
        function initAnimations() {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section animation
            gsap.from('.hero-name', {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            });
            
            gsap.from('.hero-title', {
                duration: 1.5,
                y: 30,
                opacity: 0,
                delay: 0.3,
                ease: "power3.out"
            });
            
            gsap.from('.hero-content p', {
                duration: 1.5,
                y: 30,
                opacity: 0,
                delay: 0.6,
                ease: "power3.out"
            });
            
            gsap.from('.hero-btns', {
                duration: 1.5,
                y: 30,
                opacity: 0,
                delay: 0.9,
                ease: "power3.out"
            });
            
            gsap.from('.profile-img-placeholder', {
                duration: 1.5,
                scale: 0.5,
                opacity: 0,
                delay: 0.6,
                ease: "back.out(1.7)"
            });
            
            // About section animation
            gsap.from('.about-section .glass-card', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            
            // Section title animations
            gsap.utils.toArray('.fade-in').forEach(element => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });
            
            // Cards animations
            gsap.utils.toArray('.glass-card').forEach((card, i) => {
                if (!card.parentElement.closest('#home')) { // Exclude hero section cards
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "bottom 20%",
                            toggleActions: "play none none none"
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "power3.out"
                    });
                }
            });
            
            // Skill items animations
            gsap.utils.toArray('.skill-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    },
                    x: -30,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: "power3.out"
                });
            });
        }
        
        // Navbar scroll effect
        function initNavbar() {
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.padding = '0.5rem 0';
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.padding = '1rem 0';
                    navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                    navbar.style.boxShadow = 'none';
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                });
            });
        }
        
      
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createSnowflakes();
            initAnimations();
            initNavbar();
          
            
            // Add active class to nav links on scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');
                
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= (sectionTop - 100)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Make navbar toggler work
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarNav = document.querySelector('#navbarNav');
            
            navbarToggler.addEventListener('click', function() {
                navbarNav.classList.toggle('show');
            });
        });