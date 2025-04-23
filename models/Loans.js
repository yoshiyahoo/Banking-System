//
//Change this object to correct DB file
const db = require('./db');

//get all loans in table
async function getLoans(){
    const rows = await db.run('SELECT * FROM loan');
    return rows;
}


//get one loan by ID
async function getLoan(Loan_ID){
    const rows = await db.run('SELECT * FROM loan WHERE Loan_ID == ?',[Loan_ID]);
    return rows[0];
}

//create a new loan row
async function createLoan(Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy){
    const {Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy } = loanData;
    await db.run(
        //table name might be wrong
        'INSERT INTO customer(Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy) VALUES(?,?,?,?,?,?,?)',
        [Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy]
    );
}

//all functions must be exported for user use.
module.exports = {
    getLoan,
    getLoans,
    createLoan
};
