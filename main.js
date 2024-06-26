import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// setting up scenes and cameras
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera)

// torus shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// point lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

// ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight, pointLight)

// helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// controlling with mouse
const controls = new OrbitControls(camera, renderer.domElement)

// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// background
const spaceTexture = new THREE.TextureLoader().load('/space.jpg')
scene.background = spaceTexture

// avatar
const avatarTexture = new THREE.TextureLoader().load('/avatar.jpg')

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
)

scene.add(avatar)

// moon
const moonTexture = new THREE.TextureLoader().load('/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30
moon.position.setX(-10)

// mars
const marsTexture = new THREE.TextureLoader().load('/mars.jpg')

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
)

scene.add(mars)
mars.position.z = -10
mars.position.setX(20)



// scroll movement
function moveCamera() {

  const t = document.body.getBoundingClientRect().top
  
  moon.rotation.x += 0.025
  moon.rotation.y += 0.0375
  moon.rotation.z += 0.025

  mars.rotation.x += 0.05
  mars.rotation.y += 0.075
  mars.rotation.z += 0.05

  avatar.rotation.y += 0.01
  avatar.rotation.z += 0.01

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()





// animate loop (constant updating)
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animate()