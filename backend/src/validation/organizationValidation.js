const Joi = require('joi');

const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required(),
});

const createTeamSchema = Joi.object({
  teamName: Joi.string().min(3).max(100).required(),
  memberIds: Joi.array().items(Joi.number().integer()).min(1).required(),
});

const submitDailyReportSchema = Joi.object({
  description: Joi.string().min(5).required(),
  volunteersCount: Joi.number().integer().min(0).required(),
  waterFiltrationTablets: Joi.number().integer().min(0).optional(),
  rice: Joi.number().integer().min(0).optional(),
  flattenedRice: Joi.number().integer().min(0).optional(),
  puffedRice: Joi.number().integer().min(0).optional(),
  potato: Joi.number().integer().min(0).optional(),
  onion: Joi.number().integer().min(0).optional(),
  sugar: Joi.number().integer().min(0).optional(),
  oil: Joi.number().integer().min(0).optional(),
  salt: Joi.number().integer().min(0).optional(),
  candles: Joi.number().integer().min(0).optional(),
  rescuedMen: Joi.number().integer().min(0).optional(),
  rescuedWomen: Joi.number().integer().min(0).optional(),
  rescuedChildren: Joi.number().integer().min(0).optional(),
  saline: Joi.number().integer().min(0).optional(),
  paracetamol: Joi.number().integer().min(0).optional(),
  bandages: Joi.number().integer().min(0).optional(),
  sanitaryPads: Joi.number().integer().min(0).optional()
});


module.exports = {
  updateApplicationStatusSchema,
  createTeamSchema,
  submitDailyReportSchema,
};
