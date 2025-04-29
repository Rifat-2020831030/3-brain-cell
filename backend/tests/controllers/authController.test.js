const authController = require('../../src/controllers/authController');
const authService = require('../../src/services/authService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');
const { UserDoesNotExistError, InvalidCredentialsError, PasswordResetExpiredError } = require('../../src/utils/errors');

jest.mock('../../src/services/authService');
jest.mock('../../src/utils/responseHelper', () => ({
  sendSuccessResponse: jest.fn(),
  sendErrorResponse: jest.fn(),
}));

describe('authController', () => {
  let req; 
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call authService.loginUser with req.body and send success response', async () => {
      const mockResult = { token: 'testToken' };
      authService.loginUser.mockResolvedValue(mockResult);

      await authController.login(req, res);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, mockResult, 'Login successful');
    });

    it('should send InvalidCredentialsError if authService.loginUser throws InvalidCredentialsError', async () => {
      authService.loginUser.mockRejectedValue(new InvalidCredentialsError('Invalid credentials', 401));

      await authController.login(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Invalid credentials', 401);
    });

    it('should send Internal Server Error if authService.loginUser throws other error', async () => {
      authService.loginUser.mockRejectedValue(new Error('Some other error'));

      await authController.login(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Internal Server Error');
    });
  });

  describe('requestForgotPassword', () => {
    it('should call authService.requestForgotPasswordReset with req.body.email and send success response', async () => {
      const mockResult = { message: 'Reset email sent' };
      req.body = { email: 'test@example.com' };
      authService.requestForgotPasswordReset.mockResolvedValue(mockResult);

      await authController.requestForgotPassword(req, res);

      expect(authService.requestForgotPasswordReset).toHaveBeenCalledWith(req.body.email);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, mockResult, 'Password reset email sent');
    });

    it('should send UserDoesNotExistError if authService.requestForgotPasswordReset throws UserDoesNotExistError', async () => {
      req.body = { email: 'test@example.com' };
      authService.requestForgotPasswordReset.mockRejectedValue(new UserDoesNotExistError('User not found', 404));

      await authController.requestForgotPassword(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'User not found', 404);
    });

    it('should send Internal Server Error if authService.requestForgotPasswordReset throws other error', async () => {
      req.body = { email: 'test@example.com' };
      authService.requestForgotPasswordReset.mockRejectedValue(new Error('Some other error'));

      await authController.requestForgotPassword(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Internal Server Error');
    });
  });

  describe('verifyEmail', () => {
    it('should call authService.verifyUserEmail with email and code from req.body and send success response', async () => {
      const mockResult = { message: 'Email verified' };
      req.body = { email: 'test@example.com', code: '123456' };
      authService.verifyUserEmail.mockResolvedValue(mockResult);

      await authController.verifyEmail(req, res);

      expect(authService.verifyUserEmail).toHaveBeenCalledWith(req.body.email, req.body.code);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, mockResult, 'Email verified successfully');
    });

    it('should send UserDoesNotExistError or InvalidCredentialsError if authService.verifyUserEmail throws', async () => {
      req.body = { email: 'test@example.com', code: '123456' };
      authService.verifyUserEmail.mockRejectedValue(new UserDoesNotExistError('User not found', 404));

      await authController.verifyEmail(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'User not found', 404);
    });

    it('should send Internal Server Error if authService.verifyUserEmail throws other error', async () => {
      req.body = { email: 'test@example.com', code: '123456' };
      authService.verifyUserEmail.mockRejectedValue(new Error('Some other error'));

      await authController.verifyEmail(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Internal Server Error');
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword with data from req.body and send success response', async () => {
      const mockResult = { message: 'Password reset' };
      req.body = { resetCode: '123', email: 'test@example.com', newPassword: 'newPass', confirmPassword: 'newPass' };
      authService.resetPassword.mockResolvedValue(mockResult);

      await authController.resetPassword(req, res);

      expect(authService.resetPassword).toHaveBeenCalledWith(
        req.body.email,
        req.body.resetCode,
        req.body.newPassword,
        req.body.confirmPassword
      );
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, mockResult, 'Password reset successfully');
    });

    it('should send PasswordResetExpiredError if authService.resetPassword throws PasswordResetExpiredError', async () => {
      req.body = { resetCode: '123', email: 'test@example.com', newPassword: 'newPass', confirmPassword: 'newPass' };
      authService.resetPassword.mockRejectedValue(new PasswordResetExpiredError('Reset code expired', 400));

      await authController.resetPassword(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Reset code expired', 400);
    });

    it('should send Internal Server Error if authService.resetPassword throws other error', async () => {
      req.body = { resetCode: '123', email: 'test@example.com', newPassword: 'newPass', confirmPassword: 'newPass' };
      authService.resetPassword.mockRejectedValue(new Error('Some other error'));

      await authController.resetPassword(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Internal Server Error');
    });
  });
});
