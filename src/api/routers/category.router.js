const router = require('express').Router();
const { getCategories, getCategoriesByParentId } = require('../controllers/category.controller');
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

module.exports = router;