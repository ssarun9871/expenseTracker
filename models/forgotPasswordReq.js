const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgotSchema = new Schema({
    _id:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },    isactive:{
        type:Boolean,
        required:true
    }
})


module.exports = mongoose.model('forgotpasswords',forgotSchema);
