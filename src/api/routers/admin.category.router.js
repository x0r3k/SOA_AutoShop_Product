const router = require('express').Router();
const { createCategory, updateCategory, deleteCategory } = require('../controllers/admin.category.controller');
const {
    param_Category_Id,
    body_Product_Name,
    body_Category_Category
} = require('../../services/apiValidations');
const { authUser, authRole } = require('../../middlewares/auth.middleware');

router.post(
    '/createCategory',
    authUser,
    authRole([1]),
    [
        body_Product_Name(true),
        body_Category_Category(false)
    ],
    createCategory
);

router.put(
    '/updateCategory/:categoryId',
    authUser,
    authRole([1]),
    [ 
        param_Category_Id(),
        body_Product_Name(false),
        body_Category_Category(false)
    ],
    updateCategory
);

router.delete(
    '/deleteCategory/:categoryId',
    authUser,
    authRole([1]),
    [ 
        param_Category_Id()
    ],
    deleteCategory
);

module.exports = router;