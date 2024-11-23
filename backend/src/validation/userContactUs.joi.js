const Joi = require('joi');
const userContactUs = require('../models/user.contactus.model');

const userContactUsValidation = Joi.object({
    userName: Joi.string()
    .required()
    .messages({
        'string.empty':'Username is required'
    }),
    mobileNumber: Joi.string()
    .length(10) 
    .pattern(/^[0-9]+$/) 
    .required()
    .messages({
        'string.length': 'Mobile number should be exactly 10 digits',
        'string.pattern.base': 'Mobile number must be numeric',
        'any.required': 'Mobile number is required'
    }),
    emailAddress: Joi.string()
    .email({tlds:{allow:['com', 'net', 'org']}})
    .required()
    .messages({
        'string.email':'Email address must be a valid email address',
        'any.required':'Email address is required'
    }),
    message: Joi.string()
    .required()
    .messages({
        'any.reuqired':'Message is required'
    })
}).options({
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
});


module.exports = userContactUsValidation;