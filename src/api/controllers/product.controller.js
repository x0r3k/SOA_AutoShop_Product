const createError = require('http-errors');
const { products, categories, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const {formErrorObject, MAIN_ERROR_CODES} = require('../../services/errorHandling');
const Op = Sequelize.Op;

module.exports = {
    getProducts: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
        }
  
        const productList = await products.findAll();
        return res.status(200).json({ productList });
      } catch (error) {
        console.log(error);
        return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
      }
    },

    getProductById: async (req, res, next) => {
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

    getProductByCategory: async (req, res, next) => {
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
    },

    changeProductAmount: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { productId } = req.params;
            const { amount } = req.body;

            const product = await products.findByPk(productId);
            if(!product) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Product not found')));
            if(product.amount < amount) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_ALREADY_DONE, 'No such amount of product')));
            
            product.amount = product.amount - amount;
            await product.save();
            return res.status(200).json({ message:  'Product amount changed'});
        } catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    changeProductsAmount: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { data, type } = req.body;

            await Promise.all(data.map(async (item) => {
                    const product = await products.findByPk(item.productId);
                    if(!product) throw {message: 'not_found', productId: item.productId};
                    if(type === 'decrement') {
                        if(product.amount < item.amount) {
                            throw {
                                message: 'low_amount', 
                                productId: item.productId, 
                                requestedAmount: item.amount,
                                availableAmount: product.amount
                            };
                        }
                        product.amount = product.amount - item.amount;
                        await product.save({transaction});
                    }
                    else if(type === 'increment') {
                        product.amount = product.amount + item.amount;
                        await product.save({transaction});
                    }
                    
            }))
            .then(async () => {
                await transaction.commit();
                return res.status(200).json({ message: 'Product amount changed'});
            })
            .catch(async (error) => {
                await transaction.rollback();
                if(error.message === 'not_found') {
                    return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Product not found', {productId: error.productId})));
                }
                else if(error.message === 'low_amount') {
                    return next(createError(formErrorObject(
                        MAIN_ERROR_CODES.ELEMENT_ALREADY_DONE, 
                        'No such amount of product', 
                        {
                            productId: error.productId, 
                            requestedAmount: error.requestedAmount,
                            availableAmount: error.availableAmount
                        })));
                }
                return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'AAA', error)));
            });
        } catch (error) {
            await transaction.rollback();
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },
}  