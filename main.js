// begin camera code
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 0.25;

const camera2 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera2.position.z = 4;
camera2.position.y = 0.85;
camera2.position.x = 0.9;

const camera3 = new THREE.OrthographicCamera(
  window.innerWidth / 100, // right
  window.innerWidth / -100, // left
  window.innerHeight / -100, // bottom
  window.innerHeight / 100, // top
  0.1,
  50
);
camera3.position.z = 1.25;
camera3.position.y = 0.25;
camera3.position.x = 0;

const cameras = [camera, camera2, camera3];
let currentCamera = cameras[0];
// begin camera code

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
scene.background = loader.load("./images/nuvens.png");

const renderer = new THREE.WebGLRenderer();
scene.bac;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cilinderGeometry = new THREE.CylinderGeometry(0.3, 0.6, 1.5, 32);
const cilinderMaterial = new THREE.RawShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
  },
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShader").textContent,
  side: THREE.DoubleSide,
  transparent: true,
});
const cilinder = new THREE.Mesh(cilinderGeometry, cilinderMaterial);
scene.add(cilinder);

// animate variables
let scaleDirection = 1;
let scaleRotation = 1;

function animate() {
  requestAnimationFrame(animate);

  // cilinder animations
  cilinder.rotation.z += 0.01 * scaleRotation;
  cilinder.scale.x += 0.01 * scaleDirection;
  cilinder.scale.y += 0.01 * scaleDirection;
  cilinder.scale.z -= 0.02 * scaleDirection;

  if (cilinder.scale.x >= 3.5 || cilinder.scale.x <= 0.5) scaleDirection *= -1;

  if (cilinder.rotation.z >= 0.8 || cilinder.rotation.z <= -0.8)
    scaleRotation *= -1;

  renderer.render(scene, currentCamera);
}

animate();

window.addEventListener("keydown", (e) => {
  if (["1", "2", "3"].includes(e.key))
    currentCamera = cameras[Number(e.key) - 1];
});
