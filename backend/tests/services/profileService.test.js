const { completeUserProfile } = require('../../src/services/profileService');
const { AppDataSource } = require('../../src/config/database');
const User = require('../../src/models/User');
const Volunteer = require('../../src/models/Volunteer');
const Organization = require('../../src/models/Organization');
const Coordinator = require('../../src/models/Coordinator');
const { UserDoesNotExistError } = require('../../src/utils/errors');
const { validateProfileData } = require('../../src/validation/profileValidation');

jest.mock('../../src/config/database');
jest.mock('../../src/models/User');
jest.mock('../../src/models/Volunteer');
jest.mock('../../src/models/Organization');
jest.mock('../../src/models/Coordinator');
jest.mock('../../src/validation/profileValidation');

describe('completeUserProfile', () => {
  let userRepositoryMock;
  let volunteerRepositoryMock;
  let organizationRepositoryMock;
  let coordinatorRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    volunteerRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };
    organizationRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };
    coordinatorRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    AppDataSource.getRepository.mockImplementation((model) => {
      if (model === User) return userRepositoryMock;
      if (model === Volunteer) return volunteerRepositoryMock;
      if (model === Organization) return organizationRepositoryMock;
      if (model === Coordinator) return coordinatorRepositoryMock;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UserDoesNotExistError if user does not exist', async () => {
    userRepositoryMock.findOne.mockResolvedValue(null);

    await expect(completeUserProfile(1, {})).rejects.toThrow(UserDoesNotExistError);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
  });

  it('should throw an error if role is not assigned during registration', async () => {
    userRepositoryMock.findOne.mockResolvedValue({ role: null });

    await expect(completeUserProfile(1, {})).rejects.toThrow('Role not assigned during registration');
  });

  it('should validate profile data based on user role', async () => {
    userRepositoryMock.findOne.mockResolvedValue({ role: 'volunteer' });
    validateProfileData.mockResolvedValue();

    await completeUserProfile(1, { skills: ['JavaScript'], location: 'Remote' });

    expect(validateProfileData).toHaveBeenCalledWith({ skills: ['JavaScript'], location: 'Remote' }, 'volunteer');
  });

  it('should save volunteer profile if role is volunteer', async () => {
    const user = { role: 'volunteer' };
    userRepositoryMock.findOne.mockResolvedValue(user);

    await completeUserProfile(1, { skills: ['JavaScript'], location: 'Remote' });

    expect(volunteerRepositoryMock.create).toHaveBeenCalledWith({
      user,
      skills: ['JavaScript'],
      work_location: 'Remote',
    });
    expect(volunteerRepositoryMock.save).toHaveBeenCalled();
  });

  it('should save organization profile if role is organization', async () => {
    const user = { role: 'organization' };
    userRepositoryMock.findOne.mockResolvedValue(user);

    await completeUserProfile(1, {
      organization_name: 'Org Name',
      type: 'Non-Profit',
      sector: 'Education',
      documentLink: 'http://example.com/doc',
      regNo: '12345',
      establishedDate: '2022-01-01',
      mission: 'To educate',
      secondaryContactName: 'John Doe',
      secondaryContactTitle: 'Manager',
      secondaryContactMail: 'john@example.com',
      location: 'City',
      website: 'http://example.com',
      socialMediaLink: 'http://example.com/social',
      parentOrg: 'Parent Org',
      approval_status: 'Pending',
    });

    expect(organizationRepositoryMock.create).toHaveBeenCalledWith({
      user,
      organization_name: 'Org Name',
      type: 'Non-Profit',
      sector: 'Education',
      documentLink: 'http://example.com/doc',
      regNo: '12345',
      establishedDate: '2022-01-01',
      mission: 'To educate',
      secondaryContactName: 'John Doe',
      secondaryContactTitle: 'Manager',
      secondaryContactMail: 'john@example.com',
      location: 'City',
      website: 'http://example.com',
      socialMediaLink: 'http://example.com/social',
      parentOrg: 'Parent Org',
      approval_status: 'Pending',
    });
    expect(organizationRepositoryMock.save).toHaveBeenCalled();
  });

  it('should save coordinator profile if role is coordinator', async () => {
    const user = { role: 'coordinator' };
    userRepositoryMock.findOne.mockResolvedValue(user);

    await completeUserProfile(1, {
      department: 'IT',
      region: 'North',
      officialContactNumber: '1234567890',
      roleTitle: 'Lead',
      experience: '5 years',
      certifications: ['Cert 1', 'Cert 2'],
      bio: 'Experienced coordinator',
    });

    expect(coordinatorRepositoryMock.create).toHaveBeenCalledWith({
      user,
      department: 'IT',
      region: 'North',
      officialContactNumber: '1234567890',
      roleTitle: 'Lead',
      experience: '5 years',
      certifications: ['Cert 1', 'Cert 2'],
      bio: 'Experienced coordinator',
    });
    expect(coordinatorRepositoryMock.save).toHaveBeenCalled();
  });

  it('should throw an error if role is invalid', async () => {
    userRepositoryMock.findOne.mockResolvedValue({ role: 'invalid_role' });

    await expect(completeUserProfile(1, {})).rejects.toThrow('Invalid role selected');
  });
});