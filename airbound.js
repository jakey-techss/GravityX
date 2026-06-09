import { element } from "three/tsl"
import { dropDown, Planets, Texture, throwError, updatePlanets, updatePlanetsWithJSON } from "./Extras.js"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".left .TabContainer").forEach((container) => {
        container.style.display = "none"
    })

    let planetTabOpen = false
    let physicalTabOpen = false
    document.getElementById("planet").addEventListener("click", () => {
        planetTabOpen = dropDown(planetTabOpen, "planetContainer", "planetIcon")
    })

    

})


