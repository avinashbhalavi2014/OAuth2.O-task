const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            require: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('products', productsSchema);