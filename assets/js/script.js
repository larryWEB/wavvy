/*// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
    
    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Set up indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-items');
    
    // Only initialize if menu tabs exist
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all menu items
                document.querySelectorAll('.menu-items').forEach(item => {
                    item.style.display = 'none';
                });
                
                // Show the selected menu items
                const target = this.getAttribute('data-target');
                document.querySelector('.' + target).style.display = 'grid';
            });
        });
        
        // Show only starters by default (already has active class in HTML)
        document.querySelectorAll('.menu-items').forEach(item => {
            if (!item.classList.contains('starters')) {
                item.style.display = 'none';
            }
        });
    }
    
    // Testimonial Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialWrapper && prevBtn && nextBtn) {
        const testimonials = document.querySelectorAll('.testimonial');
        let testimonialIndex = 0;
        
        // Calculate how many testimonials to show based on screen width
        function getVisibleCount() {
            if (window.innerWidth < 768) {
                return 1;
            } else if (window.innerWidth < 1200) {
                return 2;
            } else {
                return 3;
            }
        }
        
        function updateTestimonialPosition() {
            const visibleCount = getVisibleCount();
            const slideWidth = 100 / visibleCount;
            testimonialWrapper.style.transform = `translateX(-${testimonialIndex * slideWidth}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
            if (testimonialIndex > 0) {
                testimonialIndex--;
                updateTestimonialPosition();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const visibleCount = getVisibleCount();
            if (testimonialIndex < testimonials.length - visibleCount) {
                testimonialIndex++;
                updateTestimonialPosition();
            }
        });
        
        // Initialize testimonials position
        testimonials.forEach(testimonial => {
            testimonial.style.flex = `0 0 ${100 / getVisibleCount()}%`;
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            testimonials.forEach(testimonial => {
                testimonial.style.flex = `0 0 ${100 / getVisibleCount()}%`;
            });
            
            // Reset position if needed
            if (testimonialIndex > testimonials.length - getVisibleCount()) {
                testimonialIndex = testimonials.length - getVisibleCount();
            }
            
            updateTestimonialPosition();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reservation form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, just show a confirmation message
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            bookingForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            if (emailInput.value.trim() !== '') {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
        
        // Add submit event to the button
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', function() {
                newsletterForm.dispatchEvent(new Event('submit'));
            });
        }
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // Add animation for elements when they come into view
    const fadeElements = document.querySelectorAll('.section-title, .menu-item, .about-content, .testimonial');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Add some CSS styles dynamically for responsive design
function addResponsiveStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                right: -100%;
                top: 80px;
                width: 75%;
                height: calc(100vh - 80px);
                background-color: rgba(0, 0, 0, 0.9);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 30px;
                transition: right 0.5s ease;
                z-index: 1000;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .nav-active {
                right: 0;
            }
            
            .hamburger {
                display: block;
                cursor: pointer;
            }
            
            .toggle .line1 {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .toggle .line2 {
                opacity: 0;
            }
            
            .toggle .line3 {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            
            .about-content, .reservation-content {
                flex-direction: column;
            }
            
            .about-img, .about-text, .reservation-form, .reservation-details {
                width: 100%;
                padding: 0;
                margin-bottom: 30px;
            }
            
            .menu-items {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                flex-direction: column;
            }
            
            .footer-section {
                width: 100%;
                margin-bottom: 30px;
            }
        }
        
        Add fade-in animation/comm

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        Sticky header styles/comment

        .sticky {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.5s ease;
            z-index: 1000;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Call the function to add responsive styles
addResponsiveStyles(); */




// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
    
    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Set up indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-items');
    
    // Only initialize if menu tabs exist
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all menu items
                document.querySelectorAll('.menu-items').forEach(item => {
                    item.style.display = 'none';
                });
                
                // Show the selected menu items
                const target = this.getAttribute('data-target');
                document.querySelector('.' + target).style.display = 'grid';
            });
        });
        
        // Show only starters by default (already has active class in HTML)
        document.querySelectorAll('.menu-items').forEach(item => {
            if (!item.classList.contains('starters')) {
                item.style.display = 'none';
            }
        });
    }
    
    // Testimonial Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialWrapper && prevBtn && nextBtn) {
        const testimonials = document.querySelectorAll('.testimonial');
        let testimonialIndex = 0;
        
        // Calculate how many testimonials to show based on screen width
        function getVisibleCount() {
            if (window.innerWidth < 768) {
                return 1;
            } else if (window.innerWidth < 1200) {
                return 2;
            } else {
                return 3;
            }
        }
        
        function updateTestimonialPosition() {
            const visibleCount = getVisibleCount();
            const slideWidth = 100 / visibleCount;
            testimonialWrapper.style.transform = `translateX(-${testimonialIndex * slideWidth}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
            if (testimonialIndex > 0) {
                testimonialIndex--;
                updateTestimonialPosition();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const visibleCount = getVisibleCount();
            if (testimonialIndex < testimonials.length - visibleCount) {
                testimonialIndex++;
                updateTestimonialPosition();
            }
        });
        
        // Initialize testimonials position
        testimonials.forEach(testimonial => {
            testimonial.style.flex = `0 0 ${100 / getVisibleCount()}%`;
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            testimonials.forEach(testimonial => {
                testimonial.style.flex = `0 0 ${100 / getVisibleCount()}%`;
            });
            
            // Reset position if needed
            if (testimonialIndex > testimonials.length - getVisibleCount()) {
                testimonialIndex = testimonials.length - getVisibleCount();
            }
            
            updateTestimonialPosition();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reservation form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, just show a confirmation message
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            bookingForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            if (emailInput.value.trim() !== '') {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
        
        // Add submit event to the button
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', function() {
                newsletterForm.dispatchEvent(new Event('submit'));
            });
        }
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // *******************************************
    // MODIFIED SECTION: Scroll Animation with Delay
    // *******************************************
    
    // Select all elements that should have scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .menu-item, .about-content, .testimonial, .about-text p, .menu-tab, .reservation-form, .footer-section');
    
    // Set initial state - hide all elements that will be animated
    animatedElements.forEach(element => {
        // Add a class to initially hide elements
        element.classList.add('scroll-hidden');
    });
    
    // Configure the Intersection Observer with threshold options
    const observerOptions = {
        root: null,
        rootMargin: '0px', 
        threshold: 0.1  // Element becomes visible when 10% is in viewport
    };
    
    // Create an observer that adds animation classes with staggered delays
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element's position in the entry list
                // This creates a cascading effect as elements appear
                setTimeout(() => {
                    entry.target.classList.add('scroll-visible');
                    entry.target.classList.remove('scroll-hidden');
                    observer.unobserve(entry.target); // Stop observing once animated
                }, index * 1050); // 150ms delay between each element's animation
            }
        });
    }, observerOptions);
    
    // Start observing all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // *******************************************
    // END OF MODIFIED SECTION
    // *******************************************
});


// CHAT---WIDGET

document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const popupBox = document.getElementById('popupBox');
    
    // Toggle popup when chat button is clicked
    chatButton.addEventListener('click', function() {
      popupBox.classList.toggle('active');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
      if (!chatButton.contains(event.target) && !popupBox.contains(event.target)) {
        popupBox.classList.remove('active');
      }
    });
  });


// Add some CSS styles dynamically for responsive design
function addResponsiveStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                right: -100%;
                top: 80px;
                width: 75%;
                height: calc(100vh - 80px);
                background-color: rgba(0, 0, 0, 0.9);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 30px;
                transition: right 0.5s ease;
                z-index: 1000;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .nav-active {
                right: 0;
            }
            
            .hamburger {
                display: block;
                cursor: pointer;
            }
            
            .toggle .line1 {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .toggle .line2 {
                opacity: 0;
            }
            
            .toggle .line3 {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            
            .about-content, .reservation-content {
                flex-direction: column;
            }
            
            .about-img, .about-text, .reservation-form, .reservation-details {
                width: 100%;
                padding: 0;
                margin-bottom: 30px;
            }
            
            .menu-items {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                flex-direction: column;
            }
            
            .footer-section {
                width: 100%;
                margin-bottom: 30px;
            }
        }
        
      /* *******************************************
   MODIFIED SECTION: Scroll Animation Styles
   ******************************************* */

/* Default Animation for Large Screens (Fade-in from Below) */
.scroll-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: none;
}

.scroll-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

/* Mobile-Specific Animation (Slide in from Left & Right) */
@media (max-width: 768px) {
    /* Override the default animation */
    .scroll-hidden {
        transform: none; /* Reset transform */
    }

    /* Odd elements slide in from the left */
    .scroll-hidden:nth-child(odd) {
        transform: translateX(-100px);
    }

    /* Even elements slide in from the right */
    .scroll-hidden:nth-child(even) {
        transform: translateX(100px);
    }

    /* When elements become visible */
    .scroll-visible {
        transform: translateX(0);
    }
}

/* *******************************************
   END OF MODIFIED SECTION
   ******************************************* */

        /* Sticky header styles */
        .sticky {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.5s ease;
            z-index: 1000;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Call the function to add responsive styles
addResponsiveStyles();
