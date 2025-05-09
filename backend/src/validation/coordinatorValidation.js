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

const updateDisasterSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('Open', 'Closed').optional(),
  coordinates: Joi.string().pattern(/^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/).optional(),
  area: Joi.array().items(Joi.string()).optional(),
  endDate: Joi.date().optional()
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

const updateTeamSchema = Joi.object({
  responsibility: Joi.string().optional(),
  location: Joi.string().optional(),
  assignmentStatus: Joi.string().valid('assigned', 'unassigned').optional()
});

const emergencyNotificationSchema = Joi.object({
  subject: Joi.string().min(3).max(200).required(),
  message: Joi.string().min(1).required()
});


module.exports = {
  createDisasterSchema,
  updateDisasterSchema,
  approveAnOrganizationSchema,
  assignDisasterToTeamSchema,
  updateTeamSchema,
  emergencyNotificationSchema,
};
