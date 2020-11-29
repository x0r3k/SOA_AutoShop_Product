const createError = require('http-errors');
const { products, categories, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const {formErrorObject, MAIN_ERROR_CODES} = require('../../services/errorHandling');
const Op = Sequelize.Op;

module.exports = {
    createCategory: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
        }
        const { name, category } = req.body;

        if(category) {
            const foundedCategory = await categories.findByPk(category);
            if(!foundedCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Parent category not found')));
        }

        const categoryName = await categories.findOne({ where: { name } });
        if(categoryName) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_EXISTS, 'Category with this name already exists')));

        await categories.create({
            name,
            fkCategoryId: category
        });

        return res.status(200).json({ message: 'Category successfully created' });
      } catch (error) {
        console.log(error);
        return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
      }
    },

    updateCategory: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { name, category } = req.body;
            const { categoryId } = req.params;
            const foundedCategory = await categories.findByPk(categoryId);
            if(!foundedCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Category not found')));
            if(category) {
                const parentCategory = await categories.findByPk(category);
                if(!parentCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Parent category not found')));
            }
            if(name) {
                const categoryName = await categories.findOne({ where: { name } });
                if(categoryName) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_EXISTS, 'Category with this name already exists')));
            }
            
            const updatedCategory = await categories.update({
                name, 
                fkCategoryId: category
            }, {
                where: { id: categoryId }
            });
            return res.status(200).json({ message: 'Category successfully updated' });
        } catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { categoryId } = req.params;

            const deletedCategory = await categories.destroy({
                where: {
                    id: categoryId
                }
            });
            if(!deletedCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Category not found')));
            
            return res.status(200).json({ message: 'Category successfully deleted' });
        } catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    }
}  