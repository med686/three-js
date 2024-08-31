// Initialiser la scène
const scene = new THREE.Scene();

// Ajouter une lumière ambiante
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Ajouter une lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(-100, 35, 60);
scene.add(directionalLight);

// Configurer la caméra
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 230;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,  // left
    cameraWidth / 2,   // right
    cameraHeight / 2,  // top
    cameraHeight / -2, // bottom
    0,
    1000
);
camera.position.set(-50, 0, 900);
camera.lookAt(0, 10, 0);

// Configurer le rendu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to DOM

// Fonction pour créer Big Ben
function createBigben() {
    const bigben = new THREE.Group();
     
    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(17, 33, 17),
        new THREE.MeshLambertMaterial({ color: 0xffd700 })
    );
    main.position.set(0, -5, 0); // Ajuster la position si nécessaire
    bigben.add(main);
    
    const main2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 29, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd780})
    );
    main2.position.set(5, -4, 8);
    bigben.add(main2);

    const main3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 29, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd780})
    );
    main3.position.set(-5, -4, 8);
    bigben.add(main3);

    const main4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2.2, 29, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd780})
    );
    main4.position.set(0, -4, 8);
    bigben.add(main4);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20, 21, 19),
        new THREE.MeshLambertMaterial({ color: 0xffd755})
    );
    cabin.position.set(0, 20, 0);
    bigben.add(cabin);

    const ben = new THREE.Mesh(
        new THREE.SphereGeometry(10, 15, 15),
        new THREE.MeshLambertMaterial({ color: 0xffffff})
    );
    ben.position.set(0, 20, 5);
    bigben.add(ben);

    const ben2 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 31, 1),
        new THREE.MeshLambertMaterial({ color: 0x0000000})
    );
    ben2.position.set(0, 21, 15);
    bigben.add(ben2);

    const pyramidGeometry = new THREE.ConeGeometry(14, 20, 4); // 4 radial segments for a pyramid shape
    const pyramidMaterial = new THREE.MeshLambertMaterial({ color: 0xffd755 });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    
    // Adjust the pyramid's position
    pyramid.position.set(0, 40, 0);
    pyramid.rotation.y = Math.PI / 3.9;
    // Add the pyramid to the scene
    bigben.add(pyramid);
    const leg = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 23, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd730})
    );
    leg.position.set(5, -30, 0);
    bigben.add(leg);
    const leg1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 23, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd730})
    );
    leg1.position.set(-5, -30, 0);
    bigben.add(leg1);
    const belt = new THREE.Mesh(
        new THREE.BoxBufferGeometry(17, 2, 0.7),
        new THREE.MeshLambertMaterial({ color: 0x8B4513})
    );
    belt.position.set(0, -20, 9);
    bigben.add(belt);
    bigben.position.y = 12;
    return bigben;   
} 
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('ballon3d.png');
const geometry = new THREE.PlaneGeometry(30, 20);
const material = new THREE.MeshBasicMaterial({ map: texture }); 
const plane = new THREE.Mesh(geometry, material);
plane.position.set(30, 25, 130);
scene.add(plane);  
// Keyboard Controls
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === 'a' || e.key === 'A') {
        bigben.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(0xffffff); // Set color to yellow
            }
        });
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Créer et ajouter Big Ben à la scène
const bigben = createBigben();
scene.add(bigben);

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    // Move Big Ben
    if (keys['ArrowUp']) plane.position.y+= 0.5;
    if (keys['ArrowDown']) plane.position.y -= 0.5;
    if (keys['ArrowLeft']) bigben.position.x -= 0.5;
    if (keys['ArrowRight']) bigben.position.x += 0.5;
    
    // Re-render the scene
    renderer.render(scene, camera);
}

// Start animation
animate();
