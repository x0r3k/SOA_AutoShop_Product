const createError = require('http-errors');
const { products, categories, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const {formErrorObject, MAIN_ERROR_CODES} = require('../../services/errorHandling');
const Op = Sequelize.Op;

module.exports = {
    createProduct: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
        }
        const { name, price, amount, category } = req.body;
        const foundedCategory = await categories.findByPk(category);
        if(!foundedCategory) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Category not found')));
        const foundedProduct = await products.findOne({ where: { name } });
        if(foundedProduct) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_EXISTS, 'Product exists')));
        const createdProduct = await products.create({
            name, 
            price,
            amount,
            fkCategoryId: category
        });
        return res.status(200).json({ message: 'Product successfully created' });
      } catch (error) {
        console.log(error);
        return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
      }
    },

    updateProduct: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { productId } = req.params;

            const product = await products.findByPk(productId);
            if(!product) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Product not found')));
            return res.status(200).json({ product });
        } catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { categoryId } = req.params;
            const category = await categories.findByPk(categoryId);
            if(!category) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Category not found')));
            let categoriesArray = [category.id];
            const getSubcategories = async (arr) => {
                await Promise.all(arr.map(async (item) => {
                    let foundedCatogories = await categories.findAll({
                        where: {
                            fkCategoryId: item
                        }
                    });
                    if(!foundedCatogories) return;
                    let param = foundedCatogories.map(item => item.id);
                    categoriesArray = [...categoriesArray, ...param];
                    getSubcategories(param);
                }));
            }   
            await getSubcategories(categoriesArray);

            const productList = await products.findAll({
                where: {
                    fkCategoryId: {
                        [Op.in]: categoriesArray
                    }
                }
            })
            return res.status(200).json({ productList });
        } catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    }
}  