const httpMocks = require('node-mocks-http');
const organizationController = require('../../src/controllers/organizationController');
const organizationService = require('../../src/services/organizationService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

jest.mock('../../src/services/organizationService');
jest.mock('../../src/utils/responseHelper');
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  console.error.mockRestore();
});

describe('Organization Controller Endpoints', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  describe('joinDisaster', () => {
    it('should join disaster and send a success response', async () => {
      const fakeResult = { message: 'Joined disaster successfully' };
      organizationService.joinDisaster.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster1' };

      await organizationController.joinDisaster(req, res);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Organization successfully joined disaster'
      );
    });

    it('should send error response when joinDisaster fails', async () => {
      const error = new Error('Join failed');
      error.statusCode = 400;
      organizationService.joinDisaster.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster1' };

      await organizationController.joinDisaster(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('updateApplicationStatus', () => {
    it('should update application status and send a success response', async () => {
      const fakeResult = { status: 'approved' };
      organizationService.updateApplicationStatus.mockResolvedValue(fakeResult);
      req.params = { applicationId: 'app1' };
      req.body = { status: 'approved' };

      await organizationController.updateApplicationStatus(req, res);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Application status updated successfully'
      );
    });

    it('should send error response when updateApplicationStatus fails', async () => {
      const error = new Error('Update failed');
      error.statusCode = 500;
      organizationService.updateApplicationStatus.mockRejectedValue(error);
      req.params = { applicationId: 'app1' };
      req.body = { status: 'approved' };

      await organizationController.updateApplicationStatus(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationApplications', () => {
    it('should retrieve paginated organization applications and send success response', async () => {
      const fakeResult = { total: 2, applications: [{ application_id: 1 }, { application_id: 2 }] };
      organizationService.getOrganizationApplications.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.query = { page: '2', limit: '5' };

      await organizationController.getOrganizationApplications(req, res);
    
      expect(organizationService.getOrganizationApplications).toHaveBeenCalledWith('org123', 5, 5);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Applications retrieved successfully'
      );
    });

    it('should send error response when getOrganizationApplications fails', async () => {
      const error = new Error('Fetch failed');
      error.statusCode = 404;
      organizationService.getOrganizationApplications.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationApplications(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationVolunteers', () => {
    it('should retrieve paginated organization volunteers and send success response', async () => {
      const fakeResult = { total: 1, volunteers: [{ volunteer_id: 1 }] };
      organizationService.getOrganizationVolunteers.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.query = { page: '3', limit: '10' };

      await organizationController.getOrganizationVolunteers(req, res);
      expect(organizationService.getOrganizationVolunteers).toHaveBeenCalledWith('org123', 20, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Volunteers retrieved successfully'
      );
    });

    it('should send error response when getOrganizationVolunteers fails', async () => {
      const error = new Error('Volunteer fetch failed');
      error.statusCode = 500;
      organizationService.getOrganizationVolunteers.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationVolunteers(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('createTeamWithMembers', () => {
    it('should create a team with members and send success response', async () => {
      const fakeResult = { team_id: 1 };
      organizationService.createTeamWithMembers.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.body = { teamName: 'Team A', memberIds: [1, 2, 3] };

      await organizationController.createTeamWithMembers(req, res);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Team created with members successfully'
      );
    });

    it('should send error response when createTeamWithMembers fails', async () => {
      const error = new Error('Team creation failed');
      error.statusCode = 400;
      organizationService.createTeamWithMembers.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.body = { teamName: 'Team A', memberIds: [1, 2, 3] };

      await organizationController.createTeamWithMembers(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationTeams', () => {
    it('should retrieve paginated organization teams and send success response', async () => {
      const fakeResult = { total: 3, teams: [{ team_id: 1 }, { team_id: 2 }, { team_id: 3 }] };
      organizationService.getOrganizationTeams.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationTeams(req, res);
      expect(organizationService.getOrganizationTeams).toHaveBeenCalledWith('org123', 0, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResult,
        'Teams retrieved successfully'
      );
    });

    it('should send error response when getOrganizationTeams fails', async () => {
      const error = new Error('Team fetch failed');
      error.statusCode = 500;
      organizationService.getOrganizationTeams.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationTeams(req, res);
      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

});