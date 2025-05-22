// Enumerate all the different database objects 
const databaseObjects = Object.freeze({
    BANK: "Bank",
    CUSTOMER: "Customer",
    ACCOUNT: "Account",
    TRANSACTION: "Transaction",
    LOAN: "Loan",
});
let lastData = databaseObjects.BANK; 

function getData(databaseObject) {
    fetch(`http://localhost:3000/api/get${databaseObject}s`, {
        method: "GET",
        headers: {
            "content-type":"application/json",
        },
    })
        .then((res) => {
            return res.json() // this needs to be returned from the promise
        })
        .then((data) => {
            lastData = databaseObject 
            displayData(data, "data")
            displaySearchItems(data, "searchCluster")
            displayInsertItems(databaseObject, "insertCluster")
        })

}

/// These 5 functions are what the HTML can call
function getBankData() {
    getData(databaseObjects.BANK);
}

function getCustomerData() {
    getData(databaseObjects.CUSTOMER);
}

function getAccountData() {
    getData(databaseObjects.ACCOUNT);
}

function getTransactionData() {
    getData(databaseObjects.TRANSACTION);
}

function getLoanData() {
    getData(databaseObjects.LOAN);
}
/// This is where it ends

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
    // format the headers
    const headers = Object.keys(data[0])
    for (let i = 0; i < headers.length; i += 1) {
        innerHTML += `<th> ${headers[i]} </th>` 
    }
    innerHTML += `</tr>`

    // format the data
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
        return;
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



//Script for collapsing sidebar//

// Function to toggle the sidebar
function toggleSidebar() {
    document.body.classList.toggle("collapsed");
}

function expandSidebarOnSearch() {
    document.body.classList.remove("collapsed");
}

document.addEventListener("DOMContentLoaded", function () {
    const expandBtn = document.querySelector(".expand-btn");
    const searchInput = document.querySelector(".search-wrapper input");

    if (expandBtn) {
        expandBtn.addEventListener("click", toggleSidebar);
    }

    if (searchInput) {
        searchInput.addEventListener("focus", expandSidebarOnSearch);
    }
});