const mongoose = require('mongoose');
const productModel = mongoose.model('products');

saveProduct = function (reqBody) {
    return new Promise((resolve, reject) => {
        productModel.create({
            name: reqBody.name,
            price: reqBody.price,
            categoryId: reqBody.categoryId,
            createdBy: reqBody.user.id
        }).then((product) => {
            return resolve(product)
        }).catch((e) => {
            return reject(e);
        })
    })
};

deleteProduct = function (reqBody) {
    return new Promise((resolve, reject) => {
        productModel.findOneAndDelete({
            _id: reqBody.productId
        }).then((product) => {
            return resolve(product);
        }).catch((e) => {
            return reject(e);
        })
    })
}

getProduct = function (reqBody) {
    return new Promise((resolve, reject) => {
        productModel.findOne({
            _id: reqBody.productId
        }).then((product) => {
            return resolve(product);
        }).catch((e) => {
            return reject(e);
        })
    })
}

module.exports = { saveProduct, deleteProduct , getProduct}