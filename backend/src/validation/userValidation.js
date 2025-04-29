const Joi = require('joi');

const validateCityName = Joi.object({
  city: Joi.string().min(2).max(100).required()
});

module.exports = {
    validateCityName
}