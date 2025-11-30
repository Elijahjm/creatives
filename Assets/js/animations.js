// GSAP Initialization
gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);
gsap.defaults({ ease: "power3.out" });

// Global utility to check for reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Handles all GSAP animations for the page.
 */
const Animation = {
    init: function() {
        if (prefersReducedMotion) {
            console.log("Reduced motion is enabled. Disabling complex animations.");
            // Ensure the initial state elements are visible for reduced motion users
            document.querySelectorAll('.gsap-reveal, .animate-section').forEach(el => el.style.opacity = 1);
            return;
        }

        this.heroEntrance();
        this.setupSectionReveals();
    },

    // Hero Section Animations: Heading slide-up and slogan reveal
    heroEntrance: function() {
        const tl = gsap.timeline();

        const headline = document.getElementById('hero-headline');
        if (headline) {
            // Select inner elements for line-by-line reveal
            const lines = headline.querySelectorAll('.gsap-line-inner');

            // 1. Slogan Reveal
            tl.from('.gsap-reveal', {
                opacity: 0,
                duration: 0.8,
                y: 20
            }, 0.2)

            // 2. Headline Line-by-Line Slide Up
            tl.from(lines, {
                yPercent: 100, // Slide up from bottom
                stagger: 0.2, // Stagger between lines
                duration: 1.2,
                skewY: 5,
                ease: "power4.out"
            }, 0.5)

            // 3. CTA Buttons Fade In
            tl.from('.hero-gradient a', {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.6
            }, 1.2);
        }
    },

    // Section Entrance Animations (Mimicking AOS, controlled by ScrollTrigger)
    setupSectionReveals: function() {
        document.querySelectorAll('.animate-section').forEach(section => {
            const delay = section.getAttribute('data-delay') || 0;

            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%", // Start animation when 85% of section is visible
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1.2,
                delay: parseFloat(delay), // Use data-delay attribute
                ease: "power3.out"
            });
        });
    }
};

// Auto-initialize the animation logic on document load via main.js



