const express = require("express");
const app = express();
const cors = require('cors');
const { getBank, getBanks, createBank, updateBank } = require('./models/BankModel')
const { getAccount, getAccounts, updateAccount, createAccount } = require('./models/AccountModel') 
const { getCustomer, getCustomers, createCustomer, updateCustomer } = require('./models/CustomerModel')
const { getLoan, getLoans, createLoan, updateLoan } = require('./models/Loans')
const { getTransaction, getTransactions, createTransaction, updateTransaction } = require('./models/TransactionModel')

// const AppDAO = require('./DAO');
// const Repository = require('./Repository');
// const Todo = require('./models');


// Setup cors authentication to allow other frameworks to talk to this server
app.use(express.json())
app.use(cors()) // make sure it's a function call omg
app.use(express.static("public")) // this allows the CSS, main.js and other static items to render


// Setup Account Routes
app.get("/api/getAccounts", (_req, res) => {
    getAccounts()
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/getAccount", (req, res) => {
    getAccount(req.body)
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/updateAccount", (req, res) => {
    updateAccount(req.body)
        .then((_data) => {
            res.json("Account Updated!")
        })
})

app.post("/api/createAccount", (req, res) => {
    createAccount(req.body)
        .then(() => {
            res.json("Account Created!")
        })
        .catch((err) => {
            res.json({"Account Failed to Create!": err})
        })
})

// Setup Bank Routes
app.get("/api/getBanks", (_req, res) => {
    getBanks()
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/getBank", (req, res) => {
    getBank(req.body)
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/updateBank", (req, res) => {
    updateBank(req.body)
        .then((_data) => {
            res.json("Bank Updated!")
        })
})

app.post("/api/createBank", (req, res) => {
    createBank(req.body)
        .then(() => {
            res.json("Bank Created!")
        })
        .catch((err) => {
            res.json({"Bank Failed to Create!": err})
        })
})


// Setup Customer Routes
app.get("/api/getCustomers", (_req, res) => {
    getCustomers()
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/getCustomer", (req, res) => {
    getCustomer(req.body)
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/updateCustomer", (req, res) => {
    updateCustomer(req.body)
        .then((_data) => {
            res.json("Customer Updated!")
        })
})

app.post("/api/createCustomer", (req, res) => {
    createCustomer(req.body)
        .then(() => {
            res.json("Customer Created!")
        })
        .catch((err) => {
            res.json({"Customer Failed to Create!": err})
        })
})

// Setup loan routes
app.get("/api/getLoans", (_req, res) => {
    getLoans()
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/getLoan", (req, res) => {
    getLoan(req.body)
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/updateLoan", (req, res) => {
    updateLoan(req.body)
        .then((_data) => {
            res.json("Loan Updated!")
        })
})

app.post("/api/createLoan", (req, res) => {
    createLoan(req.body)
        .then(() => {
            res.json("Loan Created!")
        })
        .catch((err) => {
            res.json({"Loan Failed to Create!": err})
        })
})

// Setup loan routes
app.get("/api/getTransactions", (_req, res) => {
    getTransactions()
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/getTransaction", (req, res) => {
    getTransaction(req.body)
        .then((data) => {
            res.json(data)
        })
})

app.post("/api/updateTransaction", (req, res) => {
    updateTransaction(req.body)
        .then((_data) => {
            res.json("Transaction Updated!")
        })
})

app.post("/api/createTransaction", (req, res) => {
    createTransaction(req.body)
        .then(() => {
            res.json("Transaction Created!")
        })
        .catch((err) => {
            res.json({"Transaction Failed to Create!": err})
        })
})

// Setup main route for the website
app.get("/", (_req, res) => {
    path = __dirname + "/public/index.html"
    res.sendFile(path)
})



/*
app.get('/something_else', (request, response) => {
    try{
        console.log('trying to fetch');
        //const allTodos = await todoRepository.getAllTodos();
        console.log('get all todos ', allTodos);
        res.json(allTodos);
    } 
    catch (err) {
        console.log(err.message);
    }
});
*/

//get a todo by id
/*
app.get('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await todoRepository.getTodoById(id);
      // console.log("get todo by id ", todo);
      res.json(todo);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  //insert a todo
  app.post('/todos', async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await todoRepository.insertTodo(description);
      // console.log("insert todo ", newTodo);
      res.json(newTodo);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  //update a todo by id
  app.put('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      newTodo = new Todo(id, description);
      const updateTodo = await todoRepository.updateTodo(newTodo);
      // console.log("update todo ", updateTodo);
      res.json(updateTodo);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo by id
  app.delete('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await todoRepository.deleteTodo(id);
      // console.log("delete todo", deleteTodo);
      res.json(deleteTodo);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.get('*', function (req, res) {
    path = __dirname + '/public/index.html';
    res.sendFile(path);
  });
  
  const dao = new AppDAO();
  const todoRepository = new Repository(dao);
  todoRepository.createTable();
  
  app.listen(3000, () => {
    console.log('server has started on port 3000');
  });
*/
    // response.send(await readfile('./home.html', 'utf8'))
    // response.send(awaitreadfile('./home.html', 'utf8', (err,html) => {
    //     if(err){
    //         response.status(500).send('sorry, out of order')
    //     }
    //     response.send(html)
    // })

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))
