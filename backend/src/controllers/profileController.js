const { completeUserProfile } = require('../services/profileService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { UserDoesNotExistError, ValidationError } = require('../utils/errors');
const jwt = require('jsonwebtoken');

const completeRegistration = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendErrorResponse(res, 'Unauthorized: Token missing', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    const profileData = req.body;

    await completeUserProfile(userId, profileData);

    sendSuccessResponse(res, 'Profile updated successfully');
  } catch (error) {
    if (error instanceof UserDoesNotExistError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else if (error instanceof ValidationError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      console.log(error);
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};

module.exports = { completeRegistration };
