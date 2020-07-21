const mongoose = require('mongoose');
const OAuthAccessTokenSchema = new mongoose.Schema(
    {
        accessToken: {
            type: String,
            required: true,
        },
        expires: {
            type: Date,
        },
        clientId: {
            type: String,
            default:null
        },
        scope:{
            type:Array,
            default:['GET','POST']
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);