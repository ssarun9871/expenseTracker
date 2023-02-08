const mongoose = require('mongoose');
const Schemma = mongoose.Schema;
const expenseSchema = new Schemma({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    amount:{
        type:Number,
        required: true 
    },
    description:{
        type:String,
        required: true,
    },
    category:{ 
        type:String,
        required: true
    }
}); 

module.exports = mongoose.model('expenses', expenseSchema);
