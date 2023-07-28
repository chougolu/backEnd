const Joi = require('joi');

// Define a validation schema using Joi
const resetValSchema = Joi.object({
  newPassword: Joi.string().required().min(8).max(8).messages({
    'string.min': 'Password must be 8 characters.',
    'string.max': 'Password must be 8 characters.',
    'string.empty': 'Password is not allowed to be empty.'
  })
});

module.exports = resetValSchema;