const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    paymentid:{
        type:String,
    },
    orderid:{
        type:String,
        required: true,
        unique:true
    },
    status:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('orders',orderSchema)
