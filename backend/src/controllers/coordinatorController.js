const coordinatorService = require('../services/coordinatorService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { validateCityName } = require('../validation/coordinatorValidation');


const createDisaster = async (req, res) => {
  try {
    const coordinatorId = req.user.id;
    const result = await coordinatorService.createDisaster(coordinatorId, req.body);
    return sendSuccessResponse(res, result, 'Disaster created successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getDisasters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getDisasters(offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Disasters retrieved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const closeDisaster = async (req, res) => {
  try {
    const coordinatorId = req.user.id;
    const { disasterId } = req.params;
    
    const result = await coordinatorService.closeDisaster(coordinatorId, disasterId);
    
    return sendSuccessResponse(res, result, 'Disaster turned off successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const approveOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    const result = await coordinatorService.approveOrganization(orgId);
    return sendSuccessResponse(res, result, 'Organization approved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getAllTeams(offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Teams retrieved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const assignDisasterToTeam = async (req, res) => {
  try {
    const { teamId, disasterId, location, responsibility } = req.body;
    const teamDetails = { location, responsibility };
    
    const result = await coordinatorService.assignDisasterToTeam(teamId, disasterId, teamDetails);
    return sendSuccessResponse(res, result, 'Disaster assigned to team successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getDisasterStats = async (req, res) => {
  try {
    const { disasterId } = req.params;
    const result = await coordinatorService.getDisasterStats(disasterId);
    return sendSuccessResponse(res, result, 'Disaster statistics retrieved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getLocationKeyByCity = async (req, res) => {
  const { city } = req.params;

  const { error } = validateCityName.validate({ city });
  if (error) {
    return sendErrorResponse(res, error.details[0].message, 422);
  }

  try {
    const locationKey = await coordinatorService.getLocationKeyByCity(city);
    sendSuccessResponse(res, { locationKey }, 'Location key fetched successfully');
  } catch (error) {
    sendErrorResponse(res, error.message || 'Failed to fetch location key', 500);
  }
};


const getLocationInfoByKey = async (req, res) => {
  const { locationKey } = req.params;
  try {
    const locationInfo = await coordinatorService.getLocationInfoByKey(locationKey);
    sendSuccessResponse(res, locationInfo, 'Location info fetched successfully');
  } catch (error) {
    sendErrorResponse(res, error.message || 'Failed to fetch location info', 500);
  }
};

const sendEmergencyNotification = async (req, res) => {
  try {
    const result = await coordinatorService.sendEmergencyNotification(req.body.subject, req.body.message);
    return sendSuccessResponse(res, result, 'Emergency notification sent successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  createDisaster,
  getDisasters,
  closeDisaster,
  approveOrganization,
  getAllTeams,
  assignDisasterToTeam,
  getDisasterStats,
  getLocationKeyByCity,
  getLocationInfoByKey,
  sendEmergencyNotification,
};
