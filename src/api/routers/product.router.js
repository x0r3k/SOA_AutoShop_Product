const router = require('express').Router();
const { getProducts, getProductById, getProductByCategory, changeProductAmount, changeProductsAmount, getProductByCategoryCar } = require('../controllers/product.controller');
const {
    param_Product_Id,
    param_Category_Id,
    body_Product_Id,
    body_Product_Amount,
    query_Category_Id,
    query_Car_Id
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
    '/getProductByCategoryCar',
    [ 
        query_Category_Id(),
        query_Car_Id(),
    ],
    getProductByCategoryCar
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