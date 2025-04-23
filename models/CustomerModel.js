//Change this object to correct DB file
const { DataBase } = require('./db');
const db = new DataBase();

//get all customers in table
async function getCustomers(){
    const rows = await db.run('SELECT * FROM customer');
    return rows;
}

//get one customer by ID
//JSON format
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_, [_], _]  (values go here, some can be lists of values)
//}
async function getCustomer(body){
    const values = Object.values(body)
    let whereClause = ``
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
    const sql = `SELECT * FROM customer WHERE ${whereClause}`
    const rows = await db.run(sql);
    return rows;

}

//create a new customer row
//JSON format
//{
//  "SSN": integer
//  "FirstName": varchar
//  "MiddleName": varchar
//  "LastName": varchar
//  "StreetAddress": varchar
//  "ZipCode": integer
//  "State": char(2)
//  "DateOfBirth": date
//  "Sex": char(1)
//  "MemberOf": integer
//}
async function createCustomer(customerData){
    const [SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of] = Object.values(customerData);
    await db.run(
<<<<<<< Updated upstream
        'INSERT INTO customer(SSN, FirstName, MiddleName, LastName, StreetAddress, Zip, State, DateOfBirth, Sex, MemberOf) VALUES(?,?,?,?,?,?,?,?,?,?)',
=======
        
        'INSERT INTO customer(SSN, FirstName, MiddleName, LastName,StreetAddress, Zip, State, DateOfBirth, Sex, MemberOf) VALUES(?,?,?,?,?,?,?,?,?,?)',
>>>>>>> Stashed changes
        [SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of]
    );

}

//update existing customer profile
//the JSON needs this format
//{
//  "Columns": [_], (column list goes there)
//  "Values": [_],  (values go here, some can be lists of values), both items must be the same length
//  "SSN": integer
//}
async function updateCustomer(fieldsToUpdate){
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
    
    const sql =` UPDATE customer SET ${setClause} WHERE SSN = ${values[2]}`
    const result = await db.run(sql,values)
    return result.affectedRows
}


//all functions must be exported for user use.
module.exports = {
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer
};
