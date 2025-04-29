const {
    getOrganizationsForVolunteer,
    getOngoingDisasters,
    applyToOrganization,
    leaveOrganization,
  } = require('../../src/services/volunteerService');
  const { AppDataSource } = require('../../src/config/database');
  const Volunteer = require('../../src/models/Volunteer');
  const Organization = require('../../src/models/Organization');
  const Disaster = require('../../src/models/Disaster');
  const VolunteerApplication = require('../../src/models/VolunteerApplication');
  const { OrganizationNotFoundError } = require('../../src/utils/errors');
  
  jest.mock('../../src/config/database');
  jest.mock('../../src/models/Volunteer');
  jest.mock('../../src/models/Organization');
  jest.mock('../../src/models/Disaster');
  jest.mock('../../src/models/VolunteerApplication');
  
  describe('volunteerService', () => {
    let volunteerRepositoryMock;
    let organizationRepositoryMock;
    let applicationRepositoryMock;
    let disasterRepositoryMock;
  
    beforeEach(() => {
      volunteerRepositoryMock = {
        findOne: jest.fn(),
        save: jest.fn(),
      };
      organizationRepositoryMock = {
        findOne: jest.fn(),
        find: jest.fn(),
      };
      applicationRepositoryMock = {
        findOne: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
      };
      disasterRepositoryMock = {
        findAndCount: jest.fn(),
      };
  
      AppDataSource.getRepository.mockImplementation((model) => {
        if (model === Volunteer) return volunteerRepositoryMock;
        if (model === Organization) return organizationRepositoryMock;
        if (model === VolunteerApplication) return applicationRepositoryMock;
        if (model === Disaster) return disasterRepositoryMock;
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('applyToOrganization', () => {
      it('should throw OrganizationNotFoundError if organization does not exist', async () => {
        organizationRepositoryMock.findOne.mockResolvedValue(null);
  
        await expect(applyToOrganization(1, 1)).rejects.toThrow(OrganizationNotFoundError);
        expect(organizationRepositoryMock.findOne).toHaveBeenCalledWith({ where: { organization_id: 1 } });
      });
  
      it('should throw an error if the user is not a volunteer', async () => {
        organizationRepositoryMock.findOne.mockResolvedValue({ organization_id: 1 });
        volunteerRepositoryMock.findOne.mockResolvedValue(null);
  
        await expect(applyToOrganization(1, 1)).rejects.toThrow('Only volunteers can apply');
      });
  
      it('should throw an error if the volunteer is already approved by another organization', async () => {
        organizationRepositoryMock.findOne.mockResolvedValue({ organization_id: 1 });
        volunteerRepositoryMock.findOne.mockResolvedValue({ volunteer_id: 1 });
        applicationRepositoryMock.findOne.mockResolvedValue({ status: 'approved' });
  
        await expect(applyToOrganization(1, 1)).rejects.toThrow('Volunteer is already approved by another organization');
      });
  
      it('should create and save a new application if valid', async () => {
        organizationRepositoryMock.findOne.mockResolvedValue({ organization_id: 1 });
        volunteerRepositoryMock.findOne.mockResolvedValue({ volunteer_id: 1 });
        applicationRepositoryMock.findOne.mockResolvedValue(null);
        applicationRepositoryMock.create.mockReturnValue({ status: 'pending', createdAt: new Date() });
        applicationRepositoryMock.save.mockResolvedValue({ status: 'pending', createdAt: new Date() });
  
        const result = await applyToOrganization(1, 1);
  
        expect(applicationRepositoryMock.create).toHaveBeenCalledWith({
          volunteer: { volunteer_id: 1 },
          organization: { organization_id: 1 },
          status: 'pending',
        });
        expect(applicationRepositoryMock.save).toHaveBeenCalled();
        expect(result).toHaveProperty('status', 'pending');
      });
    });
  
    describe('getOrganizationsForVolunteer', () => {
      it('should throw an error if the volunteer is not found', async () => {
        volunteerRepositoryMock.findOne.mockResolvedValue(null);
  
        await expect(getOrganizationsForVolunteer(1, 0, 10)).rejects.toThrow('Volunteer not found');
      });
  
      it('should return a list of organizations with application statuses', async () => {
        volunteerRepositoryMock.findOne.mockResolvedValue({ volunteer_id: 1 });
        organizationRepositoryMock.find.mockResolvedValue([
          { organization_id: 1, organization_name: 'Org 1', type: 'Type 1', sector: 'Sector 1', mission: 'Mission 1' },
          { organization_id: 2, organization_name: 'Org 2', type: 'Type 2', sector: 'Sector 2', mission: 'Mission 2' },
        ]);
        applicationRepositoryMock.find.mockResolvedValue([
          { organization: { organization_id: 1 }, status: 'pending' },
        ]);
  
        const result = await getOrganizationsForVolunteer(1, 0, 10);
  
        expect(result).toEqual([
          {
            id: 1,
            name: 'Org 1',
            type: 'Type 1',
            sector: 'Sector 1',
            mission: 'Mission 1',
            requestStatus: 'pending',
          },
          {
            id: 2,
            name: 'Org 2',
            type: 'Type 2',
            sector: 'Sector 2',
            mission: 'Mission 2',
            requestStatus: null,
          },
        ]);
      });
    });
  
    describe('getOngoingDisasters', () => {
      it('should throw an error if no ongoing disasters are found', async () => {
        disasterRepositoryMock.findAndCount.mockResolvedValue([[], 0]);
  
        await expect(getOngoingDisasters(0, 10)).rejects.toThrow('No ongoing disasters found');
      });
  
      it('should return a list of ongoing disasters', async () => {
        disasterRepositoryMock.findAndCount.mockResolvedValue([
          [
            { disaster_id: 1, title: 'Disaster 1', type: 'Type 1', description: 'Description 1', location: 'Location 1' },
            { disaster_id: 2, title: 'Disaster 2', type: 'Type 2', description: 'Description 2', location: 'Location 2' },
          ],
          2,
        ]);
  
        const result = await getOngoingDisasters(0, 10);
  
        expect(result).toEqual({
          total: 2,
          disasters: [
            { disaster_id: 1, title: 'Disaster 1', type: 'Type 1', description: 'Description 1', location: 'Location 1' },
            { disaster_id: 2, title: 'Disaster 2', type: 'Type 2', description: 'Description 2', location: 'Location 2' },
          ],
        });
      });
    });
  
    describe('leaveOrganization', () => {
      it('should throw an error if the volunteer is not found', async () => {
        volunteerRepositoryMock.findOne.mockResolvedValue(null);
  
        await expect(leaveOrganization(1)).rejects.toThrow('Volunteer not found');
      });
  
      it('should throw an error if the volunteer is not a member of any organization', async () => {
        volunteerRepositoryMock.findOne.mockResolvedValue({ organization: null });
  
        await expect(leaveOrganization(1)).rejects.toThrow('Volunteer is not a member of any organization');
      });
  
      it('should allow the volunteer to leave the organization', async () => {
        volunteerRepositoryMock.findOne.mockResolvedValue({ organization: { organization_id: 1 } });
        volunteerRepositoryMock.save.mockResolvedValue();
  
        const result = await leaveOrganization(1);
  
        expect(volunteerRepositoryMock.save).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Volunteer has successfully left the organization' });
      });
    });
  });