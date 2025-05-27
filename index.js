const express = require("express");
const app = express();
const cors = require('cors');
const { getBank, getBanks, createBank, updateBank } = require('./models/BankModel')
const { getAccount, getAccounts, updateAccount, createAccount } = require('./models/AccountModel') 
const { getCustomer, getCustomers, createCustomer, updateCustomer } = require('./models/CustomerModel')
const { getLoan, getLoans, createLoan, updateLoan } = require('./models/Loans')
const { getTransaction, getTransactions, createTransaction, updateTransaction } = require('./models/TransactionModel')

// const AppDAO = require('./DAO');
// const Repository = require('./Repository');
// const Todo = require('./models');


// Setup cors authentication to allow other frameworks to talk to this server
app.use(express.json())
app.use(cors()) // make sure it's a function call omg
app.use(express.static("public")) // this allows the CSS, main.js and other static items to render


// Setup Account Routes
app.get("/api/getAccounts", (_req, res) => {
	getAccounts()
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/getAccount", (req, res) => {
	getAccount(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/updateAccount", (req, res) => {
	updateAccount(req.body)
		.then((_data) => {
			res.json("Account Updated!")
		})
})

app.post("/api/createAccount", (req, res) => {
	createAccount(req.body)
		.then(() => {
			res.json("Account Created!")
		})
		.catch((err) => {
			res.json({"Account Failed to Create!": err})
		})
})

// Setup Bank Routes
app.get("/api/getBanks", (_req, res) => {
	getBanks()
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/getBank", (req, res) => {
	getBank(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/updateBank", (req, res) => {
	updateBank(req.body)
		.then((_data) => {
			res.json("Bank Updated!")
		})
})

app.post("/api/createBank", (req, res) => {
	createBank(req.body)
		.then(() => {
			res.json("Bank Created!")
		})
		.catch((err) => {
			res.json({"Bank Failed to Create!": err})
		})
})


// Setup Customer Routes
app.get("/api/getCustomers", (_req, res) => {
	getCustomers()
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/getCustomer", (req, res) => {
	getCustomer(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/updateCustomer", (req, res) => {
	updateCustomer(req.body)
		.then((_data) => {
			res.json("Customer Updated!")
		})
})

app.post("/api/createCustomer", (req, res) => {
	createCustomer(req.body)
		.then(() => {
			res.json("Customer Created!")
		})
		.catch((err) => {
			res.json({"Customer Failed to Create!": err})
		})
})

// Setup loan routes
app.get("/api/getLoans", (_req, res) => {
	getLoans()
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/getLoan", (req, res) => {
	getLoan(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/updateLoan", (req, res) => {
	updateLoan(req.body)
		.then((_data) => {
			res.json("Loan Updated!")
		})
})

app.post("/api/createLoan", (req, res) => {
	createLoan(req.body)
		.then(() => {
			res.json("Loan Created!")
		})
		.catch((err) => {
			res.json({"Loan Failed to Create!": err})
		})
})

// Setup loan routes
app.get("/api/getTransactions", (_req, res) => {
	getTransactions()
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/getTransaction", (req, res) => {
	getTransaction(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post("/api/updateTransaction", (req, res) => {
	updateTransaction(req.body)
		.then((_data) => {
			res.json("Transaction Updated!")
		})
})

app.post("/api/createTransaction", (req, res) => {
	createTransaction(req.body)
		.then(() => {
			res.json("Transaction Created!")
		})
		.catch((err) => {
			res.json({"Transaction Failed to Create!": err})
		})
})

// Setup main route for the website
app.get("/", (_req, res) => {
	path = __dirname + "/public/index.html"
	res.sendFile(path)
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))

