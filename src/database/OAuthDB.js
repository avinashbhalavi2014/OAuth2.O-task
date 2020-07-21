const mongoose = require('mongoose');
const OAuthClientModel = mongoose.model("OAuthClient");
const OAuthAccessTokenModel = mongoose.model('OAuthAccessToken');
const userType = require('../dataType/userType');

saveOAuthClient = function(reqBody){
    return new Promise((resolve, reject)=>{
        OAuthClientModel.create({
            userId: reqBody.userId,
            //name:reqBody.clientName,
            clientId: reqBody.client_id,
            clientSecret: reqBody.client_secret,
            redirectUri: reqBody.redirectUri,
            grants: reqBody.grant_type
        }).then((OAuthClient)=>{
            return resolve(OAuthClient);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

getOAuthClient = function (clientId, clientSecret){
    return new Promise((resolve,reject)=>{
        OAuthClientModel.findOne({
            clientId:clientId,
            clientSecret: clientSecret
        }).then((OAuthClient)=>{
            if(OAuthClient){
                return resolve({
                    clientID : OAuthClient.clientId,
                    clientSecret: OAuthClient.clientSecret,
                    grants: OAuthClient.grants,
                    redirectUris: OAuthClient.redirectUri})
            }
           return resolve(OAuthClient)
        }).catch((e)=>{
            return reject(e);
        })
    })
}

// save access token
saveAccessToken = function(accessToken, clientID, expires, user){
    return new Promise((resolve, reject)=>{
        OAuthAccessTokenModel.create({
            clientId:clientID,
            accessToken: accessToken,
            expires: expires,
            userId: user._id,
            scope: (user.userType == userType.admin) ? ['GET','POST','PUT', 'DELETE']:['GET','POST']
        }).then((token)=>{
            return resolve(token);
        }).catch((e)=>{
            return reject(e);
        })
    })
};
// get user from bearer token
getUserIdFromBearerToken = function(bearerToken){
    return new Promise((resolve,reject)=>{
        OAuthAccessTokenModel.findOne({
            accessToken: bearerToken
        }).then((token)=>{
            return resolve(token);
        }).catch((e)=>{
            return reject(e);
        })
    })
};

module.exports = { saveOAuthClient, getOAuthClient, saveAccessToken, getUserIdFromBearerToken}