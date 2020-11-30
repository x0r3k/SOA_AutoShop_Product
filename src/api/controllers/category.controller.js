const createError = require('http-errors');
const { categories, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const {formErrorObject, MAIN_ERROR_CODES} = require('../../services/errorHandling');

module.exports = {
    getCategories: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
        }
        const { categoryId } = req.body;
        if(!categoryId) {
            const foundedCategories = await categories.findAll({ where: {fkCategoryId: null} });
            return res.status(200).json({ foundedCategories });
        } 
        const foundedCategory = await categories.findByPk(categoryId);
        if(!foundedCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Category not found')));

        const foundedCategories = await categories.findAll({ where: {fkCategoryId: categoryId} });
        return res.status(200).json({ foundedCategories });
      } catch (error) {
        console.log(error);
        return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
      }
    },
}  