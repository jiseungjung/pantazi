const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(12, 13, -40);

const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xcccccc);
renderer.outputEncoding = THREE.sRGBEncoding;

const wrapper = document.querySelector("#webgl");
document.querySelector("#webgl-container").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(50);
//scene.add(axesHelper);

sky = new THREE.Sky();
sky.scale.setScalar(450000);
scene.add(sky);

sun = new THREE.Vector3();
const inclination = 0.49; // elevation / inclination
const azimuth = 0.25; // Facing front

var theta = Math.PI * (inclination - 0.5);
var phi = 2 * Math.PI * (azimuth - 0.5);

sun.x = Math.cos(phi);
sun.y = Math.sin(phi) * Math.sin(theta);
sun.z = Math.sin(phi) * Math.cos(theta);

sky.material.uniforms["sunPosition"].value.copy(sun);

const loader = new THREE.GLTFLoader();
loader.load("assets/phoenixpark.glb", function (gltf) {
  const model = gltf.scene;
  model.position.set(0, 0, 0);
  model.scale.set(2, 2, 2);
  scene.add(model);

  dirLight.target = model;

  // mixer = new THREE.AnimationMixer(model);
  // mixer.clipAction(gltf.animations[0]).play();

  render();
});

scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.4));

dirLight = new THREE.DirectionalLight(0xffb397, 2);
dirLight.position = new THREE.Vector3(0, 1, 0);

scene.add(dirLight);
dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 50);
//scene.add(dirLightHelper);

// scene.add(mesh);
var camera_pivot = new THREE.Object3D();
var Y_AXIS = new THREE.Vector3(0, 1, 0);

scene.add(camera_pivot);
camera_pivot.add(camera);
camera.lookAt(camera_pivot.position);

const render = function () {
  // mixer.update(delta);

  camera_pivot.rotateOnAxis(Y_AXIS, 0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
