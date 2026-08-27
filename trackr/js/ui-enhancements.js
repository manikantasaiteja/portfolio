// UI Enhancements for Trackr Case Study
document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL PROGRESS BAR
    // ═══════════════════════════════════════════════════════════════
    const scrollProgress = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    
    // ═══════════════════════════════════════════════════════════════
    // BACK TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.pointerEvents = 'auto';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.pointerEvents = 'none';
            }
        });
        
        // Initially hide the button
        backToTopButton.style.opacity = '0';
        backToTopButton.style.pointerEvents = 'none';
    }
    
    
    // ═══════════════════════════════════════════════════════════════
    // PARALLAX ORB MOVEMENT
    // ═══════════════════════════════════════════════════════════════
    const orbs = document.querySelectorAll('.orb');
    
    function moveOrbs() {
        const scrollY = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05); // Different speeds for each orb
            const yPos = scrollY * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', moveOrbs);
    
    
    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" (like back to top button)
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ═══════════════════════════════════════════════════════════════
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    
    // ═══════════════════════════════════════════════════════════════
    // CUSTOM CURSOR TRAIL EFFECT (Optional Enhancement)
    // ═══════════════════════════════════════════════════════════════
    let cursorTrail = [];
    const trailLength = 5;
    
    function createCursorDot() {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.opacity = '0';
        dot.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(dot);
        return dot;
    }
    
    // Initialize cursor trail dots
    for (let i = 0; i < trailLength; i++) {
        cursorTrail.push(createCursorDot());
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let currentIndex = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursorTrail() {
        const dot = cursorTrail[currentIndex];
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        dot.style.opacity = '0.6';
        
        setTimeout(() => {
            dot.style.opacity = '0';
        }, 300);
        
        currentIndex = (currentIndex + 1) % trailLength;
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    // Start cursor trail animation
    animateCursorTrail();
    
    
    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE OPTIMIZATION
    // ═══════════════════════════════════════════════════════════════
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const currentScrollY = window.pageYOffset;
            
            // Only update if scroll position changed significantly
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
                lastScrollY = currentScrollY;
            }
        });
    }, { passive: true });
    
    
    // ═══════════════════════════════════════════════════════════════
    // CONSOLE MESSAGE
    // ═══════════════════════════════════════════════════════════════
    console.log('%c✨ Trackr UI Enhancements Loaded', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Developed by Manikanta Sai Teja', 'color: #764ba2; font-size: 12px;');
});
