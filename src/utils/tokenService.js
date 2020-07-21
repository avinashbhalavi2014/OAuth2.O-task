const userDB = require('../database/userDB');
const OAuthDB = require('../database/OAuthDB');

getClient = async function (clientID, clientSecret, callback) {  //, callback
    OAuthDB.getOAuthClient(clientID, clientSecret).then((client) => {
        callback(false, client);
    })
};

grantTypeAllowed = function (clientID, grantType, callback) {
    callback(false, true)
};

getUser = function (username, password, callback) {
    userDB.getUser(username, password).then((user) => {
        callback(false, user)
    })
};

saveAccessToken = function (accessToken, clientID, expires, user, callback) { //, callback
    OAuthDB.saveAccessToken(accessToken, clientID, expires, user).then((result) => {
        callback(false, result)
    })
};

getAccessToken = function (bearerToken, callback) {
    OAuthDB.getUserIdFromBearerToken(bearerToken).then((accessToken) => {
        if (accessToken) {}
        callback(false, accessToken);
    })
}

module.exports = { getClient, grantTypeAllowed, getUser, saveAccessToken, getAccessToken }