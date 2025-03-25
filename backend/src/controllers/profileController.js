const { completeUserProfile } = require('../services/profileService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { UserDoesNotExistError } = require('../utils/errors');
const jwt = require('jsonwebtoken');

const completeRegistration = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendErrorResponse(res, 'Unauthorized: Token missing', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const jwtRole = decoded.role;

  if (user.role !== jwtRole) {
    user.role = jwtRole;
    await userRepository.save(user);
}

  try {
    const profileData = req.body;

    const updatedUser = await completeUserProfile(userId, profileData);

    sendSuccessResponse(res, 'Profile updated successfully');
  } catch (error) {
    if (error instanceof UserDoesNotExistError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      console.error(error);
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};

module.exports = { completeRegistration };
