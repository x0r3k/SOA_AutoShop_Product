const { query, param, check } = require('express-validator');
const isNumber = require('../helpers/isNumber');

const isRequiredParameter = (isRequired, paramName) => {
    return isRequired ? check(paramName).exists().withMessage('Is required').bail() : check(paramName).optional();
}

module.exports = {
    param_Product_Id: () => {
      return param('productId').exists().withMessage('Is required').bail()
        .custom(value => isNumber(value) ? true : false).withMessage('ID Should be an integer value').bail();
    },
    param_Category_Id: () => {
        return param('categoryId').exists().withMessage('Is required').bail()
          .custom(value => isNumber(value) ? true : false).withMessage('ID Should be an integer value').bail();
    },
    body_Category_Id: (isRequired) => {
      return isRequiredParameter(isRequired, 'categoryId').notEmpty().withMessage('Should not be empty').bail()
        .custom(value => isNumber(value) ? true : false).withMessage('Should be an integer value').bail();
    },
    body_Product_Name: (isRequired) => {
      return isRequiredParameter(isRequired, 'name').notEmpty().withMessage('Should not be empty').bail()
        .isString().withMessage('Should be string')
        .isLength({ max: 255 }).withMessage('Max length is 255 symbols');
    },
    body_Product_Price: (isRequired) => {
      return isRequiredParameter(isRequired, 'price').notEmpty().withMessage('Should not be empty').bail()
        .isFloat().withMessage('Should be float');
    },
    body_Product_Amount: (isRequired) => {
      return isRequiredParameter(isRequired, 'amount').notEmpty().withMessage('Should not be empty').bail()
        .isInt().withMessage('Should be integer');
    },
    body_Product_Category: (isRequired) => {
      return isRequiredParameter(isRequired, 'category').notEmpty().withMessage('Should not be empty').bail()
        .isInt().withMessage('Should be integer');
    },
    body_Category_Category: (isRequired) => {
      return isRequiredParameter(isRequired, 'category')
        .custom(value => isNumber(value) || null ? true : false).withMessage('Should be an integer value or null').bail();
    }
}