const Joi = require('joi');

// Define a validation schema using Joi
const orderDetailValSchema = Joi.object({
  user_id: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'User id must be 1 characters.',
    'string.max': 'User id must be 9 characters.',
    'string.empty': 'User id is not allowed to be empty.',
    'string.pattern.base': 'User id allows only numeric values.'
  }),
  total: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Total must be 1 characters.',
    'string.max': 'Total must be 9 characters.',
    'string.empty': 'Total is not allowed to be empty.',
    'string.pattern.base': 'Total allows only numeric values.'
  }),
  payment_id: Joi.string().required().min(1).max(9).pattern(new RegExp('^[0-9]{1,9}$')).messages({
    'string.min': 'Payment id must be 1 characters.',
    'string.max': 'Payment id must be 9 characters.',
    'string.empty': 'Payment id is not allowed to be empty.',
    'string.pattern.base': 'Payment id allows only numeric values.'
  })
});

module.exports = orderDetailValSchema;