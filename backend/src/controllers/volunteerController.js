const volunteerService = require('../services/volunteerService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');


const applyToOrganization = async (req, res) => {
  try {
    const organizationId = req.params.orgId;
    const volunteerId = req.user.id;
    const result = await volunteerService.applyToOrganization(organizationId, volunteerId);
    return sendSuccessResponse(res, result, 'Application submitted successfully');
  } catch (error) {
    console.error('applyToOrganization error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getOrganizationsForVolunteer = async (req, res) => {
  try {
    const volunteerId = req.user.id;
    const organizations = await volunteerService.getOrganizationsForVolunteer(volunteerId);
    return sendSuccessResponse(res, organizations, 'Organizations retrieved successfully');
  } catch (error) {
    console.error('getOrganizationsForVolunteer error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getOngoingDisasters = async (req, res) => {
  try {
    const disasters = await volunteerService.getOngoingDisasters();
    return sendSuccessResponse(res, disasters, 'Ongoing disasters retrieved successfully');
  } catch (error) {
    console.error('getOngoingDisasters error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  getOrganizationsForVolunteer,
  getOngoingDisasters,
  applyToOrganization
};
