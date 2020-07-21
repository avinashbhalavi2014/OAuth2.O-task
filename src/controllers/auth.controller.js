let PatrolMan = require('patrolman');
PatrolMan = new PatrolMan(require('../policies/config'));
const userDB = require('../database/userDB');
const OAuthDB = require('../database/OAuthDB');

const authController = {
    register : async (req, res) => {
        try {
           let { username, password, email, firstName, lastName} = req.body;
           if(!username || !password){ return res.status(400).json({success: false, message:"BAD_REQUEST"})};
           let validateUser = await userDB.isValidUser(req.body);
           if(validateUser){ return res.status(200).json({success:false, message:"USER ALREADY EXISTS"})}
           let user = await userDB.saveUser(req.body);
           req.body['userId'] = user._id.toString();
           // create OAuth Client
           let getOAuthClient = await OAuthDB.getOAuthClient(req.body.client_id, req.body.client_secret);
           if(!getOAuthClient){
            let OAuthClient = await OAuthDB.saveOAuthClient(req.body);
           }
           return res.status(200).json({success:true, message:"REGISTRATION SUCCESS"});          
        } catch (error) {
          return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    },
    login: async (req, res)=>{
        try {
            let { username, password } = req.body;
            if(!username || !password){ return res.status(400).json({success: false, message:"BAD_REQUEST"})};
            let user = await userDB.getUser(req.body);
            if(user) return res.status(200).json({success: true, user});
            else return res.status(400).json({success: false, message:"INVALID CREDENTIALS"});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    }
}

module.exports = PatrolMan.patrol('auth', authController);