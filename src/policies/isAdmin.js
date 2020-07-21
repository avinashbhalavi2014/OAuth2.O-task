const userType  = require('../dataType/userType');

module.exports = (req, res, next)=>{
    if(req.currentUser == null) return res.status(400).json({success: false , message:"INVLAID ACCESS"});
    else if(req.currentUser.userType == userType.admin){return next()};
    return res.status(400).json({ success: false, message:"INVALID ACCESS"})
}