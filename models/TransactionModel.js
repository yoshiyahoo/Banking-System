//
//Change this object to correct DB file
const db = require('./db');

//get all transactions in table
async function getTransactions(){
    const rows = await db.run('SELECT * FROM transaction');
    return rows;
}


//get one transaction by ID
async function getTransaction(TransID){
    const rows = await db.run('SELECT * FROM transaction WHERE TransID == ?',[TransID]);
    return rows[0];
}

//create a new transaction row
async function createTransaction(TransID,Name,Vendor,TransType,Amt,Date,AccNum){
    const {TransID,Name,Vendor,TransType,Amt,Date,AccNum} = transactionData;
    await db.run(
        //table name might be wrong
        'INSERT INTO transaction(TransID,Name,Vendor,TransType,Amt,Date,AccNum) VALUES(?,?,?,?,?,?,?)',
        [TransID,Name,Vendor,TransType,Amt,Date,AccNum]
    );
}

//all functions must be exported for user use.
module.exports = {
    getTransaction,
    getTransactions,
    createTransaction
};
