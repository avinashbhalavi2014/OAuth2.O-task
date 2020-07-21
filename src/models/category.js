const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type:{
            type: String,
            default:null
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);