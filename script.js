document.addEventListener('DOMContentLoaded', () => {

    /* ===== Custom Cursor Glow ===== */
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorGlow) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth glow follow
        function animateGlow() {
            const dx = mouseX - glowX;
            const dy = mouseY - glowY;

            glowX += dx * 0.1;
            glowY += dy * 0.1;

            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateGlow);
        }
        animateGlow();

        // Hide cursor glow when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });

        // Enhance glow on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .stack-item, .stat-item');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '400px';
                cursorGlow.style.height = '400px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)';
            });

            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '300px';
                cursorGlow.style.height = '300px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)';
            });
        });
    }

    /* ===== Video Playback on Hover ===== */
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const video = card.querySelector('.project-video');

        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    /* ===== Scroll Reveal Animation ===== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    /* ===== Mobile Navigation ===== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('mobile-active');

            if (isActive) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('mobile-active');
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
                navLinks.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
                navLinks.classList.add('mobile-active');
            }
        });

        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('mobile-active');
                }
            });
        });
    }

    /* ===== Smooth Scroll Enhancement ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===== Navbar Background on Scroll ===== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ===== Parallax Effect for Hero ===== */
    const hero = document.querySelector('.hero');
    const floatingShapes = document.querySelectorAll('.shape');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.4;

            // Hero parallax
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;

            // Shapes parallax (different speeds for depth)
            floatingShapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
            });
        });
    }

    /* ===== Magnetic Button Effect ===== */
    const buttons = document.querySelectorAll('.btn-primary, .social-btn, .nav-button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    /* ===== Project Card Tilt Effect ===== */
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    /* ===== Animated Stats Counter ===== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = stat.textContent;
                    const isPlus = target.includes('+');
                    const isPercent = target.includes('%');
                    const number = parseInt(target);

                    let current = 0;
                    const increment = number / 50;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }

                        let display = Math.floor(current);
                        if (isPlus) display += '+';
                        if (isPercent) display += '%';

                        stat.textContent = display;
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ===== Add Sparkle Effect on Click ===== */
    document.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = 'radial-gradient(circle, #6366f1, transparent)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = 'sparkle 0.6s ease-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }

    // Add sparkle animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(3) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    /* ===== Console Easter Egg ===== */
    const styles = [
        'font-size: 24px',
        'font-weight: bold',
        'background: linear-gradient(135deg, #667eea, #764ba2)',
        'color: white',
        'padding: 10px 20px',
        'border-radius: 8px'
    ].join(';');

    console.log('%c✨ Welcome to my portfolio!', styles);
    console.log('%cLooking for a developer? Let\'s create something amazing together!', 'font-size: 14px; color: #6366f1;');
    console.log('%c📧 Email: priyathanasekaran@gmail.com', 'font-size: 12px; color: #4a5568;');
    console.log('%c🔗 LinkedIn: linkedin.com/in/lakshmi-priya-t-b01a4a205', 'font-size: 12px; color: #4a5568;');
});
