const mongoose = require('mongoose');

let Registernewuser = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Registernewuser',Registernewuser)