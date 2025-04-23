//Change all object name to Bank Object Names
//Change this object to correct DB file
const db = require('./db');

//get all Banks in table
async function getBanks(){
    const rows = await db.query('SELECT * FROM bank');
    return rows;
}


//get one Bank by ID
async function getBank(BankID){
    const [rows] = await db.query('SELECT * FROM bank WHERE Bank_ID == ?',[BankID]);
    return rows[0];
}

//create a new bank row
//What is Bank.Money?
async function createBank(){
    const {BankID, Name, Addr,Money } = BankData;
    const [result] = await db.query(
        'INSERT INTO customer(BankID, Name, Addr,Money ) VALUES(?,?,?,?)',
        [BankID, Name, Addr,Money ]
    );
    return result.insertid;

}

//all functions must be exported for user use.
module.exports = {
    getBanks,
    getBank,
    createBank
};