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
}