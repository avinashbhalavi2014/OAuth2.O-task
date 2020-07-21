const Policies = require('./index');

module.exports = {
    auth:{
       register:[Policies.all],
       login:[Policies.all]
    },
    category:{
       addCategory:[Policies.isAdmin],
       deleteCategory:[Policies.isAdmin] 
    },
    product:{
        saveProduct:[Policies.isAdmin],
        deleteProduct:[Policies.isAdmin]
    },
    cart:{
        addToCart:[Policies.all],
        removeFromToCart:[Policies.isAdmin],
        viewCart:[Policies.all]
    }
}