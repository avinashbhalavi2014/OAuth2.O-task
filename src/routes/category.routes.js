const categoryController = require('../controllers/category.controller');

module.exports = (router, app)=>{
    router.post("/save",app.oauth.authorise(),categoryController.addCategory);
    router.delete("/delete",app.oauth.authorise(),categoryController.deleteCategory);

    return router;
}