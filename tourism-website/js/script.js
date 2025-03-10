document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Virtual Tour Functionality
    const tourOptions = document.querySelectorAll('.tour-option');
    const tourPreviewImg = document.querySelector('.tour-preview img');
    const playButton = document.querySelector('.play-button');

    if (tourOptions.length > 0 && tourPreviewImg) {
        tourOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                tourOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Change preview image based on selected tour
                const tourType = this.getAttribute('data-tour');
                tourPreviewImg.src = `images/${tourType}-preview.jpg`;
            });
        });

        // Play button functionality (in a real implementation, this would launch a 360° tour)
        if (playButton) {
            playButton.addEventListener('click', function() {
                const activeTour = document.querySelector('.tour-option.active').getAttribute('data-tour');
                alert(`Starting virtual tour of ${activeTour}. In a complete implementation, this would launch a 360° tour experience.`);
            });
        }
    }

    // AI Recommendation Button
    const aiRecommendButton = document.querySelector('.ai-recommendation .btn-small');
    
    if (aiRecommendButton) {
        aiRecommendButton.addEventListener('click', function() {
            // In a real implementation, this would fetch personalized recommendations
            const recommendations = [
                "Based on your interests, we recommend visiting Udayagiri and Khandagiri Caves in the morning when it's cooler.",
                "The Lingaraj Temple is less crowded in the afternoon on weekdays.",
                "Today is a perfect day to visit Nandankanan Zoo as many animals are active in this weather.",
                "Consider visiting the Sun Temple at Konark during sunset for breathtaking views."
            ];
            
            // Randomly select a recommendation
            const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
            
            // Update the recommendation text
            const aiBox = document.querySelector('.ai-box p');
            if (aiBox) {
                aiBox.textContent = randomRec;
            }
        });
    }

    // Weather Widget Functionality
    const weatherWidget = document.querySelector('.weather-widget');
    
    if (weatherWidget) {
        // In a real implementation, this would fetch actual weather data from an API
        const mockWeatherData = {
            temperature: 32,
            condition: 'Sunny',
            humidity: 65,
            wind: 12
        };
        
        // Update weather information
        const tempElement = weatherWidget.querySelector('.temperature');
        const conditionElement = weatherWidget.querySelector('.condition');
        
        if (tempElement && conditionElement) {
            tempElement.textContent = `${mockWeatherData.temperature}°C`;
            conditionElement.textContent = mockWeatherData.condition;
        }
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
            });
        });
        
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Form Validation for Contact Form
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real implementation, this would submit the form data
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
        
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('error');
        }
        
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            input.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check elements on load
    checkScroll();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
});