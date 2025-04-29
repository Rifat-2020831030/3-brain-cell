const coordinatorService = require('../../src/services/coordinatorService');
const { AppDataSource } = require('../../src/config/database');
const { CoordinatorNotFoundError, InvalidCoordinatorActionError, OrganizationNotFoundError } = require('../../src/utils/errors');


const testEmail = process.env.TEST_EMAIL || 'testmail@gmail.com' ;


jest.mock('../../src/config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('Coordinator Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDisaster', () => {
    it('should create a new disaster when coordinator exists', async () => {
      const coordinatorMock = { user: { userId: 1 } };
      const saveMock = jest.fn().mockResolvedValue({ disaster_id: 1, name: 'Test Disaster', coordinates: '23.7806,90.2794' });

      AppDataSource.getRepository.mockImplementation((entity) => ({
        findOne: jest.fn().mockResolvedValue(coordinatorMock),
        create: jest.fn().mockReturnValue({ name: 'Test Disaster' }),
        save: saveMock,
      }));

      const result = await coordinatorService.createDisaster(1, { name: 'Test Disaster', coordinates: '23.7806,90.2794' });

      expect(result.name).toBe('Test Disaster');
      expect(result.coordinates.latitude).toBeCloseTo(23.7806);
    });

    it('should throw CoordinatorNotFoundError when coordinator does not exist', async () => {
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      });

      await expect(coordinatorService.createDisaster(1, { name: 'Disaster' }))
        .rejects.toThrow(CoordinatorNotFoundError);
    });
  });

  describe('updateDisaster', () => {
    it('should update disaster if coordinator is authorized', async () => {
      const saveMock = jest.fn();
      const disaster = {
        disaster_id: 1,
        coordinator: { user: { userId: 1 } },
      };

      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(disaster),
        save: saveMock.mockResolvedValue({ updated: true }),
      });

      const result = await coordinatorService.updateDisaster(1, 1, { name: 'Updated' });

      expect(result.updated).toBeTruthy();
    });

    it('should throw InvalidCoordinatorActionError if coordinator not authorized', async () => {
      const disaster = {
        disaster_id: 1,
        coordinator: { user: { userId: 99 } },
      };

      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(disaster),
      });

      await expect(coordinatorService.updateDisaster(1, 1, { name: 'Nope' }))
        .rejects.toThrow(InvalidCoordinatorActionError);
    });
  });

  describe('deleteDisaster', () => {
    it('should delete disaster if coordinator is authorized', async () => {
      const removeMock = jest.fn().mockResolvedValue({});
      const disaster = {
        disaster_id: 1,
        coordinator: { user: { userId: 1 } },
      };

      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(disaster),
        remove: removeMock,
      });

      const result = await coordinatorService.deleteDisaster(1, 1);
      expect(result.message).toContain('deleted');
    });
  });

  describe('closeDisaster', () => {
    it('should close disaster if valid and not already closed', async () => {
      const saveMock = jest.fn().mockResolvedValue({ status: 'Closed' });
      const disaster = {
        disaster_id: 1,
        status: 'Open',
        coordinator: { user: { userId: 1 } },
      };

      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(disaster),
        save: saveMock,
      });

      const result = await coordinatorService.closeDisaster(1, 1);
      expect(result.status).toBe('Closed');
    });

    it('should throw if disaster is already closed', async () => {
      const disaster = {
        status: 'Closed',
        coordinator: { user: { userId: 1 } },
      };

      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(disaster),
      });

      await expect(coordinatorService.closeDisaster(1, 1)).rejects.toThrow();
    });
  });

  describe('approveOrganization', () => {
    it('should approve organization if found', async () => {
      const saveMock = jest.fn().mockResolvedValue({ approval_status: 'approved' });
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue({}),
        save: saveMock,
      });

      const result = await coordinatorService.approveOrganization(1, 'approved');
      expect(result.approval_status).toBe('approved');
    });

    it('should throw OrganizationNotFoundError if not found', async () => {
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      });

      await expect(coordinatorService.approveOrganization(999, 'approved'))
        .rejects.toThrow(OrganizationNotFoundError);
    });
  });

  describe('getAllOrganizations', () => {
    it('should return organizations with total', async () => {
      const orgs = [{ name: 'Org A' }, { name: 'Org B' }];
      AppDataSource.getRepository.mockReturnValue({
        findAndCount: jest.fn().mockResolvedValue([orgs, 2]),
      });

      const result = await coordinatorService.getAllOrganizations(0, 10);
      expect(result.total).toBe(2);
      expect(result.organizations.length).toBe(2);
    });
  });

  describe('getTeamsByDisasterId', () => {
    it('should return teams by disaster', async () => {
      const mockTeam = {
        team_id: 1,
        name: 'Team A',
        teamLeader: 1,
        members: [{ volunteer_id: 1, user: { name: 'John', email: testEmail, mobile: '123', skills: [], work_location: '' } }],
        organization: {},
        disaster: {},
      };

      AppDataSource.getRepository.mockReturnValue({
        findAndCount: jest.fn().mockResolvedValue([[mockTeam], 1]),
      });

      const result = await coordinatorService.getTeamsByDisasterId(1, 0, 5);
      expect(result.teams.length).toBe(1);
    });
  });

  describe('updateTeam', () => {
    it('should update team if found', async () => {
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue({}),
        save: jest.fn().mockResolvedValue({ name: 'Updated Team' }),
      });

      const result = await coordinatorService.updateTeam(1, { name: 'Updated Team' });
      expect(result.name).toBe('Updated Team');
    });
  });

  describe('deleteTeam', () => {
    it('should delete team if found', async () => {
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue({}),
        remove: jest.fn().mockResolvedValue({}),
      });

      const result = await coordinatorService.deleteTeam(1);
      expect(result.message).toContain('deleted');
    });

    it('should throw error if team not found', async () => {
      AppDataSource.getRepository.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      });
    
      await expect(coordinatorService.deleteTeam(999))
        .rejects.toThrow();
    });
  });

  describe('getDisasters', () => {
    it('should return formatted disasters', async () => {
      const disaster = {
        disaster_id: 1,
        name: 'Cyclone',
        coordinator: {
          coordinator_id: 1,
          user: { name: 'Jane' },
          officialContactNumber: '123456',
          department: 'Relief',
          region: 'South'
        },
      };

      AppDataSource.getRepository.mockReturnValue({
        findAndCount: jest.fn().mockResolvedValue([[disaster], 1]),
      });

      const result = await coordinatorService.getDisasters(0, 5);
      expect(result.total).toBe(1);
      expect(result.disasters[0].coordinator.name).toBe('Jane');
    });
  });
});