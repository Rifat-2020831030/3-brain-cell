const coordinatorService = require('../services/coordinatorService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

const createDisaster = async (req, res) => {
  try {
    const coordinatorId = req.user.id;
    const result = await coordinatorService.createDisaster(coordinatorId, req.body);
    return sendSuccessResponse(res, result, 'Disaster created successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const updateDisaster = async (req, res) => {
  try {
    const coordinatorId = req.user.id;
    const { id } = req.params;
    const updates = req.body;
    const result = await coordinatorService.updateDisaster(coordinatorId, id, updates);
    return sendSuccessResponse(res, result, 'Disaster updated successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message, err.statusCode || 500);
  }
};

const deleteDisaster = async (req, res) => {
  try {
    const coordinatorId = req.user.id;
    const { id } = req.params;
    const result = await coordinatorService.deleteDisaster(coordinatorId, id);
    return sendSuccessResponse(res, result, 'Disaster deleted successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message, err.statusCode || 500);
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
    const { status } = req.body;
    const result = await coordinatorService.approveOrganization(orgId, status);
    
    if(status == "approved"){
      return sendSuccessResponse(res, result, 'Organization approved successfully');
    }else if(status == "rejected") {
      return sendSuccessResponse(res, result, 'Organization rejected!');
    }
    
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const getAllOrganizations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getAllOrganizations(offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Organizations retrieved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const getTeamsByDisasterId = async (req, res) => {
  try {
    const { disaster_id } = req.params; 
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await coordinatorService.getTeamsByDisasterId(disaster_id, offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Teams retrieved successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const assignTeamLocation = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { location, responsibility } = req.body;
    
    if (!location) {
      return sendErrorResponse(res, 'Location is required', 400);
    }
    
    const result = await coordinatorService.assignTeamLocation(teamId, location, responsibility);
    return sendSuccessResponse(res, result, 'Team assigned to location successfully');
  } catch (error) {
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updates = req.body;
    const result = await coordinatorService.updateTeam(teamId, updates);
    return sendSuccessResponse(res, result, 'Team updated successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message, err.statusCode || 500);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await coordinatorService.deleteTeam(teamId);
    return sendSuccessResponse(res, result, 'Team deleted successfully');
  } catch (err) {
    return sendErrorResponse(res, err.message, err.statusCode || 500);
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
  updateDisaster,
  deleteDisaster,
  getDisasters,
  closeDisaster,
  approveOrganization,
  getAllOrganizations,
  getTeamsByDisasterId,
  assignTeamLocation,
  updateTeam,
  deleteTeam,
  getDisasterStats,
  sendEmergencyNotification,
};
