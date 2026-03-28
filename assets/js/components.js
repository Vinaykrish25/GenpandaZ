/**
 * Component Loader
 * Fetches and injects HTML snippets into data-component placeholders
 */

document.addEventListener('DOMContentLoaded', async () => {
    const components = document.querySelectorAll('[data-component]');
    
    for (const el of components) {
        const componentName = el.getAttribute('data-component');
        try {
            const response = await fetch(`components/${componentName}.html`);
            if (response.ok) {
                const html = await response.text();
                el.innerHTML = html;
                
                // Dispatch event after component is loaded
                const event = new CustomEvent('componentLoaded', { detail: { name: componentName, element: el } });
                document.dispatchEvent(event);
                
                // Initialize any dynamic behavior inside the component
                initializeComponent(componentName, el);
            } else {
                console.error(`Failed to load component: ${componentName}`);
            }
        } catch (err) {
            console.error(`Error loading component: ${componentName}`, err);
        }
    }
});

function initializeComponent(name, element) {
    if (name === 'navbar') {
        const menuBtn = element.querySelector('#mobile-menu-button');
        const mobileMenu = element.querySelector('#mobile-menu');
        const menuOpenIcon = element.querySelector('#menu-open-icon');
        const menuCloseIcon = element.querySelector('#menu-close-icon');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('hidden');
                if (isOpen) {
                    mobileMenu.classList.add('hidden');
                    menuOpenIcon.classList.remove('hidden');
                    menuCloseIcon.classList.add('hidden');
                } else {
                    mobileMenu.classList.remove('hidden');
                    menuOpenIcon.classList.add('hidden');
                    menuCloseIcon.classList.remove('hidden');
                }
            });

            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    menuOpenIcon.classList.remove('hidden');
                    menuCloseIcon.classList.add('hidden');
                });
            });
        }
    }
}
