const volunteerService = require('../services/volunteerService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');


const applyToOrganization = async (req, res) => {
  try {
    const organizationId = req.params.orgId;
    const volunteerId = req.user.id;
    const result = await volunteerService.applyToOrganization(organizationId, volunteerId);
    return sendSuccessResponse(res, result, 'Application submitted successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getOrganizationsForVolunteer = async (req, res) => {
  try {
    const volunteerId = req.user.id;
    const { page = 1, limit = 10 } = req.query; 
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const organizations = await volunteerService.getOrganizationsForVolunteer(volunteerId, offset, parseInt(limit, 10));
    return sendSuccessResponse(res, organizations, 'Organizations retrieved successfully');
  } catch (error) {
    console.error('getOrganizationsForVolunteer error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getOngoingDisasters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const disasters = await volunteerService.getOngoingDisasters(offset, parseInt(limit, 10));
    return sendSuccessResponse(res, disasters, 'Ongoing disasters retrieved successfully');
  } catch (error) {
    console.error('getOngoingDisasters error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const leaveOrganization = async (req, res) => {
  try {
    const volunteerId = req.user.userId; 
    const result = await volunteerService.leaveOrganization(volunteerId);
    return sendSuccessResponse(res, result, 'Volunteer has successfully left the organization');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  getOrganizationsForVolunteer,
  getOngoingDisasters,
  applyToOrganization,
  leaveOrganization
};
