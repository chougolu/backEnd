const Joi = require('joi');

// Define a validation schema using Joi
const productValSchema = Joi.object({
  product_category_id: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Product category id must be 1 characters.',
    'string.max': 'Product category id must be 9 characters.',
    'string.empty': 'Product category id is not allowed to be empty.',
    'string.pattern.base': 'Product category id allows only numeric values.'
  }),
  description: Joi.string().required().min(5).max(300).pattern(new RegExp('^[a-zA-Z_ ]{5,300}$')).messages({
    'string.pattern.base': 'Product description is only alphabetical values allowed.',
    'string.min': 'Product description must be at least 5 characters.',
    'string.max': 'Product description must have a maximum of 300 characters.',
    'string.empty': 'Product description is not allowed to be empty.'
  }),
  SKU: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'SKU must be 1 characters.',
    'string.max': 'SKU must be 9 characters.',
    'string.empty': 'SKU is not allowed to be empty.',
    'string.pattern.base': 'SKU allows only numeric values.'
  }),
  price: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Price must be 1 characters.',
    'string.max': 'Price must be 9 characters.',
    'string.empty': 'Price is not allowed to be empty.',
    'string.pattern.base': 'Price allows only numeric values.'
  }),
  name: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z]{3,30}$')).messages({
    'string.pattern.base': 'Product name is only alphabetical values allowed.',
    'string.min': 'Product name must be at least 3 characters.',
    'string.max': 'Product name must have a maximum of 30 characters.',
    'string.empty': 'Product name is not allowed to be empty.'
  })
});

module.exports = productValSchema;