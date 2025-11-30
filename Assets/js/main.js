// Data Models (Placeholder Data)
const PHRASES = ["Graphics Design", "Computer Setup", "Web Design", "IT Support", "Digital Success"];
const SAMPLE_REVIEWS = [
    { id: 1, name: "Alice J.", rating: 5, text: "Incredible service! They set up our new office network flawlessly. Truly a reliable place.", date: "2024-05-10" },
    { id: 2, name: "Mark K.", rating: 4, text: "The web design team delivered a clean, modern site quickly. Highly responsive support.", date: "2024-04-22" },
    { id: 3, name: "Sarah P.", rating: 5, text: "Best IT support I've ever used. Solved a complex software issue in minutes. 5 stars!", date: "2024-05-15" },
    { id: 4, name: "John D.", rating: 5, text: "Highly recommend their graphic design work. Exceeded expectations!", date: "2024-05-01" },
    { id: 5, name: "Emily B.", rating: 4, text: "Affordable and prompt computer setup. Very knowledgeable team.", date: "2024-04-10" }
];

// Global State for Reviews (Simulated LocalStorage Backend)
const REVIEWS_STORAGE_KEY = 'blessedhands_reviews';

/**
 * Toggles the mobile navigation menu visibility and updates the button icon.
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    
    // Check if the menu is currently hidden (has -translate-x-full class)
    const isHidden = menu.classList.contains('-translate-x-full');

    if (isHidden) {
        // OPEN menu: remove translation, change icon to X
        menu.classList.remove('-translate-x-full');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    } else {
        // CLOSE menu: add translation, change icon back to bars
        menu.classList.add('-translate-x-full');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = ''; // Restore scrolling background
    }
}


/**
 * Manages fetching, calculating, and displaying user reviews.
 */
const Reviews = {
    // Load reviews from local storage or initialize with samples
    getReviews: function() {
        // We simulate a growing review database for the purpose of the demo
        let reviews = SAMPLE_REVIEWS;
        const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);

        if (stored) {
            try {
                // If real reviews exist, merge them with the samples if needed, or just return the stored ones
                reviews = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing stored reviews:", e);
                // Fallback to samples
            }
        }
        return reviews;
    },

    // Calculate and display average rating
    displayAverage: function(reviews) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const count = reviews.length;
        const average = count > 0 ? (totalRating / count) : 0;
        const roundedAverage = Math.round(average * 10) / 10; // Round to 1 decimal

        const starHTML = this.generateStarHTML(Math.round(roundedAverage));

        document.getElementById('average-stars').innerHTML = starHTML;
        document.getElementById('average-rating').textContent = roundedAverage.toFixed(1);
        document.getElementById('total-reviews').textContent = `Based on ${count} reviews`;
    },

    // Generate Font Awesome star icons
    generateStarHTML: function(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                html += `<i class="fas fa-star mx-0.5"></i>`; // Filled star
            } else {
                html += `<i class="far fa-star mx-0.5 text-gray-300"></i>`; // Empty star
            }
        }
        return html;
    },

    // Display sample reviews on the homepage
    displaySamples: function(reviews) {
        const container = document.getElementById('sample-reviews-container');
        if (!container) return;

        // Take the first 3 reviews for the homepage preview
        const samples = reviews.slice(0, 3);

        container.innerHTML = samples.map(review => `
            <div class="bg-white p-6 rounded-2xl card-shadow flex flex-col justify-between">
                <div>
                    <div class="text-bh-accent2 mb-3">
                        ${this.generateStarHTML(review.rating)}
                    </div>
                    <p class="text-gray-700 italic mb-4">"${review.text}"</p>
                </div>
                <div class="text-sm font-semibold text-gray-500">
                    — ${review.name}
                </div>
            </div>
        `).join('');
    }
};

/**
 * Manages the animated typewriter effect in the Hero section.
 */
const Typewriter = {
    index: 0,
    element: document.getElementById('phrase-banner'),
    run: function() {
        if (!this.element) return;

        const phrase = PHRASES[this.index];

        if (!prefersReducedMotion) {
            // Use GSAP TextPlugin for smooth typing effect
            gsap.to(this.element, {
                text: { value: phrase, speed: 1 },
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    // Wait 3 seconds, then cycle to the next phrase
                    setTimeout(() => {
                        this.index = (this.index + 1) % PHRASES.length;
                        this.run();
                    }, 3000);
                }
            });
        } else {
            // Static display for reduced motion users
            this.element.textContent = phrase;
        }
    }
};

/**
 * Manages the Portfolio image carousel/slider.
 */
const Carousel = {
    currentIndex: 0,
    slider: document.getElementById('portfolio-slider'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    items: [],
    totalItems: 0,

    init: function() {
        if (!this.slider) return;

        this.items = Array.from(this.slider.children);
        this.totalItems = this.items.length;

        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        this.updateCarousel();
    },

    navigate: function(direction) {
        this.currentIndex = (this.currentIndex + direction + this.totalItems) % this.totalItems;
        this.updateCarousel();
    },

    updateCarousel: function() {
        const offset = -this.currentIndex * 100;
        // The transition duration is handled by the CSS class on #portfolio-slider
        this.slider.style.transform = `translateX(${offset}%)`;
    }
};

// Newsletter Handler (Placeholder API Endpoint)
function handleNewsletter() {
    const messageElement = document.getElementById('newsletter-message');
    
    // Simulating POST request to a placeholder API endpoint
    // In production, this would use fetch() to send the email to the backend.
    
    messageElement.textContent = "Thank you for subscribing! We'll send you our next update soon.";
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}


// --- Initial Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Init Animations (from assets/js/animations.js)
    if (typeof Animation !== 'undefined' && Animation.init) {
        Animation.init();
    }

    // 3. Init Typewriter
    Typewriter.run();

    // 4. Init Reviews
    const allReviews = Reviews.getReviews();
    Reviews.displayAverage(allReviews);
    Reviews.displaySamples(allReviews);

    // 5. Init Carousel
    Carousel.init();
});