const httpMocks = require('node-mocks-http');
const authService = require('../../src/services/authService');
const { register } = require('../../src/controllers/authController');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');
const { UserAlreadyExistsError } = require('../../src/utils/errors');

jest.mock('../../src/services/authService');
jest.mock('../../src/utils/responseHelper');

describe('authController.register', () => {
  let req;
  let res;
  const testEmail = process.env.TEST_EMAIL || 'test@example.com';
  const testPassword = process.env.TEST_PASSWORD || 'password123';

  beforeEach(() => {
    req = httpMocks.createRequest({
      body: { email: testEmail, password: testPassword }
    });
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  it('should call sendSuccessResponse on successful register', async () => {
    authService.registerUser.mockResolvedValue({ any: 'result' });
    await register(req, res);
    expect(sendSuccessResponse).toHaveBeenCalledWith(
      res,
      { any: 'result' },
      'User registered successfully. Please check your email for verification code.'
    );
  });

  it('should call sendErrorResponse on UserAlreadyExistsError', async () => {
    const err = new UserAlreadyExistsError();
    authService.registerUser.mockRejectedValue(err);
    await register(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, err.message, err.statusCode);
  });
});