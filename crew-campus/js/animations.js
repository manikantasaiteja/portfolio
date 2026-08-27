// Scroll-triggered animations for Crew Campus
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to observe for scroll animations
    const animatedElements = document.querySelectorAll(
        '.content-section, .problem-section, .testing-section, .final-gallery, .learnings-section, .mobile-gallery'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add stagger animation to mobile screens
    const mobileScreens = document.querySelectorAll('.mobile-screen');
    mobileScreens.forEach((screen, index) => {
        screen.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to final screens
    const finalScreens = document.querySelectorAll('.final-screen');
    finalScreens.forEach((screen, index) => {
        screen.style.animationDelay = `${index * 0.15}s`;
    });

    // Add stagger animation to problem points
    const problemPoints = document.querySelectorAll('.problem-points li, .takeaways li');
    problemPoints.forEach((point, index) => {
        point.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to tasks
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task, index) => {
        task.style.animationDelay = `${index * 0.2}s`;
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to background screens
    // Store base transforms so we don't concatenate on every scroll event
    const bgScreens = document.querySelectorAll('.bg-screen');
    const baseTransforms = Array.from(bgScreens).map(screen =>
        getComputedStyle(screen).transform === 'none' ? '' : getComputedStyle(screen).transform
    );

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        bgScreens.forEach((screen, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            screen.style.transform = `${baseTransforms[index]} translateY(${yPos}px)`;
        });
    });

    // Add hover effect to content text
    const contentTexts = document.querySelectorAll('.content-text');
    contentTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#333';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#555';
        });
    });

    // Add typing effect to project title
    const projectTitle = document.querySelector('.project-title');
    if (projectTitle) {
        const text = projectTitle.textContent;
        projectTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                projectTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// CSS classes for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards !important;
    }
    
    body:not(.loaded) .main-container {
        opacity: 0;
    }
    
    body.loaded .main-container {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);