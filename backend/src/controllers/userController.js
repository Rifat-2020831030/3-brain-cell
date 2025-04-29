const userService = require('../services/userService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { validateCityName } = require('../validation/userValidation');

const checkVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params; 
    const isVerified = await userService.checkUserVerification(userId);
    
    return sendSuccessResponse(res, { isVerified }, 'User verification status fetched successfully');
  } catch (error) {
    console.error('checkVerificationStatus error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};


const fetchOngoingDisasters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const disasters = await userService.fetchOngoingDisasters(offset, parseInt(limit, 10));
    return sendSuccessResponse(res, disasters, 'Ongoing disasters retrieved successfully');
  } catch (error) {
    console.error('getOngoingDisasters error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};



const fetchTeamSummariesByDisaster = async (req, res) => {
  try {
    const { disaster_id } = req.params; 
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const result = await userService.fetchTeamSummariesByDisaster(disaster_id, offset, parseInt(limit));
    return sendSuccessResponse(res, result, 'Teams retrieved successfully');
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
    const locationKey = await userService.getLocationKeyByCity(city);
    sendSuccessResponse(res, { locationKey }, 'Location key fetched successfully');
  } catch (error) {
    sendErrorResponse(res, error.message || 'Failed to fetch location key', 500);
  }
};


const getLocationInfoByKey = async (req, res) => {
  const { locationKey } = req.params;
  try {
    const locationInfo = await userService.getLocationInfoByKey(locationKey);
    sendSuccessResponse(res, locationInfo, 'Location info fetched successfully');
  } catch (error) {
    sendErrorResponse(res, error.message || 'Failed to fetch location info', 500);
  }
};

module.exports = {
  checkVerificationStatus,
  fetchOngoingDisasters,
  fetchTeamSummariesByDisaster,
  getLocationKeyByCity,
  getLocationInfoByKey
};
