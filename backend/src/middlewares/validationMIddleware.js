const { validationResult } = require('express-validator');
const { userRegistrationSchema, userLoginSchema } = require('../validation/userValidation');


const validateUserRegistration = async (req, res, next) => {
  try {
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Validation error occurred' });
  }
};


const validateUserLogin = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Validation error occurred' });
  }
};

module.exports = { validateUserRegistration, validateUserLogin };
