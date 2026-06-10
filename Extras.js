

export function dropDown(controlVar, containerId, IconID) {
    if (!controlVar) {
        document.getElementById(IconID).style.transform = "rotate(0deg)"
        document.getElementById(containerId).style.display = "block"
    } else {
        document.getElementById(IconID).style.transform = "rotate(270deg)"
        document.getElementById(containerId).style.display = "none"
    }
    controlVar = !controlVar
    return controlVar
}

let allPlanets = []
export function findPlanet(planetSelected) {
    let Currentplanet = allPlanets.find((planet) => {
        if (planet.name == planetSelected) {
            return planet
        }
    })
    return Currentplanet
}
export class Planets {
    constructor(name, galaxy, atmosphere, surfaceTexture, civilzation, mass, radius, rotation_speed, dcb, mcb, a) {
        this.name = name
        this.galaxy = galaxy
        this.atmosphere = atmosphere
        this.surfaceTexture = surfaceTexture
        this.civilzation = civilzation
        this.mass = mass
        this.radius = radius
        this.rotation_speed = rotation_speed
        this.dcb = dcb
        this.a = a
        this.mcb = mcb
        allPlanets.push(this)
    }

    getGravitationAcceleration(){
        return (((6.67 * Math.pow(10, -11)) * this.mass) / Math.pow(this.radius, 2)).toFixed(4)
    }
}
export function updatePlanets(planetSelected) {
    if (planetSelected != "Custom") {

        let Currentplanet = allPlanets.find((planet) => {
            if (planet.name == planetSelected) {
                return planet
            }
        })
        if (Currentplanet == undefined) {
            Currentplanet = Default
            document.getElementById("planetName").value = Currentplanet.name
            document.getElementById("planetName").disabled = false
            document.getElementById("galaxyName").disabled = false
            document.getElementById("atm").disabled = false
            document.getElementById("Civilization").disabled = false
            document.getElementById("planetMass").disabled = false
            document.getElementById("planetRadius").disabled = false
            document.getElementById("rotationSpeed").disabled = false
            document.getElementById("dcb").disabled = false
            document.getElementById("mcb").disabled = false
        }
        document.getElementById("planetName").value = Currentplanet.name
        document.getElementById("planetName").disabled = true

        document.getElementById("galaxyName").value = Currentplanet.galaxy
        document.getElementById("galaxyName").disabled = true
         document.getElementById("SurfaceTextureFile").value = ""
        
        document.getElementById("atm").value = Currentplanet.atmosphere
        document.getElementById("atm").disabled = true

        document.getElementById("fileUpload").style.display = "none"

        document.getElementById("Civilization").value = Currentplanet.civilzation
        document.getElementById("Civilization").disabled = true
        document.getElementById("planetMass").value = Currentplanet.mass
        document.getElementById("planetMass").disabled = true

        document.getElementById("planetRadius").value = Currentplanet.radius
        document.getElementById("planetRadius").disabled = true

        document.getElementById("rotationSpeed").value = Currentplanet.rotation_speed
        document.getElementById("rotationSpeed").disabled = true

        document.getElementById("dcb").value = Currentplanet.dcb
        document.getElementById("dcb").disabled = true

        document.getElementById("mcb").value = Currentplanet.mcb
        document.getElementById("mcb").disabled = true

        document.getElementById("adg").innerHTML = (((6.67 * Math.pow(10, -11)) * Currentplanet.mass) / Math.pow(Currentplanet.radius, 2)).toFixed(4)
        //
        document.getElementById("ev").innerHTML = Math.pow(((((6.67 * Math.pow(10, -11)) * Currentplanet.mass) * 2) / Currentplanet.radius), 0.5).toFixed(4)
        //Orbital Period
        document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(Currentplanet.dcb, 3) / ((6.67 * Math.pow(10, -11)) * Currentplanet.mcb))) * 0.00001157).toFixed(4)
    } else {
        let Currentplanet = allPlanets.find((planet) => {
            if (planet.name == planetSelected) {
                return planet
            }
        })
        if (Currentplanet == undefined) {
            Currentplanet = Default
            document.getElementById("planetName").value = Currentplanet.name
            document.getElementById("planetName").disabled = false
            document.getElementById("galaxyName").disabled = false
            document.getElementById("atm").disabled = false
            document.getElementById("Civilization").disabled = false
            document.getElementById("planetMass").disabled = false
            document.getElementById("planetRadius").disabled = false
            document.getElementById("rotationSpeed").disabled = false
            document.getElementById("dcb").disabled = false
            document.getElementById("mcb").disabled = false
            document.getElementById("fileUpload").style.display = "flex"
        }
        document.getElementById("planetName").value = Currentplanet.name

        document.getElementById("galaxyName").value = Currentplanet.galaxy

        document.getElementById("atm").value = Currentplanet.atmosphere

        document.getElementById("surfaceTexture").value = Currentplanet.surfaceTexture

        document.getElementById("Civilization").value = Currentplanet.civilzation

        document.getElementById("planetMass").value = Currentplanet.mass


        document.getElementById("planetRadius").value = Currentplanet.radius

        document.getElementById("rotationSpeed").value = Currentplanet.rotation_speed


        document.getElementById("dcb").value = Currentplanet.dcb

        document.getElementById("mcb").value = Currentplanet.mcb

        document.getElementById("adg").innerHTML = (((6.67 * Math.pow(10, -11)) * Currentplanet.mass) / Math.pow(Currentplanet.radius, 2)).toFixed(4)
        //
        document.getElementById("ev").innerHTML = Math.pow(((((6.67 * Math.pow(10, -11)) * Currentplanet.mass) * 2) / Currentplanet.radius), 0.5).toFixed(4)
        //Orbital Period
        document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(Currentplanet.dcb, 3) / ((6.67 * Math.pow(10, -11)) * Currentplanet.mcb))) * 0.00001157).toFixed(4)
    }
}

export function updatePlanetsWithJSON(planet) {

    let Currentplanet = planet
    document.getElementById("planetName").value = Currentplanet.name
    document.getElementById("planetName").disabled = false
    document.getElementById("galaxyName").disabled = false
    document.getElementById("atm").disabled = false
    document.getElementById("Civilization").disabled = false
    document.getElementById("planetMass").disabled = false
    document.getElementById("planetRadius").disabled = false
    document.getElementById("rotationSpeed").disabled = false
    document.getElementById("dcb").disabled = false
    document.getElementById("mcb").disabled = false
    document.getElementById("selectPlanet").value = "Custom"
 

    document.getElementById("galaxyName").value = Currentplanet.galaxy


    document.getElementById("atm").value = Currentplanet.atmosphere


    document.getElementById("surfaceTexture").value = Currentplanet.surfaceTexture
    document.getElementById("fileUpload").style.display = "flex"

    document.getElementById("Civilization").value = Currentplanet.civilzation

    document.getElementById("planetMass").value = Currentplanet.mass


    document.getElementById("planetRadius").value = Currentplanet.radius


    document.getElementById("rotationSpeed").value = Currentplanet.rotation_speed


    document.getElementById("dcb").value = Currentplanet.dcb


    document.getElementById("mcb").value = Currentplanet.mcb

    document.getElementById("adg").innerHTML = (((6.67 * Math.pow(10, -11)) * Currentplanet.mass) / Math.pow(Currentplanet.radius, 2)).toFixed(4)
    //
    document.getElementById("ev").innerHTML = Math.pow(((((6.67 * Math.pow(10, -11)) * Currentplanet.mass) * 2) / Currentplanet.radius), 0.5).toFixed(4)
    //Orbital Period
    document.getElementById("op").innerHTML = ((2 * Math.PI * Math.sqrt(Math.pow(Currentplanet.dcb, 3) / ((6.67 * Math.pow(10, -11)) * Currentplanet.mcb))) * 0.00001157).toFixed(4)
}

export function replacemesh(oldMesh, newMesh, scene) {
    scene.remove(oldMesh)
    oldMesh.geometry.dispose()
    oldMesh.material.dispose()

    scene.add(newMesh)
}
const Default = new Planets(
    "",
    "",
    "stable",
    "Seak-Seven.png",
    "None",
    "",
    "",
    "",
    "",
    "",
    ""
);
const mercury = new Planets(
    "Mercury",
    "Milky Way",
    "toxic",
    "Mercury.png",
    "None",
    3.285e23,
    2439700,
    3.026,
    5.791e10,
    1.989e30,
    5.791e10
);

const venus = new Planets(
    "Venus",
    "Milky Way",
    "toxic",
    "Venus.png",
    "None",
    4.867e24,
    6051800,
    1.811,
    1.082e11,
    1.989e30,
    1.082e11
);

const earth = new Planets(
    "Earth",
    "Milky Way",
    "stable",
    "Earth.png",
    "Modern",
    5.972e24,
    6371000,
    465.1,
    1.496e11,
    1.989e30,
    1.496e11
);

const mars = new Planets(
    "Mars",
    "Milky Way",
    "toxic",
    "Mars.png",
    "None",
    6.39e23,
    3389500,
    240.7,
    2.279e11,
    1.989e30,
    2.279e11
);

const jupiter = new Planets(
    "Jupiter",
    "Milky Way",
    "toxic",
    "Jupiter.png",
    "None",
    1.898e27,
    69911000,
    12569,
    7.785e11,
    1.989e30,
    7.785e11
);

const saturn = new Planets(
    "Saturn",
    "Milky Way",
    "toxic",
    "Saturn.png",
    "None",
    5.683e26,
    58232000,
    9870,
    1.432e12,
    1.989e30,
    1.432e12
);

const uranus = new Planets(
    "Uranus",
    "Milky Way",
    "toxic",
    "Uranus.png",
    "None",
    8.681e25,
    25362000,
    2590,
    2.867e12,
    1.989e30,
    2.867e12
);

const neptune = new Planets(
    "Neptune",
    "Milky Way",
    "toxic",
    "Neptune.png",
    "None",
    1.024e26,
    24622000,
    2680,
    4.515e12,
    1.989e30,
    4.515e12
);

export function throwError(message, id) {
    document.getElementById(id).style.borderColor = "red"
    document.getElementById("error").innerHTML = message
    document.getElementById("errorBox").style.opacity = 1

    setTimeout(() => {

        document.getElementById("errorBox").style.opacity = 0
        document.getElementById(id).style.borderColor = "white"
    }, 3000)
}

export class Texture{
    constructor(name, file){
        this.name = name;
        this.file = file;
        this.render()
    }

    render() {
        let element = document.createElement('div')
        element.classList.add('texture')
        element.innerHTML = `<div class="image" style="background-image: url(${this.file}); background-size: contain;">
                    </div>
                    <div style="display: flex; flex-direction: column; width: 100%;">
                        <p class="title">${this.name}</p>
                        <a download href="${this.file}"><button class=" basic storeDownload"
                            style="display: flex; align-items: center; gap: 3px;">Download</button></a>
                    </div>`
        document.getElementById("textureHolder").appendChild(element)
    }
}

