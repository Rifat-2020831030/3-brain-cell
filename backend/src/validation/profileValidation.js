const Joi = require('joi');
const { ValidationError } = require('../utils/errors');


  const validateProfileData = async (profileData, role) => {
  let schema;

  if (role === 'volunteer') {
    schema = Joi.object({
      skills: Joi.array().items(Joi.string()).required(),
      location: Joi.string().min(2).max(50).required(),
    });
  } else if (role === 'organization') {
    schema = Joi.object({
      organization_name: Joi.string().required(),
      type: Joi.string().valid('Non-profit', 'Government', 'Private', 'NGO', 'Other').required(),
      sector: Joi.string().valid('Health', 'Education', 'Disaster Relief', 'Human Rights', 'Environment', 'Other').required(),
      documentLink: Joi.string().uri({ scheme: ['http', 'https'] }).optional(),
      regNo: Joi.string().required(),
      establishedDate: Joi.date().required(),
      mission: Joi.string().required(),
      secondaryContactName: Joi.string().optional(),
      secondaryContactTitle: Joi.string().optional(),
      secondaryContactMail: Joi.string().email().optional(),
      location: Joi.string().required(),
      website: Joi.string().uri().required(),
      socialMediaLink: Joi.string().uri({ scheme: ['http', 'https'] }).optional(),
      parentOrg: Joi.string().optional(),
      approval_status: Joi.string().default('pending')
    });
  } else if (role === 'coordinator') {
    schema = Joi.object({
      department: Joi.string().required(),
      region: Joi.string().required(),
      officialContactNumber: Joi.string().required(),
      roleTitle: Joi.string().required(),
      experience: Joi.number().min(0).required(),
      certifications: Joi.array().items(Joi.string()).required(),
      bio: Joi.string().optional(),
    });
  } else {
    throw new ValidationError('Invalid role');
  }

  const { error } = schema.validate(profileData);
  if (error) {
    throw new ValidationError(error.details[0].message);  
  }
};

module.exports = { validateProfileData };
