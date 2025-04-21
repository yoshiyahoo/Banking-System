//Change all object to Account objects
//Change this object to correct DB file
const db = require('./db');

//get all accounts in table
async function getAccounts(){
    const[rows] = await db.query('SELECT * FROM account');
    return rows;
}


//get one account by ID
async function getAccount(){
    const [rows] = await db.query('SELECT * FROM account WHERE AccNum == ?',[AccNum]);
    return rows[0];
}

//create a new account row
async function createAccount(){
    const {AccNum, Balance, AccType, Name,Status, CustomerSSN, BankID } = accountData;
    const [result] = await db.query(
        //table name might be wrong
        'INSERT INTO account(AccNum,Balance,AccType,Name,Status,CustomerSSN,BankID) VALUES(?,?,?,?,?,?,?)',
        [AccNum, Balance, AccType, Name,Status, CustomerSSN, BankID]
    );
    return result.insertid;

}

//all functions must be exported for user use.
module.exports = {
    getAccounts,
    getAccount,
    createAccount
};