/**
 * Main Application Logic
 */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initScrollReveal();
    });
} else {
    initTheme();
    initScrollReveal();
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function initScrollReveal() {
    console.log('Initializing ScrollReveal on', document.querySelectorAll('.reveal').length, 'elements');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01 // Reduced from 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Revealing:', entry.target);
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Global utility to add reveal animation to elements
window.revealElement = (el, delay = 0) => {
    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = `${delay}s`;
};
