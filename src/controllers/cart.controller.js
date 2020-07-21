let PatrolMan = require('patrolman');
PatrolMan = new PatrolMan(require('../policies/config'));
const cartDB = require('../database/cartDB');

const cartController = {
    addToCart: async(req, res)=>{
        try {
            let { productId } = req.body;
            if(!productId){ return res.status(400).json({success: false, message:"INVALID PRODUCT ID"}) };
            req.body['user'] = { id : req.user.id.toString()}
            let cartAdded = await cartDB.addProductFromCart(req.body);
            return res.status(200).json({success:true, message:"PRODUCT ADDED TO CART"});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    },
    removeFromCart:async (req, res)=>{
        try {
            let { productId } = req.body;
            if(!productId){ return res.status(400).json({success: false, message:"INVALID PRODUCT ID"}) };
            req.body['user'] = { id : req.user.id.toString()}
            let cartRemove = await cartDB.removeProductFromCart(req.body);
            return res.status(200).json({success:true, message:"PRODUCT REMOVED FROM CART"});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    },

    viewCart:async (req, res)=>{
        try {
            if(req.user){ req.body['user'] = { id : req.user.id.toString()}}
            else { return res.status(400).json({success: false, message:"INVALID USER"}) };
            let viewCart = await cartDB.viewCart(req.body);
            return res.status(200).json({success:true, cart:viewCart ,message:"ITEMS IN CART"});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    }
}

module.exports = PatrolMan.patrol('cart', cartController);