import { dropDown } from "./function.js"
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
})
