const httpMocks = require('node-mocks-http');
const volunteerController = require('../../src/controllers/volunteerController');
const volunteerService = require('../../src/services/volunteerService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

jest.mock('../../src/services/volunteerService');
jest.mock('../../src/utils/responseHelper');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  console.error.mockRestore();
});

describe('volunteerController', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  describe('applyToOrganization', () => {
    it('should apply to organization and send success response', async () => {
      const fakeResult = { status: 'pending', createdAt: '2025-04-29' };
      volunteerService.applyToOrganization.mockResolvedValue(fakeResult);
      req.params = { orgId: 'org123' };
      req.user = { id: 'volunteer1' };

      await volunteerController.applyToOrganization(req, res);

      expect(volunteerService.applyToOrganization).toHaveBeenCalledWith('org123', 'volunteer1');
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Application submitted successfully');
    });

    it('should send error response when applyToOrganization fails', async () => {
      const error = new Error('Application failed');
      error.statusCode = 400;
      volunteerService.applyToOrganization.mockRejectedValue(error);
      req.params = { orgId: 'org123' };
      req.user = { id: 'volunteer1' };

      await volunteerController.applyToOrganization(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationsForVolunteer', () => {
    it('should retrieve paginated organizations and send success response', async () => {
      const fakeOrgs = [{ id: 1 }, { id: 2 }];
      volunteerService.getOrganizationsForVolunteer.mockResolvedValue(fakeOrgs);
      req.user = { id: 'volunteer1' };
      req.query = { page: '2', limit: '10' };
     
      await volunteerController.getOrganizationsForVolunteer(req, res);

      expect(volunteerService.getOrganizationsForVolunteer).toHaveBeenCalledWith('volunteer1', 10, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeOrgs, 'Organizations retrieved successfully');
    });

    it('should send error response when getOrganizationsForVolunteer fails', async () => {
      const error = new Error('Failed to fetch organizations');
      error.statusCode = 500;
      volunteerService.getOrganizationsForVolunteer.mockRejectedValue(error);
      req.user = { id: 'volunteer1' };
      req.query = { page: '1', limit: '10' };

      await volunteerController.getOrganizationsForVolunteer(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOngoingDisasters', () => {
    it('should retrieve ongoing disasters with pagination and send success response', async () => {
      const fakeDisasters = { total: 3, disasters: [{ id: 1 }, { id: 2 }, { id: 3 }] };
      volunteerService.getOngoingDisasters.mockResolvedValue(fakeDisasters);
      req.query = { page: '2', limit: '5' };
      await volunteerController.getOngoingDisasters(req, res);

      expect(volunteerService.getOngoingDisasters).toHaveBeenCalledWith(5, 5);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeDisasters, 'Ongoing disasters retrieved successfully');
    });

    it('should send error response when getOngoingDisasters fails', async () => {
      const error = new Error('Failed to fetch disasters');
      error.statusCode = 500;
      volunteerService.getOngoingDisasters.mockRejectedValue(error);
      req.query = { page: '1', limit: '10' };

      await volunteerController.getOngoingDisasters(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('leaveOrganization', () => {
    it('should leave organization and send success response', async () => {
      const fakeResult = { message: 'Left organization successfully' };
      volunteerService.leaveOrganization.mockResolvedValue(fakeResult);
      req.user = { userId: 'volunteer1' };

      await volunteerController.leaveOrganization(req, res);

      expect(volunteerService.leaveOrganization).toHaveBeenCalledWith('volunteer1');
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Volunteer has successfully left the organization');
    });

    it('should send error response when leaveOrganization fails', async () => {
      const error = new Error('Failed to leave organization');
      error.statusCode = 500;
      volunteerService.leaveOrganization.mockRejectedValue(error);
      req.user = { userId: 'volunteer1' };

      await volunteerController.leaveOrganization(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });
});