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