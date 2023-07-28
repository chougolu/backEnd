const Joi = require('joi');

// Define a validation schema using Joi
const orderItemValSchema = Joi.object({
  order_id: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Order id must be 1 characters.',
    'string.max': 'Order id must be 9 characters.',
    'string.empty': 'Order id is not allowed to be empty.',
    'string.pattern.base': 'Order id allows only numeric values.'
  }),
  quantity: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Quantity must be 1 characters.',
    'string.max': 'Quantity must be 9 characters.',
    'string.empty': 'Quantity is not allowed to be empty.',
    'string.pattern.base': 'Quantity allows only numeric values.'
  }),
  product_id: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Product id must be 1 characters.',
    'string.max': 'Product id must be 9 characters.',
    'string.empty': 'Product id is not allowed to be empty.',
    'string.pattern.base': 'Product id allows only numeric values.'
  }),
});

module.exports = orderItemValSchema;