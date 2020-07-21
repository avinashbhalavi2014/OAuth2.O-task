const mongoose = require('mongoose');
const OAuthClientSchema = new mongoose.Schema(
    {
        // name: {
        //     type: String,
        //     default: null//"xyz"
        // },
        clientId: {
            type: String,
            default: null//"client Id"
        },
        clientSecret: {
            type: String,
            default: null//"client secret"
        },
        redirectUri: {
            type: String,
            default: null
        },
        grants: {
            type: String,
            default: null
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);