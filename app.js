const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const cors = require('cors');

const sequelize  = require('./util/database');
const expenseRoutes = require('./routes/expense');
const userRouter = require('./routes/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(expenseRoutes);
app.use(userRouter);

sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>
    {console.log(err);
})