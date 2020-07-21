const cartController = require('../controllers/cart.controller');

module.exports = (router, app)=>{
    router.post("/save",app.oauth.authorise(),cartController.addToCart);
    router.delete("/remove",app.oauth.authorise(),cartController.removeFromCart);
    router.get("/view",app.oauth.authorise(),cartController.viewCart);

    return router;
}