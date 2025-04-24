## Banking-System
This is a project for our Database Architecture class involving a banking system with a MySQL database connected. 

We will develop a web application program that combines SQL statements and a host language, which a GUI will automatically execute. We develop a basic web app functionality sending queries to the DBMS and showing the results on the website.

The main functionalities allow users to send queries to a DBMS and view the results directly on the website. By using MySQL and Node.js, we establish a server to database connection, where the server is able to gather specific data from the database, then can be formatted and presented to the frontend. With the use of Yaak, an open-source api, we conducted debugging and unit testing from the Node.js server to the DBMS, which allows us to optimize queries for data gathering.

Our application is designed with a focus on personal finance management. It allows users to track their financial history, access detailed account information, and manage customer profiles. Key features include viewing transaction histories on all accounts, creating new customer accounts, and modifying existing profiles - allowing for user-friendly solutions for financial oversight.


Demo Link: [Click Here!](https://youtu.be/xMv9ijMfhH0)
Github Link: [Click Here!](https://github.com/yoshiyahoo/Banking-System/tree/main?tab=readme-ov-file#banking-system)
Figma Link to Data Schema: [Click Here!](https://www.figma.com/board/TAOulemGLnlf4jg0ooKYqV/Welcome-to-FigJam)

## Queries Used
The following functions consist of the common query structure:
getBanks(), getAccounts(), getCustomers(), getTransactions(), getLoans()

These functions have a derivation of the following query since it follows the common idea of inserting data into their respective tables. Some key points to keep in mind is staying consistent on variable names, and the order the data is passed into the query through js.

'INSERT INTO customer(SSN, FirstName, MiddleName, LastName, StreetAddress, Zip, State, DateOfBirth, Sex, MemberOf) VALUES(?,?,?,?,?,?,?,?,?,?)'

All data from the frontend is processed by the Node.js server in the format: 

"Columns": [_], (column list goes there)
"Values": [_, [_], _]  (values go here, some can be lists of values)

Through the same format and using Yaak for debugging, we are able to process data into the database. 

createBank(), createAccount(), createCustomer(), createTransaction(), createLoan()

`SELECT * FROM customer WHERE ${whereClause}`

updateBank(), updateAccount(), updateCustomer(), updateTransaction(), updateLoan()

` UPDATE customer SET ${setClause} WHERE SSN = ${values[2]}`

For the update and create functions, we structured the SQL queries using placeholders and variables that correspond to user input. Once the JS functions complete data handling and validation, the query is executed and sent to the DBMS. This approach ensures that the desired operations—such as inserting new records or updating existing ones—are performed accurately, and the relevant data is successfully retrieved or modified.

## Tech Stacks
- Frontends : HTML, CSS, JavaScript
- Backends : Node.js
- Database : MYSQL
- Others : Yaak

## References
Schier, G. (n.d.). Yaak – the API client for modern developers. Yaak RSS. https://yaak.app/ 
Scott 混合理论Scott 混合理论                      2. (1957, October 1). MySQL how to declare a datetime variable?. Stack Overflow. https://stackoverflow.com/questions/14396196/mysql-how-to-declare-a-datetime-variable 
Meech-Ward, S. (n.d.). MySQL Node.JS express. YouTube. https://youtu.be/Hej48pi_lOc?si=AH8doQckFQT74l-1 

## Contributors
Josiah Troup [https://github.com/yoshiyahoo]
Monica Rico-Antonio [https://github.com/Mon-Rico]
