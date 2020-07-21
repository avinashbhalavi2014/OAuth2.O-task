const mongoose = require('mongoose');
const userModel = mongoose.model('users');
const userType  = require('../dataType/userType')
const crypto = require("crypto");

saveUser = function(reqBody){
    return new Promise((resolve, reject)=>{
        reqBody.password =  crypto.createHash("sha256").update(reqBody.password).digest("hex");
        userModel.create({
            username : reqBody.username,
            password : reqBody.password,
            email : reqBody.email,
            firstName : reqBody.firstName,
            lastName : reqBody.lastName,
            userType : reqBody.role ? ((reqBody.role == 'admin') ? userType.admin: userType.user):userType.user
        }).then((user)=>{
            return resolve(user);
        }).catch((e)=>{
            return reject(e);
        })
    });
};

getUser = function(username, password){
     return new Promise((resolve, reject)=>{
        password =  crypto.createHash("sha256").update(password).digest("hex");
        userModel.findOne({
            username: username,
            password: password
        }).then((user)=>{
            return resolve({
                _id: user._id.toString(),
                username: user.username,
                userType: user.userType
            });
        }).catch((e)=>{
            return reject(e);
        })
   })
};

isValidUser = function(reqBody){
    return new Promise((resolve, reject)=>{
        userModel.findOne({
            username: reqBody.username
        }).then((user)=>{
           return resolve(user)
        }).catch((e)=>{
           return reject(e);
        })
    })
};

module.exports = { saveUser, getUser, isValidUser };