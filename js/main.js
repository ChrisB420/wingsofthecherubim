/**
 * Wings of the Cherubim – Main application logic
 *
 * Depends on: particles.js, navigation.js
 * Optionally:  three-setup.js (loaded separately, self-initialising)
 */

/**
 * Play the celestial audio and create a burst of particles.
 */
function triggerPortalBurst() {
    const audio = document.getElementById('celestialBurst');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => { /* autoplay blocked – ignore */ });
    }
    if (typeof createParticleBurst === 'function') {
        createParticleBurst();
    }
}

/**
 * Initialise all page features once the DOM is ready.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Stars background
    if (typeof createStars === 'function') {
        createStars('stars', 150);
    }

    // Navigation active-link highlighting
    if (typeof highlightCurrentNavLink === 'function') {
        highlightCurrentNavLink();
    }

    // Scroll-reveal animations
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }

    // Parchment scroll reveal
    if (typeof initParchmentReveal === 'function') {
        initParchmentReveal();
    }
});
