//Change all object to Account objects
//Change this object to correct DB file
const { DataBase } = require("./db");

const db = new DataBase();

//get all accounts in table
async function getAccounts() {
    const rows = await db.run('SELECT * FROM account');
    return rows;
}

//get one account by a search query
//the JSON needs this format
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_, [_], _]  (values go here, some can be lists of values)
//}
async function getAccount(body){
    const values = Object.values(body)
    let whereClause = ``
    console.log(values[1]); 
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
    console.log(whereClause)
    const sql = `SELECT * FROM account WHERE ${whereClause}`
    const rows = await db.run(sql);
    return rows;
}

//create a new account row
async function createAccount(accountData){
    const [Balance, AccType, Name, Status, CustomerSSN, BankID] = Object.values(accountData);
    await db.run(
        //table name might be wrong
        'INSERT INTO account(Balance,AccountType,Name,Status,CustomerSSN,BankID) VALUES(?,?,?,?,?,?)',
        [Balance, AccType, Name, Status, CustomerSSN, BankID]
    );
}

//all functions must be exported for user use.
module.exports = {
    getAccounts,
    getAccount,
    createAccount
};
