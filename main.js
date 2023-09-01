// Definição das câmeras
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

// Array de câmeras
const cameras = [camera, camera2, camera3];
let currentCamera = cameras[0]; // Define a primeira câmera como a ativa

const scene = new THREE.Scene();

// Carregar uma imagem de textura como fundo
const loader = new THREE.TextureLoader();
scene.background = loader.load("./images/nuvens.png");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criação do cilindro
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

// Criação da banana
const bananaGeometry = new THREE.TorusBufferGeometry(
  0.5,
  0.2,
  16,
  100,
  Math.PI
);
const bananaTexture = loader.load("./images/banana.jpg");
const bananaMaterial = new THREE.MeshBasicMaterial({ map: bananaTexture });
const banana = new THREE.Mesh(bananaGeometry, bananaMaterial);
scene.add(banana);

// Variáveis para animação
let time = 0;
let scaleDirection = 1;
let scaleRotation = 1;
let showAnimation = true;

// Função de animação
function animate() {
  requestAnimationFrame(animate);

  if (showAnimation) {
    // Animações do cilindro
    cilinder.rotation.z += 0.01 * scaleRotation;
    cilinder.scale.x += 0.01 * scaleDirection;
    cilinder.scale.y += 0.01 * scaleDirection;
    cilinder.scale.z -= 0.02 * scaleDirection;

    if (cilinder.scale.x >= 3.5 || cilinder.scale.x <= 0.5)
      scaleDirection *= -1;

    if (cilinder.rotation.z >= 0.8 || cilinder.rotation.z <= -0.8)
      scaleRotation *= -1;

    // Animação da banana
    banana.position.x = Math.sin(time) * 4;
    banana.position.y = Math.sin(time) * 1.8 - 1.5;
    banana.position.z = Math.sin(time) * 3 - 3;
    banana.rotation.z += 0.01;
    banana.rotation.x += 0.05;
    banana.rotation.y += 0.01;

    time += 0.01;
  }



  // Renderiza a cena com a câmera atual
  renderer.render(scene, currentCamera);
}

// Inicia a animação
animate();

// Evento de teclado para trocar entre câmeras (1, 2, 3) e pausar a animação (Barra de Espaço)
window.addEventListener("keydown", (e) => {
  if (["1", "2", "3"].includes(e.key))
    currentCamera = cameras[Number(e.key) - 1];
  if ("Space" === e.code) showAnimation = !showAnimation;
});
