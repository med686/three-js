
const scene = new THREE.Scene()
const thaw = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(thaw)
const thawdirection = new THREE.DirectionalLight(0xffffff, 0.6)
thawdirection.position.set(-100, 35, 60)
scene.add(thawdirection)
// setting up camera
const aspectRatio = window.innerWidth / window.innerHeight
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0,
    1000
);
camera.position.set(200, 100, 900)
camera.lookAt(0, 10, 0)
// set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function createWheels() {
    const geometry = new THREE.IcosahedronGeometry(6, 6, 17);
    const material = new THREE.MeshLambertMaterial({ color: 0x505050 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  }
function createCar() {
    const car = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 7;
    backWheel.position.x = -20;
    backWheel.position.z = 15;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 7;
    frontWheel.position.x = 15;
    frontWheel.position.z = 15;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 15, 30),
        new THREE.MeshLambertMaterial({ color: 0xff0000 })
    );
    main.position.y = 12;
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 12, 24),
        new THREE.MeshLambertMaterial({ color:0xffffff })
        
    );
    cabin.position.x = 4;
    cabin.position.y = 25.5;
    car.add(cabin);
    const widow = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20, 6, 17),
        new THREE.MeshLambertMaterial({ color: 0x80808080})
    );
    widow.position.x = 5;
    widow.position.y = 25;
    widow.position.z = 4;
    car.add(widow);
     const lock = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5, 2, 3),
    new THREE.MeshLambertMaterial({ color: 0x000000 })
     );
     lock.position.x = 10;
     lock.position.y = 16;
     lock.position.z = 14;
     car.add(lock);
     const iron = new THREE.Mesh(
     new THREE. IcosahedronGeometry(4, 10),
     new THREE.MeshLambertMaterial({ color: 0x90909090 })
     );
     iron.position.x = 15.5;
     iron.position.y = 7.5;
     iron.position.z = 17.6;
     car.add(iron);
     const ironn = new THREE.Mesh(
        new THREE. IcosahedronGeometry(4, 10),
        new THREE.MeshLambertMaterial({ color: 0x90909090 })
        );
        ironn.position.x = -20;
        ironn.position.y = 7.5;
        ironn.position.z = 17.6;
        car.add(ironn);
        const windoww = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3, 8, 15),
            new THREE.MeshLambertMaterial({ color: 0x80808080 })
        );
        windoww.position.x = 19.6;
        windoww.position.y = 25;
        windoww.position.z = -1;
        car.add(windoww);
        const lumiere = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2, 4, 5),
        new THREE.MeshLambertMaterial({ color: 0xffff00})
        );
        lumiere.position.x = 29.7;
        lumiere.position.y = 15;
        lumiere.position.z = -10;
        car.add(lumiere);
        const lumieree = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2, 4.5, 6),
        new THREE.MeshLambertMaterial({ color: 0xffff00})
        );
        lumieree.position.x = 29.7;
        lumieree.position.y = 15;
        lumieree.position.z = 9;
        car.add(lumieree);
        const street = new THREE.Mesh(
            new THREE.BoxBufferGeometry(190, 1, 130),
            new THREE.MeshLambertMaterial({ color: 0x808080})
        )
        street.position.x = 4;
        street.position.y = -4;
        street.position.z = 7;
        scene.add(street);
        car.position.y=-4.8;
        const sun = new THREE.Mesh(
            new THREE.IcosahedronGeometry(7, 7, 7),
            new THREE.MeshLambertMaterial({ color: 0xffff00})
        )
        sun.position.x = 65;
        sun.position.y = 35;
        sun.position.z = -5;
        scene.add(sun)
        const front = new THREE.Mesh(
            new THREE.BoxBufferGeometry(18, 4, 3),
            new THREE.MeshLambertMaterial({ color: 0x808080})
        )
        front.position.x = -20.5;
        front.position.y = 21;
        front.position.z = 12;
        car.add(front);
        const front1 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3, 4, 25),
            new THREE.MeshLambertMaterial({ color: 0x80808080})
        )
        front1.position.x = -28;
        front1.position.y = 21;
        front1.position.z = 0;
        car.add(front1);
        const front2 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(18, 4, 3),
            new THREE.MeshLambertMaterial({ color: 0x808080})
        )
        front2.position.x = -20.5;
        front2.position.y = 21;
        front2.position.z = -12;
        car.add(front2);
        return car;
      }
      const car = createCar();
scene.add(car);

renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
