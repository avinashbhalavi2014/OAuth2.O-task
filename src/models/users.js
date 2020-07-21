const mongoose = require('mongoose');
const userType = require('../dataType/userType');
const usersSchema = new mongoose.Schema(
    {
     username:{
         type:String,
         required: true,
     },
     password:{
         type: String,
         required: true
     },
     email: {
        type: String,
        default: null
     },
     firstName:{
         type:String,
         default: null
     },
     lastName:{
         type:String,
         default:null
     },
     userType:{
         type:String,
         default:userType.user
     },
     phone:{
         type:Number,
         default:null
     },
     address:{
         type:Number,
         default:null
     }
    },
    { timestamps: true }
);

module.exports = mongoose.model('users',usersSchema);