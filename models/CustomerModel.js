//Change this object to correct DB file
const db = require('./db');

//get all customers in table
async function getCustomers(){
    const rows = await db.run('SELECT * FROM customer');
    return rows;
}


//get one customer by ID
async function getCustomer(){
    const rows = await db.run('SELECT * FROM customer WHERE SSN == ?',[SSN]);
    return rows[0];
}

//create a new customer row
async function createCustomer(){
    const {SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of } = customerData;
    await db.run(
        //table name might be wrong
        'INSERT INTO customer(SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of) VALUES(?,?,?,?,?,?,?,?,?,?)',
        [SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of]
    );

}

//update existing customer profile
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
    
    const sql =` UPDATE customer SET ${setClause} WHERE customerSSN = ${values[2]}`
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
