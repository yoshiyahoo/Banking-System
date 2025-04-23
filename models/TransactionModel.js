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
