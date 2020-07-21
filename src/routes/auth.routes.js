const authController = require('../controllers/auth.controller');

module.exports = (router, app)=>{
    router.post("/register",authController.register);
    router.post("/login",app.oauth.grant(),authController.login);

    return router;
}