const httpMocks = require('node-mocks-http');
const authService = require('../../src/services/authService');
const {
  register
} = require('../../src/controllers/authController');
const { sendSuccessResponse, sendErrorResponse } =
  require('../../src/utils/responseHelper');
const { UserAlreadyExistsError } = require('../../src/utils/errors');

jest.mock('../../src/services/authService');
jest.mock('../../src/utils/responseHelper');

describe('authController.register', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({ body: { email: 'a@b.com', password: 'p' } });
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
      'User registered successfully. Please check your email for verfication code.'
    );
  });

  it('should call sendErrorResponse on UserAlreadyExistsError', async () => {
    const err = new UserAlreadyExistsError();
    authService.registerUser.mockRejectedValue(err);
    await register(req, res);
    expect(sendErrorResponse).toHaveBeenCalledWith(res, err.message, err.statusCode);
  });
});


