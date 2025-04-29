const httpMocks = require('node-mocks-http');
const userController = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

jest.mock('../../src/services/userService');
jest.mock('../../src/utils/responseHelper');


beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  console.error.mockRestore();
});

describe('User Controller Endpoints', () => {
  let req;
  let res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  describe('checkVerificationStatus', () => {
    it('should return verification status on success', async () => {
      req.params = { userId: '1' };
     
      userService.checkUserVerification.mockResolvedValue(true);
      
      await userController.checkVerificationStatus(req, res);
      
      expect(userService.checkUserVerification).toHaveBeenCalledWith('1');
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        { isVerified: true },
        'User verification status fetched successfully'
      );
    });

    it('should return error response on failure', async () => {
      req.params = { userId: '1' };
      const error = new Error('User not found');
      error.statusCode = 404;
      userService.checkUserVerification.mockRejectedValue(error);
      
      await userController.checkVerificationStatus(req, res);
      
      expect(sendErrorResponse).toHaveBeenCalledWith(
        res,
        error.message,
        error.statusCode
      );
    });
  });

  describe('fetchOngoingDisasters', () => {
    it('should retrieve paginated ongoing disasters and send success response', async () => {
      req.query = { page: '2', limit: '10' };
      const fakeDisasters = { total: 3, disasters: [{ id: 1 }, { id: 2 }, { id: 3 }] };
      userService.fetchOngoingDisasters.mockResolvedValue(fakeDisasters);
      
      await userController.fetchOngoingDisasters(req, res);
     
      expect(userService.fetchOngoingDisasters).toHaveBeenCalledWith(10, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeDisasters,
        'Ongoing disasters retrieved successfully'
      );
    });

    it('should return error response when fetching ongoing disasters fails', async () => {
      req.query = { page: '1', limit: '10' };
      const error = new Error('Failed to fetch disasters');
      error.statusCode = 500;
      userService.fetchOngoingDisasters.mockRejectedValue(error);
      
      await userController.fetchOngoingDisasters(req, res);
      
      expect(sendErrorResponse).toHaveBeenCalledWith(
        res,
        error.message,
        error.statusCode
      );
    });
  });

  describe('fetchTeamSummariesByDisaster', () => {
    it('should retrieve team summaries for a disaster with pagination and send success response', async () => {
      req.params = { disaster_id: '3' };
      req.query = { page: '3', limit: '5' }; 
      const fakeResult = { total: 2, teams: [{ team_id: 101 }, { team_id: 102 }] };
      userService.fetchTeamSummariesByDisaster.mockResolvedValue(fakeResult);
      
      await userController.fetchTeamSummariesByDisaster(req, res);
      
      expect(userService.fetchTeamSummariesByDisaster).toHaveBeenCalledWith('3', 10, 5);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Teams retrieved successfully'
      );
    });

    it('should return error response when fetching team summaries fails', async () => {
      req.params = { disaster_id: '3' };
      req.query = { page: '1', limit: '10' }; 
      const error = new Error('Failed to fetch teams');
      error.statusCode = 500;
      userService.fetchTeamSummariesByDisaster.mockRejectedValue(error);
      
      await userController.fetchTeamSummariesByDisaster(req, res);
      
      expect(sendErrorResponse).toHaveBeenCalledWith(
        res,
        error.message,
        error.statusCode
      );
    });
  });
});