const productController = require('../controllers/product.controller');

module.exports = (router, app)=>{
    router.post("/save",app.oauth.authorise(),productController.saveProduct);
    router.delete("/delete",app.oauth.authorise(),productController.deleteProduct);

    return router;
}