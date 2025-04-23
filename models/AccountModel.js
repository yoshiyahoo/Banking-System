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
//JSON data needs to be this format
// {
//   "Balance": _
//   "AccountType": _
//   "Name": _
//   "Status": _
//   "CustomerSSN": _
//   "BankID": _
// }
async function createAccount(accountData){
    const [Balance, AccType, Name, Status, CustomerSSN, BankID] = Object.values(accountData);
    await db.run(
        //table name might be wrong
        'INSERT INTO account(Balance,AccountType,Name,Status,CustomerSSN,BankID) VALUES(?,?,?,?,?,?)',
        [Balance, AccType, Name, Status, CustomerSSN, BankID]
    );
}

//get one account by a search query
//the JSON needs this format
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_],  (values go here, some can be lists of values), both items must be the same length
//  "AccountNumber": _
//}
async function updateAccount(fieldsToUpdate){
    
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
    const sql =` UPDATE account SET ${setClause} WHERE AccountNumber = ${values[2]}`
    const result = await db.run(sql,values)
    return result.affectedRows
}

//all functions must be exported for user use.
module.exports = {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount
};
