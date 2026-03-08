/**
 * Wings of the Cherubim – Navigation helpers
 */

/**
 * Mark the current page's nav link as active using aria-current.
 * Matches links by comparing their href to the current pathname.
 */
function highlightCurrentNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.split('/').pop() === path) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Reveal .scroll elements as they enter the viewport.
 * Uses IntersectionObserver when available, otherwise falls back to
 * a scroll-event listener.
 */
function initScrollReveal() {
    const scrollEls = document.querySelectorAll('.scroll');
    if (!scrollEls.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        scrollEls.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        function revealOnScroll() {
            scrollEls.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                    el.classList.add('reveal');
                }
            });
        }
        window.addEventListener('scroll', revealOnScroll, { passive: true });
        revealOnScroll();
    }
}

/**
 * Reveal .scroll.parchment elements using IntersectionObserver.
 */
function initParchmentReveal() {
    const parchments = document.querySelectorAll('.scroll.parchment');
    if (!parchments.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        parchments.forEach(el => observer.observe(el));
    } else {
        parchments.forEach(el => el.classList.add('visible'));
    }
}
