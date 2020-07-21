
const OAuthAccessTokenModel = require('../models/OAuthAccessToken');
const userModel = require('../models/users');
const tools = {
    decryptApiKey: async (req, res, next) => {
      try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization || authorization === 'null') {
          req.currentUser = null;
          return next();
        }
        let accessToken = authorization.split(' ');
        accessToken = accessToken[1];
        let findtoken = await OAuthAccessTokenModel.findOne({ accessToken: accessToken});
        if(findtoken){
            let user = await userModel.findOne({ _id: findtoken.userId});
            req.currentUser = user;
            return next()
        }
       }catch(e){
           console.log('error',error);
       }
      }
  };
  
  module.exports = tools;