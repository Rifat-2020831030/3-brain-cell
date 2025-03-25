const Joi = require('joi');

const validateProfileData = async (profileData, role) => {
  let schema;

  if (role === 'volunteer') {
    schema = Joi.object({
      skills: Joi.array().items(Joi.string()).required(),
      location: Joi.string().min(3).max(50).required(),
      role: Joi.string().valid('volunteer').required(),
    });
  } else if (role === 'organization') {
    schema = Joi.object({
      organization_name: Joi.string().required(),
      type: Joi.string().required(),
      sector: Joi.string().valid('health', 'education', 'NGO').required(),
      documentLink: Joi.string().uri().required(),
      regNo: Joi.string().required(),
      establishedDate: Joi.date().required(),
      mission: Joi.string().required(),
      secondaryContactName: Joi.string().required(),
      secondaryContactTitle: Joi.string().required(),
      secondaryContactMail: Joi.string().email().required(),
      location: Joi.string().required(),
      website: Joi.string().uri().required(),
      socialMediaLink: Joi.string().uri().required(),
      parentOrg: Joi.string().optional(),
      approval_status: Joi.boolean().default(false),
      role: Joi.string().valid('organization').required(),
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
      role: Joi.string().valid('coordinator').required(),
    });
  } else {
    throw new Error('Invalid role');
  }

  const { error } = schema.validate(profileData);
  if (error) {
    throw new Error(error.details[0].message);  
  }
};

module.exports = { validateProfileData };
