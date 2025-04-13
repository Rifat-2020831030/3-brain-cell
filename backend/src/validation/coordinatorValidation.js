const Joi = require('joi');

const createDisasterSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid("Earthquake", "Flood", "Landslide", "Hurricane", "Fire", "Tornado", "Tsunami", "Drought", "Pandemic", "Industrial", "Other").required(),
  description: Joi.string().min(10).required(),
  location: Joi.string().min(3).max(300).required(),
  coordinates: Joi.string().required(),
  area: Joi.array().optional(),
  startDate: Joi.date().required()
});

const approveAnOrganizationSchema = Joi.object({
  status: Joi.string().valid("approved","rejected").required()
});


const assignDisasterToTeamSchema = Joi.object({
  teamId: Joi.number().integer().required(),
  disasterId: Joi.number().integer().required(),
  location: Joi.string().min(3).max(300).required(),
  responsibility: Joi.string().min(3).required()
});

const emergencyNotificationSchema = Joi.object({
  subject: Joi.string().min(3).max(200).required(),
  message: Joi.string().min(1).required()
});

const validateCityName = Joi.object({
  city: Joi.string().min(2).max(100).required()
});

module.exports = {
  createDisasterSchema,
  approveAnOrganizationSchema,
  assignDisasterToTeamSchema,
  emergencyNotificationSchema,
  validateCityName
};
