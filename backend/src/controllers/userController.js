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

module.exports = {
  checkVerificationStatus,
};
