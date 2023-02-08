const mongoose = require('mongoose');
const Schemma = mongoose.Schema;

const userSchema = new Schemma({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    rowPreference:{
        type:Number,
        default:5
    }
});
module.exports = mongoose.model('users', userSchema);

