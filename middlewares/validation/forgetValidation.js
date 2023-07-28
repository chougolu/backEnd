const Joi = require('joi');

// Define a validation schema using Joi
const forgetValSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email':'please enter a valid email.',
    'string.empty':'Email is not allowed to be empty.'
  })
});

module.exports = forgetValSchema;


