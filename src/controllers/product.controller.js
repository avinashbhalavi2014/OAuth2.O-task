let PatrolMan = require('patrolman');
PatrolMan = new PatrolMan(require('../policies/config'));
const productDB = require('../database/productDB');

const productController = {
    saveProduct: async(req,res)=>{
        try {
            let { name , price , categoryId } = req.body;
            if(!name || !price || !categoryId){ return res.status(400).json({success: false, message:"PARAMETER MISSING"})}
            req.body['user'] = { id : req.user.id.toString()}
            let product = await productDB.saveProduct(req.body);
            return res.status(200).json({success:true, message:"PRODUCT SAVED", product}); 
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    },

    deleteProduct: async(req,res)=>{
        try {
            let { productId } = req.body;
            if(!productId){ return res.status(400).json({success: false, message:"INVALID PRODUCT ID"}) };
            let deleteProduct = await productDB.deleteProduct(req.body);
            if(deleteProduct) return res.status(200).json({success:true, message:"PRODUCT DELETED", product:deleteProduct});
            else return res.status(200).json({success:false, message:"PRODUCT NOT FOUND"});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    }
}

module.exports = PatrolMan.patrol('product', productController);
