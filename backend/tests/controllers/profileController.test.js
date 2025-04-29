const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const profileController = require('../../src/controllers/profileController');
const profileService = require('../../src/services/profileService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');
const { UserDoesNotExistError, ValidationError } = require('../../src/utils/errors');

jest.mock('jsonwebtoken');
jest.mock('../../src/services/profileService');
jest.mock('../../src/utils/responseHelper');

describe('profileController.completeRegistration', () => {
  let req, res;
  const testUserId = '2';
  const testToken = process.env.TEST_TOKEN;
  const jwtSecret = process.env.TEST_JWT_SECRET;
  
  
  beforeAll(() => {
    process.env.JWT_SECRET = jwtSecret;
  });
  
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  it('should return error if token is missing', async () => {
    req.headers = {}; 
    await profileController.completeRegistration(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Unauthorized: Token missing', 401);
  });

  it('should call completeUserProfile and send success response', async () => {
    req.headers.authorization = `Bearer ${testToken}`;
    req.body = { bio: 'A short biography' };
    jwt.verify.mockReturnValue({ id: testUserId });
    profileService.completeUserProfile.mockResolvedValue();

    await profileController.completeRegistration(req, res);

    expect(profileService.completeUserProfile).toHaveBeenCalledWith(testUserId, req.body);
    expect(sendSuccessResponse).toHaveBeenCalledWith(res, 'Profile updated successfully');
  });

  it('should handle UserDoesNotExistError', async () => {
    req.headers.authorization = `Bearer ${testToken}`;
    req.body = { bio: 'A short biography' };

    jwt.verify.mockReturnValue({ id: testUserId });
    const error = new UserDoesNotExistError('User does not exist');
    error.statusCode = 404;
    profileService.completeUserProfile.mockRejectedValue(error);

    await profileController.completeRegistration(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
  });

  it('should handle ValidationError', async () => {
    req.headers.authorization = `Bearer ${testToken}`;
    req.body = { bio: 'A short biography' };

    jwt.verify.mockReturnValue({ id: testUserId });
    const error = new ValidationError('Invalid profile data');
    error.statusCode = 400;
    profileService.completeUserProfile.mockRejectedValue(error);

    await profileController.completeRegistration(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
  });

  it('should handle generic errors with internal server error', async () => {
    req.headers.authorization = `Bearer ${testToken}`;
    req.body = { bio: 'A short biography' };

    jwt.verify.mockReturnValue({ id: testUserId });
    const error = new Error('Something went wrong');
    error.statusCode = 500;
    profileService.completeUserProfile.mockRejectedValue(error);

    await profileController.completeRegistration(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, 'Internal Server Error');
  });
});