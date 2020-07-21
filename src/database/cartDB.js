const mongoose = require('mongoose');
const cartModel = mongoose.model('carts');
const productDB = require('../database/productDB');
const cartStatus = require('../dataType/cartStatus');

addProductFromCart = function (reqBody) {
    return new Promise((resolve, reject) => {
        productDB.getProduct(reqBody).
            then((product) => {
                cartModel.create({
                    userId: reqBody.user.id,
                    productId: reqBody.productId,
                    cartStatus: cartStatus.addedItem,
                    categoryId: product.categoryId
                    //quantity: reqBody.quantity
                }).then((productAdded) => {
                    return resolve(productAdded)
                }).catch((e) => {
                    return reject(e);
                })
            }).catch((e) => {
                return reject(e);
            })
    })
};

removeProductFromCart = function (reqBody) {
    return new Promise((resolve, reject) => {
        cartModel.findOneAndDelete({
            productId: reqBody.productId,
            userId: reqBody.user.id
        }).then((productRemoved) => {
            return resolve(productRemoved);
        }).catch((e) => {
            return reject(e);
        })
    })
};

viewCart = function (reqBody) {
    return new Promise((resolve, reject) => {
        cartModel.find({
            userId: reqBody.user.id,
            cartStatus: cartStatus.addedItem
        }).populate('productId', 'name price')
            .populate('categoryId', 'name')
            .then((productList) => {
                return resolve(
                    productList.map(doc => ({
                        name : doc.productId.name,
                       price : doc.productId.price,
                       category : doc.categoryId.name
               })));
            }).catch((e) => {
                return reject(e);
            })
    })
}



module.exports = { addProductFromCart, removeProductFromCart, viewCart }

