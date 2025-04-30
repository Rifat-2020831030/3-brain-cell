const httpMocks = require('node-mocks-http');
const organizationController = require('../../src/controllers/organizationController');
const organizationService = require('../../src/services/organizationService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

jest.mock('../../src/services/organizationService');
jest.mock('../../src/utils/responseHelper');

describe('Organization Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  describe('joinDisaster', () => {
    it('should join a disaster and send success response', async () => {
      const fakeResult = { message: 'Joined disaster' };
      organizationService.joinDisaster.mockResolvedValue(fakeResult);
     
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster123' };

      await organizationController.joinDisaster(req, res);

      expect(organizationService.joinDisaster).toHaveBeenCalledWith('org123', 'disaster123');
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Organization successfully joined disaster');
    });

    it('should send error response when joinDisaster fails', async () => {
      const error = new Error('Join failed');
      error.statusCode = 400;
      organizationService.joinDisaster.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster123' };

      await organizationController.joinDisaster(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('updateApplicationStatus', () => {
    it('should update application status and send success response', async () => {
      const fakeResult = { message: 'Application status updated' };
      organizationService.updateApplicationStatus.mockResolvedValue(fakeResult);
      req.params = { applicationId: 'app123' };
      req.body = { status: 'approved' };

      await organizationController.updateApplicationStatus(req, res);

      expect(organizationService.updateApplicationStatus).toHaveBeenCalledWith('app123', 'approved');
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Application status updated successfully');
    });

    it('should send error response when updateApplicationStatus fails', async () => {
      const error = new Error('Update failed');
      error.statusCode = 400;
      organizationService.updateApplicationStatus.mockRejectedValue(error);
      req.params = { applicationId: 'app123' };
      req.body = { status: 'approved' };

      await organizationController.updateApplicationStatus(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationApplications', () => {
    it('should retrieve organization applications and send success response', async () => {
      const fakeResult = { total: 2, applications: [{ id: 1 }, { id: 2 }] };
      organizationService.getOrganizationApplications.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.query = { page: '2', limit: '10' };

      await organizationController.getOrganizationApplications(req, res);

      expect(organizationService.getOrganizationApplications).toHaveBeenCalledWith('org123', 10, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Applications retrieved successfully');
    });

    it('should send error response when getOrganizationApplications fails', async () => {
      const error = new Error('Fetch failed');
      error.statusCode = 400;
      organizationService.getOrganizationApplications.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationApplications(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationVolunteers', () => {
    it('should retrieve organization volunteers and send success response', async () => {
      const fakeResult = { total: 2, volunteers: [{ id: 1 }, { id: 2 }] };
      organizationService.getOrganizationVolunteers.mockResolvedValue(fakeResult);
      req.user = { id: 'org123' };
      req.query = { page: '2', limit: '10' };

      await organizationController.getOrganizationVolunteers(req, res);

      expect(organizationService.getOrganizationVolunteers).toHaveBeenCalledWith(req.user.id, 10, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Volunteers retrieved successfully');
    });

    it('should send error response when getOrganizationVolunteers fails', async () => {
      const error = new Error('Fetch failed');
      error.statusCode = 400;
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
      req.body = { name: 'Team A', members: [1, 2] };

      await organizationController.createTeamWithMembers(req, res);

      expect(organizationService.createTeamWithMembers).toHaveBeenCalledWith('org123', req.body);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Team created with members successfully');
    });

    it('should send error response when createTeamWithMembers fails', async () => {
      const error = new Error('Create team failed');
      error.statusCode = 400;
      organizationService.createTeamWithMembers.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.body = { name: 'Team A', members: [1, 2] };

      await organizationController.createTeamWithMembers(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getOrganizationTeams', () => {
    it('should retrieve organization teams and send success response', async () => {
      const fakeResult = { total: 2, teams: [{ id: 1 }, { id: 2 }] };
      organizationService.getOrganizationTeams.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.query = { page: '2', limit: '10' };

      await organizationController.getOrganizationTeams(req, res);

      expect(organizationService.getOrganizationTeams).toHaveBeenCalledWith(req.user.organizationId, 10, 10);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Teams retrieved successfully');
    });

    it('should send error response when getOrganizationTeams fails', async () => {
      const error = new Error('Fetch teams failed');
      error.statusCode = 400;
      organizationService.getOrganizationTeams.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.query = { page: '1', limit: '10' };

      await organizationController.getOrganizationTeams(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('submitDailyReport', () => {
    it('should submit a daily report and send success response', async () => {
      const fakeResult = { report_id: 1 };
      organizationService.submitDailyReport.mockResolvedValue(fakeResult);
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster123' };
      req.body = { report: 'Daily report content' };

      await organizationController.submitDailyReport(req, res);

      expect(organizationService.submitDailyReport).toHaveBeenCalledWith('org123', 'disaster123', req.body);
      expect(sendSuccessResponse).toHaveBeenCalledWith(res, fakeResult, 'Daily report submitted successfully');
    });

    it('should send error response when submitDailyReport fails', async () => {
      const error = new Error('Submit report failed');
      error.statusCode = 400;
      organizationService.submitDailyReport.mockRejectedValue(error);
      req.user = { organizationId: 'org123' };
      req.params = { disasterId: 'disaster123' };
      req.body = { report: 'Daily report content' };

      await organizationController.submitDailyReport(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });
});