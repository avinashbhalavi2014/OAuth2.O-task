const mongoose = require('mongoose');
require('dotenv').config();
let database_URL = process.env.DATABASE_URL;

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
if(env == 'development'){
    database_URL = 'mongodb://localhost:27017/oauth_db';
}

mongoose.connect(database_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(
    ()=>{ console.log('mongo database connected successfully')},
    (error)=>{ console.log('Failed to connect mongo database ..')}
);

// register mongo schema here
require('../models/users');
require('../models/category');
require('../models/products');
require('../models/carts');

require('../models/OAuthClient');
require('../models/OAuthAccessToken');