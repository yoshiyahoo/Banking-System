const db = require('./db');

//get all Banks in table
async function getBanks() {
    const rows = await db.run('SELECT * FROM bank');
    return rows;
}

//get one Bank
//the JSON needs this format
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_, [_], _]  (values go here, some can be lists of values)
//}
async function getBank(body) {
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
    const sql = `SELECT * FROM bank WHERE ${whereClause}`
    const rows = await db.run(sql);
    return rows;
}

//create a new bank row
//JSON format 
//{
//  "Name": varchar
//  "Address": varchar
//  "Money": integer 
//}
async function createBank(BankData) {
    const {Name, Addr, Money} = BankData;
    await db.run(
        'INSERT INTO customer(Name, Addr, Money) VALUES(?,?,?)',
        [Name, Addr, Money]
    );
}

//update the bank row
//JSON fromat
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_],  (values go here, some can be lists of values), both items must be the same length
//  "BankID": integer
//}
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
