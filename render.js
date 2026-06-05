import * as THREE from "three";
const canvas = document.getElementById("planet-canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
const w = canvas.clientWidth
const h = canvas.clientHeight
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,10)
camera.position.z = 10

const scene = new THREE.Scene();
const geo = new THREE.IcosahedronGeometry(5,24)
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff,
    flatShading: true
})
const mesh = new THREE.Mesh(geo, mat)
const sun = new THREE.HemisphereLight(0xffffff,0xFFA500)
scene.add(sun)
scene.add(mesh)
renderer.render(scene,camera)