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
  itemsDistributed: Joi.number().integer().min(0).required(),
});

module.exports = {
  updateApplicationStatusSchema,
  createTeamSchema,
  submitDailyReportSchema,
};
