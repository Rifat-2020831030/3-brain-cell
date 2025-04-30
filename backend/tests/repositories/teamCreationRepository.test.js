const { getAssociatedDisaster, fetchAndValidateVolunteers } = require('../../src/repositories/teamCreationRepository');

describe('teamCreationRepository', () => {
  describe('getAssociatedDisaster', () => {
    it('should return the disaster when a valid disasterId is provided', () => {
      const organization = {
        disasters: [
          { disaster_id: 1, status: 'Open', createdAt: '2023-04-01T12:00:00Z' },
          { disaster_id: 2, status: 'Closed', createdAt: '2023-03-01T12:00:00Z' },
        ],
      };
      const disasterId = 1;

      const result = getAssociatedDisaster(organization, disasterId);

      expect(result).toEqual({ disaster_id: 1, status: 'Open', createdAt: '2023-04-01T12:00:00Z' });
    });

    it('should throw an error if the disasterId is not associated or is closed', () => {
      const organization = {
        disasters: [
          { disaster_id: 1, status: 'Closed', createdAt: '2023-04-01T12:00:00Z' },
        ],
      };
      const disasterId = 1;

      expect(() => getAssociatedDisaster(organization, disasterId)).toThrow(
        'Organization is not associated with the provided disaster ID or the disaster is closed.'
      );
    });

    it('should return the most recent active disaster if no disasterId is provided', () => {
      const organization = {
        disasters: [
          { disaster_id: 1, status: 'Open', createdAt: '2023-03-01T12:00:00Z' },
          { disaster_id: 2, status: 'Open', createdAt: '2023-04-01T12:00:00Z' },
        ],
      };

      const result = getAssociatedDisaster(organization);

      expect(result).toEqual({ disaster_id: 2, status: 'Open', createdAt: '2023-04-01T12:00:00Z' });
    });

    it('should throw an error if no active disasters are found', () => {
      const organization = {
        disasters: [
          { disaster_id: 1, status: 'Closed', createdAt: '2023-03-01T12:00:00Z' },
        ],
      };

      expect(() => getAssociatedDisaster(organization)).toThrow(
        'No active disaster found for this organization. Cannot create team without an active disaster.'
      );
    });
  });

  describe('fetchAndValidateVolunteers', () => {
    let mockVolunteerRepository;

    beforeEach(() => {
      mockVolunteerRepository = {
        findOne: jest.fn(),
      };
    });

    it('should return volunteers if all are valid and belong to the organization', async () => {
      const memberIds = [1, 2];
      const organizationId = 10;

      mockVolunteerRepository.findOne
        .mockResolvedValueOnce({ volunteer_id: 1, organization: { organization_id: 10 }, user: {} })
        .mockResolvedValueOnce({ volunteer_id: 2, organization: { organization_id: 10 }, user: {} });

      const result = await fetchAndValidateVolunteers(memberIds, organizationId, mockVolunteerRepository);

      expect(result).toEqual([
        { volunteer_id: 1, organization: { organization_id: 10 }, user: {} },
        { volunteer_id: 2, organization: { organization_id: 10 }, user: {} },
      ]);
      expect(mockVolunteerRepository.findOne).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if a volunteer is not found', async () => {
      const memberIds = [1];
      const organizationId = 10;

      mockVolunteerRepository.findOne.mockResolvedValue(null);

      await expect(fetchAndValidateVolunteers(memberIds, organizationId, mockVolunteerRepository)).rejects.toThrow(
        'Volunteer with ID 1 not found'
      );
    });

    it('should throw an error if a volunteer does not belong to the organization', async () => {
      const memberIds = [1];
      const organizationId = 10;

      mockVolunteerRepository.findOne.mockResolvedValue({
        volunteer_id: 1,
        organization: { organization_id: 20 },
        user: {},
      });

      await expect(fetchAndValidateVolunteers(memberIds, organizationId, mockVolunteerRepository)).rejects.toThrow(
        'Volunteer with ID 1 does not belong to this organization'
      );
    });
  });
});