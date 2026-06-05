export function dropDown(controlVar, containerId, IconID){
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