//
//Change this object to correct DB file
const db = require('./db');

//get all loans in table
async function getLoans(){
    const[rows] = await db.query('SELECT * FROM loan');
    return rows;
}


//get one loan by ID
async function getLoan(){
    const [rows] = await db.query('SELECT * FROM loan WHERE Loan_ID == ?',[Loan_ID]);
    return rows[0];
}

//create a new loan row
async function createLoan(){
    const {Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy } = loanData;
    const [result] = await db.query(
        //table name might be wrong
        'INSERT INTO customer(Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy) VALUES(?,?,?,?,?,?,?)',
        [Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy]
    );
    return result.insertid;

}

//all functions must be exported for user use.
module.exports = {
    getLoan,
    getLoans,
    createLoan
};