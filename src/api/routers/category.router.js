const router = require('express').Router();
const { getCategories } = require('../controllers/category.controller');
const {
    body_Category_Id
} = require('../../services/apiValidations');
const { authUser, authRole } = require('../../middlewares/auth.middleware');

router.get(
    '/getCategories',
    [
        body_Category_Id(false)
    ],
    getCategories
);

module.exports = router;