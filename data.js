import { throwError } from "./Extras";

let data;
let formattedData;
let currentDataId;
let currentData;
if (window.sessionStorage.getItem("data") == null || JSON.parse(window.sessionStorage.getItem("data")).length == 0) {
    throwError("No Trial Data Available", "errorBox");
} else {
    data = JSON.parse(window.sessionStorage.getItem("data"))
    let box = document.getElementById("selectPlanet")
    data.forEach((e) => {
        let option = document.createElement('option')
        option.value = e.id
        option.innerHTML = e.classify
        box.appendChild(option)
    })
    currentDataId = data[0].id
    currentData = data[0]
    document.getElementById("selectPlanet").value = currentDataId
    document.getElementById("GA").innerText = parseFloat(currentData.GA).toPrecision(4)
    document.getElementById("TME").innerText = parseFloat(currentData.TME).toPrecision(4)
    document.getElementById("MH").innerText = parseFloat(currentData.MH).toPrecision(4)
    document.getElementById("MV").innerText = parseFloat(currentData.MV).toPrecision(4)
    document.getElementById("AT").innerText = (Math.sqrt((2 * parseFloat(currentData.MH)) / parseFloat(currentData.GA)) * 2).toPrecision(4)
    currentData = currentData.data
    while (document.getElementById("dataRow").children.length > 1) {
        document.getElementById("dataRow").removeChild(document.getElementById("dataRow").firstChild)
    }

    for (let i = 1; i < currentData.length / 2; i += 2) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${average(currentData[i][0], currentData[i + 1][0]).toPrecision(3)}</td>
                <td>${average(currentData[i][1], currentData[i + 1][1]).toPrecision(4)}</td>
                <td>${average(currentData[i][2], currentData[i + 1][2]).toPrecision(4)}</td>
                <td>${average(currentData[i][3], currentData[i + 1][3]).toPrecision(4)}</td>`
        document.getElementById("dataRow").appendChild(row)
    }
}
document.getElementById("selectPlanet").addEventListener("change", () => {
    console.log(document.getElementById("selectPlanet").value)

    currentDataId = data[document.getElementById("selectPlanet").value].id
    currentData = data[document.getElementById("selectPlanet").value]
    console.log(currentData)
    document.getElementById("selectPlanet").value = currentDataId
    document.getElementById("GA").innerText = parseFloat(currentData.GA).toPrecision(4)
    document.getElementById("TME").innerText = parseFloat(currentData.TME).toPrecision(4)
    document.getElementById("MH").innerText = parseFloat(currentData.MH).toPrecision(4)
    document.getElementById("MV").innerText = parseFloat(currentData.MV).toPrecision(4)
    document.getElementById("AT").innerText = (Math.sqrt((2 * parseFloat(currentData.MH)) / parseFloat(currentData.GA)) * 2).toPrecision(4)
    currentData = currentData.data
    while (document.getElementById("dataRow").children.length > 1) {
        document.getElementById("dataRow").removeChild(document.getElementById("dataRow").lastChild)
    }

    for (let i = 1; i < currentData.length / 2; i += 2) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${average(currentData[i][0], currentData[i + 1][0]).toPrecision(3)}</td>
                <td>${average(currentData[i][1], currentData[i + 1][1]).toPrecision(4)}</td>
                <td>${average(currentData[i][2], currentData[i + 1][2]).toPrecision(4)}</td>
                <td>${average(currentData[i][3], currentData[i + 1][3]).toPrecision(4)}</td>`
        document.getElementById("dataRow").appendChild(row)
    }
})
function average(num1, num2) {
    return (parseFloat(num1) + parseFloat(num2)) / 2
}
document.getElementById("export").addEventListener("click", () => {
    currentData = data[document.getElementById("selectPlanet").value]
    let lastData = currentData.data
    let outputString = ""
    for (let i = 0; i < lastData.length; i++) {
        outputString += lastData[i].join(",") + "\n"
    }
    let csvFile = new Blob([outputString], {
        type: "application/csv"
    })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = `${currentData.classify}.csv`;
    link.click()
})
