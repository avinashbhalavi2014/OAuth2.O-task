const mongoose = require('mongoose');
const categoryModel = mongoose.model('category');

addCategory = function (reqBody) {
    return new Promise((resolve, reject) => {
        categoryModel.create({
            name: reqBody.categoryName,
            createdBy: reqBody.user.id
        }).then((category) => {
            return resolve(category);
        }).catch((e) => {
            return reject(e);
        })
    })
};

deleteCategory = function (reqBody) {
    return new Promise((resolve, reject) => {
        categoryModel.findOneAndDelete({
            _id: reqBody.categoryId
        }).then((category) => {
            return resolve(category);
        }).catch((e) => {
            return reject(e);
        })
    })
};

getCategory = function (reqBody) {
    return new Promise((resolve, reject) => {
        categoryModel.findOne({
            _id: reqBody.categoryId
        }).then((category) => {
            return resolve(category);
        }).catch((e) => {
            return reject(e);
        })
    })
}

module.exports = { addCategory, deleteCategory, getCategory }
