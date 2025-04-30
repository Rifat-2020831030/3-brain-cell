const { validateProfileData } = require('../../src/validation/profileValidation');
const { ValidationError } = require('../../src/utils/errors');

describe('validateProfileData', () => {
  describe('Volunteer Role', () => {
    it('should validate a valid volunteer profile', async () => {
      const validProfile = {
        skills: ['First Aid', 'Rescue Operations'],
        location: 'Dhaka'
      };

      await expect(validateProfileData(validProfile, 'volunteer')).resolves.toBeUndefined();
    });

    it('should throw an error if skills are missing for volunteer', async () => {
      const invalidProfile = {
        location: 'Dhaka'
      };

      await expect(validateProfileData(invalidProfile, 'volunteer')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'volunteer')).rejects.toThrow('"skills" is required');
    });

    it('should throw an error if location is invalid for volunteer', async () => {
      const invalidProfile = {
        skills: ['First Aid', 'Rescue Operations'],
        location: 'D'
      };

      await expect(validateProfileData(invalidProfile, 'volunteer')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'volunteer')).rejects.toThrow('"location" length must be at least 2 characters long');
    });
  });

  describe('Organization Role', () => {
    it('should validate a valid organization profile', async () => {
      const validProfile = {
        organization_name: 'Helping Hands',
        type: 'Non-profit',
        sector: 'Health',
        regNo: '12345',
        establishedDate: '2023-01-01',
        mission: 'To provide healthcare to the underprivileged.',
        location: 'Dhaka',
        website: 'https://helpinghands.org'
      };

      await expect(validateProfileData(validProfile, 'organization')).resolves.toBeUndefined();
    });

    it('should throw an error if organization_name is missing', async () => {
      const invalidProfile = {
        type: 'Non-profit',
        sector: 'Health',
        regNo: '12345',
        establishedDate: '2023-01-01',
        mission: 'To provide healthcare to the underprivileged.',
        location: 'Dhaka',
        website: 'https://helpinghands.org'
      };

      await expect(validateProfileData(invalidProfile, 'organization')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'organization')).rejects.toThrow('"organization_name" is required');
    });

    it('should throw an error if type is invalid for organization', async () => {
      const invalidProfile = {
        organization_name: 'Helping Hands',
        type: 'InvalidType',
        sector: 'Health',
        regNo: '12345',
        establishedDate: '2023-01-01',
        mission: 'To provide healthcare to the underprivileged.',
        location: 'Dhaka',
        website: 'https://helpinghands.org'
      };

      await expect(validateProfileData(invalidProfile, 'organization')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'organization')).rejects.toThrow('"type" must be one of [Non-profit, Government, Private, NGO, Other]');
    });
  });

  describe('Coordinator Role', () => {
    it('should validate a valid coordinator profile', async () => {
      const validProfile = {
        department: 'Disaster Management',
        region: 'Dhaka',
        officialContactNumber: '0123456789',
        roleTitle: 'Coordinator',
        experience: 5,
        certifications: ['First Aid Certification', 'Disaster Management Training']
      };

      await expect(validateProfileData(validProfile, 'coordinator')).resolves.toBeUndefined();
    });

    it('should throw an error if department is missing for coordinator', async () => {
      const invalidProfile = {
        region: 'Dhaka',
        officialContactNumber: '0123456789',
        roleTitle: 'Coordinator',
        experience: 5,
        certifications: ['First Aid Certification', 'Disaster Management Training']
      };

      await expect(validateProfileData(invalidProfile, 'coordinator')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'coordinator')).rejects.toThrow('"department" is required');
    });

    it('should throw an error if experience is negative for coordinator', async () => {
      const invalidProfile = {
        department: 'Disaster Management',
        region: 'Dhaka',
        officialContactNumber: '0123456789',
        roleTitle: 'Coordinator',
        experience: -1,
        certifications: ['First Aid Certification', 'Disaster Management Training']
      };

      await expect(validateProfileData(invalidProfile, 'coordinator')).rejects.toThrow(ValidationError);
      await expect(validateProfileData(invalidProfile, 'coordinator')).rejects.toThrow('"experience" must be greater than or equal to 0');
    });
  });

  describe('Invalid Role', () => {
    it('should throw an error for an invalid role', async () => {
      const invalidRole = 'invalidRole';
      const profileData = {};

      await expect(validateProfileData(profileData, invalidRole)).rejects.toThrow(ValidationError);
      await expect(validateProfileData(profileData, invalidRole)).rejects.toThrow('Invalid role');
    });
  });
});