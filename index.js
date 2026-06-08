import { element } from "three/tsl"
import { dropDown, Planets, Texture, throwError, updatePlanets, updatePlanetsWithJSON } from "./Extras.js"

let textures = [
    new Texture("Mercury","/assets/Mercury.png"),
    new Texture("Venus","/assets/Venus.png"),
    new Texture("Earth","/assets/Earth.png"),
    new Texture("Mars","/assets/Mars.png"),
    new Texture("Jupiter","/assets/Jupiter.png"),
    new Texture("Saturn","/assets/Saturn.png"),
    new Texture("Uranus","/assets/Uranus.png"),
    new Texture("Neptune","/assets/Neptune.png"),
    new Texture("Seak Seven","/assets/Seak-Seven.png"),
    new Texture("Xuenedros","/assets/Xuenedros.jpg"),
    new Texture("Aura X","/assets/aura.png"),
    new Texture("Leoni","/assets/Blue-rock.png"),
    new Texture("Seven Stars","/assets/Blue-Swirl.png"),
    new Texture("Eris","/assets/Eris.png"),
    new Texture("Xolomena","/assets/Gas-Planet.png"),
    new Texture("Andreos","/assets/Pink.png"),
]
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".left .TabContainer").forEach((container) => {
        container.style.display = "none"
    })

    let planetTabOpen = false
    let physicalTabOpen = false
    document.getElementById("planet").addEventListener("click", () => {
        planetTabOpen = dropDown(planetTabOpen, "planetContainer", "planetIcon")
    })
    document.getElementById("physical").addEventListener("click", () => {
        physicalTabOpen = dropDown(physicalTabOpen, "physicalContainer", "physicalIcon")
    })

    document.getElementById("selectPlanet").addEventListener("change", () => {
        updatePlanets(document.getElementById("selectPlanet").value)
        if (document.getElementById("selectPlanet").value != "Custom") {
    
            document.getElementById("export").style.display = "none"
        }else{
            document.getElementById("export").style.display = "block"
        }
    })

    document.getElementById("export").addEventListener("click", () => {
        let error = 0
        document.querySelectorAll(".left input[type=text]").forEach((element) => {
            if (element.value == "") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"
                error++
            }
        })

        document.querySelectorAll(".left input[type=number]").forEach((element) => {
            if (element.value == "") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"
                error++
            }
        })

        const planet = new Planets(
            document.getElementById("planetName").value,
            document.getElementById("galaxyName").value,
            document.getElementById("atm").value,
            document.getElementById("SurfaceTextureFile").value != "" ? document.getElementById("surfaceTexture").value : `/assets/planets/Seak-Seven.png`,
            document.getElementById("Civilization").value,
            document.getElementById("planetMass").value,
            document.getElementById("planetRadius").value,
            document.getElementById("rotationSpeed").value,
            document.getElementById("dcb").value,
            document.getElementById("mcb").value,
            document.getElementById("dcb").value
        )
        if (error == 0) {
            const blob = new Blob([JSON.stringify(planet)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${document.getElementById("planetName").value}.planet`;
            link.click();
        }
    })

    document.getElementById("start").addEventListener("click", () => {
        document.getElementById("start").style.display = "none"
    })

    document.getElementById("openShop").addEventListener("click", () => {
        document.getElementById("shop").style.display = "flex"
    })

    document.getElementById("exit").addEventListener("click", () => {
        document.getElementById("shop").style.display = "none"
    })
    


})
//Creating Planets


