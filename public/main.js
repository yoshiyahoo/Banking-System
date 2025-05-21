let lastData = "" 
function getBankData() {
    fetch("http://localhost:3000/api/getBanks", {
        method: "GET"
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            lastData = "bank";
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(data, "insertCluster")
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
            lastData = "customer";
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(data, "insertCluster")
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
            lastData = "account";
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(data, "insertCluster")
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
            lastData = "transaction";
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(data, "insertCluster")
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
            lastData = "loans";
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(data, "insertCluster")
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
        dataDiv.innerHTML = `
            <p> No Data </p>
        `
        return
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
    dataDiv.innerHTML = innerHTML;
}


//<div id = "search">
//    <label> Hi mom </label>
//    <input></input>
//</div>
function displaySearchItems(data, elementID) {
    const searchDiv = document.getElementById(elementID)
    let innerHTML = ``
    if (data.length === 0) {
        searchDiv.innerHTML = `
            <p> Nothing to serach </p>
        `
    }
    const headers = Object.keys(data[0])
    for (let i = 0; i < headers.length; i += 1) {
        innerHTML += `<div class = "search">`
        innerHTML += `<label>${headers[i]}</label>`
        innerHTML += `<input></input>`
        innerHTML += `</div>`
    }
    searchDiv.innerHTML = innerHTML;
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
        return
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
        return null; 
    }
    if (lastData === "account") {
        fetch("http://localhost:3000/api/getAccount", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type":"application/json"
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                lastData = "account";
                displayData(data, "data")
                displaySearchItems(data, "searchCluster")
            })
            .catch((err) => {
                console.log("Unhandeled error here:" + err) 
            })
    }
    else if (lastData === "bank") {
        fetch("http://localhost:3000/api/getBank", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type":"application/json"
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                lastData = "bank";
                displayData(data, "data")
                displaySearchItems(data, "searchCluster")
            })
            .catch((err) => {
                console.log("Unhandeled error here:" + err) 
            })
    }
    else if (lastData === "customer") {
        fetch("http://localhost:3000/api/getCustomer", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type":"application/json"
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                lastData = "customer";
                displayData(data, "data")
                displaySearchItems(data, "searchCluster")
            })
            .catch((err) => {
                console.log("Unhandeled error here:" + err) 
            })
    }
    else if (lastData === "transaction") {
        fetch("http://localhost:3000/api/getTransaction", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type":"application/json"
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                lastData = "transaction";
                displayData(data, "data")
                displaySearchItems(data, "searchCluster")
            })
            .catch((err) => {
                console.log("Unhandeled error here:" + err) 
            })
    }
    else if (lastData === "loans") {
        fetch("http://localhost:3000/api/getLoan", {
            method: "POST",
            body: JSON.stringify(dataToSend), // I must serialize the JSON so it's not undefined
            headers: {
                "content-type":"application/json" // make sure that the server knows you're sending JSON
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                lastData = "loans";
                displayData(data, "data")
                displaySearchItems(data, "searchCluster")
            })
            .catch((err) => {
                console.log("Unhandeled error here:" + err) 
            })
    }
    else {
        return
    }
}

function displayInsertItems(data, elementID)  {
    // remove the primary key for each item
    // TODO: figure out how to do this with 0 elements. Could be interesting
    const insertDiv = document.getElementById(elementID)
    let innerHTML = ``
    const headers = Object.keys(data[0])
    for (let i = 0; i < headers.length; i += 1) {
        innerHTML += `<div class = "search">`
        innerHTML += `<label>${headers[i]}</label>`
        innerHTML += `<input></input>`
        innerHTML += `</div>`
    }
    insertDiv.innerHTML = innerHTML;
}
