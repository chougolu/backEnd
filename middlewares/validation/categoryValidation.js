const Joi = require('joi');

// Define a validation schema using Joi
const categoryValSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z_ ]{3,30}$')).messages({
    'string.pattern.base': 'Category name is only alphabetical values allowed.',
    'string.min': 'Category name must be at least 3 characters.',
    'string.max': 'Category name must have a maximum of 30 characters.',
    'string.empty': 'Category name is not allowed to be empty.'
  }),
  description: Joi.string().required().min(5).max(300).pattern(new RegExp('^[a-zA-Z_ ]{5,300}$')).messages({
    'string.pattern.base': 'Category description is only alphabetical values allowed.',
    'string.min': 'Category description must be at least 5 characters.',
    'string.max': 'Category description must have a maximum of 300 characters.',
    'string.empty': 'Category description is not allowed to be empty.'
  })
});

module.exports = categoryValSchema;