const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 8081;
require('./src/database/mongo');
const { decryptApiKey } =require('./src/utils/tools');
app.use(bodyParser.json({extended:true,  limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));

// OAuth imports
const oAuthService = require("./src/utils/tokenService");
const oAuth2Server = require("node-oauth2-server");

app.oauth = oAuth2Server({
    model:oAuthService,
    grants: ["password"], // the way an application gets an access token
    debug:true,
})

const authRoutes = require("./src/routes/auth.routes")(express.Router(),app);
const categoryRoutes = require("./src/routes/category.routes")(express.Router(),app);
const productRoutes = require("./src/routes/product.routes")(express.Router(),app);
const cartRoutes = require("./src/routes/cart.routes")(express.Router(),app);

app.use("/",decryptApiKey);
app.use(app.oauth.errorHandler());
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //next(err);
    return res.status(404).json({success: false, message:"URL NOT FOUND"})
});

app.listen(port, ()=>{
    console.log(`Server Running on port:`,port);
})