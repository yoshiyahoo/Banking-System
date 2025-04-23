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

//all functions must be exported for user use.
module.exports = {
    getCustomer,
    getCustomers,
    createCustomer
};
