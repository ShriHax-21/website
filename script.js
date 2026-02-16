/**
 * Cybersecurity-Themed Portfolio Website - Main JavaScript
 * Author: Shrijesh Pokharel
 * Description: Advanced interactive elements for a hacker-style portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Start with loading animation
    initLoadingScreen();

    // Initialize Matrix background effect
    setupMatrixEffect();

    // Initialize all other functions once loading is complete
    setTimeout(function() {
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            offset: 100
        });

        // Navigation menu toggle for mobile
        setupNavigation();

        // Typewriter effect for job title
        typewriterEffect(
            document.querySelector('.typewriter'),
            ["Ethical Hacker & Cybersecurity Professional", "Network Security Specialist", "Digital Forensic Analyst", "Penetration Tester"],
            100,
            1500
        );

        // Skills tab switching
        setupSkillTabs();

        // Project filtering
        setupProjectFilters();

        // Contact form validation
        setupContactForm();

        // Back to top button
        setupBackToTopButton();

        // Counter animation for stats
        setupCounters();

        // Dynamic event listeners for interactive elements
        setupInteractiveElements();

        // Highlight active navigation links on scroll
        highlightNavOnScroll();
    },100); // Wait for loading screen
});

/**
 * Initialize the loading screen animation
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress');
    const percentText = document.querySelector('.percent');
    const statusText = document.querySelector('.status');

    const loadingTexts = [
        "Loading security protocols...",
        "Establishing secure connection...",
        "Encrypting communication channels...",
        "Initializing firewalls...",
        "Running vulnerability scans...",
        "Configuring stealth mode...",
        "Access granted..."
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                statusText.textContent = "Access granted!";
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.body.classList.add('loaded');
                }, 5);
            }, 5);
        }

        // Generate "hacker-like" random characters occasionally
        if (Math.random() > 0.5) {
            const hackerChars = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/";
            statusText.textContent = loadingTexts[Math.floor(progress / 100 * loadingTexts.length)] +
                " " + hackerChars.charAt(Math.floor(Math.random() * hackerChars.length));
        } else {
            statusText.textContent = loadingTexts[Math.floor(progress / 100 * loadingTexts.length)];
        }

        progressBar.style.width = `${progress}%`;
        percentText.textContent = `${Math.floor(progress)}%`;
    }, 10);
}

/**
 * Setup Matrix rain effect in the background
 */
function setupMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters used in the Matrix rain
    const chars = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array for each character's y position
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Drawing function for the Matrix rain
    function drawMatrix() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text color
        ctx.fillStyle = '#00ff8c';
        ctx.font = `${fontSize}px monospace`;

        // Loop over all drops
        for (let i = 0; i < drops.length; i++) {
            // Pick a random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];

            // Calculate x, y position
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset position when characters go off screen + random factor to make it look more natural
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move drops down
            drops[i]++;
        }
    }

    // Update canvas size on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start the animation loop
    setInterval(drawMatrix, 30);
}

/**
 * Navigation setup for both desktop and mobile
 */
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.setAttribute('aria-expanded',
            navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );

        // Add glitch effect when toggling
        if (navMenu.classList.contains('show')) {
            applyGlitchEffect(navMenu);
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');

            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add active class to the clicked link
            link.classList.add('active');
        });
    });

}

/**
 * Typewriter effect for text elements
 */
function typewriterEffect(element, texts, typingSpeed, pauseTime) {
    if (!element) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingPaused = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Slower when typing
        }

        // Add blinking cursor at the end
        if (!isDeleting) {
            element.textContent = element.textContent.replace('|', '');
        }

        // Determine next action
        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing current text
            typingPaused = true;
            setTimeout(() => {
                typingPaused = false;
                isDeleting = true;
                type();
            }, pauseTime);
            return;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting current text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        // Continue typing if not paused
        if (!typingPaused) {
            setTimeout(type, typingSpeed);
        }
    }

    // Start the typewriter effect
    type();
}

/**
 * Apply glitch effect to an element
 */
function applyGlitchEffect(element) {
    if (!element) return;

    element.classList.add('glitch-active');

    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, 500);
}

/**
 * Skills tab switching functionality
 */
function setupSkillTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update active button
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Show selected tab content with fade effect
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            if (tabId === 'all') {
                // Show all skill sections
                tabContents.forEach(content => content.classList.add('active'));
                const skillsContent = document.querySelector('.skills-content');
                applyGlitchEffect(skillsContent);
            } else {
                const activeTab = document.getElementById(tabId);
                if (activeTab) {
                    activeTab.classList.add('active');
                    // Add glitch effect when changing tabs
                    applyGlitchEffect(activeTab);
                }
            }
        });
    });
}

/**
 * Project filtering functionality
 */
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Filter projects with animation
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';

                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    // Hide after animation
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Contact form validation and submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission with terminal-like response
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Show terminal-like response animation
            showHackerResponse(name, email, () => {
                // Success callback
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                contactForm.reset();
            });
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '15px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.fontFamily = 'var(--font-mono)';

        if (type === 'error') {
            messageElement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            messageElement.style.border = '1px solid #ff3e3e';
            messageElement.style.color = '#ff3e3e';
            messageElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        } else {
            messageElement.style.backgroundColor = 'rgba(0, 255, 140, 0.1)';
            messageElement.style.border = '1px solid #00ff8c';
            messageElement.style.color = '#00ff8c';
            messageElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        }

        // Append message
        contactForm.appendChild(messageElement);

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }

    function showHackerResponse(name, email, callback) {
        // Create a terminal-like response window
        const responseTerminal = document.createElement('div');
        responseTerminal.className = 'terminal-response';
        responseTerminal.style.position = 'fixed';
        responseTerminal.style.top = '50%';
        responseTerminal.style.left = '50%';
        responseTerminal.style.transform = 'translate(-50%, -50%)';
        responseTerminal.style.width = '80%';
        responseTerminal.style.maxWidth = '500px';
        responseTerminal.style.backgroundColor = 'var(--terminal-bg)';
        responseTerminal.style.border = '1px solid var(--accent-primary)';
        responseTerminal.style.boxShadow = '0 0 20px rgba(0, 255, 140, 0.5)';
        responseTerminal.style.zIndex = '9999';
        responseTerminal.style.borderRadius = 'var(--radius-md)';
        responseTerminal.style.padding = '20px';
        responseTerminal.style.fontFamily = 'var(--font-mono)';
        responseTerminal.style.color = 'var(--accent-primary)';
        responseTerminal.style.opacity = '0';
        responseTerminal.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(responseTerminal);

        // Add content to terminal
        setTimeout(() => {
            responseTerminal.style.opacity = '1';

            const lines = [
                `> Initializing message sending protocol...`,
                `> Recipient: Shrijesh Pokharel`,
                `> From: ${name} <${email}>`,
                `> Encrypting message content...`,
                `> Establishing secure connection...`,
                `> Verifying integrity...`,
                `> Message successfully sent!`,
                `> Connection closed.`,
                `\n> Thank you for your message. I'll get back to you soon!`
            ];

            let lineIndex = 0;
            let charIndex = 0;

            function typeLine() {
                if (lineIndex < lines.length) {
                    const currentLine = lines[lineIndex];

                    if (charIndex < currentLine.length) {
                        responseTerminal.innerHTML += currentLine.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeLine, 20);
                    } else {
                        responseTerminal.innerHTML += '<br>';
                        lineIndex++;
                        charIndex = 0;
                        setTimeout(typeLine, 300);
                    }
                } else {
                    // All lines typed, show close button
                    const closeButton = document.createElement('button');
                    closeButton.textContent = '[ Close ]';
                    closeButton.style.backgroundColor = 'transparent';
                    closeButton.style.border = '1px solid var(--accent-primary)';
                    closeButton.style.color = 'var(--accent-primary)';
                    closeButton.style.padding = '8px 16px';
                    closeButton.style.marginTop = '20px';
                    closeButton.style.fontFamily = 'var(--font-mono)';
                    closeButton.style.cursor = 'pointer';
                    closeButton.style.borderRadius = 'var(--radius-sm)';

                    closeButton.addEventListener('mouseenter', () => {
                        closeButton.style.backgroundColor = 'var(--accent-primary)';
                        closeButton.style.color = 'var(--terminal-bg)';
                    });

                    closeButton.addEventListener('mouseleave', () => {
                        closeButton.style.backgroundColor = 'transparent';
                        closeButton.style.color = 'var(--accent-primary)';
                    });

                    closeButton.addEventListener('click', () => {
                        responseTerminal.style.opacity = '0';
                        setTimeout(() => {
                            responseTerminal.remove();
                            if (callback) callback();
                        }, 300);
                    });

                    responseTerminal.appendChild(closeButton);

                    // Show success message in the form
                    showFormMessage('Message sent successfully!', 'success');
                }
            }

            typeLine();
        }, 300);
    }
}

/**
 * Back to top button functionality
 */
function setupBackToTopButton() {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

/**
 * Counter animation for stats
 */
function setupCounters() {
    const counterElements = document.querySelectorAll('.counter');

    function animateCounter(el) {
        const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
        let count = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smoother animation
            const easeOutQuad = progress * (2 - progress);

            count = Math.floor(easeOutQuad * target);
            el.textContent = el.textContent.includes('+') ? `${count}+` : count;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    // Use Intersection Observer to start animation when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}


/**
 * Highlight active navigation link based on scroll position
 */
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}