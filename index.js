import { dropDown, updatePlanets } from "./Extras.js"
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".left .TabContainer").forEach((container)=>{
        container.style.display = "none"
    })

    let planetTabOpen = false
    let physicalTabOpen = false
    document.getElementById("planet").addEventListener("click",()=>{
        planetTabOpen = dropDown(planetTabOpen, "planetContainer","planetIcon")
    })
    document.getElementById("physical").addEventListener("click",()=>{
        physicalTabOpen = dropDown(physicalTabOpen, "physicalContainer","physicalIcon")
    })

    document.getElementById("selectPlanet").addEventListener("change",()=>{
        updatePlanets(document.getElementById("selectPlanet").value)
    })

    

})
//Creating Planets

