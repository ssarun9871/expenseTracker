const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const cors = require('cors');

const sequelize  = require('./util/database');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/users');
const purchaseRoutes = require('./routes/purchase');
const expenseTable = require('./models/expenses');
const usersTable = require('./models/users');
const orderTable = require('./models/orders');
const premium = require('./routes/premium')

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(expenseRoutes);
app.use(userRoutes);
app.use('/premium',premium);
app.use('/purchase',purchaseRoutes);
 
//this will add functionality that, in expenseTable foreign key may appear more than once
usersTable.hasMany(expenseTable);

//this will create the foreign key(userId) in expense and connect with pk(id) of usersTable
expenseTable.belongsTo(usersTable);

usersTable.hasMany(orderTable);
orderTable.belongsTo(usersTable);

sequelize.sync() 
.then(result=>{
    app.listen(3000);
})
.catch(err=>
    {console.log(err);
}) 