//Change all object to Account objects
//Change this object to correct DB file
const db = require('./db');

//get all accounts in table
async function getAccounts(){
    const rows = await db.query('SELECT * FROM account');
    return rows;
}


//get one account by ID
async function getAccount(AccNum){
    const [rows] = await db.query('SELECT * FROM account WHERE AccNum == ?',[AccNum]);
    return rows[0];
}

//create a new account row
async function createAccount(){
    const {AccNum, Balance, AccType, Name, Status, CustomerSSN, BankID } = accountData;
    const [result] = await db.query(
        'INSERT INTO account(AccNum,Balance,AccType,Name,Status,CustomerSSN,BankID) VALUES(?,?,?,?,?,?,?)',
        [AccNum, Balance, AccType, Name,Status, CustomerSSN, BankID]
    );
    return result.insertid;

}

//update Account table 
async function updateAccount(CustomerSSN,BankID,fieldsToUpdate){
    
    if(!fieldsToUpdate || Object.keys(fieldsToUpdate) == 0){
        throw new Error('No new items to update.');
    }
    const setClause = Object.keys(fieldsToUpdate)
        .map(key=> '${key} = ?')
        .join(', '); 
    const values = Object.values(fieldsToUpdate);
    values.push(CustomerSSN,BankID)
    const sql =`
    UPDATE account SET ${setClause} WHERE customer.SSN = ? AND bank.BankID = ?; 
    `;
    const [result] = await db.query(sql,values);
    return result.affectedRows;


}
//all functions must be exported for user use.
module.exports = {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount
};