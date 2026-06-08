import * as THREE from "three";
import { findPlanet, replacemesh, throwError, updatePlanetsWithJSON } from "./Extras";
import { OrbitControls } from "three/examples/jsm/Addons.js";
//Possible Planets
//Standard Basics
const canvas = document.getElementById("planet-canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
const w = canvas.clientWidth
const h = canvas.clientHeight
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.z = 50
const scene = new THREE.Scene();
const control = new OrbitControls(camera, canvas)
control.enableDamping = true
control.dampingFactor = 0.03
control.enablePan = false
//Creating planet
const loader = new THREE.TextureLoader();
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180

const geo = new THREE.IcosahedronGeometry(10, 12)
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("/assets/planets/Seak Seven.png")
})
let planet = new THREE.Mesh(geo, mat)
const sun = new THREE.DirectionalLight(0xffffff)
let rotationSpeed = 0.003

sun.position.set(-2, 0.5, 1.5)
scene.add(sun)

earthGroup.add(planet)
scene.add(earthGroup)

document.getElementById("selectPlanet").addEventListener("change", () => {
    let planetName = document.getElementById("selectPlanet").value
    if (planetName != "Custom") {
        let planetObject = findPlanet(planetName)
        const geo = new THREE.IcosahedronGeometry(planetObject.radius / 2.4398e+6, 12)
        const mat = new THREE.MeshStandardMaterial({
            map: loader.load(`assets/${document.getElementById("selectPlanet").value}.png`)
        })
        if (planetObject.radius / 2.4398e+6 > 40) {
            camera.position.z = 110
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 110
                camera.position.x = 0
                camera.position.y = 0
            })
        } else {
            camera.position.z = 50
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 50
                camera.position.x = 0
                camera.position.y = 0
            })
        }
        const Newplanet = new THREE.Mesh(geo, mat)
        replacemesh(planet, Newplanet, earthGroup)
        planet = Newplanet
        rotationSpeed = (planetObject.rotation_speed / 12569)
    } else {
        let planetObject = findPlanet(planetName)
        const geo = new THREE.IcosahedronGeometry(10, 12)
        const mat = new THREE.MeshStandardMaterial({
            map: loader.load(`/assets/Seak Seven.png`)
        })
        camera.position.z = 50
        camera.position.x = 0
        camera.position.y = 0
        const Newplanet = new THREE.Mesh(geo, mat)
        replacemesh(planet, Newplanet, earthGroup)
        planet = Newplanet
        rotationSpeed = 0.003
    }
})
document.getElementById("reset").addEventListener("click", () => {
    camera.position.z = 50
    camera.position.x = 0
    camera.position.y = 0
})

document.getElementById("rotationSpeed").addEventListener("focusout", () => {
    rotationSpeed = (document.getElementById("rotationSpeed").value / 12569)
})
document.getElementById("fileUpload").addEventListener("click", () => {
    document.getElementById("SurfaceTextureFile").click()
    document.getElementById("SurfaceTextureFile").addEventListener("change", (e) => {
        document.getElementById("surfaceTexture").value = document.getElementById("SurfaceTextureFile").value.split(`\\`)[document.getElementById("SurfaceTextureFile").value.split(`\\`).length - 1]


        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader()

        reader.onload = (e) => {
            const imageURL = e.target.result
            const mat = new THREE.MeshStandardMaterial({
                map: loader.load(`${imageURL}`)
            })
            const Newplanet = new THREE.Mesh(planet.geometry, mat)
            replacemesh(planet, Newplanet, earthGroup)
            planet = Newplanet
        };

        reader.readAsDataURL(file)
    })
})

document.getElementById("planetMass").addEventListener("focusout", () => {
    if (document.getElementById("planetMass").value < 0.02 * findPlanet("Earth").mass) {
        throwError("Planet Mass Too Small", "planetMass")
        document.getElementById("planetMass").value = ""
        document.getElementById("planetMass").style.borderColor = "red"
    } else if (document.getElementById("planetMass").value > 9 * findPlanet("Jupiter").mass) {
        throwError("Planet Mass Too Big", "planetMass")
        document.getElementById("planetMass").value = ""
        document.getElementById("planetMass").style.borderColor = "red"
    }
    else if (document.getElementById("planetRadius").value != "") {
        document.getElementById("adg").innerText = (((6.67 * Math.pow(10, -11)) * document.getElementById("planetMass").value) / Math.pow(document.getElementById("planetRadius").value, 2)).toFixed(2)
        document.getElementById("ev").innerHTML = Math.pow(((((6.67 * Math.pow(10, -11)) * document.getElementById("planetMass").value) * 2) / document.getElementById("planetRadius").value), 0.5).toFixed(2)
    }
})

document.getElementById("planetRadius").addEventListener("focusout", () => {
    if (document.getElementById("planetRadius").value < findPlanet("Earth").radius * 0.31) {
        throwError("Planet Radius Too Small", "planetRadius")
        document.getElementById("planetRadius").value = ""
        document.getElementById("planetRadius").style.borderColor = "red"
    } else if (document.getElementById("planetRadius").value > 2.14 * findPlanet("Jupiter").radius) {
        throwError("Planet Radius Too Big", "planetRadius")
        document.getElementById("planetRadius").value = ""
        document.getElementById("planetRadius").style.borderColor = "red"
    } else if (document.getElementById("planetMass").value != "") {
        document.getElementById("adg").innerText = (((6.67 * Math.pow(10, -11)) * document.getElementById("planetMass").value) / Math.pow(document.getElementById("planetRadius").value, 2)).toFixed(2)
        document.getElementById("ev").innerHTML = Math.pow(((((6.67 * Math.pow(10, -11)) * document.getElementById("planetMass").value) * 2) / document.getElementById("planetRadius").value), 0.5).toFixed(2)
        if (document.getElementById("dcb").value != "" && document.getElementById("mcb").value != "" && document.getElementById("mcb").value > 0 && document.getElementById("dcb").value > 0) {
            document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(document.getElementById("dcb").value, 3) / ((6.67 * Math.pow(10, -11)) * document.getElementById("mcb").value))) * 0.00001157).toFixed(2)
        }
    }
    if (document.getElementById("planetRadius").value <= 2.14 * findPlanet("Jupiter").radius && document.getElementById("planetRadius").value >= findPlanet("Earth").radius * 0.31) {
        const geo = new THREE.IcosahedronGeometry(document.getElementById("planetRadius").value / 2.4398e+6, 12)
        if (document.getElementById("planetRadius").value / 2.4398e+6 > 40) {
            camera.position.z = 110
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 110
                camera.position.x = 0
                camera.position.y = 0
            })
        } else {
            camera.position.z = 50
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 50
                camera.position.x = 0
                camera.position.y = 0
            })
        }

        camera.position.x = 0
        camera.position.y = 0
        const Newplanet = new THREE.Mesh(geo, planet.material)
        replacemesh(planet, Newplanet, earthGroup)
        planet = Newplanet

    }
})
document.getElementById("dcb").addEventListener("focusout", () => {
    if (document.getElementById("dcb").value != "" && document.getElementById("mcb").value != "" && document.getElementById("mcb").value > 0 && document.getElementById("dcb").value > 0) {
        document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(document.getElementById("dcb").value, 3) / ((6.67 * Math.pow(10, -11)) * document.getElementById("mcb").value))) * 0.00001157).toFixed(2)

    } else {
        throwError("Invalid Input", "dcb")
    }
})

document.getElementById("mcb").addEventListener("focusout", () => {
    if (document.getElementById("dcb").value != "" && document.getElementById("mcb").value != "" && document.getElementById("mcb").value > 0 && document.getElementById("dcb").value > 0) {

        document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(document.getElementById("dcb").value, 3) / ((6.67 * Math.pow(10, -11)) * document.getElementById("mcb").value))) * 0.00001157).toFixed(2)

    } else {
        throwError("Invalid Input", "mcb")
    }
})

document.getElementById("import").addEventListener("click", () => {
    document.getElementById("PlanetFile").click()
    document.getElementById("PlanetFile").addEventListener("change", async function (e) {

        const file = e.target.files[0];

        if (!file) return;
        const text = await file.text();
        const jsonData = JSON.parse(text);
        console.log(jsonData)
        updatePlanetsWithJSON(jsonData)
        
        let planetObject = jsonData
        const geo = new THREE.IcosahedronGeometry(planetObject.radius / 2.4398e+6, 12)
        const mat = new THREE.MeshStandardMaterial({
            map: loader.load(`${planetObject.surfaceTexture}`)
        })
        if (document.getElementById("planetRadius").value / 2.4398e+6 > 40) {
            camera.position.z = 110
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 110
                camera.position.x = 0
                camera.position.y = 0
            })
        } else {
            camera.position.z = 50
            document.getElementById("reset").addEventListener("click", () => {
                camera.position.z = 50
                camera.position.x = 0
                camera.position.y = 0
            })
        }
        const Newplanet = new THREE.Mesh(geo, mat)
        replacemesh(planet, Newplanet, earthGroup)
        planet = Newplanet
        rotationSpeed = (planetObject.rotation_speed / 12569)


    })
})
animate()

function animate() {
    requestAnimationFrame(animate);
    control.update()
    planet.rotation.y += rotationSpeed
    renderer.render(scene, camera)
}