//Change this object to correct DB file
const { Database } = require('./db');
const db = new Database()

//get all transactions in table
async function getTransactions(){
	const rows = await db.run('SELECT * FROM transaction');
	return rows;
}

//get one transaction by ID
async function getTransaction(Body){
	const values = Object.values(body)
	let whereClause = ``
	for (let i = 0; i < values[0].length; i += 1) {
		let set = ``;
		if (Array.isArray(values[1][i])) {
			set += `"${values[1][i].join("\",\"")}"`
			whereClause += `${values[0][i]} in (${set})`
		}
		else {
			whereClause += `${values[0][i]} = "${values[1][i]}"`
		}
		if (i + 1 != values[0].length) {
			whereClause += ` and `
		}
	}
	const sql = `SELECT * FROM transaction WHERE ${whereClause}`
	const rows = await db.run(sql);
	return rows;
}


/* {
	transactionName: varchar
	vendor: varchar
	transactionType: varchar
	Amount: int
	transactionDate: DATE
	AccountNumber: int
} */

//create a new transaction row
async function createTransaction(transactionData){
	const [Name,Vendor,TransType,Amt,Date,AccNum] = Object.values(transactionData);
	await db.run(
		//table name might be wrong
		'INSERT INTO transaction(transactionName,Vendor,transactionType,Amount,transactionDate,AccountNumber) VALUES(?,?,?,?,?,?)',
		[Name,Vendor,TransType,Amt,Date,AccNum]
	);
}

//update existing transaction
async function updateTransaction(fieldsToUpdate){
	
	const values = Object.values(fieldsToUpdate)

	if(Object.values(fieldsToUpdate)[0].length === 0) {
		throw new Error('No new items to update.');
	}
	else if (values[0].length !== values[1].length) {
		throw new Error("The number of items you're updating doesn't match the amount of values provided");
	}
	
	let setClause = ``
	for(let i = 0; i < values[0].length; i += 1) {
		setClause += `${values[0][i]} = "${values[1][i]} "`
		if (i + 1 !== values[0].length) {
			setClause += `,` 
		}
	} 
	
	const sql =` UPDATE transaction SET ${setClause} WHERE TransactionID = ${values[2]}`
	const result = await db.run(sql,values)
	return result.affectedRows
}

//all functions must be exported for user use.
module.exports = {
	getTransaction,
	getTransactions,
	createTransaction,
	updateTransaction
};
