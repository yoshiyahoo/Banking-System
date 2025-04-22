//Change all object to Account objects
//Change this object to correct DB file
const db = require('./db');

//get all accounts in table
function getAccounts() {
    const rows = db.query('SELECT * FROM account');
    return rows;
}


//get one account by ID
function getAccount(AccNum){
    const rows = db.query('SELECT * FROM account WHERE AccNum == ?',[AccNum]);
    return rows[0];
}

//create a new account row
function createAccount(){
    const {AccNum, Balance, AccType, Name,Status, CustomerSSN, BankID } = accountData;
    const [result] = db.query(
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
