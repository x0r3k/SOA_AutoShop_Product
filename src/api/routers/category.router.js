const router = require('express').Router();
const { getCategories, getCategoriesByParentId, getCategoryById } = require('../controllers/category.controller');
const {
    body_Category_Id
} = require('../../services/apiValidations');

router.get(
    '/getCategories',
    getCategories
);

router.get(
    '/getCategoriesByParentId',
    [
        body_Category_Id(false)
    ],
    getCategoriesByParentId
);

router.get(
    '/getCategoryById/:categoryId',
    [
        body_Category_Id(false)
    ],
    getCategoryById
);

module.exports = router;