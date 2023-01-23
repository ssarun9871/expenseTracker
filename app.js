const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const cors = require('cors');
//const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
// const http = require('http');
// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

const sequelize  = require('./util/database');

//tables
const expenseTable = require('./models/expenses');
const usersTable = require('./models/users');
const orderTable = require('./models/orders');
const passwordRequestTable = require('./models/forgotPasswordReq');
const downloadTable = require('./models/download');

//routes
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/users');
const purchaseRoutes = require('./routes/purchase');
const premium = require('./routes/premium')
const passwordReset = require('./routes/password');
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined',{stream:accessLogStream}));
//app.use(helmet());

app.use(expenseRoutes); 
app.use(userRoutes);
app.use('/premium',premium);
app.use('/purchase',purchaseRoutes);
app.use('/password',passwordReset);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"./",`/views/${req.url}`))
})
 
//this will add functionality that, in expenseTable foreign key may appear more than once
usersTable.hasMany(expenseTable);

//this will create the foreign key(userId) in expense and connect with pk(id) of usersTable
expenseTable.belongsTo(usersTable);

usersTable.hasMany(orderTable);
orderTable.belongsTo(usersTable);

usersTable.hasMany(passwordRequestTable);
passwordRequestTable.belongsTo(usersTable);

usersTable.hasMany(downloadTable);
downloadTable.belongsTo(usersTable); 

sequelize.sync( ) 
.then(result=>{

    //http.createServer({key:privateKey,cert:certificate},app)
    app.listen(process.env.PORT||3000);
})
.catch(err=>
    {console.log(err);
}) 