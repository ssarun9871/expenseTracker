const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const cors = require('cors');

const sequelize  = require('./util/database');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/users');
const expenseTable = require('./models/expenses');
const usersTable = require('./models/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(expenseRoutes);
app.use(userRoutes);
 
//this will add functionality that, in expenseTable foreign key may appear more than once
usersTable.hasMany(expenseTable);

//this will create the foreign key(userId) in expense and connect with pk(id) of usersTable
expenseTable.belongsTo(usersTable);

sequelize.sync() 
.then(result=>{
    app.listen(3000);
})
.catch(err=>
    {console.log(err);
}) 