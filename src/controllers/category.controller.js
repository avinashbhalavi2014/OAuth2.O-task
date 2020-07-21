let PatrolMan = require('patrolman');
PatrolMan = new PatrolMan(require('../policies/config'));
const categoryDB = require('../database/categoryDB');

const categoryController = {
    addCategory: async (req, res)=>{
        try {
            let { categoryName } = req.body;
            if(!categoryName){ return res.status(400).json({success: false, message:"INVALID CATEGORY NAME"}) };
            req.body['user'] = { id : req.user.id.toString()}
            let categoryAdded = await categoryDB.addCategory(req.body);
            return res.status(200).json({success:true, message:"CATEGORY ADDED", category:categoryAdded});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    },

    deleteCategory: async (req, res)=>{
        try {
            let { categoryId } = req.body;
            if(!categoryId){ return res.status(400).json({success: false, message:"INVALID CATEGORY ID"}) };
            req.body['user'] = { id : req.user.id.toString()}
            let categoryDeleted = await categoryDB.deleteCategory(req.body);
            if(categoryDeleted) return res.status(200).json({success:true, message:"CATEGORY DELETED"});
            else return res.status(200).json({success:false, message:"CATEGORY NOT FOUND", category:categoryDeleted});
        } catch (error) {
            return res.status(500).json({success: false, message:"INTERNAL SERVER ERROR"});
        }
    }
}

module.exports = PatrolMan.patrol('category', categoryController);