/**
 * Wings of the Cherubim – Three.js scene setup
 *
 * Initialises a minimal Three.js scene in #threejs-container.
 * Attempts to load the cherub GLTF model; gracefully falls back
 * to a plain background image if the model or WebGL is unavailable.
 *
 * Asset requirement:
 *   Place the cherub model at: assets/models/cherub.glb
 *   If the file is absent the scene still renders (without the 3D model).
 */
(function initThreeScene() {
    const container = document.getElementById('threejs-container');
    if (!container) return;

    // Guard against missing Three.js or WebGL support
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D scene.');
        return;
    }

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
        console.warn('WebGL unavailable – skipping 3D scene.', e);
        return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let cherubModel = null;

    // Try to load the GLTF cherub model
    if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        loader.load(
            'assets/models/cherub.glb',
            (gltf) => {
                cherubModel = gltf.scene;
                cherubModel.scale.set(0.7, 0.7, 0.7);
                cherubModel.position.set(0, -1, -2);
                scene.add(cherubModel);
            },
            undefined,
            (err) => {
                console.info('Cherub model unavailable – using fallback styling.', err);
            }
        );
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (cherubModel) cherubModel.rotation.y += 0.004;
        renderer.render(scene, camera);
    }
    animate();

    // Responsive resize
    function onResize() {
        const isMobile = window.innerWidth < 768;
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize, { passive: true });
}());
