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
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,  // left
    cameraWidth / 2,   // right
    cameraHeight / 2,  // top
    cameraHeight / -2, // bottom
    0,
    1000
);
camera.position.set(-50, 20, 100);
camera.lookAt(0, 10, 0);

// Configurer le rendu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Ajouter le rendu au DOM
document.body.appendChild(renderer.domElement);

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
        new THREE.BoxBufferGeometry(3, 31, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd750})
    );
    main2.position.set(5, -6, 8);
    bigben.add(main2);
    const main3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 31, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd750})
    );
    main3.position.set(-5, -6, 8);
    bigben.add(main3);
    const main4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2.2, 31, 3),
        new THREE.MeshLambertMaterial({ color: 0xffd750})
    );
    main4.position.set(0, -6, 8);
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
    ben.position.set(0, 20, 5)
    bigben.add(ben);
    const ben2 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 31, 1),
        new THREE.MeshLambertMaterial({ color: 0x0000000})
    );
    ben2.position.set(0, 21, 15)
    bigben.add(ben2);
    const pyramidGeometry = new THREE.ConeGeometry(14, 20, 4); // 4 radial segments for a pyramid shape
    const pyramidMaterial = new THREE.MeshLambertMaterial({ color: 0xffd755 });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    
    // Adjust the pyramid's position
    pyramid.position.set(0, 40, 0);
    pyramid.rotation.y = Math.PI /3.9;
    // Add the pyramid to the scene
    bigben.add(pyramid);
    
    bigben.position.y = -2;
    
    return bigben;   
} 

// Créer et ajouter Big Ben à la scène
const bigben = createBigben();
scene.add(bigben);

// Rendre la scène
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);


