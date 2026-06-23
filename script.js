document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Theme Toggle (Dark / Light Mode)
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'success');
    });

    // -------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // -------------------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    mobileToggleBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // -------------------------------------------------------------
    // 3. Dynamic Typewriter Effect
    // -------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = ["GenAI Developer", "Full Stack Developer", "CS Student @ VIT", "ISRO Prize Winner"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const typeEffect = () => {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Wait before starting to delete
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    };

    if (typewriterElement) {
        typeEffect();
    }

    // -------------------------------------------------------------
    // 4. Scroll Animations (Intersection Observer)
    // -------------------------------------------------------------
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Animation runs only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollTriggers.forEach(trigger => {
        animationObserver.observe(trigger);
    });

    // -------------------------------------------------------------
    // 5. Skills Grid Filter
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Retrigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. Projects Grid Filter
    // -------------------------------------------------------------
    const projFilterButtons = document.querySelectorAll('.proj-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            projFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const projCategory = btn.getAttribute('data-proj-category');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-proj-category');
                
                if (projCategory === 'all' || cardCategory === projCategory) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 7. Contact Form Handling & Validation
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('btn-submit');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-8._%+-]+@[a-zA-Z0-8.-]+\.[a-zA-Z]{2,}$/;

    const validateInput = (input, errorEl, condition, defaultText) => {
        const formGroup = input.parentElement;
        if (condition) {
            formGroup.classList.remove('invalid');
            return true;
        } else {
            formGroup.classList.add('invalid');
            return false;
        }
    };

    // Live validation triggers
    nameInput.addEventListener('input', () => {
        validateInput(nameInput, null, nameInput.value.trim() !== '');
    });

    emailInput.addEventListener('input', () => {
        validateInput(emailInput, null, emailPattern.test(emailInput.value.trim()));
    });

    subjectInput.addEventListener('input', () => {
        validateInput(subjectInput, null, subjectInput.value.trim() !== '');
    });

    messageInput.addEventListener('input', () => {
        validateInput(messageInput, null, messageInput.value.trim() !== '');
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all
        const isNameValid = validateInput(nameInput, null, nameInput.value.trim() !== '');
        const isEmailValid = validateInput(emailInput, null, emailPattern.test(emailInput.value.trim()));
        const isSubjectValid = validateInput(subjectInput, null, subjectInput.value.trim() !== '');
        const isMessageValid = validateInput(messageInput, null, messageInput.value.trim() !== '');

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulating API call
            submitBtn.disabled = true;
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';

            setTimeout(() => {
                showToast(`Thanks ${nameInput.value.trim()}! Message sent successfully.`, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalText;
            }, 1200);
        } else {
            showToast('Please correct the validation errors before sending.', 'error');
        }
    });

    // -------------------------------------------------------------
    // 8. Toast System
    // -------------------------------------------------------------
    const toastContainer = document.getElementById('toast-container');

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Add icon based on type
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
        }

        toast.innerHTML = `
            ${iconSvg}
            <span class="toast-message">${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        // Auto remove toast
        setTimeout(() => {
            toast.style.animation = 'toast-in var(--transition-normal) reverse';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4000);
    };
});
