import { throwError, findPlanet } from "./Extras";
let csv = [
    ["Time", "Displacement", "Velocity", "Acceleration"],
    [0,0,0,0]
]
const canvas = document.getElementById("planet-canvas")
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
ctx.imageSmoothingEnabled = false
let animationId = null;
let isAnimating = false;
let timerId;
const alienSprite = new Image()
alienSprite.src = "/assets/Dude_Monster.png"

alienSprite.onload = () => {
    ctx.scale(2, 2)
    ctx.beginPath();
    ctx.drawImage(alienSprite, canvas.width/4, canvas.height/2.425)

    document.getElementById("play").addEventListener("click", () => {
        let error = 0
        document.querySelectorAll(".left input[type=text]").forEach((element) => {
            if (element.value == "") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"
                error++
                element.disabled = true
            }
        })
        document.querySelectorAll(".left select").forEach((element) => {
            element.disabled = true
        })

        document.querySelectorAll(".left input[type=number]").forEach((element) => {
            if (element.value == "" && element.id != "planetRadius" && element.id != "dropHeight") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"

                error++
            }
            if (element.id == "planetRadius" && document.getElementById("jumpRadio").checked && element.value == "") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"

                error++
            }
            if (element.id == "dropHeight" && document.getElementById("dropRadio").checked && element.value == "") {
                throwError("Invalid Input", element.id)
                document.getElementById(element.id).style.borderColor = "red"

                error++
            }
        })
        document.querySelectorAll(".left input[type=number]").forEach((element) => {
            element.disabled = true
        })

        if (error == 0) {
            document.getElementById("play").style.display = "none"
            document.getElementById("stop").style.display = "block"
            document.getElementById("timer").style.border = "solid 1px #FF4D50"
            let time = {
                seconds: 0,
                minutes: 0,
                hours: 0,
            }
            const planet = findPlanet(document.getElementById("selectPlanet").value)
            let currentAcceleration = planet.getGravitationAcceleration()
            const netForce = document.getElementById("planetRadius").value - (document.getElementById("planetMass").value*currentAcceleration)
            let acceleration = netForce/document.getElementById("planetMass").value
            let Vatbottom = acceleration*0.2
            const alien = {
                x: canvas.width/4,
                y: canvas.height/2.425,
                radius: alienSprite.height,
                velocityY: Vatbottom*8,
                acceleration: currentAcceleration*-1,
                gravity: currentAcceleration,
            }
            
            play(time, "timer", alien)
            if (netForce < 0) {
                throwError("Insufficient Jump Force", "planetRadius")
                error++
            }
            function animateJump() {
                animationId = requestAnimationFrame(animateJump);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Physics
                alien.velocityY += alien.acceleration;
                alien.y += (alien.velocityY * -1)
            
                //Floor Collision
                if (alien.y >= canvas.height/2.425) {
                    alien.y = canvas.height/2.425
                    alien.velocityY *= -document.getElementById("collisionRange").value
                }
                // Draw
                ctx.beginPath();
                ctx.drawImage(alienSprite, alien.x, alien.y)

            }
            animateJump()
        } else {
            document.querySelectorAll("input").forEach((element) => {
                element.disabled = false
            })
        }

        const planet = findPlanet(document.getElementById("selectPlanet").value)
        let currentAcceleration = planet.getGravitationAcceleration()
        function play(timeControl, timeId, alienObject) {

            
            const netForce = document.getElementById("planetRadius").value - (document.getElementById("planetMass").value * alienObject.gravity)
            let acceleration = netForce/document.getElementById("planetMass").value
            let secondsCount = 0
            timerId = setInterval(() => {
                
                timeControl.seconds = timeControl.seconds + 1
                if (timeControl.seconds % 60 == 0) {
                    timeControl.seconds = 0
                    timeControl.minutes = timeControl.minutes + 1
                    if (timeControl.minutes % 60 == 0) {
                        timeControl.minutes = 0
                        timeControl.hours = timeControl.hours + 1
                    }
                }

                let ReturnValue = formatTime(timeControl)
                document.getElementById(timeId).innerHTML = `${ReturnValue.hours}:${ReturnValue.minutes}:${ReturnValue.seconds}`
            }, 1000)

            
        }

    })

    document.getElementById("stop").addEventListener("click", () => {
        document.getElementById("play").style.display = "block"
        document.getElementById("stop").style.display = "none"
        document.getElementById("timer").style.border = "none"
        cancelAnimationFrame(animationId)
        clearInterval(timerId)
        console.log(csv)
        document.querySelectorAll(".left input[type=text]").forEach((element) => {
            element.disabled = false

        })

        document.querySelectorAll(".left input[type=number]").forEach((element) => {
            element.disabled = false
        })

        document.querySelectorAll(".left input[type=range]").forEach((element) => {
            element.disabled = false
        })

        document.querySelectorAll(".left select").forEach((element) => {
            element.disabled = false
        })

    })

}


function formatTime(timeVal) {
    let output = {
        seconds: "",
        minutes: "",
        hours: "",
    }
    if (timeVal.seconds <= 9) {
        output.seconds = "0" + timeVal.seconds
    } else {
        output.seconds = timeVal.seconds
    }

    if (timeVal.minutes <= 9) {
        output.minutes = "0" + timeVal.minutes
    } else {
        output.minutes = timeVal.minutes
    }

    if (timeVal.hours <= 9) {
        output.hours = "0" + timeVal.hours
    } else {
        output.hours = timeVal.hours
    }

    return output
}





