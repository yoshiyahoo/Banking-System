//
//Change this object to correct DB file
const db = require('./db');

//get all transactions in table
async function getTransactions(){
    const[rows] = await db.query('SELECT * FROM transaction');
    return rows;
}


//get one transaction by ID
async function getTransaction(TransID){
    const [rows] = await db.query('SELECT * FROM transaction WHERE TransID == ?',[TransID]);
    return rows[0];
}

//create a new transaction row
async function createTransaction(){
    const {TransID,Name,Vendor,TransType,Amt,Date,AccNum } = transactionData;
    const [result] = await db.query(
        'INSERT INTO transaction(TransID,Name,Vendor,TransType,Amt,Date,AccNum) VALUES(?,?,?,?,?,?,?)',
        [TransID,Name,Vendor,TransType,Amt,Date,AccNum]
    );
    return result.insertid;

}

//all functions must be exported for user use.
module.exports = {
    getTransaction,
    getTransactions,
    createTransaction
};