//Change this object to correct DB file
const { DataBase } = require("./db");

const db = new DataBase();

//get all loans in table
async function getLoans(){
    const rows = await db.run('SELECT * FROM loan');
    return rows;
}


//get one loan by ID
async function getLoan(Loan_ID){
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
    const sql = `SELECT * FROM loan WHERE ${whereClause}`
    const rows = await db.run(sql);
    return rows;
}

//create a new loan row
async function createLoan(Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy){
    const {Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy } = loanData;
    await db.run(
        //table name might be wrong
        'INSERT INTO customer(LoanID,DateIssued,Principle,loanAmount,loanStatus,offeredBy,takenOutBy) VALUES(?,?,?,?,?,?,?)',
        [Loan_ID,IssueDate,Principle,Loan_Amt,Status,OfferedBy,TakenOutBy]
    );
}

//update existing loan profile
async function updateLoans(fieldsToUpdate){
    
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
    
    const sql =` UPDATE loans SET ${setClause} WHERE LoanID = ${values[2]}`
    const result = await db.run(sql,values)
    return result.affectedRows
}

//all functions must be exported for user use.
module.exports = {
    getLoan,
    getLoans,
    createLoan
};
