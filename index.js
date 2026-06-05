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

function dropDown(controlVar, containerId, IconID){
    if(!controlVar){
            document.getElementById(IconID).style.transform = "rotate(0deg)"
            document.getElementById(containerId).style.display = "block"
        }else{
            document.getElementById(IconID).style.transform = "rotate(270deg)"
            document.getElementById(containerId).style.display = "none"
        }
        controlVar = !controlVar
        return controlVar
}