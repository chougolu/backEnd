const Joi = require('joi');

// Define a validation schema using Joi
const registerValSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'please enter a valid email.',
    'string.empty': 'Email is not allowed to be empty.'
  }),
  mobile: Joi.string().required().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).messages({
    'string.empty': 'Mobile number is not allowed to be empty.',
    'string.pattern.base': 'Mobile number allows only numeric values.',
    'string.min': 'Mobile number must be 10 characters.',
    'string.max': 'Mobile number must be 10 characters.',
  }),
  firstName: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z]{3,30}$')).messages({
    'string.pattern.base': 'First name is only alphabetical values allowed.',
    'string.min': 'First name must be at least 3 characters.',
    'string.max': 'First name must have a maximum of 30 characters.',
    'string.empty': 'First name is not allowed to be empty.'
  }),
  lastName: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z]{3,30}$')).messages({
    'string.empty': 'Last name is not allowed to be empty.',
    'string.pattern.base': 'Last name is only alphabetical values allowed.',
    'string.min': 'Last name must be at least 3 characters.',
    'string.max': 'Last name must have a maximum of 30 characters.',
  }),
  password: Joi.string().required().min(8).max(8).messages({
    'string.min': 'Password must be 8 characters.',
    'string.max': 'Password must be 8 characters.',
    'string.empty': 'Password is not allowed to be empty.'
  }),
  telephone: Joi.string().required().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).messages({
    'string.empty': 'Telephone is not allowed to be empty.',
    'string.pattern.base': 'Telephone allows only numeric values.',
    'string.min': 'Telephone must be 10 characters.',
    'string.max': 'Telephone must be 10 characters.',
  }),
  address_line_1: Joi.string().required().min(3).max(300).pattern(new RegExp('^[a-zA-Z_ ]{3,300}$')).messages({
    'string.empty': 'Address line 1 is not allowed to be empty.',
    'string.pattern.base': 'Address line 1 is only alphabetical values allowed.',
    'string.min': 'Address line 1 must be at least 3 characters.',
    'string.max': 'Address line 1 must have a maximum of 300 characters.',
  }),
  address_line_2: Joi.string().required().min(3).max(300).pattern(new RegExp('^[a-zA-Z_ ]{3,300}$')).messages({
    'string.empty': 'Address line 2 is not allowed to be empty.',
    'string.pattern.base': 'Address line 2 is only alphabetical values allowed.',
    'string.min': 'Address line 2 must be at least 3 characters.',
    'string.max': 'Address line 2 must have a maximum of 300 characters.',
  }),
  city: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z]{3,30}$')).messages({
    'string.empty': 'City name is not allowed to be empty.',
    'string.pattern.base': 'City name is only alphabetical values allowed.',
    'string.min': 'City name must be at least 3 characters.',
    'string.max': 'City name must have a maximum of 30 characters.',
  }),
  
  country: Joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z]{3,30}$')).messages({
    'string.empty': 'Country name is not allowed to be empty.',
    'string.pattern.base': 'Country name is only alphabetical values allowed.',
    'string.min': 'Country name must be at least 3 characters.',
    'string.max': 'Country name must have a maximum of 30 characters.',
  }),
  postal_code: Joi.string().required().min(6).max(6).pattern(new RegExp('^[0-9]{6}$')).messages({
    'string.empty': 'Postal code is not allowed to be empty.',
    'string.pattern.base': 'Postal code allows only numeric values.',
    'string.min': 'Postal code must be 6 characters.',
    'string.max': 'Postal code must be 6 characters.',
  })
});

module.exports = registerValSchema;