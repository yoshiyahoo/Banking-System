const db = require('./db');

//get all Banks in table
async function getBanks(){
    const rows = await db.run('SELECT * FROM bank');
    return rows;
}


//get one Bank by ID
<<<<<<< Updated upstream
async function getBank(){
    const rows = await db.run('SELECT * FROM bank WHERE Bank_ID == ?',[Bank_ID]);
=======
async function getBank() {
    const rows = await db.run('SELECT * FROM bank WHERE Bank_ID == ?',[BankID]);
>>>>>>> Stashed changes
    return rows[0];
}

//create a new bank row
<<<<<<< Updated upstream
//What is Bank.Money?
async function createBank(){
    const {Bank_ID, Name, Addr,Money } = BankData;
    await db.run(
        'INSERT INTO bank(Bank_ID, Name, Addr,Money ) VALUES(?,?,?,?)',
        [Bank_ID, Name, Addr,Money ]
=======
async function createBank(BankData) {
    const {BankID, Name, Addr, Money} = BankData;
    await db.run(
        'INSERT INTO customer(BankID, Name, Addr,Money ) VALUES(?,?,?,?)',
        [BankID, Name, Addr, Money]
>>>>>>> Stashed changes
    );
}

async function updateBank(fieldsToUpdate){
    
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
    
    const sql =` UPDATE bank SET ${setClause} WHERE BankID = ${values[2]}`
    const result = await db.run(sql,values)
    return result.affectedRows
}

//all functions must be exported for user use.
module.exports = {
    getBanks,
    getBank,
    createBank,
    updateBank
};
