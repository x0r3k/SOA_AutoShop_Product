const router = require('express').Router();
const { getProducts, getProductById, getProductByCategory } = require('../controllers/product.controller');
const {
    param_Product_Id,
    param_Category_Id,
} = require('../../services/apiValidations');

router.get(
    '/getProducts',
    getProducts
);

router.get(
    '/getProductById/:productId',
    [ 
        param_Product_Id()
    ],
    getProductById
);

router.get(
    '/getProductByCategory/:categoryId',
    [ 
        param_Category_Id()
    ],
    getProductByCategory
);

module.exports = router;