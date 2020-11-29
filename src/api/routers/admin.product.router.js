const router = require('express').Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/admin.product.controller');
const {
    param_Product_Id,
    body_Product_Name,
    body_Product_Price,
    body_Product_Amount,
    body_Product_Category
} = require('../../services/apiValidations');
const { authUser, authRole } = require('../../middlewares/auth.middleware');

router.post(
    '/createProduct',
    authUser,
    authRole([1]),
    [
        body_Product_Name(true),
        body_Product_Price(true),
        body_Product_Amount(true),
        body_Product_Category(true)
    ],
    createProduct
);

router.put(
    '/updateProduct/:productId',
    authUser,
    authRole([1]),
    [ 
        param_Product_Id(),
        body_Product_Name(false),
        body_Product_Price(false),
        body_Product_Amount(false),
        body_Product_Category(false)
    ],
    updateProduct
);

router.delete(
    '/deleteProduct/:productId',
    authUser,
    authRole([1]),
    [ 
        param_Product_Id()
    ],
    deleteProduct
);

module.exports = router;