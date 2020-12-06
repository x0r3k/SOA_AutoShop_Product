const router = require('express').Router();
const { getProducts, getProductById, getProductByCategory, changeProductAmount, changeProductsAmount } = require('../controllers/product.controller');
const {
    param_Product_Id,
    param_Category_Id,
    body_Product_Id,
    body_Product_Amount
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

router.put(
    '/changeProductAmount/:productId',
    [ 
        param_Product_Id(),
        body_Product_Amount(true),
    ],
    changeProductAmount
);

router.put(
    '/changeProductsAmount',
    changeProductsAmount
);


module.exports = router;