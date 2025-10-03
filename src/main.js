document.addEventListener('DOMContentLoaded', () => {
    // Function to load external HTML components
    async function loadComponent(placeholderId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
            } else {
                console.error(`Placeholder element with ID "${placeholderId}" not found.`);
            }
        } catch (error) {
            console.error(`Failed to load component from ${filePath}:`, error);
        }
    }

    // Function to initialize the mobile menu
    function initializeMobileMenu() {
        const hamburgerButton = document.getElementById('hamburger-button');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const body = document.body;

        if (hamburgerButton && mobileMenu && mobileMenuOverlay && closeMobileMenuButton && body) {
            hamburgerButton.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                mobileMenuOverlay.classList.remove('hidden');
                body.classList.add('overflow-hidden'); // Prevent scrolling on body
            });

            closeMobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                mobileMenuOverlay.classList.add('hidden');
                body.classList.remove('overflow-hidden');
            });

            mobileMenuOverlay.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                mobileMenuOverlay.classList.add('hidden');
                body.classList.remove('overflow-hidden');
            });
        } else {
            console.warn('Mobile menu elements not found. Skipping mobile menu initialization.');
        }
    }

    // Function to initialize the FAQ accordion
    function initializeAccordions() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (!faqItems.length) {
            console.log("No FAQ items found to initialize.");
            return;
        }

        // Set initial icon rotation for the item that is open by default
        faqItems.forEach(item => {
            const button = item.querySelector('.faq-toggle');
            const icon = item.querySelector('.faq-icon');
            if (button.getAttribute('aria-expanded') === 'true') {
                icon.classList.add('rotate-45');
            }
        });

        faqItems.forEach(item => {
            const button = item.querySelector('.faq-toggle');
            
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                // Close all other items before opening the new one
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-content').classList.add('hidden');
                        otherItem.querySelector('.faq-icon').classList.remove('rotate-45');
                    }
                });

                // Toggle the clicked item
                if (isExpanded) {
                    // Close it
                    button.setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-content').classList.add('hidden');
                    item.querySelector('.faq-icon').classList.remove('rotate-45');
                } else {
                    // Open it
                    button.setAttribute('aria-expanded', 'true');
                    item.querySelector('.faq-content').classList.remove('hidden');
                    item.querySelector('.faq-icon').classList.add('rotate-45');
                }
            });
        });
    }

    // Execute functions in sequence
    loadComponent('header-placeholder', '/components/header.html')
        .then(() => {
            // A small delay to ensure header HTML is rendered before initializing the menu
            setTimeout(initializeMobileMenu, 100);
        })
        .then(() => loadComponent('footer-placeholder', '/components/footer.html'))
        .then(() => {
            // Initialize all interactive components after loading header/footer
            initializeAccordions();
            // initializeSliders();
            // initializeTabs();
        })
        .catch(error => console.error("Error loading components or initializing scripts:", error));
});