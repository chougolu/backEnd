const Joi = require('joi');

// Define a validation schema using Joi
const loginValSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email':'please enter a valid email.',
    'string.empty':'Email is not allowed to be empty.'
  }),
  password: Joi.string().required().min(8).max(8).messages({
    'string.min': 'Password must be 8 characters.',
    'string.max': 'Password must be 8 characters.',
    'string.empty':'Password is not allowed to be empty.'
  })
});

module.exports = loginValSchema;


