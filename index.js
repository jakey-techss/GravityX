import { element } from "three/tsl"
import { dropDown, Planets, throwError, updatePlanets, updatePlanetsWithJSON } from "./Extras.js"
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
            document.getElementById("SurfaceTextureFile").value != "" ? document.getElementById("SurfaceTextureFile").value : `assets/planets/${document.getElementById("planetName").value}.png`,
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

    

})
//Creating Planets


