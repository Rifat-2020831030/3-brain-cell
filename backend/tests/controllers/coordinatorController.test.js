const httpMocks = require('node-mocks-http');
const coordinatorController = require('../../src/controllers/coordinatorController');
const coordinatorService = require('../../src/services/coordinatorService');
const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

jest.mock('../../src/services/coordinatorService');
jest.mock('../../src/utils/responseHelper');

describe('Coordinator Controller Endpoints', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    sendSuccessResponse.mockClear();
    sendErrorResponse.mockClear();
  });

  describe('createDisaster', () => {
    it('should create a disaster and send success response', async () => {
      const fakeDisaster = { disaster_id: 1, title: 'Test Disaster' };
      coordinatorService.createDisaster.mockResolvedValue(fakeDisaster);
      req.user = { id: 'coordinator1' };
      req.body = { title: 'Test Disaster' };

      await coordinatorController.createDisaster(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeDisaster,
        'Disaster created successfully'
      );
    });

    it('should send error response when createDisaster fails', async () => {
      const error = new Error('Create failed');
      error.statusCode = 400;
      coordinatorService.createDisaster.mockRejectedValue(error);
      req.user = { id: 'coordinator1' };
      req.body = { title: 'Test Disaster' };

      await coordinatorController.createDisaster(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('updateDisaster', () => {
    it('should update a disaster and send success response', async () => {
      const fakeUpdate = { disaster_id: 1, title: 'Updated Disaster' };
      coordinatorService.updateDisaster.mockResolvedValue(fakeUpdate);
      req.user = { id: 'coordinator1' };
      req.params = { id: '1' };
      req.body = { title: 'Updated Disaster' };

      await coordinatorController.updateDisaster(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeUpdate,
        'Disaster updated successfully'
      );
    });

    it('should send error response when updateDisaster fails', async () => {
      const error = new Error('Update failed');
      error.statusCode = 400;
      coordinatorService.updateDisaster.mockRejectedValue(error);
      req.user = { id: 'coordinator1' };
      req.params = { id: '1' };
      req.body = { title: 'Updated Disaster' };

      await coordinatorController.updateDisaster(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('deleteDisaster', () => {
    it('should delete a disaster and send success response', async () => {
      const fakeResponse = { message: 'Deleted' };
      coordinatorService.deleteDisaster.mockResolvedValue(fakeResponse);
      req.user = { id: 'coordinator1' };
      req.params = { id: '1' };

      await coordinatorController.deleteDisaster(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Disaster deleted successfully'
      );
    });

    it('should send error response when deleteDisaster fails', async () => {
      const error = new Error('Delete failed');
      error.statusCode = 400;
      coordinatorService.deleteDisaster.mockRejectedValue(error);
      req.user = { id: 'coordinator1' };
      req.params = { id: '1' };

      await coordinatorController.deleteDisaster(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getDisasters', () => {
    it('should retrieve disasters with pagination', async () => {
      const fakeDisasters = { total: 2, disasters: [{ disaster_id: 1 }, { disaster_id: 2 }] };
      coordinatorService.getDisasters.mockResolvedValue(fakeDisasters);
      req.query = { page: '2', limit: '5' };

      await coordinatorController.getDisasters(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeDisasters,
        'Disasters retrieved successfully'
      );
      // Verify offset is correctly computed: (2-1)*5 = 5
      expect(coordinatorService.getDisasters).toHaveBeenCalledWith(5, 5);
    });

    it('should send error response when getDisasters fails', async () => {
      const error = new Error('Fetch failed');
      error.statusCode = 404;
      coordinatorService.getDisasters.mockRejectedValue(error);
      req.query = { page: '1', limit: '10' };

      await coordinatorController.getDisasters(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('closeDisaster', () => {
    it('should close a disaster and send success response', async () => {
      const fakeResponse = { message: 'Disaster closed' };
      coordinatorService.closeDisaster.mockResolvedValue(fakeResponse);
      req.user = { id: 'coordinator1' };
      req.params = { disasterId: '1' };

      await coordinatorController.closeDisaster(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Disaster turned off successfully'
      );
    });

    it('should send error response when closeDisaster fails', async () => {
      const error = new Error('Close failed');
      error.statusCode = 400;
      coordinatorService.closeDisaster.mockRejectedValue(error);
      req.user = { id: 'coordinator1' };
      req.params = { disasterId: '1' };

      await coordinatorController.closeDisaster(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('approveOrganization', () => {
    it('should approve an organization and send success response', async () => {
      const fakeResponse = { message: 'Approved organization' };
      coordinatorService.approveOrganization.mockResolvedValue(fakeResponse);
      req.params = { orgId: '1' };
      req.body = { status: 'approved' };

      await coordinatorController.approveOrganization(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Organization approved successfully'
      );
    });

    it('should reject an organization and send success response with alternate message', async () => {
      const fakeResponse = { message: 'Rejected organization' };
      coordinatorService.approveOrganization.mockResolvedValue(fakeResponse);
      req.params = { orgId: '1' };
      req.body = { status: 'rejected' };

      await coordinatorController.approveOrganization(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Organization rejected!'
      );
    });

    it('should send error response when approveOrganization fails', async () => {
      const error = new Error('Approval failed');
      error.statusCode = 400;
      coordinatorService.approveOrganization.mockRejectedValue(error);
      req.params = { orgId: '1' };
      req.body = { status: 'approved' };

      await coordinatorController.approveOrganization(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getAllOrganizations', () => {
    it('should retrieve organizations with pagination', async () => {
      const fakeOrgs = { total: 3, organizations: [{ id: 1 }, { id: 2 }, { id: 3 }] };
      coordinatorService.getAllOrganizations.mockResolvedValue(fakeOrgs);
      req.query = { page: '1', limit: '10' };

      await coordinatorController.getAllOrganizations(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeOrgs,
        'Organizations retrieved successfully'
      );
      expect(coordinatorService.getAllOrganizations).toHaveBeenCalledWith(0, 10);
    });

    it('should send error response when getAllOrganizations fails', async () => {
      const error = new Error('Fetch organizations failed');
      error.statusCode = 500;
      coordinatorService.getAllOrganizations.mockRejectedValue(error);
      req.query = { page: '1', limit: '10' };

      await coordinatorController.getAllOrganizations(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getTeamsByDisasterId', () => {
    it('should retrieve teams by disaster id with pagination', async () => {
      const fakeTeams = { total: 2, teams: [{ team_id: 1 }, { team_id: 2 }] };
      coordinatorService.getTeamsByDisasterId.mockResolvedValue(fakeTeams);
      req.params = { disaster_id: '1' };
      req.query = { page: '1', limit: '10' };

      await coordinatorController.getTeamsByDisasterId(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeTeams,
        'Teams retrieved successfully'
      );
    });

    it('should send error response when getTeamsByDisasterId fails', async () => {
      const error = new Error('Fetch teams failed');
      error.statusCode = 400;
      coordinatorService.getTeamsByDisasterId.mockRejectedValue(error);
      req.params = { disaster_id: '1' };
      req.query = { page: '1', limit: '10' };

      await coordinatorController.getTeamsByDisasterId(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('assignTeamLocation', () => {
    it('should assign team location and send success response', async () => {
      const fakeResponse = { team_id: 1, location: 'Dhaka' };
      coordinatorService.assignTeamLocation.mockResolvedValue(fakeResponse);
      req.params = { teamId: '1' };
      req.body = { location: 'Dhaka', responsibility: 'Rescue' };

      await coordinatorController.assignTeamLocation(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Team assigned to location successfully'
      );
    });

    it('should send error response when assignTeamLocation fails', async () => {
      const error = new Error('Assign location failed');
      error.statusCode = 400;
      coordinatorService.assignTeamLocation.mockRejectedValue(error);
      req.params = { teamId: '1' };
      req.body = { location: 'Dhaka', responsibility: 'Rescue' };

      await coordinatorController.assignTeamLocation(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('updateTeam', () => {
    it('should update team and send success response', async () => {
      const fakeResponse = { team_id: 1, name: 'New Team Name' };
      coordinatorService.updateTeam.mockResolvedValue(fakeResponse);
      req.params = { teamId: '1' };
      req.body = { name: 'New Team Name' };

      await coordinatorController.updateTeam(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Team updated successfully'
      );
    });

    it('should send error response when updateTeam fails', async () => {
      const error = new Error('Update team failed');
      error.statusCode = 400;
      coordinatorService.updateTeam.mockRejectedValue(error);
      req.params = { teamId: '1' };
      req.body = { name: 'New Team Name' };

      await coordinatorController.updateTeam(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('deleteTeam', () => {
    it('should delete team and send success response', async () => {
      const fakeResponse = { message: 'Team deleted' };
      coordinatorService.deleteTeam.mockResolvedValue(fakeResponse);
      req.params = { teamId: '1' };

      await coordinatorController.deleteTeam(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Team deleted successfully'
      );
    });

    it('should send error response when deleteTeam fails', async () => {
      const error = new Error('Delete team failed');
      error.statusCode = 400;
      coordinatorService.deleteTeam.mockRejectedValue(error);
      req.params = { teamId: '1' };

      await coordinatorController.deleteTeam(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('getDisasterStats', () => {
    it('should retrieve disaster statistics and send success response', async () => {
      const fakeStats = { totalOrganizations: 5, totalTeams: 10 };
      coordinatorService.getDisasterStats.mockResolvedValue(fakeStats);
      req.params = { disasterId: '1' };

      await coordinatorController.getDisasterStats(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeStats,
        'Disaster statistics retrieved successfully'
      );
    });

    it('should send error response when getDisasterStats fails', async () => {
      const error = new Error('Stats retrieval failed');
      error.statusCode = 400;
      coordinatorService.getDisasterStats.mockRejectedValue(error);
      req.params = { disasterId: '1' };

      await coordinatorController.getDisasterStats(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });

  describe('sendEmergencyNotification', () => {
    it('should send emergency notification and return success response', async () => {
      const fakeResponse = { message: 'Notification sent' };
      coordinatorService.sendEmergencyNotification.mockResolvedValue(fakeResponse);
      req.body = { subject: 'Emergency', message: 'Test message' };

      await coordinatorController.sendEmergencyNotification(req, res);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        fakeResponse,
        'Emergency notification sent successfully'
      );
    });

    it('should send error response when sendEmergencyNotification fails', async () => {
      const error = new Error('Notification failed');
      error.statusCode = 400;
      coordinatorService.sendEmergencyNotification.mockRejectedValue(error);
      req.body = { subject: 'Emergency', message: 'Test message' };

      await coordinatorController.sendEmergencyNotification(req, res);

      expect(sendErrorResponse).toHaveBeenCalledWith(res, error.message, error.statusCode);
    });
  });
});