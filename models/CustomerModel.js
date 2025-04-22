//Change this object to correct DB file
const db = require('./db');

//get all customers in table
async function getCustomers(){
    const[rows] = await db.query('SELECT * FROM customer');
    return rows;
}


//get one customer by ID
async function getCustomer(SSN){
    const [rows] = await db.query('SELECT * FROM customer WHERE SSN == ?',[SSN]);
    return rows[0];
}

//create a new customer row
async function createCustomer(){
    const {SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of } = customerData;
    const [result] = await db.query(
        'INSERT INTO customer(SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of) VALUES(?,?,?,?,?,?,?,?,?,?)',
        [SSN, FName, MName, LName,Street_Addr, Zip, State, DOB, Sex, Member_Of]
    );
    return result.insertid;

}

//all functions must be exported for user use.
module.exports = {
    getCustomer,
    getCustomers,
    createCustomer
};