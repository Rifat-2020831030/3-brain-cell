const organizationService = require('../../src/services/organizationService');
const { AppDataSource } = require('../../src/config/database');
const { OrganizationNotFoundError } = require('../../src/utils/errors');
const {
  getAssociatedDisaster,
  fetchAndValidateVolunteers
} = require('../../src/repositories/teamCreationRepository');

jest.mock('../../src/config/database', () => ({
  AppDataSource: { getRepository: jest.fn() }
}));

jest.mock('../../src/repositories/teamCreationRepository', () => ({
  getAssociatedDisaster: jest.fn(),
  fetchAndValidateVolunteers: jest.fn()
}));

describe('Organization Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('joinDisaster', () => {
    it('should let an existing organization join a disaster', async () => {
      const org = { organization_id: 42, name: 'OrgX' };
      const disaster = { 
        disaster_id: 7, 
        title: 'Flood', 
        organizations: [] 
      };
      const saved = { 
        disaster_id: 7, 
        title: 'Flood', 
        organizations: [org] 
      };

      const repoStub = {
        findOne: jest
          .fn()
          .mockResolvedValueOnce(org)
          .mockResolvedValueOnce(disaster),
        save: jest.fn().mockResolvedValue(saved)
      };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      const result = await organizationService.joinDisaster(42, 7);

      expect(result.message).toBe('Organization 42 successfully joined disaster 7');
      expect(result.disaster.disaster_id).toBe(7);
      expect(result.disaster.organizations).toEqual([{ organization_id: 42, name: 'OrgX' }]);
    });

    it('should throw if organization not found', async () => {
      const repoStub = { findOne: jest.fn().mockResolvedValue(null) };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      await expect(organizationService.joinDisaster(99, 1))
        .rejects.toThrow('Organization with id 99 not found');
    });

    it('should throw if disaster not found', async () => {
      const org = { organization_id: 1, name: 'A' };
      const repoStub = {
        findOne: jest
          .fn()
          .mockResolvedValueOnce(org)      
          .mockResolvedValueOnce(null)    
      };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      await expect(organizationService.joinDisaster(1, 999))
        .rejects.toThrow('Disaster with id 999 not found');
    });
  });

  describe('updateApplicationStatus', () => {
    it('should update application status and associate volunteer if approved', async () => {
      const application = {
        application_id: 1,
        status: 'pending',
        volunteer: {
          volunteer_id: '1',
          user: {
            name: 'John Doe',
            mobile: '1234567890'
          },
          skills: ['First Aid'],
          work_location: 'Dhaka'
        },
        organization: {
          organization_id: '1'
        },
        createdAt: new Date()
      };
  
      const applicationRepo = {
        findOne: jest.fn().mockResolvedValue(application),
        save: jest.fn().mockImplementation(app => Promise.resolve(app))
      };
  
      const volunteerRepo = {
        findOne: jest.fn().mockResolvedValue(application.volunteer),
        save: jest.fn().mockImplementation(vol => Promise.resolve(vol))
      };
  
      let repoCall = 0;
      AppDataSource.getRepository.mockImplementation(() => {
        repoCall++;
        return repoCall === 1 ? applicationRepo : volunteerRepo;
      });
  
      const result = await organizationService.updateApplicationStatus(1, 'approved');
  
      expect(result).toMatchObject({
        application_id: 1,
        status: 'approved',
        volunteer: {
          name: 'John Doe',
          mobile: '1234567890',
          skills: ['First Aid'],
          work_location: 'Dhaka'
        }
      });
      expect(volunteerRepo.save).toHaveBeenCalled();
    });
    
    it('should throw error if application not found', async () => {
      const applicationRepo = {
        findOne: jest.fn().mockResolvedValue(null)
      };
  
      AppDataSource.getRepository.mockReturnValue(applicationRepo);
  
      await expect(organizationService.updateApplicationStatus(999, 'approved'))
        .rejects.toThrow('Application not found');
    });
  });

  describe('getOrganizationApplications', () => {
    it('should format volunteer applications correctly', async () => {
      const application = {
        application_id: 5,
        status: 'pending',
        createdAt: '2025-04-28T10:00:00Z',
        volunteer: {
          user: { name: 'Bob', mobile: '555-1234' },
          skills: ['cooking'],
          work_location: 'Dhaka'
        }
      };
      const repoStub = {
        find: jest.fn().mockResolvedValue([application])
      };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      const result = await organizationService.getOrganizationApplications(10, 0, 10);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toMatchObject({
        application_id: 5,
        status: 'pending',
        volunteer: {
          name: 'Bob',
          mobile: '555-1234',
          skills: ['cooking'],
          work_location: 'Dhaka'
        }
      });
    });
  });

  describe('getOrganizationVolunteers', () => {
    it('should return formatted volunteers with teams and applications', async () => {
      const qb = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([
          {
            volunteer_id: 2,
            user: { name: 'Alice', mobile: '111-2222' },
            skills: ['first aid'],
            work_location: 'Khulna',
            teams: [{ team_id: 3, name: 'Team Z', responsibility: 'Rescue' }],
            volunteerApplications: [{ application_id: 8, status: 'approved', createdAt: '2025-04-27T09:00:00Z' }]
          }
        ])
      };
      const repoStub = { createQueryBuilder: jest.fn(() => qb) };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      const result = await organizationService.getOrganizationVolunteers(99, 0, 5);
      expect(Array.isArray(result)).toBe(true);
      const v = result[0];
      expect(v.volunteers).toMatchObject({
        memberId: 2,
        name: 'Alice',
        mobile: '111-2222',
        skills: ['first aid'],
        work_location: 'Khulna'
      });
      expect(v.teams).toEqual([{ team_id: 3, name: 'Team Z', responsibility: 'Rescue' }]);
      expect(v.volunteerApplications).toEqual([{ application_id: 8, status: 'approved', createdAt: '2025-04-27T09:00:00Z' }]);
    });
  });

  describe('createTeamWithMembers', () => {
    const org = {
      organization_id: 50,
      name: 'Org50',
      disasters: [{ disaster_id: 77, name: 'Quake' }]
    };
  
    it('throws OrganizationNotFoundError if org missing', async () => {
      AppDataSource.getRepository.mockImplementation(() => ({ findOne: jest.fn().mockResolvedValue(null) }));
  
      await expect(
        organizationService.createTeamWithMembers(50, { teamName: 'T1', memberIds: [1], disasterId: 77 })
      ).rejects.toThrow(OrganizationNotFoundError);
    });
  
    it('creates a team successfully', async () => {
      const savedTeam = {
        team_id: 99,
        name: 'T1',
        teamLeader: null,
        organization: org,
        members: [{ volunteer_id: 1, user: { name: 'X', email: 'x@y.com' } }],
        disaster: { disaster_id: 77, name: 'Quake' },
        assignmentStatus: 'unassigned'
      };

      const organizationRepo = { findOne: jest.fn().mockResolvedValue(org) };
      const volunteerRepo   = {}; 
      const teamRepo = {
        create: jest.fn().mockImplementation(data => data),
        save:   jest.fn().mockResolvedValue(savedTeam)
      };
  
      let call = 0;
      AppDataSource.getRepository.mockImplementation(() => {
        call += 1;
        if (call === 1) return organizationRepo;
        if (call === 2) return volunteerRepo;
        return teamRepo;
      });
  
      getAssociatedDisaster.mockReturnValue({ disaster_id: 77, name: 'Quake' });
      fetchAndValidateVolunteers.mockResolvedValue([{ volunteer_id: 1, user: { name: 'X', email: 'x@y.com' } }]);
  
      const result = await organizationService.createTeamWithMembers(50, {
        teamName:   'T1',
        memberIds:  [1],
        disasterId: 77
      });
  
      expect(result).toMatchObject({
        team_id:        99,
        teamName:       'T1',
        organization:   { organization_id: 50, name: 'Org50' },
        members:        [{ volunteer_id: 1, name: 'X', email: 'x@y.com' }],
        disaster:       { disaster_id: 77, name: 'Quake' },
        assignmentStatus: 'unassigned'
      });
    });
  });

  describe('getOrganizationTeams', () => {
    it('should return formatted teams for organization', async () => {
      const team = {
        team_id: 3,
        name: 'Alpha',
        createdAt: '2025-04-25T08:00:00Z',
        assignedAt: '2025-04-26T09:00:00Z',
        assignmentStatus: 'assigned',
        members: [
          { user: { name: 'Z', mobile: '999' }, skills: [], work_location: 'C' }
        ]
      };
      const repoStub = { find: jest.fn().mockResolvedValue([team]) };
      AppDataSource.getRepository.mockReturnValue(repoStub);

      const result = await organizationService.getOrganizationTeams(50, 0, 5);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toMatchObject({
        team_id: 3,
        name: 'Alpha',
        members: [{ volunteer: { name: 'Z', mobile: '999', skills: [], work_location: 'C' } }]
      });
    });
  });

  describe('submitDailyReport', () => {
    it('should create and return a formatted daily report', async () => {
      const reportData = {
        description: 'Daily activities report',
        volunteersCount: 50,
        waterFiltrationTablets: 1000,
        rice: 500,
        flattenedRice: 200,
        puffedRice: 100,
        potato: 300,
        onion: 200,
        sugar: 100,
        oil: 50,
        salt: 100,
        candles: 200,
        rescuedMen: 20,
        rescuedWomen: 15,
        rescuedChildren: 10,
        saline: 100,
        paracetamol: 500,
        bandages: 200,
        sanitaryPads: 300
      };
      const savedReport = {
        ...reportData,
        report_id: 1,
        date: new Date(),
        createdAt: new Date(),
        itemsDistributed: 3850 // Sum of all distributed items
      };
  
      const reportRepo = {
        create: jest.fn().mockReturnValue(savedReport),
        save: jest.fn().mockResolvedValue(savedReport)
      };
  
      AppDataSource.getRepository.mockReturnValue(reportRepo);
  
      const result = await organizationService.submitDailyReport(1, 1, reportData);
  
      expect(result).toMatchObject({
        description: reportData.description,
        volunteersCount: reportData.volunteersCount,
        reliefDistribution: {
          waterFiltrationTablets: reportData.waterFiltrationTablets,
          rice: reportData.rice,
          flattenedRice: reportData.flattenedRice,
          totalItems: 3850
        },
        rescueShelter: {
          men: reportData.rescuedMen,
          women: reportData.rescuedWomen,
          children: reportData.rescuedChildren,
          totalRescued: 45
        },
        medicalAid: {
          saline: reportData.saline,
          paracetamol: reportData.paracetamol,
          bandages: reportData.bandages,
          sanitaryPads: reportData.sanitaryPads
        }
      });
  
      expect(reportRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        organization: { organization_id: 1 },
        disaster: { disaster_id: 1 },
        description: reportData.description
      }));
    });
  });
});