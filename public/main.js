function getBankData() {
    fetch("http://localhost:3000/api/getBanks", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayData(data, "data")
        })
        .catch((err) => {
            console.log("Unhandeled error here:" + err) 
        })
}

function getCustomerData() {
    fetch("http://localhost:3000/api/getCustomers", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayData(data, "data")
        })
        .catch((err) => {
            console.log("Unhandeled error here:" + err) 
        })
}

function getAccountData() {
    fetch("http://localhost:3000/api/getAccounts", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayData(data, "data")
        })
        .catch((err) => {
            console.log("Unhandeled error here:" + err) 
        })
}

function getTransactionData() {
    fetch("http://localhost:3000/api/getTransactions", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayData(data, "data")
        })
        .catch((err) => {
            console.log("Unhandeled error here:" + err) 
        })
}

function getLoanData() {
    fetch("http://localhost:3000/api/getLoans", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayData(data, "data")
        })
        .catch((err) => {
            console.log("Unhandeled error here:" + err) 
        })
}

// Initalize the window with this shit!!!
window.onload = getBankData()

// Takes a div and places a table inside of that div creating the table of the stuff
function displayData(data, elementID) {
    const dataDiv = document.getElementById(elementID)
    let innerHTML = ``;
    if (data.length === 0) {
        return dataDiv.innerHTML = `
            <p> No Data </p>
        `
    }
    innerHTML += `<table>` 
    innerHTML += `<tr>`
    // get the headers
    const headers = Object.keys(data[0])
    for (let i = 0; i < headers.length; i += 1) {
        innerHTML += `<th> ${headers[i]} </th>` 
    }
    innerHTML += `</tr>`

    // get the data
    for (let j = 0; j < data.length; j += 1) {
        const values = Object.values(data[j])
        innerHTML += `<tr>`
        for (let i = 0; i < values.length; i += 1) {
            innerHTML += `<td> ${values[i]} </td>`
        }
        innerHTML += `</tr>`
    }

    innerHTML += `</table>`
    return dataDiv.innerHTML = innerHTML; 
}

function displaySearchInputs(data, elementID) {
    const divData = document.getElementById(elementID)
    let innerHTML = ``
    if (data.length === 0) {
        return dataDiv.innerHTML = innerHTML
    }
    const headers = Object.keys(data[0])
    for (let i = 0; i < headers.length; i += 1) {
        innerHTML += `<div class = "search">`
        innerHTML += `<label>${headers[i]}</label>`
        innerHTML += `<input></input>`
        innerHTML += `</div>`
    }
    dataDiv.innerHTML = innerHTML;
}

function search() {
    let hasData = false;
    const searchDivs = document.getElementsByClassName("search")
    const dataToSend = {
        columns: [],
        values: []
    }
    for (let i = 0; i < searchDivs.length; i += 1) {
        const value = searchDivs[i].getElementsByTagName("input")
        const column = searchDivs[i].getElementsByTagName("label")
        if (value[0].value !== "") {
            hasData = true;
            dataToSend.columns.push(column[0].innerText)
            dataToSend.values.push(value[0].value)
        } 
    }
    console.log(dataToSend)
    
    if (!hasData) {
        // If i just use return, then this will return undefined to the user console
        // This will be seen by the user, which we don't want
        return console.warn("data does not exist");
    }
}

function displayInsertInputs(data) {

}
