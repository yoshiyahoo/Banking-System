// Enumerate all the different database objects 
var databaseObjects = Object.freeze({
	BANK: "Bank",
	CUSTOMER: "Customer",
	ACCOUNT: "Account",
	TRANSACTION: "Transaction",
	LOAN: "Loan",
});
var lastData = databaseObjects.BANK;

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

/// These functions are what the HTML can call to get data
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

// TODO: fix some bug in here
function update() {
	const rowsToUpdate = document.querySelectorAll(".modified");
	const columnList = document.querySelectorAll("#data th");
	// add the primary key as the final attribute later
	const dataToSend = {
		columns: [],
		values: []
	}
	for (let i = 0; i < rowsToUpdate.length; i += 1) {
		const data = rowsToUpdate[i].querySelectorAll("td");
		for (let j = 0; j < data.length; j += 1) {
			if (j === 0 && columnList[j].textContent.trim() !== "SSN") {
				dataToSend[columnList[j].textContent.trim()] = data[j].textContent;
			}
			else {
				console.log(data[j].textContent);
				dataToSend.columns.push(columnList[j].textContent.trim());
				dataToSend.values.push(data[j].textContent.trim());
			}
		}
	}
	fetch(`http://localhost:3000/api/update${lastData}`, {
		method: "POST",
		body: JSON.stringify(dataToSend),
		headers: {
			"content-type": "application/json"
		}
	})
		.then((_res) => {
			const modified = document.querySelectorAll(".modified")
			for (let i = 0; i < modified.length; i += 1) {
				modified[i].classList.remove("modified")
			}
		})
		.catch((err) => {
			console.log(err)
		})
}

function createMarkModifiedTupleEvent() {
	// Listen for when a database entry is modified
	const rows = document.querySelectorAll("#data tr")
	for (let i = 0; i < rows.length; i += 1) {
		rows[i].addEventListener("input", () => {
			rows[i].classList.add("modified")
		})
	}
}

// Takes a table and places data inside the table
function displayData(data, elementID) {
	const dataDiv = document.getElementById(elementID)
	if (dataDiv == null) {
		return
	}
	let innerHTML = ``;
	if (data.length === 0) {
		dataDiv.innerHTML = `
			<p> No Data </p>
		`
		return
	}
	innerHTML += `<tr>`
	// format the headers
	const headers = Object.keys(data[0])
	for (let i = 0; i < headers.length; i += 1) {
		innerHTML += `<th> ${headers[i]} </th>` 
	}
	innerHTML += `</tr>`

	// format the data
	// ISSUE: maybe contenteditable is the wrong approach here, could be subject to change
	for (let j = 0; j < data.length; j += 1) {
		const values = Object.values(data[j])
		innerHTML += `<tr>`
		for (let i = 0; i < values.length; i += 1) {
			if (i == 0 && headers[i] != "SSN") {
				innerHTML += `<td class="primaryKey">${values[i]}</td>`
			}
			else {
				innerHTML += `<td contenteditable="plaintext-only">${values[i]}</td>`
			}
		}
		innerHTML += `</tr>`
	}

	// add a new input on the bottom
	innerHTML += `</tr>`
	for (let i = 0; i < headers.length; i += 1) {
		if (i == 0 && headers[i] != "SSN") {
			innerHTML += `<td class="primaryKey">_</td>`
		}
		else if (headers[i] == "SSN") {
			innerHTML += `<td contenteditable="plaintext-only">_</td>`
		}
		else {
			innerHTML += `<td contenteditable="plaintext-only"></td>`
		}
	}
	innerHTML += `</tr>`

	// add a button to the table
	let updateButton = `<button id="updateButton" onclick="update()">Update</button>`
	innerHTML += updateButton;
	
	dataDiv.innerHTML = innerHTML;
	
	createMarkModifiedTupleEvent()
}


function displaySearchItems(data, elementID) {
	const searchDiv = document.getElementById(elementID)
	if (searchDiv == null) {
		return
	}
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
			dataToSend.columns.push(column[0].innerText.trim())
			dataToSend.values.push(value[0].value.trim())
		}
	}
	
	if (!hasData) {
		// If i just use return, then this will return undefined to the user console
		// This will be seen by the user, which we don't want
		return null; //This will not be seen by the user
	}
	
	fetch(`http://localhost:3000/api/get${lastData}`, {
		method: "POST",
		body: JSON.stringify(dataToSend),
		headers: {
			"content-type":"application/json"
		}
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			displayData(data, "data")
			displaySearchItems(data, "searchCluster")
		})
}


function createInsertElement(header) {
	let innerHTML = ``;
	innerHTML += `<div class = "insert">`
	innerHTML += `<label>${header}</label>`
	innerHTML += `<input></input>`
	innerHTML += `</div>`
	return innerHTML;
}

function displayInsertItems(databaseObject, elementID) {
	// remove the primary key for each item
	// TODO: figure out how to do this with 0 elements. Could be interesting
	const insertDiv = document.getElementById(elementID)
	if (insertDiv == null) {
		return
	}
	let innerHTML = ``
	
	switch (databaseObject) {
		case databaseObjects.BANK:
			innerHTML += createInsertElement("Name")
			innerHTML += createInsertElement("Address")
			innerHTML += createInsertElement("Money")
			break;
		case databaseObjects.ACCOUNT:
			innerHTML += createInsertElement("Balance")
			innerHTML += createInsertElement("AccountType")
			innerHTML += createInsertElement("Name")
			innerHTML += createInsertElement("Status")
			innerHTML += createInsertElement("CustomerSSN")
			innerHTML += createInsertElement("BankID")
			break;
		case databaseObjects.LOAN:
			innerHTML += createInsertElement("DateIssued")
			innerHTML += createInsertElement("Principle")
			innerHTML += createInsertElement("loanAmount")
			innerHTML += createInsertElement("loanStatus")
			innerHTML += createInsertElement("offeredBy")
			innerHTML += createInsertElement("takenOutBy")
			break;
		case databaseObjects.TRANSACTION:
			innerHTML += createInsertElement("transactionName")
			innerHTML += createInsertElement("vendor")
			innerHTML += createInsertElement("transactionType")
			innerHTML += createInsertElement("Amount")
			innerHTML += createInsertElement("transactionDate")
			innerHTML += createInsertElement("AccountNumber")
			break;
		case databaseObjects.CUSTOMER:
			innerHTML += createInsertElement("SSN")
			innerHTML += createInsertElement("FirstName")
			innerHTML += createInsertElement("MiddleName")
			innerHTML += createInsertElement("LastName")
			innerHTML += createInsertElement("StreetAddress")
			innerHTML += createInsertElement("Zip")
			innerHTML += createInsertElement("State")
			innerHTML += createInsertElement("DateOfBirth")
			innerHTML += createInsertElement("Sex")
			innerHTML += createInsertElement("MemberOf")
			break;
	}
	insertDiv.innerHTML = innerHTML;
}

function insert() {
	const elems = document.getElementsByClassName("insert");
	if (elems == null) {
		return
	}
	let dataToSend = {}
	for (let i = 0; i < elems.length; i += 1) {
		// Go down the DOM and get the text from the label of the current item
		const columnItem = elems[i].children[0].textContent;
		// Go down again and grab the element written in the textbox
		const valueToInsert = elems[i].children[1].value;
		dataToSend[columnItem] = valueToInsert;
	}

	fetch(`http://localhost:3000/api/create${lastData}`, {
		method: "POST",
		body: JSON.stringify(dataToSend),
		headers: {
			"content-type":"application/json",
		}
	})
		.then((res) => { return res.json() })
		.then((data) => {
			console.log(data)
			getData(lastData)
		})
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


/* adds layout to other pages as needed */
function includeHTML() {
	const elements = document.querySelectorAll('[include-html]');
	elements.forEach(el => {
		const file = el.getAttribute('include-html');
		fetch(file)
			.then(response => {
				if (!response.ok) throw new Error('Failed to load ' + file);
				return response.text();
			})
			.then(data => {
				el.innerHTML = data;
				el.removeAttribute('include-html');
				includeHTML(); // For nested includes
			})
			.catch(err => {
				el.innerHTML = `<p style="color:red;">${err.message}</p>`;
			});
	});
}

window.addEventListener('DOMContentLoaded', includeHTML);
