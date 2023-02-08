const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');


//routes
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premium = require('./routes/premium')
const passwordReset = require('./routes/password');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(userRoutes);
app.use(expenseRoutes); 
app.use('/premium',premium);
app.use('/purchase',purchaseRoutes);
app.use('/password',passwordReset);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"./",`/views/${req.url}`))
})
 

mongoose.connect(`mongodb+srv://ssarun9871:${process.env.MongoDbPwd}@cluster0.oxomptf.mongodb.net/expenseTracker?retryWrites=true&w=majority`)
.then(res =>{
app.listen(3000);
})
.catch(err =>{
    console.log(err);
})