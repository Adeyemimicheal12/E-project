 let visitorCount = 1247;
        let userName = '';

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            updateVisitorCount();
            updateDateTime();
            getUserLocation();
            showSection('home');
            
            // Update time every second
            setInterval(updateDateTime, 1000);
            setInterval(updateVisitorCount, 30000); // Update visitor count every 30 seconds
        });

        function updateVisitorCount() {
            visitorCount += Math.floor(Math.random() * 3) + 1;
            document.getElementById('visitorCount').textContent = visitorCount.toLocaleString();
        }

        function updateDateTime() {
            const now = new Date();
            const dateOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            
            document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
            document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
        }

        function getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        // In a real application, you would use a reverse geocoding service
                        document.getElementById('userLocation').textContent = 'Ibadan, Oyo State, Nigeria';
                    },
                    function(error) {
                        document.getElementById('userLocation').textContent = 'Location unavailable';
                    }
                );
            } else {
                document.getElementById('userLocation').textContent = 'Geolocation not supported';
            }
        }

        function setWelcome() {
            const firstName = document.getElementById('firstName').value.trim();
            if (firstName) {
                userName = firstName;
                document.getElementById('userName').textContent = firstName;
                document.getElementById('userWelcome').style.display = 'block';
                document.getElementById('welcomeForm').style.display = 'none';
                document.getElementById('welcomeMessage').style.display = 'block';
                document.getElementById('welcomeMessage').innerHTML = `
                    <h3>Welcome to BidSpirit Auctions, ${firstName}!</h3>
                    <p>Discover extraordinary treasures and place your bids on unique pieces from around the world.</p>
                `;
            } else {
                alert('Please enter your first name to continue.');
            }
        }

        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update navigation
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Find and activate the corresponding nav item
            const activeNavItem = Array.from(navItems).find(item => 
                item.getAttribute('onclick') && item.getAttribute('onclick').includes(sectionId)
            );
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }

            // Scroll to top of main content
            document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
        }

        function openModal(title, price, description) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalPrice').textContent = price;
            document.getElementById('modalDescription').textContent = description;
            document.getElementById('productModal').style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            document.getElementById('productModal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        function submitFeedback(event) {
            event.preventDefault();
            const name = document.getElementById('feedbackName').value;
            const email = document.getElementById('feedbackEmail').value;
            const message = document.getElementById('feedbackMessage').value;
            
            // Simulate feedback submission
            alert(`Thank you ${name}! Your feedback has been submitted successfully. We'll respond to ${email} within 24 hours.`);
            
            // Reset form
            document.getElementById('feedbackName').value = '';
            document.getElementById('feedbackEmail').value = '';
            document.getElementById('feedbackMessage').value = '';
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            const modal = document.getElementById('productModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Keyboard navigation for modal
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Add some interactive hover effects
        document.addEventListener('DOMContentLoaded', function() {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });

         // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            }
        });

        // Parallax effect for hero image
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image img');
            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${scrolled * 0.1}px)`;
            }
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Intersection Observer for enhanced animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe all feature cards and images
        document.querySelectorAll('.feature-card, .feature-image, .notification-card').forEach(el => {
            observer.observe(el);
        });

        // Enhanced button interactions
        document.querySelectorAll('button, .feature-link').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add subtle cursor following effect
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 107, 53, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursorEl = document.querySelector('.cursor');
            cursorEl.style.left = e.clientX - 10 + 'px';
            cursorEl.style.top = e.clientY - 10 + 'px';
        });