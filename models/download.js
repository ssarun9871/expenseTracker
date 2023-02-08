const mongoose = require('mongoose');
const Schemma = mongoose.Schema;
const expenseSchema = new Schemma({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    downloadlinks:{
        type:String,
        required: true 
    }
}); 

module.exports = mongoose.model('downloads', expenseSchema);