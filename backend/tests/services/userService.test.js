const {
    checkUserVerification,
    fetchOngoingDisasters,
    fetchTeamSummariesByDisaster,
    getLocationKeyByCity,
    getLocationInfoByKey,
  } = require('../../src/services/userService');
  const { AppDataSource } = require('../../src/config/database');
  const User = require('../../src/models/User');
  const Disaster = require('../../src/models/Disaster');
  const Team = require('../../src/models/Team');
  const axios = require('axios');
  
  jest.mock('../../src/config/database');
  jest.mock('axios');
  

  describe('userService', () => {
    let userRepositoryMock;
    let disasterRepositoryMock;
    let teamRepositoryMock;
  
    beforeEach(() => {
      userRepositoryMock = {
        findOne: jest.fn(),
      };
      disasterRepositoryMock = {
        findAndCount: jest.fn(),
      };
      teamRepositoryMock = {
        findAndCount: jest.fn(),
      };
      
        
      AppDataSource.getRepository.mockImplementation((model) => {
        if (model === User) return userRepositoryMock;
        if (model === Disaster) return disasterRepositoryMock;
        if (model === Team) return teamRepositoryMock;
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('checkUserVerification', () => {
      it('should throw an error if the user is not found', async () => {
        userRepositoryMock.findOne.mockResolvedValue(null);
  
        await expect(checkUserVerification(1)).rejects.toThrow('User not found');
        expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
      });
  
      it('should return the emailVerified status of the user', async () => {
        userRepositoryMock.findOne.mockResolvedValue({ emailVerified: true });
  
        const result = await checkUserVerification(1);
  
        expect(result).toBe(true);
        expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
      });
    });
  
    describe('fetchOngoingDisasters', () => {
      it('should throw an error if no ongoing disasters are found', async () => {
        disasterRepositoryMock.findAndCount.mockResolvedValue([[], 0]);
  
        await expect(fetchOngoingDisasters(0, 10)).rejects.toThrow('No ongoing disasters found');
      });
  
      it('should return a list of ongoing disasters', async () => {
        disasterRepositoryMock.findAndCount.mockResolvedValue([
          [
            { disaster_id: 1, title: 'Disaster 1', type: 'Type 1', description: 'Description 1', location: 'Location 1' },
            { disaster_id: 2, title: 'Disaster 2', type: 'Type 2', description: 'Description 2', location: 'Location 2' },
          ],
          2,
        ]);
  
        const result = await fetchOngoingDisasters(0, 10);
  
        expect(result).toEqual({
          total: 2,
          disasters: [
            { disaster_id: 1, title: 'Disaster 1', type: 'Type 1', description: 'Description 1', location: 'Location 1', startDate: undefined, status: undefined },
            { disaster_id: 2, title: 'Disaster 2', type: 'Type 2', description: 'Description 2', location: 'Location 2', startDate: undefined, status: undefined },
          ],
        });
      });
    });
  
    describe('fetchTeamSummariesByDisaster', () => {
      it('should return a list of summarized teams for a disaster', async () => {
        teamRepositoryMock.findAndCount.mockResolvedValue([
          [
            {
              team_id: 1,
              name: 'Team 1',
              teamLeader: 'Leader 1',
              responsibility: 'Rescue',
              location: 'Location 1',
              createdAt: new Date(),
              assignmentStatus: 'Assigned',
              organization: { organization_name: 'Org 1' },
              disaster: { disaster_id: 1, title: 'Disaster 1' },
              members: [
                { volunteer_id: 1, user: { name: 'Member 1' }, skills: ['Skill 1'], work_location: 'Location 1' },
              ],
            },
          ],
          1,
        ]);
  
        const result = await fetchTeamSummariesByDisaster(1, 0, 10);
  
        expect(result).toEqual({
          total: 1,
          teams: [
            {
              team_id: 1,
              name: 'Team 1',
              teamLeader: 'Leader 1',
              responsibility: 'Rescue',
              location: 'Location 1',
              createdAt: expect.any(Date),
              assignmentStatus: 'Assigned',
              organization: { name: 'Org 1' },
              disaster: { disaster_id: 1, title: 'Disaster 1' },
              members: [
                { volunteer_id: 1, name: 'Member 1', skills: ['Skill 1'], work_location: 'Location 1' },
              ],
            },
          ],
        });
      });
    });
  
    
  });