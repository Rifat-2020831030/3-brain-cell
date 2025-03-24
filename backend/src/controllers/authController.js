const authService = require('../services/authService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');
const { UserDoesNotExistError, InvalidCredentialsError, PasswordResetExpiredError } = require('../utils/errors');


const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    sendSuccessResponse(res, result, 'User registered successfully. Please check your email for verfication code.');
  } catch (error) {
    if (error instanceof UserDoesNotExistError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};


const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    sendSuccessResponse(res, result, 'Login successful');
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};


const requestForgotPassword = async (req, res) => {
  try {
    const result = await authService.requestForgotPasswordReset(req.body.email);
    sendSuccessResponse(res,result, 'Password reset email sent');
  } catch (error) {
    if (error instanceof UserDoesNotExistError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};


const verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const result = await authService.verifyUserEmail(email, code);
    sendSuccessResponse(res, result, 'Email verified successfully');
  } catch (error) {
    if (error instanceof UserDoesNotExistError || error instanceof InvalidCredentialsError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};


const resetPassword = async (req, res) => {
  const { resetCode, email, newPassword, confirmPassword } = req.body;
  try {
    const result = await authService.resetPassword(email, resetCode, newPassword, confirmPassword);
    sendSuccessResponse(res, result, 'Password reset successfully');
  } catch (error) {
    if (error instanceof PasswordResetExpiredError) {
      sendErrorResponse(res, error.message, error.statusCode);
    } else {
      sendErrorResponse(res, 'Internal Server Error');
    }
  }
};

module.exports = { register, login, requestForgotPassword, verifyEmail, resetPassword };
