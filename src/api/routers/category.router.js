const router = require('express').Router();
const { getCategories } = require('../controllers/category.controller');
const {
    body_Category_Id
} = require('../../services/apiValidations');

router.get(
    '/getCategories',
    [
        body_Category_Id(false)
    ],
    getCategories
);

module.exports = router;