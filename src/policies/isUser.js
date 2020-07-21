const userType = require('../dataType/userType');
const category = require('../models/category');

module.exports = (req, res, next)=>{
    try{
        if(req.currentUser == null){
            return res.status(400).json({ success: false, message:'INVALID ACCESS'});
        }
        else if((req.currentUser.userType == userType.admin) || (req.currentUser.userType == userType.user)){
            return next();
        }
    }catch(e){
        return res.status(400).json({ success: false, message: 'INVALID ACCESS'})
    }
}