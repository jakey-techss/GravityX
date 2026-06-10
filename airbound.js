import { element } from "three/tsl"
import { dropDown, findPlanet, Planets, Texture, throwError, updatePlanets, updatePlanetsWithJSON } from "./Extras.js"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".left .TabContainer").forEach((container) => {
        container.style.display = "none"
    })

    let planetTabOpen = false
    let physicalTabOpen = false
    document.getElementById("planet").addEventListener("click", () => {
        planetTabOpen = dropDown(planetTabOpen, "planetContainer", "planetIcon")
    })

    const planet = findPlanet(document.getElementById("selectPlanet").value)
    let currentAcceleration = planet.getGravitationAcceleration()
    document.getElementById("adg").innerHTML = planet.getGravitationAcceleration()

    document.getElementById("selectPlanet").addEventListener("change", () => {
        document.getElementById("ev").innerText = "NaN"
        document.getElementById("mv").innerText =  "NaN"
        document.getElementById("op").innerText = "NaN"
        if (document.getElementById("selectPlanet").value != "Custom") {
            const filePath = `/assets/${document.getElementById("selectPlanet").value.toLowerCase()}_bg.png`
            document.getElementById("right").style.backgroundImage = `url("${filePath}")`;
            document.getElementById("import").style.display = "none";
            const planet = findPlanet(document.getElementById("selectPlanet").value)
            document.getElementById("adg").innerHTML = planet.getGravitationAcceleration()
            currentAcceleration = planet.getGravitationAcceleration()
        } else {
            document.getElementById("import").style.display = "block";
        }
        calcVals()
    })

    document.getElementById("dropRadio").addEventListener("click",()=>{
        document.getElementById("jumpSim").style.display = "none"
        document.getElementById("dropSim").style.display = "block"
         document.getElementById("ev").innerText = "NaN"
        document.getElementById("mv").innerText =  "NaN"
        document.getElementById("op").innerText = "NaN"
        document.getElementById("planetRadius").value = ""
    })

    document.getElementById("jumpRadio").addEventListener("click",()=>{
         document.getElementById("dropSim").style.display = "none"
        document.getElementById("jumpSim").style.display = "block"
        document.getElementById("ev").innerText = "NaN"
        document.getElementById("mv").innerText =  "NaN"
        document.getElementById("op").innerText = "NaN"
        document.getElementById("dropHeight").value = ""
       
    })

    document.getElementById("planetRadius").addEventListener("focusout",()=>{
        if(document.getElementById("planetRadius").value < 0){
            throwError("Jump force must be positive","planetRadius")
            document.getElementById("planetRadius").value = ""
        }
        else{
            calcVals()
        }
    })

    document.getElementById("planetMass").addEventListener("focusout",()=>{
        if(document.getElementById("planetMass").value < 0){
            throwError("Mass must be positive","planetMass")
            document.getElementById("planetMass").value = ""
        }
        else{
            calcVals()
        }
    })

function calcVals(){
    if(document.getElementById("planetRadius").value != "" && document.getElementById("planetMass").value != ""){
            
                const netForce = document.getElementById("planetRadius").value - (document.getElementById("planetMass").value*currentAcceleration)
                if(netForce < 0 ){
                    throwError("Insufficient Jump Force","planetRadius")
                }else{
                    let m = document.getElementById("planetMass").value
                    let acceleration = netForce/document.getElementById("planetMass").value
                    let Vatbottom = acceleration*0.2 //Gotten from data stating that it take about 200ms to 300ms to make a jump
                    let KE_i = (m*Math.pow(Vatbottom,2))/2
                    document.getElementById("ev").innerText = KE_i.toPrecision(4)
                    document.getElementById("mv").innerText =  Vatbottom.toPrecision(4)
                    document.getElementById("op").innerText =  (Math.pow(Vatbottom,2)/(2*currentAcceleration)).toPrecision(4)
                }
            }
}
document.getElementById("rotationSpeed").addEventListener("input",()=>{
    if(document.getElementById("rotationSpeed").value == ""){
        throwError("Trial Name must be a valid string","rotationSpeed")
    }else{
        document.getElementById("trialTitle").innerText = document.getElementById("rotationSpeed").value
    }
})
})


