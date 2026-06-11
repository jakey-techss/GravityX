import { throwError, findPlanet, Data } from "./Extras";
let csv = [
    ["Time", "Displacement", "Velocity", "Acceleration"],
    [0, 0, 0, 0]
]
if (window.sessionStorage.getItem("data") != null) {
    let datas = JSON.parse(window.sessionStorage.getItem("data"))
    document.getElementById("rotationSpeed").value = "Trial #" + (datas.length + 1)
    document.getElementById("trialTitle").innerHTML = document.getElementById("rotationSpeed").value
    document.getElementById("export").addEventListener("click",()=>{
        let lastData = datas[datas.length - 1].data
        let outputString = ""
        for(let i=0; i < lastData.length; i++){
            outputString+=lastData[i].join(",")+"\n"
        }
        let csvFile = new Blob([outputString],{
            type: "application/csv"
        })
         const link = document.createElement('a');
        link.href = URL.createObjectURL(csvFile);
        link.download = `${datas[datas.length - 1].classify}.csv`;
        link.click()
    })
}
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
    ctx.drawImage(alienSprite, canvas.width / 4, (canvas.height / 2.425))

    document.getElementById("play").addEventListener("click", () => {
        if (document.getElementById("selectPlanet").value != "Custom") {
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

            document.querySelectorAll(".left input[type=range]").forEach((element) => {
                element.disabled = true
            })

            if (error == 0) {
                document.getElementById("play").style.display = "none"
                document.getElementById("stop").style.display = "block"
                document.getElementById("timer").style.border = "solid 1px #FF4D50"
                let time = {
                    milliSecs: 0,
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                }
                const planet = findPlanet(document.getElementById("selectPlanet").value)
                let currentAcceleration = planet.getGravitationAcceleration()
                const netForce = document.getElementById("planetRadius").value - (document.getElementById("planetMass").value * currentAcceleration)
                let acceleration = netForce / document.getElementById("planetMass").value
                let Vatbottom = acceleration * 0.2
                const alien = {
                    x: canvas.width / 4,
                    y: (canvas.height / 2.425),
                    radius: alienSprite.height + 360,
                    velocityY: Vatbottom * 4,
                    acceleration: currentAcceleration * -0.25,
                    gravity: currentAcceleration,
                }

                let startTime = play(time, "timer", alien)
                if (netForce < 0) {
                    throwError("Insufficient Jump Force", "planetRadius")
                    error++
                }
                csv = [
                    ["Time", "Displacement", "Velocity", "Acceleration"],
                    [0, 0, 0, 0]
                ]
                function animateJump() {
                    animationId = requestAnimationFrame(animateJump);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let newRow = [(new Date().getTime() - startTime.getTime()) / 1000, (Math.pow(alien.velocityY / 6, 2)) / (2 * alien.gravity), Math.abs(alien.velocityY / 6) <= 0.3 ? 0 : alien.velocityY / 6, alien.acceleration / 0.25]
                    csv.push(newRow)

                    // Physics
                    alien.velocityY += alien.acceleration;
                    alien.y += (alien.velocityY * -1)


                    //Floor Collision
                    if (alien.y + alien.radius > canvas.height) {
                        alien.y = canvas.height - alien.radius;
                        alien.velocityY *= -1 * document.getElementById("collisionRange").value;
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
                let acceleration = netForce / document.getElementById("planetMass").value
                let secondsCount = 0
                timerId = setInterval(() => {

                    timeControl.milliSecs = timeControl.milliSecs + 1
                    if (timeControl.milliSecs % 1000 == 0) {
                        timeControl.milliSecs = 0
                        timeControl.seconds = timeControl.seconds + 1
                        if (timeControl.seconds % 60 == 0) {
                            timeControl.seconds = 0
                            timeControl.minutes = timeControl.minutes + 1
                            if (timeControl.minutes % 60 == 0) {
                                timeControl.minutes = 0
                                timeControl.hours = timeControl.hours + 1
                            }
                        }
                    }

                    let ReturnValue = formatTime(timeControl)
                    document.getElementById(timeId).innerHTML = `${ReturnValue.hours}:${ReturnValue.minutes}:${ReturnValue.seconds}:${ReturnValue.milliSecs}`
                }, 1)
                return new Date()
            }
        }else{
            throwError("Please import a custom planet","selectPlanet")
        }

    })

    document.getElementById("stop").addEventListener("click", () => {
        document.getElementById("play").style.display = "block"
        document.getElementById("stop").style.display = "none"
        document.getElementById("timer").style.border = "none"
        cancelAnimationFrame(animationId)
        clearInterval(timerId)
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
        if (window.sessionStorage.getItem("data") == null) {
            let datas = [new Data(0, csv, document.getElementById("rotationSpeed").value)]
            window.sessionStorage.setItem("data", JSON.stringify(datas))
            document.getElementById("rotationSpeed").value = "Trial #" + (datas.length + 1)
            document.getElementById("trialTitle").innerHTML = document.getElementById("rotationSpeed").value
        } else {
            let datas = JSON.parse(window.sessionStorage.getItem("data"))
            datas.push(new Data(datas.length, csv, document.getElementById("rotationSpeed").value))
            window.sessionStorage.setItem("data", JSON.stringify(datas))
            document.getElementById("rotationSpeed").value = "Trial #" + (datas.length + 1)
            document.getElementById("trialTitle").innerHTML = document.getElementById("rotationSpeed").value
        }
    })

}


function formatTime(timeVal) {
    let output = {
        milliSecs: "",
        seconds: "",
        minutes: "",
        hours: "",
    }
    if (timeVal.milliSecs <= 9) {
        output.milliSecs = "00" + timeVal.milliSecs
    } else if (timeVal.milliSecs <= 99) {
        output.milliSecs = "0" + timeVal.milliSecs
    } else {
        output.milliSecs = timeVal.milliSecs
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





