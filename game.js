const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize Handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Car
const carParts = [];

// Car Body
const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 1);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x007700 });
const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
carBody.position.set(0, 0.25, 0);
scene.add(carBody);
carParts.push(carBody);

// Car Roof
const roofGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.6);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x005500 });
const carRoof = new THREE.Mesh(roofGeometry, roofMaterial);
carRoof.position.set(0, 0.65, 0);
scene.add(carRoof);
carParts.push(carRoof);

// Car Wheels
const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

const wheelPositions = [
    [-0.8, -0.1, 0.4],
    [0.8, -0.1, 0.4],
    [-0.8, -0.1, -0.4],
    [0.8, -0.1, -0.4]
];

wheelPositions.forEach(position => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(position[0], position[1], position[2]);
    scene.add(wheel);
    carParts.push(wheel);
});

// Road
const roadGeometry = new THREE.PlaneGeometry(20, 100);
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.y = -0.1;
scene.add(road);

// Coins
const coins = [];
const coinGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const coinMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const maxCoins = 10;

function spawnCoin() {
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.position.set(Math.random() * 20 - 10, 0.25, Math.random() * 20 - 10);
    scene.add(coin);
    coins.push(coin);
}

for (let i = 0; i < maxCoins; i++) {
    spawnCoin();
}

// Coins2
const coins2 = [];
const coins2Geometry = new THREE.SphereGeometry(0.2, 16, 16);
const coins2Material = new THREE.MeshStandardMaterial({ color: 0x362533 });
const maxCoins2 = 5;

function spawnCoins2() {
    const coin2 = new THREE.Mesh(coins2Geometry, coins2Material);
    coin2.position.set(Math.random() * 20 - 10, 0.25, Math.random() * 20 - 10);
    scene.add(coin2);
    coins2.push(coin2);
}

for (let i = 0; i < maxCoins2; i++) {
    spawnCoins2();
}

// Obstacles
const obstacles = [];
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const maxObstacles = 5;

function spawnObstacle() {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10);
    scene.add(obstacle);
    obstacles.push(obstacle);
}

for (let i = 0; i < maxObstacles; i++) {
    spawnObstacle();
}

// Score
let score = 0;
const scoreElement = document.getElementById('score');

// Keyboard Controls
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Camera Position
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    // Move Car
    if (keys['ArrowUp']) carBody.position.z -= 0.1;
    if (keys['ArrowDown']) carBody.position.z += 0.1;
    if (keys['ArrowLeft']) carBody.position.x -= 0.1;
    if (keys['ArrowRight']) carBody.position.x += 0.1;

    // Check collisions with coins
    coins.forEach((coin, index) => {
        if (carBody.position.distanceTo(coin.position) < 0.5) {
            scene.remove(coin);
            coins.splice(index, 1);
            score += 10;
            scoreElement.innerText = `Score: ${score}`;
        }
    });

    // Check collisions with coins2
    coins2.forEach((coin2, index) => {
        if (carBody.position.distanceTo(coin2.position) < 0.5) {
            scene.remove(coin2);
            coins2.splice(index, 1);
            score += 20;
            scoreElement.innerText = `Score: ${score}`;
        }
    });

    // Move Obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.position.z -= 0.05;

        // Check for collision with car
        if (carBody.position.distanceTo(obstacle.position) < 1) {
            scene.remove(obstacle);
            obstacles.splice(index, 1);
            score -= 10;
            scoreElement.innerText = `Score: ${score}`;
        }

        // Respawn obstacle if it falls below the scene
        if (obstacle.position.z < -10) {
            scene.remove(obstacle);
            obstacles.splice(index, 1);
            spawnObstacle();
        }
    });

    renderer.render(scene, camera);
}
animate();
