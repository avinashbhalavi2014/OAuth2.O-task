const mongoose = require('mongoose');
const cartStatus = require('../dataType/cartStatus');
const cartsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category',
            required: true
        },
        cartStatus: {
            type: Number,
            default: cartStatus.addedItem
        }
        // quantity: {
        //     type: Number,
        //     default: 1
        // }
    },
    { timestamps: true }
);

module.exports = mongoose.model('carts', cartsSchema)