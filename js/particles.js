/**
 * Wings of the Cherubim – Particle / Star creation
 */

/**
 * Populate a container element with animated star elements.
 * @param {string} containerId - ID of the container element (default: 'stars')
 * @param {number} count       - Number of stars to create (default: 150)
 */
function createStars(containerId = 'stars', count = 150) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3 + 1;
        star.style.width  = size + 'px';
        star.style.height = size + 'px';

        star.style.left = Math.random() * 100 + '%';
        star.style.top  = Math.random() * 100 + '%';

        star.style.animationDelay    = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 150 + 50) + 's';

        star.style.setProperty('--x-start', (Math.random() * 200 - 50) + 'vw');
        star.style.setProperty('--y-start', (Math.random() * 200 - 50) + 'vh');
        star.style.setProperty('--x-end',   (Math.random() * 200 - 50) + 'vw');
        star.style.setProperty('--y-end',   (Math.random() * 200 - 50) + 'vh');

        container.appendChild(star);
    }
}

/**
 * Create a burst of coloured particles at random positions.
 * Used by the portal-trigger button.
 */
function createParticleBurst() {
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.background = 'rgba(255, ' + (Math.random() * 100 + 155) + ', 0, 0.9)';
        p.style.width  = p.style.height = (Math.random() * 12 + 6) + 'px';
        p.style.left   = Math.random() * 100 + 'vw';
        p.style.top    = Math.random() * 100 + 'vh';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}
