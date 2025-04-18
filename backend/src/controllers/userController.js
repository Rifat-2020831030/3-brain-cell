const userService = require('../services/userService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

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
    const disasters = await userService.fetchOngoingDisasters();
    return sendSuccessResponse(res, disasters, 'Ongoing disasters retrieved successfully');
  } catch (error) {
    console.error('getOngoingDisasters error:', error);
    return sendErrorResponse(res, error.message || 'Internal Server Error', error.statusCode || 500);
  }
};

module.exports = {
  checkVerificationStatus,
  fetchOngoingDisasters
};
