const organizationService = require('../services/organizationService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');


const joinDisaster = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { disasterId } = req.params;
    
    const result = await organizationService.joinDisaster(organizationId, disasterId);
    return sendSuccessResponse(res, result, 'Organization successfully joined disaster');
  } catch (error) {
    console.error('joinDisaster error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const result = await organizationService.updateApplicationStatus(applicationId, req.body.status);
    return sendSuccessResponse(res, result, 'Application status updated successfully');
  } catch (error) {
    console.error('updateApplicationStatus error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getOrganizationApplications = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const result = await organizationService.getOrganizationApplications(organizationId);
    return sendSuccessResponse(res, result, 'Applications retrieved successfully');
  } catch (error) {
    console.error('getOrganizationApplications error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getOrganizationVolunteers = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const result = await organizationService.getOrganizationVolunteers(organizationId);
    return sendSuccessResponse(res, result, 'Volunteers retrieved successfully');
  } catch (error) {
    console.error('getOrganizationVolunteers error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const createTeamWithMembers = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const result = await organizationService.createTeamWithMembers(organizationId, req.body);
    return sendSuccessResponse(res, result, 'Team created with members successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getOrganizationTeams = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const result = await organizationService.getOrganizationTeams(organizationId);
    return sendSuccessResponse(res, result, 'Teams retrieved successfully');
  } catch (error) {
    console.error('getOrganizationTeams error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const submitDailyReport = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { disasterId } = req.params;
    const result = await organizationService.submitDailyReport(organizationId, disasterId, req.body);
    return sendSuccessResponse(res, result, 'Daily report submitted successfully');
  } catch (error) {
    console.error('submitDailyReport error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  joinDisaster, 
  updateApplicationStatus,
  getOrganizationApplications,
  getOrganizationVolunteers,
  createTeamWithMembers,
  getOrganizationTeams,
  submitDailyReport,
};
